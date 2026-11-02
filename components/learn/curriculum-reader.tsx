"use client";

import { useEffect, useMemo, useRef, type ReactNode } from "react";
import Link from "next/link";
import type { PortableTextBlock } from "@portabletext/types";
import { PortableArticle } from "./portable-article";
import { curriculumSections, completedReadings, highlightCompletedLearning, symbolicSystemsProgress } from "@/lib/curriculum";
import styles from "./curriculum-reader.module.css";

export function CurriculumReader({ body, children }: { body: PortableTextBlock[]; children?: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const sections = useMemo(() => curriculumSections(highlightCompletedLearning(body, symbolicSystemsProgress)), [body]);
  const completed = useMemo(() => completedReadings(body, symbolicSystemsProgress), [body]);
  const firstModule = sections.find(section => section.module);

  function revealTarget(id: string) {
    const target = document.getElementById(id);
    if (!target || !root.current?.contains(target)) return;
    let details = target.closest("details");
    while (details && root.current.contains(details)) {
      details.open = true;
      details = details.parentElement?.closest("details") || null;
    }
    requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
  }

  useEffect(() => {
    function revealHash() {
      let id: string;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      revealTarget(id);
    }
    revealHash();
    window.addEventListener("hashchange", revealHash);
    return () => window.removeEventListener("hashchange", revealHash);
  }, []);

  function setAll(open: boolean) {
    root.current?.querySelectorAll<HTMLDetailsElement>("[data-curriculum-section]").forEach(section => { section.open = open; });
  }

  function index() {
    return <>
      {!!completed.length && <section className={styles.learningLog} aria-label="Michelle’s completed learning">
        <h3>Michelle’s learning log</h3>
        <p className={styles.legend}><span aria-hidden="true">✓</span> Green means I’ve finished it.</p>
        <ul>{completed.map(item => <li key={item.title}>
          <a className={styles.completed} href={`#${item.targetId}`} onClick={() => revealTarget(item.targetId)}><span aria-hidden="true">✓ </span>{item.label || item.title}<span className={styles.srOnly}> — completed</span></a>
          {item.recapHref && <Link className={styles.recap} href={item.recapHref}>Read my recap ↗</Link>}
        </li>)}</ul>
      </section>}
      <ol className={styles.indexList}>
        {sections.map(section => <li key={section.id}><a href={`#${section.id}`} onClick={() => revealTarget(section.id)} className={section.module ? styles.moduleLink : undefined}>{section.title}</a></li>)}
      </ol>
    </>;
  }

  return <div className={styles.layout} ref={root}>
    <aside className={styles.index} aria-label="Curriculum index">
      <nav className={styles.desktopIndex} aria-label="Jump through the curriculum"><h2>On this page</h2>{index()}</nav>
      <details className={styles.mobileIndex}><summary>Curriculum index &amp; learning log</summary><nav aria-label="Jump through the curriculum">{index()}</nav></details>
    </aside>
    <div className={styles.content}>
      <div className={styles.controls}><p>Open a section and start anywhere.</p><div><button onClick={() => setAll(true)} type="button">Expand all</button><button onClick={() => setAll(false)} type="button">Collapse all</button></div></div>
      {sections.map(section => <details id={section.id} key={section.id} className={styles.section} data-curriculum-section open={section.id === firstModule?.id}>
        <summary>{section.heading ? <PortableArticle value={[section.heading]} /> : <h2>{section.title}</h2>}</summary>
        <div className={styles.sectionBody}><PortableArticle value={section.blocks} anchorPrefix="curriculum-reading-" /></div>
      </details>)}
      {children}
    </div>
  </div>;
}
