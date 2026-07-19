import axios, { AxiosError, AxiosRequestConfig, AxiosInstance } from "axios";
import {
  API_BASE_URL,
  API_TIMEOUT_MS,
  API_MODE,
  MOCK_LATENCY_MS,
  TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from "./config";
import { ApiError } from "./errors";

// --- token storage (swap for httpOnly cookies server-side once the real
// auth backend exists - this is intentionally isolated so that change
// touches one file) ---------------------------------------------------------

export const tokenStore = {
  getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    try {
      return window.localStorage.getItem(TOKEN_STORAGE_KEY);
    } catch {
      return null;
    }
  },
  getRefreshToken(): string | null {
    if (typeof window === "undefined") return null;
    try {
      return window.localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
    } catch {
      return null;
    }
  },
  setTokens(accessToken: string, refreshToken?: string) {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
      if (refreshToken)
        window.localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
    } catch {
      // ignore - storage unavailable
    }
  },
  clear() {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY);
      window.localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
    } catch {
      // ignore
    }
  },
};

// --- axios instance ---------------------------------------------------------

const axiosClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT_MS,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor - attaches the bearer token to every outgoing call.
axiosClient.interceptors.request.use((config) => {
  const token = tokenStore.getAccessToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = tokenStore.getRefreshToken();
  if (!refreshToken) return null;

  if (!refreshPromise) {
    refreshPromise = axios
      .post(`${API_BASE_URL}/auth/refresh`, { refreshToken })
      .then((res) => {
        const { accessToken, refreshToken: newRefresh } = res.data ?? {};
        if (accessToken) tokenStore.setTokens(accessToken, newRefresh);
        return accessToken ?? null;
      })
      .catch(() => {
        tokenStore.clear();
        return null;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

// Response interceptor - normalizes errors and retries once on 401 after a
// silent token refresh (the classic JWT + refresh-token dance).
axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as
      | (AxiosRequestConfig & { _retried?: boolean })
      | undefined;

    if (
      error.response?.status === 401 &&
      original &&
      !original._retried &&
      API_MODE === "production"
    ) {
      original._retried = true;
      const newToken = await refreshAccessToken();
      if (newToken) {
        original.headers = {
          ...original.headers,
          Authorization: `Bearer ${newToken}`,
        };
        return axiosClient.request(original);
      }
    }

    if (axios.isCancel(error)) {
      throw new ApiError("Request cancelled", "CANCELLED");
    }
    if (error.code === "ECONNABORTED") {
      throw new ApiError("Request timed out", "TIMEOUT");
    }
    if (!error.response) {
      throw new ApiError(
        "Network error - check your connection",
        "NETWORK_ERROR",
      );
    }

    const status = error.response.status;
    const data = error.response.data as { message?: string } | undefined;
    throw ApiError.fromStatus(
      status,
      data?.message ?? error.message,
      error.response.data,
    );
  },
);

// --- retry helper for idempotent GETs ---------------------------------------

async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 2,
  delayMs = 400,
): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (
      retries <= 0 ||
      (err instanceof ApiError &&
        ["UNAUTHORIZED", "FORBIDDEN", "VALIDATION_ERROR"].includes(err.code))
    ) {
      throw err;
    }
    await new Promise((r) => setTimeout(r, delayMs));
    return withRetry(fn, retries - 1, delayMs * 1.5);
  }
}

// --- mock helper -------------------------------------------------------------

/** Resolves `data` after MOCK_LATENCY_MS, simulating a real round trip so
 *  loading states behave the same way they will against the real API. */
export function mockResponse<T>(
  data: T,
  latency = MOCK_LATENCY_MS,
): Promise<T> {
  if (latency <= 0) return Promise.resolve(data);
  return new Promise((resolve) => setTimeout(() => resolve(data), latency));
}

/** Simulates a mock-mode failure, for exercising error states in the UI
 *  during development (e.g. `mockFailure("Email already in use")`). */
export function mockFailure(
  message: string,
  code: ApiError["code"] = "VALIDATION_ERROR",
  latency = MOCK_LATENCY_MS,
): Promise<never> {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new ApiError(message, code)), latency),
  );
}

// --- public client -----------------------------------------------------------

export const apiClient = {
  mode: API_MODE,

  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return withRetry(() => axiosClient.get<T>(url, config).then((r) => r.data));
  },
  post<T>(
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return axiosClient.post<T>(url, body, config).then((r) => r.data);
  },
  put<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return axiosClient.put<T>(url, body, config).then((r) => r.data);
  },
  patch<T>(
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return axiosClient.patch<T>(url, body, config).then((r) => r.data);
  },
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return axiosClient.delete<T>(url, config).then((r) => r.data);
  },

  /** Returns an AbortController wired up for request cancellation, e.g.
   *  `const c = apiClient.createCancelToken(); apiClient.get(url, { signal: c.signal }); c.abort();` */
  createCancelToken() {
    return new AbortController();
  },
};

export default apiClient;
