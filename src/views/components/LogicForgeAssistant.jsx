import { useEffect, useReducer, useRef } from 'react'
import { Bot, Send, Sparkles, X } from 'lucide-react'
import { assistantSuggestions, getAssistantReply } from '../../services/assistantService.js'

const initialState = {
  open: false,
  typing: false,
  messages: [{ id: 1, role: 'bot', text: 'Hi — I’m the LogicForge website assistant. What would you like to know?' }],
}

function reducer(state, action) {
  switch (action.type) {
    case 'toggle': return { ...state, open: !state.open }
    case 'close': return { ...state, open: false }
    case 'ask': return { ...state, typing: true, messages: [...state.messages, action.message] }
    case 'reply': return { ...state, typing: false, messages: [...state.messages, action.message] }
    case 'error': return { ...state, typing: false, messages: [...state.messages, action.message] }
    default: return state
  }
}

function LogicForgeAssistant() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const inputRef = useRef(null)
  const messageListRef = useRef(null)

  useEffect(() => {
    if (state.open) window.setTimeout(() => inputRef.current?.focus(), 100)
  }, [state.open])

  useEffect(() => {
    messageListRef.current?.scrollTo({ top: messageListRef.current.scrollHeight, behavior: 'smooth' })
  }, [state.messages, state.typing])

  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && dispatch({ type: 'close' })
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const ask = async (text) => {
    const question = text.trim()
    if (!question || state.typing) return
    dispatch({ type: 'ask', message: { id: crypto.randomUUID(), role: 'user', text: question } })
    const apiMessages = [...state.messages, { role: 'user', text: question }].map((message) => ({
      role: message.role === 'bot' ? 'assistant' : 'user',
      content: message.text,
    }))
    try {
      const reply = await getAssistantReply(apiMessages)
      dispatch({ type: 'reply', message: { id: crypto.randomUUID(), role: 'bot', text: reply } })
    } catch (error) {
      dispatch({ type: 'error', message: { id: crypto.randomUUID(), role: 'error', text: error.message } })
    }
  }

  const submit = (event) => {
    event.preventDefault()
    const input = new FormData(event.currentTarget).get('question')
    ask(input)
    event.currentTarget.reset()
  }

  return (
    <aside className={state.open ? 'assistant open' : 'assistant'}>
      {state.open && (
        <section className="assistant-panel" role="dialog" aria-label="LogicForge assistant" aria-modal="false">
          <header><span><i><Sparkles size={16} /></i><b>LogicForge Assistant</b></span><button onClick={() => dispatch({ type: 'close' })} aria-label="Close assistant"><X size={18} /></button></header>
          <div className="assistant-status"><span /> Online · Website guide</div>
          <div className="assistant-messages" ref={messageListRef} aria-live="polite">
            {state.messages.map((message) => <p className={message.role} key={message.id}>{message.text}</p>)}
            {state.typing && <div className="typing" aria-label="Assistant is typing"><i /><i /><i /></div>}
          </div>
          {state.messages.length < 3 && <div className="assistant-suggestions">{assistantSuggestions.map((suggestion) => <button onClick={() => ask(suggestion)} key={suggestion}>{suggestion}</button>)}</div>}
          <form onSubmit={submit}><input ref={inputRef} name="question" placeholder="Ask about LogicForge…" autoComplete="off" aria-label="Your question" /><button type="submit" disabled={state.typing} aria-label="Send question"><Send size={17} /></button></form>
          <small>Automated website guide · No personal data required</small>
        </section>
      )}
      <button className="assistant-launcher" onClick={() => dispatch({ type: 'toggle' })} aria-expanded={state.open} aria-label={state.open ? 'Close assistant' : 'Open LogicForge assistant'}>
        {state.open ? <X /> : <Bot />}<span>{state.open ? 'Close' : 'Ask LogicForge'}</span>
      </button>
    </aside>
  )
}

export default LogicForgeAssistant
