"use client";

import { useEffect, useState } from "react";

const defaultSections = [
  { id: "introduction", label: "Introduction" },
  { id: "the-opportunity", label: "The Opportunity" },
  { id: "why-educate", label: "Why Educate?" },
  { id: "why-michelle", label: "Why Michelle?" },
  { id: "the-proposal", label: "The Proposal" },
  { id: "chatgpt-videos", label: "100 ChatGPT use cases" },
  { id: "lets-talk", label: "Let’s Talk!" },
];

export function ProposalSectionNav({
  fontClassName,
  sections = defaultSections,
}: {
  fontClassName: string;
  sections?: { id: string; label: string }[];
}) {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [hasReachedIntro, setHasReachedIntro] = useState(false);

  useEffect(() => {
    let frame = 0;
    let restoreFrame = 0;
    const introduction = document.getElementById("introduction");

    const updateActiveSection = () => {
      frame = 0;
      const marker = window.innerHeight * 0.42;
      let current = sections[0].id;

      setHasReachedIntro(
        Boolean(
          introduction &&
          introduction.getBoundingClientRect().top <= window.innerHeight * 0.72,
        ),
      );

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= marker) {
          current = section.id;
        }
      }

      setActiveSection(current);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };

    const introductionObserver = introduction
      ? new IntersectionObserver(
          ([entry]) => {
            setHasReachedIntro(
              entry.boundingClientRect.top <= window.innerHeight * 0.72,
            );
          },
          { rootMargin: "0px 0px -28% 0px", threshold: 0 },
        )
      : null;

    updateActiveSection();
    if (introduction) introductionObserver?.observe(introduction);

    restoreFrame = window.requestAnimationFrame(() => {
      restoreFrame = window.requestAnimationFrame(updateActiveSection);
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pageshow", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pageshow", updateActiveSection);
      introductionObserver?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      if (restoreFrame) window.cancelAnimationFrame(restoreFrame);
    };
  }, []);

  return (
    <nav
      aria-label="Proposal sections"
      className={`fixed right-2 top-1/2 z-40 hidden -translate-y-1/2 transition-opacity duration-500 min-[1180px]:flex min-[1400px]:right-3 ${
        hasReachedIntro ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="group/nav relative flex w-6 flex-col items-end gap-3 overflow-visible rounded-l-2xl bg-transparent py-4 transition-[width,background-color,padding] duration-300 hover:w-44 hover:bg-black/82 hover:px-4 focus-within:w-44 focus-within:bg-black/82 focus-within:px-4 min-[1400px]:gap-4 min-[1400px]:py-5">
        {sections.map((section) => {
          const isActive = activeSection === section.id;

          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={isActive ? "location" : undefined}
              onClick={(event) => {
                event.preventDefault();
                document
                  .getElementById(section.id)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="group relative z-10 flex h-6 w-full items-center justify-end text-right"
            >
              <span
                className={`${fontClassName} pointer-events-none absolute right-6 whitespace-nowrap text-base leading-none opacity-0 transition-all duration-200 group-hover/nav:translate-x-0 group-hover/nav:opacity-100 group-focus-within/nav:translate-x-0 group-focus-within/nav:opacity-100 min-[1400px]:text-lg ${
                  isActive
                    ? "translate-x-1 text-white"
                    : "translate-x-2 text-white/62 group-hover:text-white/86"
                }`}
              >
                {section.label}
              </span>
              <span
                aria-hidden="true"
                className={`relative mr-[0.3rem] h-3.5 w-3.5 shrink-0 bg-[url('/begin/generated/chalk-nav-circle.png')] bg-contain bg-center bg-no-repeat transition-all duration-200 group-hover/nav:opacity-100 group-focus-within/nav:opacity-100 ${
                  isActive
                    ? "scale-110 opacity-95 drop-shadow-[0_0_5px_rgba(255,255,255,0.55)]"
                    : "opacity-35 group-hover:opacity-70"
                }`}
              >
                <span
                  className={`absolute inset-[38%] rounded-full bg-white transition-opacity duration-200 ${
                    isActive ? "opacity-85" : "opacity-0"
                  }`}
                />
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
