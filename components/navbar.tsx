"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Github, Linkedin, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useMobile } from "@/hooks/use-mobile";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const isMobile = useMobile();
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Memoize the scroll handler to avoid recreating it on each render
  const handleScroll = useCallback(() => {
    if (typeof window === "undefined") return;

    // Set navbar background when scrolled
    setIsScrolled(window.scrollY > 10);

    // Find active section
    const sections = navLinks.map((link) => link.href.substring(1));
    sections.unshift("home"); // Add home section

    for (const section of sections.reverse()) {
      // Check from bottom to top
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100) {
          // If section is at top of viewport
          setActiveSection(section);
          break;
        }
      }
    }
  }, []);

  // Handle scroll and set active section
  useEffect(() => {
    // Mark component as mounted
    setMounted(true);

    // Only run in browser environment
    if (typeof window === "undefined") return;

    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    // Cleanup
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  // Smooth scroll to section
  const scrollToSection = useCallback((sectionId: string) => {
    if (typeof document === "undefined") return;

    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Account for navbar height
        behavior: "smooth",
      });
    }
  }, []);

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) return null;

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="font-bold text-xl">
          <Link href="#home" onClick={() => scrollToSection("home")}>
            Akash Mishra
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href.substring(1));
              }}
              className={`transition-colors hover:text-primary ${
                activeSection === link.href.substring(1)
                  ? "text-primary font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* Social Links */}
          <div className="hidden md:flex gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://www.linkedin.com/in/akash-mishra-3a8339231/"
                target="_blank"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com/Akash5746/" target="_blank">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
          </div>

          {/* Contact Button (Desktop) */}
          <Button
            className="hidden md:flex"
            onClick={() => scrollToSection("contact")}
          >
            Get in Touch
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between py-4">
                  <div className="font-bold text-xl">Akash Mishra</div>
                </div>
                <nav className="flex flex-col gap-4 py-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href.substring(1));
                      }}
                      className={`text-lg py-2 transition-colors hover:text-primary ${
                        activeSection === link.href.substring(1)
                          ? "text-primary font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto flex flex-col gap-4">
                  <div className="flex gap-4 justify-center">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href="https://linkedin.com/" target="_blank">
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href="https://github.com/" target="_blank">
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                      </Link>
                    </Button>
                  </div>
                  <Button
                    onClick={() => {
                      scrollToSection("contact");
                      const sheetElement = document.querySelector(
                        '[data-state="open"]'
                      );
                      if (sheetElement) {
                        sheetElement.setAttribute("data-state", "closed");
                      }
                    }}
                  >
                    Get in Touch
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
