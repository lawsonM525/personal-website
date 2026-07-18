import type { Metadata } from "next"
import { ComputerClient } from "./computer-client"

export const metadata: Metadata = {
  title: "Michelle's Computer — Resources",
  description: "A pixel desktop-style resource hub for tools, quests, and learning paths.",
}

export default function MichellesComputerPage() {
  return <ComputerClient />
}
