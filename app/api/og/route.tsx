import { ImageResponse } from "next/og"

export const runtime = "edge"

function readText(value: string | null, fallback: string, maxLength: number) {
  return (value || fallback).replace(/\s+/g, " ").trim().slice(0, maxLength)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = readText(searchParams.get("title"), "Michelle Lawson", 100)
  const description = readText(
    searchParams.get("description"),
    "Turning my ideas, and yours, into reality.",
    240,
  )
  const eyebrow = readText(
    searchParams.get("eyebrow"),
    "MICHELLE'S COMPUTER",
    64,
  )
  const titleSize = title.length > 52 ? 58 : title.length > 34 ? 68 : 80

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "58px 72px 48px",
          backgroundColor: "#080808",
          color: "#ffffff",
          fontFamily: "Arial, sans-serif",
          border: "1px solid #ffffff",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#bda0ff",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              width: 180,
              height: 5,
              marginTop: 24,
              marginBottom: 38,
              backgroundColor: "#bda0ff",
            }}
          />
          <div
            style={{
              maxWidth: 1030,
              fontSize: titleSize,
              lineHeight: 1.02,
              fontWeight: 700,
              letterSpacing: "-0.045em",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 980,
              marginTop: 28,
              color: "#c8c8c8",
              fontSize: 30,
              lineHeight: 1.32,
            }}
          >
            {description}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#ffffff",
            fontSize: 23,
            fontWeight: 600,
          }}
        >
          <span>Michelle Lawson</span>
          <span style={{ color: "#9a9a9a", fontSize: 19 }}>
            michellescomputer.com
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    },
  )
}
