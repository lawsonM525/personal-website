import type { Metadata } from "next"
import HomeDesktop from "@/components/homepage/home-desktop"

export const metadata: Metadata = {
  title: { absolute: "Michelle’s Computer | Michelle Lawson" },
  description: "Turning my ideas, and yours, into reality. Guides, projects, and resources from Michelle Lawson. Join the magazine waitlist or sign up to be pen pals.",
  alternates: { canonical: "https://michellescomputer.com/" },
  openGraph: {
    title: "Michelle’s Computer",
    description: "Turning my ideas, and yours, into reality. Learn, explore resources, join the magazine waitlist, or sign up to be pen pals.",
    url: "https://michellescomputer.com/",
    images: [{ url: "https://michellescomputer.com/opengraph-image", width: 1200, height: 630, alt: "Michelle’s Computer" }],
  },
  twitter: { card: "summary_large_image", title: "Michelle’s Computer", images: ["https://michellescomputer.com/opengraph-image"] },
}

export default async function Home({ searchParams }: { searchParams: Promise<{ desktop?: string | string[]; letter?: string | string[] }> }) {
  const query = await searchParams
  return <HomeDesktop startOnDesktop={query.desktop === "1"} openLetter={query.letter === "1"} />
}

