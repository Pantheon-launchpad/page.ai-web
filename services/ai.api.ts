import { mockResponse } from "@/lib/api";

/**
 * Page.AI's tutoring intelligence is designed to run on-device via Gemma +
 * LiteRT-LM (see the product docs), with a cloud provider as an optional
 * fallback for devices that can't run the on-device model. Every AI-touching
 * page (AI Tutor, Chat with Book, mnemonic generation, adaptive difficulty)
 * should go through this abstraction rather than calling a provider
 * directly, so swapping or adding a provider later is a one-file change.
 */

export type AiProvider = "gemma-ondevice" | "cloud";

export interface AiMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AiStructuredRequest<TSchema = unknown> {
  task: string;
  provider?: AiProvider;
  context: Record<string, unknown>;
  responseSchema: TSchema;
}

export interface RemediationContext {
  subject: string;
  topic: string;
  questionStem: string;
  studentChosenOption: string;
  correctOption: string;
  masteryScore: number;
  readingLevelHint?: string;
  recentMistakesSameTopic?: string[];
}

export interface RemediationResult {
  explanation: string;
  misconceptionSummary: string;
  mnemonic: string;
  followUpQuestion: {
    stem: string;
    options: string[];
    correctIndex: number;
  };
  difficultyAdjustment: "easier" | "same" | "harder";
}

export const AiApi = {
  /**
   * POST /ai/chat
   * Body: { messages: AiMessage[], provider? }
   * Streaming in production: the real implementation should return a
   * ReadableStream / Server-Sent-Events response and the caller consumes it
   * token-by-token (see `streamChat` below) - this non-streaming variant
   * exists for simpler call sites (e.g. a single canned-style reply).
   */
  async chat(
    messages: AiMessage[],
    _provider: AiProvider = "gemma-ondevice",
  ): Promise<{ reply: string }> {
    const last = messages[messages.length - 1]?.content ?? "";
    return mockResponse({ reply: `(mock) Thinking about: "${last}"` });
  },

  /**
   * Streaming variant. Production: opens an SSE/WebSocket connection to the
   * inference runtime and calls `onToken` for every chunk as Gemma
   * generates it, matching the "typing" streaming effect already used in
   * the AI Tutor and Chat with Book UI. Mock mode fakes the same shape by
   * chunking a canned string.
   */
  async streamChat(
    messages: AiMessage[],
    onToken: (token: string) => void,
    _provider: AiProvider = "gemma-ondevice",
  ): Promise<void> {
    const reply = `(mock) Thinking about: "${messages[messages.length - 1]?.content ?? ""}"`;
    for (const word of reply.split(" ")) {
      onToken(word + " ");
      await new Promise((r) => setTimeout(r, 0));
    }
  },

  /**
   * POST /ai/remediate
   * The core tutoring loop: given a wrong answer, returns an explanation,
   * misconception diagnosis, mnemonic, and a follow-up question - matching
   * the on-device prompt contract described in the product docs.
   */
  async remediate(context: RemediationContext): Promise<RemediationResult> {
    return mockResponse({
      explanation: `Let's break down why "${context.studentChosenOption}" doesn't fit here, and rebuild toward "${context.correctOption}".`,
      misconceptionSummary:
        "A common mix-up between two related ideas in this topic.",
      mnemonic: `Remember: think of ${context.topic} as a pattern, not a single fact.`,
      followUpQuestion: {
        stem: `A related question about ${context.topic}...`,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctIndex: 1,
      },
      difficultyAdjustment: "same",
    });
  },

  /**
   * POST /ai/mnemonic
   */
  async generateMnemonic(
    concept: string,
    _subject: string,
  ): Promise<{ mnemonic: string }> {
    return mockResponse({ mnemonic: `A short memory hook for "${concept}".` });
  },

  /**
   * POST /ai/vision - document/image understanding (e.g. a photographed
   * textbook page). Prepared, not implemented.
   */
  async analyzeImage(
    _file: File,
    _prompt: string,
  ): Promise<{ description: string }> {
    return mockResponse({
      description: "(mock) Image analysis is not yet implemented.",
    });
  },

  /**
   * POST /ai/documents - long-document processing (e.g. an uploaded PDF for
   * Chat with Book). Prepared, not implemented.
   */
  async processDocument(
    _fileId: string,
  ): Promise<{ chapters: number; summary: string }> {
    return mockResponse({
      chapters: 1,
      summary: "(mock) Document processing is not yet implemented.",
    });
  },
};
