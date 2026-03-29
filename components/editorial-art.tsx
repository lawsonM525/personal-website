import Image from "next/image"
import { cn } from "@/lib/utils"

interface EditorialArtProps {
  title: string
  credit?: string
  variant?: "cover" | "portrait" | "blueprint" | "banner"
  className?: string
  imageSrc?: string
  imageAlt?: string
}

export function EditorialArt({
  title,
  credit,
  variant = "cover",
  className,
  imageSrc,
  imageAlt,
}: EditorialArtProps) {
  const variantClasses = {
    cover:
      "min-h-[26rem] bg-[radial-gradient(circle_at_25%_20%,rgba(78,205,196,0.18),transparent_24%),radial-gradient(circle_at_78%_18%,rgba(255,107,107,0.18),transparent_20%),linear-gradient(180deg,#cde4ef_0%,#fff1e6_48%,#f6ede7_100%)]",
    portrait:
      "min-h-[28rem] bg-[radial-gradient(circle_at_20%_22%,rgba(255,230,109,0.22),transparent_18%),radial-gradient(circle_at_75%_24%,rgba(78,205,196,0.16),transparent_24%),linear-gradient(180deg,#eef2f5_0%,#e8ddd3_100%)]",
    blueprint:
      "min-h-[18rem] bg-[linear-gradient(180deg,rgba(188,212,230,0.88),rgba(240,239,235,0.96))]",
    banner:
      "min-h-[10rem] bg-[linear-gradient(90deg,rgba(78,205,196,0.16),rgba(255,241,230,0.92),rgba(255,107,107,0.12))]",
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden border border-[rgba(41,47,54,0.14)]",
        variantClasses[variant],
        className
      )}
    >
      {imageSrc ? (
        <>
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority={variant === "cover"}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,248,241,0.02),rgba(255,248,241,0.12))]" />
        </>
      ) : null}

      <div className="absolute inset-5 border border-dashed border-[rgba(78,205,196,0.55)]" />
      {!imageSrc ? (
        <>
          <div className="absolute left-[10%] top-[18%] h-40 w-40 rounded-full border border-[rgba(41,47,54,0.12)] bg-[rgba(255,248,241,0.7)]" />
          <div className="absolute right-[10%] top-[15%] h-20 w-20 rounded-full border border-[rgba(255,107,107,0.35)] bg-[rgba(255,107,107,0.16)]" />
          <div className="absolute bottom-[12%] left-[14%] h-24 w-24 rounded-full border border-[rgba(255,230,109,0.3)] bg-[rgba(255,230,109,0.18)]" />
        </>
      ) : null}
      <div className="absolute bottom-8 right-8 max-w-[16rem] border border-[rgba(41,47,54,0.12)] bg-[rgba(255,248,241,0.9)] px-4 py-3">
        <p className="meta-text text-[rgba(41,47,54,0.55)]">Artwork</p>
        <p className="mt-2 font-serif text-2xl leading-tight text-foreground">{title}</p>
        <p className="mt-2 text-sm text-[rgba(41,47,54,0.7)]">{credit || "Awaiting final commissioned or generated art."}</p>
      </div>
      {!imageSrc ? (
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full opacity-70"
          viewBox="0 0 800 800"
          fill="none"
        >
          <path d="M95 128h260m-60 84h360m-430 82h260m100 70h130m-552 76h410" stroke="rgba(41,47,54,0.35)" strokeWidth="2" />
          <path d="M480 140l92 40-24 74 116 52-38 88" stroke="rgba(78,205,196,0.7)" strokeWidth="3" />
          <circle cx="481" cy="140" r="8" fill="rgba(41,47,54,0.75)" />
          <circle cx="572" cy="180" r="8" fill="rgba(41,47,54,0.75)" />
          <circle cx="548" cy="254" r="8" fill="rgba(41,47,54,0.75)" />
          <circle cx="662" cy="307" r="8" fill="rgba(41,47,54,0.75)" />
          <path d="M168 530c30-42 95-74 146-74 41 0 76 16 101 42 27 28 37 61 77 67 44 6 77-8 112-37" stroke="rgba(255,107,107,0.55)" strokeWidth="4" strokeLinecap="round" />
        </svg>
      ) : null}
    </div>
  )
}
