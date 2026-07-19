import { mockResponse } from "@/lib/api";
import { helpFaqs } from "@/lib/settings-data";

export const HelpApi = {
  /**
   * GET /help/faqs
   */
  async getFaqs() {
    return mockResponse(helpFaqs);
  },

  /**
   * POST /help/contact
   * Body: { subject, message }
   */
  async contactSupport(_subject: string, _message: string): Promise<{ success: true }> {
    return mockResponse({ success: true as const });
  },
};
