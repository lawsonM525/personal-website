import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowUpRight } from 'lucide-react'

interface Project {
  title: string
  subtitle?: string
  description: string
  status?: "upcoming" | "current" | "published"
  link?: string
}

export default function Projects() {
  const projects: Project[] = [
    {
      title: "CS Space",
      description: "Look out for this. I'm thrilled about the possibilities this could bring for learners around the world",
      status: "upcoming"
    },
    {
      title: "Future U",
      subtitle: "Your future, mapped out.",
      description: "Future U is a career-path navigator designed to help people visualize their dream life and uncover the resources needed to achieve it. With features like personalized \"future you\" simulations and real-world data integration, the app gives users a clear, actionable roadmap. Think of it as your personal career GPS, pointing you toward the most fulfilling version of yourself.",
      status: "current",
      link: "/projects/rag-in-practice"
    },
    {
      title: "RAG In Practice",
      subtitle: "Explaining and Applying RAG",
      description: "As a final project for MTH 354 (Math for Deep Learning), I explain the concept of Retrieval Augmented Generation, the math behind it, and how I apply it to Future U - a career path navigator with personalized and relevant advice.",
      link: "/projects/rag-in-practice"
    },
    {
      title: "SaaS Customer Sentiment Analysis",
      subtitle: "Turning feedback into innovation.",
      description: "As part of a year-long program between MIT and Cornell with the supervision of a Salesforce advisor, this project focuses on developing a cutting-edge sentiment analysis model for a SaaS tool. Through meticulous data cleaning, and strategic Machine learning model building, the analysis uncovers deep customer insights to refine outreach strategies. From small LLMs to advanced time-series techniques, this project exemplifies the power of machine learning to shape the future of customer experience.",
      link: "https://customer-sentiment-analysis-3w5v.vercel.app"
    },
    {
      title: "AST Space Mobile Award-Winning Stock Pitch",
      subtitle: "Investing in the stars.",
      description: "This award-winning pitch analyzed AST Space Mobile, a company revolutionizing global connectivity through satellite networks. The presentation went beyond numbers, crafting a compelling narrative about the company's potential to democratize internet access worldwide. It stood out at the Cornell competition, winning \"best pitch\" for its strategic depth and visionary storytelling."
    },
    {
      title: "JMCQ Assessment Style",
      subtitle: "Rethinking how we measure learning.",
      description: "This published research introduces a novel approach to assessment—JMCQ (Justified Multiple-Choice Questions)—that goes beyond surface-level answers. By incorporating justifications, it captures a deeper understanding of student knowledge and problem-solving. The research paves the way for fairer, more effective evaluations in STEM education.",
      status: "published"
    },
    {
      title: "MBTI x Birthday Data Analysis",
      subtitle: "Data meets personality.",
      description: "This unique project explored the intersection of personality traits (MBTI types) and astrological birthdays. Through data analysis, it uncovered fascinating patterns and correlations, sparking conversations about how our personalities might align with the stars—or the science behind them."
    },
    {
      title: "Delta Airlines Award-Winning Stock Pitch",
      subtitle: "Taking flight with bold investments.",
      description: "This winning pitch highlighted Delta Airlines' resilience and strategic foresight during challenging market conditions. Blending financial acumen with storytelling, the analysis demonstrated Delta's potential to soar higher in a post-pandemic world, earning accolades and standing out among top competitors."
    },
    {
      title: "Computer Science Girlies (CSG)",
      subtitle: "Empowering a generation of tech girlies.",
      description: "From a small idea to a thriving community of 100,000+ women, Computer Science Girlies is redefining what it means to be a woman in tech. Through viral educational content, mentorship, and job placement initiatives, CSG is more than a community—it's a movement to close the gender gap in technology, one connection at a time."
    },
    {
      title: "Cryptographic Algorithms Research",
      subtitle: "Securing the digital future.",
      description: "This high school research project delved into the performance of cryptographic algorithms like SHA-1, SHA-2, and SHA-3. By analyzing their efficiency and security, it contributed valuable insights to the field of cybersecurity, laying the foundation for further exploration into how we protect digital information."
    }
  ]

  return (
    <main className="min-h-screen bg-black">
      <Nav />
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              What can we build today?
            </h1>
            <p className="text-gray-400 max-w-2xl">
              A collection of my various projects spanning technology, research, and community building.
            </p>
          </div>

          <div className="grid gap-16">
            {projects.map((project, index) => (
              <div key={index} className="border-t border-gray-800 pt-8">
                <div className="grid md:grid-cols-[1fr_2fr] gap-8">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">
                      {project.title}
                      {project.status && (
                        <span className="ml-2 text-sm font-normal text-gray-400">
                          ({project.status})
                        </span>
                      )}
                    </h2>
                    {project.subtitle && (
                      <p className="text-gray-400 font-medium mb-4">{project.subtitle}</p>
                    )}
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-400">{project.description}</p>
                    {project.link && (
                      <Link 
                        href={project.link}
                        className="inline-flex items-center text-white hover:text-gray-300 transition-colors"
                      >
                        View Project
                        <ArrowUpRight className="ml-1 h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

