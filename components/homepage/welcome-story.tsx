import Link from "next/link"
import { ExplorerIcon } from "@/components/explore/explorer-icon"
import styles from "./welcome-story.module.css"

export function WelcomeStory() {
  return <article id="welcome-story" className={styles.story} aria-labelledby="welcome-story-title">
    <div className={styles.letter}>
      <p className={styles.salutation}>A letter from Michelle</p>
      <h2 id="welcome-story-title">I’ve always been an internet baby.</h2>
      <p>For as long as I can remember, I have <em>lived</em> on the Internet. If I wasn’t studying, I was entering virtual worlds, finding little corners of the internet that I was absolutely obsessed with.</p>
      <p>As I explored, I started discovering creators like Vee Kativhu, James Scholz, and John Fish. People who explained how they were making things and learning things by themselves. They were giving us the resources and inspiration to do the same.</p>
      <p>Khan Academy taught me how to code and helped me prepare for my SATs. Mosh taught me how to build my first application. So much of what I learned started with someone on the internet sharing what they knew.</p>

      <div className={styles.turn}>
        <ExplorerIcon kind="paper" size={46} />
        <p>So many of us have big dreams. Massive dreams. But having the ambition doesn’t automatically give us a way to get there.</p>
      </div>
      <p>Some people grow up around people who’ve already taken the path and can show them the way. Some of us have to look for it blind.</p>
      <p>After all these years exploring the internet, I’ve learned that nothing you want is impossible. You just need to find out what it takes. The right resources, the right knowledge, the tools, the people, and, yes, still practice.</p>

      <h3>So, I’m inviting you into my computer.</h3>
      <p>I made this website to gather the things that help you turn your ideas into reality. The things I’m learning, the things I’m building, and the resources I wish someone had put in front of me when I was starting.</p>
      <p>You can <Link href="/learn">learn something new</Link>, follow a practical guide, or <Link href="/girly-guide-to-ai">peek inside The Girly Guide to AI</Link>. When you’re wondering what you could make, have a look through <Link href="/projects">my projects</Link> or the <Link href="/learn/you-wont-believe-this-was-made-with-ai">AI creations that made me go “whoa.”</Link> Borrow an idea. Try something. See where it takes you.</p>

      <aside className={styles.play} aria-label="A little room to play">
        <ExplorerIcon kind="minesweeper" size={54} />
        <div><p>Oh, and you can <Link href="/explore?folder=programs">play some games here too.</Link></p><p>The internet has always been a place to play for me. So there’s room for that here, whether you’re taking a little Minesweeper break or <Link href="/explore?app=paint">making a sticker-filled mess in Paint</Link>.</p></div>
      </aside>

      <p>And because this is <em>my</em> computer, I’ll be leaving some journal entries, photo dumps, and love letters along the way. You can <Link href="/about">get to know me a little better</Link>, or <Link href="/penpals">become pen pals</Link> and stay in touch.</p>
      <p className={styles.invitation}>Come explore, try something, build something, learn something!!</p>
      <p className={styles.signoff}>Make yourself at home.<span>Michelle</span></p>
    </div>
  </article>
}
