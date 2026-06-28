"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

/* A stylised TO-92 transistor — the building block of every chip.
   Dark matte body, three brushed-metal legs. Monochrome. */
function Transistor() {
  const group = useRef<THREE.Group>(null);
  const reduced = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = mq.matches;
    const on = () => (reduced.current = mq.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    // continuous slow spin (paused under reduced-motion)
    if (!reduced.current) g.rotation.y += delta * 0.35;
    // subtle parallax toward the pointer
    const px = state.pointer.x;
    const py = state.pointer.y;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0.14 + py * 0.18, 0.06);
    g.position.x = THREE.MathUtils.lerp(g.position.x, px * 0.25, 0.06);
  });

  return (
    <group ref={group} rotation={[0.14, 0.5, 0]}>
      {/* body — flattened cylinder (D-shaped feel) */}
      <mesh position={[0, 0.55, 0]} scale={[1, 1, 0.72]} castShadow>
        <cylinderGeometry args={[0.92, 0.92, 1.5, 64]} />
        <meshStandardMaterial color="#242529" metalness={0.4} roughness={0.46} />
      </mesh>
      {/* top bevel */}
      <mesh position={[0, 1.31, 0]} scale={[1, 1, 0.72]}>
        <cylinderGeometry args={[0.92, 0.82, 0.1, 64]} />
        <meshStandardMaterial color="#3a3c42" metalness={0.5} roughness={0.38} />
      </mesh>
      {/* flat front plate (the labelled face) */}
      <mesh position={[0, 0.6, 0.665]}>
        <boxGeometry args={[1.5, 1.2, 0.04]} />
        <meshStandardMaterial color="#1d1f22" metalness={0.3} roughness={0.55} />
      </mesh>
      {/* three brushed-metal legs */}
      {[-0.42, 0, 0.42].map((x, i) => (
        <mesh key={i} position={[x, -0.55, 0.08]} castShadow>
          <cylinderGeometry args={[0.06, 0.05, 1.55, 20]} />
          <meshStandardMaterial color="#d0d2d7" metalness={0.92} roughness={0.26} />
        </mesh>
      ))}
    </group>
  );
}

export default function Transistor3D() {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="h-full w-full">
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 1.8]}
        camera={{ position: [0, 0.4, 5], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 8, 6]} intensity={2.6} />
        <directionalLight position={[-6, 2, -4]} intensity={1.1} />
        <directionalLight position={[0, -2, 5]} intensity={0.5} />
        {/* rim light to separate the dark body from the black background */}
        <directionalLight position={[-3, 5, -6]} intensity={2.2} />
        <directionalLight position={[3, 4, -6]} intensity={1.6} />
        <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.5}>
          <Transistor />
        </Float>
        <ContactShadows position={[0, -1.35, 0]} opacity={0.5} scale={9} blur={2.6} far={3.2} color="#000000" />
      </Canvas>
    </div>
  );
}
