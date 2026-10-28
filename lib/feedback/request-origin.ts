// Next's development URL may say localhost even when the browser uses 127.0.0.1.
// Use the actual Host header for same-origin checks and the PKCE return address.
export function feedbackRequestOrigin(host: string | null, production: boolean): string {
  if (!host || /[\s/@?#\\]/.test(host)) throw new Error("Invalid request host")
  const url = new URL(`${production ? "https" : "http"}://${host}`)
  if (url.username || url.password || url.pathname !== "/") throw new Error("Invalid request host")
  return url.origin
}
