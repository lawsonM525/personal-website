"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { FeaturedReel } from "./reels";

export function PlayableReelCard({
  reel,
  showStatsByDefault = false,
}: {
  reel: FeaturedReel;
  showStatsByDefault?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const stats = [
    reel.views && `${reel.views} views`,
    reel.likes && `${reel.likes} likes`,
    reel.saves && `${reel.saves} saves`,
  ]
    .filter(Boolean)
    .join(" · ");

  const startVideo = () => {
    setHasStarted(true);
    void videoRef.current?.play();
  };

  return (
    <>
      <video
        ref={videoRef}
        src={reel.videoSrc}
        poster={reel.posterSrc || undefined}
        aria-label={reel.title}
        className="h-full w-full object-cover"
        controls={hasStarted}
        playsInline
        preload="metadata"
        onPlay={() => setHasStarted(true)}
      />

      {!hasStarted && showStatsByDefault && stats ? (
        <span className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-3 pb-3 pt-14 text-left">
          <span className="block text-xs font-bold uppercase leading-4 tracking-[0.06em] text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)] sm:text-sm sm:leading-5">
            {stats}
          </span>
        </span>
      ) : null}

      {!hasStarted ? (
        <button
          type="button"
          onClick={startVideo}
          aria-label={`Play ${reel.title}`}
          className="absolute inset-0 z-10 grid cursor-pointer place-items-center bg-black/0 transition-colors duration-200 hover:bg-black/35 focus-visible:bg-black/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
        >
          <span className="scale-90 opacity-100 drop-shadow-[0_5px_14px_rgba(0,0,0,0.6)] transition-all duration-200 sm:opacity-0 sm:group-hover:scale-100 sm:group-hover:opacity-100 sm:group-focus-within:scale-100 sm:group-focus-within:opacity-100">
            <Image
              src="/begin/generated/chalk-play-button.png"
              alt=""
              width={256}
              height={256}
              aria-hidden="true"
              className="h-16 w-16"
            />
          </span>
          <span className="absolute left-3 right-12 top-3 -translate-y-2 text-left text-white opacity-0 drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)] transition-all duration-200 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100">
            <span className="block text-sm font-semibold leading-5">
              {reel.title}
            </span>
            {stats && !showStatsByDefault ? (
              <span className="mt-1.5 block text-xs font-bold uppercase leading-4 tracking-[0.06em] text-white">
                {stats}
              </span>
            ) : null}
          </span>
        </button>
      ) : null}

      {reel.instagramUrl ? (
        <a
          href={reel.instagramUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${reel.title} on Instagram`}
          title="Open on Instagram"
          className="absolute right-2.5 top-2.5 z-20 grid h-11 w-11 place-items-center rounded-full bg-black/55 text-white/85 opacity-75 backdrop-blur-sm transition hover:bg-white hover:text-black hover:opacity-100 focus-visible:bg-white focus-visible:text-black focus-visible:opacity-100 focus-visible:outline-none sm:right-3 sm:top-3 sm:h-9 sm:w-9"
        >
          <ExternalLink aria-hidden="true" className="h-4 w-4" />
        </a>
      ) : null}
    </>
  );
}
