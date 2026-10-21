// Retry only before a form is ready or the visitor has entered its iframe.
export function shouldRetryEmbed({ ready, engaged, attempts, elapsed, initialBlank }: { ready: boolean; engaged: boolean; attempts: number; elapsed: number; initialBlank: boolean }) {
  return !ready && !engaged && attempts < 3 && elapsed >= (initialBlank ? 1500 : 8000)
}

export function isTallyReadyEvent(event: Pick<MessageEvent, "origin" | "source" | "data">, frameWindow: MessageEventSource | null, formId: string) {
  if (!frameWindow || event.origin !== "https://tally.so" || event.source !== frameWindow || typeof event.data !== "string") return false
  try {
    const message = JSON.parse(event.data)
    return message.event === "Tally.FormLoaded" && message.payload?.formId === formId
  } catch { return false }
}
