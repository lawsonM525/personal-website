import { createClient } from "next-sanity"
import { apiVersion, dataset, projectId } from "../env"

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "http://localhost:3333",
  },
})

export const sanityFetchOptions = { next: { revalidate: 60 } }
