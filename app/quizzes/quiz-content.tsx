import Link from "next/link"
import { quizTopics, quizCurricula, getQuizTopic, quizQuestionCount, type QuizTopic } from "@/lib/quiz-topics"
import { absoluteUrl, serializeStructuredData } from "@/lib/seo"
import { Terminal } from "@/components/explore/terminal"
import styles from "./quiz.module.css"

type Course = keyof typeof quizCurricula

export function QuizDirectory({ course }: { course?: Course }) {
  const curriculum = course ? quizCurricula[course] : null
  const intro = <main className={styles.transcript}>
    <h1>{curriculum ? `${curriculum.title} quizzes` : "Computer science terminal quizzes"}</h1>
    <p>{curriculum ? `${curriculum.version}. ` : "Cambridge IGCSE + IB Computer Science. "}{quizQuestionCount} original MCQs across {quizTopics.length} shared foundation topics. Type a, b, or c to answer; get an explanation and sound feedback after each choice.</p>
    <p>Choose a topic below, or type its command. These questions practise shared concepts; they do not cover the entire syllabus or replace exam papers.</p>
    <nav aria-label="Quiz courses"><Link href="/quizzes">All topics</Link>{Object.entries(quizCurricula).map(([key, value]) => <Link key={key} href={`/quizzes/${value.slug}`}>{key === "igcse" ? "Cambridge IGCSE" : "IB"}</Link>)}</nav>
    <h2>Available topics</h2>
    <ul>{quizTopics.map(topic => <li key={topic.slug}>
      <Link href={`/quizzes/${topic.slug}`}>quiz {topic.slug} — {topic.title}</Link>
      <p>{topic.questions.length} questions · {course ? `${topic[course].section}: ${topic[course].label}` : "shared IGCSE / IB foundations"}</p>
    </li>)}</ul>
    {curriculum && <p>Topic mapping: <a href={curriculum.source} target="_blank" rel="noopener noreferrer">{curriculum.title} official syllabus{course === "ib" ? " brief" : ""}</a>. Independent practice by Michelle’s Computer; not affiliated with or endorsed by the exam board.</p>}
    <p>Commands: quiz binary · help · open terminal</p>
  </main>
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData({ "@context": "https://schema.org", "@type": "ItemList", name: curriculum ? `${curriculum.title} quizzes` : "Computer science quizzes", itemListElement: quizTopics.map((topic, index) => ({ "@type": "ListItem", position: index + 1, name: topic.title, url: absoluteUrl(`/quizzes/${topic.slug}`) })) }) }} />
    <Terminal key={course || "all"} intro={intro} workingDirectory="C:\MICHELLE\QUIZZES" />
  </>
}

export function QuizTopicPage({ topic }: { topic: QuizTopic }) {
  const intro = <header className={styles.transcript}>
    <h1>{topic.title} quiz</h1>
    <p>{topic.description}</p>
    <nav aria-label="Quiz navigation"><Link href="/quizzes">topics</Link><Link href="/quizzes/igcse-computer-science">IGCSE</Link><Link href="/quizzes/ib-computer-science">IB</Link></nav>
    {topic.slug === "binary" && <p>Try the command: <Link href="/text-to-binary">free text to binary converter</Link>.</p>}
    <details><summary>syllabus — topic scope &amp; references</summary>
      <ul>{topic.objectives.map(objective => <li key={objective}>{objective}</li>)}</ul>
      <p><a href={quizCurricula.igcse.source} target="_blank" rel="noopener noreferrer">Cambridge IGCSE 0478 (2026–2028)</a>: {topic.igcse.section} {topic.igcse.label}.</p>
      <p><a href={quizCurricula.ib.source} target="_blank" rel="noopener noreferrer">IB Computer Science (first assessment 2027)</a>: {topic.ib.section} {topic.ib.label}.</p>
      <p>Original practice on shared foundations. Topic-area links do not imply complete syllabus or SL/HL coverage. Not affiliated with or endorsed by Cambridge or the IB.</p>
      <p>Related: {topic.related.map((slug, index) => <span key={slug}>{index > 0 && " · "}<Link href={`/quizzes/${slug}`}>{getQuizTopic(slug)!.title}</Link></span>)}</p>
    </details>
  </header>
  const reference = <article className={`${styles.transcript} ${styles.reference}`}>
    <h2>{topic.title}: questions, answers &amp; explanations</h2>
    <p>This is the readable reference for the same {topic.questions.length} MCQs. Close this file to continue your quiz, or type quiz to start again.</p>
    {topic.questions.map((question, index) => <section key={index} id={`question-${index + 1}`}>
      <h3>{index + 1}. {question.question}</h3>
      <ol aria-label={`Question ${index + 1} choices`}>{question.options.map((option, choice) => <li key={choice}>{"abc"[choice]}) {option}</li>)}</ol>
      <p>Answer: {"abc"[question.correct]}) {question.options[question.correct]}</p>
      <p>{question.why}</p>
    </section>)}
    <footer><p>Next topic: {topic.related.map((slug, index) => <span key={slug}>{index > 0 && " · "}<Link href={`/quizzes/${slug}`}>{getQuizTopic(slug)!.title}</Link></span>)}</p><Link href="/quizzes">Back to all computer science quizzes</Link></footer>
  </article>
  const url = absoluteUrl(`/quizzes/${topic.slug}`)
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData({ "@context": "https://schema.org", "@graph": [
      { "@type": "LearningResource", "@id": `${url}#quiz`, name: `${topic.title} quiz`, description: topic.description, url, inLanguage: "en", learningResourceType: "Multiple-choice quiz", educationalUse: "Practice", isAccessibleForFree: true, teaches: topic.objectives, about: [{ "@type": "Thing", name: "Cambridge IGCSE Computer Science" }, { "@type": "Thing", name: "IB Computer Science" }], provider: { "@type": "Organization", name: "Michelle’s Computer", url: absoluteUrl() } },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Computer science quizzes", item: absoluteUrl("/quizzes") }, { "@type": "ListItem", position: 2, name: topic.title, item: url }] },
    ] }) }} />
    <Terminal key={topic.slug} topic={topic} intro={intro} reference={reference} workingDirectory={`C:\\MICHELLE\\QUIZZES\\${topic.slug.toUpperCase()}`} />
  </>
}
