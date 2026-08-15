import { ExternalLink } from "lucide-react";
import { stegaClean } from "@sanity/client/stega";
import { RetroWindow } from "@/components/learn/retro-window";

type VideoEmbedValue = {
  url?: string;
  title?: string;
  shape?: "landscape" | "portrait" | "square";
  caption?: string;
  transcript?: string;
};

function youtubeId(url: URL) {
  if (url.hostname === "youtu.be")
    return url.pathname.split("/").filter(Boolean)[0];
  if (
    url.pathname.startsWith("/shorts/") ||
    url.pathname.startsWith("/embed/")
  ) {
    return url.pathname.split("/").filter(Boolean)[1];
  }
  return url.searchParams.get("v");
}

function embedDetails(rawUrl: string) {
  try {
    const url = new URL(rawUrl);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtube.com" || host === "youtu.be") {
      const id = youtubeId(url);
      if (id)
        return {
          provider: "YouTube",
          src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`,
        };
    }

    if (host === "vimeo.com") {
      const id = url.pathname
        .split("/")
        .filter(Boolean)
        .find((part) => /^\d+$/.test(part));
      if (id)
        return {
          provider: "Vimeo",
          src: `https://player.vimeo.com/video/${id}`,
        };
    }

    if (host === "tiktok.com") {
      const id = url.pathname.match(/\/video\/(\d+)/)?.[1];
      if (id)
        return {
          provider: "TikTok",
          src: `https://www.tiktok.com/player/v1/${id}?controls=1&description=1`,
        };
    }

    if (host === "instagram.com") {
      const match = url.pathname.match(/^\/(p|reel|tv)\/([^/]+)/);
      if (match)
        return {
          provider: "Instagram",
          src: `https://www.instagram.com/${match[1]}/${match[2]}/embed/`,
        };
    }
  } catch {
    return null;
  }

  return null;
}

export function VideoEmbed({ value }: { value: VideoEmbedValue }) {
  if (!value.url) return null;
  const url = stegaClean(value.url);
  const embed = embedDetails(url);

  if (!embed) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="learn-border learn-shadow-sm my-9 flex items-center justify-between gap-4 border-2 bg-[#d7ff45] p-5 font-black text-black"
      >
        Watch {value.title || "the video"}
        <ExternalLink className="h-5 w-5 shrink-0" aria-hidden="true" />
      </a>
    );
  }

  const shape =
    stegaClean(value.shape) ||
    (embed.provider === "TikTok" || embed.provider === "Instagram"
      ? "portrait"
      : "landscape");
  const windowClass =
    shape === "portrait"
      ? "mx-auto max-w-[420px]"
      : shape === "square"
        ? "mx-auto max-w-[620px]"
        : "w-full";
  const contentClass =
    shape === "portrait"
      ? "aspect-[9/16]"
      : shape === "square"
        ? "aspect-square"
        : "aspect-video";

  return (
    <figure className="my-10">
      <RetroWindow
        title={`${embed.provider.toUpperCase()} PLAYER`}
        className={windowClass}
        contentClassName={`${contentClass} bg-black`}
      >
        <iframe
          src={embed.src}
          title={value.title || `${embed.provider} video`}
          className="h-full w-full"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </RetroWindow>
      {(value.caption || value.title) && (
        <figcaption
          className={`${shape === "portrait" ? "mx-auto max-w-[420px]" : ""} learn-muted mt-3 text-sm leading-6`}
        >
          {value.caption || value.title}
        </figcaption>
      )}
      {value.transcript && (
        <details
          className={`${shape === "portrait" ? "mx-auto max-w-[620px]" : ""} learn-border mt-4 border-y-2 py-4`}
        >
          <summary className="cursor-pointer font-black">
            Read the video transcript
          </summary>
          <p className="learn-muted mt-4 whitespace-pre-wrap leading-7">
            {value.transcript}
          </p>
        </details>
      )}
    </figure>
  );
}
