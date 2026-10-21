import Link from "next/link"
import { ArrowDown, ArrowUpRight, BookOpen, Folder, Heart, Mail, Monitor, Sparkles } from "lucide-react"
import styles from "./home.module.css"
import { signupForms } from "./signup-config"

export function HomeHeader() {
  return <header className={styles.header}>
    <Link href="/" className={styles.brand}><Monitor size={23} strokeWidth={1.7} aria-hidden="true" /><span>Michelle’s Computer</span></Link>
    <nav aria-label="Main navigation">
      <Link href="/#magazine">the magazine</Link>
      <Link href="/#penpals">pen pals</Link>
      <Link href="/#explore">explore <ArrowUpRight size={14} aria-hidden="true" /></Link>
    </nav>
  </header>
}

export function WindowBar({ title, warm = false }: { title: string; warm?: boolean }) {
  return <div className={`${styles.windowBar} ${warm ? styles.warmBar : ""}`}>
    <span>{title}</span><span className={styles.barLines} aria-hidden="true" />
    <span className={styles.windowDots} aria-hidden="true"><i>−</i><i>□</i><i>×</i></span>
  </div>
}

export function HomeFooter() {
  return <footer className={styles.footer}>
    <Link href="/" className={styles.brand}><Monitor size={20} aria-hidden="true" />Michelle’s Computer</Link>
    <span>a little corner of the internet, by Michelle Lawson</span>
    <a href="https://www.instagram.com/michellescomputer/" target="_blank" rel="noopener noreferrer">say hi on Instagram <ArrowUpRight size={15} aria-hidden="true" /></a>
  </footer>
}

export default function HomeDesktop() {
  return <div className={styles.site}>
    <a href="#main" className={styles.skip}>Skip to content</a>
    <HomeHeader />
    <main id="main">
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}><span className={styles.tinyStar}>✳</span> OPEN TABS, BIG IDEAS & LITTLE LETTERS</p>
          <h1 id="home-title" className={styles.wordmark}><span className={styles.srOnly}>Michelle’s Computer</span><img src="/homepage/wordmark.png" alt="" width="714" height="302" fetchPriority="high" /></h1>
          <p className={styles.handwritten}>a work in progress. just like me.</p>
          <p className={styles.heroDescription}>Figuring out life in the age of AI.<br />Making things, learning out loud, and leaving a few handwritten notes along the way.</p>
          <div className={styles.heroActions}>
            <a href={signupForms.magazine.publicUrl} className={styles.button}>Join the magazine waitlist <ArrowUpRight size={19} aria-hidden="true" /></a>
            <a href={signupForms.penpals.publicUrl} className={`${styles.button} ${styles.secondaryButton}`}>Let’s be pen pals <Mail size={18} aria-hidden="true" /></a>
          </div>
          <a href="#keep-in-touch" className={styles.downLink}><ArrowDown size={16} aria-hidden="true" /> make yourself at home</a>
        </div>
        <aside className={styles.heroCollage} id="about" aria-label="A note from Michelle">
          <div className={styles.noteWindow}>
            <WindowBar title="a-note-from-michelle.txt" />
            <div className={styles.noteBody}>
              <span className={styles.noteLabel}>TO: whoever’s on the other side of the screen</span>
              <h2>hi, I’m Michelle!</h2>
              <p>I like computers.<br />And making things.<br />And figuring it out<br /><em>as I go.</em></p>
              <span className={styles.noteSignature}>glad you’re here ♡</span>
            </div>
          </div>
          <figure className={styles.polaroid}>
            <span className={styles.tape} aria-hidden="true" />
            <img src="/homepage/michelle.jpg" width="700" height="700" alt="Michelle smiling at her computer" />
            <figcaption>me + my many open tabs</figcaption>
          </figure>
          <span className={styles.orangeStar} aria-hidden="true">✳</span>
          <span className={styles.helloSticker}><Heart size={16} aria-hidden="true" /> human behind the screen</span>
        </aside>
      </section>

      <section className={styles.touchSection} id="keep-in-touch" aria-labelledby="touch-title">
        <div className={styles.sectionHeading}><p className={styles.eyebrow}>A LITTLE ONLINE, A LITTLE OFFLINE</p><h2 id="touch-title">two ways to keep in touch<span aria-hidden="true">↴</span></h2></div>
        <div className={styles.signupGrid}>
          <article className={styles.signupWindow} id="magazine">
            <WindowBar title="the-magazine.exe" />
            <div className={styles.magazineArt}>
              <span className={styles.artLabel}>FROM MY DESKTOP TO THE PAGE</span>
              <div className={styles.magazinePaper}><img src="/homepage/magazine-banner.webp" alt="Michelle’s Computer — the magazine, illustrated with two smiling computers" width="2048" height="682" /><div className={styles.paperNote}><span>experiments,<br />stories & things<br />I’m making.</span><Sparkles size={49} strokeWidth={1.2} aria-hidden="true" /></div><span className={styles.paperRule}>AN ILLUSTRATED FIELD GUIDE TO FIGURING IT OUT</span></div>
              <span className={styles.scribble}>currently in the making!</span>
            </div>
            <div className={styles.signupCopy}>
              <p className={styles.eyebrow}>01 / THE MAGAZINE</p>
              <h3>For the curious ones.</h3>
              <p>An illustrated field guide to figuring out life in the age of AI—through my experiments, stories, comics, and handwritten pages.</p>
              <a href={signupForms.magazine.publicUrl} className={styles.button}>Join the magazine waitlist <ArrowUpRight size={19} aria-hidden="true" /></a>
              <p className={styles.finePrint}>Sign up for updates as it comes together.</p>
            </div>
          </article>
          <article className={`${styles.signupWindow} ${styles.penpalWindow}`} id="penpals">
            <WindowBar title="the-little-post-office.exe" warm />
            <div className={styles.penpalArt}>
              <span className={styles.artLabel}>SOMETHING TO HOLD ON TO</span>
              <span className={styles.postmark} aria-hidden="true">THE LITTLE<br />POST OFFICE<br /><Heart size={15} /></span>
              <img src="/homepage/penpal-mail.webp" width="420" height="420" alt="A cheerful envelope with a handwritten letter, hearts, and a smiling stamp" />
              <span className={styles.scribble}>you’ve got (real) mail ♡</span>
            </div>
            <div className={styles.signupCopy}>
              <p className={styles.eyebrow}>02 / PEN PALS</p>
              <h3>Let’s take this offline.</h3>
              <p>There’s something special about a handwritten letter. Leave your mailing details if you’d like to be pen pals with me.</p>
              <a href={signupForms.penpals.publicUrl} className={`${styles.button} ${styles.orangeButton}`}>Sign up to be pen pals <ArrowUpRight size={19} aria-hidden="true" /></a>
              <p className={styles.finePrint}>An interest signup. Letters and ongoing replies aren’t guaranteed.</p>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.explore} id="explore" aria-labelledby="explore-title">
        <div><p className={styles.eyebrow}>WHILE YOU’RE HERE</p><h2 id="explore-title">a few more open tabs</h2></div>
        <div className={styles.exploreLinks}>
          <Link href="/learn"><BookOpen size={30} strokeWidth={1.4} aria-hidden="true" /><span><strong>The learning library</strong><small>Notes for your next rabbit hole</small></span><ArrowUpRight size={19} aria-hidden="true" /></Link>
          <Link href="/resources/computer"><Folder size={31} strokeWidth={1.4} aria-hidden="true" /><span><strong>My computer</strong><small>A desktop of tools & little quests</small></span><ArrowUpRight size={19} aria-hidden="true" /></Link>
          <Link href="/about"><Heart size={30} strokeWidth={1.4} aria-hidden="true" /><span><strong>The person behind it</strong><small>A little more about Michelle</small></span><ArrowUpRight size={19} aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
    <HomeFooter />
  </div>
}
