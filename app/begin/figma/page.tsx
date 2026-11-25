import type { Metadata } from "next";
import { Mouse_Memoirs } from "next/font/google";
import FigmaProposalPage from "./proposal-page";
import { buildPageMetadata } from "@/lib/seo";

const mouseMemoirs = Mouse_Memoirs({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Figma Tutorials for Your Biggest Ideas",
    description:
      "A creator education proposal starting with a Figma vision board for the year ahead, then teaching Gen Z to prototype ambitious ideas and make them real.",
    path: "/begin/figma",
    imageEyebrow: "FIGMA × MICHELLE LAWSON",
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default function FigmaPitchPage() {
  return <FigmaProposalPage emphasisFontClassName={mouseMemoirs.className} />;
}
