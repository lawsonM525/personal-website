import type { Metadata } from "next"
import SignupPage from "@/components/homepage/signup-page"

export const metadata: Metadata = {
  title: { absolute: "Wanna be pen pals? | Michelle’s Computer" },
  description: "Sign up for Michelle Lawson’s pen pal interest list. A little post office from Michelle’s Computer.",
  alternates: { canonical: "https://michellescomputer.com/penpals" },
}

export default function PenpalsPage() { return <SignupPage kind="penpals" /> }
