"use client"

import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { ScrollySection } from "@/components/scrolly-section"
import { ScrollyFullText } from "@/components/scrolly-full-text"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import uiDemo from "@/assets/ui-demo.png"
import pinecone from "@/assets/pinecone-dark-mode-logo.jpeg"
import linkedin from "@/assets/linkedin-job-data.png"
import reddit from "@/assets/reddit-data-img.png"
import dataAnalyst from "@/assets/data-analyst-data-img.png"
import twitter from "@/assets/tweets-data-img.png"
import sampleVec from "@/assets/sample-record.png"
import records from "@/assets/pinecode-record-count.png"
import query from "@/assets/twitter-data-pinecone.png"
import report from "@/assets/career-report.png"
import ragProcess from "@/assets/rag-process.png"
import methods from "@/assets/other-methods.png"
import cosine from "@/assets/cosine-similarity.jpg"
import embedding from "@/assets/word-embedding.png"
import ragExample from "@/assets/example-app.png"
import softmax from "@/assets/softmax.png"

export default function RAGInPractice() {
  const [activePage, setActivePage] = useState("all-about-rag")

  const renderContent = () => {
    switch (activePage) {
      case "all-about-rag":
        return <AllAboutRAG setActivePage={setActivePage} />
      case "future-u-bts":
        return <FutureUBTS />
      case "future-u":
        return <FutureU />
      default:
        return <AllAboutRAG setActivePage={setActivePage} />
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

function NavButton({ children, active, onClick }: { 
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
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

function AllAboutRAG({ setActivePage }: { setActivePage: (page: string) => void }) {
  return (
    <div className="max-w-4xl mx-auto px-3">
      <ScrollyFullText>
        <div className="min-h-screen flex items-center">
          <div className="w-full">
            <h2 className="text-4xl font-bold mb-8">What is Retrieval-Augmented Generation?</h2>
            <p className="text-gray-400 text-xl leading-relaxed mb-6">
              Retrieval-Augmented Generation (RAG) helps Large Language Models (LLMs) like ChatGPT give more accurate answers by connecting them to external knowledge sources. 
            </p>
            <p className="text-gray-400 text-xl leading-relaxed mb-6">
              LLMs are great at generating text, but they sometimes "hallucinate" or provide inaccurate information. RAG fixes this by using mathematical techniques like vector embeddings and cosine similarity metrics to connect LLMs to the relevant sections of external databases. 
            </p>
            <p className="text-gray-400 text-xl leading-relaxed">
              This makes the results more reliable and useful.
            </p>
          </div>
        </div>
      </ScrollyFullText>

      <ScrollySection
        illustration={
          <Image 
            src={ragProcess}
              alt="RAG process"
              className="rounded-lg"
          />
        }
      >
        <h1 className="text-2xl font-bold mb-4">How RAG Works</h1>
        <p className="text-gray-400">
          RAG systems follow three main steps:
        </p>
        <ol className="list-decimal list-inside text-gray-400 mt-2">
          <li><strong>Retrieval:</strong> The system searches for relevant information by converting both the query and potential answers into mathematical vectors. It then calculates which vectors are closest in multi-dimensional space using cosine similarity.</li>
          <br />
          <li><strong>Augmentation:</strong> The retrieved information is added to your question using ranking algorithms to prioritize the most relevant content. This can be a simple rule-based algorithm or a more complex ML model.</li>
          <br />
          <li><strong>Generation:</strong> The model uses probability distributions to predict the best response, considering both its training and the retrieved context. This mathematical approach ensures the most relevant information is used in the final answer.</li>
        </ol>
        <p className="text-gray-400 mt-2">
          RAG systems can work with different types of data, like plain text, PDFs, or even databases. For example, when working with a PDF, the system might extract tables or use code to query the data.
        </p>
      </ScrollySection>

      <ScrollySection
        illustration={
          <Image 
            src={methods}
              alt="Other methods to improve LLMs"
              className="rounded-lg"
          />
        }
      >
        <h2 className="text-2xl font-bold mb-4">Other Methods to Improve LLMs</h2>
        <p className="text-gray-400">
          RAG is not the only way to improve LLMs. Here are three common methods:
        </p>
        <ul className="list-disc list-inside text-gray-400 mt-2">
          <li><strong>Prompt Engineering:</strong> Involves writing better questions or prompts to guide the model. For example, adding "Explain it step by step" to a math question.</li>
          <li><strong>Fine-Tuning (FT):</strong> Involves retraining the model with new data to improve specific skills. For instance, training the model with medical data to answer health-related questions.</li>
          <li><strong>RAG:</strong> Uses external sources to give the model real-time access to new information.</li>
        </ul>
        <p className="text-gray-400 mt-2">
          Each method has its strengths. Prompt engineering is quick and simple. Fine-tuning creates highly specialized models. RAG is flexible and provides up-to-date information.
        </p>
      </ScrollySection>
      <h1 className="text-2xl font-bold mb-4">The Math Behind RAG</h1>
      <ScrollySection
        illustration={
          <Image 
            src={embedding}
              alt="Embedding spaces"
              className="rounded-lg"
          />
        }
      >
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-white">1. Embedding Spaces</h3>
            <p className="text-gray-400">
            RAG works by converting text into vectors (embeddings) in a multi-dimensional space using algorithms like <strong>Word2Vec</strong>. </p>
            <p className="text-gray-400">Word2Vec, for example, is a two-layer neural network that processes text by taking in batches of raw textual data, analyzing the relationships between words, and producing a vector space with several hundred dimensions. In this space, similar words or phrases are represented as vectors that are close together.</p>
            <br />
            <p className="text-gray-400">For instance, the phrase <i> "tall building"</i> might be represented as [0.8, 0.3, 0.9], while the word <i>"skyscraper"</i> could become [0.9, 0.2, 0.8]. The closeness of these vectors in the multi-dimensional space shows their semantic similarity. This numerical representation enables mathematical comparison of 
            text similarity using metrics like <strong><i>cosine similarity</i></strong>. By leveraging such embeddings, RAG can efficiently retrieve and compare relevant data.</p>
          </div>
        </div>
      </ScrollySection>

      <ScrollySection
        illustration={
          <Image 
            src= {cosine}
              alt="Cosine similarity"
              className="rounded-lg"
          />
        }
      >
        <div className="space-y-6">

          <div>
            <h3 className="text-xl font-semibold mb-2 text-white">2. Cosine Similarity</h3>
            <br />  
            <p className="text-gray-400">
              Cosine similarity measures how similar two vectors are by calculating the cosine of the angle between them.
            </p>
            <br />
            <p className="text-gray-400">
              The formula is:
            </p>
            <div className="bg-gray-800 p-4 rounded-md my-2 font-mono text-sm">
              similarity = (v·u) / (||v|| ||u||)
            </div>
            <br />
            <p className="text-gray-400">
              This produces a score between -1 and 1, where 1 means identical and -1 means opposite. RAG uses this to find the most similar documents to the query.
            </p>
          </div>
        </div>
      </ScrollySection>

      <ScrollySection
        illustration={
          <Image 
            src={softmax}
              alt="Softmax function"
              className="rounded-lg"
          />
        }
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-white">3. Ranking Algorithms</h3>
            <p className="text-gray-400 mb-4">
              When a query vector (user input) is compared against a database of vectors, RAG follows these steps:
            </p>
            <ol className="list-decimal list-inside text-gray-400 space-y-2 mb-6">
              <li>Compute the similarity scores using cosine similarity</li>
              <li>Sort theresults in descending order (highest similarity first)</li>
              <li>Return the top k results as most relevant</li>
            </ol>

            <h4 className="text-lg font-semibold mb-2 text-white">Normalization and Softmax</h4>
            <p className="text-gray-400 mb-4">
              The above was a simple rule-based algorithm. If we want to refine the similarity scores, RAG can use:
            </p>
            
            <div className="bg-gray-800 p-4 rounded-md my-4">
              <p className="text-gray-300 font-mono mb-2">Softmax Function:</p>
              <p className="text-gray-300 font-mono">
                P(document_i) = exp(score_i) / Σ exp(score_j)
              </p>
            </div>

            <p className="text-gray-400 mb-4">
              The softmax function converts similarity scores into probabilities, which can be useful when you want probabilistic rankings rather than raw similarity scores.
            </p>
          </div>
        </div>
      </ScrollySection>

      <h1 className="text-2xl font-bold mb-4">The Math Behind LLMs</h1>
      <ScrollySection
        illustration={
          <svg viewBox="0 0 200 200" className="w-full h-auto">
            {/* Neural network-like illustration */}
            <circle cx="40" cy="40" r="8" fill="#4299E1" />
            <circle cx="40" cy="100" r="8" fill="#4299E1" />
            <circle cx="40" cy="160" r="8" fill="#4299E1" />
            
            <circle cx="100" cy="70" r="8" fill="#48BB78" />
            <circle cx="100" cy="130" r="8" fill="#48BB78" />
            
            <circle cx="160" cy="100" r="8" fill="#ECC94B" />
            
            {/* Connections */}
            <path d="M40 40 L100 70 M40 40 L100 130" stroke="white" strokeWidth="2" opacity="0.5" />
            <path d="M40 100 L100 70 M40 100 L100 130" stroke="white" strokeWidth="2" opacity="0.5" />
            <path d="M40 160 L100 70 M40 160 L100 130" stroke="white" strokeWidth="2" opacity="0.5" />
            <path d="M100 70 L160 100 M100 130 L160 100" stroke="white" strokeWidth="2" opacity="0.5" />
          </svg>
        }
      >
       
        <div className="space-y-6">
          <div>
          <p className="text-gray-400">
            Since RAG supports LLMs, let's review the math behind large language models as well.
            </p>
            <br />
            <h3 className="text-xl font-semibold mb-2 text-white">1. Attention Mechanism</h3>
            <p className="text-gray-400">
              The attention mechanism is a key component of transformers, calculating how much focus to put on different parts of the input. The formula for attention uses the softmax function we just described:
            </p>
            <div className="bg-gray-800 p-4 rounded-md my-2 font-mono text-sm">
              Attention(Q, K, V) = softmax((QK^T)/√d_k)V
            </div>
            <p className="text-gray-400">
              Where Q (Query), K (Key), and V (Value) are matrices, and d_k is the dimension of the keys. This allows the model to weigh the importance of different words in context.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-white">2. Loss Functions</h3>
            <p className="text-gray-400">
              LLMs typically use cross-entropy loss for training, which measures the difference between predicted and actual word probabilities:
            </p>
            <div className="bg-gray-800 p-4 rounded-md my-2 font-mono text-sm">
              Loss = -Σ y_true * log(y_pred)
            </div>
            <p className="text-gray-400">
              Where y_true is the actual word distribution and y_pred is the model's prediction. This helps the model learn to predict the next word accurately.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-white">3. Position Encoding</h3>
            <p className="text-gray-400">
              To maintain word order information, transformers use positional encodings:
            </p>
            <div className="bg-gray-800 p-4 rounded-md my-2 font-mono text-sm">
              PE(pos,2i) = sin(pos/10000^(2i/d_model))
              PE(pos,2i+1) = cos(pos/10000^(2i/d_model))
            </div>
            <p className="text-gray-400">
              This adds position information to each word embedding, helping the model understand word order in sentences.
            </p>
          </div>
        </div>
      </ScrollySection>

      <ScrollySection
        illustration={
          <Image 
            src={ragExample}
              alt="RAG example"
              className="rounded-lg"
          />
        }
      >
        <h2 className="text-2xl font-bold mb-4">Examples of RAG in Action</h2>
        <ul className="list-disc list-inside text-gray-400 space-y-4">
          
          <li>
            <strong>Technical Documentation:</strong> When searching through code documentation:
            <ol className="list-decimal list-inside ml-6 mt-2">
              <li>Embeddings capture both natural language and code syntax</li>
              <li>Distance metrics find similar code examples</li>
              <li>Ranking ensures the most relevant examples appear first</li>
            </ol>
          </li>
          <li>
            <strong>Personalized Relevant Guidance:</strong> Future U!!
            <ol className="list-decimal list-inside ml-6 mt-2">
              <p className="text-gray-400">
                You can take a look at the process used to develop Future U in the{' '}
                <button 
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setActivePage("future-u-bts");
                  }}
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Future U BTS
                </button>{' '}
                section.
              </p>
            </ol>
          </li>
        </ul>
      </ScrollySection>
 
    </div>
  )
}

function FutureUBTS() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-4xl font-bold mb-8 text-center">Behind the Scenes: How I Built Future U</h2>
      
      <p className="text-gray-400 mb-12">
        In building Future U as my final project for MTH 354, I wanted a solution that could help users explore tailored career paths by leveraging <strong>Retrieval-Augmented Generation (RAG)</strong> and <strong>Large Language Models (LLMs)</strong>. Here's a breakdown of how it all came together – from tools to data to the math that makes it work.
      </p>

      {/* Sections */}
      <div className="space-y-16">
        <Section
          title="1. Building the User Interface"
          content={`I started with the user interface (UI), creating a clean and intuitive experience to support our AI models. I used Next.js and Typescript for the UI as these are commonly used and have useful frameworks. Once the UI was ready, I turned to the core functionality – integrating RAG with an LLM to give the user personalized insights.`}
        />

      <div className="my-8">
        <Image 
          src={uiDemo}
          alt="Screenshot showing the Future U user interface with a dark theme, featuring a welcome message and career journey button"
          className="rounded-lg"
        />
        <p className="text-gray-400 text-sm italic mt-2 text-center">
          The landing page of Future U
        </p>
      </div>

        <Section
          title="2. Implementing RAG and LLM"
          content={`To make this project efficient and scalable, I opted for established tools:
          
          • OpenAI's API for the LLM: Building a custom large language model would have been time-consuming and resource-intensive. OpenAI's GPT model is cost-efficient, reliable and flexible out of the box.
          
          • Pinecone for RAG: Pinecone served as the vector database where I uploaded our data. It allowed for efficient similarity search using cosine similarity (described and explained this in "All about RAG")`}
        />

        <div className="my-8">
          <Image 
            src={pinecone}
              alt="Screenshot showing the Future U user interface with a dark theme, featuring a welcome message and career journey button"
              className="rounded-lg"
          />
          <p className="text-gray-400 text-sm italic mt-2 text-center">
            Pinecone logo (Vector Database)
          </p>
        </div>

        <Section
          title="3. Preparing the Data"
          content={`Good results require good data, so I focused on gathering diverse datasets:

          • LinkedIn Job Descriptions: A dataset with varied job roles with their descriptions, which detail what employers are looking for and responsibilities.
          
          • Data Analyst Job Descriptions: Similar to LinkedIn jobs data set but focused on data analyst jobs
          
          • Reddit Career Guidance Subreddit: I scraped 1,000 posts from this subreddit, where people share real-world career advice and stories.
          
          • Twitter Posts: Scraped approximately 200 tweets gathered under keywords like "career tips," "intern tips," and "career guidance."
          
          While the datasets were small due to time and cost constraints (API scraping tools are very pricey!), they provided a solid foundation.`}
        />

        <div className="grid grid-cols-2 gap-8 my-8">
          <div>
            <Image src={linkedin} alt="LinkedIn dataset visualization" className="rounded-lg w-full" />
            <p className="text-gray-400 text-sm italic mt-2 text-center">LinkedIn Job Descriptions Dataset</p>
          </div>
          <div>
            <Image src={dataAnalyst} alt="Data Analyst jobs dataset visualization" className="rounded-lg w-full" />
            <p className="text-gray-400 text-sm italic mt-2 text-center">Data Analyst Jobs Dataset</p>
          </div>
          <div>
            <Image src={reddit} alt="Reddit career advice dataset visualization" className="rounded-lg w-full" />
            <p className="text-gray-400 text-sm italic mt-2 text-center">Reddit Career Advice Dataset</p>
          </div>
          <div>
            <Image src={twitter} alt="Twitter career tips dataset visualization" className="rounded-lg w-full" />
            <p className="text-gray-400 text-sm italic mt-2 text-center">Twitter Career Tips Dataset</p>
          </div>
        </div>

        <Section
          title="4. Data Cleaning and Uploading"
          content={`Once the data was collected, I wrote a script to clean it – removing irrelevant content and special characters. Clean data is crucial because any garbage in the system would affect the quality of the output. After preprocessing, I uploaded the data to Pinecone using an SQL script. Each piece of text was converted into a vector using vector embedding.`}
        />

        <div className="my-8">
          <Image 
            src={sampleVec}
              alt="Screenshot showing the Future U user interface with a dark theme, featuring a welcome message and career journey button"
              className="rounded-lg"
          />
          <p className="text-gray-400 text-sm italic mt-2 text-center">
            Sample vector embedding of a record (vector under 'Values')
          </p>
        </div>

        <Section
          title="5. How RAG Works in Future U"
          content={`When a user takes a quiz on the website, their answers are combined into a single user profile document. This is where all the RAG magic happens:

          1. Vectorizing the User Profile: The user profile is transformed into a vector using the same process as the datasets.
          
          2. Querying Pinecone: The vectorized profile is sent as a query to Pinecone. Pinecone compares this query using cosine similarity.
          
          3. Selecting Relevant Data: Pinecone ranks the top matches by cosine similarity. We take the top 5 most similar records as the most relevant career data.`}
        />

        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <p className="text-gray-300 font-mono">
            Reminder:
          </p>
          <br></br>
          <p className="text-gray-300 font-mono">
            Cosine Similarity = (A · B) / (||A|| ||B||)
          </p>
          <ul className="text-gray-400 mt-4 space-y-2">
            <li>• A and B are the two vectors being compared</li>
            <li>• Cosine similarity of 1 is identical vectors</li>
            <li>• Cosine similarity of 0 is orthogonal vectors</li>
            <li>• Cosine similarity of -1 is opposite vectors</li>
          </ul>
          <br></br>
          <p className="text-gray-300 font-mono">
            measures the cosine of the angle between two vectors
          </p>
        </div>

        <div className="my-8">
          <Image 
            src={query}
              alt="Screenshot showing the Future U user interface with a dark theme, featuring a welcome message and career journey button"
              className="rounded-lg"
          />
          <p className="text-gray-400 text-sm italic mt-2 text-center">
            Example query to vector database to find similar records (cosine similarity under 'Score')
          </p>
        </div>

        <Section
          title="6. Combining RAG with the LLM"
          content={`The next step is integrating this retrieved data with the LLM:
          
          • The user profile and the top 5 retrieved career data points are combined into a single input.
          • This input, along with a carefully crafted prompt, is sent to OpenAI's LLM.
          • The LLM processes everything and generates a personalized career report for the user.`}
        />

        <Section
          title="7. Presenting the Results"
          content={`The final response from the LLM is shown to the user as their career report. I added a transparent layer where we can also view the retrieved data that contributed to the final report. This way, we can verify the relevance of the data and see how the selected data shaped the output.`}
        />

<div className="my-8">
          <Image 
            src={report}
              alt="Screenshot showing the Future U user interface with a dark theme, featuring a welcome message and career journey button"
              className="rounded-lg"
          />
          <p className="text-gray-400 text-sm italic mt-2 text-center">
            Career guidance report with personalized user profile and retrieved career data
          </p>
        </div>

        <Section
          title="8. Future Improvements"
          content={`While the project works well, there's room for improvement:
          
          • Expanding the Datasets: Adding larger and more diverse datasets will improve the quality and relevance of results.
          • Improving the Retrieval Process: Fine-tuning the vector embeddings or exploring hybrid search techniques.
          • Lower-Cost Data Scraping: Building efficient pipelines for collecting larger datasets without breaking the bank.`}
        />

        <Section
          title="Conclusion"
          content={`Building Future U in just four weeks was an incredible learning experience. I dove deep into the math behind RAG and LLMs, reading research papers like "Attention is All You Need" and "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks".

          For the first time, I wasn't just coding—I truly understood the math behind the models and what good results look like mathematically. Seeing theory come to life and putting it into practice was so exciting.
          
          I'm proud of what I built and excited for the future because I believe Future U can genuinely help students like me find the career guidance they need. This project has shown me what's possible when you combine learning, research, and real-world applications.`}
        />

        <Section
          title="...and that's the story of Future U!!"
          content={`You can play around with Future U on the next page.`}
        />
      </div>
    </div>
  )
}

// Helper component for sections
function Section({ title, content }: { title: string; content: string }) {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
      <div className="text-gray-400 space-y-4">
        {content.split('\n\n').map((paragraph, i) => (
          <p key={i} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}

function FutureU() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Future U</h2>
      <p className="text-gray-400 mb-6">
        Now you can take a look and play around with Future U. Future U uses RAG and LLMs to help you create your personalized and relevantcareer development roadmap.
      </p>
      <div className="flex justify-center">
        <Link 
          href="https://v0-future-u-pidzngoahqa.vercel.app" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors"
        >
          Visit Future U
        </Link>
      </div>
    </div>
  )
}

