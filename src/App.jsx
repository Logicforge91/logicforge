import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUpRight, Braces, Check, Code2, Menu, MoveRight, Sparkles, X, Zap } from 'lucide-react'

const services = [
  { number: '01', title: 'Product engineering', text: 'From first sketch to production scale, we design and build digital products people want to use.', icon: Code2 },
  { number: '02', title: 'AI & automation', text: 'We turn your workflows into intelligent systems that move faster, learn, and create leverage.', icon: Sparkles },
  { number: '03', title: 'Digital transformation', text: 'Modern architecture, connected data, and focused strategy for companies ready for what’s next.', icon: Zap },
]

const projects = [
  { name: 'Nexora', type: 'AI Operations Platform', result: '3.4× faster decisions', color: 'violet', mark: 'N' },
  { name: 'Arcway', type: 'Financial Infrastructure', result: '62% less manual work', color: 'lime', mark: 'A' },
  { name: 'Morrow', type: 'Climate Intelligence', result: 'From idea to Series A', color: 'orange', mark: 'M' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible')),
      { threshold: 0.12 },
    )
    document.querySelectorAll('.reveal').forEach((el) => reveal.observe(el))
    return () => reveal.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <main>
      <header className="nav-wrap">
        <a className="brand" href="#top" aria-label="LogicForge home">
          <span className="brand-mark"><Braces size={22} strokeWidth={2.8} /></span>
          <span>LogicForge</span>
        </a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Start a project <ArrowUpRight size={16} /></a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="orbit orbit-one" aria-hidden="true" />
        <div className="orbit orbit-two" aria-hidden="true" />
        <div className="hero-content">
          <div className="eyebrow"><span /> Independent technology studio · India / Worldwide</div>
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
          <p>LogicForge is a team of strategists, designers, and engineers. We solve complex problems with clarity, craft, and code—turning bold ideas into products built to last.</p>
          <a className="text-link" href="#contact">How we work <MoveRight size={18} /></a>
        </div>
      </section>

      <section className="services section-pad" id="services">
        <div className="section-heading reveal">
          <div className="section-kicker light"><span>02</span> What we do</div>
          <h2>Built for the<br /><em>next move.</em></h2>
        </div>
        <div className="service-list">
          {services.map(({ number, title, text, icon: Icon }) => (
            <article className="service reveal" key={title}>
              <span className="service-number">{number}</span>
              <div className="service-icon"><Icon /></div>
              <h3>{title}</h3>
              <p>{text}</p>
              <a href="#contact" aria-label={`Learn about ${title}`}><ArrowUpRight /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="work section-pad" id="work">
        <div className="work-heading reveal">
          <div>
            <div className="section-kicker"><span>03</span> Selected work</div>
            <h2>Proof, not<br /><em>promises.</em></h2>
          </div>
          <p>A few of the ideas we’ve helped shape, launch, and scale into meaningful businesses.</p>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className={`project reveal project-${index + 1}`} key={project.name}>
              <div className={`project-visual ${project.color}`}>
                <span className="project-mark">{project.mark}</span>
                <span className="project-index">0{index + 1} / 03</span>
                <ArrowUpRight className="project-arrow" />
              </div>
              <div className="project-meta">
                <div><h3>{project.name}</h3><p>{project.type}</p></div>
                <span>{project.result}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="numbers">
        <div className="number reveal"><strong>40<span>+</span></strong><p>Products shipped</p></div>
        <div className="number reveal"><strong>12</strong><p>Industries transformed</p></div>
        <div className="number reveal"><strong>8<span>yr</span></strong><p>Building what's next</p></div>
        <div className="number reveal"><strong>92<span>%</span></strong><p>Clients return</p></div>
      </section>

      <section className="process section-pad">
        <div className="process-main reveal">
          <div className="section-kicker light"><span>04</span> The process</div>
          <h2>Clear thinking.<br /><em>Sharp execution.</em></h2>
          <p>Small senior teams. Direct communication. No black boxes.</p>
        </div>
        <ol className="steps reveal">
          <li><span>01</span><div><h3>Discover</h3><p>We get to the heart of the problem.</p></div></li>
          <li><span>02</span><div><h3>Define</h3><p>We align the product, people, and path.</p></div></li>
          <li><span>03</span><div><h3>Build</h3><p>We design and engineer in tight loops.</p></div></li>
          <li><span>04</span><div><h3>Scale</h3><p>We launch, learn, and keep improving.</p></div></li>
        </ol>
      </section>

      <section className="quote section-pad">
        <div className="quote-mark">“</div>
        <blockquote className="reveal">LogicForge didn't feel like a vendor. They challenged our thinking, understood the business, and built something better than we imagined.</blockquote>
        <div className="quote-person reveal"><span>RK</span><p><strong>Rohan Khanna</strong><br />Founder, Nexora</p></div>
      </section>

      <section className="contact section-pad" id="contact">
        <div className="contact-orb" aria-hidden="true" />
        <div className="section-kicker light reveal"><span>05</span> Start something</div>
        <div className="contact-content reveal">
          <p>Have an idea worth building?</p>
          <h2>Let's make it<br /><em>real.</em></h2>
          <a className="contact-button" href="mailto:hello@logicforge.dev">hello@logicforge.dev <ArrowUpRight /></a>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><span className="brand-mark"><Braces size={20} /></span>LogicForge</a>
        <p>Strategy · Design · Engineering</p>
        <div><a href="#top">LinkedIn</a><a href="#top">Instagram</a><a href="#top">Dribbble</a></div>
        <small>© {new Date().getFullYear()} LogicForge. All systems go.</small>
      </footer>
    </main>
  )
}

export default App
