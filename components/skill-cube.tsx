"use client"

import { Suspense, useEffect, useState } from "react"
import dynamic from "next/dynamic"

// Create a loading component
const Loading = () => (
  <div className="w-full h-[300px] flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
     
    </div>
  </div>
)

// Define the props interface
interface SkillCubeProps {
  skills: string[]
  colors: string[]
}

// Dynamically import the 3D components with no SSR
const Cube3D = dynamic(() => import("./cube-3d"), {
  ssr: false,
  loading: () => <Loading />,
})

export default function SkillCube(props: SkillCubeProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <Loading />
  }

  return (
    <div className="w-full h-[300px]">
      <Suspense fallback={<Loading />}>
        <Cube3D {...props} />
      </Suspense>
    </div>
  )
}
