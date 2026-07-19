import { mockResponse } from "@/lib/api";
import { subjects, resources } from "@/lib/learn-data";

export interface SearchResult {
  id: string;
  type: "subject" | "resource";
  title: string;
  subtitle: string;
  href: string;
}

export const SearchApi = {
  /**
   * GET /search?q=
   */
  async search(query: string): Promise<SearchResult[]> {
    const q = query.trim().toLowerCase();
    if (!q) return mockResponse([]);

    const subjectResults: SearchResult[] = subjects
      .filter((s) => s.name.toLowerCase().includes(q))
      .map((s) => ({ id: s.id, type: "subject", title: s.name, subtitle: `${s.topics} topics`, href: "/subjects" }));

    const resourceResults: SearchResult[] = resources
      .filter((r) => r.title.toLowerCase().includes(q) || r.subject.toLowerCase().includes(q))
      .map((r) => ({ id: r.id, type: "resource", title: r.title, subtitle: r.subject, href: "/resources" }));

    return mockResponse([...subjectResults, ...resourceResults]);
  },
};
