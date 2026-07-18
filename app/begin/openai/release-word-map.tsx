"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const releases = [
  {
    src: "/begin/releases-generated/a-new-model.png",
    alt: "A new model.",
    className:
      "left-[9%] top-[8%] z-10 w-[31%] sm:left-[14%] sm:w-[24%] -rotate-6",
  },
  {
    src: "/begin/releases-generated/codex.png",
    alt: "Codex.",
    className:
      "right-[10%] top-[16%] z-20 w-[27%] sm:right-[15%] sm:w-[20%] rotate-5",
  },
  {
    src: "/begin/releases-generated/chatgpt-work.png",
    alt: "ChatGPT Work.",
    className:
      "left-[8%] top-[28%] z-30 w-[68%] sm:left-[18%] sm:top-[26%] sm:w-[54%] -rotate-2",
  },
  {
    src: "/begin/releases-generated/study-mode.png",
    alt: "Study Mode.",
    className:
      "right-[4%] top-[56%] z-20 w-[31%] sm:right-[5%] sm:top-[53%] sm:w-[21%] rotate-6",
  },
  {
    src: "/begin/releases-generated/projects.png",
    alt: "Projects.",
    className:
      "left-[6%] top-[58%] z-10 w-[25%] sm:left-[11%] sm:w-[18%] -rotate-7",
  },
  {
    src: "/begin/releases-generated/memory-dreaming.png",
    alt: "Memory / Dreaming.",
    className:
      "right-[6%] bottom-[5%] z-10 w-[46%] sm:right-[12%] sm:w-[34%] -rotate-3",
  },
  {
    src: "/begin/releases-generated/connectors.png",
    alt: "Connectors.",
    className:
      "left-[10%] bottom-[5%] z-20 w-[35%] sm:left-[21%] sm:w-[25%] rotate-4",
  },
  {
    src: "/begin/releases-generated/image-gen.png",
    alt: "Image-Gen.",
    className:
      "right-[28%] top-[2%] z-10 w-[26%] sm:right-[37%] sm:w-[18%] rotate-3",
  },
];

export function ReleaseWordMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(map);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={mapRef}
      className="relative mx-auto h-[19rem] w-full max-w-4xl sm:h-[23rem]"
      aria-label="Recent OpenAI releases"
    >
      {releases.map((release, index) => (
        <div
          key={release.src}
          className={`release-word absolute ${release.className} ${
            isVisible ? "is-visible" : ""
          }`}
          style={{ animationDelay: `${index * 115}ms` }}
        >
          <Image
            src={release.src}
            alt={release.alt}
            width={1700}
            height={500}
            className="h-auto w-full object-contain mix-blend-screen"
            sizes="(min-width: 640px) 32vw, 48vw"
          />
        </div>
      ))}

      <style jsx>{`
        .release-word {
          opacity: 0;
          transform: scale(0.72) translateY(14px);
          filter: blur(3px);
        }

        .release-word.is-visible {
          animation: release-word-pop 560ms cubic-bezier(0.2, 0.9, 0.25, 1.2)
            forwards;
        }

        @keyframes release-word-pop {
          70% {
            opacity: 1;
            transform: scale(1.05) translateY(0);
            filter: blur(0);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .release-word,
          .release-word.is-visible {
            animation: none;
            opacity: 1;
            transform: none;
            filter: none;
          }
        }
      `}</style>
    </div>
  );
}
