"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, Line } from "@react-three/drei";
import * as THREE from "three";
import Link from "next/link";
import { CORA_STAGES, type StageId } from "@/lib/cora";

const positions: [number, number, number][] = [
  [-3.2, 0, 0],
  [-1.6, 0, 0],
  [0, 0, 0],
  [1.6, 0, 0],
  [3.2, 0, 0],
];

function EnergyConduit({
  from,
  to,
  color,
}: {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
}) {
  const points = useMemo(
    () => [new THREE.Vector3(...from), new THREE.Vector3(...to)],
    [from, to]
  );

  return (
    <Line
      points={points}
      color={color}
      lineWidth={2.5}
      dashed
      dashScale={12}
      gapSize={0.45}
      dashSize={0.35}
      transparent
      opacity={0.85}
    />
  );
}

function StageCrystal({
  position,
  stageId,
  color,
  onHover,
  hovered,
}: {
  position: [number, number, number];
  stageId: StageId;
  color: string;
  onHover: (id: StageId | null) => void;
  hovered: StageId | null;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const stage = CORA_STAGES.find((s) => s.id === stageId)!;
  const glow = hovered === stageId;

  useFrame((_, dt) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += dt * (glow ? 0.45 : 0.22);
      meshRef.current.rotation.x += dt * 0.04;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.15} floatIntensity={0.4}>
      <group position={position}>
        <mesh
          ref={meshRef}
          onPointerOver={(e) => {
            e.stopPropagation();
            onHover(stageId);
          }}
          onPointerOut={() => onHover(null)}
        >
          <icosahedronGeometry args={[0.52, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={glow ? 0.85 : 0.4}
            metalness={0.45}
            roughness={0.22}
          />
        </mesh>
        <mesh scale={glow ? 1.18 : 1.05}>
          <icosahedronGeometry args={[0.52, 0]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={glow ? 0.22 : 0.08}
            wireframe
          />
        </mesh>
        <Html
          position={[0, -0.95, 0]}
          center
          style={{ pointerEvents: "auto", width: "max-content" }}
        >
          <Link
            href={stage.route}
            className="block rounded-lg border border-white/15 bg-black/55 px-2.5 py-1.5 text-center text-[10px] font-semibold text-white/90 shadow-lg backdrop-blur-md transition hover:border-white/30 sm:text-xs"
            style={{
              boxShadow: glow ? `0 0 20px ${color}55` : undefined,
            }}
          >
            {stage.shortTitle}
          </Link>
        </Html>
        {hovered === stageId ? (
          <Html position={[0, 1.15, 0]} center style={{ pointerEvents: "none" }}>
            <div className="max-w-[220px] rounded-xl border border-white/20 bg-black/70 p-3 text-left shadow-2xl backdrop-blur-md sm:max-w-[260px]">
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                Test modülleri
              </p>
              <ul className="mt-2 space-y-1.5">
                {stage.testProtocols.map((t) => (
                  <li key={t.id} className="text-[11px] leading-snug text-white/80">
                    · {t.name}
                  </li>
                ))}
              </ul>
            </div>
          </Html>
        ) : null}
      </group>
    </Float>
  );
}

function Scene({ onHover, hovered }: { onHover: (id: StageId | null) => void; hovered: StageId | null }) {
  return (
    <>
      <color attach="background" args={["#070b12"]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 6, 8]} intensity={1.2} color="#a8c4ff" />
      <pointLight position={[-8, -4, -2]} intensity={0.5} color="#c4a8ff" />

      {CORA_STAGES.slice(0, -1).map((stage, i) => {
        const next = CORA_STAGES[i + 1]!;
        const blend = new THREE.Color(stage.accent).lerp(
          new THREE.Color(next.accent),
          0.5
        );
        return (
          <EnergyConduit
            key={`${stage.id}-${next.id}`}
            from={positions[i]!}
            to={positions[i + 1]!}
            color={`#${blend.getHexString()}`}
          />
        );
      })}

      {CORA_STAGES.map((stage, i) => (
        <StageCrystal
          key={stage.id}
          stageId={stage.id}
          position={positions[i]!}
          color={stage.accent}
          onHover={onHover}
          hovered={hovered}
        />
      ))}
    </>
  );
}

export function CoraPipeline3D() {
  const [hovered, setHovered] = useState<StageId | null>(null);

  return (
    <div className="relative h-[320px] w-full sm:h-[380px] md:h-[420px]">
      <Canvas
        camera={{ position: [0, 1.35, 7.2], fov: 42 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
        className="rounded-2xl border border-white/10 bg-[#070b12]"
      >
        <Scene onHover={setHovered} hovered={hovered} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.07]" />
    </div>
  );
}
