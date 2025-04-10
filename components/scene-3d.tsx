"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, PerspectiveCamera, Environment, Float } from "@react-three/drei"
import { Vector3, MathUtils } from "three"
import { useTheme } from "next-themes"

function FloatingText({ position, text, color, size = 1, rotation = [0, 0, 0] }) {
  const textRef = useRef()
  const [hover, setHover] = useState(false)

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1
      if (hover) {
        textRef.current.rotation.y = MathUtils.lerp(textRef.current.rotation.y, Math.PI * 0.1, 0.1)
      } else {
        textRef.current.rotation.y = MathUtils.lerp(textRef.current.rotation.y, 0, 0.1)
      }
    }
  })

  return (
    <Text
      ref={textRef}
      position={position}
      rotation={rotation}
      fontSize={size}
      color={color}
      font="/fonts/Inter_Bold.json"
      anchorX="center"
      anchorY="middle"
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {text}
    </Text>
  )
}

function FloatingCube({ position, size = [1, 1, 1], color = "#ff0000", speed = 1 }) {
  const meshRef = useRef()
  const [hover, setHover] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.2

      if (hover) {
        meshRef.current.scale.x = MathUtils.lerp(meshRef.current.scale.x, 1.2, 0.1)
        meshRef.current.scale.y = MathUtils.lerp(meshRef.current.scale.y, 1.2, 0.1)
        meshRef.current.scale.z = MathUtils.lerp(meshRef.current.scale.z, 1.2, 0.1)
      } else {
        meshRef.current.scale.x = MathUtils.lerp(meshRef.current.scale.x, 1, 0.1)
        meshRef.current.scale.y = MathUtils.lerp(meshRef.current.scale.y, 1, 0.1)
        meshRef.current.scale.z = MathUtils.lerp(meshRef.current.scale.z, 1, 0.1)
      }
    }
  })

  return (
    <mesh ref={meshRef} position={position} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
    </mesh>
  )
}

function FloatingSphere({ position, radius = 0.5, color = "#ff0000", speed = 1 }) {
  const meshRef = useRef()
  const [hover, setHover] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.2

      if (hover) {
        meshRef.current.scale.x = MathUtils.lerp(meshRef.current.scale.x, 1.2, 0.1)
        meshRef.current.scale.y = MathUtils.lerp(meshRef.current.scale.y, 1.2, 0.1)
        meshRef.current.scale.z = MathUtils.lerp(meshRef.current.scale.z, 1.2, 0.1)
      } else {
        meshRef.current.scale.x = MathUtils.lerp(meshRef.current.scale.x, 1, 0.1)
        meshRef.current.scale.y = MathUtils.lerp(meshRef.current.scale.y, 1, 0.1)
        meshRef.current.scale.z = MathUtils.lerp(meshRef.current.scale.z, 1, 0.1)
      }
    }
  })

  return (
    <mesh ref={meshRef} position={position} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
    </mesh>
  )
}

function Scene() {
  const { theme } = useTheme()
  const cameraRef = useRef()
  const [mousePosition, setMousePosition] = useState(new Vector3(0, 0, 0))

  // Colors based on theme
  const textColor = theme === "dark" ? "#ffffff" : "#000000"
  const primaryColor = "#0ea5e9" // Sky blue
  const secondaryColor = "#8b5cf6" // Purple
  const accentColor = "#f97316" // Orange

  useFrame(({ mouse, viewport }) => {
    // Update mouse position for camera movement
    const x = (mouse.x * viewport.width) / 2
    const y = (mouse.y * viewport.height) / 2
    setMousePosition(new Vector3(x, y, 0))

    // Subtle camera movement based on mouse
    if (cameraRef.current) {
      cameraRef.current.position.x = MathUtils.lerp(cameraRef.current.position.x, mousePosition.x * 0.1, 0.05)
      cameraRef.current.position.y = MathUtils.lerp(cameraRef.current.position.y, mousePosition.y * 0.1 + 1, 0.05)
      cameraRef.current.lookAt(0, 0, 0)
    }
  })

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 1, 5]} fov={50} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />

      <Environment preset="city" />

      {/* Main name text */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text
          position={[0, 0.5, 0]}
          fontSize={0.8}
          color={textColor}
          font="/fonts/Inter_Bold.json"
          anchorX="center"
          anchorY="middle"
          maxWidth={4}
          textAlign="center"
        >
          AKASH MISHRA
        </Text>
      </Float>

      {/* Subtitle */}
      <Text
        position={[0, -0.1, 0]}
        fontSize={0.3}
        color={textColor}
        opacity={0.8}
        font="/fonts/Inter_Regular.json"
        anchorX="center"
        anchorY="middle"
      >
        Software Developer
      </Text>

      {/* Floating skill texts */}
      <FloatingText position={[-2.5, 1.5, -1]} text="Web Dev" color={primaryColor} size={0.3} />
      <FloatingText position={[2.2, 1.2, -2]} text="Python" color={secondaryColor} size={0.3} />
      <FloatingText position={[-1.8, -0.8, -1.5]} text="Data Analytics" color={accentColor} size={0.25} />
      <FloatingText position={[2, -1, -1]} text="Full Stack" color={primaryColor} size={0.3} />

      {/* Floating geometric shapes */}
      <FloatingCube position={[-3, 0.5, -3]} size={[0.4, 0.4, 0.4]} color={primaryColor} speed={0.7} />
      <FloatingCube position={[3, 1, -2]} size={[0.3, 0.3, 0.3]} color={secondaryColor} speed={1.2} />
      <FloatingSphere position={[-2, -1.2, -2]} radius={0.2} color={accentColor} speed={0.9} />
      <FloatingSphere position={[2.5, -0.5, -3]} radius={0.25} color={primaryColor} speed={1.1} />
    </>
  )
}

export default function Scene3D() {
  return (
    <Canvas dpr={[1, 2]} className="bg-transparent">
      <Scene />
    </Canvas>
  )
}
