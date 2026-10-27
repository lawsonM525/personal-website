import { ImageResponse } from "next/og"
export const alt = "Michelle’s Computer — turning ideas into reality"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", padding: 40, background: "#1b527f", color: "#121b2a" }}>
      <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: 6, background: "#f4f0e5", border: "2px solid #121b2a", boxShadow: "8px 9px 0 #102a45" }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "13px 20px", background: "#0848d5", color: "#fffdf3", fontSize: 24 }}>
          <span>Michelle’s Computer</span>
          <div style={{ display: "flex", gap: 7 }}>
            {["minimize", "maximize", "close"].map((control) => (
              <div key={control} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 28, background: "#f4f0e5", color: "#121b2a", border: "2px solid #121b2a" }}>
                {control === "maximize" ? <div style={{ display: "flex", width: 14, height: 13, border: "2px solid #121b2a", borderTopWidth: 4 }} /> : <span>{control === "minimize" ? "-" : "x"}</span>}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 1, padding: "24px 45px", background: "#faf7ed" }}>
          <div style={{ display: "flex", fontSize: 82, fontWeight: 700, letterSpacing: -4, lineHeight: 1.06 }}>Michelle’s Computer.</div>
          <div style={{ display: "flex", marginTop: 25, fontSize: 31, lineHeight: 1.4 }}>Turning my ideas, and yours, into reality.</div>
          <div style={{ display: "flex", marginTop: 42, fontSize: 23, color: "#134cae" }}>Learn · Projects · Magazine · Pen pals</div>
        </div>
      </div>
    </div>, size,
  )
}
