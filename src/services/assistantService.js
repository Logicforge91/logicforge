const intents = [
  {
    keywords: ['service', 'build', 'offer', 'development', 'software'],
    answer: 'LogicForge works on product engineering, AI and workflow automation, and digital modernisation. We can help launch a new product or improve an existing system.',
  },
  {
    keywords: ['ai', 'automation', 'agent', 'workflow'],
    answer: 'Our AI work focuses on practical business outcomes: workflow automation, knowledge assistants, data extraction, system integrations, and human-reviewed AI processes.',
  },
  {
    keywords: ['price', 'cost', 'budget', 'rate', 'quote'],
    answer: 'Project pricing depends on scope, team, and delivery timeline. Share a short project summary in the enquiry form and LogicForge can prepare an appropriate scope and estimate.',
  },
  {
    keywords: ['time', 'timeline', 'long', 'start', 'delivery'],
    answer: 'A typical engagement starts with discovery and scope definition. Smaller MVPs may take several weeks, while larger platforms are delivered in planned phases.',
  },
  {
    keywords: ['contact', 'email', 'phone', 'talk', 'call'],
    answer: 'You can use the enquiry form below or email hello@logicforge.example. The displayed contact information is placeholder content and can be replaced in the website model.',
  },
  {
    keywords: ['technology', 'stack', 'react', 'cloud', 'api'],
    answer: 'LogicForge uses modern web technologies, secure APIs, cloud infrastructure, and AI integrations. The exact stack is selected around product requirements and long-term maintainability.',
  },
]

const fallback = 'I can help with services, AI automation, technology, timelines, pricing, or contacting LogicForge. Try asking one of those questions.'

export function getAssistantReply(message) {
  const normalized = message.toLowerCase().replace(/[^a-z0-9\s]/g, '')
  const matchedIntent = intents
    .map((intent) => ({ ...intent, score: intent.keywords.filter((word) => normalized.includes(word)).length }))
    .sort((a, b) => b.score - a.score)[0]

  return new Promise((resolve) => {
    window.setTimeout(() => resolve(matchedIntent?.score ? matchedIntent.answer : fallback), 650)
  })
}

export const assistantSuggestions = [
  'What services do you offer?',
  'How can AI help my business?',
  'What technology do you use?',
]
