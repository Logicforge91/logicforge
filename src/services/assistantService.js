export async function getAssistantReply(messages, signal) {
  const response = await fetch('/api/assistant', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
    signal,
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(payload.error || 'The assistant is unavailable.')
  return payload.reply
}

export const assistantSuggestions = [
  'Can you build a Laravel REST API?',
  'Do you work with Java and Spring Boot?',
  'Can you optimize a slow MySQL application?',
]
