'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import styles from './VeneerArch.module.css';

/**
 * A stylised upper arch — not a patient — that morphs from "before" (uneven,
 * stained, a chipped edge) to "after" (aligned, uniform porcelain) as you drag.
 */

const N = 10; // central incisors → second premolars, both sides
const ARCH_R = 2.3;

type ToothSpec = { w: number; h: number; angleDeg: number; before: { dy: number; rz: number; ry: number; hex: string; hScale: number; chip: boolean } };

function specs(): ToothSpec[] {
  // Mirror-symmetric arch, index 0 = patient's left second premolar … 9 = right second premolar.
  const half = [
    { w: 0.52, h: 0.86, angle: 8 },   // central incisor
    { w: 0.42, h: 0.78, angle: 24 },  // lateral
    { w: 0.46, h: 0.84, angle: 41 },  // canine
    { w: 0.44, h: 0.72, angle: 58 },  // first premolar
    { w: 0.42, h: 0.68, angle: 74 },  // second premolar
  ];
  const beforeNoise = [
    { dy: 0.00, rz: 0.06, ry: 0.12, hex: '#E3D3B3', hScale: 0.96, chip: false },
    { dy: -0.06, rz: -0.14, ry: -0.25, hex: '#D9C49C', hScale: 0.86, chip: false },
    { dy: 0.05, rz: 0.1, ry: 0.18, hex: '#DFCFAF', hScale: 1.02, chip: false },
    { dy: -0.03, rz: -0.05, ry: 0.1, hex: '#D6C39F', hScale: 0.93, chip: false },
    { dy: 0.02, rz: 0.04, ry: -0.08, hex: '#DBC9A8', hScale: 0.9, chip: false },
    // right side
    { dy: -0.02, rz: -0.08, ry: -0.1, hex: '#E0CFAD', hScale: 0.92, chip: true },   // chipped central
    { dy: 0.07, rz: 0.16, ry: 0.22, hex: '#D3BE97', hScale: 0.82, chip: false },
    { dy: -0.04, rz: -0.09, ry: -0.15, hex: '#DCCBAB', hScale: 1.0, chip: false },
    { dy: 0.03, rz: 0.06, ry: 0.08, hex: '#D5C19C', hScale: 0.95, chip: false },
    { dy: -0.02, rz: -0.03, ry: 0.12, hex: '#D9C6A4', hScale: 0.9, chip: false },
  ];
  const out: ToothSpec[] = [];
  for (let i = 0; i < N; i++) {
    const k = i < 5 ? 4 - i : i - 5;        // 4..0,0..4
    const side = i < 5 ? -1 : 1;
    const t = half[k];
    out.push({ w: t.w, h: t.h, angleDeg: side * t.angle, before: beforeNoise[i] });
  }
  return out;
}

function toothGeometry(w: number, h: number, chip: boolean) {
  const s = new THREE.Shape();
  const hw = w / 2, top = h / 2, bot = -h / 2, r = 0.08;
  s.moveTo(-hw + r, top);
  s.lineTo(hw - r, top);
  s.quadraticCurveTo(hw, top, hw, top - r);
  s.lineTo(hw, bot + h * 0.35);
  if (chip) {
    // a notch out of the incisal corner
    s.lineTo(hw, bot + 0.18);
    s.lineTo(hw - 0.16, bot + 0.02);
    s.quadraticCurveTo(0, bot - 0.02, -hw, bot + h * 0.3);
  } else {
    s.quadraticCurveTo(hw, bot, 0.02, bot);
    s.quadraticCurveTo(-hw, bot, -hw, bot + h * 0.35);
  }
  s.lineTo(-hw, top - r);
  s.quadraticCurveTo(-hw, top, -hw + r, top);
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.34, bevelEnabled: true, bevelThickness: 0.07, bevelSize: 0.06, bevelSegments: 6, curveSegments: 24 });
  g.center();
  return g;
}

function Tooth({ spec, mix, reduced }: { spec: ToothSpec; mix: number; reduced: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const mat = useRef<THREE.MeshPhysicalMaterial>(null);
  const gBefore = useMemo(() => toothGeometry(spec.w, spec.h * spec.before.hScale, spec.before.chip), [spec]);
  const gAfter = useMemo(() => toothGeometry(spec.w, spec.h, false), [spec]);
  const after = new THREE.Color('#F3F1E8');
  const before = useMemo(() => new THREE.Color(spec.before.hex), [spec]);
  const a = THREE.MathUtils.degToRad(spec.angleDeg);
  const x = Math.sin(a) * ARCH_R;
  const z = Math.cos(a) * ARCH_R - ARCH_R;

  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    const k = reduced ? 1 : 1 - Math.pow(0.0005, dt);
    const ty = spec.before.dy * (1 - mix);
    const trz = spec.before.rz * (1 - mix);
    const try_ = -a + spec.before.ry * (1 - mix);
    g.position.y += (ty - g.position.y) * k;
    g.rotation.z += (trz - g.rotation.z) * k;
    g.rotation.y += (try_ - g.rotation.y) * k;
    if (mat.current) {
      mat.current.color.lerpColors(before, after, mix);
      mat.current.roughness = 0.42 - 0.26 * mix;
      mat.current.clearcoat = 0.2 + 0.8 * mix;
    }
  });

  return (
    <group ref={ref} position={[x, 0, z]} rotation={[0, -a, 0]}>
      {/* Two meshes crossfade so the chip genuinely disappears instead of lerping geometry. */}
      <mesh geometry={gBefore} castShadow visible={mix < 0.5}>
        <meshPhysicalMaterial ref={mat} color={spec.before.hex} roughness={0.42} clearcoat={0.2} clearcoatRoughness={0.3} envMapIntensity={1.2} />
      </mesh>
      <mesh geometry={gAfter} castShadow visible={mix >= 0.5}>
        <meshPhysicalMaterial color="#F4F2EA" roughness={0.14} clearcoat={1} clearcoatRoughness={0.08} sheen={0.3} sheenColor="#ffffff" envMapIntensity={1.6} />
      </mesh>
    </group>
  );
}

function Gum() {
  // A soft pink band following the arch above the teeth.
  const curve = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let d = -82; d <= 82; d += 4) {
      const a = THREE.MathUtils.degToRad(d);
      pts.push(new THREE.Vector3(Math.sin(a) * (ARCH_R + 0.05), 0.62, Math.cos(a) * (ARCH_R + 0.05) - ARCH_R));
    }
    return new THREE.CatmullRomCurve3(pts);
  }, []);
  const geo = useMemo(() => new THREE.TubeGeometry(curve, 64, 0.3, 20, false), [curve]);
  return (
    <mesh geometry={geo} receiveShadow scale={[1, 0.78, 1.15]} position={[0, 0.1, 0]}>
      <meshPhysicalMaterial color="#D98B8C" roughness={0.55} clearcoat={0.5} clearcoatRoughness={0.4} sheen={0.6} sheenColor="#F2B5B0" />
    </mesh>
  );
}

function Scene({ mix, reduced }: { mix: number; reduced: boolean }) {
  const all = useMemo(specs, []);
  const rig = useRef<THREE.Group>(null);
  useFrame((state, dt) => {
    if (!rig.current || reduced) return;
    const k = 1 - Math.pow(0.002, dt);
    rig.current.rotation.y += (state.pointer.x * 0.35 - rig.current.rotation.y) * k;
    rig.current.rotation.x += (-state.pointer.y * 0.12 + 0.08 - rig.current.rotation.x) * k;
  });
  return (
    <>
      <group ref={rig} rotation={[0.1, -0.35, 0]} position={[0, 0.05, 0.3]}>
        <Gum />
        {all.map((s, i) => <Tooth key={i} spec={s} mix={mix} reduced={reduced} />)}
        <ContactShadows position={[0, -0.62, -0.6]} opacity={0.28} blur={2.8} far={1.6} scale={7} color="#16181B" />
      </group>
      <directionalLight position={[-2.5, 5, 5]} intensity={1.7} castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.0004} />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={4.5} position={[-1.5, 4, 3]} rotation={[-Math.PI / 3, 0, 0]} scale={[6, 3, 1]} />
        <Lightformer form="rect" intensity={1.4} position={[-6, 1, 3]} rotation={[0, Math.PI / 2, 0]} scale={[4, 3, 1]} color="#dfe6f2" />
        <Lightformer form="rect" intensity={1.1} position={[6, 0.5, 2]} rotation={[0, -Math.PI / 2, 0]} scale={[4, 3, 1]} color="#f6e7d2" />
        <Lightformer form="ring" intensity={1.2} position={[2, 2, 7]} scale={[3, 3, 1]} />
      </Environment>
    </>
  );
}

export default function VeneerArch() {
  const [mix, setMix] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: '120px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={host} className={styles.wrap}>
      <div className={styles.gl}>
        <Canvas
          dpr={[1, 1.6]}
          camera={{ position: [0.4, 0.5, 6.4], fov: 30 }}
          gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
          shadows
          frameloop={visible ? 'always' : 'never'}
          fallback={<div className={styles.fallback}>A 3D preview needs WebGL. The process is explained below.</div>}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <Scene mix={mix} reduced={reduced} />
          </Suspense>
        </Canvas>
      </div>
      <div className={styles.ctl}>
        <span className={styles.lbl}>Before</span>
        <input
          className={styles.range}
          type="range" min={0} max={100} value={Math.round(mix * 100)}
          onChange={(e) => setMix(Number(e.target.value) / 100)}
          aria-label="Morph between before and after"
          aria-valuetext={`${Math.round(mix * 100)}% after`}
        />
        <span className={styles.lbl}>After</span>
      </div>
      <p className={styles.note}>An illustration, not a patient. Drag to see what porcelain changes: alignment, shape, shade, and edges — and what it leaves alone.</p>
    </div>
  );
}
