import { ArrowDown, ArrowUp, ArrowUpRight, Braces, Check, ChevronDown, Code2, Headphones, Mail, Menu, MoveRight, Sparkles, X, Zap } from 'lucide-react'
import { useWebsiteController } from '../controllers/useWebsiteController.js'
import { websiteModel } from '../models/websiteModel.js'
import AINetwork from './components/AINetwork.jsx'

const serviceIcons = { code: Code2, sparkles: Sparkles, zap: Zap, support: Headphones }

function WebsiteView() {
  const { menuOpen, toggleMenu, closeMenu, formErrors, submitEnquiry, activeSection, scrollProgress, openFaq, toggleFaq, scrollToTop } = useWebsiteController()
  const { company, services, engagements, capabilities, technologyStack, clientBenefits, process, faqs, contact } = websiteModel

  return (
    <main>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress / 100})` }} aria-hidden="true" />
      <header className="nav-wrap">
        <a className="brand" href="#top" aria-label="LogicForge home">
          <span className="brand-mark"><Braces size={22} strokeWidth={2.8} /></span>
          <span>{company.name}</span>
        </a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          <a href="#services" className={activeSection === 'services' ? 'active' : ''} aria-current={activeSection === 'services' ? 'location' : undefined} onClick={closeMenu}>Services</a>
          <a href="#engagements" className={activeSection === 'engagements' ? 'active' : ''} aria-current={activeSection === 'engagements' ? 'location' : undefined} onClick={closeMenu}>How we help</a>
          <a href="#about" className={activeSection === 'about' ? 'active' : ''} aria-current={activeSection === 'about' ? 'location' : undefined} onClick={closeMenu}>About</a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Hire LogicForge <ArrowUpRight size={16} /></a>
        </nav>
        <button className="menu-button" onClick={toggleMenu} aria-label="Toggle navigation" aria-expanded={menuOpen}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <section className="hero" id="top" aria-labelledby="main-content">
        <AINetwork />
        <figure className="hero-media" aria-label="Concept visualization of an AI-enabled software platform">
          <img src="/images/logicforge-ai-platform.png" width="1774" height="887" alt="Abstract AI data platform with connected information flowing through glass interface panels" fetchPriority="high" />
        </figure>
        <div className="hero-grid" aria-hidden="true" />
        <div className="orbit orbit-one" aria-hidden="true" />
        <div className="orbit orbit-two" aria-hidden="true" />
        <div className="hero-content">
          <div className="eyebrow"><span /> {contact.availability}</div>
          <h1 id="main-content">Backend systems built for <em>real business.</em></h1>
          <div className="hero-bottom">
            <p>Freelance PHP, Laravel, Java, Spring Boot, REST API, MySQL, and production support—with direct developer collaboration.</p>
            <div className="hero-actions">
              <a className="primary-action" href="#contact">Get a project estimate <ArrowUpRight size={18} /></a>
              <a className="secondary-action" href="#services">Explore services <ArrowDown size={17} /></a>
            </div>
          </div>
        </div>
        <div className="hero-code product-preview" aria-label="Example project delivery dashboard">
          <div className="preview-top"><span><i /> LogicForge delivery</span><b>Live</b></div>
          <div className="preview-body">
            <p>Product release</p><h3>Customer Portal 2.0</h3>
            <div className="progress"><span /></div>
            <div className="preview-stats"><div><small>SPRINT</small><strong>08</strong></div><div><small>COMPLETED</small><strong>84%</strong></div></div>
            <ul><li><Check size={14} /> Design system</li><li><Check size={14} /> API integration</li><li><span /> Production release</li></ul>
          </div>
        </div>
      </section>

      <section className="client-benefits" aria-label="Benefits of working with LogicForge">
        {clientBenefits.map((benefit) => (
          <article key={benefit.title}>
            <Check size={17} aria-hidden="true" />
            <div><strong>{benefit.title}</strong><p>{benefit.text}</p></div>
          </article>
        ))}
      </section>

      <section className="intro section-pad" id="about">
        <div className="section-kicker reveal"><span>01</span> What we believe</div>
        <div className="intro-copy reveal">
          <p>Built around your business.</p>
          <h2>Useful software.<br /><em>Measurable progress.</em></h2>
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
          <p>Hire LogicForge for a complete website, a reliable backend, or flexible freelance support for an existing project.</p>
        </div>
        <div className="project-grid">
          {engagements.map((engagement, index) => (
            <article className={`project reveal project-${index + 1}`} key={engagement.name}>
              <div className="project-visual">
                <img src={engagement.image} width={engagement.width} height={engagement.height} alt={engagement.alt} loading="lazy" decoding="async" />
                <span className="project-shade" aria-hidden="true" />
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

      <section className="technology section-pad" id="technology">
        <div className="technology-heading reveal">
          <div className="section-kicker"><span>04</span> Technology stack</div>
          <h2>Tools selected for<br /><em>reliable delivery.</em></h2>
          <p>Backend technologies and engineering practices used to build, optimize, and support production systems.</p>
        </div>
        <div className="technology-grid reveal">
          {technologyStack.map((group) => (
            <article key={group.category}>
              <h3>{group.category}</h3>
              <div>{group.items.map((item) => <span key={item}>{item}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="process section-pad">
        <div className="process-main reveal">
          <div className="section-kicker light"><span>05</span> The process</div>
          <h2>Clear thinking.<br /><em>Sharp execution.</em></h2>
          <p>Direct communication with the developer doing the work. Clear milestones, working releases, and no black boxes.</p>
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

      <section className="faq section-pad" id="faq">
        <div className="faq-heading reveal">
          <div className="section-kicker"><span>06</span> Common questions</div>
          <h2>Before we<br /><em>get started.</em></h2>
          <p>Useful answers about working with LogicForge.</p>
        </div>
        <div className="faq-list reveal">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index
            return (
              <article className={isOpen ? 'faq-item open' : 'faq-item'} key={faq.question}>
                <button type="button" onClick={() => toggleFaq(index)} aria-expanded={isOpen} aria-controls={`faq-answer-${index}`}>
                  <span>{faq.question}</span><ChevronDown size={20} />
                </button>
                <div className="faq-answer" id={`faq-answer-${index}`} aria-hidden={!isOpen}><p>{faq.answer}</p></div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="contact section-pad" id="contact">
        <div className="contact-orb" aria-hidden="true" />
        <div className="section-kicker light reveal"><span>07</span> Start something</div>
        <div className="contact-layout">
          <div className="contact-content reveal">
            <p>Have an idea worth building?</p>
            <h2>Let's make it<br /><em>real.</em></h2>
            <a className="contact-email" href={`mailto:${contact.email}`}><Mail size={17} /> {contact.email}</a>
            <small>{contact.location}<br />{contact.address}<br />{contact.phone}</small>
          </div>
          <form className="contact-form reveal" onSubmit={(event) => submitEnquiry(event, contact.email)} noValidate>
            <div className="form-row">
              <label>Name<input name="name" autoComplete="name" placeholder="Your name" aria-describedby="name-error" aria-invalid={Boolean(formErrors.name)} /></label>
              <label>Work email<input name="email" type="email" autoComplete="email" placeholder="you@company.com" aria-describedby="email-error" aria-invalid={Boolean(formErrors.email)} /></label>
            </div>
            <div className="form-errors"><span id="name-error">{formErrors.name}</span><span id="email-error">{formErrors.email}</span></div>
            <label>Company <span>(optional)</span><input name="company" autoComplete="organization" placeholder="Company name" /></label>
            <label>What can we help with?
              <select name="projectType" defaultValue="Business website">
                <option>Business website</option><option>Laravel or PHP application</option><option>Java or Spring Boot service</option><option>REST API or integration</option><option>Database optimization</option><option>Production support</option><option>Something else</option>
              </select>
            </label>
            <label>Project details<textarea name="message" rows="4" placeholder="What are you building, and what would success look like?" aria-describedby="message-error" aria-invalid={Boolean(formErrors.message)} /></label>
            <span className="field-error" id="message-error">{formErrors.message}</span>
            <button type="submit">Prepare enquiry <ArrowUpRight size={18} /></button>
            <p className="form-note">Submitting opens your email app. Your information is not stored by this website.</p>
            <p className="keyboard-hint"><kbd>Ctrl</kbd> <span>+</span> <kbd>K</kbd> to jump here anytime</p>
          </form>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><span className="brand-mark"><Braces size={20} /></span>{company.name}</a>
        <p>PHP · Laravel · Java · Spring · REST APIs</p>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
        <small>© {new Date().getFullYear()} {company.name}. All rights reserved.</small>
      </footer>
      <button className={scrollProgress > 18 ? 'back-to-top visible' : 'back-to-top'} type="button" onClick={scrollToTop} aria-label="Back to top"><ArrowUp size={18} /></button>
    </main>
  )
}

export default WebsiteView
