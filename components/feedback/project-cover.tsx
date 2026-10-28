"use client"

import { useEffect, useRef, useState } from "react"
import styles from "./project-cover.module.css"

export async function uploadProjectCover(image: Blob) {
  const response = await fetch("/api/feedback/covers", { method: "POST", headers: { "Content-Type": "image/webp" }, body: image })
  const result = await response.json()
  if (!response.ok) throw new Error(result.error || "Your image couldn’t be uploaded. Try again.")
  return result.id as string
}

async function prepare(file: File) {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) throw new Error("Choose a JPG, PNG or WebP image.")
  if (file.size > 10 * 1024 * 1024) throw new Error("Choose an image under 10 MB.")
  // Reject animated images on the server too; client conversion would otherwise
  // silently flatten an animated WebP/APNG into its first frame.
  const bytes = new Uint8Array(await file.arrayBuffer())
  const text = new TextDecoder("latin1").decode(bytes)
  if ((file.type === "image/webp" && text.includes("ANIM")) || (file.type === "image/png" && text.includes("acTL"))) throw new Error("Choose a still image rather than an animation.")
  const bitmap = await createImageBitmap(file)
  try {
    if (bitmap.width * bitmap.height > 24_000_000) throw new Error("That image has too many pixels. Try a smaller screenshot.")
    if (Math.min(bitmap.width, bitmap.height) < 180 || Math.max(bitmap.width, bitmap.height) < 320) throw new Error("Choose an image at least 320 × 180 pixels.")
    const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height))
    const canvas = document.createElement("canvas")
    canvas.width = Math.round(bitmap.width * scale); canvas.height = Math.round(bitmap.height * scale)
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    const image = await new Promise<Blob>((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error("That image couldn’t be opened.")), "image/webp", .82))
    if (image.type !== "image/webp" || image.size > 2 * 1024 * 1024) throw new Error("Try a smaller screenshot.")
    return image
  } finally { bitmap.close() }
}

export function ProjectCover({ onChange, disabled = false, required = false }: { onChange: (image: Blob | null) => void; disabled?: boolean; required?: boolean }) {
  const [preview, setPreview] = useState("")
  const [error, setError] = useState("")
  const [processing, setProcessing] = useState(false)
  const sequence = useRef(0)
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview) }, [preview])
  return <div className={styles.field}>
    <label>Screenshot or cover image{required ? " *" : ""}<input type="file" accept="image/jpeg,image/png,image/webp" required={required} disabled={disabled || processing} aria-describedby="project-cover-help project-cover-error" onChange={async event => {
      const file = event.currentTarget.files?.[0]; const version = ++sequence.current
      onChange(null); setPreview(""); setError("")
      if (!file) return
      setProcessing(true)
      try { const image = await prepare(file); if (version === sequence.current) { setPreview(URL.createObjectURL(image)); onChange(image) } }
      catch (error) { if (version === sequence.current) setError(error instanceof Error ? error.message : "That image couldn’t be opened. Choose another image.") }
      finally { if (version === sequence.current) setProcessing(false) }
    }} /></label>
    <p id="project-cover-help" className={styles.help}>Show what you’ve made. A wide screenshot works best (16:9). JPG, PNG or WebP, up to 10 MB. We compress it for you. This image appears publicly on your project card.</p>
    {processing && <p role="status">Preparing your image…</p>}
    <p id="project-cover-error" role={error ? "alert" : undefined} className={styles.error}>{error}</p>
    {preview && <figure className={styles.preview}><img src={preview} alt="Your project image, as it will appear in the gallery" /><figcaption>Gallery preview · ready to upload when you save</figcaption></figure>}
  </div>
}

export function ProjectCoverEditor({ onSave, busy }: { onSave: (image: Blob) => Promise<boolean>; busy: boolean }) {
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState<Blob | null>(null)
  const [saving, setSaving] = useState(false)
  return <div className={styles.editor}>{!open ? <button type="button" onClick={() => setOpen(true)}>Add or change project image</button> : <form onSubmit={async event => { event.preventDefault(); if (!image) return; setSaving(true); try { if (await onSave(image)) { setOpen(false); setImage(null) } } finally { setSaving(false) } }}>
    <ProjectCover onChange={setImage} disabled={saving || busy} required />
    <div className={styles.actions}><button type="submit" disabled={!image || saving || busy}>{saving ? "Saving image…" : "Save project image"}</button><button type="button" disabled={saving || busy} onClick={() => { setOpen(false); setImage(null) }}>Cancel</button></div>
  </form>}</div>
}
