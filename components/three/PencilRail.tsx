"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useCalm } from "@/lib/useReducedMotion";

function buildPencil(): { pencil: THREE.Group; inner: THREE.Group } {
  const inner = new THREE.Group();
  const LEN = 225;
  const R = 14;
  const edgeMat = new THREE.LineBasicMaterial({ color: 0x48484a, transparent: true, opacity: 1 });
  inner.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.CylinderGeometry(R, R, LEN, 6)), edgeMat));
  const cone = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.ConeGeometry(R, 52, 6)), edgeMat);
  cone.rotation.x = Math.PI;
  cone.position.y = -(LEN / 2) - 26;
  inner.add(cone);
  const ferrule = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.CylinderGeometry(R, R, 14, 6)), edgeMat);
  ferrule.position.y = LEN / 2 + 7;
  inner.add(ferrule);
  const cap = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.CylinderGeometry(R * 0.92, R * 0.92, 18, 12)), edgeMat);
  cap.position.y = LEN / 2 + 23;
  inner.add(cap);
  const lead = new THREE.Mesh(new THREE.ConeGeometry(R * 0.34, 24, 10), new THREE.MeshBasicMaterial({ color: 0x111113 }));
  lead.rotation.x = Math.PI;
  lead.position.y = -(LEN / 2) - 42;
  inner.add(lead);
  const nodeMat = new THREE.MeshBasicMaterial({ color: 0x1d1d1f });
  const ng = new THREE.SphereGeometry(3.4, 10, 10);
  for (let s = 0; s < 6; s++) {
    const a = (s / 6) * Math.PI * 2;
    [LEN / 2, -LEN / 2].forEach((yy) => {
      const sp = new THREE.Mesh(ng, nodeMat);
      sp.position.set(Math.cos(a) * R, yy, Math.sin(a) * R);
      inner.add(sp);
    });
  }
  inner.position.y = LEN / 2 + 53;
  inner.rotation.x = 0.5;
  const pencil = new THREE.Group();
  pencil.add(inner);
  return { pencil, inner };
}

function Pencil({
  pathEl,
  canvasWrap,
  calm,
}: {
  pathEl: React.RefObject<SVGPathElement | null>;
  canvasWrap: React.RefObject<HTMLDivElement | null>;
  calm: boolean;
}) {
  const { size, camera } = useThree();
  const { pencil, inner } = useMemo(() => buildPencil(), []);
  const st = useRef({ px: NaN, py: NaN, pa: NaN, spin: 0 });

  useEffect(() => {
    const cam = camera as THREE.OrthographicCamera;
    cam.left = 0;
    cam.right = size.width;
    cam.top = 0;
    cam.bottom = size.height;
    cam.near = -5000;
    cam.far = 5000;
    cam.position.z = 2000;
    cam.updateProjectionMatrix();
  }, [size, camera]);

  useFrame(() => {
    const path = pathEl.current;
    if (!path) return;
    const vw = size.width;
    const vh = size.height;
    const sy = window.scrollY || 0;
    const docH = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    const hero = document.getElementById("af-hero");
    const gate = hero ? Math.max(0, hero.offsetTop + hero.offsetHeight - vh * 1.05) : 0;
    const btn = document.getElementById("af-demo-end");
    let btnDocY = docH;
    if (btn) {
      const b = btn.getBoundingClientRect();
      btnDocY = b.top + sy + b.height * 0.5;
    }
    let endScroll = Math.min(btnDocY - vh * 0.62, docH - vh);
    endScroll = Math.max(endScroll, gate + 1);
    const p = Math.max(0, Math.min(1, (sy - gate) / (endScroll - gate)));
    const vis = Math.max(0, Math.min(1, (sy - gate) / Math.max(1, vh * 0.5)));

    const btnViewY = btnDocY - sy;
    const topY = vh * 0.06;
    const endY = Math.max(topY + 60, Math.min(btnViewY, vh * 0.94));
    const span = endY - topY;
    const cx = vw * 0.5;
    const amp = Math.min(vw * 0.14, 170);
    const freq = 1.7;
    const N = 90;
    const pts: [number, number][] = [];
    let d = "";
    let tot = 0;
    let prev: [number, number] | null = null;
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const x = cx + amp * Math.cos(t * Math.PI * freq);
      const y = topY + t * span;
      pts.push([x, y]);
      d += (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
      if (prev) tot += Math.hypot(x - prev[0], y - prev[1]);
      prev = [x, y];
    }
    path.setAttribute("d", d);
    path.style.strokeDasharray = String(tot);
    path.style.strokeDashoffset = (tot * (1 - p)).toFixed(1);
    path.style.opacity = (0.12 * vis).toFixed(3);

    const idx = p * N;
    const i0 = Math.floor(idx);
    const i1 = Math.min(N, i0 + 1);
    const fr = idx - i0;
    const tx = pts[i0][0] + (pts[i1][0] - pts[i0][0]) * fr;
    const ty = pts[i0][1] + (pts[i1][1] - pts[i0][1]) * fr;
    const s = st.current;
    if (Number.isNaN(s.px)) {
      s.px = tx;
      s.py = ty;
    }
    s.px += (tx - s.px) * 0.16;
    s.py += (ty - s.py) * 0.16;
    pencil.position.set(s.px, s.py, 0);

    const dx = pts[i1][0] - pts[i0][0];
    const dy = pts[i1][1] - pts[i0][1] || 1;
    let ang = Math.atan2(-dy, -dx) - Math.PI / 2 + 0.22;
    if (Number.isNaN(s.pa)) s.pa = ang;
    let da = ang - s.pa;
    while (da > Math.PI) da -= Math.PI * 2;
    while (da < -Math.PI) da += Math.PI * 2;
    s.pa += da * 0.12;
    pencil.rotation.z = s.pa;

    if (!calm) {
      s.spin += 0.014;
      inner.rotation.y = s.spin;
    }
    pencil.visible = vis > 0;
    if (canvasWrap.current) canvasWrap.current.style.opacity = (0.55 * vis).toFixed(3);
  });

  return <primitive object={pencil} />;
}

export function PencilRail() {
  const pathRef = useRef<SVGPathElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const calm = useCalm();
  return (
    <>
      <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }}>
        <svg
          preserveAspectRatio="none"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
        >
          <path
            ref={pathRef}
            d=""
            fill="none"
            stroke="#9a9aa0"
            strokeWidth={2.5}
            strokeLinecap="round"
            style={{ opacity: 0.12 }}
          />
        </svg>
      </div>
      <div
        ref={wrapRef}
        style={{ position: "fixed", inset: 0, zIndex: 250, pointerEvents: "none", opacity: 0, transition: "opacity .25s ease" }}
      >
        <Canvas orthographic dpr={[1, 2]} gl={{ alpha: true, antialias: true }} style={{ position: "absolute", inset: 0 }}>
          <Pencil pathEl={pathRef} canvasWrap={wrapRef} calm={calm} />
        </Canvas>
      </div>
    </>
  );
}
