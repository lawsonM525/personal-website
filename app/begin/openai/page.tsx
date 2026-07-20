import Image from "next/image";
import { Mouse_Memoirs } from "next/font/google";
import {
  ExternalLink,
  GraduationCap,
  MessagesSquare,
  Repeat2,
  TrendingUp,
} from "lucide-react";
import { ChalkTrail } from "./chalk-trail";
import { ProposalSectionNav } from "./proposal-section-nav";
import { ReleaseWordMap } from "./release-word-map";
import { featuredReelSections, type FeaturedReel } from "./reels";

const mouseMemoirs = Mouse_Memoirs({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "Teaching the Next Generation How to Use AI",
  description:
    "A proposal for an ongoing educational partnership between Michelle Lawson (@michellescomputer) and OpenAI.",
};

const heroIntro = [
  "ChatGPT has the power to completely change how people learn, work, create, build, and live.",
  "But most people still don't know how to actually use it.",
  "I want to help change that.",
];

const everydayQuestions = [
  "Can AI help me put this spreadsheet together? How?",
  "Can AI help me prepare for this interview? How?",
  "Can AI help me learn Python? How?",
  "Can AI help me organize my week? How?",
  "Can AI help me make more money? How?",
];

const chatGPTUseCaseFeatures = [
  {
    feature: "Connectors",
    featureImage: "/begin/releases-generated/connectors.png",
    useCases: [
      "How to make a personal income tracker.",
      "How to look through your Granola meetings and update your personal CRM.",
      "How to dig through your emails and find assignments you are losing track of.",
      "How to make a Canva vision board from your saved ideas.",
      "How to make a Spotify playlist for a road trip, a study night, or a GENERATIONAL lock in. (that's 3 😉)",
    ],
  },
  {
    feature: "Codex",
    featureImage: "/begin/releases-generated/codex.png",
    useCases: [
      "How to use Codex to build a portfolio website as an artist, writer, or musician.",
      "How to use Codex to research a health problem that has been bothering you.",
      "How to use Codex to write a full-length book that's 300+ pages. (I have lots of friends with book ideas sitting in their Notes app 😅)",
    ],
  },
  {
    feature: "Memory",
    featureImage: "/begin/releases-generated/memory-dreaming.png",
    useCases: [
      "How to keep track of your daily tasks like a personal assistant.",
      "How to analyze your behavioral patterns and find ways to grow.",
      "How to navigate your workplace culture.",
      "How to reverse-engineer your goals to achieve them faster.",
    ],
  },
];

const proposalPayoffs = [
  {
    title: "Prolong launch impact",
    description:
      "Keep teaching people about each feature long after launch day.",
    Icon: Repeat2,
  },
  {
    title: "Greater feature adoption",
    description:
      "Make the features that matter most to OpenAI easier for Gen Z to discover, understand, and use.",
    Icon: TrendingUp,
  },
  {
    title: "Direct Gen Z insights",
    description:
      "OpenAI gets insights into what Gen Z wants to try and what still confuses them.",
    Icon: MessagesSquare,
  },
  {
    title: "A trusted Gen Z educator",
    description:
      "Give OpenAI one consistent educator Gen Z can recognize and trust.",
    Icon: GraduationCap,
  },
];

function ReelProofRow({ reels }: { reels: FeaturedReel[] }) {
  return (
    <>
      <div
        className={`begin-mobile-carousel grid gap-5 pt-3 ${
          reels.length === 4
            ? "sm:grid-cols-2 lg:grid-cols-4"
            : reels.length === 2
              ? "sm:grid-cols-2"
              : "sm:grid-cols-3"
        }`}
        role="region"
        aria-label="Featured videos. Swipe horizontally on mobile to see more."
        tabIndex={0}
      >
        {reels.map((reel, index) => {
          const hasDestination = Boolean(reel.videoSrc || reel.instagramUrl);
          const cardContent = (
            <>
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-white/62">
                <span>Reel {String(index + 1).padStart(2, "0")}</span>
                <span>
                  {reel.views
                    ? `${reel.views} views`
                    : reel.likes
                      ? `${reel.likes} likes`
                      : "Add stats"}
                </span>
              </div>
              <div className="grid place-items-center">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.24)] transition-transform group-hover:scale-105">
                  <span className="ml-1 h-0 w-0 border-y-[14px] border-l-[22px] border-y-transparent border-l-black" />
                </div>
              </div>
              <div className="space-y-3">
                <p
                  className={`${mouseMemoirs.className} text-4xl leading-none text-white`}
                >
                  {reel.title}
                </p>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/58">
                  {reel.views || reel.likes || reel.saves
                    ? [
                        reel.views && `${reel.views} views`,
                        reel.likes && `${reel.likes} likes`,
                        reel.saves && `${reel.saves} saves`,
                      ]
                        .filter(Boolean)
                        .join(" · ")
                    : hasDestination
                      ? "Open on Instagram"
                      : "Add reel link"}
                </p>
                {hasDestination && (reel.views || reel.likes || reel.saves) ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/58">
                    Open on Instagram
                  </p>
                ) : null}
              </div>
            </>
          );
          const posterContent = reel.posterSrc ? (
            <>
              <Image
                src={reel.posterSrc}
                alt={reel.title}
                fill
                className="object-cover"
                sizes="(min-width: 640px) 30vw, calc(100vw - 48px)"
              />
              {reel.instagramUrl ? (
                <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-black/70 text-white transition group-hover:bg-white group-hover:text-black">
                  <ExternalLink aria-hidden="true" className="h-5 w-5" />
                </span>
              ) : null}
              {reel.views || reel.likes || reel.saves ? (
                <div className="absolute inset-x-0 bottom-0 bg-black/78 p-4 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em]">
                    {[
                      reel.views && `${reel.views} views`,
                      reel.likes && `${reel.likes} likes`,
                      reel.saves && `${reel.saves} saves`,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
              ) : null}
            </>
          ) : null;

          return (
            <div
              key={reel.title}
              className={`begin-mobile-carousel-card group relative justify-self-center overflow-hidden rounded-[1.35rem] bg-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_18px_50px_rgba(0,0,0,0.45)] ${
                reel.posterSrc && !reel.videoSrc
                  ? "aspect-[4/5] w-full self-center"
                  : "aspect-[9/16] w-full self-start"
              }`}
            >
              {reel.videoSrc ? (
                <>
                  <video
                    src={reel.videoSrc}
                    poster={reel.posterSrc || undefined}
                    className="h-full w-full object-cover"
                    controls
                    playsInline
                    preload="metadata"
                  />
                  <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between bg-black/72 p-4">
                    <div className="max-w-[78%] space-y-2">
                      <p
                        className={`${mouseMemoirs.className} text-2xl leading-none text-white`}
                      >
                        {reel.title}
                      </p>
                      {reel.views || reel.likes || reel.saves ? (
                        <p className="text-[11px] font-semibold uppercase leading-4 tracking-[0.08em] text-white/72">
                          {[
                            reel.views && `${reel.views} views`,
                            reel.likes && `${reel.likes} likes`,
                            reel.saves && `${reel.saves} saves`,
                          ]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      ) : null}
                    </div>
                    {reel.instagramUrl ? (
                      <a
                        href={reel.instagramUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${reel.title} on Instagram`}
                        title="Open on Instagram"
                        className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full bg-black/70 text-white transition hover:bg-white hover:text-black"
                      >
                        <ExternalLink aria-hidden="true" className="h-5 w-5" />
                      </a>
                    ) : null}
                  </div>
                </>
              ) : reel.posterSrc ? (
                reel.instagramUrl ? (
                  <a
                    href={reel.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${reel.title} on Instagram`}
                    className="block h-full text-white"
                  >
                    {posterContent}
                  </a>
                ) : (
                  <div className="h-full text-white">{posterContent}</div>
                )
              ) : reel.instagramUrl ? (
                <a
                  href={reel.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-full flex-col justify-between bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.14),transparent_32%),linear-gradient(180deg,#141414,#050505)] p-5 text-white"
                >
                  {cardContent}
                </a>
              ) : (
                <div className="flex h-full flex-col justify-between bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_32%),linear-gradient(180deg,#121212,#050505)] p-5 text-white">
                  {cardContent}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p
        className={`${mouseMemoirs.className} begin-mobile-swipe-cue text-right text-xl text-white/58`}
        aria-hidden="true"
      >
        Swipe to see more →
      </p>
    </>
  );
}

export default function OpenAIBeginPage() {
  const emailTeamHref = `mailto:michelle@thedriveagency.co,patrick@thedriveagency.co,teresa@thedriveagency.co?subject=${encodeURIComponent(
    "OpenAI × Michelle — Gen Z Product Education",
  )}&body=${encodeURIComponent(
    "Hi Michelle, Patrick, and Teresa,\n\nI’d love to discuss the 90-day Gen Z product-education pilot and what a longer-term partnership could look like.\n\nWhat would be the best next step?\n\nBest,",
  )}`;

  return (
    <main
      className="begin-openai-page bg-black pt-16 text-white"
      style={{ cursor: "url('/begin/chalk-cursor.png') 12 12, auto" }}
    >
      <ChalkTrail />
      <ProposalSectionNav fontClassName={mouseMemoirs.className} />
      <style>
        {`
          @keyframes begin-arrow-bounce {
            0%, 100% {
              transform: translateX(-50%) translateY(0);
            }
            50% {
              transform: translateX(-50%) translateY(12px);
            }
          }

          @keyframes begin-type-line {
            from {
              clip-path: inset(0 100% 0 0);
            }
            to {
              clip-path: inset(0 0 0 0);
            }
          }

          @keyframes begin-chalk-strike {
            from {
              clip-path: inset(0 100% 0 0);
              opacity: 0;
            }
            12% {
              opacity: 1;
            }
            to {
              clip-path: inset(0 0 0 0);
              opacity: 1;
            }
          }

          @keyframes begin-mia-loop {
            0%, 8%, 100% {
              background-position: calc(var(--mia-w) * -6) 0;
              transform: translateY(0);
            }
            12% {
              background-position: 0 calc(var(--mia-h) * -3);
            }
            18% {
              background-position: calc(var(--mia-w) * -1) calc(var(--mia-h) * -3);
            }
            24% {
              background-position: calc(var(--mia-w) * -2) calc(var(--mia-h) * -3);
            }
            30% {
              background-position: calc(var(--mia-w) * -3) calc(var(--mia-h) * -3);
            }
            38% {
              background-position: 0 calc(var(--mia-h) * -4);
              transform: translateY(0);
            }
            44% {
              background-position: calc(var(--mia-w) * -1) calc(var(--mia-h) * -4);
              transform: translateY(-0.35rem);
            }
            50% {
              background-position: calc(var(--mia-w) * -2) calc(var(--mia-h) * -4);
              transform: translateY(-0.75rem);
            }
            56% {
              background-position: calc(var(--mia-w) * -3) calc(var(--mia-h) * -4);
              transform: translateY(-0.35rem);
            }
            62% {
              background-position: calc(var(--mia-w) * -4) calc(var(--mia-h) * -4);
              transform: translateY(0);
            }
            72% {
              background-position: calc(var(--mia-w) * -2) calc(var(--mia-h) * -6);
            }
            82% {
              background-position: calc(var(--mia-w) * -4) calc(var(--mia-h) * -6);
            }
          }

          .begin-mia-sprite {
            --mia-w: clamp(7rem, 13vw, 10rem);
            --mia-h: calc(var(--mia-w) * 1.083333);
            width: var(--mia-w);
            height: var(--mia-h);
            flex: 0 0 auto;
            background-image: url('/begin/mia-spritesheet.webp');
            background-repeat: no-repeat;
            background-size: calc(var(--mia-w) * 8) calc(var(--mia-h) * 11);
            background-position: calc(var(--mia-w) * -6) 0;
            image-rendering: auto;
            filter: drop-shadow(0 0 18px rgba(255,255,255,0.16));
            animation: begin-mia-loop 3.8s steps(1, end) infinite;
          }

          .begin-typing-group {
            width: max-content;
            max-width: 100%;
            text-align: center;
          }

          .begin-typing-line {
            display: block;
            width: 100%;
            max-width: 100%;
            white-space: nowrap;
            clip-path: inset(0 100% 0 0);
            animation: begin-type-line 1.18s steps(92, end) forwards;
          }

          .begin-typing-line:nth-child(2) {
            animation-delay: 1.02s;
          }

          .begin-typing-line:nth-child(3) {
            animation-delay: 1.92s;
          }

          .begin-chalk-strike {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: fit-content;
          }

          .begin-chalk-strike-line {
            position: relative;
            display: block;
            width: fit-content;
          }

          .begin-chalk-strike-line::after {
            content: "";
            position: absolute;
            left: -0.08em;
            right: -0.08em;
            top: 50%;
            height: 0.16em;
            pointer-events: none;
            background:
              linear-gradient(180deg, transparent 0 18%, rgba(255,255,255,0.94) 24% 68%, transparent 78%),
              repeating-linear-gradient(90deg, rgba(255,255,255,0.88) 0 7px, rgba(255,255,255,0.55) 7px 11px, rgba(255,255,255,0.9) 11px 18px);
            box-shadow:
              0 -1px 0 rgba(255,255,255,0.36),
              0 1px 0 rgba(255,255,255,0.28),
              0 0 4px rgba(255,255,255,0.24);
            clip-path: inset(0 100% 0 0);
            animation: begin-chalk-strike 0.72s steps(22, end) 500ms forwards;
          }

          .begin-chalk-strike-line:nth-child(2)::after {
            animation-delay: 1.08s;
          }

          .begin-chalk-strike-mobile {
            display: none;
          }

          .begin-mobile-swipe-cue {
            display: none;
          }

          .begin-email-team-button {
            position: relative;
            display: flex;
            width: min(100%, 58rem);
            aspect-ratio: 3 / 1;
            align-items: center;
            justify-content: center;
            padding: 2rem 4rem 2.3rem;
            color: rgba(255,255,255,0.92);
            text-align: center;
            text-decoration: none;
            background-image: url('/begin/generated/email-team-chalk-bevel-erased.png');
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
            filter: drop-shadow(0 12px 22px rgba(0,0,0,0.4));
            transform: rotate(-0.35deg);
            transition: transform 180ms ease, color 180ms ease, filter 180ms ease;
          }

          .begin-email-team-button:hover {
            color: white;
            transform: rotate(0deg) translateY(-3px) scale(1.012);
            filter: drop-shadow(0 16px 28px rgba(0,0,0,0.55)) brightness(1.08);
          }

          .begin-email-team-button:focus-visible {
            outline: 3px solid white;
            outline-offset: 7px;
          }

          @media (max-width: 639px) {
            .begin-email-team-button {
              padding: 1rem 2rem 1.15rem;
            }
          }

          @supports (animation-timeline: view()) {
            .begin-chalk-strike-line::after {
              animation-delay: 0ms;
              animation-timeline: view();
              animation-range: entry 68% contain 80%;
            }

            .begin-chalk-strike-line:nth-child(2)::after {
              animation-range: entry 80% contain 95%;
            }
          }

          @media (max-width: 900px) {
            .begin-typing-group {
              width: auto;
            }

            .begin-typing-line {
              width: auto;
              max-width: none;
              white-space: normal;
              clip-path: none;
              animation: none;
            }
          }

          @media (max-width: 639px) {
            .begin-openai-page {
              cursor: auto !important;
              overflow-x: clip;
            }

            .begin-mia-sprite {
              --mia-w: 6.5rem;
            }

            .begin-mobile-carousel,
            .begin-mobile-comment-carousel {
              display: flex;
              width: auto;
              margin-right: -1.5rem;
              padding-right: 1.5rem;
              overflow-x: auto;
              overflow-y: hidden;
              overscroll-behavior-inline: contain;
              scroll-snap-type: x mandatory;
              scrollbar-width: none;
              -webkit-overflow-scrolling: touch;
            }

            .begin-mobile-carousel::-webkit-scrollbar,
            .begin-mobile-comment-carousel::-webkit-scrollbar {
              display: none;
            }

            .begin-mobile-carousel-card {
              width: min(76vw, 18rem) !important;
              min-width: min(76vw, 18rem);
              flex: 0 0 min(76vw, 18rem);
              scroll-snap-align: start;
            }

            .begin-mobile-swipe-cue {
              display: block;
              margin-top: 0.75rem;
            }

            .begin-mobile-comment-carousel > * {
              width: min(80vw, 20rem) !important;
              min-width: min(80vw, 20rem);
              flex: 0 0 min(80vw, 20rem);
              scroll-snap-align: start;
              align-self: flex-start;
            }

            .begin-chalk-strike-desktop {
              display: none;
            }

            .begin-chalk-strike-mobile {
              display: flex;
            }

            .begin-chalk-strike-line:nth-child(3)::after {
              animation-delay: 1.66s;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .begin-mia-sprite {
              animation: none;
            }
          }

          @media (max-width: 639px) and (prefers-reduced-motion: reduce) {
            .begin-typing-line,
            .begin-chalk-strike-line::after {
              animation: none;
              clip-path: none;
            }

            .begin-openai-arrow {
              animation: none;
            }
          }
        `}
      </style>
      <section className="relative min-h-[calc(100vh-4rem)] bg-black px-6 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl flex-col justify-start">
          <div className="relative mx-auto flex max-w-5xl flex-1 flex-col items-center justify-start pb-24 pt-10 text-center sm:pb-28 sm:pt-20 lg:pt-24">
            <Image
              src="/begin/chalk-heart.png"
              alt=""
              width={220}
              height={220}
              aria-hidden="true"
              className="absolute right-2 top-20 h-16 w-16 rotate-12 opacity-55 sm:-right-8 sm:top-14 sm:h-24 sm:w-24 lg:-right-12 lg:h-28 lg:w-28"
            />
            <h1
              className={`${mouseMemoirs.className} relative max-w-5xl text-5xl font-normal leading-[0.95] sm:text-8xl lg:text-9xl`}
            >
              Teaching the Next Generation How to Use AI
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/74 sm:mt-7 sm:text-xl sm:leading-8">
              A proposal for an ongoing educational partnership between Michelle
              Lawson (
              <a
                href="https://www.instagram.com/michellescomputer/"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-white/35 underline-offset-4 transition hover:text-white hover:decoration-white"
              >
                @michellescomputer
              </a>
              ) and OpenAI.
            </p>
            <div className="begin-typing-group mx-auto mt-8 space-y-3 text-base leading-7 text-white/72 sm:mt-10 sm:space-y-4 sm:text-xl sm:leading-8">
              {heroIntro.map((line) => (
                <p className="begin-typing-line" key={line}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
        <Image
          src="/begin/chalk-down-arrow.png"
          alt=""
          width={160}
          height={160}
          aria-hidden="true"
          className="begin-openai-arrow absolute bottom-3 left-1/2 h-24 w-24 -translate-x-1/2 animate-[begin-arrow-bounce_1.7s_ease-in-out_infinite] opacity-85 sm:bottom-6 sm:h-40 sm:w-40"
        />
      </section>

      <section className="bg-black px-6 py-16 sm:px-10 sm:py-24 lg:px-16 lg:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-md lg:max-w-none">
            <div
              className="aspect-[4/5] overflow-hidden"
              style={{
                WebkitMaskImage: "url('/begin/michelle-blob-mask.svg')",
                maskImage: "url('/begin/michelle-blob-mask.svg')",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
              }}
            >
              <Image
                src="/begin/michelle-portrait.jpeg"
                alt="Michelle Lawson looking directly at the camera"
                width={768}
                height={1024}
                className="h-full w-full object-cover"
                sizes="(min-width: 1024px) 430px, (min-width: 640px) 448px, calc(100vw - 48px)"
              />
            </div>
          </div>

          <div className="space-y-9 sm:space-y-12">
            <div className="space-y-5">
              <h2
                className={`${mouseMemoirs.className} text-[3.5rem] font-normal leading-none sm:text-8xl`}
              >
                Hi, I&apos;m Michelle.
              </h2>
              <p className="max-w-2xl text-xl leading-9 text-white/72">
                I teach Gen Z how to use computer science and AI to gain agency,
                turn their ideas into reality, and create more possibilities for
                themselves.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-5">
              <div className="space-y-3">
                <Image
                  src="/begin/about-stats/250k.png"
                  alt="250K plus"
                  width={1553}
                  height={436}
                  className="h-14 w-auto max-w-full object-contain object-left sm:h-16 lg:h-20"
                  sizes="(min-width: 1024px) 190px, (min-width: 640px) 160px, 280px"
                />
                <p className="text-base leading-6 text-white/68">
                  followers across platforms
                </p>
              </div>
              <div className="space-y-3">
                <Image
                  src="/begin/about-stats/millions.png"
                  alt="Millions"
                  width={1682}
                  height={430}
                  className="h-14 w-auto max-w-full object-contain object-left sm:h-16 lg:h-20"
                  sizes="(min-width: 1024px) 210px, (min-width: 640px) 170px, 300px"
                />
                <p className="text-base leading-6 text-white/68">
                  of video views
                </p>
              </div>
              <div className="col-span-2 space-y-3 sm:col-span-1">
                <Image
                  src="/begin/about-stats/11-percent.png"
                  alt="11 percent"
                  width={1202}
                  height={673}
                  className="h-14 w-auto max-w-full object-contain object-left sm:h-16 lg:h-20"
                  sizes="(min-width: 1024px) 150px, (min-width: 640px) 125px, 210px"
                />
                <p className="text-base leading-6 text-white/68">
                  Instagram engagement by reach
                </p>
              </div>
            </div>

            <div className="space-y-7 text-xl leading-9 text-white/72">
              <p>
                I&apos;ve partnered with OpenAI and other leading technology
                companies to make emerging technology feel practical,
                approachable, and worth trying.
              </p>
              <Image
                src="/begin/partner-logo-strip.png"
                alt="Partner logos: LinkedIn, ServiceNow, Claude, OpenAI, CodePath, and Santander"
                width={2396}
                height={214}
                className="w-full max-w-2xl rounded bg-white object-contain"
                sizes="(min-width: 1024px) 672px, calc(100vw - 48px)"
              />
              <p className="text-white">
                And the more I work with OpenAI, the more I'm convinced that the
                biggest opportunity is teaching people what to actually do with
                your products.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="the-opportunity"
        className="scroll-mt-20 bg-black px-6 py-16 sm:px-10 sm:py-24 lg:px-16"
      >
        <div className="mx-auto max-w-6xl space-y-16">
          <div className="relative max-w-5xl">
            <h2
              className={`${mouseMemoirs.className} relative z-10 max-w-4xl text-5xl font-normal leading-none tracking-tight sm:text-8xl`}
            >
              Every few weeks, OpenAI releases something that blows my mind.
            </h2>
            <Image
              src="/begin/messy-math-papers.png"
              alt=""
              width={1402}
              height={1122}
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 top-8 z-0 hidden w-52 rotate-6 opacity-62 lg:block xl:-right-24 xl:w-60"
              sizes="240px"
            />
          </div>

          <ReleaseWordMap />

          <div className="mx-auto max-w-4xl space-y-7 py-12 text-xl leading-9 text-white/72">
            <p>And every single time, I run into the same problem.</p>
            <p className="text-2xl font-semibold leading-9 text-white">
              I only get to make one or two videos.
            </p>
            <p>
              One or two chances to explain dozens of incredible features,
              possibilities, and ideas.
            </p>
            <p>
              But I know the most memorable posts must have one simple core
              idea, so people walk away with something to try.
            </p>
            <p>So I constantly find myself asking:</p>
          </div>

          <div className="mx-auto max-w-5xl py-14 text-center">
            <p className="mx-auto max-w-3xl text-xl leading-9 text-white/68">
              &quot;Which possibilities am I leaving out?&quot;
            </p>
            <p
              className={`${mouseMemoirs.className} mx-auto mt-8 max-w-4xl text-4xl font-normal leading-none text-white sm:text-6xl`}
            >
              There are simply too many good ones for one video.
            </p>
          </div>

          <div className="mx-auto max-w-4xl space-y-7 text-xl leading-9 text-white/72">
            <p>
              Maybe the goal isn&apos;t to fit everything into one video, or
              even one influencer campaign sprint.
            </p>
            <p>
              <em>
                The goal is to <strong>educate people over time</strong>.
              </em>
            </p>
            <p>With practical but life-altering use cases.</p>
            <p>
              Because education is the highest form of product leverage. In
              other words,
            </p>
            <p
              className={`${mouseMemoirs.className} pt-8 text-5xl font-normal leading-none text-white sm:text-7xl`}
            >
              The more people learn, the more they&apos;ll use ChatGPT.
            </p>
            <p>
              <strong>So let's teach people!</strong>
            </p>
          </div>
        </div>
      </section>

      <section
        id="why-educate"
        className="scroll-mt-20 bg-black px-6 py-16 sm:px-10 sm:py-24 lg:px-16"
      >
        <div className="mx-auto max-w-5xl space-y-14">
          <div className="space-y-7">
            <h2
              className={`${mouseMemoirs.className} text-3xl font-normal leading-none tracking-tight sm:text-7xl`}
            >
              Nobody wakes up thinking,
            </h2>
            <div
              className="text-2xl leading-tight text-white/86 sm:text-4xl"
              aria-label="I really hope I get to use frontier reasoning today."
            >
              <p
                className="begin-chalk-strike begin-chalk-strike-desktop"
                aria-hidden="true"
              >
                <span className="begin-chalk-strike-line">
                  &quot;I really hope I get to use
                </span>
                <span className="begin-chalk-strike-line">
                  frontier reasoning today.&quot;
                </span>
              </p>
              <p
                className="begin-chalk-strike begin-chalk-strike-mobile"
                aria-hidden="true"
              >
                <span className="begin-chalk-strike-line">
                  &quot;I really hope I get
                </span>
                <span className="begin-chalk-strike-line">
                  to use frontier reasoning
                </span>
                <span className="begin-chalk-strike-line">today.&quot;</span>
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <p className="text-xl leading-9 text-white/72">
              They wake up thinking,
            </p>
            <div className="grid gap-5">
              {everydayQuestions.map((question) => (
                <p
                  key={question}
                  className={`${mouseMemoirs.className} py-3 text-3xl leading-none text-white sm:text-5xl`}
                >
                  &quot;{question}&quot;
                </p>
              ))}
            </div>
          </div>

          <div className="max-w-4xl space-y-7 text-xl leading-9 text-white/72">
            <p className="text-2xl font-semibold leading-9 text-white sm:text-3xl sm:leading-10">
              OpenAI has built tools that make the impossible possible. Now, you
              can have a dedicated educator who teaches people what to do with
              them.
            </p>
            <p className="mx-auto max-w-3xl py-4 text-center text-4xl font-bold leading-tight text-white sm:text-5xl">
              That's where I come in,
            </p>
            <p className="text-2xl font-semibold leading-9 text-white sm:text-3xl sm:leading-10">
              a dedicated educator who teaches people what to do with all
              OpenAI's complex and brilliant tools.
            </p>
            <p>
              I will turn your features into relevant lessons{" "}
              <strong> Gen Z will understand, try, and come to love.</strong>
            </p>
          </div>

          <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden py-10">
            <Image
              src="/begin/michelle-photos/chalkboard-walking-wide.jpeg"
              alt="Michelle Lawson walking in front of a chalkboard covered in math notes"
              width={2048}
              height={1018}
              className="h-[25rem] min-h-0 w-full scale-100 object-cover object-[58%_center] sm:h-[70vh] sm:min-h-[34rem] sm:scale-110 sm:object-center"
              sizes="100vw"
            />
          </div>

          <div
            id="why-michelle"
            className="scroll-mt-20 max-w-4xl space-y-16 text-xl leading-9 text-white/72"
          >
            <div className="flex flex-wrap items-end gap-5 sm:gap-7">
              <h2
                className={`${mouseMemoirs.className} text-6xl font-normal leading-none tracking-tight text-white sm:text-8xl`}
              >
                Why Michelle?
              </h2>
              <div
                className="begin-mia-sprite"
                role="img"
                aria-label="Animated Mia waving and jumping"
              />
            </div>
          </div>

          <div className="max-w-4xl space-y-14 text-xl leading-9 text-white/72 sm:space-y-20">
            <div className="space-y-7">
              <div className="flex items-start gap-4 sm:items-center">
                <Image
                  src="/begin/chalk-numbers/chalk-circled-1.png"
                  alt="1"
                  width={512}
                  height={512}
                  className="mt-1 h-12 w-12 shrink-0 object-contain sm:mt-0 sm:h-14 sm:w-14"
                />
                <h3
                  className={`${mouseMemoirs.className} text-[2rem] leading-none text-white sm:text-5xl`}
                >
                  I make complicated concepts simple
                </h3>
              </div>
              <p className="text-xl leading-8 text-white sm:text-2xl sm:leading-9">
                I make new concepts useful to my audience by connecting them to
                ideas they are already familiar with.
              </p>
              <p>
                I started my online presence by making computer science concepts
                digestible. As I expanded into teaching AI and showing how it
                can be useful, I kept the same core principles: explain ideas
                step by step, make every video easy to understand, and ensure
                viewers walk away with practical knowledge they can use.
              </p>
              <ReelProofRow reels={featuredReelSections[0].reels} />
              <div
                className="begin-mobile-comment-carousel grid items-start gap-3 pt-2 sm:grid-cols-2 lg:grid-cols-3"
                role="region"
                aria-label="Audience comments. Swipe horizontally on mobile to see more."
                tabIndex={0}
              >
                {[
                  {
                    src: "/begin/comments/agentic-ai-understanding.png",
                    alt: "Audience comment praising the explanation of AI and agentic models",
                    width: 562,
                    height: 168,
                  },
                  {
                    src: "/begin/comments/best-video-on-topic.png",
                    alt: "Audience comment calling it one of the best videos on the topic",
                    width: 574,
                    height: 172,
                  },
                  {
                    src: "/begin/comments/vibe-code-explanation.png",
                    alt: "Audience comment praising the vibe coding explanation",
                    width: 558,
                    height: 164,
                  },
                  {
                    src: "/begin/comments/enlightening-video.png",
                    alt: "Audience comment describing the video as enlightening",
                    width: 568,
                    height: 128,
                  },
                  {
                    src: "/begin/comments/beginner-coding-request.png",
                    alt: "Audience comment asking for more beginner coding education",
                    width: 794,
                    height: 182,
                  },
                ].map((comment) => (
                  <Image
                    key={comment.src}
                    src={comment.src}
                    alt={comment.alt}
                    width={comment.width}
                    height={comment.height}
                    className="h-auto w-full"
                    sizes="(min-width: 1024px) 250px, (min-width: 768px) 390px, calc(100vw - 48px)"
                  />
                ))}
              </div>
            </div>

            <div className="space-y-7">
              <div className="flex items-start gap-4 sm:items-center">
                <Image
                  src="/begin/chalk-numbers/chalk-circled-2.png"
                  alt="2"
                  width={512}
                  height={512}
                  className="mt-1 h-12 w-12 shrink-0 object-contain sm:mt-0 sm:h-14 sm:w-14"
                />
                <h3
                  className={`${mouseMemoirs.className} text-[2rem] leading-none text-white sm:text-5xl`}
                >
                  I keep it engaging for Gen Z
                </h3>
              </div>
              <p className="text-xl leading-8 text-white sm:text-2xl sm:leading-9">
                250K+ followers across platforms. Millions of video views. An
                11% Instagram engagement rate by reach.
              </p>
              <p className="text-xl leading-8 text-white sm:text-2xl sm:leading-9">
                The numbers speak for themselves. The philosophy that led me
                here is simple:
                <em>
                  people learn so much more when ideas are presented in a fun
                  and engaging way.
                </em>
              </p>
              <p>
                I&apos;m constantly sharing challenges with my audience and
                making videos with memes, jokes, and references I know will keep
                them engaged. My audience loves it, and we&apos;re always joking
                together while we learn.
              </p>
              <ReelProofRow reels={featuredReelSections[1].reels} />
              <div
                className="begin-mobile-comment-carousel grid items-start gap-3 pt-2 sm:grid-cols-2"
                role="region"
                aria-label="Audience comments. Swipe horizontally on mobile to see more."
                tabIndex={0}
              >
                {[
                  {
                    src: "/begin/comments/positive-growth-impact.png",
                    alt: "Audience comment describing the positive impact of Michelle's content",
                    width: 812,
                    height: 128,
                  },
                  {
                    src: "/begin/comments/audience-trust-following.png",
                    alt: "Audience comment expressing trust and love for Michelle's content",
                    width: 872,
                    height: 148,
                  },
                ].map((comment) => (
                  <Image
                    key={comment.src}
                    src={comment.src}
                    alt={comment.alt}
                    width={comment.width}
                    height={comment.height}
                    className="h-auto w-full"
                    sizes="(min-width: 768px) 390px, calc(100vw - 48px)"
                  />
                ))}
              </div>
            </div>

            <div className="space-y-7">
              <div className="flex items-start gap-4 sm:items-center">
                <Image
                  src="/begin/chalk-numbers/chalk-circled-3.png"
                  alt="3"
                  width={512}
                  height={512}
                  className="mt-1 h-12 w-12 shrink-0 object-contain sm:mt-0 sm:h-14 sm:w-14"
                />
                <h3
                  className={`${mouseMemoirs.className} text-[2rem] leading-none text-white sm:text-5xl`}
                >
                  I&apos;ve helped people discover OpenAI
                </h3>
              </div>
              <p>
                I&apos;ve already partnered with OpenAI, translated product
                launches into useful creator content, and participated in
                ChatGPT Futures.
              </p>
              <p className="text-xl leading-8 text-white sm:text-2xl sm:leading-9">
                I understand both the products and the audience response that
                turns a launch into sustained interest.
              </p>
              <ReelProofRow reels={featuredReelSections[2].reels} />
              <div
                className="begin-mobile-comment-carousel grid items-start gap-3 pt-2 sm:grid-cols-2 lg:grid-cols-3"
                role="region"
                aria-label="Audience comments. Swipe horizontally on mobile to see more."
                tabIndex={0}
              >
                {[
                  {
                    src: "/begin/comments/codex-automations-discovery.png",
                    alt: "Audience comment discovering Codex automations",
                    width: 976,
                    height: 122,
                  },
                  {
                    src: "/begin/comments/codex-need-to-jump-on.png",
                    alt: "Audience comment saying they need to start using Codex",
                    width: 402,
                    height: 100,
                  },
                  {
                    src: "/begin/comments/codex-sites-automation-question.png",
                    alt: "Audience question about using Codex to update sites automatically",
                    width: 530,
                    height: 202,
                  },
                ].map((comment) => (
                  <Image
                    key={comment.src}
                    src={comment.src}
                    alt={comment.alt}
                    width={comment.width}
                    height={comment.height}
                    className="h-auto w-full"
                    sizes="(min-width: 1024px) 250px, (min-width: 768px) 390px, calc(100vw - 48px)"
                  />
                ))}
              </div>
            </div>

            <div className="space-y-7">
              <div className="flex items-start gap-4 sm:items-center">
                <Image
                  src="/begin/chalk-numbers/chalk-circled-4.png"
                  alt="4"
                  width={512}
                  height={512}
                  className="mt-1 h-12 w-12 shrink-0 object-contain sm:mt-0 sm:h-14 sm:w-14"
                />
                <h3
                  className={`${mouseMemoirs.className} text-[2rem] leading-none text-white sm:text-5xl`}
                >
                  I can sustain the program
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  "I already publish posts almost every day.",
                  "I have experience translating new launches quickly.",
                  "Oh, and I'm five minutes from OpenAI's Mission Bay office. 😉",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-4 h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            id="the-proposal"
            className="scroll-mt-20 max-w-4xl space-y-10 pt-14 text-xl leading-9 text-white/72"
          >
            <h2
              className={`${mouseMemoirs.className} text-5xl font-normal leading-none tracking-tight text-white sm:text-8xl`}
            >
              What I&apos;m Proposing
            </h2>

            <div className="space-y-7">
              <p className="mx-auto max-w-5xl text-center text-2xl leading-9 sm:text-4xl sm:leading-tight">
                <strong className="text-white">
                  A 3 year program to educate Gen Z on ways to use ChatGPT in
                  daily life.
                </strong>
              </p>
              <p>
                You&apos;re creating more useful features than any single launch
                campaign can fully explain.
              </p>
              <p>
                I will help Gen Z understand what your features can do for them
                with one practical use case at a time.
              </p>
              <p>
                Together, we can create an ongoing educational series that turns
                new and existing OpenAI capabilities into simple and practical
                how-to videos that people can understand, remember, and try.
              </p>
            </div>

            <div className="space-y-12">
              <div className="space-y-5">
                <p className="text-2xl font-semibold leading-8 text-white sm:text-3xl sm:leading-10">
                  We&apos;ll begin with a 90-day pilot:
                </p>
                <ul className="space-y-3">
                  {[
                    "15-20 educational videos",
                    "Revolving around three priority features aligned with your current business goals",
                    "Each feature will have 5-7 practical use cases Gen Z would love to try.",
                    "Clear performance and product-interest measurement through analytics",
                    "Qualitative audience insights showing what people want to try, understand, and still find confusing",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-4 h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-5">
                <p className="text-2xl font-semibold leading-8 text-white sm:text-3xl sm:leading-10">
                  What this gives you:
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {proposalPayoffs.map(
                    ({ title, description, Icon }, index) => (
                      <div
                        key={title}
                        className="group relative min-h-56 p-8 sm:p-9"
                      >
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none absolute inset-0 bg-[url('/begin/generated/chalk-card-border.png')] bg-[length:100%_100%] bg-center bg-no-repeat opacity-65 transition-[opacity,transform] duration-300 group-hover:scale-[1.01] group-hover:opacity-95 ${
                            index % 2 === 0
                              ? "-rotate-[0.3deg]"
                              : "rotate-[0.3deg]"
                          }`}
                        />
                        <div className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center bg-[url('/begin/generated/chalk-nav-circle.png')] bg-contain bg-center bg-no-repeat opacity-85 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                          <Icon
                            aria-hidden="true"
                            className="h-5 w-5 text-white"
                            strokeWidth={1.8}
                          />
                        </div>
                        <h3 className="relative z-10 text-xl font-semibold leading-7 text-white sm:text-2xl">
                          {title}
                        </h3>
                        <p className="relative z-10 mt-3 text-lg leading-8 text-white/68">
                          {description}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-7">
              <p>
                After a successful pilot, we can expand it into a renewable
                year-long program - with the potential to teach 100 ways people
                can use ChatGPT.
              </p>
              <p className="text-white">
                With me as your dedicated educator and ambassador to Gen Z, more
                people will understand what ChatGPT can do, see themselves in
                the use case, try it once, and build the habit of coming back.
              </p>
            </div>
          </div>

          <div id="chatgpt-videos" className="scroll-mt-20 max-w-5xl pt-14">
            <h2
              className={`${mouseMemoirs.className} text-5xl font-normal leading-none tracking-tight text-white sm:text-8xl`}
            >
              100 Videos I Could Make About ChatGPT
            </h2>

            <div className="mt-14 space-y-10">
              {chatGPTUseCaseFeatures.map((feature) => (
                <div
                  key={feature.feature}
                  className="grid items-start gap-4 sm:grid-cols-[minmax(10rem,0.7fr)_6rem_minmax(0,1.3fr)] sm:gap-8"
                >
                  <div className="relative h-16 w-full sm:h-24">
                    <Image
                      src={feature.featureImage}
                      alt={feature.feature}
                      fill
                      className="object-contain object-left"
                      sizes="(min-width: 1024px) 280px, (min-width: 640px) 34vw, 90vw"
                    />
                  </div>

                  <div className="relative ml-3 h-10 w-20 rotate-90 sm:ml-0 sm:mt-2 sm:h-16 sm:w-full sm:rotate-0">
                    <Image
                      src="/begin/chalk-arrow-right.png"
                      alt=""
                      fill
                      aria-hidden="true"
                      className="object-contain"
                      sizes="112px"
                    />
                  </div>

                  <ul className="space-y-3 text-xl leading-8 text-white/72">
                    {feature.useCases.map((useCase) => (
                      <li key={useCase} className="flex gap-3">
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
                        <span>{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div
              id="lets-talk"
              className="scroll-mt-20 mt-14 space-y-5 text-white sm:mt-20 sm:space-y-6"
            >
              <p
                className={`${mouseMemoirs.className} text-5xl leading-none sm:text-7xl`}
              >
                That&apos;s the first 12.
              </p>
              <p className="text-2xl leading-9 text-white/72 sm:text-3xl sm:leading-10">
                Want the remaining 88? Let&apos;s talk!
              </p>

              <div className="flex justify-center pt-6 sm:pt-10">
                <a
                  href={emailTeamHref}
                  className="begin-email-team-button"
                  aria-label="Email Michelle, Patrick, and Teresa about the OpenAI partnership"
                />
              </div>
            </div>
          </div>

          <footer className="pt-24 text-center text-base text-white/48">
            This webpage was made with Codex 😉
          </footer>
        </div>
      </section>
    </main>
  );
}
