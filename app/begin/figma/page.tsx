import { Mouse_Memoirs } from "next/font/google";
import FigmaProposalPage from "./proposal-page";

const mouseMemoirs = Mouse_Memoirs({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Make the Idea Real | Figma × Michelle Lawson",
  description:
    "A creator education proposal showing Gen Z how to turn ideas into designs, prototypes, presentations, and things they can share.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function FigmaPitchPage() {
  return <FigmaProposalPage emphasisFontClassName={mouseMemoirs.className} />;
}
