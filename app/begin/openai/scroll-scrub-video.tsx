"use client";

import { useEffect, useRef } from "react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function ScrollScrubVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let frame = 0;

    const updateVideoTime = () => {
      frame = 0;

      if (reducedMotion.matches || !Number.isFinite(video.duration)) return;

      const rect = section.getBoundingClientRect();
      const scrollDistance = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = clamp(-rect.top / scrollDistance, 0, 1);
      const targetTime = progress * Math.max(video.duration - 0.05, 0);

      if (Math.abs(video.currentTime - targetTime) > 0.025) {
        video.currentTime = targetTime;
      }
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateVideoTime);
    };

    video.addEventListener("loadedmetadata", requestUpdate);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reducedMotion.addEventListener("change", requestUpdate);
    requestUpdate();

    return () => {
      video.removeEventListener("loadedmetadata", requestUpdate);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener("change", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative left-1/2 h-[185svh] w-screen -translate-x-1/2 bg-black sm:h-[220vh] motion-reduce:h-auto"
      aria-label="Michelle walking and writing across a classroom chalkboard"
    >
      <div className="sticky top-[20svh] flex h-[60svh] w-full items-center overflow-hidden bg-black sm:top-[15vh] sm:h-[70vh] motion-reduce:relative motion-reduce:top-auto">
        <video
          ref={videoRef}
          src="/begin/why-michelle-scrollytelling.mp4"
          poster="/begin/why-michelle-scrollytelling-poster.jpg"
          className="h-full w-full object-cover object-center opacity-[0.78]"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
