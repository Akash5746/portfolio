"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  // Start with a default value (false) to avoid hydration mismatch
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Function to check if mobile
    const checkIfMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 768)
      }
    }

    // Only run in browser environment
    if (typeof window === "undefined") return

    // Initial check
    checkIfMobile()

    // Add event listener with a named function so we can remove it properly
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", checkIfMobile)
      }
    }
  }, [])

  return isMobile
}
