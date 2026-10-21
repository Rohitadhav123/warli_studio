"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

interface SculpturalCompositionProps {
  reducedMotion: boolean;
  mousePos: { x: number; y: number };
}

function SculpturalComposition({ reducedMotion, mousePos }: SculpturalCompositionProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const monolithRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  // Studio Palette Materials
  const materials = useMemo(() => {
    // Terracotta warm satin metal
    const terracotta = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#D85C3F"),
      roughness: 0.32,
      metalness: 0.28,
    });

    // Warm Ivory ceramic stone
    const warmIvory = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#F5F0E8"),
      roughness: 0.55,
      metalness: 0.08,
    });

    // Soft Sage frosted finish
    const softSage = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#C8D8C0"),
      roughness: 0.2,
      metalness: 0.15,
      transparent: true,
      opacity: 0.92,
    });

    // Dark studio carbon bronze
    const studioDark = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#252220"),
      roughness: 0.4,
      metalness: 0.65,
    });

    return { terracotta, warmIvory, softSage, studioDark };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!reducedMotion) {
      const t = state.clock.getElapsedTime();

      // Smooth pointer parallax tilt with damping
      const targetRotX = mousePos.y * 0.35 + Math.sin(t * 0.4) * 0.08;
      const targetRotY = mousePos.x * 0.55 + t * 0.22;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 3);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 3);

      // Micro breathing rotation on individual elements
      if (ring1Ref.current) {
        ring1Ref.current.rotation.z += delta * 0.45;
        ring1Ref.current.rotation.x += delta * 0.15;
      }
      if (ring2Ref.current) {
        ring2Ref.current.rotation.y -= delta * 0.35;
        ring2Ref.current.rotation.z += delta * 0.2;
      }
      if (coreRef.current) {
        coreRef.current.rotation.x += delta * 0.18;
        coreRef.current.rotation.y += delta * 0.25;
      }
      if (sphereRef.current) {
        sphereRef.current.position.y = -0.55 + Math.sin(t * 1.2) * 0.06;
      }
      if (monolithRef.current) {
        monolithRef.current.position.y = 0.45 + Math.cos(t * 0.9) * 0.05;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. Central Hero Sculpture: Terracotta Torus Knot Ribbon */}
      <Float speed={reducedMotion ? 0 : 2} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh ref={coreRef} position={[0, 0, 0]} material={materials.terracotta} castShadow receiveShadow>
          <torusKnotGeometry args={[0.9, 0.26, 128, 32, 2, 3]} />
        </mesh>
      </Float>

      {/* 2. Floating Ivory Monolithic Slab */}
      <Float speed={reducedMotion ? 0 : 1.5} rotationIntensity={0.25} floatIntensity={0.3}>
        <mesh
          ref={monolithRef}
          position={[-1.15, 0.45, -0.4]}
          rotation={[0.3, 0.4, -0.2]}
          material={materials.warmIvory}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.35, 1.4, 0.25]} />
        </mesh>
      </Float>

      {/* 3. Soft Sage Translucent Orb */}
      <mesh
        ref={sphereRef}
        position={[1.1, -0.55, 0.3]}
        material={materials.softSage}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[0.42, 48, 48]} />
      </mesh>

      {/* 4. Fine Dark Carbon Astrolabe Ring 1 */}
      <mesh ref={ring1Ref} position={[0, 0, 0]} rotation={[Math.PI / 3, 0, 0]} material={materials.studioDark}>
        <torusGeometry args={[1.65, 0.018, 16, 96]} />
      </mesh>

      {/* 5. Fine Terracotta Orbital Ring 2 */}
      <mesh ref={ring2Ref} position={[0, 0, 0]} rotation={[0, Math.PI / 4, Math.PI / 6]} material={materials.terracotta}>
        <torusGeometry args={[1.85, 0.012, 16, 96]} />
      </mesh>

      {/* Floating Accent Capsule */}
      <mesh position={[0.7, 1.05, -0.6]} rotation={[0.8, 0.2, 0.5]} material={materials.warmIvory}>
        <cylinderGeometry args={[0.1, 0.1, 0.5, 24]} />
      </mesh>

      {/* Grounding Contact Shadows */}
      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.65}
        scale={6}
        blur={2.5}
        far={3.5}
        color="#080706"
      />
    </group>
  );
}

function checkWebGL(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

function checkReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function HeroScene3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(checkReducedMotion);
  const [webGLSupported] = useState(checkWebGL);

  // Subscribe to reduced motion changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMotionChange);
    return () => mediaQuery.removeEventListener("change", handleMotionChange);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMousePos({ x, y });
  };

  const handlePointerLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Static Fallback if WebGL unsupported
  if (!webGLSupported) {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-[#1f1d1b]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/placeholders/hero-art.svg"
          alt="Warli Studios 3D Specimen"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full h-full select-none cursor-grab active:cursor-grabbing overflow-hidden"
      aria-label="Interactive 3D sculptural composition for Warli Studios"
      role="img"
    >
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.75]}
        className="w-full h-full"
      >
        <PerspectiveCamera makeDefault position={[0, 0, 4.4]} fov={42} />

        {/* Studio Lighting Rig */}
        <ambientLight intensity={0.75} color="#FAF7F2" />

        {/* Warm Key Light */}
        <directionalLight
          position={[4, 5, 4]}
          intensity={2.4}
          color="#FFF2E0"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />

        {/* Sage Fill Light */}
        <directionalLight
          position={[-4, -2, 2]}
          intensity={0.9}
          color="#D8E5D0"
        />

        {/* Terracotta Rim / Kicker Light */}
        <pointLight
          position={[0, -2, -3]}
          intensity={2.2}
          color="#D85C3F"
          distance={8}
        />

        {/* Top Rim Accent */}
        <pointLight
          position={[2, 3, -2]}
          intensity={1.5}
          color="#FFFFFF"
          distance={6}
        />

        <SculpturalComposition
          reducedMotion={isReducedMotion}
          mousePos={mousePos}
        />
      </Canvas>

      {/* Interactive Micro-hint */}
      <div className="absolute bottom-3 left-4 z-20 pointer-events-none">
        <span className="text-[9px] font-mono tracking-widest text-[#F5F0E8]/50 uppercase flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-[#D85C3F] animate-ping" />
          INTERACTIVE 3D // POINTER SENSITIVE
        </span>
      </div>
    </div>
  );
}
