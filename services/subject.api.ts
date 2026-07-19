import { mockResponse } from "@/lib/api";
import { subjects } from "@/lib/learn-data";
import type { Subject } from "@/types";

export const SubjectApi = {
  /**
   * GET /subjects
   */
  async getSubjects(): Promise<Subject[]> {
    return mockResponse(subjects);
  },

  /**
   * GET /subjects/:id
   */
  async getSubject(id: string): Promise<Subject | null> {
    return mockResponse(subjects.find((s) => s.id === id) ?? null);
  },
};
