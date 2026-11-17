"use client";

import { useState } from "react";
import type { LearningVideo } from "@/lib/curriculum";
import { VideoEmbed } from "./video-embed";
import styles from "./curriculum-reader.module.css";

export function CurriculumVideoRecap({ id, video }: { id: string; video: LearningVideo }) {
  const [open, setOpen] = useState(false);
  return <details id={id} className={`${styles.section} ${styles.videoRecap}`} data-curriculum-video onToggle={event => setOpen(event.currentTarget.open)}>
    <summary><h3>My deep dive into Gödel, Escher, Bach</h3></summary>
    <div className={styles.videoBody}>
      {open && <VideoEmbed value={{ url: `https://youtu.be/${video.id}`, title: video.title, caption: video.caption, shape: "landscape" }} />}
      <a className={styles.videoLink} href={`https://youtu.be/${video.id}`} target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a>
    </div>
  </details>;
}
