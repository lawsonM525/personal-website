import type { PortableTextBlock } from "@portabletext/types";

export type LearnAuthor = {
  name: string;
  role?: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type LearnResource = {
  _key: string;
  title: string;
  url: string;
  description?: string;
};

export type LearnFaq = {
  _key: string;
  question: string;
  answer: string;
};

export type LearnComment = {
  _id: string;
  displayName: string;
  message: string;
  submittedAt: string;
};

export type LearnArticleCard = {
  _id: string;
  title: string;
  dek: string;
  slug: string;
  publishedAt: string;
  category: string;
  topics?: string[];
  featured?: boolean;
  coverImageUrl?: string;
  coverImageAlt?: string;
  author?: LearnAuthor;
  estimatedWords?: number;
};

export type LearnArticle = LearnArticleCard & {
  summary?: string;
  body?: PortableTextBlock[];
  resources?: LearnResource[];
  faq?: LearnFaq[];
  sourceUrl?: string;
  comments?: LearnComment[];
  likeCount?: number;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    noIndex?: boolean;
  };
};

export const categoryLabels: Record<string, string> = {
  ai: "AI, explained",
  career: "Career",
  college: "College",
  building: "Building in public",
  life: "Life & identity",
};

export function readingTime(words = 0) {
  return Math.max(1, Math.ceil(words / 220));
}
