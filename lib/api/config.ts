/**
 * Central place that decides how the app talks to "the backend".
 *
 * Today there is no backend, so every service method resolves against local
 * mock data. When the Express API exists, flip API_MODE to "production" (or
 * set NEXT_PUBLIC_API_MODE=production in the environment) and point
 * API_BASE_URL at it - no page or component needs to change, only the
 * implementations inside /services.
 */

export type ApiMode = "mock" | "production";

export const API_MODE: ApiMode =
  (process.env.NEXT_PUBLIC_API_MODE as ApiMode);

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://page-ai-web-backend.onrender.com/api/v1";

export const API_TIMEOUT_MS = 15_000;

/** Artificial latency for mock responses, so loading states are visible
 *  during frontend development. Set to 0 for instant resolution. */
export const MOCK_LATENCY_MS = 0;

export const TOKEN_STORAGE_KEY = "pageai-access-token";
export const REFRESH_TOKEN_STORAGE_KEY = "pageai-refresh-token";
