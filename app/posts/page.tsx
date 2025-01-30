import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { ProfileHeader } from "@/components/profile-header"
import { PostGrid } from "@/components/post-grid"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Grid, Bookmark, Clapperboard, Video } from 'lucide-react'

export default function PostsPage() {
  return (
    <main className="min-h-screen bg-black">
      <Nav />
      <div className="max-w-4xl mx-auto px-4 pt-20 pb-16">
        <ProfileHeader />
        <Tabs defaultValue="posts" className="mt-8">
          <TabsList className="w-full justify-center border-t border-b border-gray-800">
            <TabsTrigger value="posts" className="flex items-center gap-2 px-8">
              <Grid className="h-4 w-4" />
              <span className="uppercase text-xs font-medium">All</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2 px-8">
              <Bookmark className="h-4 w-4" />
              <span className="uppercase text-xs font-medium">LinkedIn</span>
            </TabsTrigger>
            <TabsTrigger value="reels" className="flex items-center gap-2 px-8">
              <Clapperboard className="h-4 w-4" />
              <span className="uppercase text-xs font-medium">Instagram</span>
            </TabsTrigger>
            <TabsTrigger value="reels" className="flex items-center gap-2 px-8">
              <Video className="h-4 w-4" />
              <span className="uppercase text-xs font-medium">TikTok</span>
            </TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <PostGrid />
          </div>
        </Tabs>
      </div>
      <Footer />
    </main>
  )
}

