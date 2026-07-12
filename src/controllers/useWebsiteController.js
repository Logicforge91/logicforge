import { useCallback, useEffect, useState } from 'react'

export function useWebsiteController() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [activeSection, setActiveSection] = useState('top')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [openFaq, setOpenFaq] = useState(0)
  const theme = 'dark'

  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const toggleFaq = useCallback((index) => {
    setOpenFaq((current) => current === index ? -1 : index)
  }, [])
  const scrollToTop = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [])

  const submitEnquiry = useCallback((event, recipient) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const enquiry = Object.fromEntries(form.entries())
    const errors = {}

    if (!enquiry.name.trim()) errors.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(enquiry.email)) errors.email = 'Please enter a valid email.'
    if (!enquiry.message.trim()) errors.message = 'Please tell us a little about your project.'

    setFormErrors(errors)
    if (Object.keys(errors).length) return

    const subject = encodeURIComponent(`Project enquiry from ${enquiry.name}`)
    const body = encodeURIComponent(
      `Name: ${enquiry.name}\nEmail: ${enquiry.email}\nCompany: ${enquiry.company || 'Not provided'}\nProject type: ${enquiry.projectType}\n\nProject details:\n${enquiry.message}`,
    )
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`
  }, [])

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.12 },
    )

    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element))
    return () => revealObserver.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
  }, [theme])

  useEffect(() => {
    const handleKeyboard = (event) => {
      if (event.key === 'Escape') closeMenu()
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        document.querySelector('#contact input')?.focus()
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
      }
    }
    window.addEventListener('keydown', handleKeyboard)
    return () => window.removeEventListener('keydown', handleKeyboard)
  }, [closeMenu])

  useEffect(() => {
    const sections = [...document.querySelectorAll('section[id]')]
    const sectionObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: '-35% 0px -55% 0px' },
    )
    sections.forEach((section) => sectionObserver.observe(section))

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(scrollable > 0 ? Math.min((window.scrollY / scrollable) * 100, 100) : 0)
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    return () => {
      sectionObserver.disconnect()
      window.removeEventListener('scroll', updateProgress)
    }
  }, [])

  return { menuOpen, toggleMenu, closeMenu, formErrors, submitEnquiry, activeSection, scrollProgress, openFaq, toggleFaq, scrollToTop }
}
