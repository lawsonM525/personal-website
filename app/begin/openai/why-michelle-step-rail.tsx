"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const steps = [1, 2, 3, 4];

export function WhyMichelleStepRail() {
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const sections = steps
      .map((step) => document.getElementById(`why-michelle-point-${step}`))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries.find((entry) => entry.isIntersecting);

        if (!activeEntry) return;

        const step = Number(activeEntry.target.id.split("-").at(-1));
        if (step) setActiveStep(step);
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
        {steps.map((step) => (
          <li key={step}>
            <a
              href={`#why-michelle-point-${step}`}
              aria-current={activeStep === step ? "step" : undefined}
              aria-label={
                step === 4
                  ? "Go to the Why Michelle bonus point"
                  : `Go to Why Michelle point ${step}`
              }
              className={`block rounded-full transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-4 focus-visible:ring-offset-black ${
                activeStep === step
                  ? "scale-110 opacity-100"
                  : "scale-90 opacity-35 hover:scale-100 hover:opacity-70"
              }`}
            >
              <Image
                src={
                  step === 4
                    ? "/begin/generated/chalk-bonus-lightbulb.png"
                    : `/begin/chalk-numbers/chalk-circled-${step}.png`
                }
                alt=""
                width={512}
                height={512}
                aria-hidden="true"
                className={`h-14 w-14 object-contain ${
                  step === 4 ? "scale-110" : ""
                }`}
                sizes="56px"
              />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
