"use client"

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent, type MouseEvent } from "react"
import { useRouter } from "next/navigation"
import { completeTerminal, createTerminalState, executeTerminal, terminalSources, type TerminalApp } from "@/lib/terminal"
import styles from "./explore.module.css"
import terminalStyles from "./terminal.module.css"

const sources = Object.values(terminalSources)

export function Terminal({ openApp }: { openApp: (id: TerminalApp) => void }) {
  const router = useRouter()
  const [transcript, setTranscript] = useState({ lines: ["Michelle’s Computer [interactive terminal]", "Type help to explore, or tutorial for your first commands."], start: 0 })
  const [command, setCommand] = useState("")
  const session = useRef(createTerminalState())
  const recall = useRef(-1)
  const draft = useRef("")
  const output = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const response = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const container = output.current, start = response.current
    if (container && start) container.scrollTop += start.getBoundingClientRect().top - container.getBoundingClientRect().top
    else if (container) container.scrollTop = 0
  }, [transcript])
  function focusPrompt(event: MouseEvent<HTMLDivElement>) {
    if (event.target instanceof Element && event.target.closest("input, button, a, textarea, select, [contenteditable]")) return
    if (window.getSelection()?.toString()) return
    input.current?.focus({ preventScroll: true })
  }
  function append(lines: string[]) {
    setTranscript(previous => {
      const next = [...previous.lines, ...lines].slice(-500)
      return { lines: next, start: Math.max(0, next.length - lines.length) }
    })
  }
  function run(value: string) {
    const clean = value.trim()
    if (!clean) return
    const result = executeTerminal(clean, session.current)
    session.current = result.state
    setCommand(""); recall.current = -1; draft.current = ""
    if (result.clear) setTranscript({ lines: [], start: 0 })
    else append(["", `C:\\MICHELLE>${clean}`, ...result.lines])
    input.current?.focus({ preventScroll: true })
    if (result.action?.type === "app") openApp(result.action.app)
    else if (result.action?.type === "page") router.push(result.action.href)
  }
  function keyboard(event: KeyboardEvent<HTMLInputElement>) {
    if (event.nativeEvent.isComposing) return
    const commands = session.current.commands
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault()
      if (!commands.length) return
      if (recall.current === -1) draft.current = command
      recall.current = event.key === "ArrowUp" ? Math.min(commands.length - 1, recall.current + 1) : Math.max(-1, recall.current - 1)
      setCommand(recall.current < 0 ? draft.current : commands[commands.length - 1 - recall.current])
    } else if (event.key === "Tab" && !event.shiftKey && command.trim()) {
      const choices = completeTerminal(command)
      if (!choices.length) return
      event.preventDefault()
      if (choices.length === 1) setCommand(choices[0] + (choices[0].includes(" ") ? "" : " "))
      else append(["", "Possible completions:", ...choices])
    }
  }
  function submit(event: FormEvent) { event.preventDefault(); run(command) }
  return <div className={styles.terminal} onClick={focusPrompt}>
    <div ref={output} className={styles.terminalOutput} role="log" aria-label="Terminal output">{transcript.lines.map((line, index) => {
      const source = sources.find(source => line === source.url || line === `Source: ${source.url}`)
      return <div key={index} ref={index === transcript.start ? response : undefined}>{source ? <><span>Source: </span><a className={terminalStyles.source} href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a></> : line || "\u00a0"}</div>
    })}</div>
    <form onSubmit={submit}><label htmlFor="explorer-terminal-command">C:\MICHELLE&gt;</label><input ref={input} id="explorer-terminal-command" aria-label="Terminal command" aria-describedby="terminal-keyboard-hint" value={command} onChange={event => { setCommand(event.target.value); recall.current = -1 }} onKeyDown={keyboard} enterKeyHint="go" autoCapitalize="none" autoCorrect="off" spellCheck={false} maxLength={240}/></form>
    <p id="terminal-keyboard-hint" className={terminalStyles.keyboardHint}>↑ ↓ recall commands · Tab autocomplete · Enter run</p>
  </div>
}
