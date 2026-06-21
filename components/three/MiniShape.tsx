"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useCalm } from "@/lib/useReducedMotion";

type Shape = "octa" | "box" | "tetra" | "ico";

function makeGeo(shape: Shape): THREE.BufferGeometry {
  if (shape === "box") return new THREE.BoxGeometry(1.5, 1.5, 1.5);
  if (shape === "tetra") return new THREE.TetrahedronGeometry(1.4);
  if (shape === "ico") return new THREE.IcosahedronGeometry(1.3, 0);
  return new THREE.OctahedronGeometry(1.3);
}

function Solid({ shape, light, calm, index }: { shape: Shape; light: boolean; calm: boolean; index: number }) {
  const grp = useRef<THREE.Group>(null);
  const { edges, nodes } = useMemo(() => {
    const geo = makeGeo(shape);
    const edges = new THREE.EdgesGeometry(geo);
    const pos = geo.attributes.position;
    const seen = new Set<string>();
    const nodes: [number, number, number][] = [];
    for (let i = 0; i < pos.count; i++) {
      const x = +pos.getX(i).toFixed(2);
      const y = +pos.getY(i).toFixed(2);
      const z = +pos.getZ(i).toFixed(2);
      const k = `${x},${y},${z}`;
      if (seen.has(k)) continue;
      seen.add(k);
      nodes.push([x, y, z]);
    }
    return { edges, nodes };
  }, [shape]);
  const lcol = light ? 0xb8b8bf : 0x9a9aa0;
  const ncol = light ? 0xf2f2f4 : 0x1d1d1f;
  useFrame(() => {
    if (!grp.current || calm) return;
    const t = performance.now() / 1000;
    grp.current.rotation.y = t * 0.5 + index * 1.3;
    grp.current.rotation.x = Math.sin(t * 0.4 + index) * 0.3 + 0.35;
  });
  return (
    <group ref={grp}>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={lcol} transparent opacity={0.85} />
      </lineSegments>
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.075, 8, 8]} />
          <meshBasicMaterial color={ncol} />
        </mesh>
      ))}
    </group>
  );
}

export function MiniShape({
  shape,
  light = false,
  index = 0,
  className,
  style,
}: {
  shape: Shape;
  light?: boolean;
  index?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const calm = useCalm();
  return (
    <div className={className} style={{ pointerEvents: "none", ...style }}>
      <Canvas camera={{ fov: 42, position: [0, 0, 4.4] }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
        <Solid shape={shape} light={light} calm={calm} index={index} />
      </Canvas>
    </div>
  );
}
