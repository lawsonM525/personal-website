import type { Metadata } from "next"
import SignupPage from "@/components/homepage/signup-page"

export const metadata: Metadata = {
  title: { absolute: "The magazine waitlist | Michelle’s Computer" },
  description: "Join Michelle’s Computer magazine waitlist for updates as the illustrated magazine about AI and learning comes together.",
  alternates: { canonical: "https://michellescomputer.com/magazine" },
}

export default function MagazinePage() { return <SignupPage kind="magazine" /> }
