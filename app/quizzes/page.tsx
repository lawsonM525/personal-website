import { buildPageMetadata } from "@/lib/seo"
import { QuizDirectory } from "./quiz-content"

export const metadata = buildPageMetadata({ title: "Computer Science Quizzes — IGCSE & IB Terminal Practice", description: "Test your computer science knowledge in a terminal. 70 original multiple-choice questions on seven shared Cambridge IGCSE and IB topics, with worked answers.", path: "/quizzes" })
export default function QuizzesPage() { return <QuizDirectory /> }
