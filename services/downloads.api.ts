import { mockResponse } from "@/lib/api";
import { downloadedItems, storageTotalMB } from "@/lib/settings-data";

export const DownloadsApi = {
  /**
   * GET /downloads
   */
  async getDownloads() {
    return mockResponse({ items: downloadedItems, storageTotalMB });
  },

  /**
   * DELETE /downloads/:id
   */
  async removeDownload(_id: string): Promise<{ success: true }> {
    return mockResponse({ success: true as const });
  },
};
