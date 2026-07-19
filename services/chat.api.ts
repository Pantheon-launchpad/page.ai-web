import { mockResponse } from "@/lib/api";
import { chatSources, bookPersonas, bookGameChips } from "@/lib/learn-data";
import type { ChatSource } from "@/types";

export const ChatApi = {
  /**
   * GET /chat/sources
   */
  async getSources(): Promise<ChatSource[]> {
    return mockResponse(chatSources);
  },

  getPersonaChips() {
    return { personas: bookPersonas, games: bookGameChips };
  },

  /**
   * POST /chat/:sourceId/message
   * Body: { message: string }
   */
  async sendMessage(_sourceId: string, _message: string): Promise<{ reply: string }> {
    return mockResponse({
      reply:
        "Good question. Give me a moment to find that in the chapter - meanwhile, tell me: do you want the short version or the deep dive?",
    });
  },

  /**
   * POST /chat/upload - user-provided PDF/textbook as a chat source
   */
  async uploadSource(_file: File): Promise<ChatSource> {
    return mockResponse({
      id: `upload-${Date.now()}`,
      title: "Uploaded document",
      subject: "General",
      chapters: 1,
    });
  },
};
