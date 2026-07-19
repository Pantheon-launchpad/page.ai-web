"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthApi } from "@/services/auth.api";
import type { User, LoginRequest, SignupRequest } from "@/types";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (payload: LoginRequest) => Promise<void>;
  signup: (payload: SignupRequest) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * NOT currently mounted in app/layout.tsx. The existing app has no route
 * guarding today (any page is reachable directly), so wrapping the tree in
 * this provider and adding redirects would be a real behavior change, which
 * the frontend freeze explicitly rules out. Wire this in - and add a
 * <RequireAuth> guard around the (app) route group - once real auth exists.
 * See TECHNICAL_DOCUMENTATION.md → "Migrating from mock to production".
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    AuthApi.getSession()
      .then((u) => {
        if (!cancelled) setUser(u);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (payload: LoginRequest) => {
    const res = await AuthApi.login(payload);
    setUser(res.user);
  }, []);

  const signup = useCallback(async (payload: SignupRequest) => {
    const res = await AuthApi.signup(payload);
    setUser(res.user);
  }, []);

  const logout = useCallback(async () => {
    await AuthApi.logout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
