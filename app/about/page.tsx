import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { UnderConstruction } from "@/components/under-construction"

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Nav onCommandOpen={() => {}} />
      <UnderConstruction />
      <Footer />
    </main>
  )
}

