import Link from "next/link"
import { Terminal } from "@/components/explore/terminal"
import { binaryByteLimit, executeTerminal, createTerminalState, terminalSources } from "@/lib/terminal"
import { absoluteUrl, buildPageMetadata, serializeStructuredData } from "@/lib/seo"
import styles from "@/components/explore/terminal.module.css"

const title = "Free Text to Binary Converter — UTF-8 Terminal Tool"
const description = "Convert text to binary for free with a terminal command. Supports UTF-8 text, emoji, and accents. Decode binary back to text, with examples and explanations."
const path = "/text-to-binary"
export const metadata = buildPageMetadata({ title, description, path, keywords: ["text to binary converter", "free text to binary", "binary to text", "UTF-8 converter", "ASCII to binary"] })

// Calculate readable examples with the same interpreter used by the live terminal.
const examples = ["A", "Hi", "café", "👋"].map(text => ({ text, bits: executeTerminal(`binary ${text}`, createTerminalState()).lines[2] }))

export default function TextToBinaryPage() {
  const intro = <main className={styles.document}>
    <h1>Free text to binary converter</h1>
    <p>Type <code>binary</code> followed by your text, then press Enter. The terminal converts it to UTF-8 binary: eight bits per byte. No account or download needed.</p>
    <nav aria-label="Converter navigation"><Link href="/quizzes/binary">Binary quiz</Link><Link href="/quizzes">CS quizzes</Link><Link href="/explore?app=terminal">Explore the terminal</Link></nav>
    <details><summary>readme.txt — examples &amp; how it works</summary>
      <section><h2>How to convert text to binary</h2>
        <p>Enter <code>binary hello</code> at the prompt. Replace hello with your own words, numbers, punctuation, or emoji. Select the output to copy it. Each space-separated group contains eight bits and represents one byte.</p>
        <p>The command uses UTF-8. Basic ASCII characters have the same values in UTF-8: A is decimal 65, or binary 01000001. Accented letters and emoji can require more than one byte.</p>
        <p>Use quotation marks to preserve leading or trailing spaces: <code>binary " hi "</code>. The outside quotation marks are command syntax, so they are not included in the converted text.</p>
      </section>
      <section><h2>Text to binary examples</h2>
        {examples.map(example => <p key={example.text}><code>binary {example.text}</code><br /><code>{example.bits}</code></p>)}
      </section>
      <section><h2>Convert binary back to text</h2>
        <p>Type <code>decode</code> followed by the bits. For example, <code>decode 01001000 01101001</code> returns Hi. You can paste byte groups with spaces or a continuous sequence of bits.</p>
        <p>The total number of bits must be a multiple of eight, and the bytes must form valid UTF-8 text. Some binary data represents images, audio, or another text encoding, so it will not decode as UTF-8.</p>
      </section>
      <section><h2>Is text to binary conversion free?</h2>
        <p>Yes. Both binary and decode are free to use without signing in. They run in your browser. This converter accepts up to {binaryByteLimit.toLocaleString("en-US")} UTF-8 bytes per conversion; byte count can differ from character count.</p>
      </section>
      <section><h2>Is binary the same as encryption?</h2>
        <p>No. Binary is a way to represent data using 0 and 1. Encoding text as UTF-8 does not keep it secret: someone using the same encoding can turn those bytes back into text.</p>
      </section>
      <section><h2>Why do uppercase and lowercase letters give different binary?</h2>
        <p>They are different characters. Uppercase A is 01000001; lowercase a is 01100001. Spaces and punctuation also have their own encoded values.</p>
      </section>
      <p>Read more: <a href={terminalSources.binary.url} target="_blank" rel="noopener noreferrer">MDN Encoding API</a>. Practise number conversions, shifts, and bytes in the <Link href="/quizzes/binary">binary and hexadecimal quiz</Link>.</p>
      <noscript><p>Enable JavaScript to run commands. The examples and explanations above remain readable without it.</p></noscript>
    </details>
  </main>
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData({ "@context": "https://schema.org", "@graph": [
      { "@type": "WebApplication", "@id": `${absoluteUrl(path)}#converter`, name: "Free Text to Binary Converter", description, url: absoluteUrl(path), applicationCategory: "UtilitiesApplication", operatingSystem: "Any", browserRequirements: "Requires JavaScript to run terminal commands", inLanguage: "en", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, featureList: ["UTF-8 text to binary conversion", "Binary to UTF-8 text decoding", "Accented text and emoji support", "Worked terminal examples"], creator: { "@type": "Organization", name: "Michelle’s Computer", url: absoluteUrl() } },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Michelle’s Computer", item: absoluteUrl() }, { "@type": "ListItem", position: 2, name: "Text to binary converter", item: absoluteUrl(path) }] },
    ] }) }} />
    <Terminal intro={intro} initialCommand="binary hello" workingDirectory="C:\MICHELLE" />
  </>
}
