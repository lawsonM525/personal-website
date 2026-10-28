import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server"
import { trackAICrawlerRequest } from "@datafast/ai-crawl"
import { publicCrawlerRequest } from "@/lib/crawler-analytics"

export function middleware(request: NextRequest, event: NextFetchEvent) {
  if (process.env.VERCEL_ENV === "production") {
    trackAICrawlerRequest(publicCrawlerRequest(request), event, {
      websiteId: "dfid_gnPpnmddrlFsxJ4e9ZBvm",
      domain: "michellescomputer.com",
      publicOrigin: "https://michellescomputer.com",
      additionalIgnoredPathPrefixes: ["/feedback", "/begin", "/openaibeta"],
      timeoutMs: 1500,
    })
  }
  return NextResponse.next()
}

export const config = { matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"] }
