"use client"

import { useState } from "react"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { ProfileHeader } from "@/components/profile-header"
import { PostGrid } from "@/components/post-grid"
import { InstagramEmbed } from "@/components/instagram-embed"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Grid, Bookmark, Clapperboard, Video } from 'lucide-react'
import posts from "@/data/posts.json"

const favoriteInstagramPosts = posts.filter((post) => post.type === "instagram")

export default function PostsPage() {
  const [activeTab, setActiveTab] = useState("posts")

  return (
    <main className="min-h-screen bg-black">
      <Nav />
      <div className="max-w-4xl mx-auto px-4 pt-20 pb-28">
        <ProfileHeader />
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="w-full justify-center border-t border-b border-gray-800">
            <TabsTrigger value="posts" onClick={() => setActiveTab("posts")} className="flex items-center gap-2 px-8">
              <Grid className="h-4 w-4" />
              <span className="uppercase text-xs font-medium">All</span>
            </TabsTrigger>
            <TabsTrigger value="reels" onClick={() => setActiveTab("reels")} className="flex items-center gap-2 px-8">
              <Clapperboard className="h-4 w-4" />
              <span className="uppercase text-xs font-medium">Instagram</span>
            </TabsTrigger>
            <TabsTrigger value="saved" onClick={() => setActiveTab("saved")} className="flex items-center gap-2 px-8">
              <Bookmark className="h-4 w-4" />
              <span className="uppercase text-xs font-medium">LinkedIn</span>
            </TabsTrigger>
            <TabsTrigger value="tiktok" onClick={() => setActiveTab("tiktok")} className="flex items-center gap-2 px-8">
              <Video className="h-4 w-4" />
              <span className="uppercase text-xs font-medium">TikTok</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="mt-6">
            <PostGrid />
          </TabsContent>
          <TabsContent value="saved" className="mt-6">
            <PostGrid platform="LinkedIn" />
          </TabsContent>
          <TabsContent value="reels" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              {favoriteInstagramPosts.map((post) => (
                <InstagramEmbed
                  key={post.id}
                  url={post.link}
                  caption={post.description}
                  date={post.date}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="tiktok" className="mt-6">
            <PostGrid platform="TikTok" />
          </TabsContent>
        </Tabs>
      </div>
      <Footer fixed={false} />
    </main>
  )
}
