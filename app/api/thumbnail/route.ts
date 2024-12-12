import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 })
  }

  try {
    const response = await fetch(url)
    const html = await response.text()

    // Extract og:image meta tag
    const match = html.match(/<meta property="og:image" content="(.*?)"/)
    const thumbnailUrl = match ? match[1] : null

    if (thumbnailUrl) {
      return NextResponse.json({ thumbnailUrl })
    } else {
      return NextResponse.json({ error: 'Thumbnail not found' }, { status: 404 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch thumbnail' }, { status: 500 })
  }
}

