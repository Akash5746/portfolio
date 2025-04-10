"use client"

import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"

interface ParticleTextProps {
  text: string
  subText?: string
  textColor?: string
  subTextColor?: string
}

export default function ParticleText({
  text = "AKASH MISHRA",
  subText = "",
  textColor = "#0ea5e9",
  subTextColor = "#f97316",
}: ParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)
  const requestRef = useRef<number>()
  const particlesRef = useRef<any[]>([])
  const targetPointsRef = useRef<{ x: number; y: number }[]>([])

  useEffect(() => {
    setIsMounted(true)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full size of its container
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.offsetWidth
        canvas.height = container.offsetHeight
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create text points
    const createTextPoints = (text: string, offsetY = 0, fontSize = 100) => {
      ctx.font = `bold ${fontSize}px Arial, sans-serif`
      ctx.fillStyle = "white"

      // Center text
      const metrics = ctx.measureText(text)
      const textWidth = metrics.width
      const x = (canvas.width - textWidth) / 2
      const y = canvas.height / 2 + offsetY

      ctx.fillText(text, x, y)

      // Get pixels
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const pixels = imageData.data
      const points = []

      // Sample points from text (skip pixels for performance)
      const sampleRate = 3 // Higher means fewer particles

      for (let i = 0; i < canvas.width; i += sampleRate) {
        for (let j = 0; j < canvas.height; j += sampleRate) {
          const index = (j * canvas.width + i) * 4
          // If pixel is not transparent
          if (pixels[index + 3] > 128) {
            points.push({
              x: i,
              y: j,
            })
          }
        }
      }

      // Clear canvas after sampling
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      return points
    }

    // Create particles
    const createParticles = (points: { x: number; y: number }[], color: string) => {
      return points.map((point) => {
        // Start particles at random positions around the canvas
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          targetX: point.x,
          targetY: point.y,
          vx: 0,
          vy: 0,
          color: color,
          size: 1.5 + Math.random(),
          speed: 0.01 + Math.random() * 0.03,
        }
      })
    }

    // Get points for main text and subtext
    const mainTextPoints = createTextPoints(text, -20, Math.min(80, canvas.width * 0.15))
    const subTextPoints = subText ? createTextPoints(subText, 60, Math.min(50, canvas.width * 0.1)) : []

    // Create particles
    const mainTextParticles = createParticles(mainTextPoints, textColor)
    const subTextParticles = createParticles(subTextPoints, subTextColor)

    // Combine all particles
    particlesRef.current = [...mainTextParticles, ...subTextParticles]
    targetPointsRef.current = [...mainTextPoints, ...subTextPoints]

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        // Calculate direction to target
        const dx = particle.targetX - particle.x
        const dy = particle.targetY - particle.y

        // Apply forces with slight easing
        particle.vx = dx * particle.speed
        particle.vy = dy * particle.speed

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })

      requestRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    requestRef.current = requestAnimationFrame(animate)

    // Handle mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      particlesRef.current.forEach((particle) => {
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          // Push particles away from mouse
          const angle = Math.atan2(dy, dx)
          const force = ((100 - distance) / 100) * 5
          particle.x -= Math.cos(angle) * force
          particle.y -= Math.sin(angle) * force
        }
      })
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    // Clean up
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isMounted, text, subText, textColor, subTextColor, theme])

  if (!isMounted) return null

  return <canvas ref={canvasRef} className="w-full h-full" />
}
