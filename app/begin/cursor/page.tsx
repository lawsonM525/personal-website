import ProposalPage from "./proposal-page";
import { Mouse_Memoirs } from "next/font/google";

const mouseMemoirs = Mouse_Memoirs({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Teaching the Next Generation How to Build with Cursor",
  description:
    "A proposal for a 12-month educational partnership between Michelle Lawson (@michellescomputer) and Cursor.",
};

export default function CursorProposalPage() {
  return <ProposalPage emphasisFontClassName={mouseMemoirs.className} />;
}
