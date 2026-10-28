import { notFound } from "next/navigation"
import { getQuizTopic, quizTopics, quizCurricula } from "@/lib/quiz-topics"
import { buildPageMetadata } from "@/lib/seo"
import { QuizDirectory, QuizTopicPage } from "../quiz-content"

export const dynamicParams = false
export function generateStaticParams() { return [...quizTopics.map(topic => ({ topic: topic.slug })), ...Object.values(quizCurricula).map(course => ({ topic: course.slug }))] }
function getCourse(slug: string) { return (Object.keys(quizCurricula) as (keyof typeof quizCurricula)[]).find(key => quizCurricula[key].slug === slug) }
export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: slug } = await params
  const course = getCourse(slug), topic = getQuizTopic(slug)
  if (course) return buildPageMetadata({ title: `${quizCurricula[course].title} Quizzes — Terminal MCQ Practice`, description: `Practise seven shared ${quizCurricula[course].title} foundation topics in a terminal. Original MCQs with immediate explanations on binary, logic, hardware, networks, algorithms, programming, and databases.`, path: `/quizzes/${slug}` })
  if (!topic) notFound()
  return buildPageMetadata({ title: `${topic.title} Quiz — IGCSE & IB Computer Science`, description: `${topic.description} 10 original MCQs for shared Cambridge IGCSE and IB computer science foundations.`, path: `/quizzes/${topic.slug}`, keywords: [`${topic.title} quiz`, "IGCSE computer science quiz", "IB computer science quiz"] })
}
export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: slug } = await params
  const course = getCourse(slug)
  if (course) return <QuizDirectory course={course} />
  const topic = getQuizTopic(slug)
  if (!topic) notFound()
  return <QuizTopicPage topic={topic} />
}
