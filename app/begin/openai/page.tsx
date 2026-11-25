import type { Metadata } from "next";
import ProposalPage from "./proposal-page";
import { Mouse_Memoirs } from "next/font/google";
import { buildPageMetadata } from "@/lib/seo";

const mouseMemoirs = Mouse_Memoirs({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = buildPageMetadata({
  title: "Teaching the Next Generation How to Use AI",
  description:
    "A proposal for an ongoing educational partnership between Michelle Lawson (@michellescomputer) and OpenAI.",
  path: "/begin/openai",
  imageEyebrow: "OPENAI × MICHELLE LAWSON",
});

export default function OpenAIBeginPage() {
  return <ProposalPage emphasisFontClassName={mouseMemoirs.className} />;
}
