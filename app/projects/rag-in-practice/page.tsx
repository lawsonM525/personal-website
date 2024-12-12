"use client"

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { ScrollySection } from "@/components/scrolly-section"
import { useState } from "react"
import Link from "next/link"

export default function RAGInPractice() {
  const [activePage, setActivePage] = useState("all-about-rag")

  const renderContent = () => {
    switch (activePage) {
      case "all-about-rag":
        return <AllAboutRAG />
      case "future-u-bts":
        return <FutureUBTS />
      case "future-u":
        return <FutureU />
      default:
        return <AllAboutRAG />
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Nav />
      <div className="pt-20 pb-16">
        <h1 className="text-4xl font-bold text-center mb-8">RAG in Practice</h1>
        <div className="flex justify-center space-x-4 mb-8">
          <NavButton active={activePage === "all-about-rag"} onClick={() => setActivePage("all-about-rag")}>
            All About RAG
          </NavButton>
          <NavButton active={activePage === "future-u-bts"} onClick={() => setActivePage("future-u-bts")}>
            Future U BTS
          </NavButton>
          <NavButton active={activePage === "future-u"} onClick={() => setActivePage("future-u")}>
            Future U
          </NavButton>
        </div>
        {renderContent()}
      </div>
      <Footer />
    </main>
  )
}

function NavButton({ children, active, onClick }) {
  return (
    <button
      className={`px-4 py-2 rounded-md transition-colors ${
        active ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function AllAboutRAG() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <ScrollySection
        illustration={
          <svg viewBox="0 0 200 200" className="w-full h-auto">
            <rect x="20" y="20" width="160" height="160" fill="#4A5568" />
            <circle cx="100" cy="100" r="60" fill="#48BB78" />
            <path d="M70 100 L130 100 M100 70 L100 130" stroke="white" strokeWidth="4" />
          </svg>
        }
      >
        <h2 className="text-2xl font-bold mb-4">What is Retrieval-Augmented Generation (RAG)?</h2>
        <p className="text-gray-400">
          Retrieval-Augmented Generation (RAG) helps Large Language Models (LLMs) like ChatGPT become smarter by connecting them to external knowledge sources. LLMs are good at generating text, but they can make mistakes or provide outdated information. RAG fixes this by letting LLMs access accurate and up-to-date data from external databases. This makes the results more reliable and useful.
        </p>
        <p className="text-gray-400 mt-2">
          Think of RAG as combining the LLM's built-in knowledge with extra information from outside sources. This combination allows the model to handle tasks better, especially when it needs specific or current data.
        </p>
      </ScrollySection>

      <ScrollySection
        illustration={
          <svg viewBox="0 0 200 200" className="w-full h-auto">
            <rect x="10" y="10" width="60" height="60" fill="#4299E1" />
            <rect x="130" y="10" width="60" height="60" fill="#48BB78" />
            <rect x="70" y="130" width="60" height="60" fill="#ECC94B" />
            <path d="M40 70 L40 160 L130 160" stroke="white" strokeWidth="4" fill="none" />
            <path d="M160 70 L160 115 L100 115" stroke="white" strokeWidth="4" fill="none" />
          </svg>
        }
      >
        <h2 className="text-2xl font-bold mb-4">How RAG Works</h2>
        <p className="text-gray-400">
          RAG systems follow three main steps:
        </p>
        <ol className="list-decimal list-inside text-gray-400 mt-2">
          <li><strong>Retrieval:</strong> The system searches for the most relevant information in a database or document collection. For example, if you ask about "the tallest building," RAG finds the latest details from sources like Wikipedia or a news website.</li>
          <li><strong>Augmentation:</strong> The retrieved information is added to your question, creating a detailed query for the model. For instance, "What is the tallest building?" becomes "What is the tallest building according to the latest data on skyscrapers?"</li>
          <li><strong>Generation:</strong> The model uses this detailed query to create a response that combines its own knowledge with the new information. For example: "The tallest building is the Burj Khalifa, standing at 828 meters."</li>
        </ol>
        <p className="text-gray-400 mt-2">
          RAG systems can work with different types of data, like plain text, PDFs, or even databases. For example, when working with a PDF, the system might extract tables or use code to query the data.
        </p>
      </ScrollySection>

      <ScrollySection
        illustration={
          <svg viewBox="0 0 200 200" className="w-full h-auto">
            <circle cx="50" cy="50" r="40" fill="#4299E1" />
            <circle cx="150" cy="50" r="40" fill="#48BB78" />
            <circle cx="100" cy="150" r="40" fill="#ECC94B" />
            <line x1="50" y1="50" x2="150" y2="50" stroke="white" strokeWidth="4" />
            <line x1="50" y1="50" x2="100" y2="150" stroke="white" strokeWidth="4" />
            <line x1="150" y1="50" x2="100" y2="150" stroke="white" strokeWidth="4" />
          </svg>
        }
      >
        <h2 className="text-2xl font-bold mb-4">How RAG Compares to Other Methods</h2>
        <p className="text-gray-400">
          RAG is not the only way to improve LLMs. Here are three common methods:
        </p>
        <ul className="list-disc list-inside text-gray-400 mt-2">
          <li><strong>Prompt Engineering:</strong> Involves writing better questions or prompts to guide the model. For example, adding "Explain it step by step" to a math question.</li>
          <li><strong>Fine-Tuning (FT):</strong> Involves retraining the model with new data to improve specific skills. For instance, training the model with medical data to answer health-related questions.</li>
          <li><strong>RAG:</strong> Uses external sources to give the model real-time access to new information. For example, instead of memorizing medical facts, RAG fetches the latest research articles.</li>
        </ul>
        <p className="text-gray-400 mt-2">
          Each method has its strengths. Prompt engineering is quick and simple. Fine-tuning creates highly specialized models. RAG is flexible and provides up-to-date information.
        </p>
      </ScrollySection>

      <ScrollySection
        illustration={
          <svg viewBox="0 0 200 200" className="w-full h-auto">
            <path d="M20 180 L100 20 L180 180 Z" fill="none" stroke="white" strokeWidth="4" />
            <circle cx="100" cy="20" r="10" fill="#4299E1" />
            <circle cx="20" cy="180" r="10" fill="#48BB78" />
            <circle cx="180" cy="180" r="10" fill="#ECC94B" />
          </svg>
        }
      >
        <h2 className="text-2xl font-bold mb-4">Key Math Concepts Behind RAG</h2>
        <p className="text-gray-400">
          RAG relies on math to find and rank the best information. Here are the main concepts:
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2 text-white">1. Cosine Similarity</h3>
        <p className="text-gray-400">
          Cosine similarity measures how similar two pieces of information are. It compares their "angles" in a multi-dimensional space. The result is a score between -1 and 1. Higher scores mean the information is more similar.
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2 text-white">2. Distance Metrics</h3>
        <p className="text-gray-400">
          Distance metrics measure how far apart two data points are. Smaller distances mean the data points are more similar. Types include Euclidean Distance and Cosine Distance.
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2 text-white">3. Ranking Algorithms</h3>
        <p className="text-gray-400">
          Ranking algorithms organize results by relevance. They make sure the most useful information comes first. Types include Rule-based Ranking and Model-based Ranking.
        </p>
      </ScrollySection>

      <ScrollySection
        illustration={
          <svg viewBox="0 0 200 200" className="w-full h-auto">
            <rect x="20" y="20" width="160" height="160" rx="20" ry="20" fill="#4A5568" />
            <circle cx="70" cy="70" r="30" fill="#4299E1" />
            <circle cx="130" cy="70" r="30" fill="#48BB78" />
            <circle cx="70" cy="130" r="30" fill="#ECC94B" />
            <circle cx="130" cy="130" r="30" fill="#F56565" />
          </svg>
        }
      >
        <h2 className="text-2xl font-bold mb-4">Examples of RAG in Action</h2>
        <ul className="list-disc list-inside text-gray-400">
          <li><strong>Searching for Facts:</strong> RAG fetches the latest information to ensure accuracy when answering questions like "What is the capital of Ghana?"</li>
          <li><strong>Handling PDFs:</strong> RAG can extract data from PDF tables to answer queries like "Show me revenue growth from last year's report."</li>
          <li><strong>Answering Technical Questions:</strong> RAG retrieves relevant articles and combines them with the model's knowledge to explain complex topics like how neural networks work.</li>
          <li><strong>Customer Support Chatbots:</strong> RAG retrieves exact steps from a company's help center to provide accurate instructions for tasks like password resets.</li>
          <li><strong>Academic Research:</strong> RAG pulls papers or articles from trusted sources to provide detailed answers on topics like the latest advancements in AI.</li>
        </ul>
      </ScrollySection>

      <ScrollySection
        illustration={
          <svg viewBox="0 0 200 200" className="w-full h-auto">
            <circle cx="100" cy="100" r="80" fill="#4A5568" />
            <path d="M60 100 A40 40 0 0 1 140 100" fill="none" stroke="white" strokeWidth="4" />
            <circle cx="60" cy="100" r="10" fill="#4299E1" />
            <circle cx="140" cy="100" r="10" fill="#48BB78" />
            <path d="M85 130 L115 130" stroke="white" strokeWidth="4" />
          </svg>
        }
      >
        <h2 className="text-2xl font-bold mb-4">Why Use RAG?</h2>
        <p className="text-gray-400">
          RAG improves the accuracy and relevance of answers by pulling from trusted sources. It's like having a personal assistant that reads books and articles to help you answer questions. This makes it useful for tasks like research, customer support, or even learning new topics.
        </p>
        <p className="text-gray-400 mt-2">
          By combining simple math concepts like cosine similarity with smart ranking algorithms, RAG helps LLMs deliver better answers. Whether you're searching for facts, analyzing data, or exploring technical topics, RAG ensures you get the most accurate and relevant information.
        </p>
      </ScrollySection>
    </div>
  )
}

function FutureUBTS() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Future U Behind the Scenes</h2>
      <p className="text-gray-400">
        This section will contain behind-the-scenes information about the Future U project. Content coming soon.
      </p>
    </div>
  )
}

function FutureU() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Future U</h2>
      <p className="text-gray-400">
        This section will showcase the Future U project. Content coming soon.
      </p>
    </div>
  )
}

