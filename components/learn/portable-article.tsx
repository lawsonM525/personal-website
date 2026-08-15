import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { stegaClean } from "@sanity/client/stega";
import { CopyCodeButton } from "@/components/learn/copy-code-button";
import { RetroWindow } from "@/components/learn/retro-window";
import { VideoEmbed } from "@/components/learn/video-embed";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="learn-muted my-6 text-[1.08rem] leading-8 sm:text-lg">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-14 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-10 text-2xl font-black leading-tight">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="learn-soft my-9 border-l-8 border-[#7557ff] px-6 py-4 font-serif text-2xl leading-snug">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="learn-muted my-6 list-disc space-y-3 pl-7 text-[1.08rem] leading-8">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="learn-muted my-6 list-decimal space-y-3 pl-7 text-[1.08rem] leading-8">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="learn-ink font-black">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-black px-1.5 py-1 font-mono text-[.9em] text-[#d7ff45]">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href =
        typeof value?.href === "string" ? stegaClean(value.href) : "#";
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          target={stegaClean(value?.blank) || external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          className="font-semibold decoration-2 underline underline-offset-4 hover:bg-[#d7ff45] hover:text-black"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    articleImage: ({ value }) =>
      value?.asset?.url ? (
        <figure className="my-10">
          <RetroWindow
            title="IMAGE VIEWER"
            contentClassName="relative aspect-[16/10] bg-[#ebe6db]"
          >
            <Image
              src={stegaClean(value.asset.url)}
              alt={value.alt || ""}
              fill
              sizes="(min-width: 768px) 760px, 100vw"
              className="object-cover"
            />
          </RetroWindow>
          {value.caption && (
            <figcaption className="learn-muted mt-3 text-sm">
              {value.caption}
            </figcaption>
          )}
        </figure>
      ) : null,
    callout: ({ value }) => {
      const tone = stegaClean(value?.tone);
      const label =
        tone === "important"
          ? "Important"
          : tone === "action"
            ? "Try this"
            : "Michelle’s note";
      return (
        <aside className="learn-border learn-shadow-sm my-9 border-2 bg-[#d7ff45] p-6 text-black">
          <p className="text-xs font-black uppercase tracking-[.18em]">
            {label}
          </p>
          {value?.title && (
            <h3 className="mt-2 text-xl font-black">{value.title}</h3>
          )}
          <p className="mt-2 leading-7">{value?.text}</p>
        </aside>
      );
    },
    code: ({ value }) => (
      <div className="learn-border my-8 overflow-hidden border-2 bg-[#111] text-white shadow-[5px_5px_0_#7557ff]">
        <div className="flex min-h-12 items-center justify-between gap-4 border-b border-white/20 px-4 py-2">
          <span className="text-xs font-bold uppercase tracking-[.16em] text-white/55">
            {value?.language === "text"
              ? "Copy this prompt"
              : value?.language || "Code"}
          </span>
          <CopyCodeButton value={value?.code || ""} />
        </div>
        <pre className="overflow-x-auto whitespace-pre-wrap p-5 font-mono text-sm leading-7 text-[#d7ff45]">
          <code>{value?.code}</code>
        </pre>
      </div>
    ),
    videoEmbed: ({ value }) => <VideoEmbed value={value} />,
  },
};

export function PortableArticle({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
