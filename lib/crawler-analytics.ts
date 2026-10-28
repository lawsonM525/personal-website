export function publicCrawlerRequest(request: Request): Request {
  const url = new URL(request.url)
  url.search = ""
  url.hash = ""
  const headers = new Headers()
  for (const name of ["user-agent", "x-forwarded-for", "x-real-ip"]) {
    const value = request.headers.get(name)
    if (value) headers.set(name, value)
  }
  // Only crawler identity and the public path reach analytics; no cookies,
  // authorization, referrer query strings, or sign-in tokens are forwarded.
  return new Request(url, { method: request.method, headers })
}
