import { mockResponse, mockFailure, tokenStore } from "@/lib/api";
import type {
  AuthResponse,
  LoginRequest,
  SignupRequest,
  GoogleAuthRequest,
  User,
} from "@/types";

const MOCK_USER: User = {
  id: "u_demo_1",
  name: "David",
  email: "david@example.com",
  role: "student",
  avatarInitial: "D",
  classLevel: "SS3",
  targetExams: ["WAEC", "JAMB"],
  focusSubjects: ["Physics", "Mathematics", "Biology"],
  school: "Federal Government College",
  createdAt: "2026-01-14T09:00:00.000Z",
  lastActiveAt: new Date().toISOString(),
  status: "active",
};

function fakeTokens() {
  const now = Date.now();
  return {
    accessToken: `mock.access.${now}`,
    refreshToken: `mock.refresh.${now}`,
    expiresIn: 3600,
  };
}

export const AuthApi = {
  /**
   * POST /auth/login
   */
  async login(payload: LoginRequest): Promise<AuthResponse> {
    if (!payload.email || payload.password.length < 6) {
      return mockFailure("Invalid email or password.", "VALIDATION_ERROR");
    }
    const tokens = fakeTokens();
    tokenStore.setTokens(tokens.accessToken, tokens.refreshToken);
    return mockResponse({ user: MOCK_USER, tokens });
  },

  /**
   * POST /auth/signup
   */
  async signup(payload: SignupRequest): Promise<AuthResponse> {
    const tokens = fakeTokens();
    tokenStore.setTokens(tokens.accessToken, tokens.refreshToken);
    const user: User = {
      ...MOCK_USER,
      name: payload.name || MOCK_USER.name,
      email: payload.email || MOCK_USER.email,
      classLevel: payload.classLevel ?? MOCK_USER.classLevel,
      targetExams: payload.targetExams ?? MOCK_USER.targetExams,
      focusSubjects: payload.focusSubjects ?? MOCK_USER.focusSubjects,
    };
    return mockResponse({ user, tokens });
  },

  /**
   * POST /auth/google
   */
  async loginWithGoogle(_payload: GoogleAuthRequest): Promise<AuthResponse> {
    const tokens = fakeTokens();
    tokenStore.setTokens(tokens.accessToken, tokens.refreshToken);
    return mockResponse({ user: MOCK_USER, tokens });
  },

  /**
   * POST /auth/logout
   */
  async logout(): Promise<{ success: true }> {
    tokenStore.clear();
    return mockResponse({ success: true });
  },

  /**
   * POST /auth/refresh
   */
  async refreshToken(): Promise<{ accessToken: string }> {
    const tokens = fakeTokens();
    tokenStore.setTokens(tokens.accessToken);
    return mockResponse({ accessToken: tokens.accessToken });
  },

  /**
   * POST /auth/forgot-password
   */
  async requestPasswordReset(email: string): Promise<{ sent: true }> {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return mockFailure("Enter a valid email address.", "VALIDATION_ERROR");
    }
    return mockResponse({ sent: true });
  },

  /**
   * GET /auth/session - used by route guards / the auth provider on load.
   */
  async getSession(): Promise<User | null> {
    const token = tokenStore.getAccessToken();
    if (!token) return mockResponse(null);
    return mockResponse(MOCK_USER);
  },
};
