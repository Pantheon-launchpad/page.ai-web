import { mockResponse } from "@/lib/api";
import { tutorCapabilities, tutorExamplePrompts, tutorCannedReplies } from "@/lib/learn-data";

export const TutorApi = {
  /**
   * GET /ai/tutor/capabilities
   */
  async getCapabilities() {
    return mockResponse({ capabilities: tutorCapabilities, examplePrompts: tutorExamplePrompts });
  },

  /**
   * POST /ai/tutor/message
   * Body: { message: string }
   * In mock mode this looks up a canned reply; in production this proxies to
   * the AI abstraction layer (see AiApi) which may stream tokens instead.
   */
  async sendMessage(message: string): Promise<{ reply: string }> {
    const reply = tutorCannedReplies[message.trim().toLowerCase()] ?? tutorCannedReplies.default;
    return mockResponse({ reply });
  },
};
