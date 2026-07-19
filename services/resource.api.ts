import { mockResponse } from "@/lib/api";
import { resources, resourceTypeLabels } from "@/lib/learn-data";
import type { Resource, ResourceType } from "@/types";

export const ResourceApi = {
  /**
   * GET /resources?type=&subject=&search=
   */
  async getResources(): Promise<Resource[]> {
    return mockResponse(resources);
  },

  getTypeLabels(): Record<ResourceType, string> {
    return resourceTypeLabels;
  },

  /**
   * POST /resources/:id/bookmark
   */
  async toggleBookmark(_id: string, _bookmarked: boolean): Promise<{ success: true }> {
    return mockResponse({ success: true as const });
  },
};
