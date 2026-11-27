import { ImageResponse } from "next/og"

export const alt = "AI, ideas & faith — shareable slides with Michelle Lawson for The Beautiful Woman"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function SlidePreview() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", padding: 32, background: "#1b527f", color: "#111b3c" }}>
      <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: 5, background: "#f4f0e5", border: "2px solid #111b3c", boxShadow: "7px 8px 0 #102a45" }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 20px", background: "#0848d5", color: "#fffdf3", fontSize: 23 }}><span>Michelle’s Computer</span><span>01 / 19</span></div>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", padding: "30px 48px", background: "#faf7ed" }}>
          <div style={{ display: "flex", fontSize: 22, color: "#4c627d", letterSpacing: 2 }}>THE BEAUTIFUL WOMAN</div>
          <div style={{ display: "flex", fontSize: 91, fontWeight: 700, letterSpacing: -5, lineHeight: 1.08, marginTop: 22 }}>AI, ideas & faith.</div>
          <div style={{ display: "flex", fontSize: 29, lineHeight: 1.4, marginTop: 25, maxWidth: 850 }}>Make your ideas real. Stay curious. Keep your judgment.</div>
          <div style={{ display: "flex", marginTop: 35, alignItems: "center", gap: 20 }}><span style={{ display: "flex", padding: "10px 17px", border: "1px solid #d0a7b7", background: "#f4b5cf", fontSize: 23 }}>19 shareable slides</span><span style={{ fontSize: 23 }}>with Michelle Lawson</span></div>
        </div>
      </div>
    </div>, size,
  )
}
