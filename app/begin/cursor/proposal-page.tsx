import Image from "next/image";
import {
  ExternalLink,
  GraduationCap,
  Info,
  MessagesSquare,
  Repeat2,
  TrendingUp,
} from "lucide-react";
import { ChalkTrail } from "./chalk-trail";
import { ProposalSectionNav } from "./proposal-section-nav";
import { ReleaseWordMap } from "./release-word-map";
import { PlayableReelCard } from "./playable-reel-card";
import { featuredReelSections, type FeaturedReel } from "./reels";
import { TypedQuestionList } from "./typed-question-list";

const cursorIntroReelTitles = [
  "How to vibe code properly",
  "Build a predictive model for the NFL",
  "Codex for students",
];

const allFeaturedReels = featuredReelSections.flatMap(
  (section) => section.reels,
);

const cursorIntroReels = cursorIntroReelTitles.flatMap((title) => {
  const reel = allFeaturedReels.find((candidate) => candidate.title === title);
  return reel ? [reel] : [];
});

const heroIntro = [
  "ChatGPT has the power to completely change how people learn, work, create, build, and live.",
  "But most people still don't know how to actually use it.",
  "I want to help change that.",
];

const cursorHeroIntro = [
  "Cursor can help people build websites, apps, and tools.",
  "It can also help them create books, art archives, and automations that advance their careers.",
  "But few people know all they can actually use it for.",
  "I want to help change that.",
];

const everydayQuestions = [
  "Can AI help me put this spreadsheet together? How?",
  "Can AI help me prepare for this interview? How?",
  "Can AI help me learn Python? How?",
  "Can AI help me organize my week? How?",
  "Can AI help me make more money? How?",
];

const cursorEverydayQuestions = [
  "Can I build a portfolio that actually feels like me? How?",
  "Can I make an app to organize my semester? How?",
  "Can I turn this idea into something my friends can use? How?",
  "Can I automate the annoying parts of my week? How?",
  "Can I build something people would pay for? How?",
];

type UseCaseFeature = {
  feature: string;
  featureImage?: string;
  useCases: string[];
};

const chatGPTUseCaseFeatures: UseCaseFeature[] = [
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

const cursorUseCaseFeatures: UseCaseFeature[] = [
  {
    feature: "10 websites & apps",
    useCases: [
      "Build a portfolio website that actually feels like you.",
      "Make a study dashboard for all your classes.",
      "Turn your notes into a quiz app.",
      "Build a useful mobile app from an idea in your Notes app.",
      "Create a tiny game inspired by your childhood.",
      "Make a tool that automates an annoying weekly task.",
      "Build and launch a tiny SaaS product people would pay for.",
      "Use multiple Cursor agents to build one project in parallel.",
      "Debug and test an app with real runtime evidence.",
      "Take an unfinished project all the way to launch.",
    ],
  },
  {
    feature: "10 unconventional projects",
    useCases: [
      "Write and organize a full-length book with Cursor.",
      "Turn a collection of poems into a designed digital poetry book.",
      "Turn physical artwork into a digital archive and print shop.",
      "Build your own digital museum around a person, place, or obsession.",
      "Create an interactive archive for your family stories.",
      "Turn years of journal entries into a private digital garden.",
      "Build an interactive world around an album or playlist.",
      "Create a personal magazine from your photos, essays, and memories.",
      "Turn family recipes into a searchable, shareable cookbook.",
      "Make a one-of-one digital experience as a gift for someone you love.",
    ],
  },
  {
    feature: "10 career accelerators",
    useCases: [
      "Build a personal career dashboard that tells you what to focus on next.",
      "Create an internship and job application tracker that updates itself.",
      "Turn your résumé into an interactive website.",
      "Build an interview practice tool tailored to your dream role.",
      "Create a personal CRM that helps you maintain professional relationships.",
      "Automate the repetitive reports and updates you make at work.",
      "Build a dashboard that makes your impact impossible to overlook.",
      "Use Cursor to understand and contribute to an unfamiliar codebase faster.",
      "Turn your expertise into an internal tool your whole team can use.",
      "Prototype an idea before pitching it to your boss or starting a company.",
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

const cursorProposalPayoffs = [
  {
    title: "More reasons to try Cursor",
    description:
      "Show Gen Z projects they already want to make instead of asking them to imagine the use case themselves.",
    Icon: Repeat2,
  },
  {
    title: "Greater feature discovery",
    description:
      "Give desktop, CLI, cloud agents, mobile, automations, and integrations room to become stories people understand.",
    Icon: TrendingUp,
  },
  {
    title: "Direct Gen Z insights",
    description:
      "Cursor learns what young people want to build, what stops them, and which workflows make them feel capable.",
    Icon: MessagesSquare,
  },
  {
    title: "A trusted Gen Z educator",
    description:
      "Give Cursor one consistent educator who can welcome new builders without losing technical credibility.",
    Icon: GraduationCap,
  },
];

const proposalTimelineStages = [
  {
    step: "01",
    title: "Discussion",
    duration: "2 weeks",
    bullets: [
      "Agree on goals, current priority features, KPIs, and what success looks like.",
      "Confirm points of contact, content formats, and publishing rhythm.",
    ],
  },
  {
    step: "02",
    title: "Discovery",
    duration: "3 months",
    bullets: [
      "Test practical use cases through different formats: videos, carousels, and stories.",
      "Learn what Gen Z responds well to and what they are excited to try.",
      "Measure qualified reach and attention, useful engagement, and intent to try.",
      "Take one week to review what worked and plan what comes next.",
    ],
  },
  {
    step: "03",
    title: "Delivery",
    duration: "6-month blocks",
    bullets: [
      "Scale what worked in Discovery into 50 practical ChatGPT use cases every six months.",
      "Focus each block on the features and use cases that support OpenAI's current business priorities.",
      "Take two weeks before the next block to review results and adapt the program around new launches and changing priorities.",
    ],
  },
];

const cursorTimelineStages = [
  {
    step: "01",
    title: "Discussion",
    duration: "1 week",
    bullets: [
      "Agree on goals, priority features, creative boundaries, KPIs, and what success looks like.",
      "Confirm points of contact, approvals, and the first five how-tos.",
    ],
  },
  {
    step: "02",
    title: "Education",
    duration: "12 months",
    bullets: [
      "Publish 30 practical Cursor how-tos across 12 months.",
      "Split the series evenly: 10 websites and apps, 10 unconventional projects, and 10 career accelerators.",
      "Teach new features through projects Gen Z already wants to make.",
    ],
  },
  {
    step: "03",
    title: "Evolution",
    duration: "Monthly",
    bullets: [
      "Review what people saved, tried, asked about, and struggled with.",
      "Use those signals and Cursor's current priorities to shape the next five videos.",
      "End with a clear view of what a longer program could unlock.",
    ],
  },
];

const cursorFeatureAssets = [
  {
    src: "/begin/releases-generated/cursor-desktop.png",
    alt: "Cursor Desktop.",
    className:
      "left-[2%] top-[4%] z-10 w-[34%] sm:left-[5%] sm:w-[29%] -rotate-5",
  },
  {
    src: "/begin/releases-generated/parallel-agents.png",
    alt: "Parallel Agents.",
    className:
      "right-[1%] top-[4%] z-20 w-[35%] sm:right-[3%] sm:w-[30%] rotate-4",
  },
  {
    src: "/begin/releases-generated/cloud-agents.png",
    alt: "Cloud Agents.",
    className:
      "left-[34%] top-[28%] z-30 w-[32%] sm:left-[36%] sm:w-[27%] -rotate-2",
  },
  {
    src: "/begin/releases-generated/cursor-cli.png",
    alt: "Cursor CLI.",
    className:
      "right-[2%] top-[31%] z-20 w-[27%] sm:right-[5%] sm:w-[22%] rotate-4",
  },
  {
    src: "/begin/releases-generated/web-mobile.png",
    alt: "Web and Mobile.",
    className:
      "left-[1%] top-[48%] z-10 w-[34%] sm:left-[4%] sm:w-[29%] -rotate-3",
  },
  {
    src: "/begin/releases-generated/automations.png",
    alt: "Automations.",
    className:
      "right-[1%] top-[57%] z-10 w-[31%] sm:right-[3%] sm:w-[26%] rotate-5",
  },
  {
    src: "/begin/releases-generated/mcps-skills.png",
    alt: "MCPs and Skills.",
    className:
      "left-[4%] bottom-[1%] z-20 w-[34%] sm:left-[9%] sm:w-[28%] rotate-2",
  },
  {
    src: "/begin/releases-generated/slack-github.png",
    alt: "Slack and GitHub.",
    className:
      "right-[20%] bottom-[0%] z-20 w-[35%] sm:right-[25%] sm:w-[28%] -rotate-2",
  },
];

const cursorNavSections = [
  { id: "introduction", label: "Introduction" },
  { id: "the-proposal", label: "What I’d Make" },
  { id: "chatgpt-videos", label: "30 Cursor how-tos" },
  { id: "why-michelle", label: "Why Michelle?" },
  { id: "lets-talk", label: "Let’s Talk!" },
];

function ReelProofRow({
  reels,
  fontClassName,
}: {
  reels: FeaturedReel[];
  fontClassName: string;
}) {
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
                  className={`${fontClassName} text-4xl leading-none text-white`}
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
                <PlayableReelCard reel={reel} />
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
        className={`${fontClassName} begin-mobile-swipe-cue text-right text-xl text-white/58`}
        aria-hidden="true"
      >
        Swipe to see more →
      </p>
    </>
  );
}

export default function ProposalPage({
  emphasisFontClassName,
}: {
  emphasisFontClassName: string;
}) {
  const isCursor = true;
  const activeHeroIntro = isCursor ? cursorHeroIntro : heroIntro;
  const activeEverydayQuestions = isCursor
    ? cursorEverydayQuestions
    : everydayQuestions;
  const activeUseCaseFeatures = isCursor
    ? cursorUseCaseFeatures
    : chatGPTUseCaseFeatures;
  const activeProposalPayoffs = isCursor
    ? cursorProposalPayoffs
    : proposalPayoffs;
  const activeTimelineStages = isCursor
    ? cursorTimelineStages
    : proposalTimelineStages;
  const emailTeamHref = `mailto:michelle@thedriveagency.co,patrick@thedriveagency.co,teresa@thedriveagency.co?subject=${encodeURIComponent(
    isCursor
      ? "Cursor × Michelle — 30 How-Tos in 12 Months"
      : "OpenAI × Michelle — Gen Z Product Education",
  )}&body=${encodeURIComponent(
    isCursor
      ? "Hi Michelle, Patrick, and Teresa,\n\nI’d love to discuss the 12-month Cursor education program: 30 practical how-to videos showing Gen Z what they can build with Cursor.\n\nWhat would be the best next step?\n\nBest,"
      : "Hi Michelle, Patrick, and Teresa,\n\nI’d love to discuss the three-year Gen Z product-education program and its first Discussion and Discovery phases.\n\nWhat would be the best next step?\n\nBest,",
  )}`;

  return (
    <main
      className="begin-cursor-page bg-black pt-16 text-white"
      style={{ cursor: "url('/begin/chalk-cursor.png') 12 12, auto" }}
    >
      <ChalkTrail />
      <ProposalSectionNav
        fontClassName={emphasisFontClassName}
        sections={isCursor ? cursorNavSections : undefined}
      />
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

          @keyframes begin-codex-travel {
            0% {
              left: 0;
              opacity: 0;
            }
            3%, 55% {
              opacity: 1;
            }
            58%, 90% {
              left: calc(100% - var(--mia-w));
              opacity: 1;
            }
            96% {
              left: calc(100% - var(--mia-w));
              opacity: 0;
            }
            100% {
              left: 0;
              opacity: 0;
            }
          }

          @keyframes begin-mia-loop {
            0%, 7% {
              background-position: 0 calc(var(--mia-h) * -1);
              transform: translateY(0);
            }
            8%, 14% {
              background-position: calc(var(--mia-w) * -1) calc(var(--mia-h) * -1);
            }
            15%, 21% {
              background-position: calc(var(--mia-w) * -2) calc(var(--mia-h) * -1);
            }
            22%, 28% {
              background-position: calc(var(--mia-w) * -3) calc(var(--mia-h) * -1);
            }
            29%, 35% {
              background-position: calc(var(--mia-w) * -4) calc(var(--mia-h) * -1);
            }
            36%, 42% {
              background-position: calc(var(--mia-w) * -5) calc(var(--mia-h) * -1);
            }
            43%, 49% {
              background-position: calc(var(--mia-w) * -6) calc(var(--mia-h) * -1);
            }
            50%, 57% {
              background-position: calc(var(--mia-w) * -7) calc(var(--mia-h) * -1);
            }
            58%, 63% {
              background-position: 0 calc(var(--mia-h) * -3);
            }
            64%, 69% {
              background-position: calc(var(--mia-w) * -1) calc(var(--mia-h) * -3);
            }
            70%, 75% {
              background-position: calc(var(--mia-w) * -2) calc(var(--mia-h) * -3);
            }
            76%, 80% {
              background-position: calc(var(--mia-w) * -3) calc(var(--mia-h) * -3);
            }
            81%, 84% {
              background-position: 0 calc(var(--mia-h) * -4);
              transform: translateY(0);
            }
            85%, 87% {
              background-position: calc(var(--mia-w) * -1) calc(var(--mia-h) * -4);
              transform: translateY(-0.45rem);
            }
            88%, 90% {
              background-position: calc(var(--mia-w) * -2) calc(var(--mia-h) * -4);
              transform: translateY(-0.8rem);
            }
            91%, 93% {
              background-position: calc(var(--mia-w) * -3) calc(var(--mia-h) * -4);
              transform: translateY(-0.35rem);
            }
            94%, 100% {
              background-position: calc(var(--mia-w) * -6) 0;
              transform: translateY(0);
            }
          }

          @keyframes begin-codex-hover-emote {
            0%, 100% {
              background-position: 0 calc(var(--mia-h) * -3);
              transform: translateY(0);
            }
            20% {
              background-position: calc(var(--mia-w) * -1) calc(var(--mia-h) * -3);
            }
            40% {
              background-position: calc(var(--mia-w) * -2) calc(var(--mia-h) * -3);
              transform: translateY(-0.15rem);
            }
            60% {
              background-position: calc(var(--mia-w) * -3) calc(var(--mia-h) * -3);
            }
            80% {
              background-position: calc(var(--mia-w) * -4) calc(var(--mia-h) * -3);
              transform: translateY(0);
            }
          }

          .begin-codex-pet-lane {
            --mia-w: clamp(5rem, 8vw, 6.75rem);
            --mia-h: calc(var(--mia-w) * 1.083333);
            position: relative;
            min-width: 12rem;
            height: calc(var(--mia-h) + 0.8rem);
            flex: 1 1 16rem;
            overflow: hidden;
          }

          .begin-codex-pet-traveler {
            position: absolute;
            bottom: 0;
            left: 0;
            width: var(--mia-w);
            height: var(--mia-h);
            animation: begin-codex-travel 9s linear infinite;
          }

          .begin-mia-sprite {
            width: var(--mia-w);
            height: var(--mia-h);
            background-image: url('/begin/codex-default-spritesheet.webp');
            background-repeat: no-repeat;
            background-size: calc(var(--mia-w) * 8) calc(var(--mia-h) * 11);
            background-position: calc(var(--mia-w) * -6) 0;
            image-rendering: auto;
            filter: drop-shadow(0 0 18px rgba(255,255,255,0.16));
            animation: begin-mia-loop 9s steps(1, end) infinite;
          }

          .begin-mia-sprite-michelle {
            background-image: url('/begin/mia-spritesheet.webp');
          }

          .begin-codex-pet-lane:hover .begin-codex-pet-traveler {
            animation-play-state: paused;
          }

          .begin-codex-pet-lane:hover .begin-mia-sprite {
            animation: begin-codex-hover-emote 1.25s steps(1, end) infinite;
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

          .begin-typing-line:nth-child(4) {
            animation-delay: 2.82s;
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
            .begin-cursor-page {
              cursor: auto !important;
              overflow-x: clip;
            }

            .begin-mobile-intro-grid {
              grid-template-columns: minmax(0, 1fr);
              width: 100%;
              min-width: 0;
            }

            .begin-mobile-intro-grid > *,
            .begin-mobile-intro-copy {
              width: 100%;
              min-width: 0;
              max-width: 100%;
            }

            .begin-mia-sprite {
              filter: drop-shadow(0 0 12px rgba(255,255,255,0.14));
            }

            .begin-codex-pet-lane {
              --mia-w: 4.75rem;
              min-width: 9rem;
              flex-basis: 10rem;
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
            .begin-mia-sprite,
            .begin-codex-pet-traveler {
              animation: none;
            }

            .begin-codex-pet-traveler {
              left: 0;
              opacity: 1;
            }
          }

          @media (max-width: 639px) and (prefers-reduced-motion: reduce) {
            .begin-typing-line,
            .begin-chalk-strike-line::after {
              animation: none;
              clip-path: none;
            }

            .begin-cursor-arrow {
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
              className={`${emphasisFontClassName} relative max-w-5xl text-5xl font-normal leading-[0.95] sm:text-8xl ${
                isCursor ? "lg:text-[6.75rem]" : "lg:text-9xl"
              }`}
            >
              {isCursor
                ? "Teaching the Next Generation How to Build with Cursor"
                : "Teaching the Next Generation How to Use AI"}
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
              ) and {isCursor ? "Cursor" : "OpenAI"}.
            </p>
            <div className="begin-typing-group mx-auto mt-8 space-y-3 text-base leading-7 text-white/72 sm:mt-10 sm:space-y-4 sm:text-xl sm:leading-8">
              {activeHeroIntro.map((line, index) => (
                <p className="begin-typing-line" key={line}>
                  {index === activeHeroIntro.length - 1 ? (
                    <a
                      href="#the-proposal"
                      aria-label="Here's how: jump to the proposal"
                      className="group inline-grid rounded-sm font-semibold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                    >
                      <span className="col-start-1 row-start-1 transition-all duration-200 group-hover:-translate-y-1 group-hover:opacity-0 group-focus-visible:-translate-y-1 group-focus-visible:opacity-0">
                        {line}
                      </span>
                      <span
                        aria-hidden="true"
                        className="col-start-1 row-start-1 translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                      >
                        Here&apos;s how →
                      </span>
                    </a>
                  ) : (
                    line
                  )}
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
          className="begin-cursor-arrow absolute bottom-0 left-1/2 h-24 w-24 -translate-x-1/2 animate-[begin-arrow-bounce_1.7s_ease-in-out_infinite] opacity-85 sm:bottom-1 sm:h-40 sm:w-40"
        />
      </section>

      <section
        id="introduction"
        className="scroll-mt-20 bg-black px-6 py-16 sm:px-10 sm:py-24 lg:px-16 lg:pb-20 lg:pt-32"
      >
        <div className="begin-mobile-intro-grid mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-20">
          <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-md lg:sticky lg:top-24 lg:max-w-none lg:self-start">
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

          <div className="begin-mobile-intro-copy space-y-9 sm:space-y-12">
            <div className="space-y-5">
              <h2
                className={`${emphasisFontClassName} text-[3.5rem] font-normal leading-none sm:text-8xl`}
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
              <details className="group relative col-span-2 sm:col-span-1">
                <summary
                  className="space-y-3 list-none cursor-help rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-4 focus-visible:ring-offset-black [&::-webkit-details-marker]:hidden"
                  aria-label="Show the industry engagement-rate comparison"
                  title="See the industry comparison"
                >
                  <Image
                    src="/begin/about-stats/11-percent.png"
                    alt="11 percent"
                    width={1202}
                    height={673}
                    className="h-14 w-auto max-w-full object-contain object-left sm:h-16 lg:h-20"
                    sizes="(min-width: 1024px) 150px, (min-width: 640px) 125px, 210px"
                  />
                  <p className="text-base leading-6 text-white/68 underline decoration-white/25 decoration-dotted underline-offset-4 transition group-hover:text-white">
                    Instagram engagement by reach
                    <span
                      aria-hidden="true"
                      className="ml-1.5 inline-grid h-6 w-6 place-items-center align-middle bg-[url('/begin/generated/chalk-nav-circle.png')] bg-contain bg-center bg-no-repeat text-white/85 opacity-80 transition group-hover:scale-105 group-hover:opacity-100 group-open:opacity-100"
                    >
                      <Info className="h-3 w-3" strokeWidth={2.4} />
                    </span>
                  </p>
                </summary>
                <div
                  role="tooltip"
                  className="invisible absolute left-1/2 top-full z-50 mt-3 w-72 max-w-[calc(100vw-3rem)] -translate-x-1/2 rounded border border-white/25 bg-black px-4 py-3 text-sm leading-6 text-white/78 opacity-0 shadow-[0_12px_30px_rgba(0,0,0,0.55)] transition group-open:visible group-open:opacity-100 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
                >
                  Compared to an{" "}
                  <a
                    href="https://blog.hootsuite.com/average-engagement-rate/"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-white underline decoration-white/50 underline-offset-4 hover:decoration-white"
                  >
                    industry average of 3.3%
                  </a>
                  .
                </div>
              </details>
            </div>

            <div className="space-y-7 text-xl leading-9 text-white/72">
              <p>
                {isCursor
                  ? "I have spent years showing young people that technical ideas are not out of reach—and that they can build things for school, work, creativity, and everyday life."
                  : "I've partnered with OpenAI over the past year to make new features feel practical, exciting, and worth trying."}
              </p>

              <div className="mx-auto max-w-lg">
                <ReelProofRow
                  fontClassName={emphasisFontClassName}
                  reels={
                    isCursor
                      ? cursorIntroReels
                      : featuredReelSections[2].reels.filter(
                          (reel) => reel.videoSrc,
                        )
                  }
                />
              </div>

              <p className="text-white">
                {isCursor
                  ? "Cursor gives people more ways to build than ever. The biggest opportunity is teaching them what to actually do with all of that possibility."
                  : "But the more I work with OpenAI, the more I realize that the biggest opportunity is teaching people what to actually do with your products."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {!isCursor && (
        <section
          id="the-opportunity"
          className="scroll-mt-20 bg-black px-6 py-16 sm:px-10 sm:pb-16 sm:pt-24 lg:px-16"
        >
          <div className="mx-auto max-w-6xl space-y-16">
            <div className="relative max-w-5xl">
              <h2
                className={`${emphasisFontClassName} relative z-10 max-w-4xl text-5xl font-normal leading-none tracking-tight sm:text-8xl`}
              >
                {isCursor
                  ? "Cursor can do far more than most people realize."
                  : "Every few weeks, OpenAI releases something that blows my mind."}
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

            <ReleaseWordMap
              assets={isCursor ? cursorFeatureAssets : undefined}
              fontClassName={emphasisFontClassName}
              ariaLabel={
                isCursor
                  ? "Cursor features and surfaces"
                  : "Recent OpenAI releases"
              }
            />

            <div className="mx-auto max-w-4xl space-y-7 pt-8 text-xl leading-9 text-white/72 sm:pt-12">
              <p>
                {isCursor
                  ? "And all of that power creates one simple problem."
                  : "And every single time, I run into the same problem."}
              </p>
              <p className="text-2xl font-semibold leading-9 text-white">
                {isCursor
                  ? "Few people know what they can actually use it for."
                  : "I only get to make one or two videos."}
              </p>
              <p>
                {isCursor
                  ? "They might know Cursor can write code, but not that it can help them make a study tool, build a portfolio, automate a repeated task, launch a tiny business, or bring a personal idea to life."
                  : "One or two chances to explain dozens of incredible features, possibilities, and ideas."}
              </p>
              <p>
                {isCursor
                  ? "And Cursor keeps expanding across desktop, CLI, cloud agents, web, mobile, automations, Slack, GitHub, MCPs, and more."
                  : "But I know the most memorable posts must have one simple core idea, so people walk away with something to try."}
              </p>
              <p>So I constantly find myself asking:</p>
            </div>

            <div className="mx-auto max-w-5xl py-4 text-center sm:py-6">
              <p className="mx-auto max-w-3xl text-xl leading-9 text-white/68">
                &quot;
                {isCursor
                  ? "What could I build with Cursor that would actually help me?"
                  : "Which possibilities am I leaving out?"}
                &quot;
              </p>
              <p
                className={`${emphasisFontClassName} mx-auto mt-6 max-w-5xl text-4xl font-normal leading-none text-white sm:text-[3.25rem]`}
              >
                {isCursor
                  ? "There are too many useful answers for one campaign sprint."
                  : "There are simply too many good use cases for one video."}
              </p>
            </div>

            {!isCursor && (
              <div className="mx-auto max-w-4xl space-y-7 text-xl leading-9 text-white/72">
                <p>
                  {isCursor
                    ? "The goal is not to list every feature in one video."
                    : "Maybe the goal isn't to fit everything into one video, or even one influencer campaign sprint."}
                </p>
                <p
                  className={`${emphasisFontClassName} py-8 text-4xl font-normal leading-none text-white sm:text-6xl`}
                >
                  The goal is to educate people over time.
                </p>
                <p>
                  Because education is the highest form of product leverage.
                </p>
                <p>
                  <strong>So let's teach people!</strong>
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      <section
        id={isCursor ? undefined : "why-educate"}
        className="scroll-mt-20 bg-black px-6 py-16 sm:px-10 sm:pb-24 sm:pt-16 lg:px-16"
      >
        <div
          className={`mx-auto max-w-5xl ${
            isCursor ? "flex flex-col gap-14" : "space-y-14"
          }`}
        >
          {!isCursor && (
            <>
              <div className="space-y-7">
                <h2
                  className={`${emphasisFontClassName} text-3xl font-normal leading-none tracking-tight sm:text-7xl`}
                >
                  Nobody wakes up thinking,
                </h2>
                <div
                  className="text-2xl leading-tight text-white/86 sm:text-4xl"
                  aria-label={
                    isCursor
                      ? "I really hope I get to use an autonomous coding agent today."
                      : "I really hope I get to use frontier reasoning today."
                  }
                >
                  <p
                    className="begin-chalk-strike begin-chalk-strike-desktop"
                    aria-hidden="true"
                  >
                    <span className="begin-chalk-strike-line">
                      &quot;I really hope I get to use
                    </span>
                    <span className="begin-chalk-strike-line">
                      {isCursor
                        ? 'an autonomous coding agent today."'
                        : 'frontier reasoning today."'}
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
                      {isCursor
                        ? "to use an autonomous"
                        : "to use frontier reasoning"}
                    </span>
                    <span className="begin-chalk-strike-line">
                      {isCursor ? 'coding agent today."' : 'today."'}
                    </span>
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <p className="text-xl leading-9 text-white/72">
                  They wake up thinking,
                </p>
                <TypedQuestionList
                  questions={activeEverydayQuestions}
                  fontClassName={emphasisFontClassName}
                />
              </div>

              <div className="max-w-4xl space-y-7 text-xl leading-9 text-white/72">
                <p className="text-xl leading-9 text-white/72">
                  {isCursor
                    ? "Cursor gives people the power to make things they once thought required a whole engineering team. Now, you can have a dedicated educator who shows them what to build."
                    : ""}
                </p>
                <p
                  className={`${emphasisFontClassName} mx-auto max-w-3xl py-4 text-center text-5xl font-normal leading-none text-white sm:text-7xl`}
                >
                  That's where I come in,
                </p>
                <p className="mx-auto max-w-3xl text-center text-2xl leading-9 text-white/88 sm:text-[2rem] sm:leading-10">
                  {isCursor
                    ? "a dedicated educator who shows Gen Z what they can build with Cursor, one useful project at a time."
                    : "a dedicated educator who teaches people what to do with all OpenAI's brilliant tools."}
                </p>
                <p className="mx-auto max-w-3xl text-center">
                  I will turn your features into relevant lessons{" "}
                  <strong>
                    {isCursor
                      ? "Gen Z will understand, try, and use to build something real."
                      : " Gen Z will understand, try, and come to love."}
                  </strong>
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
            </>
          )}

          <div
            id="why-michelle"
            className={`scroll-mt-20 max-w-4xl space-y-16 text-xl leading-9 text-white/72 ${
              isCursor ? "order-3" : ""
            }`}
          >
            <div className="flex flex-wrap items-end gap-5 sm:flex-nowrap sm:gap-7">
              <h2
                className={`${emphasisFontClassName} text-6xl font-normal leading-none tracking-tight text-white sm:text-8xl`}
              >
                Why Michelle?
              </h2>
              <div
                className="begin-codex-pet-lane"
                role="img"
                aria-label={
                  isCursor
                    ? "Animated Michelle pet running from left to right, waving, and jumping"
                    : "Animated Codex pet running from left to right, waving, and jumping"
                }
              >
                <div className="begin-codex-pet-traveler" aria-hidden="true">
                  <div
                    className={`begin-mia-sprite ${
                      isCursor ? "begin-mia-sprite-michelle" : ""
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`max-w-4xl space-y-14 text-xl leading-9 text-white/72 sm:space-y-20 ${
              isCursor ? "order-3" : ""
            }`}
          >
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
                  className={`${emphasisFontClassName} text-[2rem] leading-none text-white sm:text-5xl`}
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
              <ReelProofRow
                reels={featuredReelSections[0].reels}
                fontClassName={emphasisFontClassName}
              />
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
                  className={`${emphasisFontClassName} text-[2rem] leading-none text-white sm:text-5xl`}
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
              <ReelProofRow
                reels={featuredReelSections[1].reels}
                fontClassName={emphasisFontClassName}
              />
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
                  className={`${emphasisFontClassName} text-[2rem] leading-none text-white sm:text-5xl`}
                >
                  {isCursor
                    ? "I already teach people how to build with AI"
                    : "I've helped people discover OpenAI"}
                </h3>
              </div>
              <p>
                {isCursor
                  ? "My audience already comes to me for approachable coding, vibe-coding, AI-agent, and app-building education. I know the questions new builders ask because they ask me every day."
                  : "I've already partnered with OpenAI, translated product launches into useful creator content, and participated in ChatGPT Futures."}
              </p>
              <p className="text-xl leading-8 text-white sm:text-2xl sm:leading-9">
                {isCursor
                  ? "I understand the difference between showing a flashy demo and teaching a workflow someone will actually try."
                  : "I understand both the products and the audience response that turns a launch into sustained interest."}
              </p>
              <ReelProofRow
                reels={
                  isCursor
                    ? featuredReelSections[2].reels.filter(
                        (reel) => reel.videoSrc,
                      )
                    : featuredReelSections[2].reels
                }
                fontClassName={emphasisFontClassName}
              />
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
                  className={`${emphasisFontClassName} text-[2rem] leading-none text-white sm:text-5xl`}
                >
                  I can sustain the program
                </h3>
              </div>
              <ul className="space-y-4">
                {[
                  "I already publish posts almost every day.",
                  "I have experience translating new launches quickly.",
                  isCursor
                    ? "I have enough project ideas to sustain a full year of useful Cursor how-tos."
                    : "Oh, and I'm five minutes from OpenAI's Mission Bay office. 😉",
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
            className={`scroll-mt-20 max-w-4xl space-y-10 pt-14 text-xl leading-9 text-white/72 ${
              isCursor ? "order-1" : ""
            }`}
          >
            <h2
              className={`${emphasisFontClassName} text-5xl font-normal leading-none tracking-tight text-white sm:text-8xl`}
            >
              {isCursor ? "What I’d Make for Cursor" : "What I’m Proposing"}
            </h2>

            <div className="space-y-7">
              <p className="mx-auto max-w-5xl text-center text-2xl leading-9 sm:text-4xl sm:leading-tight">
                <strong className="text-white">
                  {isCursor
                    ? "A 12-month program showing Gen Z what they can build with Cursor."
                    : "A three-year program to educate Gen Z on ways to use ChatGPT in daily life."}
                </strong>
              </p>
              <p
                className={`${emphasisFontClassName} text-center text-4xl leading-none text-white sm:text-5xl`}
              >
                {isCursor
                  ? "30 practical Cursor how-tos in 12 months."
                  : "100 practical ChatGPT use cases every year."}
              </p>
              {isCursor && (
                <div className="grid gap-5 py-5 sm:grid-cols-3">
                  {[
                    {
                      title: "10 websites & apps",
                      description:
                        "The coding projects my core audience already wants to build.",
                    },
                    {
                      title: "10 unconventional projects",
                      description:
                        "Books, art archives, digital museums, poetry collections, and ideas people would never expect to make with Cursor.",
                    },
                    {
                      title: "10 career accelerators",
                      description:
                        "Tools that help people work smarter, prove their impact, and get ahead in their careers.",
                    },
                  ].map(({ title, description }) => (
                    <div key={title} className="group relative min-h-56 p-7">
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-[url('/begin/generated/chalk-card-border.png')] bg-[length:100%_100%] bg-center bg-no-repeat opacity-65"
                      />
                      <p
                        className={`${emphasisFontClassName} relative z-10 text-4xl leading-none text-white`}
                      >
                        {title}
                      </p>
                      <p className="relative z-10 mt-5 text-base leading-7 text-white/68">
                        {description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <p>
                {isCursor
                  ? "Coding is still the foundation. One third of the series will focus on websites and apps because builders are my primary audience. The other two thirds will show how Cursor can reach much further."
                  : "You're creating more useful features than any single launch campaign can fully explain."}
              </p>
              <p>
                I will help Gen Z understand what your features can do for them
                with one practical use case at a time.
              </p>
              <p>
                {isCursor
                  ? "Together, we can make Cursor feel relevant not only to coders, but also to artists, writers, students, ambitious young professionals, and anyone with an idea they want to bring to life."
                  : "Together, we can create an ongoing educational series that turns new and existing OpenAI capabilities into habit-building, practical how-to videos that people can understand, remember, and try."}
              </p>
            </div>

            <div className="space-y-12">
              <div className="relative left-1/2 w-[min(76rem,calc(100vw-3rem))] -translate-x-1/2 space-y-9 py-6 sm:py-10">
                <div className="space-y-3 text-center">
                  <h3
                    className={`${emphasisFontClassName} text-5xl leading-none text-white sm:text-7xl`}
                  >
                    How will this work?
                  </h3>
                  <p className="text-xl font-semibold text-white/78 sm:text-2xl">
                    Test. Learn. Scale what works.
                  </p>
                </div>

                <div className="grid gap-12 md:grid-cols-3 md:gap-5">
                  {activeTimelineStages.map((stage, stageIndex) => (
                    <article
                      key={stage.title}
                      className="group relative min-w-0 px-2 md:px-7"
                    >
                      {stageIndex > 0 && (
                        <>
                          <Image
                            aria-hidden="true"
                            src="/begin/generated/chalk-timeline-divider.png"
                            alt=""
                            width={18}
                            height={700}
                            className="absolute -left-2.5 top-0 hidden h-full w-2 object-fill opacity-65 md:block"
                          />
                          <Image
                            aria-hidden="true"
                            src="/begin/generated/chalk-timeline-ticks.png"
                            alt=""
                            width={1200}
                            height={220}
                            className="mb-8 h-7 w-full object-fill opacity-70 contrast-125 brightness-125 md:hidden"
                          />
                        </>
                      )}

                      <div className="flex items-center gap-4">
                        <span
                          className={`${emphasisFontClassName} flex h-12 w-12 shrink-0 items-center justify-center bg-[url('/begin/generated/chalk-nav-circle.png')] bg-contain bg-center bg-no-repeat text-2xl leading-none text-white`}
                        >
                          {stage.step}
                        </span>
                        <div
                          aria-hidden="true"
                          className="h-7 min-w-0 flex-1 overflow-hidden"
                        >
                          <Image
                            src="/begin/generated/chalk-timeline-ticks.png"
                            alt=""
                            width={1200}
                            height={220}
                            className={`h-full w-full object-fill opacity-[0.72] contrast-125 brightness-125 transition-opacity duration-300 group-hover:opacity-95 ${
                              stageIndex === 1
                                ? "scale-x-[-1]"
                                : stageIndex === 2
                                  ? "scale-x-[0.97]"
                                  : ""
                            }`}
                          />
                        </div>
                      </div>

                      <h4
                        className={`${emphasisFontClassName} mt-6 text-4xl leading-none text-white sm:text-5xl`}
                      >
                        {stage.title}
                      </h4>
                      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-white/58">
                        {stage.duration}
                      </p>
                      <ul className="mt-5 space-y-3 text-lg leading-7 text-white/68">
                        {stage.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3">
                            <span
                              aria-hidden="true"
                              className="mt-[0.45rem] h-3.5 w-3.5 shrink-0 bg-[url('/begin/generated/chalk-nav-circle.png')] bg-contain bg-center bg-no-repeat opacity-70"
                            />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                <p className="text-2xl font-semibold leading-8 text-white sm:text-3xl sm:leading-10">
                  What this gives you:
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {activeProposalPayoffs.map(
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
                {isCursor
                  ? "Over 12 months, I will turn 30 practical Cursor use cases into education Gen Z can understand, remember, and try."
                  : "Every year, I will turn 100 practical ChatGPT use cases into education Gen Z can understand, remember, and try."}
              </p>
              <p className="text-white">
                {isCursor
                  ? "With me teaching Cursor to Gen Z, more people will understand what Cursor can do, see themselves in the project, try it once, and build the confidence to keep creating."
                  : "With me as your dedicated educator and ambassador to Gen Z, more people will understand what ChatGPT can do, see themselves in the use case, try it once, and build the habit of coming back."}
              </p>
            </div>
          </div>

          <div
            id="chatgpt-videos"
            className={`scroll-mt-20 max-w-5xl pt-14 ${isCursor ? "order-2" : ""}`}
          >
            <h2
              className={`${emphasisFontClassName} text-5xl font-normal leading-none tracking-tight text-white sm:text-8xl`}
            >
              {isCursor
                ? "30 Cursor How-Tos I Could Teach in 12 Months"
                : "100 ChatGPT Use Cases I Could Teach Every Year"}
            </h2>

            <div className="mt-14 space-y-10">
              {activeUseCaseFeatures.map((feature) => (
                <div
                  key={feature.feature}
                  className="grid items-start gap-4 sm:grid-cols-[minmax(10rem,0.7fr)_6rem_minmax(0,1.3fr)] sm:gap-8"
                >
                  <div className="relative h-16 w-full sm:h-24">
                    {feature.featureImage ? (
                      <Image
                        src={feature.featureImage}
                        alt={feature.feature}
                        fill
                        className="object-contain object-left"
                        sizes="(min-width: 1024px) 280px, (min-width: 640px) 34vw, 90vw"
                      />
                    ) : (
                      <p
                        className={`${emphasisFontClassName} text-4xl leading-none text-white sm:text-5xl`}
                      >
                        {feature.feature}
                      </p>
                    )}
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
          </div>

          <div
            id="lets-talk"
            className={`scroll-mt-20 mt-14 space-y-5 text-white sm:mt-20 sm:space-y-6 ${
              isCursor ? "order-4" : ""
            }`}
          >
            <p
              className={`${emphasisFontClassName} text-5xl leading-none sm:text-7xl`}
            >
              {isCursor ? "That's all 30." : "That's the first 12."}
            </p>
            <p className="text-2xl leading-9 text-white/72 sm:text-3xl sm:leading-10">
              {isCursor
                ? "Ready to decide which five we teach first? Let's talk!"
                : "Want to see the next 88? Let's talk!"}
            </p>

            <div className="flex justify-center pt-6 sm:pt-10">
              <a
                href={emailTeamHref}
                className="begin-email-team-button"
                aria-label={`Email Michelle, Patrick, and Teresa about the ${isCursor ? "Cursor" : "OpenAI"} partnership`}
              />
            </div>
          </div>

          <footer
            className={`pt-24 text-center text-base text-white/48 ${
              isCursor ? "order-5" : ""
            }`}
          >
            {isCursor
              ? "This webpage was made with AI—and a lot of human direction 😉"
              : "This webpage was made with Codex 😉"}
          </footer>
        </div>
      </section>
    </main>
  );
}
