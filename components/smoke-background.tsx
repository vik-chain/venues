"use client"

import { useRef, useEffect } from 'react'

export default function SmokeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // Smoke particle class with reduced intensity
    class SmokeParticle {
      x: number
      y: number
      radius: number
      color: string
      velocity: { x: number, y: number }
      life: number
      opacity: number
      
      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        // Smaller initial radius
        this.radius = Math.random() * 15 + 5
        // More transparent color
        this.color = `rgba(152, 159, 206, ${Math.random() * 0.1})`
        // Slower movement
        this.velocity = {
          x: (Math.random() * 1.5 - 0.75) * 0.7,
          y: (Math.random() * -0.8 - 0.2) * 0.7
        }
        // Shorter lifespan
        this.life = Math.random() * 80 + 60
        // Lower opacity
        this.opacity = Math.random() * 0.3 + 0.1
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color.replace(/[\d\.]+\)$/g, `${this.opacity})`)
        ctx.fill()
      }
      
      update() {
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.life--
        // Slower fade
        this.opacity -= 0.002
        // Slower growth
        this.radius += 0.1
      }
    }
    
    // Mouse tracking
    let mouseX = 0
    let mouseY = 0
    let lastX = 0
    let lastY = 0
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    // Particles array
    const particles: SmokeParticle[] = []
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Only create particles when mouse moves
      if (Math.abs(mouseX - lastX) > 5 || Math.abs(mouseY - lastY) > 5) {
        // Create fewer new particles
        if (Math.random() > 0.5) {
          particles.push(new SmokeParticle(mouseX, mouseY))
        }
        
        lastX = mouseX
        lastY = mouseY
      }
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].draw(ctx)
        
        // Remove dead particles
        if (particles[i].life <= 0 || particles[i].opacity <= 0) {
          particles.splice(i, 1)
          i--
        }
      }
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }} // Reduced overall opacity
    />
  )
} 