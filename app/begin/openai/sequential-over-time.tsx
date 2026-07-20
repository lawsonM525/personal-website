"use client";

import { useEffect, useRef, useState } from "react";

export function SequentialOverTime({
  fontClassName,
}: {
  fontClassName: string;
}) {
  const lineRef = useRef<HTMLParagraphElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const line = lineRef.current;

    if (!line) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setIsVisible(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -18%", threshold: 0.45 },
    );

    observer.observe(line);

    return () => observer.disconnect();
  }, []);

  const wordClassName =
    "inline-block transform-gpu transition-all duration-500 ease-out motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100";

  return (
    <p
      ref={lineRef}
      className={`${fontClassName} py-8 text-4xl font-normal leading-none text-white sm:text-6xl`}
    >
      The goal is to educate people{" "}
      <span className="inline-flex items-baseline gap-[0.2em] whitespace-nowrap text-[1.16em] sm:text-[1.2em]">
        <span
          className={`${wordClassName} ${
            isVisible
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-3 scale-90 opacity-0"
          }`}
        >
          over
        </span>
        <span
          className={`${wordClassName} delay-200 ${
            isVisible
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-3 scale-90 opacity-0"
          }`}
        >
          time.
        </span>
      </span>
    </p>
  );
}
