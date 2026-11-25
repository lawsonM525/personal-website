import Image from "next/image";
import { ChalkTrail } from "../cursor/chalk-trail";
import { ProposalSectionNav } from "../cursor/proposal-section-nav";

const navSections = [
  { id: "introduction", label: "Why Figma?" },
  { id: "the-proposal", label: "The Proposal" },
  { id: "first-10", label: "The First 10" },
  { id: "why-michelle", label: "Why Michelle?" },
  { id: "lets-talk", label: "Let’s Make It" },
];

const videos = [
  {
    number: "01",
    product: "FigJam",
    title: "My brain is a mess. Let’s make a plan.",
    idea: "Turn a pile of thoughts into a clear plan for a club, class, or personal project.",
    color: "from-[#ff7262]/25 to-[#ff7262]/5",
  },
  {
    number: "02",
    product: "Figma Design",
    title: "Design an app screen for an idea you have.",
    idea: "Start with a real problem and make the first screen of a useful app.",
    color: "from-[#a259ff]/25 to-[#a259ff]/5",
  },
  {
    number: "03",
    product: "Prototyping",
    title: "Make your app idea clickable.",
    idea: "Connect screens into a prototype you can send to a friend and get feedback on.",
    color: "from-[#1abcfe]/25 to-[#1abcfe]/5",
  },
  {
    number: "04",
    product: "Figma Slides",
    title: "Turn your idea into a presentation people remember.",
    idea: "Build an interactive deck for a pitch, class project, or student organization.",
    color: "from-[#0acf83]/25 to-[#0acf83]/5",
  },
  {
    number: "05",
    product: "Figma Sites",
    title: "Make a portfolio site without starting from a blank page.",
    idea: "Give a project, portfolio, or community a home on the web.",
    color: "from-[#f24e1e]/25 to-[#f24e1e]/5",
  },
  {
    number: "06",
    product: "Figma Buzz",
    title: "Make one idea look like a whole campaign.",
    idea: "Adapt a visual identity into social posts and promotional graphics.",
    color: "from-[#ff7262]/25 to-[#ff7262]/5",
  },
  {
    number: "07",
    product: "Figma Make",
    title: "Can a prompt become an app you can try?",
    idea: "Explore an idea as an interactive prototype, then refine it through conversation.",
    color: "from-[#a259ff]/25 to-[#a259ff]/5",
  },
  {
    number: "08",
    product: "Figma AI",
    title: "Use AI to get unstuck on the visual part.",
    idea: "Show where AI tools can help with images, writing, and early creative exploration.",
    color: "from-[#1abcfe]/25 to-[#1abcfe]/5",
  },
  {
    number: "09",
    product: "The whole canvas",
    title: "Plan it, design it, show it to someone.",
    idea: "Follow one student project from the first messy thought to a shareable result.",
    color: "from-[#0acf83]/25 to-[#0acf83]/5",
  },
  {
    number: "10",
    product: "For the idea you keep putting off",
    title: "You don’t have to be a designer to start.",
    idea: "A friendly invitation to make something small, useful, and entirely your own.",
    color: "from-[#f24e1e]/25 to-[#f24e1e]/5",
  },
];

function CanvasPreview({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`figma-canvas relative overflow-hidden rounded-[1.7rem] border border-white/15 bg-[#1d1d1f] shadow-[0_28px_80px_rgba(0,0,0,0.45)] ${className}`}
      aria-label="A playful Figma-inspired canvas with a project idea, sketches, and colorful notes"
      role="img"
    >
      <div className="flex h-11 items-center gap-2 border-b border-white/10 px-4 text-xs text-white/50">
        <span className="h-2.5 w-2.5 rounded-full bg-[#f24e1e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffcd29]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#0acf83]" />
        <span className="ml-3">a tiny idea becoming a real thing.fig</span>
      </div>
      <div className="relative min-h-[20rem] overflow-hidden bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.12)_1px,transparent_0)] [background-size:20px_20px] p-5 sm:min-h-[25rem] sm:p-8">
        <div className="absolute left-[9%] top-[14%] w-[39%] rotate-[-3deg] rounded-xl border border-white/10 bg-[#25252a] p-4 shadow-xl sm:p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
            First, the question
          </p>
          <p className="mt-3 text-sm font-medium leading-5 text-white sm:text-lg sm:leading-7">
            What if our campus felt easier to explore?
          </p>
          <div className="mt-4 flex gap-2">
            <span className="h-2 w-12 rounded-full bg-[#a259ff]" />
            <span className="h-2 w-7 rounded-full bg-[#1abcfe]" />
            <span className="h-2 w-10 rounded-full bg-[#0acf83]" />
          </div>
        </div>
        <div className="absolute right-[8%] top-[19%] grid h-20 w-20 rotate-[5deg] place-items-center rounded-full border border-[#1abcfe]/60 bg-[#1abcfe]/15 text-center text-[10px] font-semibold leading-4 text-[#b2eaff] sm:h-28 sm:w-28 sm:text-xs">
          maps
          <br />
          made by
          <br />
          students
        </div>
        <div className="absolute left-[15%] top-[57%] h-[28%] w-[25%] rotate-[2deg] rounded-lg border border-[#ffcd29]/35 bg-[#ffcd29]/15 p-3 sm:p-4">
          <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#ffe99a] sm:text-[10px]">
            FigJam
          </span>
          <div className="mt-2 space-y-2">
            <div className="h-2 w-4/5 rounded-full bg-white/55" />
            <div className="h-2 w-3/5 rounded-full bg-white/35" />
            <div className="h-2 w-2/3 rounded-full bg-white/35" />
          </div>
        </div>
        <div className="absolute right-[14%] top-[56%] flex h-[31%] w-[31%] rotate-[-2deg] flex-col overflow-hidden rounded-xl border border-white/15 bg-white shadow-2xl">
          <div className="h-2.5 bg-gradient-to-r from-[#f24e1e] via-[#a259ff] to-[#1abcfe]" />
          <div className="flex flex-1 flex-col justify-between p-3 text-[#25252a] sm:p-4">
            <div>
              <div className="h-2 w-1/3 rounded-full bg-[#a259ff]/70" />
              <p className="mt-2 text-[10px] font-semibold leading-4 sm:text-sm sm:leading-5">
                The campus map
                <br />
                people actually use.
              </p>
            </div>
            <div className="flex items-end gap-1.5">
              <span className="h-5 w-5 rounded-t-full bg-[#ff7262]" />
              <span className="h-8 w-5 rounded-t-full bg-[#0acf83]" />
              <span className="h-6 w-5 rounded-t-full bg-[#1abcfe]" />
              <span className="ml-auto rounded-full bg-[#25252a] px-2 py-1 text-[8px] font-semibold text-white sm:text-[9px]">
                prototype →
              </span>
            </div>
          </div>
        </div>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-80"
          viewBox="0 0 600 400"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M270 128 C355 100 395 106 450 130 M255 215 C300 265 360 280 420 270"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="6 8"
            strokeLinecap="round"
          />
          <path
            d="m438 122 12 8-13 5 M409 261l12 9-14 4"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="absolute bottom-3 left-4 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45 sm:bottom-5 sm:left-6 sm:text-[10px]">
          one idea · many ways to make it real
        </p>
      </div>
    </div>
  );
}

export default function FigmaProposalPage({
  emphasisFontClassName,
}: {
  emphasisFontClassName: string;
}) {
  const emailHref = `mailto:michelle@thedriveagency.co,patrick@thedriveagency.co,teresa@thedriveagency.co?subject=${encodeURIComponent(
    "Figma × Michelle — Make the Idea Real",
  )}&body=${encodeURIComponent(
    "Hi Michelle, Patrick, and Teresa,\n\nI’d love to talk about the Figma creator education proposal and a first series of practical videos for Gen Z.\n\nWhat would be the best next step?\n\nBest,",
  )}`;

  return (
    <main
      className="figma-pitch min-h-screen bg-black pt-16 text-white"
      style={{ cursor: "url('/begin/chalk-cursor.png') 12 12, auto" }}
    >
      <ChalkTrail />
      <ProposalSectionNav
        fontClassName={emphasisFontClassName}
        sections={navSections}
      />
      <style>{`
        .figma-pitch ::selection { background: #a259ff; color: white; }
        .figma-pitch .chalk-card {
          background-image: url('/begin/generated/chalk-card-border.png');
          background-position: center;
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
        .figma-pitch .figma-color-bar {
          background: linear-gradient(90deg,#f24e1e 0 20%,#ff7262 20% 40%,#a259ff 40% 60%,#1abcfe 60% 80%,#0acf83 80%);
        }
        .figma-pitch .figma-glow { box-shadow: 0 0 40px rgba(162,89,255,.16), 0 0 90px rgba(26,188,254,.08); }
        @media (prefers-reduced-motion: reduce) {
          .figma-pitch *, .figma-pitch *::before, .figma-pitch *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
        }
      `}</style>

      <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden bg-black px-6 py-16 sm:px-10 lg:px-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <span className="absolute -right-32 top-16 h-96 w-96 rounded-full bg-[#a259ff]/10 blur-[100px]" />
          <span className="absolute -left-28 bottom-0 h-72 w-72 rounded-full bg-[#1abcfe]/[0.08] blur-[90px]" />
          <span className="figma-color-bar absolute inset-x-0 top-0 h-1 opacity-80" />
        </div>
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
          <div className="max-w-3xl">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-white/55 sm:text-sm">
              A creator education proposal · Figma × Michelle Lawson
            </p>
            <h1 className={`${emphasisFontClassName} text-[4.25rem] font-normal leading-[0.88] sm:text-8xl lg:text-[7.7rem]`}>
              Make the
              <br />
              <span className="text-[#c8a4ff]">idea real.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72 sm:text-2xl sm:leading-10">
              A practical, playful video series showing Gen Z how to turn a
              thought into something they can design, test, present, or share.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-white/75 sm:text-base">
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#a259ff]" />Ideas welcome</span>
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#1abcfe]" />No design degree required</span>
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#0acf83]" />Made for real life</span>
            </div>
            <a
              href="#the-proposal"
              className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/70 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              See the idea
            </a>
          </div>
          <div className="relative mx-auto w-full max-w-2xl lg:ml-auto">
            <CanvasPreview className="figma-glow rotate-[1deg]" />
            <div className="chalk-card absolute -bottom-8 left-1/2 w-[78%] -translate-x-1/2 px-6 py-5 text-center sm:w-[65%]">
              <p className={`${emphasisFontClassName} text-3xl leading-none sm:text-4xl`}>
                From “what if…” to “look what I made.”
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="introduction" className="scroll-mt-20 bg-black px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[.76fr_1.24fr] lg:gap-20">
          <div className="relative mx-auto w-full max-w-[22rem] lg:sticky lg:top-24 lg:max-w-none lg:self-start">
            <div className="aspect-[4/5] overflow-hidden" style={{ WebkitMaskImage: "url('/begin/michelle-blob-mask.svg')", maskImage: "url('/begin/michelle-blob-mask.svg')", WebkitMaskPosition: "center", maskPosition: "center", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskSize: "100% 100%", maskSize: "100% 100%" }}>
              <Image
                src="/begin/michelle-photos/app-idea-bench.jpeg"
                alt="Michelle working on an app idea"
                width={900}
                height={1125}
                className="h-full w-full object-cover"
                sizes="(min-width: 1024px) 400px, 80vw"
              />
            </div>
            <span aria-hidden="true" className="absolute -right-5 -top-5 rounded-full border border-[#a259ff]/60 bg-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#d3b8ff]">make something</span>
          </div>
          <div className="space-y-10">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#c8a4ff]">Why this matters</p>
              <h2 className={`${emphasisFontClassName} max-w-3xl text-6xl leading-[0.94] sm:text-8xl`}>
                People have ideas.
                <br />
                Starting is the hard part.
              </h2>
            </div>
            <div className="space-y-6 text-lg leading-8 text-white/72 sm:text-xl sm:leading-9">
              <p>
                Someone wants to make an app for their student group, put a
                portfolio online, or explain a big idea in a presentation. They
                don’t call themselves designers. They just want to make the
                thing they can already picture.
              </p>
              <p>
                Figma gives them a place to explore that idea—from a FigJam
                board, to a designed screen, to a prototype or something ready
                to share. AI can make the first step feel even more possible.
                The opportunity is to show people, one useful project at a time.
              </p>
              <p className="text-white">
                I teach technology by starting with a question people already
                care about, then helping them make something real. I’d love to
                bring that approach to Figma.
              </p>
            </div>
            <div className="chalk-card relative grid gap-5 px-7 py-8 sm:grid-cols-3 sm:px-9">
              {[
                ["Start anywhere", "A rough idea is enough."],
                ["Make it visible", "See the next step on canvas."],
                ["Share it proudly", "Show someone what you made."],
              ].map(([title, description]) => (
                <div key={title}>
                  <p className={`${emphasisFontClassName} text-3xl leading-none sm:text-4xl`}>{title}</p>
                  <p className="mt-2 text-sm leading-6 text-white/62">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="the-proposal" className="scroll-mt-20 bg-[#111113] px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#c8a4ff]">What I’m proposing</p>
            <h2 className={`${emphasisFontClassName} text-6xl leading-[0.94] sm:text-8xl`}>
              A 30-video series.
              <br />
              <span className="text-[#c8a4ff]">Start with 10.</span>
            </h2>
            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/70 sm:text-2xl sm:leading-10">
              Short, useful stories that help Gen Z move from a blank canvas to
              a project they can use, show, or share. We’ll make the first 10,
              learn what resonates, and build from there.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              { number: "01", title: "Show the possibility", body: "Start with a familiar need and a specific thing someone wants to make." },
              { number: "02", title: "Make it together", body: "Walk through the idea in Figma, with the real decisions and discoveries left in." },
              { number: "03", title: "Give them a first step", body: "End with a result viewers can imagine making—and a clear way to try it." },
            ].map((step) => (
              <article key={step.number} className="group relative min-h-64 p-7 sm:p-9">
                <span aria-hidden="true" className="chalk-card absolute inset-0 opacity-60 transition-opacity group-hover:opacity-95" />
                <div className="relative">
                  <p className={`${emphasisFontClassName} text-4xl text-[#c8a4ff]`}>{step.number}</p>
                  <h3 className={`${emphasisFontClassName} mt-5 text-4xl leading-none sm:text-5xl`}>{step.title}</h3>
                  <p className="mt-4 text-base leading-7 text-white/68">{step.body}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm font-semibold uppercase tracking-[0.14em] text-white/55">
            <span>Instagram</span><span aria-hidden="true" className="text-[#a259ff]">×</span>
            <span>TikTok</span><span aria-hidden="true" className="text-[#a259ff]">×</span>
            <span>YouTube Shorts</span>
            <span className="mx-2 hidden h-5 w-px bg-white/20 sm:block" />
            <span className="basis-full text-center text-xs font-medium normal-case tracking-normal text-white/42 sm:basis-auto">One original idea, shaped for each platform.</span>
          </div>
        </div>
      </section>

      <section id="first-10" className="scroll-mt-20 bg-black px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#c8a4ff]">The first 10</p>
              <h2 className={`${emphasisFontClassName} text-6xl leading-[0.94] sm:text-8xl`}>A few ideas<br />to get us started.</h2>
            </div>
            <p className="max-w-md text-base leading-7 text-white/60 sm:text-lg sm:leading-8">
              The series can travel across Figma’s creative world, while every
              episode stays grounded in a project someone actually wants to make.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <article key={video.number} className="group relative min-h-[17rem] overflow-hidden rounded-2xl border border-white/10 bg-[#111113] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/25 sm:p-7">
                <div aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${video.color}`} />
                <div className={`absolute -right-10 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${video.color} blur-2xl transition-transform duration-500 group-hover:scale-125`} />
                <div className="relative flex h-full min-h-[14rem] flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <span className={`${emphasisFontClassName} text-3xl text-white/65`}>{video.number}</span>
                    <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/62">{video.product}</span>
                  </div>
                  <h3 className={`${emphasisFontClassName} mt-7 text-3xl leading-[1.03] sm:text-4xl`}>{video.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/57">{video.idea}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="why-michelle" className="scroll-mt-20 bg-[#17131d] px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_.9fr] lg:gap-20">
          <div className="space-y-8">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#c8a4ff]">Why Michelle</p>
              <h2 className={`${emphasisFontClassName} text-6xl leading-[0.94] sm:text-8xl`}>I teach people<br />to make things.</h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
              <p>
                I’m a computer scientist and educator who loves helping people
                see themselves as builders. My work connects technology to
                everyday ambition: an app someone wishes existed, a project
                they’re proud to show, a creative idea they didn’t know how to
                start.
              </p>
              <p>
                That perspective lets me talk about Figma as more than a design
                tool. It can be where a student organizes a thought, where a
                creator shapes a visual, where a team tests an idea, and where
                a first-time maker discovers they can do this.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["The learner", "I explain the steps in plain language."],
                ["The builder", "I make real projects, not abstract demos."],
                ["The storyteller", "I make the process feel possible."],
              ].map(([title, text]) => (
                <div key={title} className="border-l border-[#a259ff]/70 pl-4">
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-white/55">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/15 bg-[#222027]">
              <Image
                src="/begin/michelle-photos/chalkboard-teaching-wide.jpeg"
                alt="Michelle teaching at a chalkboard"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 540px, 90vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-6 pt-24 sm:p-8 sm:pt-28">
                <p className={`${emphasisFontClassName} max-w-sm text-4xl leading-none sm:text-5xl`}>
                  “I thought I couldn’t make that.”
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/65">The feeling I want every viewer to leave with</p>
              </div>
            </div>
            <span aria-hidden="true" className="absolute -bottom-6 -right-3 h-20 w-20 rounded-full border border-[#0acf83]/60 bg-[#0acf83]/10 blur-[1px] sm:-right-7 sm:h-28 sm:w-28" />
          </div>
        </div>
      </section>

      <section id="lets-talk" className="scroll-mt-20 relative overflow-hidden bg-black px-6 py-24 sm:px-10 sm:py-36 lg:px-16">
        <div aria-hidden="true" className="figma-color-bar absolute inset-x-0 top-0 h-1 opacity-80" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#c8a4ff]">A first step</p>
          <h2 className={`${emphasisFontClassName} text-6xl leading-[0.94] sm:text-8xl lg:text-9xl`}>
            Let’s help more people
            <br />
            make the idea real.
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/68 sm:text-xl sm:leading-9">
            We can start with 10 practical videos, share them across Instagram,
            TikTok, and YouTube Shorts, then build on what viewers are excited
            to try.
          </p>
          <a
            href={emailHref}
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-base font-semibold text-black transition hover:bg-[#e9dcff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black"
          >
            Let’s talk about Figma
          </a>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/45">
            <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="font-bold text-[#0acf83]">✓</span>Real use cases</span>
            <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="font-bold text-[#0acf83]">✓</span>Creator-led teaching</span>
            <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="font-bold text-[#0acf83]">✓</span>A series built to grow</span>
          </div>
        </div>
      </section>
    </main>
  );
}
