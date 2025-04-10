"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  category: string
  date: string
  demoUrl?: string
  githubUrl?: string
  technologies: string[]
}

export function ProjectCard({
  title,
  description,
  image,
  category,
  date,
  demoUrl,
  githubUrl,
  technologies,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Calculate card tilt based on mouse position
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }
    })
  }

  const resetCardTilt = () => {
    if (!cardRef.current) return

    requestAnimationFrame(() => {
      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`
      }
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Card
        ref={cardRef}
        className="overflow-hidden h-full flex flex-col transition-all duration-300 transform-gpu"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          resetCardTilt()
          setIsHovered(false)
        }}
        onMouseEnter={() => setIsHovered(true)}
      >
        <div className="relative overflow-hidden aspect-video">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
            style={{
              backgroundImage: `url(${image})`,
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
            <div className="text-white text-center p-4">
              <p className="font-medium">View Project Details</p>
            </div>
          </div>
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge variant="secondary" className="bg-primary/90 hover:bg-primary text-primary-foreground">
              {category}
            </Badge>
            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
              {date}
            </Badge>
          </div>
        </div>

        <CardHeader>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="flex flex-wrap gap-2 mt-2">
            {technologies.map((tech, index) => (
              <Badge key={index} variant="outline" className="bg-muted">
                {tech}
              </Badge>
            ))}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-grow">
          <p className="text-muted-foreground">{description}</p>
        </CardContent>

        <CardFooter className="flex gap-2 pt-2">
          {demoUrl && (
            <Button asChild variant="default" size="sm" className="flex-1">
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Live Demo</span>
              </a>
            </Button>
          )}
          {githubUrl && (
            <Button asChild variant="outline" size="sm" className="flex-1">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1"
              >
                <Github className="h-4 w-4" />
                <span>Code</span>
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
