"use client";

import { useEffect, useRef, useState } from "react";

type TypedQuestionListProps = {
  questions: string[];
  fontClassName: string;
};

export function TypedQuestionList({
  questions,
  fontClassName,
}: TypedQuestionListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCharacters, setVisibleCharacters] = useState(() =>
    questions.map((question) => question.length),
  );
  const [activeQuestion, setActiveQuestion] = useState(-1);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const showEverything = () => {
      setVisibleCharacters(questions.map((question) => question.length));
      setActiveQuestion(-1);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      showEverything();
      return;
    }

    let timeout: ReturnType<typeof setTimeout> | undefined;
    let visibilityFrame = 0;
    let hasStarted = false;
    let isCancelled = false;
    let questionIndex = 0;
    let characterIndex = 0;

    const typeNextCharacter = () => {
      if (isCancelled) return;

      const currentQuestion = questions[questionIndex];

      if (!currentQuestion) {
        showEverything();
        return;
      }

      setActiveQuestion(questionIndex);
      characterIndex += 1;
      setVisibleCharacters((current) =>
        current.map((count, index) =>
          index === questionIndex ? characterIndex : count,
        ),
      );

      if (characterIndex < currentQuestion.length) {
        timeout = setTimeout(typeNextCharacter, 16);
        return;
      }

      questionIndex += 1;
      characterIndex = 0;
      timeout = setTimeout(typeNextCharacter, 120);
    };

    const startTyping = () => {
      if (hasStarted) return;

      hasStarted = true;
      observer.disconnect();
      setVisibleCharacters(questions.map(() => 0));
      setActiveQuestion(-1);
      typeNextCharacter();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        startTyping();
      },
      { rootMargin: "0px 0px -15%", threshold: 0.2 },
    );

    const startIfVisible = () => {
      if (hasStarted) return;

      const rect = container.getBoundingClientRect();
      const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

      if (visibleHeight > Math.min(rect.height * 0.2, 80)) {
        startTyping();
      }
    };

    const scheduleVisibilityCheck = () => {
      if (visibilityFrame) window.cancelAnimationFrame(visibilityFrame);
      visibilityFrame = window.requestAnimationFrame(startIfVisible);
    };

    observer.observe(container);
    scheduleVisibilityCheck();
    window.addEventListener("pageshow", scheduleVisibilityCheck);
    document.addEventListener("visibilitychange", scheduleVisibilityCheck);

    return () => {
      isCancelled = true;
      observer.disconnect();
      if (timeout) clearTimeout(timeout);
      if (visibilityFrame) window.cancelAnimationFrame(visibilityFrame);
      window.removeEventListener("pageshow", scheduleVisibilityCheck);
      document.removeEventListener("visibilitychange", scheduleVisibilityCheck);
    };
  }, [questions]);

  return (
    <div
      ref={containerRef}
      className="grid gap-5"
      role="list"
      aria-label="Questions people ask about AI"
    >
      {questions.map((question, index) => {
        const visibleQuestion = question.slice(0, visibleCharacters[index]);

        return (
          <p
            key={question}
            className={`${fontClassName} min-h-[1em] py-3 text-3xl leading-none text-white sm:text-5xl`}
            role="listitem"
          >
            <span className="sr-only">&quot;{question}&quot;</span>
            <span aria-hidden="true">
              {visibleCharacters[index] > 0 ? `“${visibleQuestion}` : ""}
              {visibleCharacters[index] === question.length ? "”" : ""}
              {activeQuestion === index ? (
                <span className="ml-1 inline-block h-[0.82em] w-[0.07em] translate-y-[0.08em] animate-pulse bg-white/85" />
              ) : null}
            </span>
          </p>
        );
      })}
    </div>
  );
}
