"use client"

import { FileText, Minus, Square, X } from "lucide-react"
import styles from "./home.module.css"

export function WindowBar({ title, warm = false, onMinimize, onMaximize, onClose, maximized = false }: { title: string; warm?: boolean; onMinimize?: () => void; onMaximize?: () => void; onClose?: () => void; maximized?: boolean }) {
  return <div className={`${styles.windowBar} ${warm ? styles.warmBar : ""}`}>
    <FileText size={14} aria-hidden="true" /><span>{title}</span><span className={styles.barLines} aria-hidden="true" />
    {(onMinimize || onMaximize || onClose) && <span className={styles.windowControls}>
      {onMinimize && <button type="button" onClick={onMinimize} aria-label={`Minimize ${title}`}><Minus size={13} aria-hidden="true" /></button>}
      {onMaximize && <button type="button" onClick={onMaximize} aria-label={`${maximized ? "Restore" : "Maximize"} ${title}`}><Square size={11} aria-hidden="true" /></button>}
      {onClose && <button type="button" onClick={onClose} aria-label={`Close ${title}`}><X size={13} aria-hidden="true" /></button>}
    </span>}
  </div>
}

