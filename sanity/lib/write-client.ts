import "server-only"
import { createClient } from "@sanity/client"
import { apiVersion, dataset, projectId } from "../env"

export function getSanityWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN
  if (!token) return null

  return createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  })
}
