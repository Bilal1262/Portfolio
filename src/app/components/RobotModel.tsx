'use client'

import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh, Group } from 'three'

export default function RobotModel() {
  const headRef = useRef<Mesh | null>(null)
  const armsRef = useRef<Group | null>(null)
  const legsRef = useRef<Group | null>(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    // Head: rotate + float
    if (headRef.current) {
      headRef.current.rotation.y += 0.01
      headRef.current.position.y = 2 + Math.sin(t * 2) * 0.2
    }

    // Arms: swing
    if (armsRef.current) {
      armsRef.current.rotation.z = Math.sin(t * 2) * 0.2
    }

    // Legs: walk motion
    if (legsRef.current) {
      legsRef.current.rotation.x = Math.sin(t * 3) * 0.12
    }
  })

  return (
    <group>
      {/* Robot Head */}
      <mesh ref={headRef} position={[0, 2, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4B5563" />
      </mesh>

      {/* Robot Body */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.5, 2, 1]} />
        <meshStandardMaterial color="#1F2937" />
      </mesh>

      {/* Robot Arms */}
      <group ref={armsRef}>
        <mesh position={[-1, 0.5, 0]}>
          <boxGeometry args={[0.4, 2, 0.4]} />
          <meshStandardMaterial color="#4B5563" />
        </mesh>

        <mesh position={[1, 0.5, 0]}>
          <boxGeometry args={[0.4, 2, 0.4]} />
          <meshStandardMaterial color="#4B5563" />
        </mesh>
      </group>

      {/* Robot Legs */}
      <group ref={legsRef}>
        <mesh position={[-0.5, -1.5, 0]}>
          <boxGeometry args={[0.4, 2, 0.4]} />
          <meshStandardMaterial color="#374151" />
        </mesh>

        <mesh position={[0.5, -1.5, 0]}>
          <boxGeometry args={[0.4, 2, 0.4]} />
          <meshStandardMaterial color="#374151" />
        </mesh>
      </group>
    </group>
  )
}