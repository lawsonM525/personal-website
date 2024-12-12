import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { UnderConstruction } from "@/components/under-construction"

export default function Resources() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Nav />
      <UnderConstruction />
      <Footer />
    </main>
  )
}

