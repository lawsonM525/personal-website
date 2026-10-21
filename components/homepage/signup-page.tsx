import Link from "next/link"
import { HomeHeader, HomeFooter, WindowBar } from "./home-desktop"
import { signupForms } from "./signup-config"
import { ArrowUpRight } from "lucide-react"
import styles from "./home.module.css"

export default function SignupPage({ kind }: { kind: "magazine" | "penpals" }) {
  const magazine = kind === "magazine"
  return <div className={styles.site}>
    <a href="#main" className={styles.skip}>Skip to content</a>
    <HomeHeader />
    <main id="main" className={styles.formPage}>
      <Link href="/" className={styles.formCrumb}>← back to Michelle’s Computer</Link>
      <section className={styles.formWindow} aria-labelledby="signup-title">
        <WindowBar title={magazine ? "the-magazine.exe" : "the-little-post-office.exe"} warm={!magazine} />
        <div className={styles.formIntro}>
          <p className={styles.eyebrow}>{magazine ? "A MAGAZINE IN THE MAKING" : "A LITTLE LESS SCREEN TIME"}</p>
          <h1 id="signup-title">{magazine ? "the magazine waitlist" : "wanna be pen pals?"}</h1>
          <p>{magazine ? "An illustrated field guide to figuring out life in the age of AI. Join the waitlist for updates as it comes together." : "If you’d like a handwritten letter from me, leave your mailing details below. This is an interest signup."}</p>
        </div>
        <div className={styles.directSignup}>
          <img src={magazine ? "/homepage/magazine-banner.webp" : "/homepage/penpal-mail.webp"} alt={magazine ? "Michelle’s Computer — the magazine" : "An illustrated handwritten letter and envelope"} width={magazine ? 2048 : 420} height={magazine ? 682 : 420} className={magazine ? styles.directMagazineArt : styles.directPenpalArt} />
          <a href={signupForms[kind].publicUrl} className={`${styles.button} ${magazine ? "" : styles.orangeButton}`}>{magazine ? "Join the magazine waitlist" : "Sign up to be pen pals"}<ArrowUpRight size={19} aria-hidden="true" /></a>
          <p>Continue to the short signup form on Tally.</p>
        </div>
        <div className={styles.formFallback}>
          <p>{magazine ? "This signup is just for magazine updates." : "This is an interest signup. A letter or ongoing replies can’t be guaranteed."} Details are collected through Tally. The two signups are separate.</p>
          <p>Looking for {magazine ? "pen pals" : "the magazine"}? <Link href={magazine ? "/penpals" : "/magazine"}>{magazine ? "Visit the little post office" : "Join the magazine waitlist"} →</Link></p>
        </div>
      </section>
    </main>
    <HomeFooter />
  </div>
}
