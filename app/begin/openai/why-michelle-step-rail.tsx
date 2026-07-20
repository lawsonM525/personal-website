"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const steps = [
  { number: 1, title: "I make complicated concepts simple" },
  { number: 2, title: "I keep it engaging for Gen Z" },
  { number: 3, title: "I’ve helped people discover OpenAI" },
  { number: 4, title: "Five minutes from OpenAI" },
];

export function WhyMichelleStepRail() {
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const sections = steps
      .map(({ number }) =>
        document.getElementById(`why-michelle-point-${number}`),
      )
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries.find((entry) => entry.isIntersecting);

        if (!activeEntry) return;

        const step = Number(activeEntry.target.id.split("-").at(-1));
        if (step) {
          setActiveStep(step);
        }
      },
      { rootMargin: "-42% 0px -42%", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Why Michelle points"
      className="mt-7"
    >
      <ol className="flex flex-col gap-5">
        {steps.map(({ number, title }) => (
          <li key={number}>
            <a
              href={`#why-michelle-point-${number}`}
              aria-current={activeStep === number ? "step" : undefined}
              aria-label={
                number === 4
                  ? "Go to the Why Michelle bonus point"
                  : `Go to Why Michelle point ${number}`
              }
              className={`group flex items-center gap-3 rounded-xl transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-4 focus-visible:ring-offset-black ${
                activeStep === number
                  ? "opacity-100"
                  : "opacity-35 hover:opacity-70"
              }`}
            >
              <Image
                src={
                  number === 4
                    ? "/begin/generated/chalk-bonus-lightbulb.png"
                    : `/begin/chalk-numbers/chalk-circled-${number}.png`
                }
                alt=""
                width={512}
                height={512}
                aria-hidden="true"
                className={`h-12 w-12 shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 ${
                  number === 4 ? "scale-110" : ""
                }`}
                sizes="48px"
              />
              <span
                className={`text-sm font-semibold leading-tight transition-colors duration-300 ${
                  activeStep === number ? "text-white" : "text-white/75"
                }`}
              >
                {title}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
