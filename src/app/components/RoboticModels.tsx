'use client'

import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { ContactShadows, Html, useCursor } from '@react-three/drei'
import {
  AdditiveBlending,
  Color,
  DoubleSide,
  Group,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Vector3
} from 'three'

/**
 * Added (as requested):
 * ✅ LiDAR cone/beam sweep (animated wedge + faint ring glow)
 * ✅ Soft floating shadow plane under each robot (ContactShadows)
 * ✅ Hover tooltip on the arm segment
 *
 * Still:
 * - No per-frame setState (good FPS)
 * - No path changes (no images/videos involved here anyway)
 */

const COLORS = {
  baseBlue: new Color('#2563EB'),
  hoverBlue: new Color('#60A5FA'),
  deepBlue: '#1E40AF',
  indigo: '#312E81',
  slate900: '#0F172A',
  steel: '#94A3B8',
  cable: '#475569',
  green: new Color('#22C55E'),
  red: new Color('#EF4444')
}

function clamp01(x: number) {
  return Math.min(1, Math.max(0, x))
}

// ─────────────────────────────────────────────────────────────────────────────
// Robotic Arm
// ─────────────────────────────────────────────────────────────────────────────

const RoboticArm = memo(function RoboticArm() {
  const armRef = useRef<Group>(null)
  const joint1Ref = useRef<Group>(null)
  const joint2Ref = useRef<Group>(null)

  const seg1MatRef = useRef<MeshStandardMaterial | null>(null)
  const seg2MatRef = useRef<MeshStandardMaterial | null>(null)

  const [hovered, setHovered] = useState(false)
  const [isWorking, setIsWorking] = useState(true)
  useCursor(hovered)

  // Smooth hover color without rerendering materials every frame
  const currentColorRef = useRef<Color>(COLORS.baseBlue.clone())

  // Small motion phase for premium idle feel
  const phaseRef = useRef(0)

  useFrame((state, delta) => {
    phaseRef.current += delta

    // Color transition
    const target = hovered ? COLORS.hoverBlue : COLORS.baseBlue
    currentColorRef.current.lerp(target, clamp01(delta * 8))

    if (seg1MatRef.current) seg1MatRef.current.color.copy(currentColorRef.current)
    if (seg2MatRef.current) seg2MatRef.current.color.copy(currentColorRef.current)

    // Joint motion
    const j1 = joint1Ref.current
    const j2 = joint2Ref.current
    if (!j1 || !j2) return

    if (isWorking) {
      const t = state.clock.elapsedTime
      const targetJ1 = Math.sin(t * 0.9) * 0.35
      const targetJ2 = Math.sin(t * 1.2 + 1.2) * 0.45
      j1.rotation.y = MathUtils.damp(j1.rotation.y, targetJ1, 8, delta)
      j2.rotation.z = MathUtils.damp(j2.rotation.z, targetJ2, 8, delta)
    } else {
      j1.rotation.y = MathUtils.damp(j1.rotation.y, 0, 10, delta)
      j2.rotation.z = MathUtils.damp(j2.rotation.z, 0, 10, delta)
    }

    // Tiny bob to keep it alive
    if (armRef.current) {
      const bob = Math.sin(phaseRef.current * 0.8) * (isWorking ? 0.015 : 0.006)
      armRef.current.position.y = MathUtils.damp(armRef.current.position.y, bob, 8, delta)
    }
  })

  const statusClass = isWorking ? 'bg-blue-500' : 'bg-slate-600'

  return (
    <group ref={armRef} position={[3, 0, 0]} rotation={[0, -Math.PI / 4, 0]}>
      {/* Soft shadow plane */}
      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.38}
        scale={5}
        blur={2.6}
        far={2.2}
        resolution={256}
        color="#000000"
      />

      {/* Base */}
      <group>
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.8, 1, 0.5, 32]} />
          <meshStandardMaterial color={COLORS.deepBlue} metalness={0.9} roughness={0.2} />
        </mesh>

        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.85, 0.85, 0.1, 32]} />
          <meshStandardMaterial color="#60A5FA" metalness={0.8} roughness={0.2} />
        </mesh>

        <mesh position={[0.4, 0.3, 0.4]} rotation={[0, -Math.PI / 6, 0]} castShadow>
          <boxGeometry args={[0.4, 0.2, 0.1]} />
          <meshStandardMaterial color={COLORS.slate900} metalness={0.5} roughness={0.5} />
        </mesh>
      </group>

      {/* Joint 1 */}
      <group ref={joint1Ref} position={[0, 0.75, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />
          <meshStandardMaterial color={COLORS.deepBlue} metalness={0.8} roughness={0.2} />
        </mesh>

        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.45, 0.45, 0.1, 32]} />
          <meshStandardMaterial color="#60A5FA" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Segment 1 */}
        <group position={[0, 0.75, 0]}>
          <mesh
            position={[0, 0.5, 0]}
            castShadow
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={() => setIsWorking((v) => !v)}
          >
            <boxGeometry args={[0.3, 1.5, 0.3]} />
            <meshStandardMaterial
              ref={(m) => {
                seg1MatRef.current = m
              }}
              color={COLORS.baseBlue}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>

          {/* Hover tooltip (portfolio-friendly) */}
          <Html position={[0.0, 1.55, 0]} style={{ pointerEvents: 'none' }}>
            <div
              className={[
                'transition-all duration-200 px-3 py-2 rounded-lg text-xs whitespace-nowrap shadow-lg',
                'backdrop-blur bg-black/60 text-white',
                hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
              ].join(' ')}
            >
              <div className="font-semibold">Robotic Arm</div>
              <div className="opacity-90">Hover: highlight</div>
              <div className="opacity-90">Click: toggle {isWorking ? 'Standby' : 'Ready'}</div>
            </div>
          </Html>

          {/* Pistons */}
          <mesh position={[0.2, 0.5, 0.2]} rotation={[0, 0, Math.PI / 6]} castShadow>
            <cylinderGeometry args={[0.06, 0.06, 1, 12]} />
            <meshStandardMaterial color={COLORS.steel} metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[-0.2, 0.5, 0.2]} rotation={[0, 0, -Math.PI / 6]} castShadow>
            <cylinderGeometry args={[0.06, 0.06, 1, 12]} />
            <meshStandardMaterial color={COLORS.steel} metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* Joint 2 */}
      <group ref={joint2Ref} position={[0, 2.25, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.35, 0.35, 0.3, 32]} />
          <meshStandardMaterial color={COLORS.deepBlue} metalness={0.8} roughness={0.2} />
        </mesh>

        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
          <meshStandardMaterial color="#60A5FA" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Segment 2 */}
        <group position={[0.5, 0, 0]}>
          <mesh position={[0.3, 0, 0]} castShadow>
            <boxGeometry args={[1, 0.25, 0.25]} />
            <meshStandardMaterial
              ref={(m) => {
                seg2MatRef.current = m
              }}
              color={COLORS.baseBlue}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>

          <mesh position={[0.3, 0.15, 0]} scale={[0.9, 0.08, 0.08]} castShadow>
            <boxGeometry />
            <meshStandardMaterial color={COLORS.cable} metalness={0.5} roughness={0.5} />
          </mesh>
        </group>
      </group>

      {/* End effector */}
      <group position={[1.3, 2.25, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.2, 0.25, 0.3, 16]} />
          <meshStandardMaterial color={COLORS.deepBlue} metalness={0.8} roughness={0.2} />
        </mesh>

        <group>
          <mesh position={[0.15, 0.1, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
            <boxGeometry args={[0.4, 0.08, 0.08]} />
            <meshStandardMaterial color={COLORS.indigo} metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0.15, -0.1, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
            <boxGeometry args={[0.4, 0.08, 0.08]} />
            <meshStandardMaterial color={COLORS.indigo} metalness={0.7} roughness={0.3} />
          </mesh>
        </group>

        <Html position={[0.3, 0.3, 0]} style={{ pointerEvents: 'none' }}>
          <div className={`px-2 py-1 text-xs text-white rounded-md whitespace-nowrap ${statusClass}`}>
            {isWorking ? 'Ready' : 'Standby'}
          </div>
        </Html>
      </group>
    </group>
  )
})

// ─────────────────────────────────────────────────────────────────────────────
// Differential Drive Robot
// ─────────────────────────────────────────────────────────────────────────────

const DifferentialDriveRobot = memo(function DifferentialDriveRobot() {
  const robotRef = useRef<Group>(null)
  const lidarRef = useRef<Group>(null)
  const beamGroupRef = useRef<Group>(null)

  // Stable vectors
  const targetRef = useRef(new Vector3(0, 0, 0))
  const velRef = useRef(new Vector3(0, 0, 0))
  const dirRef = useRef(new Vector3(0, 0, 0))

  // Wheel mesh refs (fast rotation)
  const wheelMeshes = useRef<Mesh[]>([])

  const [isScanning, setIsScanning] = useState(true)

  // Toggle scanning mode
  useEffect(() => {
    const interval = setInterval(() => setIsScanning((p) => !p), 2000)
    return () => clearInterval(interval)
  }, [])

  // Beam materials (stable) – we update color only when isScanning changes
  const beamMat = useMemo(() => {
    const m = new MeshBasicMaterial({
      color: isScanning ? COLORS.green : COLORS.red,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
      side: DoubleSide,
      blending: AdditiveBlending
    })
    return m
  }, [isScanning])

  const ringMat = useMemo(() => {
    const m = new MeshBasicMaterial({
      color: isScanning ? COLORS.green : COLORS.red,
      transparent: true,
      opacity: 0.08,
      depthWrite: false,
      side: DoubleSide,
      blending: AdditiveBlending
    })
    return m
  }, [isScanning])

  useFrame((state, delta) => {
    const robot = robotRef.current
    if (!robot) return

    // Figure-8 target
    const time = state.clock.elapsedTime * 0.3
    const target = targetRef.current
    target.set(Math.sin(time) * 3, 0, Math.sin(time * 2) * 2)

    // Direction + distance
    const dir = dirRef.current.copy(target).sub(robot.position)
    const dist = dir.length()
    if (dist > 0.0001) dir.multiplyScalar(1 / dist)

    // Smooth velocity
    const desiredSpeed = Math.min(dist, 1.5)
    const vel = velRef.current
    vel.x = MathUtils.damp(vel.x, dir.x * desiredSpeed, 7, delta)
    vel.z = MathUtils.damp(vel.z, dir.z * desiredSpeed, 7, delta)

    // Move
    robot.position.x += vel.x * delta
    robot.position.z += vel.z * delta

    // Face movement direction
    if (vel.lengthSq() > 1e-6) {
      const targetRot = Math.atan2(vel.x, vel.z)
      robot.rotation.y = MathUtils.damp(robot.rotation.y, targetRot, 9, delta)
    }

    // Wheel rotation
    const wheelSpeed = vel.length() * 6
    for (const w of wheelMeshes.current) w.rotation.x += wheelSpeed * delta

    // LiDAR spin
    if (lidarRef.current) {
      lidarRef.current.rotation.y = (lidarRef.current.rotation.y + delta * 5) % (Math.PI * 2)
    }

    // Beam follows lidar rotation (no state updates)
    if (beamGroupRef.current && lidarRef.current) {
      beamGroupRef.current.rotation.y = lidarRef.current.rotation.y
    }
  })

  const lidarColor = isScanning ? COLORS.green : COLORS.red

  const wheelPositions = useMemo(() => {
    return [
      [-0.7, 0, 0] as const,
      [0.7, 0, 0] as const
    ]
  }, [])

  return (
    <group ref={robotRef} position={[-2, 0, 0]}>
      {/* Soft shadow plane */}
      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.4}
        scale={5}
        blur={2.8}
        far={2.4}
        resolution={256}
        color="#000000"
      />

      {/* LiDAR sweep beam (wedge + ring) */}
      <group ref={beamGroupRef} position={[0, 0.02, 0]}>
        {/* Wedge */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          {/* radius, segments, thetaStart, thetaLength */}
          <circleGeometry args={[3.2, 64, 0, Math.PI / 10]} />
          <primitive object={beamMat} attach="material" />
        </mesh>

        {/* Faint ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.9, 3.2, 96]} />
          <primitive object={ringMat} attach="material" />
        </mesh>
      </group>

      {/* Body */}
      <group>
        <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 0.1, 1.7]} />
          <meshStandardMaterial color="#1E293B" metalness={0.7} roughness={0.3} />
        </mesh>

        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[1.2, 0.4, 1.5]} />
          <meshStandardMaterial color="#4F46E5" metalness={0.6} roughness={0.3} />
        </mesh>

        <mesh position={[0, 0.65, 0]} castShadow>
          <boxGeometry args={[1.1, 0.1, 1.4]} />
          <meshStandardMaterial color="#312E81" metalness={0.8} roughness={0.2} />
        </mesh>

        <mesh position={[0, 0.75, -0.2]} castShadow>
          <boxGeometry args={[0.6, 0.2, 0.4]} />
          <meshStandardMaterial color="#1E1B4B" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Wheels */}
      <group position={[0, 0.3, 0]}>
        {wheelPositions.map((pos, idx) => (
          <group key={idx} position={pos as any}>
            <mesh
              ref={(m) => {
                if (!m) return
                wheelMeshes.current[idx] = m
              }}
              rotation={[Math.PI / 2, 0, 0]}
              castShadow
            >
              <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
              <meshStandardMaterial color="#312E81" metalness={0.7} roughness={0.2} />
            </mesh>

            <mesh position={[0, 0, 0.06]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.15, 0.15, 0.01, 16]} />
              <meshStandardMaterial color="#818CF8" metalness={0.9} roughness={0.1} />
            </mesh>

            <mesh position={[0, 0.2, 0]} castShadow>
              <boxGeometry args={[0.1, 0.3, 0.1]} />
              <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.4} />
            </mesh>
          </group>
        ))}
      </group>

      {/* LiDAR */}
      <group ref={lidarRef} position={[0, 0.8, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.2, 0.25, 0.15, 32]} />
          <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
        </mesh>

        <mesh position={[0, 0.1, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.1, 32]} />
          <meshStandardMaterial
            color={lidarColor}
            emissive={lidarColor}
            emissiveIntensity={0.6}
            metalness={0.5}
            roughness={0.12}
          />
        </mesh>

        {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((angle, i) => (
          <mesh key={i} position={[Math.cos(angle) * 0.18, 0.1, Math.sin(angle) * 0.18]} castShadow>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial
              color={lidarColor}
              emissive={lidarColor}
              emissiveIntensity={0.6}
              metalness={0.5}
              roughness={0.12}
            />
          </mesh>
        ))}
      </group>

      {/* Status */}
      <Html position={[0, 1.2, 0]} style={{ pointerEvents: 'none' }}>
        <div className="px-2 py-1 text-xs bg-indigo-500 text-white rounded-md whitespace-nowrap">
          {isScanning ? 'Scanning' : 'Processing'}
        </div>
      </Html>
    </group>
  )
})

export { RoboticArm, DifferentialDriveRobot }