import type { PortableTextBlock } from "@portabletext/types";

export type CompletedLearning = { title: string; label?: string; recapHref?: string };
export type CurriculumSection = { id: string; title: string; heading?: PortableTextBlock; blocks: PortableTextBlock[]; module: boolean };

// Michelle's progress, rather than a visitor checklist. Add a recap URL once published.
export const symbolicSystemsProgress: CompletedLearning[] = [{
  title: "Gödel, Escher, Bach: An Eternal Golden Braid",
  label: "Gödel, Escher, Bach",
}];

export function blockText(block: PortableTextBlock) {
  return (block.children || []).map(child => "text" in child ? String(child.text) : "").join("");
}

export function curriculumBlockId(key: string) { return `curriculum-reading-${key}`; }

export function curriculumSections(body: PortableTextBlock[]): CurriculumSection[] {
  const sections: CurriculumSection[] = [];
  const used = new Map<string, number>();
  for (const block of body) {
    if (block._type === "block" && block.style === "h2") {
      const title = blockText(block);
      const base = `curriculum-${title.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section"}`;
      const count = (used.get(base) || 0) + 1;
      used.set(base, count);
      sections.push({ id: count === 1 ? base : `${base}-${count}`, title, heading: block, blocks: [], module: /^[1-8]\s/.test(title) });
    } else {
      if (!sections.length) sections.push({ id: "curriculum-introduction", title: "Why I’m studying this", blocks: [], module: false });
      sections[sections.length - 1].blocks.push(block);
    }
  }
  return sections;
}

export function completedReadings(body: PortableTextBlock[], completed: CompletedLearning[]) {
  return completed.flatMap(item => {
    const block = body.find(block => blockText(block).includes(item.title));
    if (!block?._key) return [];
    // Recaps stay on this website. Never invent a URL for an unwritten article.
    const recapHref = item.recapHref?.startsWith("/") && !item.recapHref.startsWith("//") ? item.recapHref : undefined;
    return [{ ...item, recapHref, targetId: curriculumBlockId(block._key) }];
  });
}

// Add a display-only marker while retaining every original emphasis and link mark.
export function highlightCompletedLearning(body: PortableTextBlock[], completed: CompletedLearning[]) {
  return body.map(block => {
    if (block._type !== "block") return block;
    const text = blockText(block);
    const ranges = completed.flatMap(item => {
      const start = text.indexOf(item.title);
      return start < 0 ? [] : [{ start, end: start + item.title.length }];
    });
    if (!ranges.length) return block;
    let offset = 0;
    const children = block.children.flatMap(child => {
      if (child._type !== "span" || typeof child.text !== "string") return [child];
      const start = offset, end = start + child.text.length;
      offset = end;
      const cuts = [...new Set([start, end, ...ranges.flatMap(range => [range.start, range.end]).filter(point => point > start && point < end)])].sort((a, b) => a - b);
      return cuts.slice(0, -1).map((point, index) => ({
        ...child, _key: `${child._key}-${index}`, text: child.text.slice(point - start, cuts[index + 1] - start),
        marks: ranges.some(range => point >= range.start && point < range.end) ? [...(child.marks || []), "completedLearning"] : child.marks,
      }));
    });
    return { ...block, children };
  });
}
