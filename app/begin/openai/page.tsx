import ProposalPage from "./proposal-page";
import { Mouse_Memoirs } from "next/font/google";

const mouseMemoirs = Mouse_Memoirs({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Teaching the Next Generation How to Use AI",
  description:
    "A proposal for an ongoing educational partnership between Michelle Lawson (@michellescomputer) and OpenAI.",
};

export default function OpenAIBeginPage() {
  return <ProposalPage emphasisFontClassName={mouseMemoirs.className} />;
}
