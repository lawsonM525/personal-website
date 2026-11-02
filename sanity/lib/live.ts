import { defineLive } from "next-sanity/live"
import { sanityClient } from "./client"

export const { sanityFetch, SanityLive } = defineLive({
  client: sanityClient,
  // Keep published content fresh when live events are unavailable.
  fetchOptions: { revalidate: 60 },
  serverToken: process.env.SANITY_API_READ_TOKEN,
  browserToken: process.env.SANITY_API_READ_TOKEN,
})
