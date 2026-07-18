import Image from "next/image";
import { Mouse_Memoirs } from "next/font/google";
import { ExternalLink } from "lucide-react";
import { ChalkTrail } from "../openai/chalk-trail";
import { ReleaseWordMap } from "../openai/release-word-map";
import { featuredReelSections, type FeaturedReel } from "../openai/reels";

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
      "Make a personal income tracker.",
      "Look through your Granola meetings and update your personal CRM.",
      "Dig through your emails and find assignments you are losing track of.",
      "Make a Canva vision board from your saved ideas.",
      "Make a Spotify playlist for a road trip, a study night, or a GENERATIONAL lock in. (that's 3 😉)",
    ],
  },
  {
    feature: "Codex",
    featureImage: "/begin/releases-generated/codex.png",
    useCases: [
      "Build a portfolio website as an artist, writer, or musician.",
      "Make a simple app for an idea you have had forever.",
      "Turn a messy spreadsheet into a clean dashboard.",
      "Build a personal tool that saves you time every week.",
      "Fix bugs in a project you were too stuck to finish.",
    ],
  },
  {
    feature: "Memory",
    featureImage: "/begin/releases-generated/memory-dreaming.png",
    useCases: [
      "Keep track of your daily tasks like a personal assistant.",
      "Notice your patterns and suggest ways you can grow.",
      "Help you navigate your workplace culture.",
      "Remember your goals so advice fits your real life.",
      "Help you prepare for hard conversations.",
    ],
  },
];

function ReelProofRow({ reels }: { reels: FeaturedReel[] }) {
  return (
    <div
      className={`grid gap-5 pt-3 ${
        reels.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3"
      }`}
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

        return (
          <div
            key={reel.title}
            className="group relative aspect-[9/16] overflow-hidden rounded-[1.35rem] bg-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_18px_50px_rgba(0,0,0,0.45)]"
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
                  <p
                    className={`${mouseMemoirs.className} max-w-[75%] text-2xl leading-none text-white`}
                  >
                    {reel.title}
                  </p>
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
            ) : reel.posterSrc && reel.instagramUrl ? (
              <a
                href={reel.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${reel.title} on Instagram`}
                className="block h-full text-white"
              >
                <Image
                  src={reel.posterSrc}
                  alt={reel.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 640px) 30vw, calc(100vw - 48px)"
                />
                <div className="absolute inset-x-0 top-0 flex items-start justify-between bg-black/72 p-4">
                  <p
                    className={`${mouseMemoirs.className} max-w-[75%] text-2xl leading-none text-white`}
                  >
                    {reel.title}
                  </p>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-black/70 text-white transition group-hover:bg-white group-hover:text-black">
                    <ExternalLink aria-hidden="true" className="h-5 w-5" />
                  </span>
                </div>
              </a>
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
  );
}

export default function OpenAIBeginPage() {
  return (
    <main
      className="bg-black pt-16 text-white"
      style={{ cursor: "url('/begin/chalk-cursor.png') 12 12, auto" }}
    >
      <ChalkTrail />
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

          @media (max-width: 640px) {
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
        `}
      </style>
      <section className="relative min-h-[calc(100vh-4rem)] bg-black px-6 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl flex-col justify-start">
          <div className="relative mx-auto flex max-w-5xl flex-1 flex-col items-center justify-start pb-28 pt-16 text-center sm:pt-20 lg:pt-24">
            <Image
              src="/begin/chalk-heart.png"
              alt=""
              width={220}
              height={220}
              aria-hidden="true"
              className="absolute right-2 top-20 h-16 w-16 rotate-12 opacity-55 sm:-right-8 sm:top-14 sm:h-24 sm:w-24 lg:-right-12 lg:h-28 lg:w-28"
            />
            <h1
              className={`${mouseMemoirs.className} relative max-w-5xl text-6xl font-normal leading-[0.95] sm:text-8xl lg:text-9xl`}
            >
              Teaching the Next Generation How to Use AI
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/74 sm:text-xl">
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
            <div className="begin-typing-group mx-auto mt-10 space-y-4 text-lg leading-8 text-white/72 sm:text-xl">
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
          className="absolute bottom-4 left-1/2 h-28 w-28 -translate-x-1/2 animate-[begin-arrow-bounce_1.7s_ease-in-out_infinite] opacity-85 sm:bottom-6 sm:h-40 sm:w-40"
        />
      </section>

      <section className="bg-black px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
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

          <div className="space-y-12">
            <div className="space-y-5">
              <h2
                className={`${mouseMemoirs.className} text-7xl font-normal leading-none sm:text-8xl`}
              >
                Hi, I&apos;m Michelle.
              </h2>
              <p className="max-w-2xl text-xl leading-9 text-white/72">
                I teach Gen Z how to use computer science and AI to gain agency,
                turn their ideas into reality, and create more possibilities for
                themselves.
              </p>
            </div>

            <div className="grid gap-10 sm:grid-cols-3 sm:gap-5">
              <div className="space-y-3">
                <Image
                  src="/begin/about-stats/250k.png"
                  alt="250K plus"
                  width={1553}
                  height={436}
                  className="h-20 w-auto max-w-full object-contain object-left sm:h-16 lg:h-20"
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
                  className="h-20 w-auto max-w-full object-contain object-left sm:h-16 lg:h-20"
                  sizes="(min-width: 1024px) 210px, (min-width: 640px) 170px, 300px"
                />
                <p className="text-base leading-6 text-white/68">
                  of video views
                </p>
              </div>
              <div className="space-y-3">
                <Image
                  src="/begin/about-stats/11-percent.png"
                  alt="11 percent"
                  width={1202}
                  height={673}
                  className="h-20 w-auto max-w-full object-contain object-left sm:h-16 lg:h-20"
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
                And the more I work with OpenAI, the more convinced I become
                that the biggest opportunity is teaching people what to actually
                do with it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-black px-6 py-24 sm:px-10 lg:px-16">
        <Image
          src="/begin/messy-math-papers.png"
          alt=""
          width={1402}
          height={1122}
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-28 hidden w-72 rotate-6 opacity-42 lg:block xl:right-4 xl:w-80"
          sizes="320px"
        />
        <div className="relative mx-auto max-w-6xl space-y-16">
          <div className="max-w-5xl space-y-8">
            <h2 className="sr-only">The Problem</h2>
            <Image
              src="/begin/the-problem-chalk.png"
              alt="The Problem"
              width={1999}
              height={786}
              className="w-full max-w-2xl"
              sizes="(min-width: 1024px) 672px, calc(100vw - 48px)"
              priority={false}
            />
            <p
              className={`${mouseMemoirs.className} max-w-5xl text-6xl font-normal leading-none text-white sm:text-8xl`}
            >
              OpenAI is releasing powerful features faster than people can learn
              how to use them in daily life.
            </p>
          </div>

          <div className="max-w-4xl space-y-9 text-xl leading-9 text-white/72">
            <p>That is not a product problem.</p>
            <p>It is an education problem.</p>
            <p>
              New launches create excitement, but a launch announcement does not
              automatically turn into a habit.
            </p>
            <p>
              People need simple, practical examples that connect ChatGPT to the
              things they already care about: school, work, money, creativity,
              confidence, and their future.
            </p>
            <p>
              Without that translation layer, the technology can feel impressive
              but distant.
            </p>
            <p>
              The opportunity is to teach people what to do with ChatGPT before
              the next release gives them even more to learn.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl space-y-16">
          <div className="max-w-4xl space-y-8">
            <h2
              className={`${mouseMemoirs.className} text-6xl font-normal leading-none tracking-tight sm:text-8xl`}
            >
              Every few weeks, OpenAI releases something that blows my mind.
            </h2>
          </div>

          <ReleaseWordMap />

          <div className="mx-auto max-w-4xl space-y-7 py-12 text-xl leading-9 text-white/72">
            <p>Every release unlocks dozens of new possibilities!!</p>
            <p>
              As someone who&apos;s worked with OpenAI on creator campaigns,
              I&apos;ve had a front-row seat to these amazing launches.
            </p>
            <p>And every single time, I run into the same problem.</p>
            <p>I only get to make one or two videos.</p>
            <p>
              One or two chances to explain dozens of incredible features,
              possibilities, and ideas.
            </p>
            <p>
              But I know the most memorable videos have one simple core idea, so
              people walk away with something to try.
            </p>
            <p>So I constantly find myself asking:</p>
          </div>

          <div className="mx-auto max-w-5xl py-14 text-center">
            <p
              className={`${mouseMemoirs.className} text-6xl font-normal leading-none sm:text-8xl`}
            >
              &quot;Which possibilities do I leave out?&quot;
            </p>
            <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-white/68">
              Because there are simply too many good ones.
            </p>
          </div>

          <div className="mx-auto max-w-4xl space-y-7 text-xl leading-9 text-white/72">
            <p>
              But the goal isn&apos;t to fit everything into one video, or one
              influencer campaign sprint.
            </p>
            <p>
              <em>
                The goal is to <strong>educate people over time</strong>.
              </em>
            </p>
            <p>With practical but life-altering use cases.</p>
            <p>
              Education is the highest form of product leverage. In other words,
            </p>
            <p
              className={`${mouseMemoirs.className} pt-8 text-5xl font-normal leading-none text-white sm:text-7xl`}
            >
              The more people learn, the more they&apos;ll use ChatGPT.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-5xl space-y-14">
          <div className="space-y-7">
            <h2
              className={`${mouseMemoirs.className} text-5xl font-normal leading-none tracking-tight sm:text-7xl`}
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
                  className={`${mouseMemoirs.className} py-5 text-4xl leading-none text-white sm:text-6xl`}
                >
                  &quot;{question}&quot;
                </p>
              ))}
            </div>
          </div>

          <div className="max-w-4xl space-y-7 text-xl leading-9 text-white/72">
            <p>
              OpenAI needs a trusted educator who can turn powerful features
              into everyday use cases people immediately understand.
            </p>
            <p>
              Someone who loves to teach, make things digestible, and is very
              engaging...
            </p>
          </div>

          <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden py-10">
            <Image
              src="/begin/michelle-photos/chalkboard-walking-wide.jpeg"
              alt="Michelle Lawson walking in front of a chalkboard covered in math notes"
              width={2048}
              height={1018}
              className="h-[58vh] min-h-[34rem] w-full scale-110 object-cover object-center sm:h-[70vh]"
              sizes="100vw"
            />
          </div>

          <div className="max-w-4xl space-y-16 text-xl leading-9 text-white/72">
            <h2
              className={`${mouseMemoirs.className} text-6xl font-normal leading-none tracking-tight text-white sm:text-8xl`}
            >
              Why Michelle?
            </h2>
          </div>

          <div className="max-w-4xl space-y-12 text-xl leading-9 text-white/72">
            <div className="space-y-5">
              <p>
                <strong className="text-white">
                  I love helping people learn.
                </strong>
              </p>
              <p>I fell in love with learning years ago.</p>
              <p>Then I fell in love with teaching.</p>
              <p>
                Today, I spend my days helping hundreds of thousands of people
                believe they can build, create, and solve problems with
                technology.
              </p>
            </div>

            <div className="space-y-7">
              <p>
                <strong className="text-white">
                  I know how to make complicated things feel simple.
                </strong>
              </p>
              <p>
                I&apos;ve built an educational community of over{" "}
                <strong className="text-white">200,000 people</strong> across
                social media.
              </p>
              <p>
                Millions of people have watched my videos explaining computer
                science, programming, and now AI.
              </p>
              <p>Not because I make technology sound smarter.</p>
              <p>Because I make it feel approachable.</p>
              <ReelProofRow reels={featuredReelSections[0].reels} />
            </div>

            <div className="space-y-7">
              <p>
                <strong className="text-white">
                  I&apos;ve already helped people discover OpenAI.
                </strong>
              </p>
              <p>
                I&apos;ve been fortunate enough to collaborate with OpenAI
                across multiple creator campaigns.
              </p>
              <p>Those campaigns taught me something important.</p>
              <p>Every launch introduces incredible new possibilities.</p>
              <p>But there&apos;s never enough time to teach them all.</p>
              <ReelProofRow reels={featuredReelSections[1].reels} />
            </div>

            <div className="space-y-5">
              <p>
                <strong className="text-white">Bonus point.</strong>
              </p>
              <p>
                I&apos;m a five minute drive from OpenAI&apos;s Mission Bay
                office, so if you ever need me to come in, I can literally be
                there.
              </p>
            </div>
          </div>

          <div className="max-w-4xl space-y-10 pt-14 text-xl leading-9 text-white/72">
            <h2
              className={`${mouseMemoirs.className} text-6xl font-normal leading-none tracking-tight text-white sm:text-8xl`}
            >
              What I&apos;m Proposing
            </h2>

            <div className="space-y-7">
              <p className="mx-auto max-w-5xl text-center text-2xl leading-9 sm:text-4xl sm:leading-tight">
                <strong className="text-white">
                  A year-long program to educate Gen Z on ChatGPT in daily life.
                </strong>
              </p>
              <p>
                You&apos;re creating more useful features than any single launch
                campaign can fully explain.
              </p>
              <p>
                I want to help Gen Z understand what your features can do for
                them—one practical use case at a time.
              </p>
              <p>
                Together, we can create an ongoing educational series that turns
                new and existing OpenAI capabilities into simple, useful videos
                people can understand, remember, and try.
              </p>
            </div>

            <div className="space-y-5">
              <p className="text-white">
                We&apos;ll begin with a 90-day pilot:
              </p>
              <ul className="space-y-3">
                {[
                  "12-15 educational videos",
                  "Three strategic themes",
                  "Three priority OpenAI features",
                  "Practical use cases connected to real Gen Z needs",
                  "Clear performance and product-interest measurement",
                  "Audience insights about what people understand, want, and still find confusing",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-4 h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-7">
              <p>
                If the pilot works, we expand it into a renewable year-long
                program—with the potential to teach 100 ways people can use
                OpenAI.
              </p>
              <p className="text-white">
                The benefit for you is simple: more people will understand what
                ChatGPT can do, see themselves in the use case, try it once, and
                build the habit of coming back.
              </p>
            </div>
          </div>

          <div className="max-w-5xl pt-14">
            <h2
              className={`${mouseMemoirs.className} text-6xl font-normal leading-none tracking-tight text-white sm:text-8xl`}
            >
              100 Videos I Could Make About ChatGPT
            </h2>

            <div className="mt-14 space-y-10">
              {chatGPTUseCaseFeatures.map((feature) => (
                <div
                  key={feature.feature}
                  className="grid items-start gap-5 sm:grid-cols-[minmax(10rem,0.7fr)_6rem_minmax(0,1.3fr)] sm:gap-8"
                >
                  <div className="relative h-20 w-full sm:h-24">
                    <Image
                      src={feature.featureImage}
                      alt={feature.feature}
                      fill
                      className="object-contain object-left"
                      sizes="(min-width: 1024px) 280px, (min-width: 640px) 34vw, 90vw"
                    />
                  </div>

                  <div className="relative h-12 w-24 sm:mt-2 sm:h-16 sm:w-full">
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

            <div className="mt-16 space-y-4 text-xl leading-9 text-white/72">
              <p>
                <strong className="text-white">
                  That&apos;s the first 15.
                </strong>
              </p>
              <p>
                Want the other 85? Let&apos;s make them together. Let&apos;s
                talk!
              </p>
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
