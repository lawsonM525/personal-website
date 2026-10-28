"use client"

import { useEffect, useRef, useState } from "react"
import { avatarChoices, defaultAvatar, randomAvatar, type AvatarConfig } from "@/lib/member/avatar"
import type { FeedbackViewer } from "@/lib/feedback"
import { MemberAvatar } from "./member-avatar"
import styles from "./member.module.css"

type ChoiceKey = keyof typeof avatarChoices
const tabs = ["Face", "Hair", "Clothes", "Extras", "Backdrop"] as const
export function AvatarEditor({ viewer, onClose, onSave }: { viewer: FeedbackViewer; onClose: () => void; onSave: (name: string, avatar: AvatarConfig) => Promise<void> }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [avatar, setAvatar] = useState<AvatarConfig>(() => viewer.avatar || defaultAvatar(viewer.display_name))
  const [name, setName] = useState(viewer.display_name)
  const [tab, setTab] = useState<typeof tabs[number]>("Face")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  useEffect(() => { const node = dialog.current; node?.showModal(); return () => node?.close() }, [])
  const update = (key: ChoiceKey, value: string) => setAvatar(current => ({ ...current, [key]: value }))
  function choices(key: ChoiceKey, label: string, color = false) {
    return <fieldset className={styles.choices}><legend>{label}</legend><div className={color ? styles.colors : styles.thumbnails}>{avatarChoices[key].map((value, index) => <button key={value} type="button" aria-label={`${label}: ${value === "none" ? "none" : color ? `#${value}` : index + 1}`} aria-pressed={avatar[key] === value} title={value === "none" ? "None" : `${label} ${index + 1}`} onClick={() => update(key, value)} style={color ? { backgroundColor: `#${value}` } : undefined}>{color ? <span className={styles.colorCheck} aria-hidden="true">{avatar[key] === value ? "✓" : ""}</span> : <><MemberAvatar name="Preview" avatar={{ ...avatar, [key]: value }} size={48} /><span>{value === "none" ? "None" : String(index + 1).padStart(2, "0")}</span></>}</button>)}</div></fieldset>
  }
  return <dialog ref={dialog} className={styles.dialog} aria-labelledby="avatar-editor-title" onCancel={event => { event.preventDefault(); onClose() }}>
    <div className={styles.titlebar}><span id="avatar-editor-title">Your computer portrait</span><button type="button" onClick={onClose} aria-label="Close avatar editor">×</button></div>
    <form onSubmit={async event => { event.preventDefault(); setBusy(true); setError(""); try { await onSave(name, avatar); onClose() } catch (error) { setError(error instanceof Error ? error.message : "Your portrait couldn’t save. Try again.") } finally { setBusy(false) } }}>
      <div className={styles.editor}>
        <aside className={styles.preview}><div className={styles.portraitFrame}><MemberAvatar name={name} avatar={avatar} size={160} /></div><strong>{name || "Your portrait"}</strong><p>A little you, all over this computer.</p><button type="button" onClick={() => setAvatar(randomAvatar())}>Surprise me ↻</button><label>Public name<input value={name} onChange={event => setName(event.target.value)} required minLength={2} maxLength={60} autoComplete="nickname" /></label></aside>
        <div className={styles.customize}><div className={styles.tabs} aria-label="Portrait options">{tabs.map(value => <button type="button" key={value} aria-pressed={tab === value} onClick={() => setTab(value)}>{value}</button>)}</div><div className={styles.options}>
          {tab === "Face" && <>{choices("skinColor", "Skin tone", true)}{choices("eyes", "Eyes")}{choices("mouth", "Expression")}</>}
          {tab === "Hair" && <>{choices("hairColor", "Hair color", true)}{choices("hair", "Hairstyle")}{choices("beard", "Facial hair")}</>}
          {tab === "Clothes" && <>{choices("clothingColor", "Outfit color", true)}{choices("clothing", "Outfit")}</>}
          {tab === "Extras" && <>{choices("glasses", "Glasses")}{choices("hat", "Hat")}{choices("accessories", "Earrings")}</>}
          {tab === "Backdrop" && choices("backgroundColor", "Background color", true)}
        </div></div>
      </div>
      {error && <p className={styles.error} role="alert">{error}</p>}
      <footer className={styles.editorFooter}><p>Shows up on your comments, reviews & projects.</p><button type="button" onClick={onClose}>Cancel</button><button type="submit" className={styles.save} disabled={busy}>{busy ? "Saving…" : "Save portrait"}</button></footer>
    </form>
  </dialog>
}
