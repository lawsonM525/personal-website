import { Mouse_Memoirs } from "next/font/google";
import MbaMissionProposal from "./proposal-page";

const mouseMemoirs = Mouse_Memoirs({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Bring mbaMission to 250,000 Gen Z Learners",
  description:
    "A three-school creator campaign following Michelle Lawson's Stanford GSB, Harvard Business School, and Wharton application journey.",
  openGraph: {
    title: "Bring mbaMission to 250,000 Gen Z Learners",
    description:
      "Three MBA applications. Three guaranteed videos. One real admissions journey.",
    images: ["/begin/mbamission/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bring mbaMission to 250,000 Gen Z Learners",
    description:
      "Three MBA applications. Three guaranteed videos. One real admissions journey.",
    images: ["/begin/mbamission/og.png"],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function MbaMissionPitchPage() {
  return <MbaMissionProposal emphasisFontClassName={mouseMemoirs.className} />;
}
