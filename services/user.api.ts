import { apiClient, mockResponse } from "@/lib/api";
import { student } from "@/lib/dashboard-data";
import type { User } from "@/types";

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  school?: string;
}

export const UserApi = {
  /**
   * GET /users/me
   */
  async getProfile(): Promise<Pick<User, "name" | "email" | "school" | "avatarInitial"> & typeof student> {
    if (apiClient.mode === "production") {
      return apiClient.get("/users/me");
    }
    return mockResponse({
      ...student,
      name: student.name,
      email: "david@example.com",
      school: "Federal Government College",
      avatarInitial: student.initials,
    });
  },

  /**
   * PATCH /users/me
   */
  async updateProfile(payload: UpdateProfileRequest): Promise<{ success: true }> {
    if (apiClient.mode === "production") {
      return apiClient.patch<{ success: true }>("/users/me", payload);
    }
    return mockResponse({ success: true as const });
  },

  /**
   * DELETE /users/me
   */
  async deleteAccount(): Promise<{ success: true }> {
    if (apiClient.mode === "production") {
      return apiClient.delete<{ success: true }>("/users/me");
    }
    return mockResponse({ success: true as const });
  },
};
