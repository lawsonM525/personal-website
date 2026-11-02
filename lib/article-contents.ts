import type { PortableTextBlock } from "@portabletext/types";

export type ArticleContentsEntry = { key: string; id: string; title: string; level: 2 | 3 };

export function articleContents(body: PortableTextBlock[]): ArticleContentsEntry[] {
  const used = new Map<string, number>();
  return body.flatMap(block => {
    if (block._type !== "block" || !block._key || !["h2", "h3"].includes(block.style || "")) return [];
    const title = block.children.map(child => "text" in child ? String(child.text) : "").join("").trim();
    if (!title) return [];
    const base = "section-" + (title.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "heading");
    const count = (used.get(base) || 0) + 1;
    used.set(base, count);
    return [{ key: block._key, id: count === 1 ? base : base + "-" + count, title, level: block.style === "h2" ? 2 as const : 3 as const }];
  });
}
