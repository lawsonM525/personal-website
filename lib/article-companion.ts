export const alignmentVideo = {
  articleSlug: "ai-alignment-and-ai-safety",
  afterText: "This is the problem of AI alignment.",
  title: "AI misalignment, explained with Steven Universe",
  description: "Michelle Lawson uses Steven Universe’s Frybo to explain the gap between following an instruction and doing what a person actually intended.",
  sourceUrl: "https://www.instagram.com/p/De4_7QUybQs/",
  contentPath: "/learn/videos/ai-misalignment-steven-universe.mp4",
  posterPath: "/learn/videos/ai-misalignment-steven-universe.jpg",
  captionsPath: "/learn/videos/ai-misalignment-steven-universe.vtt",
  uploadDate: "2026-10-24T20:33:58.000Z",
  duration: "PT1M17S",
  transcript: [
    "How can AI take over the world when it keeps making things up, it can’t follow simple instructions, and it really can’t make any good art? Steven Universe actually explains this.",
    "Yesterday, I was watching Steven Universe and eating dinner, as one does. And there’s this kid, Peedee, who hates wearing his family’s French Frybo mascot costume. So Steven gets a gem shard and puts it in the costume so that the costume can do his job without him. He automated away his job.",
    "And they observed it for a bit, right? They could see that it could dance and it followed instructions, so they left it with one last instruction: just go make people eat fries.",
    "Now, if you were telling this to a person, it’s kind of harmless. Like, okay, attract customers and sell some fries, make money for the business. You live to maximize shareholder value. But Frybo takes it quite literally and starts shoving fries in people’s mouths. He’s making people eat fries.",
    "Now imagine you tell an AI agent to free up some space on your computer, and then it deletes all of your files. Did it free up space on your computer? It did. Did it do what you wanted it to do? Absolutely not.",
    "And this is the problem of misalignment, one of the biggest AI risks right now. A system that’s doing what you asked it to do, but not in the way that you wanted it to, can get really dangerous.",
    "Frybo didn’t technically hate humans. I don’t think he cared. He just really wanted to make people eat fries.",
  ],
};

type BodyBlock = { _type?: string; url?: unknown; children?: unknown[] };

function isCompanionUrl(value?: unknown) {
  if (typeof value !== "string" || !value) return false;
  if (value.split(/[?#]/)[0] === alignmentVideo.contentPath) return true;
  try {
    const url = new URL(value);
    return url.hostname.replace(/^www\./, "") === "instagram.com" && /^\/(p|reel|tv)\/De4_7QUybQs\/?$/.test(url.pathname);
  } catch { return false; }
}

export function companionPosition(slug: string, body: BodyBlock[]) {
  if (slug !== alignmentVideo.articleSlug) return null;
  if (body.some(block => block._type === "videoEmbed" && isCompanionUrl(block.url))) return null;
  const index = body.findIndex(block => block._type === "block" && block.children?.map(span => span && typeof span === "object" && "text" in span && typeof span.text === "string" ? span.text : "").join("").trim() === alignmentVideo.afterText);
  return index === -1 ? body.length : index + 1;
}

export function companionVideoSchema(canonical: string, absolute: (path: string) => string, creatorId: string) {
  return {
    "@type": "VideoObject",
    "@id": `${canonical}#alignment-video`,
    name: alignmentVideo.title,
    description: alignmentVideo.description,
    thumbnailUrl: [absolute(alignmentVideo.posterPath)],
    contentUrl: absolute(alignmentVideo.contentPath),
    uploadDate: alignmentVideo.uploadDate,
    duration: alignmentVideo.duration,
    inLanguage: "en",
    creator: { "@type": "Person", "@id": creatorId, name: "Michelle Lawson" },
    isBasedOn: alignmentVideo.sourceUrl,
    transcript: alignmentVideo.transcript.join("\n\n"),
  };
}
