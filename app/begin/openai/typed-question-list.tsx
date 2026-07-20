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
  const hasStarted = useRef(false);
  const [visibleCharacters, setVisibleCharacters] = useState(() =>
    questions.map(() => 0),
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
    let questionIndex = 0;
    let characterIndex = 0;

    const typeNextCharacter = () => {
      const currentQuestion = questions[questionIndex];

      if (!currentQuestion) {
        setActiveQuestion(-1);
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
        timeout = setTimeout(typeNextCharacter, 24);
        return;
      }

      questionIndex += 1;
      characterIndex = 0;
      timeout = setTimeout(typeNextCharacter, 240);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasStarted.current) return;

        hasStarted.current = true;
        observer.disconnect();
        typeNextCharacter();
      },
      { rootMargin: "0px 0px -15%", threshold: 0.2 },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      if (timeout) clearTimeout(timeout);
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
