'use client';

import { Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

export type Shade = { id: string; hex: string; label: string };

type Props = {
  shades: Shade[];
  selected: number;
  onSelect: (i: number) => void;
  skin: string;          // resolved hex
  translucency: number;  // 0–100
  fallback: ReactNode;
  compact?: boolean;
};

const TAB_W = 0.84;   // geometry width incl. bevel
const PITCH = 1.22;   // centre-to-centre spacing in world units

/* Incisor-shaped tab: narrower rounded cervical end up top, flat incisal edge with soft corners
   at the bottom, extruded thin and given a convex labial face. */
function tabGeometry() {
  const s = new THREE.Shape();
  const topW = 0.28, botW = 0.40, top = 0.72, bot = -0.72;
  s.moveTo(-topW, top - 0.2);
  s.quadraticCurveTo(-topW, top, 0, top);
  s.quadraticCurveTo(topW, top, topW, top - 0.2);
  s.lineTo(botW, bot + 0.14);
  s.quadraticCurveTo(botW, bot, botW - 0.11, bot);
  s.lineTo(-botW + 0.11, bot);
  s.quadraticCurveTo(-botW, bot, -botW, bot + 0.14);
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, {
    depth: 0.18, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.045, bevelSegments: 5, curveSegments: 28,
  });
  g.center();
  const pos = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    if (z > 0.01) {
      const nx = x / 0.44, ny = y / 0.76;
      const dome = Math.max(0, 1 - nx * nx * 0.85 - ny * ny * 0.5);
      pos.setZ(i, z + dome * 0.13);
    }
  }
  pos.needsUpdate = true;
  g.computeVertexNormals();
  // Vertex colours carry the shade body → incisal translucency gradient.
  g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(pos.count * 3), 3));
  return g;
}

/** Paint shade body colour with a translucent incisal third that shows the skin tone through it. */
function paint(g: THREE.BufferGeometry, shadeHex: string, skinHex: string, t: number) {
  const pos = g.attributes.position as THREE.BufferAttribute;
  const col = g.attributes.color as THREE.BufferAttribute;
  const body = new THREE.Color(shadeHex).convertSRGBToLinear();
  const skin = new THREE.Color(skinHex).convertSRGBToLinear();
  // What a translucent edge reads as: the shade, darkened by what's behind it, with a cool enamel cast.
  const edge = body.clone().lerp(skin, 0.42 * t).lerp(new THREE.Color('#9aa6b8').convertSRGBToLinear(), 0.08 * t);
  const reach = 0.25 + 0.45 * t;   // how far up from the incisal edge the translucency climbs (0–1 of height)
  const c = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);                      // -0.75 … 0.75
    const fromEdge = (y + 0.75) / 1.5;          // 0 at incisal edge, 1 at cervical
    const k = THREE.MathUtils.smoothstep(fromEdge, 0, reach);   // 0 at edge → 1 above reach
    c.copy(edge).lerp(body, k);
    col.setXYZ(i, c.r, c.g, c.b);
  }
  col.needsUpdate = true;
}

function Tab({ geometry, index, selected, hovered, onHover, onClick, reduced }: {
  geometry: THREE.BufferGeometry; index: number; selected: boolean; hovered: boolean;
  onHover: (v: boolean) => void; onClick: () => void; reduced: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, dt) => {
    const g = ref.current;
    if (!g) return;
    const k = 1 - Math.pow(0.001, dt);
    const lift = selected ? 0.14 : hovered ? 0.06 : 0;
    const idle = reduced ? 0 : Math.sin(state.clock.elapsedTime * 0.7 + index) * 0.006;
    g.position.y += (lift + idle - g.position.y) * k;
    g.rotation.x += ((selected ? -0.3 : -0.18) - g.rotation.x) * k;
  });
  return (
    <group ref={ref} rotation={[-0.18, 0, 0]}>
      <mesh
        geometry={geometry}
        castShadow
        position={[0, 0.76, 0]}
        onPointerOver={(e) => { e.stopPropagation(); onHover(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { onHover(false); document.body.style.cursor = ''; }}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
      >
        <meshPhysicalMaterial
          vertexColors
          color="#ffffff"
          roughness={0.14}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.08}
          sheen={0.3}
          sheenRoughness={0.45}
          sheenColor="#ffffff"
          envMapIntensity={1.7}
          specularIntensity={1.2}
        />
      </mesh>
    </group>
  );
}

function Scene({ shades, selected, onSelect, skin, translucency, reduced }: Omit<Props, 'fallback' | 'compact'> & { reduced: boolean }) {
  const n = shades.length;
  // One geometry per tab so each carries its own vertex colours.
  const geos = useMemo(() => shades.map(() => tabGeometry()), [shades]);
  useEffect(() => { geos.forEach((g, i) => paint(g, shades[i].hex, skin, translucency / 100)); }, [geos, shades, skin, translucency]);
  useEffect(() => () => geos.forEach((g) => g.dispose()), [geos]);

  const [hover, setHover] = useState<number | null>(null);
  const rig = useRef<THREE.Group>(null);
  const vw = useThree((s) => s.viewport.width);
  // Fit the full row into ~86% of the visible width at the tabs' depth.
  const scale = Math.min(1.4, (vw * 0.86) / (n * PITCH));

  useFrame((state, dt) => {
    if (!rig.current || reduced) return;
    const k = 1 - Math.pow(0.003, dt);
    rig.current.rotation.y += (state.pointer.x * 0.16 - rig.current.rotation.y) * k;
  });

  return (
    <>
      <group ref={rig} scale={scale} position={[0, -0.78 * scale, 0]}>
        {shades.map((s, i) => (
          <group key={s.id} position={[(i - (n - 1) / 2) * PITCH, 0, 0]}>
            <Tab
              index={i}
              geometry={geos[i]}
              selected={selected === i}
              hovered={hover === i}
              onHover={(v) => setHover(v ? i : null)}
              onClick={() => onSelect(i)}
              reduced={reduced}
            />
          </group>
        ))}
        <ContactShadows position={[0, 0.005, 0.1]} opacity={0.55} blur={2.2} far={2.2} scale={12} resolution={1024} color="#1a0f08" frames={reduced ? 1 : Infinity} />
      </group>

      <directionalLight position={[-3, 6, 5]} intensity={1.8} castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.0004} />
      <ambientLight intensity={0.12} />
      <Environment resolution={256}>
        {/* Softbox above-front gives the labial dome its highlight; rims keep the edges reading. */}
        <Lightformer form="rect" intensity={5} position={[-1.5, 4, 3]} rotation={[-Math.PI / 3, 0, 0]} scale={[6, 3, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={1.6} position={[-7, 2, 2]} rotation={[0, Math.PI / 2, 0]} scale={[5, 4, 1]} color="#e9eef6" />
        <Lightformer form="rect" intensity={1.2} position={[7, 1.5, 2]} rotation={[0, -Math.PI / 2, 0]} scale={[5, 4, 1]} color="#fbf1e2" />
        <Lightformer form="ring" intensity={1.2} position={[2, 2.5, 8]} scale={[3, 3, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={0.5} position={[0, -3, 4]} rotation={[Math.PI / 2, 0, 0]} scale={[8, 4, 1]} color="#d9c7b4" />
      </Environment>
    </>
  );
}

function LookAt() {
  const { camera } = useThree();
  useEffect(() => { camera.lookAt(0, 0.35, 0); }, [camera]);
  return null;
}

export default function PorcelainTabs(props: Props) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const el = host.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: '120px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={host} style={{ position: 'absolute', inset: 0 }}>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 1.5, 8.2], fov: 22, near: 0.1, far: 60 }}
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
        shadows
        frameloop={visible ? 'always' : 'never'}
        fallback={props.fallback}
        style={{ background: 'transparent' }}
      >
        <LookAt />
        <Suspense fallback={null}>
          <Scene {...props} reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
}
