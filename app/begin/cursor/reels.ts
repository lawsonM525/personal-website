export type FeaturedReel = {
  title: string;
  instagramUrl: string;
  videoSrc?: string;
  posterSrc?: string;
  likes?: string;
  views?: string;
  saves?: string;
};

export type FeaturedReelSection = {
  eyebrow: string;
  title: string;
  description: string;
  reels: FeaturedReel[];
};

export const featuredReelSections: FeaturedReelSection[] = [
  {
    eyebrow: "Teaching proof",
    title: "I make technical ideas feel possible.",
    description:
      "Three examples of practical, approachable technical education.",
    reels: [
      {
        title: "How to vibe code properly",
        instagramUrl: "https://www.instagram.com/reel/DSm0pFcFXkc/",
        videoSrc: "/begin/reels/how-to-vibe-code-properly.mp4",
        posterSrc: "/begin/reels/posters/how-to-vibe-code-properly.jpg",
        likes: "26K",
        views: "484K",
        saves: "30.6K",
      },
      {
        title: "How to add sign in to apps",
        instagramUrl: "https://www.instagram.com/reel/DZbAJwuB5_I/",
        videoSrc: "/begin/reels/clerk-sign-in.mp4",
        posterSrc: "/begin/reels/posters/clerk-sign-in.jpg",
        likes: "2.2K",
        views: "36.8K",
        saves: "1.5K",
      },
      {
        title: "How to land an internship",
        instagramUrl: "https://www.instagram.com/reel/DYjTwGlPmxY/",
        videoSrc: "/begin/reels/how-to-land-an-internship.mp4",
        posterSrc: "/begin/reels/posters/how-to-land-an-internship.jpg",
        likes: "3.3K",
        views: "103K",
        saves: "5K",
      },
    ],
  },
  {
    eyebrow: "Gen Z engagement proof",
    title: "I keep technical education engaging.",
    description:
      "Two examples that turn ambitious technical ideas into compelling stories.",
    reels: [
      {
        title: "Build a predictive model for the NFL",
        instagramUrl: "https://www.instagram.com/reel/DRc05k3Epk3/",
        videoSrc: "/begin/reels/nfl-predictive-model.mp4",
        posterSrc: "/begin/reels/posters/nfl-predictive-model.jpg",
        likes: "25K",
        views: "415K",
        saves: "10.4K",
      },
      {
        title: "What is harness engineering?",
        instagramUrl: "https://www.instagram.com/reel/DWC_I1IDURZ/",
        videoSrc: "/begin/reels/what-is-harness-engineering.mp4",
        posterSrc: "/begin/reels/posters/what-is-harness-engineering.jpg",
        likes: "4.7K",
        views: "83K",
        saves: "4K",
      },
      {
        title: "Learn a programming language",
        instagramUrl: "https://www.instagram.com/p/DV88eQQjZCl/",
        videoSrc: "/begin/reels/learn-programming-language.mp4",
        posterSrc: "/begin/reels/posters/learn-programming-language.jpg",
        likes: "2.4K",
        views: "53K",
        saves: "675",
      },
    ],
  },
  {
    eyebrow: "OpenAI proof",
    title: "I have already helped people discover OpenAI.",
    description: "Three campaign examples, plus a moment from ChatGPT Futures.",
    reels: [
      {
        title: "Codex huge update",
        instagramUrl: "https://www.instagram.com/reel/DXfaldaDbfc/",
        videoSrc: "/begin/reels/codex-huge-update.mp4",
        posterSrc: "/begin/reels/posters/codex-huge-update.jpg",
        likes: "13.7K",
        views: "9M",
        saves: "8.4K",
      },
      {
        title: "Codex for students",
        instagramUrl:
          "https://www.instagram.com/reel/DWgzpR3AKIC/?igsh=NTc4MTIwNjQ2YQ==",
        videoSrc: "/begin/reels/codex-for-students.mp4",
        posterSrc: "/begin/reels/posters/codex-for-students.jpg",
        likes: "2.5K",
        views: "459K",
        saves: "650",
      },
      {
        title: "Can Codex replace OpenClaw?",
        instagramUrl: "https://www.instagram.com/reel/DWYvBzYDt4H/",
        videoSrc: "/begin/reels/codex-vs-openclaw.mp4",
        posterSrc: "/begin/reels/posters/codex-vs-openclaw.jpg",
      },
    ],
  },
];
