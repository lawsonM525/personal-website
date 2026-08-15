"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

type LearnTheme = "light" | "dark"

const LearnThemeContext = createContext<{
  theme: LearnTheme
  toggleTheme: () => void
} | null>(null)

export function LearnThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<LearnTheme>("light")

  useEffect(() => {
    const saved = window.localStorage.getItem("michelles-computer-theme")
    if (saved === "light" || saved === "dark") {
      setTheme(saved)
      return
    }

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) setTheme("dark")
  }, [])

  function toggleTheme() {
    setTheme((current) => {
      const next = current === "light" ? "dark" : "light"
      window.localStorage.setItem("michelles-computer-theme", next)
      return next
    })
  }

  return (
    <LearnThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="learn-shell" data-learn-theme={theme}>{children}</div>
    </LearnThemeContext.Provider>
  )
}

export function LearnThemeToggle() {
  const context = useContext(LearnThemeContext)
  if (!context) return null

  const nextLabel = context.theme === "light" ? "Switch to dark mode" : "Switch to light mode"

  return (
    <button
      type="button"
      onClick={context.toggleTheme}
      aria-label={nextLabel}
      title={nextLabel}
      className="learn-border learn-surface inline-flex h-10 w-10 items-center justify-center border-2 transition-transform hover:-rotate-6"
    >
      {context.theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  )
}
