"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import styles from "./explore.module.css"

const files: Record<string, string> = { learn: "/learn", projects: "/projects", magazine: "/magazine", penpals: "/penpals", about: "/about", research: "/research", posts: "/posts", "10apps": "/10apps", "submit-article": "/learn/submit" }
export function Terminal({ openApp }: { openApp: (id: "paint" | "minesweeper" | "terminal") => void }) {
  const router = useRouter()
  const [history, setHistory] = useState(["Michelle’s Computer [interactive terminal]", "Type help to see the commands."])
  const [command, setCommand] = useState("")
  const output = useRef<HTMLDivElement>(null)
  useEffect(() => { if (output.current) output.current.scrollTop = output.current.scrollHeight }, [history])
  function run(value: string) {
    const clean = value.trim(), [name, ...args] = clean.split(/\s+/), argument = args.join(" ")
    if (!clean) return
    setCommand("")
    if (name === "clear") { setHistory([]); return }
    let lines: string[]
    if (name === "help") lines = ["ls                  list files and programs", "open <name>         open a file or program", "whoami              show the current user", "date                show the local date", "echo <text>         print a line", "clear               clear the terminal", "Example: open paint"]
    else if (name === "ls") lines = [...Object.keys(files).map(file => `[DIR] ${file}`), "[APP] paint", "[APP] minesweeper"]
    else if (name === "whoami") lines = ["guest@michellescomputer"]
    else if (name === "date") lines = [new Date().toLocaleString()]
    else if (name === "echo") lines = [argument]
    else if (name === "open") {
      const target = argument.toLowerCase()
      if (target === "paint" || target === "minesweeper") { openApp(target); lines = [`[open] ${target}`] }
      else if (files[target]) { router.push(files[target]); lines = [`[open] ${files[target]}`] }
      else lines = [`File not found: ${argument || "(no file specified)"}`, "Use ls to see what you can open."]
    } else lines = [`Command not found: ${name}`, "Type help for available commands."]
    setHistory(previous => [...previous, `C:\\MICHELLE>${clean}`, ...lines].slice(-100))
  }
  function submit(event: FormEvent) { event.preventDefault(); run(command) }
  return <div className={styles.terminal}>
    <div ref={output} className={styles.terminalOutput} role="log" aria-label="Terminal output">{history.map((line, index) => <div key={index}>{line || "\u00a0"}</div>)}</div>
    <form onSubmit={submit}><label htmlFor="explorer-terminal-command">C:\MICHELLE&gt;</label><input id="explorer-terminal-command" aria-label="Terminal command" value={command} onChange={event => setCommand(event.target.value)} autoCapitalize="none" autoCorrect="off" spellCheck={false} maxLength={240}/><button type="submit">Run</button></form>
    <div className={styles.terminalHints}><button type="button" onClick={() => run("help")}>help</button><button type="button" onClick={() => run("ls")}>ls</button><button type="button" onClick={() => run("open paint")}>open paint</button></div>
  </div>
}
