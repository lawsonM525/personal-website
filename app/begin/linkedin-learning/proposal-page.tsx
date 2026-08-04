import Image from "next/image";
import { ChalkTrail } from "../cursor/chalk-trail";
import { PlayableReelCard } from "../cursor/playable-reel-card";
import { ProposalSectionNav } from "../cursor/proposal-section-nav";
import type { FeaturedReel } from "../cursor/reels";

const navSections = [
  { id: "introduction", label: "Why Me" },
  { id: "course", label: "What I’m Proposing" },
  { id: "samples", label: "Proof I Can Deliver" },
];

const platformMetrics = [
  { value: "11.2K", label: "LinkedIn followers" },
  { value: "185K", label: "Instagram followers" },
  { value: "250K+", label: "followers across platforms" },
];

const educationalReels: FeaturedReel[] = [
  {
    title: "How to vibe code properly",
    instagramUrl: "https://www.instagram.com/reel/DSm0pFcFXkc/",
    videoSrc: "/begin/reels/how-to-vibe-code-properly.mp4",
    posterSrc: "/begin/reels/posters/how-to-vibe-code-properly.jpg",
    views: "484K",
    likes: "26K",
    saves: "30.6K",
  },
  {
    title: "Build a predictive model for the NFL",
    instagramUrl: "https://www.instagram.com/reel/DRc05k3Epk3/",
    videoSrc: "/begin/reels/nfl-predictive-model.mp4",
    posterSrc: "/begin/reels/posters/nfl-predictive-model.jpg",
    views: "415K",
    likes: "25K",
    saves: "10.4K",
  },
  {
    title: "How to land an internship",
    instagramUrl: "https://www.instagram.com/reel/DYjTwGlPmxY/",
    videoSrc: "/begin/reels/how-to-land-an-internship.mp4",
    posterSrc: "/begin/reels/posters/how-to-land-an-internship.jpg",
    views: "103K",
    likes: "3.3K",
    saves: "5K",
  },
  {
    title: "What is harness engineering?",
    instagramUrl: "https://www.instagram.com/reel/DWC_I1IDURZ/",
    videoSrc: "/begin/reels/what-is-harness-engineering.mp4",
    posterSrc: "/begin/reels/posters/what-is-harness-engineering.jpg",
    views: "83K",
    likes: "4.7K",
    saves: "4K",
  },
];

const featuredLinkedInPosts = [
  {
    title: "I published a paper on teaching computer science and STEM well",
    href: "https://lnkd.in/p/gpD4WnA3",
  },
  {
    title: "My takeaways from OpenAI DevDay",
    href: "https://lnkd.in/p/gHBjw4eR",
  },
  {
    title: "How I built a machine-learning model for the NFL",
    href: "https://www.linkedin.com/posts/michelle-o-lawson_computerscience-aiml-machinelearning-activity-7398812749281169408-64vX?utm_source=share&utm_medium=member_desktop&rcm=ACoAADZp5TQBWJIIpU5_eWoT3dfLZFH4YAX1wJ4",
  },
  {
    title: "How a machine-learning concept can help you grow in life",
    href: "https://www.linkedin.com/posts/michelle-o-lawson_this-machine-learning-concept-will-help-you-activity-7327720467534921729-fAdv?utm_source=share&utm_medium=member_desktop&rcm=ACoAADZp5TQBWJIIpU5_eWoT3dfLZFH4YAX1wJ4",
  },
  {
    title: "How I built an AI app that helps people find their dream career",
    detail: "1,000+ users on its first day",
    href: "https://www.linkedin.com/posts/michelle-o-lawson_ai-machinelearning-retrievalaugmentedgeneration-activity-7309974423774674944-jfcO?utm_source=share&utm_medium=member_desktop&rcm=ACoAADZp5TQBWJIIpU5_eWoT3dfLZFH4YAX1wJ4",
  },
];

const credentials = [
  {
    title: "AI engineer and educator",
    description:
      "I build AI tools and teach people how to use them in clear, practical ways.",
    href: "https://www.linkedin.com/in/michelle-o-lawson/",
    linkLabel: "LinkedIn profile",
  },
  {
    title: "ChatGPT Futures, Class of 2026",
    description:
      "OpenAI recognized me as a trailblazer making AI more accessible for Gen Z.",
    href: "https://www.linkedin.com/posts/michelle-o-lawson_chatgptfutures-activity-7457924442178936832-rMki",
    linkLabel: "Read the announcement",
  },
  {
    title: "Founder, Computer Science Girlies",
    description:
      "I built a global community and free resources that support more than 16,000 women in technology.",
    href: "https://www.linkedin.com/company/computer-science-girlies/",
    linkLabel: "View the community",
  },
  {
    title: "Teacher, creator, and builder",
    description:
      "My videos about AI, coding, careers, and building useful tools have earned millions of views.",
    href: "https://www.instagram.com/michellescomputer/",
    linkLabel: "View @michellescomputer",
  },
];

const courseModules = [
  {
    number: "01",
    title: "Know Thyself",
    promise:
      "I’ll give learners a system of prompts that uses their past, present, and future to help them understand who they are and what they want.",
    lessons: [
      "Look across past jobs, projects, customers, and experiences to find strengths, weaknesses, and patterns.",
      "Figure out what they enjoy, what people would pay them for, and the future they actually want.",
      "Use my Future Self system in ChatGPT and leave with every prompt needed to repeat the process.",
    ],
    icon: "/begin/linkedin-learning/module-icons/know-thyself-simple.png",
  },
  {
    number: "02",
    title: "Build Your Evidence Bank",
    promise:
      "Learners will turn their résumés, voice notes, feedback, and old projects into a living record of their best work.",
    lessons: [
      "Give ChatGPT or Claude existing career material and pull out achievements, stories, skills, and proof.",
      "Build a growing document they can use to choose the right story for every job application.",
      "Turn those experiences into STAR stories and practice telling them with AI voice mode.",
    ],
    icon: "/begin/linkedin-learning/module-icons/evidence-bank-simple.png",
  },
  {
    number: "03",
    title: "Explore Career Directions",
    promise:
      "Learners will combine what they know about themselves with real career research instead of asking AI to choose their future for them.",
    lessons: [
      "Bring their Know Thyself work and results from strengths or personality assessments into ChatGPT.",
      "Use AI to surface possible careers, then research what those careers are actually like.",
      "Find and follow people on LinkedIn who already have those careers and learn from how they got there.",
    ],
    icon: "/begin/linkedin-learning/module-icons/career-directions-simple.png",
  },
  {
    number: "04",
    title: "Reverse Engineer Your Dream Career",
    promise:
      "Once learners choose a direction, I’ll show them how to start with the destination and work backward.",
    lessons: [
      "Study real job descriptions and people who already have the role they want.",
      "Use AI to map the experience, proof, skills, and relationships the role requires.",
      "Turn the gaps into a clear sequence of projects, learning, outreach, and next steps.",
    ],
    icon: "/begin/linkedin-learning/module-icons/career-setup-simple.png",
  },
  {
    number: "05",
    title: "Use My Five-Step Dream Job Framework",
    promise:
      "I’ll teach the five-part framework I use to turn a career goal into proof, visibility, and a strong interview.",
    lessons: [
      "1. Get experience",
      "2. Showcase your experience",
      "3. Share your experience",
      "4. Prepare for technical interviews",
      "5. Prepare for nontechnical interviews",
    ],
    icon: "/begin/linkedin-learning/module-icons/skills-learning-simple.png",
  },
  {
    number: "06",
    title: "Find & Evaluate Opportunities",
    promise:
      "Learners will use LinkedIn and AI to find roles that fit, understand what each one requires, and keep their search organized.",
    lessons: [
      "Search for opportunities on LinkedIn and compare them with the career criteria they made in chapter one.",
      "Build an AI-assisted tracker for roles, contacts, deadlines, applications, and follow-ups.",
      "Use the Evidence Bank to tailor each application truthfully and highlight the most relevant work.",
    ],
    icon: "/begin/linkedin-learning/module-icons/opportunities-simple.png",
  },
  {
    number: "07",
    title: "Build Professional Relationships",
    promise:
      "Networking is often the best way to find opportunities, so I’ll show learners how to do it without sounding fake or forced.",
    lessons: [
      "Find people on LinkedIn who are worth learning from and understand their work before reaching out.",
      "Use AI to improve LinkedIn messages and emails while keeping them specific, personal, and human.",
      "Prepare for conversations, take useful notes, follow up, and build relationships over time.",
    ],
    icon: "/begin/linkedin-learning/module-icons/relationships-handshake-simple.png",
  },
  {
    number: "08",
    title: "Do Your Job Faster with AI",
    promise:
      "Once learners have the job, I’ll show them how to work faster with AI without lowering the quality of their work.",
    lessons: [
      "Choose the right AI tools for research, writing, meetings, spreadsheets, planning, and repetitive work.",
      "Check AI output for accuracy and improve it instead of trusting the first answer.",
      "Build workflows that make them more productive while helping them keep learning on the job.",
    ],
    icon: "/begin/linkedin-learning/module-icons/work-faster-simple.png",
  },
  {
    number: "09",
    title: "Build an AI Career Agent That Grows with You",
    promise:
      "The final chapter ties everything together in one ongoing system that becomes more useful as learners grow.",
    lessons: [
      "Give an agent such as Hermes their goals, Evidence Bank, career plan, current work, and preferences.",
      "Keep its memory current with new achievements, lessons, relationships, and changing goals.",
      "Use the agent to spot next steps, improve their work, maintain relationships, and decide what to share on LinkedIn.",
    ],
    icon: "/begin/linkedin-learning/module-icons/ai-tools-simple.png",
  },
];

const sampleVideos: FeaturedReel[] = [
  {
    title: "How to vibe code properly",
    instagramUrl: "https://www.instagram.com/reel/DSm0pFcFXkc/",
    videoSrc: "/begin/reels/how-to-vibe-code-properly.mp4",
    posterSrc: "/begin/reels/posters/how-to-vibe-code-properly.jpg",
    likes: "26K",
    views: "484K",
    saves: "30.6K",
  },
  {
    title: "How to land an internship",
    instagramUrl: "https://www.instagram.com/reel/DYjTwGlPmxY/",
    videoSrc: "/begin/reels/how-to-land-an-internship.mp4",
    posterSrc: "/begin/reels/posters/how-to-land-an-internship.jpg",
    likes: "3.3K",
    views: "103K",
    saves: "5K",
  },
  {
    title: "Build a predictive model for the NFL",
    instagramUrl: "https://www.instagram.com/reel/DRc05k3Epk3/",
    videoSrc: "/begin/reels/nfl-predictive-model.mp4",
    posterSrc: "/begin/reels/posters/nfl-predictive-model.jpg",
    likes: "25K",
    views: "415K",
    saves: "10.4K",
  },
];

function ChalkCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`group relative ${className}`}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/begin/generated/chalk-card-border.png')] bg-[length:100%_100%] bg-center bg-no-repeat opacity-60 transition duration-300 group-hover:scale-[1.008] group-hover:opacity-90"
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

function SectionLabel({
  children,
  fontClassName,
}: {
  children: React.ReactNode;
  fontClassName: string;
}) {
  return (
    <p
      className={`${fontClassName} text-2xl tracking-wide text-[#70b5f9] sm:text-3xl`}
    >
      {children}
    </p>
  );
}

function SocialMark({ platform }: { platform: "linkedin" | "instagram" | "tiktok" }) {
  if (platform === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.9" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.9" />
        <circle cx="17.6" cy="6.6" r="1.15" fill="currentColor" />
      </svg>
    );
  }

  if (platform === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
        <path
          d="M14.25 3.25v10.1a4.15 4.15 0 1 1-3.4-4.08v2.75a1.65 1.65 0 1 0 1.05 1.54V3.25h2.35Zm0 0c.45 2.2 1.8 3.63 4.15 4.05v2.55a7.02 7.02 0 0 1-4.15-1.62"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7">
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="7.7" cy="8.1" r="1.25" fill="currentColor" />
      <path d="M7.7 11v6.1M11.1 17.1V11m0 2.65c.75-1.75 4.95-2.05 4.95 1.35v2.1" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export default function LinkedInLearningProposal({
  emphasisFontClassName,
}: {
  emphasisFontClassName: string;
}) {
  const emailTeamHref = `mailto:jacqueline@thedriveagency.co?cc=${encodeURIComponent(
    "patrick@thedriveagency.co,michelle@thedriveagency.co,teresa@thedriveagency.co",
  )}&subject=${encodeURIComponent(
    "LinkedIn Learning Course Pitch — Build an AI System for Your Career",
  )}&body=${encodeURIComponent(
    "Hi Jacqueline, Patrick, Michelle, and Teresa,\n\nI'd like to discuss Michelle's LinkedIn Learning course pitch and the next steps.",
  )}`;

  return (
    <main
      className="linkedin-learning-pitch bg-black pt-16 text-white"
      style={{ cursor: "url('/begin/chalk-cursor.png') 12 12, auto" }}
    >
      <ChalkTrail />
      <ProposalSectionNav
        fontClassName={emphasisFontClassName}
        sections={navSections}
      />
      <style>
        {`
          html { scroll-behavior: smooth; }
          @keyframes linkedin-arrow-bounce {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(12px); }
          }
          @keyframes linkedin-drift {
            0%, 100% { transform: rotate(-2deg) translateY(0); }
            50% { transform: rotate(1deg) translateY(-8px); }
          }
          .linkedin-learning-pitch ::selection {
            background: #0a66c2;
            color: white;
          }
          .linkedin-blue-glow {
            background: #000;
          }
          .linkedin-grid {
            background-image:
              linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
            background-size: 48px 48px;
            mask-image: linear-gradient(to bottom, transparent, black 16%, black 84%, transparent);
          }
          .linkedin-email-team-button {
            display: block;
            width: min(100%, 58rem);
            aspect-ratio: 3 / 1;
            background-image: url('/begin/generated/email-team-chalk-bevel-erased.png');
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
            filter: drop-shadow(0 12px 22px rgba(0,0,0,.4));
            transform: rotate(-.35deg);
            transition: transform 180ms ease, filter 180ms ease;
          }
          .linkedin-email-team-button:hover {
            transform: rotate(0deg) translateY(-3px) scale(1.012);
            filter: drop-shadow(0 16px 28px rgba(0,0,0,.55)) brightness(1.08);
          }
          .linkedin-email-team-button:focus-visible {
            outline: 3px solid white;
            outline-offset: 7px;
          }
          @media (prefers-reduced-motion: reduce) {
            html { scroll-behavior: auto; }
            .linkedin-hero-mark { animation: none !important; }
            .linkedin-down-arrow { animation: none !important; }
          }
        `}
      </style>

      <section className="linkedin-blue-glow relative min-h-[calc(100vh-4rem)] px-6 py-12 sm:px-10 lg:px-16">
        <div className="linkedin-grid pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative mx-auto flex min-h-[calc(100vh-10rem)] max-w-6xl flex-col items-center justify-center pb-24 text-center">
          <div
            className={`${emphasisFontClassName} linkedin-hero-mark mb-8 grid h-20 w-20 place-items-center rounded-lg bg-[#0a66c2] text-6xl leading-none shadow-[0_0_45px_rgba(10,102,194,.45)] sm:h-24 sm:w-24 sm:text-7xl`}
            style={{ animation: "linkedin-drift 5s ease-in-out infinite" }}
            aria-hidden="true"
          >
            in
          </div>
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.22em] text-[#70b5f9] sm:text-base">
            A LinkedIn Learning course proposal
          </p>
          <h1
            className={`${emphasisFontClassName} max-w-6xl text-5xl font-normal leading-[0.92] sm:text-7xl lg:text-[6.5rem]`}
          >
            Build an AI System for Your Career
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/72 sm:text-2xl sm:leading-9">
            I want to teach people how to use AI to build a better career. My
            proposed course gives learners practical tools to understand
            themselves, choose what comes next in life, and do better work.
          </p>
          <a
            href="#course-outline"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:-translate-y-0.5 hover:bg-[#dceeff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70b5f9]"
          >
            See the course I&apos;m proposing
          </a>
        </div>
        <Image
          src="/begin/chalk-down-arrow.png"
          alt=""
          width={160}
          height={160}
          aria-hidden="true"
          className="linkedin-down-arrow absolute bottom-0 left-1/2 h-24 w-24 -translate-x-1/2 opacity-80 sm:h-36 sm:w-36"
          style={{ animation: "linkedin-arrow-bounce 1.7s ease-in-out infinite" }}
        />
      </section>

      <section
        id="introduction"
        className="scroll-mt-20 px-6 py-20 sm:px-10 sm:py-28 lg:px-16"
      >
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-20">
          <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-md lg:sticky lg:top-24 lg:max-w-none lg:self-start">
            <div className="relative">
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
                  alt="Michelle Lawson"
                  width={768}
                  height={1024}
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 390px, calc(100vw - 48px)"
                  priority
                />
              </div>
              <Image
                src="/begin/chalk-heart.png"
                alt=""
                width={180}
                height={180}
                aria-hidden="true"
                className="absolute -bottom-8 -right-5 w-24 rotate-12 opacity-75"
              />
            </div>
            <div className="mt-7 flex items-center justify-center gap-3" aria-label="Michelle's social profiles">
              {[
                { platform: "linkedin" as const, label: "LinkedIn", href: "https://www.linkedin.com/in/michelle-o-lawson/" },
                { platform: "instagram" as const, label: "Instagram", href: "https://www.instagram.com/michellescomputer/" },
                { platform: "tiktok" as const, label: "TikTok", href: "https://www.tiktok.com/@michellexcomputer" },
              ].map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit Michelle on ${social.label}`}
                  title={social.label}
                  className="group/social grid h-14 w-14 place-items-center text-white/82 transition hover:-translate-y-1 hover:text-[#70b5f9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70b5f9]"
                >
                  <SocialMark platform={social.platform} />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <SectionLabel fontClassName={emphasisFontClassName}>
                01 — Who I am
              </SectionLabel>
              <h2
                className={`${emphasisFontClassName} mt-3 text-6xl leading-none sm:text-8xl`}
              >
                Hi, I&apos;m Michelle.
              </h2>
            </div>
            <div className="space-y-6 text-xl leading-9 text-white/72">
              <p className="text-2xl leading-10 text-white sm:text-3xl sm:leading-[1.35]">
                I teach Gen Z how to use computer science and AI to gain agency,
                turn their ideas into reality, and create more possibilities for
                themselves.
              </p>
              <p>
                My work combines AI, education, careers, and hands-on building.
                I make technical ideas clear and useful, even for people who do
                not see themselves as technical.
              </p>
              <p>
                I bring <strong className="text-white">4+ years</strong> of
                hands-on experience creating technical lessons, career tools,
                learning resources, and AI workflows for students and
                early-career professionals.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {credentials.map((credential) => (
                <a
                  key={credential.title}
                  href={credential.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group p-2 transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70b5f9]"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {credential.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/62">
                    {credential.description}
                  </p>
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-[#70b5f9]">
                    {credential.linkLabel}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          id="course"
          className="mx-auto mt-24 max-w-6xl scroll-mt-20 sm:mt-32"
        >
          <SectionLabel fontClassName={emphasisFontClassName}>
            What I want to teach
          </SectionLabel>
          <h2
            className={`${emphasisFontClassName} mt-4 max-w-5xl text-5xl leading-[0.95] sm:text-7xl`}
          >
            I want to help people build an AI system for their own career.
          </h2>
          <div className="mt-8 grid gap-6 text-xl leading-9 text-white/72 lg:grid-cols-2 lg:gap-14">
            <p>
              I&apos;m an AI engineer. I spent my education and early career
              building AI tools, and I regularly show my audience how to set up
              tools and systems that help them learn, grow, and move forward.
            </p>
            <p>
              For LinkedIn Learning, I want to teach people how to build a
              practical AI system for their career—one that helps them make
              better decisions, learn useful skills, find opportunities, and
              create more economic opportunity for themselves.
            </p>
          </div>

          <div
            id="teaching-proof"
            className="relative left-1/2 mt-16 min-h-[26rem] w-[min(76rem,calc(100vw-3rem))] -translate-x-1/2 scroll-mt-20 overflow-hidden sm:mt-20 sm:min-h-[36rem]"
          >
            <Image
              src="/begin/michelle-photos/michelle-speaking-pink-scarf.jpeg"
              alt="Michelle Lawson speaking into a microphone while teaching"
              fill
              className="object-cover object-[62%_center] sm:object-center"
              sizes="(min-width: 1280px) 1216px, calc(100vw - 48px)"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex items-center px-7 sm:px-14 lg:px-20">
              <p
                className={`${emphasisFontClassName} max-w-[11ch] text-5xl leading-none text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.8)] sm:text-7xl`}
              >
                I build AI tools—and teach people how to use them.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="platform"
        className="scroll-mt-20 bg-black px-6 py-20 sm:px-10 sm:py-28 lg:px-16"
      >
        <div className="mx-auto max-w-6xl space-y-16">
          <div className="max-w-4xl">
            <SectionLabel fontClassName={emphasisFontClassName}>
              02 — Audience and reach
            </SectionLabel>
            <h2
              className={`${emphasisFontClassName} mt-3 text-6xl leading-none sm:text-8xl`}
            >
              Educational content people watch and use.
            </h2>
            <p className="mt-7 max-w-3xl text-xl leading-9 text-white/70">
              Across LinkedIn, Instagram, and TikTok, I create educational
              content for students, early-career professionals, builders, and
              nontechnical people. I publish daily across platforms and about
              once a week on LinkedIn, covering AI, coding, career growth,
              learning, and building useful projects.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {platformMetrics.map((metric) => (
              <ChalkCard key={metric.label} className="min-h-48 p-6 sm:p-8">
                <p
                  className={`${emphasisFontClassName} text-5xl leading-none text-white sm:text-6xl`}
                >
                  {metric.value}
                </p>
                <p className="mt-4 text-base leading-6 text-white/62">
                  {metric.label}
                </p>
              </ChalkCard>
            ))}
          </div>

          <div>
            <div className="mb-7">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#70b5f9]">
                  Selected educational reels
                </p>
                <h3
                  className={`${emphasisFontClassName} mt-2 text-5xl leading-none`}
                >
                  Lessons people save and share
                </h3>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {educationalReels.map((reel) => (
                <article key={reel.title} className="min-w-0">
                  <div className="group relative aspect-[9/16] w-full overflow-hidden rounded-[1.35rem] bg-zinc-950 shadow-[0_18px_50px_rgba(0,0,0,0.45)]">
                    <PlayableReelCard reel={reel} />
                  </div>
                  <h4 className="mt-4 text-base font-semibold leading-6 text-white">
                    {reel.title}
                  </h4>
                  <p className="mt-1.5 text-xs font-semibold uppercase leading-5 tracking-[0.08em] text-white/58">
                    {[
                      reel.views && `${reel.views} views`,
                      reel.likes && `${reel.likes} likes`,
                      reel.saves && `${reel.saves} saves`,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#70b5f9]">
              Recent LinkedIn posts
            </p>
            <h3
              className={`${emphasisFontClassName} mt-2 text-5xl leading-none`}
            >
              Ideas I teach and build in public.
            </h3>
            <div className="mt-7 space-y-5">
              {featuredLinkedInPosts.map((post) => (
                <a
                  key={post.href}
                  href={post.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start justify-between gap-6 text-lg leading-7 text-white/72 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70b5f9]"
                >
                  <span>
                    <span className="font-semibold text-white">{post.title}</span>
                    {post.detail && (
                      <span className="ml-2 text-[#70b5f9]">{post.detail}</span>
                    )}
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-[#70b5f9] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  >
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="course-details"
        className="linkedin-blue-glow scroll-mt-20 relative px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <SectionLabel fontClassName={emphasisFontClassName}>
              03 — The course
            </SectionLabel>
            <h2
              className={`${emphasisFontClassName} mx-auto mt-4 max-w-3xl text-5xl leading-[0.95] sm:text-7xl`}
            >
              Practical AI tools for every stage of your career.
            </h2>
            <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-white/72 sm:text-2xl sm:leading-10">
              Learners will build AI workflows and tools that help them choose
              a direction, learn useful skills, find opportunities, build
              relationships, and do better work.
            </p>
          </div>

          <div
            id="course-outline"
            className="mt-24 max-w-4xl scroll-mt-20 sm:mt-32"
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#70b5f9]">
              Nine-chapter course outline
            </p>
            <h2
              className={`${emphasisFontClassName} mt-4 text-6xl leading-none sm:text-8xl`}
            >
              Build a career system that grows with you.
            </h2>
            <p className="mt-7 text-xl leading-9 text-white/68">
              Across nine chapters, learners will use AI to understand
              themselves, choose a direction, build proof, find opportunities,
              grow relationships, and do better work.
            </p>
          </div>

          <div className="mt-14 space-y-14 sm:space-y-20">
            {courseModules.map((module) => (
              <article
                key={module.number}
                className="group grid gap-7 py-4 lg:grid-cols-[4rem_0.95fr_1.05fr] lg:gap-10"
              >
                <div
                  className={`${emphasisFontClassName} flex h-14 w-14 items-center justify-center bg-[url('/begin/generated/chalk-nav-circle.png')] bg-contain bg-center bg-no-repeat text-2xl text-[#a8d5ff]`}
                >
                  {module.number}
                </div>
                <div>
                  <div className="relative mb-6 h-28 w-28 overflow-hidden sm:h-32 sm:w-32">
                    <Image
                      src={module.icon}
                      alt=""
                      fill
                      aria-hidden="true"
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>
                  <h3
                    className={`${emphasisFontClassName} text-4xl leading-none sm:text-5xl`}
                  >
                    {module.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-7 text-white/65">
                    {module.promise}
                  </p>
                </div>
                <div className="pt-2 lg:pt-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#70b5f9]">
                    Inside this chapter
                  </p>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {module.lessons.map((lesson) => (
                      <li
                        key={lesson}
                        className="flex items-start gap-3 text-sm leading-6 text-white/72"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#70b5f9]"
                        />
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#70b5f9]">
              How I&apos;ll teach it
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-xl leading-9 text-white/72 sm:text-2xl sm:leading-10">
              I&apos;ll turn my existing outline and prompt systems into new,
              short lessons combining on-camera teaching with practical
              screen-recorded demonstrations.
            </p>
          </div>
        </div>
      </section>

      <section
        id="samples"
        className="linkedin-blue-glow scroll-mt-20 px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-4xl text-center">
            <SectionLabel fontClassName={emphasisFontClassName}>
              04 — Proof I can deliver
            </SectionLabel>
            <h2
              className={`${emphasisFontClassName} mt-3 text-6xl leading-none sm:text-8xl`}
            >
              I already teach this way.
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-xl leading-9 text-white/70">
              These videos show how I make technical ideas clear, useful, and engaging.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
            {sampleVideos.map((video) => (
              <div
                key={video.title}
                className="group relative mx-auto aspect-[9/16] w-full max-w-sm overflow-hidden rounded-[1.6rem] bg-zinc-950 shadow-[0_25px_80px_rgba(0,0,0,.5)]"
              >
                <PlayableReelCard reel={video} />
              </div>
            ))}
          </div>

          <div className="mx-auto mt-20 max-w-4xl text-left">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#70b5f9]">
              Working with a production team
            </p>
            <h3
              className={`${emphasisFontClassName} mt-4 text-5xl leading-none`}
            >
              I welcome clear feedback.
            </h3>
            <Image
              src="/begin/partner-logo-strip.png"
              alt="Previous partners: LinkedIn, ServiceNow, Claude, OpenAI, CodePath, and Santander"
              width={2396}
              height={214}
              className="mt-8 h-auto w-full"
              sizes="(min-width: 1024px) 896px, calc(100vw - 48px)"
            />
            <div className="mt-6 grid gap-5 text-lg leading-8 text-white/70 md:grid-cols-2 md:gap-12">
              <p>
                The reel previews show both my independent teaching and my
                brand work. For my past collaborations, I turned technical
                briefs into clear demonstrations, responded to factual and
                creative feedback, and revised each piece through approval.
              </p>
              <p>
                I start by agreeing on the goal and sharing a clear draft
                early. Then I test the examples and revise the hook, pacing,
                demonstration, or visuals until the lesson is accurate and
                easy to understand.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-24 max-w-4xl text-center">
            <p
              className={`${emphasisFontClassName} text-5xl leading-none sm:text-7xl`}
            >
              What learners will leave with
            </p>
            <p className="mx-auto mt-7 max-w-3xl text-xl leading-9 text-white/72 sm:text-2xl sm:leading-10">
              By the end of the course, learners will have practical AI tools
              to plan their careers, build skills, find opportunities, stay in
              touch with people, and do their current jobs better.
            </p>
            <div className="mt-10 flex flex-col items-center gap-5">
              <a
                href={emailTeamHref}
                className="linkedin-email-team-button"
                aria-label="Email Jacqueline, Patrick, Michelle, and Teresa at The Drive Agency"
              />
              <a
                href="https://www.linkedin.com/in/michelle-o-lawson/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white/62 underline decoration-white/30 underline-offset-4 transition hover:text-white hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Michelle on LinkedIn
              </a>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
