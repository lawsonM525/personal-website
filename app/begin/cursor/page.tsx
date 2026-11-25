import type { Metadata } from "next";
import ProposalPage from "./proposal-page";
import { Mouse_Memoirs } from "next/font/google";
import { buildPageMetadata } from "@/lib/seo";

const mouseMemoirs = Mouse_Memoirs({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = buildPageMetadata({
  title: "Teaching the Next Generation How to Build with Cursor",
  description:
    "A proposal for a 30-video educational series between Michelle Lawson (@michellescomputer) and Cursor, beginning with the first 10 practical how-tos.",
  path: "/begin/cursor",
  imageEyebrow: "CURSOR × MICHELLE LAWSON",
});

export default function CursorProposalPage() {
  return <ProposalPage emphasisFontClassName={mouseMemoirs.className} />;
}
