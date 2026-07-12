import express from 'express'
import OpenAI from 'openai'

const app = express()
const port = Number(process.env.PORT || 8787)
const requests = new Map()
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null

const cleanupTimer = setInterval(() => {
  const cutoff = Date.now() - 60_000
  for (const [key, timestamps] of requests) {
    const recent = timestamps.filter((time) => time > cutoff)
    if (recent.length) requests.set(key, recent)
    else requests.delete(key)
  }
}, 60_000)
cleanupTimer.unref()

app.disable('x-powered-by')
app.use(express.json({ limit: '24kb' }))

app.use('/api', (request, response, next) => {
  const key = request.ip || 'local'
  const now = Date.now()
  const recent = (requests.get(key) || []).filter((time) => now - time < 60_000)
  if (recent.length >= 12) return response.status(429).json({ error: 'Too many requests. Please try again shortly.' })
  recent.push(now)
  requests.set(key, recent)
  next()
})

app.post('/api/assistant', async (request, response) => {
  if (!openai) {
    return response.status(503).json({ error: 'The AI assistant is not configured yet.' })
  }

  const messages = Array.isArray(request.body?.messages) ? request.body.messages : []
  const safeMessages = messages
    .filter((message) => ['user', 'assistant'].includes(message?.role) && typeof message?.content === 'string')
    .slice(-10)
    .map((message) => ({ role: message.role, content: message.content.slice(0, 1500) }))

  if (!safeMessages.length || safeMessages.at(-1).role !== 'user') {
    return response.status(400).json({ error: 'A user message is required.' })
  }

  try {
    const result = await openai.responses.create({
      model: process.env.OPENAI_MODEL || 'gpt-5.6-luna',
      instructions: `You are the website assistant for LogicForge, a product engineering studio. Answer concisely and professionally using only this company context:
- Services: PHP and Java web application development, Laravel and Spring Boot backends, REST API development and integration, database optimization, ongoing support and maintenance.
- Languages and frameworks: PHP 8.x, Java 17, JavaScript, SQL, Laravel, Lumen, Core PHP, Spring Boot, Spring MVC, Spring Security.
- Backend capabilities: REST APIs, JSON, MVC, OOP, microservices, authentication, authorization, JWT, API integrations.
- Data and performance: MySQL, Eloquent ORM, Hibernate/JPA, Redis, schema design, indexing, query tuning, and N+1 query optimization.
- Tools and practices: Git, GitHub, GitLab, Composer, Maven, Postman, Jira, Agile/Scrum, SDLC, code review, and production support.
- Engagements: build a complete website, develop an API or backend, or improve and support an existing website or application.
- Process: discover, define, build, scale.
- Contact email: hello@logicforge.example. This is placeholder company information.
Never invent clients, prices, certifications, employees, project results, or legal claims. If information is unavailable, say so and direct the visitor to the enquiry form. Do not request sensitive personal data.`,
      input: safeMessages,
      max_output_tokens: 350,
    })

    return response.json({ reply: result.output_text })
  } catch (error) {
    console.error('Assistant request failed:', error?.status || error?.message)
    return response.status(error?.status === 429 ? 429 : 502).json({ error: 'The assistant could not respond right now.' })
  }
})

app.listen(port, () => console.log(`LogicForge assistant API listening on http://localhost:${port}`))
