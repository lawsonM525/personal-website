import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { PostGrid } from "@/components/post-grid"

export default function PostsPage() {
  return (
    <main className="min-h-screen">
      <Nav />
      <div className="max-w-4xl mx-auto px-4 pt-20 pb-16">
        <h1 className="text-4xl font-bold mb-8">Posts</h1>
        <PostGrid />
      </div>
      <Footer />
    </main>
  )
}

