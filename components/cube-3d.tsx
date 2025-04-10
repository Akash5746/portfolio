"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, PerspectiveCamera } from "@react-three/drei"
import { MathUtils } from "three"

interface SkillCubeProps {
  skills: string[]
  colors: string[]
}

function Cube({ skills, colors }: SkillCubeProps) {
  const meshRef = useRef()
  const [hover, setHover] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  useFrame((state) => {
    if (meshRef.current) {
      // Auto rotation when not hovered
      if (!hover) {
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      } else {
        // When hovered, rotate to show the active face
        meshRef.current.rotation.x = MathUtils.lerp(meshRef.current.rotation.x, rotation.x, 0.1)
        meshRef.current.rotation.y = MathUtils.lerp(meshRef.current.rotation.y, rotation.y, 0.1)
      }
    }
  })

  const handlePointerOver = (index: number) => {
    setHover(true)
    setActiveIndex(index)

    // Set rotation to show the active face
    switch (index) {
      case 0: // front
        setRotation({ x: 0, y: 0 })
        break
      case 1: // back
        setRotation({ x: 0, y: Math.PI })
        break
      case 2: // top
        setRotation({ x: -Math.PI / 2, y: 0 })
        break
      case 3: // bottom
        setRotation({ x: Math.PI / 2, y: 0 })
        break
      case 4: // left
        setRotation({ x: 0, y: -Math.PI / 2 })
        break
      case 5: // right
        setRotation({ x: 0, y: Math.PI / 2 })
        break
    }
  }

  return (
    <group ref={meshRef} onPointerLeave={() => setHover(false)}>
      {/* Cube faces */}
      {[...Array(6)].map((_, index) => {
        // Position and rotation for each face
        let position = [0, 0, 0]
        let rotation = [0, 0, 0]

        switch (index) {
          case 0: // front
            position = [0, 0, 1.01]
            break
          case 1: // back
            position = [0, 0, -1.01]
            rotation = [0, Math.PI, 0]
            break
          case 2: // top
            position = [0, 1.01, 0]
            rotation = [-Math.PI / 2, 0, 0]
            break
          case 3: // bottom
            position = [0, -1.01, 0]
            rotation = [Math.PI / 2, 0, 0]
            break
          case 4: // left
            position = [-1.01, 0, 0]
            rotation = [0, -Math.PI / 2, 0]
            break
          case 5: // right
            position = [1.01, 0, 0]
            rotation = [0, Math.PI / 2, 0]
            break
        }

        return (
          <mesh key={index} position={position} rotation={rotation} onPointerOver={() => handlePointerOver(index)}>
            <planeGeometry args={[2, 2]} />
            <meshStandardMaterial
              color={colors[index % colors.length]}
              metalness={0.5}
              roughness={0.2}
              transparent
              opacity={0.9}
            />
            <Text
              position={[0, 0, 0.1]}
              fontSize={0.4}
              color="#ffffff"
              font="/fonts/Inter_Bold.json"
              anchorX="center"
              anchorY="middle"
              maxWidth={1.8}
              textAlign="center"
            >
              {skills[index % skills.length]}
            </Text>
          </mesh>
        )
      })}

      {/* Cube body */}
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#000000" metalness={0.8} roughness={0.2} transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

export default function Cube3D({ skills, colors }: SkillCubeProps) {
  return (
    <Canvas dpr={[1, 2]}>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Cube skills={skills} colors={colors} />
    </Canvas>
  )
}
