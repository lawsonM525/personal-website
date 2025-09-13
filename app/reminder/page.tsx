import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"


export default function Reminder() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Nav />
      <section className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto py-12">
        <blockquote className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight">
          You can achieve anything that you can imagine. Seriously.
        </blockquote>
      </section>
      <Footer />
    </main>
  )
}
