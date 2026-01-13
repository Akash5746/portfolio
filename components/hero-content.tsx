"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import TextReveal from "@/components/text-reveal";

export default function HeroContent() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="container text-center z-10 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center"
        >
          <TextReveal
            text="AKASH MISHRA"
            className="text-4xl md:text-6xl font-bold tracking-tight mb-2"
            delay={0.5}
          />
          <TextReveal
            text="Software Developer & Computer Science Engineer"
            className="text-xl md:text-2xl text-muted-foreground mb-8"
            delay={0.8}
          />

          <div className="flex flex-wrap gap-4 justify-center mt-4">
            <Button
              asChild
              size="lg"
              className="text-lg relative overflow-hidden group"
            >
              <a href="#projects">
                <span className="relative z-10">View Projects</span>
                <span className="absolute inset-0 bg-primary-foreground/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </a>
            </Button>
            <Button
              variant="outline"
              asChild
              size="lg"
              className="text-lg relative overflow-hidden group"
            >
              <a href="#" className="flex items-center gap-2">
                <Download size={18} />
                <span className="relative z-10">Download Resume</span>
                <span className="absolute inset-0 bg-primary/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
