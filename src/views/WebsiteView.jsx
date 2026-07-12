import { ArrowDown, ArrowUpRight, Braces, Check, Code2, Mail, Menu, MoveRight, Sparkles, X, Zap } from 'lucide-react'
import { useWebsiteController } from '../controllers/useWebsiteController.js'
import { websiteModel } from '../models/websiteModel.js'

const serviceIcons = { code: Code2, sparkles: Sparkles, zap: Zap }

function WebsiteView() {
  const { menuOpen, toggleMenu, closeMenu, formErrors, submitEnquiry } = useWebsiteController()
  const { company, services, engagements, capabilities, process, contact } = websiteModel

  return (
    <main>
      <header className="nav-wrap">
        <a className="brand" href="#top" aria-label="LogicForge home">
          <span className="brand-mark"><Braces size={22} strokeWidth={2.8} /></span>
          <span>{company.name}</span>
        </a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#engagements" onClick={closeMenu}>How we help</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Start a project <ArrowUpRight size={16} /></a>
        </nav>
        <button className="menu-button" onClick={toggleMenu} aria-label="Toggle navigation" aria-expanded={menuOpen}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="orbit orbit-one" aria-hidden="true" />
        <div className="orbit orbit-two" aria-hidden="true" />
        <div className="hero-content">
          <div className="eyebrow"><span /> {contact.availability}</div>
          <h1>Ideas,<br /><em>engineered.</em></h1>
          <div className="hero-bottom">
            <p>We build intelligent digital products for ambitious companies who refuse to stand still.</p>
            <a className="circle-link" href="#services" aria-label="Explore our services"><ArrowDown /></a>
          </div>
        </div>
        <div className="hero-code" aria-hidden="true">
          <span className="code-label">BUILD STATUS</span>
          <div className="code-line"><i>01</i><b>forge</b>(idea)</div>
          <div className="code-line"><i>02</i>&nbsp;&nbsp;.shape(strategy)</div>
          <div className="code-line"><i>03</i>&nbsp;&nbsp;.ship(<strong>impact</strong>);</div>
          <div className="code-status"><Check size={15} /> Systems online</div>
        </div>
      </section>

      <section className="intro section-pad" id="about">
        <div className="section-kicker reveal"><span>01</span> What we believe</div>
        <div className="intro-copy reveal">
          <p>Technology should do more than work.</p>
          <h2>It should move your<br />business <em>forward.</em></h2>
        </div>
        <div className="intro-side reveal">
          <p>{company.description} One focused team takes your product from a clear business problem to a reliable release.</p>
          <a className="text-link" href="#contact">How we work <MoveRight size={18} /></a>
        </div>
      </section>

      <section className="services section-pad" id="services">
        <div className="section-heading reveal">
          <div className="section-kicker light"><span>02</span> What we do</div>
          <h2>Built for the<br /><em>next move.</em></h2>
        </div>
        <div className="service-list">
          {services.map(({ number, title, text, icon }) => {
            const Icon = serviceIcons[icon]
            return (
            <article className="service reveal" key={title}>
              <span className="service-number">{number}</span>
              <div className="service-icon"><Icon /></div>
              <h3>{title}</h3>
              <p>{text}</p>
              <a href="#contact" aria-label={`Learn about ${title}`}><ArrowUpRight /></a>
            </article>
            )
          })}
        </div>
      </section>

      <section className="work section-pad" id="engagements">
        <div className="work-heading reveal">
          <div>
            <div className="section-kicker"><span>03</span> Ways to work together</div>
            <h2>Start where<br /><em>you are.</em></h2>
          </div>
          <p>Choose a focused engagement or bring us a difficult product problem. We shape the right scope together before any build begins.</p>
        </div>
        <div className="project-grid">
          {engagements.map((engagement, index) => (
            <article className={`project reveal project-${index + 1}`} key={engagement.name}>
              <div className={`project-visual ${engagement.color}`}>
                <span className="project-mark">{engagement.mark}</span>
                <span className="project-index">0{index + 1} / 03</span>
                <ArrowUpRight className="project-arrow" />
              </div>
              <div className="project-meta">
                <div><h3>{engagement.name}</h3><p>{engagement.type}</p></div>
                <span>{engagement.detail}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="numbers">
        {capabilities.map(({ value, label }) => (
          <div className="number reveal" key={label}>
            <strong>{value}</strong><p>{label}</p>
          </div>
        ))}
      </section>

      <section className="process section-pad">
        <div className="process-main reveal">
          <div className="section-kicker light"><span>04</span> The process</div>
          <h2>Clear thinking.<br /><em>Sharp execution.</em></h2>
          <p>Small senior teams. Direct communication. No black boxes.</p>
        </div>
        <ol className="steps reveal">
          {process.map(({ number, title, text }) => (
            <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></li>
          ))}
        </ol>
      </section>

      <section className="quote section-pad" aria-labelledby="promise-title">
        <div className="quote-mark"><Braces /></div>
        <blockquote className="reveal" id="promise-title">Senior attention, transparent progress, and software your team can own.</blockquote>
        <div className="principles reveal"><span>No hidden handoffs</span><span>Weekly working releases</span><span>Clear documentation</span></div>
      </section>

      <section className="contact section-pad" id="contact">
        <div className="contact-orb" aria-hidden="true" />
        <div className="section-kicker light reveal"><span>05</span> Start something</div>
        <div className="contact-layout">
          <div className="contact-content reveal">
            <p>Have an idea worth building?</p>
            <h2>Let's make it<br /><em>real.</em></h2>
            <a className="contact-email" href={`mailto:${contact.email}`}><Mail size={17} /> {contact.email}</a>
            <small>{contact.location}<br />{contact.address}<br />{contact.phone}</small>
          </div>
          <form className="contact-form reveal" onSubmit={(event) => submitEnquiry(event, contact.email)} noValidate>
            <div className="form-row">
              <label>Name<input name="name" autoComplete="name" placeholder="Your name" aria-describedby="name-error" /></label>
              <label>Work email<input name="email" type="email" autoComplete="email" placeholder="you@company.com" aria-describedby="email-error" /></label>
            </div>
            <div className="form-errors"><span id="name-error">{formErrors.name}</span><span id="email-error">{formErrors.email}</span></div>
            <label>Company <span>(optional)</span><input name="company" autoComplete="organization" placeholder="Company name" /></label>
            <label>What can we help with?
              <select name="projectType" defaultValue="Product engineering">
                <option>Product engineering</option><option>AI & automation</option><option>Digital transformation</option><option>Something else</option>
              </select>
            </label>
            <label>Project details<textarea name="message" rows="4" placeholder="What are you building, and what would success look like?" aria-describedby="message-error" /></label>
            <span className="field-error" id="message-error">{formErrors.message}</span>
            <button type="submit">Prepare enquiry <ArrowUpRight size={18} /></button>
            <p className="form-note">Submitting opens your email app. Your information is not stored by this website.</p>
          </form>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><span className="brand-mark"><Braces size={20} /></span>{company.name}</a>
        <p>Strategy · Design · Engineering</p>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
        <small>© {new Date().getFullYear()} {company.name}. All rights reserved.</small>
      </footer>
    </main>
  )
}

export default WebsiteView
