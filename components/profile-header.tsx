import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Settings } from 'lucide-react'
import profileImage from "@/assets/michelle-pink.jpeg"

export function ProfileHeader() {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
      <div className="relative w-32 h-32 rounded-full overflow-hidden">
        <Image
          src={profileImage}
          alt="Profile"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-xl font-semibold">michellexcomputer</h1>
          <Button variant="outline" size="sm">
            Let's connect!
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-8 mb-4">
          <div className="flex gap-1">
            <span className="font-semibold">lots of</span>
            <span className="text-gray-400">posts</span>
          </div>
          <div className="flex gap-1">
            <span className="font-semibold">159k</span>
            <span className="text-gray-400">followers</span>
          </div>
          <div className="flex gap-1">
            <span className="font-semibold">525</span>
            <span className="text-gray-400">following</span>
          </div>
        </div>
        <div className="space-y-2">
          <p className="font-semibold">Michelle Lawson</p>
          <p className="text-gray-400">Turning my ideas, and yours, into reality.</p>
          <p>
            <a href="https://instagram.com/michellexcomputer" className="text-blue-400 hover:underline">instagram.com/michellexcomputer</a>
          </p>
          <p>
            <a href="https://www.linkedin.com/in/michelle-o-lawson/" className="text-blue-400 hover:underline">linkedin.com/in/michelle-o-lawson</a>
          </p>
        </div>
      </div>
    </div>
  )
}

