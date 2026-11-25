import type { Metadata } from "next";
import { Mouse_Memoirs } from "next/font/google";
import LinkedInLearningProposal from "./proposal-page";
import { buildPageMetadata } from "@/lib/seo";

const mouseMemoirs = Mouse_Memoirs({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Build an AI System for Your Career | LinkedIn Learning Course Pitch",
    description:
      "Michelle Lawson’s proposal for a practical LinkedIn Learning course about using AI to understand yourself, build career evidence, find opportunities, and do better work.",
    path: "/begin/linkedin-learning",
    imageEyebrow: "LINKEDIN LEARNING × MICHELLE LAWSON",
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default function LinkedInLearningPitchPage() {
  return (
    <LinkedInLearningProposal
      emphasisFontClassName={mouseMemoirs.className}
    />
  );
}
