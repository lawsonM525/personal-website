import Image from "next/image"
import { ProfileStats } from "./profile-stats"
import { Button } from "@/components/ui/button"

export function ProfileHeader() {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center py-8">
      <div className="relative w-32 h-32 rounded-full overflow-hidden">
        <Image
          src="/placeholder.svg?height=128&width=128"
          alt="Profile"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-2xl font-semibold text-white">michellexcomputer</h1>
          <Button variant="outline" size="sm">
            Edit profile
          </Button>
        </div>
        <ProfileStats />
        <div className="space-y-2 text-white">
          <p className="font-semibold">Michelle Lawson</p>
          <p className="text-gray-400">Building the future of technology | CS @ MIT</p>
          <p className="text-gray-400">Founder of multiple tech initiatives</p>
          <a href="#" className="text-blue-400 hover:underline">links.michellexcomputer.com</a>
        </div>
      </div>
    </div>
  )
}

