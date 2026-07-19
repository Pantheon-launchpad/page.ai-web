import { mockResponse } from "@/lib/api";
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
  async updateProfile(_payload: UpdateProfileRequest): Promise<{ success: true }> {
    return mockResponse({ success: true as const });
  },

  /**
   * DELETE /users/me
   */
  async deleteAccount(): Promise<{ success: true }> {
    return mockResponse({ success: true as const });
  },
};
