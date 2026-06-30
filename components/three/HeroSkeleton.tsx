"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { useCalm } from "@/lib/useReducedMotion";

const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

function Brain({ progressRef, calm }: { progressRef: MutableRefObject<number>; calm: boolean }) {
  const grp = useRef<THREE.Group>(null);
  const { size } = useThree();
  const t0 = useRef(performance.now());
  const nodeMats = useRef<(THREE.MeshBasicMaterial | null)[]>([]);

  const { segGeo, nodes } = useMemo(() => {
    const layers = [
      [V(-150, 72, 12), V(-150, 18, 40), V(-150, -36, -22), V(-150, -90, 26)],
      [V(-74, 108, -26), V(-74, 54, 36), V(-74, 2, -46), V(-74, -52, 30), V(-74, -104, -8)],
      [V(0, 124, 20), V(0, 66, -36), V(0, 10, 42), V(0, -46, -32), V(0, -104, 24), V(0, -150, -6)],
      [V(74, 108, -22), V(74, 54, 34), V(74, 2, -42), V(74, -52, 28), V(74, -104, -10)],
      [V(150, 72, 14), V(150, 18, -38), V(150, -36, 24), V(150, -90, -18)],
    ];
    const bseg: THREE.Vector3[] = [];
    for (let l = 0; l < layers.length - 1; l++) {
      layers[l].forEach((a) => layers[l + 1].forEach((b) => bseg.push(a, b)));
    }
    const segGeo = new THREE.BufferGeometry().setFromPoints(bseg);
    const nodes: { v: THREE.Vector3; mid: boolean }[] = [];
    layers.forEach((ly, li) => ly.forEach((v) => nodes.push({ v, mid: li >= 1 && li <= 3 })));
    return { segGeo, nodes };
  }, []);

  useFrame(() => {
    const g = grp.current;
    if (!g) return;
    const p = Math.max(0, Math.min(1, progressRef.current));
    const tm = (performance.now() - t0.current) / 1000;
    const cf = calm ? 0.4 : 1;
    const W = size.width;
    const H = size.height;
    const it = {
      fx: 0.5,
      fy: 0.46,
      base: 1.16,
      start: 1.18,
      shrink: 0.5,
      spin: 0.12,
      rx: -0.18,
      ry0: -0.35,
      rySpan: 1.3,
      rz0: 0,
      rzSpan: 0.16,
      dx: 0,
      dy: -0.02,
    };
    const sc = it.base * (it.start - p * it.shrink);
    g.scale.set(sc, sc, sc);
    g.position.set(W * (it.fx + it.dx * p), H * (it.fy + it.dy * p), 0);
    g.rotation.x = it.rx;
    g.rotation.y = it.ry0 + p * it.rySpan + tm * it.spin * cf;
    g.rotation.z = it.rz0 + p * it.rzSpan;
    const lit = Math.round(p * (nodes.length - 1));
    nodeMats.current.forEach((m, i) => {
      if (m) m.color.setHex(i <= lit ? 0x1d1d1f : 0xcfcfd4);
    });
  });

  return (
    <group ref={grp}>
      <lineSegments geometry={segGeo}>
        <lineBasicMaterial color={0x9a9aa0} transparent opacity={0.26} />
      </lineSegments>
      {nodes.map((n, i) => (
        <mesh key={i} position={n.v}>
          <sphereGeometry args={[4.4, 14, 14]} />
          <meshBasicMaterial
            ref={(m) => {
              nodeMats.current[i] = m;
            }}
            color={n.mid ? 0x1d1d1f : 0xcfcfd4}
          />
        </mesh>
      ))}
    </group>
  );
}

function OrthoCam() {
  const { size, camera } = useThree();
  const cam = camera as THREE.OrthographicCamera;
  cam.left = 0;
  cam.right = size.width;
  cam.top = 0;
  cam.bottom = size.height;
  cam.near = -4000;
  cam.far = 4000;
  cam.position.z = 1200;
  cam.updateProjectionMatrix();
  return null;
}

export function HeroSkeleton({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const calm = useCalm();
  return (
    <Canvas
      orthographic
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <OrthoCam />
      <Brain progressRef={progressRef} calm={calm} />
    </Canvas>
  );
}
