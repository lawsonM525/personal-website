import { alignmentVideo } from "@/lib/article-companion";
import { RetroWindow } from "./retro-window";
import styles from "./article-companion-video.module.css";

export function ArticleCompanionVideo() {
  return <aside id="alignment-video" className={styles.companion} aria-labelledby="alignment-video-title">
    <p className={styles.eyebrow}>A companion video from Michelle</p>
    <h2 id="alignment-video-title">{alignmentVideo.title}</h2>
    <figure>
      <RetroWindow title="VIDEO PLAYER · 1:17" className={styles.player} contentClassName={styles.screen}>
        <video controls playsInline preload="none" poster={alignmentVideo.posterPath} width={720} height={1280} aria-label={alignmentVideo.title} aria-describedby="alignment-video-credit">
          <source src={alignmentVideo.contentPath} type="video/mp4" />
          <track kind="captions" src={alignmentVideo.captionsPath} srcLang="en" label="English" />
          Your browser does not support this video. <a href={alignmentVideo.sourceUrl}>Watch it on Instagram.</a>
        </video>
      </RetroWindow>
      <figcaption id="alignment-video-credit">Video by Michelle Lawson · <a href={alignmentVideo.sourceUrl} target="_blank" rel="noopener noreferrer">Watch on Instagram ↗</a></figcaption>
    </figure>
    <details className={styles.transcript}>
      <summary>Read the video transcript</summary>
      {alignmentVideo.transcript.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
    </details>
  </aside>;
}
