"use client"

import Image from 'next/image'
import { useState } from 'react'

export function UnderConstruction() {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold">Under Construction</h1>
      {!imageError ? (
        <Image
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzJydnhwZWJtYmdrOGQ5OHg1cHgxcml3ZDVtcTNneTF0ajlvOHA4eSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xZsLh7B3KMMyUptD9D/giphy.gif"
          alt="Under Construction"
          width={300}
          height={300}
          className="rounded-lg"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-[300px] h-[300px] bg-gray-300 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">Image unavailable</p>
        </div>
      )}
    </div>
  )
}

