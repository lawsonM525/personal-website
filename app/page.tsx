import type { Metadata } from "next"
import HomeDesktop from "@/components/homepage/home-desktop"

export const metadata: Metadata = {
  title: { absolute: "Michelle’s Computer — a little corner of the internet" },
  description: "Figuring out life in the age of AI with Michelle Lawson. Explore the magazine in the making, join the waitlist, or sign up to be pen pals.",
  alternates: { canonical: "https://michellescomputer.com/" },
  openGraph: {
    title: "Michelle’s Computer",
    description: "Open tabs, big ideas & little letters. A magazine in the making and a little post office from Michelle Lawson.",
    url: "https://michellescomputer.com/",
    images: [{ url: "https://michellescomputer.com/homepage/magazine-banner.webp", width: 1200, height: 400, alt: "Michelle’s Computer — the magazine" }],
  },
  twitter: { card: "summary_large_image", title: "Michelle’s Computer", images: ["https://michellescomputer.com/homepage/magazine-banner.webp"] },
}

export default function Home() {
  return <HomeDesktop />
}

