"use client";

import { useEffect, useRef, useState } from "react";

type CountUpMetricProps = {
  value: string;
  delayMs?: number;
};

function parseMetric(value: string) {
  const match = value.match(/^(\d+(?:\.\d+)?)([KMB]?)$/);

  if (!match) return null;

  const numericValue = Number(match[1]);
  const decimals = match[1].includes(".")
    ? match[1].split(".")[1].length
    : 0;

  return {
    numericValue,
    decimals,
    suffix: match[2],
  };
}

export function CountUpMetric({ value, delayMs = 0 }: CountUpMetricProps) {
  const metricRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const metric = metricRef.current;
    const parsed = parseMetric(value);

    if (!metric || !parsed) return;

    const { numericValue, decimals, suffix } = parsed;
    const formatValue = (current: number) =>
      `${current.toFixed(decimals)}${suffix}`;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayValue(value);
      return;
    }

    setDisplayValue(formatValue(0));

    let animationFrame = 0;
    let delayTimeout: ReturnType<typeof setTimeout> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;

        hasAnimated.current = true;
        observer.disconnect();

        delayTimeout = setTimeout(() => {
          const startedAt = performance.now();
          const duration = 850;

          const tick = (now: number) => {
            const progress = Math.min((now - startedAt) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(formatValue(numericValue * easedProgress));

            if (progress < 1) {
              animationFrame = requestAnimationFrame(tick);
            } else {
              setDisplayValue(value);
            }
          };

          animationFrame = requestAnimationFrame(tick);
        }, delayMs);
      },
      { rootMargin: "0px", threshold: 0.08 },
    );

    observer.observe(metric);

    return () => {
      observer.disconnect();
      if (delayTimeout) clearTimeout(delayTimeout);
      cancelAnimationFrame(animationFrame);
    };
  }, [delayMs, value]);

  return (
    <span ref={metricRef} aria-label={value}>
      <span
        aria-hidden="true"
        className="inline-block min-w-[5ch] tabular-nums"
      >
        {displayValue}
      </span>
    </span>
  );
}
