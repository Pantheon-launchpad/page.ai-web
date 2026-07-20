import { tokenStore, API_BASE_URL } from "@/lib/api";
import { AuthApi } from "./auth.api";
import type { User } from "@/types";


export const startOauth = (provider: string) => {
  if (typeof window !== "undefined") {
    window.location.href = `${API_BASE_URL}/auth/${provider}`;
  }
};

/**
 * Parses access and refresh tokens from URL query parameters, saves them,
 * and fetches the authenticated user session.
 */
export const handleOauthCallback = async (): Promise<User | null> => {
  if (typeof window === "undefined") return null;

  const urlParams = new URLSearchParams(window.location.search);
  const accessToken = urlParams.get("accessToken") || urlParams.get("token");
  const refreshToken = urlParams.get("refreshToken") || urlParams.get("refresh_token");

  if (accessToken) {
    tokenStore.setTokens(accessToken, refreshToken || undefined);
    try {
      return await AuthApi.getSession();
    } catch (err) {
      console.error("Failed to fetch user session after OAuth login:", err);
      throw err;
    }
  }

  throw new Error("No access token found in URL parameters");
};
