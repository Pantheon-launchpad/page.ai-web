export type ApiErrorCode =
  | "NETWORK_ERROR"
  | "TIMEOUT"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "SERVER_ERROR"
  | "CANCELLED"
  | "UNKNOWN";

export class ApiError extends Error {
  code: ApiErrorCode;
  status?: number;
  details?: unknown;

  constructor(message: string, code: ApiErrorCode = "UNKNOWN", status?: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
    this.details = details;
  }

  static fromStatus(status: number, message: string, details?: unknown) {
    const code: ApiErrorCode =
      status === 401 ? "UNAUTHORIZED" :
      status === 403 ? "FORBIDDEN" :
      status === 404 ? "NOT_FOUND" :
      status === 422 || status === 400 ? "VALIDATION_ERROR" :
      status >= 500 ? "SERVER_ERROR" : "UNKNOWN";
    return new ApiError(message, code, status, details);
  }
}
