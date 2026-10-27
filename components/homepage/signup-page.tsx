"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { HomeHeader, HomeFooter } from "./home-desktop"
import { SignupWindow } from "./signup-window"
import { signupForms } from "./signup-config"
import styles from "./home.module.css"

export default function SignupPage({ kind }: { kind: keyof typeof signupForms }) {
  const router = useRouter()
  return <div className={`${styles.site} ${styles.signupSite}`}>
    <a href="#main" className={styles.skip}>Skip to content</a>
    <HomeHeader />
    <main id="main" className={styles.formPage}>
      <Link href="/?desktop=1" className={styles.formCrumb}>← back to Michelle’s Computer</Link>
      <SignupWindow kind={kind} startOpen={false} onClose={() => router.push("/?desktop=1")} />
    </main>
    <HomeFooter />
  </div>
}
