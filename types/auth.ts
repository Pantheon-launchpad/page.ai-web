import type { ID } from "./common";

export type Role = "student" | "teacher" | "school_admin" | "moderator" | "super_admin";

export type ExamTrack = "WAEC" | "JAMB" | "NECO" | "Post-UTME";
export type ClassLevel = "SS1" | "SS2" | "SS3" | "100 Level" | "200 Level";

export interface User {
  id: ID;
  name: string;
  email: string;
  role: Role;
  avatarInitial: string;
  classLevel?: ClassLevel;
  targetExams?: ExamTrack[];
  focusSubjects?: string[];
  school?: string;
  createdAt: string;
  lastActiveAt?: string;
  status: "active" | "suspended" | "banned";
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  classLevel?: ClassLevel;
  targetExams?: ExamTrack[];
  focusSubjects?: string[];
  referralCode?: string;
}

export interface GoogleAuthRequest {
  idToken: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}
