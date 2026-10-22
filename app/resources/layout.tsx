import type { Metadata } from "next"
import { redirect } from "next/navigation"

// Content files are retained for Michelle to turn into articles later.
export const metadata: Metadata = { robots: { index:false, follow:false } }
export default function ArchivedResourcesLayout() { redirect("/learn") }
