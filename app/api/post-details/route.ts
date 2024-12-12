import { NextResponse } from 'next/server'
import posts from '@/data/posts.json'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'Post ID is required' }, { status: 400 })
  }

  const post = posts.find(p => p.id === id)

  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  // In a real application, you would fetch additional details here
  // For now, we'll just return the data we have
  return NextResponse.json({
    image: "/placeholder.svg?height=600&width=600", // You would fetch the actual image URL here
    description: post.description,
    date: post.date,
  })
}

