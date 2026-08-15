import Image from "next/image";
import { ArrowRight, Check, ExternalLink } from "lucide-react";
import { ChalkTrail } from "../cursor/chalk-trail";
import { PlayableReelCard } from "../cursor/playable-reel-card";
import { ProposalSectionNav } from "../cursor/proposal-section-nav";
import type { FeaturedReel } from "../cursor/reels";

const navSections = [
  { id: "introduction", label: "Introduction" },
  { id: "opportunity", label: "The Opportunity" },
  { id: "campaign", label: "The Campaign" },
  { id: "proof", label: "Why Michelle" },
  { id: "partnership", label: "The Partnership" },
];

const proofReels: FeaturedReel[] = [
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
];

const campaignVideos = [
  {
    number: "01",
    eyebrow: "The question",
    title: "Is an MBA worth it in an AI world?",
    description:
      "A candid breakdown of what an MBA can still unlock—and how Gen Z should evaluate that decision as AI reshapes work.",
    moment: "Before applications",
    iconSrc: "/begin/mbamission/chalk-icons/question.png",
  },
  {
    number: "02",
    eyebrow: "The process",
    title: "What does an MBA consultant actually change?",
    description:
      "A useful look inside positioning, school fit, essays, and interviews through a real applicant—not a polished testimonial.",
    moment: "During consulting",
    iconSrc: "/begin/mbamission/chalk-icons/application.png",
  },
  {
    number: "03",
    eyebrow: "The takeaway",
    title: "What I learned applying to three top MBA programs.",
    description:
      "An honest reflection on applying with an unconventional AI-creator profile, regardless of the admissions results.",
    moment: "After submission",
    iconSrc: "/begin/generated/chalk-bonus-lightbulb.png",
  },
];

function SectionLabel({
  children,
  fontClassName,
  light = false,
  onWhite = false,
}: {
  children: React.ReactNode;
  fontClassName: string;
  light?: boolean;
  onWhite?: boolean;
}) {
  return (
    <p
      className={`${fontClassName} text-2xl uppercase tracking-[0.13em] ${
        light ? "text-white" : onWhite ? "text-[#c42339]" : "text-[#64b0ba]"
      } sm:text-3xl`}
    >
      {children}
    </p>
  );
}

export default function MbaMissionProposal({
  emphasisFontClassName,
}: {
  emphasisFontClassName: string;
}) {
  const emailHref = `mailto:aimee@mbamission.com?cc=${encodeURIComponent(
    "jenell@mbamission.com",
  )}&subject=${encodeURIComponent(
    "mbaMission × Michelle Lawson — Gen Z Application Campaign",
  )}&body=${encodeURIComponent(
    "Hi Aimee and Jenell,\n\nI'd love to discuss the Gen Z application campaign and next steps.\n\nBest,\nMichelle",
  )}`;

  return (
    <main
      className="mbamission-pitch min-h-screen overflow-hidden bg-black text-white"
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
          .mbamission-pitch ::selection { background: #c42339; color: white; }
          .mba-hero-arrow { animation: mba-arrow-bounce 1.7s ease-in-out infinite; }
          .mba-campaign-card { transition: transform 220ms ease; }
          .mba-campaign-icon { transition: transform 220ms ease; }
          .mba-campaign-card:hover { transform: translateY(-6px); }
          .mba-campaign-card:hover .mba-campaign-icon { transform: rotate(-4deg) scale(1.06); }
          .mba-acceptance-icon { animation: mba-float 4.5s ease-in-out infinite; }
          @keyframes mba-arrow-bounce {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(12px); }
          }
          @keyframes mba-float {
            0%, 100% { transform: rotate(-3deg) translateY(0); }
            50% { transform: rotate(2deg) translateY(-8px); }
          }
          @media (prefers-reduced-motion: reduce) {
            html { scroll-behavior: auto; }
            .mba-hero-arrow, .mba-acceptance-icon { animation: none; }
            .mba-campaign-card, .mba-campaign-icon { transition: none; }
          }
        `}
      </style>

      <section className="relative min-h-screen bg-black px-6 py-16 sm:px-10 lg:px-16">
        <div className="relative mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl flex-col items-center justify-center pb-20 text-center">
          <Image
            src="/begin/chalk-heart.png"
            alt=""
            width={220}
            height={220}
            aria-hidden="true"
            className="absolute right-0 top-8 h-16 w-16 rotate-12 opacity-60 sm:right-8 sm:h-24 sm:w-24 lg:right-14"
          />
          <h1
            className={`${emphasisFontClassName} max-w-5xl text-6xl leading-[0.9] sm:text-8xl lg:text-[7.2rem]`}
          >
            Bring{" "}
            <span className="inline-block translate-y-[0.02em] align-baseline">
              <Image
                src="/begin/mbamission/logo-inverse.svg"
                alt="mbaMission"
                width={350}
                height={48}
                className="inline-block h-[0.47em] w-auto"
                priority
              />
            </span>{" "}
            to <span className="text-[#c42339]">250,000</span> Gen Z learners.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/80 sm:text-2xl sm:leading-10">
            Turn one real application journey into a campaign that introduces
            mbaMission to 250,000 AI-native Gen Z learners—and gives them a
            reason to believe an MBA still matters.
          </p>
          <a
            href="#opportunity"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#c42339] px-6 py-3.5 font-bold text-white transition hover:-translate-y-1 hover:bg-[#9f1c2f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            See the opportunity <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <Image
          src="/begin/chalk-down-arrow.png"
          alt=""
          width={160}
          height={160}
          aria-hidden="true"
          className="mba-hero-arrow absolute bottom-0 left-1/2 h-24 w-24 -translate-x-1/2 opacity-85 sm:h-36 sm:w-36"
        />
      </section>

      <section
        id="introduction"
        className="scroll-mt-20 bg-black px-6 py-16 sm:px-10 sm:py-24 lg:px-16 lg:pb-20 lg:pt-32"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-20">
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

          <div className="space-y-9 sm:space-y-12">
            <div className="space-y-5">
              <h2
                className={`${emphasisFontClassName} text-[3.5rem] font-normal leading-none sm:text-8xl`}
              >
                Hi, I&apos;m Michelle.
              </h2>
              <p className="max-w-2xl text-xl leading-9 text-white/72">
                I help 250,000 Gen Z learners make smarter decisions about AI,
                careers, and education—and turn confusing technology into
                practical next steps.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-x-7 sm:gap-y-5 lg:gap-x-9">
              {[
                {
                  src: "/begin/about-stats/250k.png",
                  alt: "250K plus",
                  label: "followers across platforms",
                },
                {
                  src: "/begin/about-stats/millions.png",
                  alt: "Millions",
                  label: "of video views",
                },
                {
                  src: "/begin/about-stats/11-percent.png",
                  alt: "11 percent",
                  label: "Instagram engagement by reach",
                },
              ].map(({ src, alt, label }, index) => (
                <div
                  key={src}
                  className={`space-y-3 ${index === 2 ? "col-span-2 sm:col-span-1" : ""}`}
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={1553}
                    height={673}
                    className="h-14 w-auto max-w-full object-contain object-left sm:h-16 lg:h-20"
                  />
                  <p className="text-base leading-6 text-white/68">{label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-7 text-xl leading-9 text-white/72">
              <p>
                I&apos;ve partnered with OpenAI, NVIDIA, Anthropic, and other
                leading technology companies to make complex ideas useful and
                exciting for Gen Z.
              </p>

              <div
                className="grid grid-cols-3 gap-4"
                role="region"
                aria-label="Featured videos"
              >
                {proofReels.map((reel) => (
                  <div
                    key={reel.title}
                    className="relative aspect-[9/16] min-w-0 overflow-hidden rounded-[1.35rem] bg-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_18px_50px_rgba(0,0,0,0.45)]"
                  >
                    <PlayableReelCard reel={reel} />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black via-black/85 to-transparent px-3 pb-3 pt-10 text-white sm:px-4 sm:pb-4">
                      <p className="text-[0.62rem] font-black uppercase leading-4 tracking-[0.07em] sm:text-xs">
                        {[
                          reel.views && `${reel.views} views`,
                          reel.likes && `${reel.likes} likes`,
                          reel.saves && `${reel.saves} saves`,
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p>
                I&apos;m now applying to top business schools with a 3.7 GPA and
                an unconventional creator-founder profile. This campaign would
                let my audience see how expert guidance turns that body of work
                into a focused MBA story.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="opportunity"
        className="scroll-mt-20 bg-black px-6 py-20 text-white sm:px-10 sm:py-28 lg:px-16"
      >
        <div className="mx-auto max-w-6xl space-y-10">
          <SectionLabel fontClassName={emphasisFontClassName}>
            The opportunity
          </SectionLabel>
          <h2
            className={`${emphasisFontClassName} mt-4 max-w-5xl text-6xl leading-[0.9] sm:text-8xl`}
          >
            AI-native Gen Z is questioning the MBA before they ever search for
            admissions help.
          </h2>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
            <div className="space-y-7 text-xl leading-9 text-white/72">
              <p>
                My audience is asking whether AI can build the business, do the
                work, and replace the credential. This is the moment for
                mbaMission to enter the conversation—not when they are already
                comparing consultants, but while they are deciding whether an
                MBA belongs in their future.
              </p>
              <p className="text-2xl font-semibold leading-10 text-white">
                By guiding my applications through public-facing content,
                mbaMission becomes the expert that helps them understand both
                why an MBA can still matter and how to pursue one successfully.
              </p>
            </div>

            <div className="self-start border-l-4 border-[#c42339] pl-7 sm:pl-9">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#64b0ba]">
                The founder&apos;s concern
              </p>
              <p
                className={`${emphasisFontClassName} mt-4 text-4xl leading-none sm:text-5xl`}
              >
                Jeremy expects MBA applications to decline for several years.
              </p>
              <p className="mt-5 text-base leading-7 text-white/58">
                Prospective students are questioning the degree&apos;s value
                amid AI and economic uncertainty.{" "}
                <a
                  href="https://poetsandquants.com/2026/06/25/after-22-years-of-silence-the-top-ranked-admissions-consultancy-finally-talks-numbers-and-theyre-huge/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-white/35 underline-offset-4 hover:text-white"
                >
                  Poets&amp;Quants
                </a>
              </p>
              <p className="mt-7 text-xl font-semibold leading-8 text-white">
                That is the exact audience I already reach: 250,000 AI-native
                Gen Z learners deciding what education is still worth pursuing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="campaign"
        className="scroll-mt-20 bg-black px-6 py-20 sm:px-10 sm:py-28 lg:px-16"
      >
        <div className="mx-auto max-w-6xl">
          <SectionLabel fontClassName={emphasisFontClassName}>
            The campaign
          </SectionLabel>
          <h2
            className={`${emphasisFontClassName} mt-4 max-w-5xl text-6xl leading-[0.9] sm:text-8xl`}
          >
            One application journey. Three guaranteed short-form videos.
          </h2>
          <p className="mt-8 max-w-3xl text-xl leading-9 text-white/80">
            Together, the videos move viewers from questioning the MBA, to
            understanding what expert application guidance adds, to seeing what
            the full process taught me. They publish regardless of my admissions
            results.
          </p>

          <div className="mt-14 grid gap-14 lg:grid-cols-3 lg:gap-10">
            {campaignVideos.map(
              ({ number, eyebrow, title, description, moment, iconSrc }) => (
                <article
                  key={number}
                  className="mba-campaign-card flex flex-col py-4"
                >
                  <div className="flex items-center justify-between gap-5">
                    <span
                      className={`${emphasisFontClassName} text-6xl text-[#64b0ba]`}
                    >
                      {number}
                    </span>
                    <Image
                      src={iconSrc}
                      alt=""
                      width={512}
                      height={512}
                      aria-hidden="true"
                      className="mba-campaign-icon h-20 w-20 object-contain"
                    />
                  </div>
                  <p className="mt-7 text-xs font-black uppercase tracking-[0.18em] text-[#64b0ba]">
                    {eyebrow}
                  </p>
                  <h3
                    className={`${emphasisFontClassName} mt-3 text-4xl leading-none sm:text-5xl`}
                  >
                    {title}
                  </h3>
                  <p className="mt-6 flex-1 text-lg leading-8 text-white/80">
                    {description}
                  </p>
                  <p className="mt-8 text-xs font-black uppercase tracking-[0.16em] text-white">
                    {moment}
                  </p>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section
        id="proof"
        className="scroll-mt-20 bg-black px-6 py-20 sm:px-10 sm:py-28 lg:px-16"
      >
        <div className="mx-auto max-w-6xl">
          <h2
            className={`${emphasisFontClassName} max-w-4xl text-6xl leading-[0.9] sm:text-8xl`}
          >
            Why Michelle?
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-[.88fr_1.12fr] lg:gap-20">
            <p
              className={`${emphasisFontClassName} text-4xl leading-none text-[#64b0ba] sm:text-5xl`}
            >
              I already have the audience, the trust, and the campaign track
              record.
            </p>
            <div className="space-y-6 text-xl leading-9 text-white/72">
              <p>
                I have spent years making complicated technology simple, useful,
                and genuinely exciting. My audience comes to me not only for AI
                tools, but for help deciding what to study, how to build, and
                how to prepare for the future of work.
              </p>
              <p>
                That trust lets me introduce mbaMission before most of these
                learners are actively searching for MBA advice—and make the
                brand relevant through a real decision they can follow from
                beginning to end.
              </p>
              <p className="text-white">
                I also know how to turn expert information into creator-led
                campaigns that feel useful first and sponsored second.
              </p>
            </div>
          </div>

          <div className="mt-14">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/72">
              Selected past partners
            </p>
            <Image
              src="/begin/previous-partners.png"
              alt="ServiceNow, Claude, OpenAI, CodePath, Santander, and LinkedIn"
              width={2554}
              height={204}
              className="mt-7 h-auto w-full"
              sizes="(min-width: 1024px) 1080px, calc(100vw - 80px)"
            />
          </div>

          <div className="mt-16 border-t-2 border-white pt-10">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/72">
              Audience demographics across Instagram + TikTok
            </p>

            <div className="mt-8 grid items-end gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
              <div>
                <p
                  className={`${emphasisFontClassName} text-[7.5rem] leading-[0.72] text-[#c42339] sm:text-[10rem]`}
                >
                  87%
                </p>
                <h3
                  className={`${emphasisFontClassName} mt-7 max-w-lg text-5xl leading-[0.95] text-white sm:text-6xl`}
                >
                  of my TikTok audience is 18–34.
                </h3>
                <p className="mt-6 max-w-xl text-xl leading-8 text-white/72">
                  On Instagram, the same 18–34 audience makes up{" "}
                  <strong className="text-white">78%.</strong> Across both
                  platforms, my audience is overwhelmingly Gen Z.
                </p>
              </div>

              <div aria-label="Instagram and TikTok audience comparison">
                <div className="mb-7 flex flex-wrap gap-x-7 gap-y-3 text-xs font-black uppercase tracking-[0.14em]">
                  <span className="flex items-center gap-2 text-white/72">
                    <span className="h-3 w-3 bg-[#64b0ba]" aria-hidden="true" />
                    Instagram
                  </span>
                  <span className="flex items-center gap-2 text-white/72">
                    <span className="h-3 w-3 bg-[#c42339]" aria-hidden="true" />
                    TikTok
                  </span>
                </div>
                {[
                  {
                    label: "Ages 18–34",
                    instagram: 78,
                    tiktok: 87,
                  },
                  { label: "United States", instagram: 26, tiktok: 36 },
                ].map((metric) => (
                  <div key={metric.label} className="mb-7 last:mb-0">
                    <p className="mb-3 text-sm font-black uppercase tracking-[0.1em] text-white">
                      {metric.label}
                    </p>
                    <div className="space-y-2.5">
                      <div className="grid grid-cols-[1fr_3rem] items-center gap-3">
                        <div className="h-3 bg-white/10">
                          <div
                            className="h-full bg-[#64b0ba]"
                            style={{ width: `${metric.instagram}%` }}
                          />
                        </div>
                        <span className="text-right text-sm font-black text-[#64b0ba]">
                          {metric.instagram}%
                        </span>
                      </div>
                      <div className="grid grid-cols-[1fr_3rem] items-center gap-3">
                        <div className="h-3 bg-white/10">
                          <div
                            className="h-full bg-[#c42339]"
                            style={{ width: `${metric.tiktok}%` }}
                          />
                        </div>
                        <span className="text-right text-sm font-black text-[#c42339]">
                          {metric.tiktok}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-white/58">
                  Audience gender
                </p>
                <div className="mt-7 space-y-7">
                  {[
                    {
                      platform: "Instagram",
                      female: 58,
                      male: 42,
                      color: "bg-[#64b0ba]",
                    },
                    {
                      platform: "TikTok",
                      female: 74,
                      male: 26,
                      color: "bg-[#c42339]",
                    },
                  ].map((platform) => (
                    <div key={platform.platform}>
                      <div className="mb-3 flex items-baseline justify-between gap-4">
                        <p className="text-sm font-black uppercase tracking-[0.1em] text-white/72">
                          {platform.platform}
                        </p>
                        <p className="text-sm font-bold text-white">
                          {platform.female}% female
                        </p>
                      </div>
                      <div className="flex h-4 overflow-hidden">
                        <div
                          className={platform.color}
                          style={{ width: `${platform.female}%` }}
                        />
                        <div
                          className="bg-white/20"
                          style={{ width: `${platform.male}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-white/58">
                  United States audience
                </p>
                <div className="mt-6 grid grid-cols-2 gap-8">
                  <div>
                    <p
                      className={`${emphasisFontClassName} text-7xl leading-none text-[#64b0ba] sm:text-8xl`}
                    >
                      26%
                    </p>
                    <p className="mt-3 text-sm font-black uppercase tracking-[0.1em] text-white/72">
                      Instagram
                    </p>
                  </div>
                  <div>
                    <p
                      className={`${emphasisFontClassName} text-7xl leading-none text-[#c42339] sm:text-8xl`}
                    >
                      36%
                    </p>
                    <p className="mt-3 text-sm font-black uppercase tracking-[0.1em] text-white/72">
                      TikTok
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="partnership"
        className="scroll-mt-20 bg-white px-6 py-20 text-black sm:px-10 sm:py-28 lg:px-16"
      >
        <div className="mx-auto max-w-6xl">
          <SectionLabel fontClassName={emphasisFontClassName}>
            The partnership
          </SectionLabel>
          <h2
            className={`${emphasisFontClassName} mt-4 max-w-5xl text-6xl leading-[0.9] sm:text-8xl`}
          >
            Sponsor the consulting. I&apos;ll turn the process into a Gen Z
            campaign.
          </h2>

          <p className="mt-10 max-w-4xl text-2xl leading-10 text-black/78">
            mbaMission provides comprehensive, start-to-finish consulting across
            three applications. In return, I create and publish three original
            short-form videos covering the journey, regardless of the results.
          </p>

          <div className="mt-14 grid gap-12 border-t-2 border-black pt-10 lg:grid-cols-2 lg:gap-20">
            <div>
              <h3
                className={`${emphasisFontClassName} text-5xl leading-none sm:text-6xl`}
              >
                The core campaign
              </h3>
              <ul className="mt-7 space-y-4 text-black/78">
                {[
                  "Three original short-form videos distributed across Instagram and TikTok to an audience of 250,000 followers",
                  "Limited paid-media usage rights for mutually selected assets, with duration and placements finalized together",
                  "Tracked campaign links or calls to action",
                  "Post-campaign performance and audience-insight reporting",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-lg leading-8">
                    <Check
                      className="mt-1 h-5 w-5 shrink-0 text-[#c42339]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <Image
                src="/begin/mbamission/chalk-icons/acceptance.png"
                alt=""
                width={512}
                height={512}
                aria-hidden="true"
                className="mba-acceptance-icon mb-5 h-24 w-24 object-contain"
                style={{
                  filter:
                    "drop-shadow(1px 0 #111) drop-shadow(-1px 0 #111) drop-shadow(0 1px #111) drop-shadow(0 -1px #111)",
                }}
              />
              <h3
                className={`${emphasisFontClassName} text-5xl leading-none sm:text-6xl`}
              >
                If an acceptance lands
              </h3>
              <p className="mt-6 text-xl leading-9 text-black/78">
                We expand the campaign with two additional full videos per
                acceptance, up to six acceptance videos total. The success
                series is scoped with a separate creator fee.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-black px-6 py-24 text-center sm:px-10 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <h2
            className={`${emphasisFontClassName} text-6xl leading-[0.9] sm:text-8xl`}
          >
            Let&apos;s make mbaMission the place Gen Z learners go to become
            their best selves in an AI-native world.
          </h2>
          <a
            href={emailHref}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#c42339] px-7 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-[#9f1c2f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Let&apos;s build the campaign <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
