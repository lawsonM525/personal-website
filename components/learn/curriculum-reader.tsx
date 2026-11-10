"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import type { PortableTextBlock } from "@portabletext/types";
import { PortableArticle } from "./portable-article";
import { curriculumSections, curriculumGroups, completedReadings, highlightCompletedLearning, symbolicSystemsProgress, type CurriculumSection } from "@/lib/curriculum";
import styles from "./curriculum-reader.module.css";

export function CurriculumReader({ body, children }: { body: PortableTextBlock[]; children?: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const mobileIndex = useRef<HTMLDetailsElement>(null);
  const sections = useMemo(() => curriculumSections(highlightCompletedLearning(body, symbolicSystemsProgress)), [body]);
  const groups = useMemo(() => curriculumGroups(sections), [sections]);
  const completed = useMemo(() => completedReadings(body, symbolicSystemsProgress), [body]);
  const [activeId, setActiveId] = useState("");
  const activeModule = groups.modules.find(section => section.id === activeId);

  function revealTarget(id: string) {
    const target = document.getElementById(id);
    if (!target || !root.current?.contains(target)) return;
    if (mobileIndex.current) mobileIndex.current.open = false;
    let details = target.closest("details");
    while (details && root.current.contains(details)) {
      details.open = true;
      details = details.parentElement?.closest("details") || null;
    }
    setActiveId(target.closest<HTMLElement>("[data-curriculum-module]")?.id || id);
    requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
  }

  useEffect(() => {
    function revealHash() {
      let id: string;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      revealTarget(id);
    }
    revealHash();
    function followStart(event: MouseEvent) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[data-curriculum-start]");
      if (link) revealTarget(link.hash.slice(1));
    }
    window.addEventListener("hashchange", revealHash);
    document.addEventListener("click", followStart);
    return () => { window.removeEventListener("hashchange", revealHash); document.removeEventListener("click", followStart); };
  }, []);

  useEffect(() => {
    let frame = 0;
    function updateActive() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const modules = Array.from(root.current?.querySelectorAll<HTMLElement>("[data-curriculum-module]") || []);
        if (!modules.length) return;
        // Match the same responsive offset used when a module link scrolls here.
        const readingLine = (parseFloat(getComputedStyle(modules[0]).scrollMarginTop) || 0) + 2;
        const current = modules.find(section => {
          const rect = section.getBoundingClientRect();
          return rect.top <= readingLine && rect.bottom > readingLine;
        });
        setActiveId(current?.id || "");
      });
    }
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    const reader = root.current;
    reader?.addEventListener("toggle", updateActive, true);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", updateActive); window.removeEventListener("resize", updateActive); reader?.removeEventListener("toggle", updateActive, true); };
  }, [sections]);

  function setAll(open: boolean) {
    root.current?.querySelectorAll<HTMLDetailsElement>("[data-curriculum-section]").forEach(section => { section.open = open; });
  }

  function indexLink(section: CurriculumSection) {
    return <li key={section.id}><a href={`#${section.id}`} onClick={() => revealTarget(section.id)} aria-current={activeId === section.id ? "location" : undefined}>{section.title}</a></li>;
  }

  function index() {
    return <>
      {!!groups.before.length && <ul className={styles.indexList}>
        <li><a href="#curriculum-before-you-start" onClick={() => revealTarget("curriculum-before-you-start")}>Before you start</a></li>
      </ul>}
      <ol className={styles.indexList}>{groups.modules.map(indexLink)}</ol>
      <ul className={`${styles.indexList} ${styles.extraLinks}`}>
        {groups.after.map(indexLink)}
      </ul>
      {!!completed.length && <section className={styles.learningLog} aria-label="Michelle’s completed learning">
        <h3>Michelle’s learning log</h3>
        <p className={styles.legend}><span aria-hidden="true">✓</span> Green means I’ve finished it.</p>
        <ul>{completed.map(item => <li key={item.title}>
          <a className={styles.completed} href={`#${item.targetId}`} onClick={() => revealTarget(item.targetId)}><span aria-hidden="true">✓ </span>{item.label || item.title}<span className={styles.srOnly}> — completed</span></a>
          {item.recapHref && <Link className={styles.recap} href={item.recapHref}>Read my recap ↗</Link>}
        </li>)}</ul>
      </section>}
    </>;
  }

  function section(section: CurriculumSection) {
    return <details id={section.id} key={section.id} className={styles.section} data-curriculum-section data-curriculum-module={section.module || undefined}>
      <summary>{section.heading ? <PortableArticle value={[section.heading]} /> : <h2>{section.title}</h2>}</summary>
      <div className={styles.sectionBody}><PortableArticle value={section.blocks} anchorPrefix="curriculum-reading-" /></div>
    </details>;
  }

  return <div className={styles.layout} ref={root}>
    <aside className={styles.index} aria-label="Curriculum index">
      <nav className={styles.desktopIndex} aria-label="Jump through the curriculum"><h2>The eight modules</h2>{index()}</nav>
      <details className={styles.mobileIndex} ref={mobileIndex}><summary><span>Jump to a module</span><span className={styles.currentModule}>{activeModule?.title || "8 modules + learning log"}</span></summary><nav aria-label="Jump through the curriculum">{index()}</nav></details>
    </aside>
    <div className={styles.content}>
      {!!groups.before.length && <details id="curriculum-before-you-start" className={`${styles.section} ${styles.beforeStart}`} data-curriculum-section>
        <summary><div><h2>Before you start</h2><p>The story, reading list &amp; how to use this plan</p></div></summary>
        <div className={styles.beforeBody}>{groups.before.map(section)}</div>
      </details>}
      <div className={styles.controls}><p>Eight modules. Open one and start anywhere.</p><div><button onClick={() => setAll(true)} type="button">Expand all</button><button onClick={() => setAll(false)} type="button">Collapse all</button></div></div>
      <div aria-label="The eight curriculum modules">{groups.modules.map(section)}</div>
      {groups.after.map(section)}
      {children}
    </div>
  </div>;
}
