"use client"

import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"

interface SkillCardProps {
  name: string
  level: string
  percentage: number
  index: number
}

export default function SkillCard({ name, level, percentage, index }: SkillCardProps) {
  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="flex justify-between">
        <span>{name}</span>
        <span className="text-muted-foreground">{level}</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </motion.div>
  )
}
