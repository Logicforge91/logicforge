import { useCallback, useEffect, useState } from 'react'

export function useWebsiteController() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])

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

  return { menuOpen, toggleMenu, closeMenu, formErrors, submitEnquiry }
}
