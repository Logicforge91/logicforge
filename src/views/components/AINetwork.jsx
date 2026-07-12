import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 42
const CONNECTION_DISTANCE = 125

function createParticle(width, height) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.28,
    vy: (Math.random() - 0.5) * 0.28,
    radius: Math.random() * 1.8 + 1,
    phase: Math.random() * Math.PI * 2,
  }
}

function AINetwork() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const pointer = { x: -1000, y: -1000, active: false }
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let particles = []
    let width = 0
    let height = 0
    let frameId
    let lastFrame = 0

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = bounds.width
      height = bounds.height
      canvas.width = width * ratio
      canvas.height = height * ratio
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      particles = Array.from({ length: width < 600 ? 24 : PARTICLE_COUNT }, () => createParticle(width, height))
    }

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height)
      const dark = document.documentElement.dataset.theme === 'dark'
      const nodeColor = dark ? '96, 165, 250' : '37, 99, 235'

      particles.forEach((particle, index) => {
        if (!reducedMotion) {
          particle.x += particle.vx
          particle.y += particle.vy
          if (particle.x < 0 || particle.x > width) particle.vx *= -1
          if (particle.y < 0 || particle.y > height) particle.vy *= -1

          if (pointer.active) {
            const dx = pointer.x - particle.x
            const dy = pointer.y - particle.y
            const distance = Math.hypot(dx, dy)
            if (distance < 150 && distance > 1) {
              particle.x -= (dx / distance) * 0.18
              particle.y -= (dy / distance) * 0.18
            }
          }
        }

        particles.slice(index + 1).forEach((other) => {
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y)
          if (distance < CONNECTION_DISTANCE) {
            context.beginPath()
            context.moveTo(particle.x, particle.y)
            context.lineTo(other.x, other.y)
            context.strokeStyle = `rgba(${nodeColor},${(1 - distance / CONNECTION_DISTANCE) * 0.2})`
            context.lineWidth = 0.7
            context.stroke()
          }
        })

        const pulse = reducedMotion ? 1 : 0.75 + Math.sin(time * 0.002 + particle.phase) * 0.25
        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius * pulse, 0, Math.PI * 2)
        context.fillStyle = `rgba(${nodeColor},${0.45 + pulse * 0.35})`
        context.fill()
      })

      if (!reducedMotion && time - lastFrame > 30) lastFrame = time
      if (!reducedMotion) frameId = requestAnimationFrame(draw)
    }

    const updatePointer = (event) => {
      const bounds = canvas.getBoundingClientRect()
      pointer.x = event.clientX - bounds.left
      pointer.y = event.clientY - bounds.top
      pointer.active = true
    }
    const clearPointer = () => { pointer.active = false }

    resize()
    draw()
    window.addEventListener('resize', resize)
    canvas.addEventListener('pointermove', updatePointer)
    canvas.addEventListener('pointerleave', clearPointer)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', updatePointer)
      canvas.removeEventListener('pointerleave', clearPointer)
    }
  }, [])

  return <canvas ref={canvasRef} className="ai-network" aria-hidden="true" />
}

export default AINetwork
