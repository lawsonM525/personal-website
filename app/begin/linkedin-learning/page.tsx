import { Mouse_Memoirs } from "next/font/google";
import LinkedInLearningProposal from "./proposal-page";

const mouseMemoirs = Mouse_Memoirs({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Build an AI System for Your Career | LinkedIn Learning Course Pitch",
  description:
    "Michelle Lawson’s proposal for a practical LinkedIn Learning course about using AI to understand yourself, build career evidence, find opportunities, and do better work.",
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
