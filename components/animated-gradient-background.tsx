"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

export default function AnimatedGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    handleResize()
    window.addEventListener("resize", handleResize)

    // Create gradient colors based on theme
    const colors =
      theme === "dark" ? ["#0f172a", "#1e293b", "#0c4a6e", "#1e40af"] : ["#f8fafc", "#e0f2fe", "#bae6fd", "#dbeafe"]

    // Create gradient points
    const points = []
    for (let i = 0; i < 4; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 300 + 200,
        color: colors[i],
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      })
    }

    // Animation loop
    const animate = () => {
      // Clear canvas with a base color
      ctx.fillStyle = theme === "dark" ? "#020617" : "#ffffff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw gradient points
      for (const point of points) {
        // Move points
        point.x += point.vx
        point.y += point.vy

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1

        // Draw gradient
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius)
        gradient.addColorStop(0, point.color)
        gradient.addColorStop(1, "transparent")

        ctx.fillStyle = gradient
        ctx.globalAlpha = 0.3
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [mounted, theme])

  if (!mounted) return null

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />
}
