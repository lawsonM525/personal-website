import type { Metadata } from "next"
import SignupPage from "@/components/homepage/signup-page"

export const metadata: Metadata = {
  title: { absolute: "Wanna be pen pals? | Michelle’s Computer" },
  description: "Sign up to be pen pals with Michelle Lawson. If you’re in the United States, Michelle might send you a physical letter. Outside the US, she’ll send you an email.",
  alternates: { canonical: "https://michellescomputer.com/penpals" },
}

export default function PenpalsPage() { return <SignupPage kind="penpals" /> }
