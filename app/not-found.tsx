import Link from "next/link"
export default function NotFound() {
  return <main className="mx-auto max-w-3xl px-6 py-16"><p className="font-mono text-sm">404</p><h1 className="mt-4 text-5xl">Page not found.</h1><Link className="mt-8 inline-block underline underline-offset-4" href="/">Back to Michelle’s Computer →</Link></main>
}
