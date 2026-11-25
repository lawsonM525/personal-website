import { Mouse_Memoirs } from "next/font/google";
import FigmaProposalPage from "./proposal-page";

const mouseMemoirs = Mouse_Memoirs({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Figma Tutorials for Your Biggest Ideas | Figma × Michelle Lawson",
  description:
    "A creator education proposal starting with a Figma vision board for the year ahead, then teaching Gen Z to prototype ambitious ideas and make them real.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function FigmaPitchPage() {
  return <FigmaProposalPage emphasisFontClassName={mouseMemoirs.className} />;
}
