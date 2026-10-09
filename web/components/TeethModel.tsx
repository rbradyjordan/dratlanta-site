'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { LoopSubdivision } from 'three-subdivide';
import { Brush, Evaluator, SUBTRACTION } from 'three-bvh-csg';
import styles from './VeneerArch.module.css';

/**
 * Real dentition viewer (an anatomical model, not a patient).
 * The asset's teeth arrive as one mesh whose crowns are separate shells, so at load we split it
 * into individual teeth by connectivity and tell the arches apart by where each crown's gum-line
 * edge sits. Every tooth becomes its own object, which lets the "before" state carry a missing
 * lateral, a real CSG chip, drifted and crowded teeth and procedural staining — all of which
 * resolve as the slider moves — while a shader veneers the front band's shade and gloss.
 */

type Props = {
  src: string;
  gumMatch?: RegExp;
  teethMatch?: RegExp;
  hideMatch?: RegExp;
  anteriorSpan?: number;
  rotation?: [number, number, number];
  zoom?: number;
  credit?: string;
};

type Shader = { uniforms: Record<string, { value: unknown }> };
type Patched = THREE.MeshPhysicalMaterial & { userData: { shader?: Shader } };
const PORCELAIN = new THREE.Color('#F5F3EC');

/**
 * Veneer the forward-most band (shade lifts toward porcelain, surface tightens). For the intact
 * copy of the chipped tooth, also discard everything inside a sphere given in the tooth's own
 * local space — the same sphere the CSG cut used — so the real fracture geometry underneath
 * shows through until uChipR shrinks and the corner "grows back".
 */
function patchVeneer(mat: THREE.MeshPhysicalMaterial, zCut: number, feather: number, chip?: { c: THREE.Vector3; r: number }, look: { grey?: number; biteY?: number; crackSeed?: number } = {}) {
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uMix = { value: 0 };
    shader.uniforms.uZCut = { value: zCut };
    shader.uniforms.uFeather = { value: feather };
    shader.uniforms.uPorcelain = { value: PORCELAIN.clone().convertSRGBToLinear() };
    shader.uniforms.uChipOn = { value: chip ? 1 : 0 };
    shader.uniforms.uChipC = { value: chip ? chip.c.clone() : new THREE.Vector3() };
    shader.uniforms.uChipR = { value: chip ? chip.r : 0 };
    shader.uniforms.uGrey = { value: look.grey ?? 0 };
    shader.uniforms.uBiteY = { value: look.biteY ?? 0 };
    shader.uniforms.uCrackSeed = { value: look.crackSeed ?? -1 };
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float aGum; attribute float aSeed; attribute float aVeneer;\nvarying vec3 vTeethPos; varying vec3 vLocalPos; varying float vGum; varying float vSeed; varying float vVeneer;')
      .replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvTeethPos = (modelMatrix * vec4(transformed, 1.0)).xyz;\nvLocalPos = transformed;\nvGum = aGum; vSeed = aSeed; vVeneer = aVeneer;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', [
        '#include <common>',
        'varying vec3 vTeethPos; varying vec3 vLocalPos; varying float vGum; varying float vSeed; varying float vVeneer;',
        'uniform float uMix; uniform float uZCut; uniform float uFeather; uniform vec3 uPorcelain;',
        'uniform float uChipOn; uniform vec3 uChipC; uniform float uChipR; uniform float uGrey; uniform float uBiteY; uniform float uCrackSeed;',
        'float teethMix; float stainAmt;',
        // Cheap 3D value noise for procedural staining (no texture files).
        'float tHash(vec3 p) { p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3)); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }',
        'float tNoise(vec3 p) { vec3 i = floor(p); vec3 f = fract(p); f = f * f * (3.0 - 2.0 * f);',
        '  return mix(mix(mix(tHash(i), tHash(i + vec3(1,0,0)), f.x), mix(tHash(i + vec3(0,1,0)), tHash(i + vec3(1,1,0)), f.x), f.y),',
        '             mix(mix(tHash(i + vec3(0,0,1)), tHash(i + vec3(1,0,1)), f.x), mix(tHash(i + vec3(0,1,1)), tHash(i + vec3(1,1,1)), f.x), f.y), f.z); }',
        'float tFbm(vec3 p) { return 0.5 * tNoise(p) + 0.25 * tNoise(p * 2.1 + 3.7) + 0.125 * tNoise(p * 4.3 + 9.1) + 0.0625 * tNoise(p * 8.7 + 1.3); }',
      ].join('\n'))
      .replace('#include <map_fragment>', 'if (uChipOn > 0.5 && distance(vLocalPos, uChipC) < uChipR) discard;\n#include <map_fragment>')
      .replace('#include <color_fragment>', [
        '#include <color_fragment>',
        // Porcelain only on the veneer set (per-tooth flag), not a depth band — premolars and the
        // lower incisors would otherwise be swept in. The neglect concentrates on the same teeth:
        // the rest are merely dingy before and only get a light clean-up after (no filthy→white swing).
        'teethMix = uMix * vVeneer;',
        'float frontBand = vVeneer;',
        'float polish = uMix * mix(0.45, 1.0, frontBand);',
        // "Before": dingy enamel; extrinsic stain that gathers toward the gum line and in the
        // contacts between teeth (side-facing surfaces); fine dark speckling; a greyer cast on the
        // traumatised tooth. "After": whitened everywhere, porcelain on the front band.
        // Every tooth gets its own draw: some nearly clean, some filthy, some with heavy calculus.
        'float tv = tHash(vec3(vSeed * 37.1, 1.3, 2.7));',
        'float tv2 = tHash(vec3(vSeed * 11.7, 5.9, 0.4));',
        'float dirt = 1.8 * pow(tv, 1.8) * mix(0.3, 1.0, frontBand);',          // most teeth modest, a few filthy, some nearly clean
        'float crust = 1.7 * smoothstep(0.45, 0.9, tv2) * mix(0.35, 1.0, frontBand);', // calculus only on some teeth
        'float cerv = smoothstep(0.3, 0.85, vGum);',
        'float side = smoothstep(0.35, 0.85, abs(normalize(vNormal).x));',
        'float blotch = tFbm(vTeethPos * 24.0);',
        // Heavy extrinsic stain: most of the gum half, the contacts, and mottling across the labial face.
        'float stain = smoothstep(0.30, 0.62, blotch) * (0.35 + 0.65 * max(cerv, side)) * dirt;',
        'float speck = smoothstep(0.78, 0.88, tNoise(vTeethPos * 150.0)) * (0.5 + 0.5 * cerv) * dirt;',
        // Calculus: a thick, lumpy, yellow-brown crust along the gum line, heaviest between teeth.
        'float tartar = smoothstep(0.66, 0.84, vGum) * smoothstep(0.18, 0.45, tNoise(vTeethPos * 70.0) + 0.35 * side) * crust;',
        // Craze line on one tooth: a thin, jittered crack rising from the biting edge on the labial face.
        'float crack = 0.0;',
        'if (abs(vSeed - uCrackSeed) < 0.002) {',
        '  float facing = smoothstep(0.15, 0.55, normalize(vNormal).z);',
        '  float path = -0.01 + 0.03 * vGum + 0.012 * sin(vGum * 11.0 + 1.0) + 0.004 * sin(vGum * 37.0 + 0.6);',
        '  float line = 1.0 - smoothstep(0.0, 0.0028, abs(vLocalPos.x - path));',
        '  float path2 = path + 0.016 + 0.01 * (vGum - 0.3) + 0.004 * sin(vGum * 23.0);',
        '  float line2 = (1.0 - smoothstep(0.0, 0.0018, abs(vLocalPos.x - path2))) * smoothstep(0.26, 0.32, vGum) * (1.0 - smoothstep(0.46, 0.54, vGum));',
        '  crack = (line * (1.0 - smoothstep(0.55, 0.72, vGum)) + 0.6 * line2) * facing;',
        '}',
        'stainAmt = clamp(stain + 0.5 * speck + tartar + crack, 0.0, 1.0);',
        'float tvF = tv * mix(0.45, 1.0, frontBand);',
        'vec3 dingy = diffuseColor.rgb * mix(mix(vec3(0.97, 0.94, 0.86), vec3(0.84, 0.75, 0.52), tvF), vec3(0.70, 0.58, 0.36), cerv * mix(0.15, 1.1, tvF));',
        'dingy = mix(dingy, dingy * vec3(0.50, 0.36, 0.20), clamp(stain, 0.0, 1.0) * 0.95);',
        'dingy *= 1.0 - 0.5 * clamp(speck, 0.0, 1.0);',
        'dingy = mix(dingy, vec3(0.70, 0.58, 0.32) * (0.75 + 0.5 * tNoise(vTeethPos * 200.0)), clamp(tartar, 0.0, 1.0) * 0.95);',
        'dingy = mix(dingy, dingy * vec3(0.30, 0.26, 0.22), clamp(crack, 0.0, 1.0));',
        'dingy = mix(dingy, dingy * vec3(0.72, 0.74, 0.76), uGrey * 0.7);',
        'vec3 clean = diffuseColor.rgb * vec3(0.98, 0.95, 0.89);',
        'vec3 enamel = mix(dingy, clean, polish);',
        'vec3 porcelain = mix(diffuseColor.rgb, uPorcelain, 0.9) * 1.12;',
        'diffuseColor.rgb = mix(enamel, porcelain, teethMix);',
      ].join('\n'))
      .replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\nroughnessFactor = mix(mix(max(roughnessFactor, 0.5) + 0.2 * stainAmt, 0.35, polish), 0.12, teethMix);');
    (mat as Patched).userData.shader = shader as Shader;
  };
  mat.customProgramCacheKey = () => 'teeth-veneer-v14';
  mat.needsUpdate = true;
}

/** Build a mesh from a subset of a geometry's triangles, centred on its own origin. */
function subMesh(src: THREE.BufferGeometry, tris: number[], material: THREE.Material, world: THREE.Matrix4): THREE.Mesh {
  const remap = new Map<number, number>();
  const idx: number[] = [];
  for (const i of tris) { let n = remap.get(i); if (n === undefined) { n = remap.size; remap.set(i, n); } idx.push(n); }
  const geo = new THREE.BufferGeometry();
  for (const name of Object.keys(src.attributes)) {
    if (name === 'tangent') continue;                  // handedness does not survive averaging; three derives tangents instead
    // Accessors, not raw offsets: glTF attributes are often interleaved.
    const a = src.attributes[name] as THREE.BufferAttribute | THREE.InterleavedBufferAttribute;
    const dst = new Float32Array(remap.size * a.itemSize);
    for (const [o, n] of remap) for (let c = 0; c < a.itemSize; c++) dst[n * a.itemSize + c] = a.getComponent(o, c);
    geo.setAttribute(name, new THREE.BufferAttribute(dst, a.itemSize));
  }
  geo.setIndex(idx);
  // Bake the source mesh's world transform so each tooth lives in world space with identity parent.
  geo.applyMatrix4(world);
  geo.computeBoundingBox();
  const c = geo.boundingBox!.getCenter(new THREE.Vector3());
  geo.translate(-c.x, -c.y, -c.z);
  geo.computeVertexNormals();
  const m = new THREE.Mesh(geo, material);
  m.position.copy(c);
  m.castShadow = m.receiveShadow = true;
  return m;
}

/** Loop-subdivide a tooth in place. The asset is ~150 vertices per tooth, too coarse for close-ups and for a clean fracture. */
function refine(m: THREE.Mesh, iterations: number) {
  if (iterations <= 0) return;
  const g = LoopSubdivision.modify(m.geometry, iterations, { split: false, uvSmooth: true, preserveEdges: true, maxTriangles: 60000 });
  g.computeVertexNormals();
  g.computeBoundingBox();
  m.geometry.dispose();
  m.geometry = g;
}

type Tooth = { mesh: THREE.Mesh; upper: boolean; theta: number; box: THREE.Box3; local: THREE.Box3; seed: number };

/**
 * Split the combined teeth mesh into individual teeth. The asset's crowns are separate shells
 * (connected components), so connectivity is exact — no arch heuristics. Each shell is open at
 * the gum line; whether that open edge sits above or below the crown's centre says which arch
 * it belongs to. Returns [] if the mesh does not come apart into enough shells.
 */
function segmentTeeth(mesh: THREE.Mesh, material: THREE.Material): Tooth[] {
  mesh.updateMatrixWorld(true);
  const g = mesh.geometry;
  const pos = g.attributes.position as THREE.BufferAttribute;
  const W = mesh.matrixWorld;
  const wp = new Float32Array(pos.count * 3);
  const v = new THREE.Vector3();
  const box = new THREE.Box3();
  for (let i = 0; i < pos.count; i++) {
    v.set(pos.getX(i), pos.getY(i), pos.getZ(i)).applyMatrix4(W);
    wp[i * 3] = v.x; wp[i * 3 + 1] = v.y; wp[i * 3 + 2] = v.z;
    box.expandByPoint(v);
  }
  const size = box.getSize(new THREE.Vector3());
  const cx = box.min.x + size.x / 2;
  const cz = box.min.z + size.z * 0.22;       // arch centre sits toward the back
  const thetaOf = (x: number, z: number) => Math.atan2(x - cx, z - cz);

  // Vertex identity: shared indices when the geometry has them, otherwise coincident positions.
  const n = pos.count;
  const index: ArrayLike<number> = g.index ? g.index.array : Array.from({ length: n }, (_, i) => i);
  const ids = new Int32Array(n);
  if (g.index) {
    for (let i = 0; i < n; i++) ids[i] = i;
  } else {
    const seen = new Map<string, number>();
    for (let i = 0; i < n; i++) {
      const k = `${wp[i * 3].toFixed(4)},${wp[i * 3 + 1].toFixed(4)},${wp[i * 3 + 2].toFixed(4)}`;
      let id = seen.get(k); if (id === undefined) { id = i; seen.set(k, id); }
      ids[i] = id;
    }
  }
  // Union–find over vertices → connected shells.
  const parent = new Int32Array(n);
  for (let i = 0; i < n; i++) parent[i] = i;
  const find = (x: number) => { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };
  const union = (a: number, b: number) => { const ra = find(a), rb = find(b); if (ra !== rb) parent[ra] = rb; };
  for (let t = 0; t < index.length; t += 3) { union(ids[index[t]], ids[index[t + 1]]); union(ids[index[t + 1]], ids[index[t + 2]]); }
  const shells = new Map<number, number[]>();
  for (let t = 0; t < index.length; t += 3) {
    const r = find(ids[index[t]]);
    const arr = shells.get(r) ?? []; arr.push(index[t], index[t + 1], index[t + 2]); shells.set(r, arr);
  }
  if (shells.size < 8) return [];

  const result: Tooth[] = [];
  let k = 0;
  for (const tris of shells.values()) {
    if (tris.length < 90) continue;
    const seed = (k++ + 0.5) / shells.size;                    // stable per-tooth value for shader variation
    // The gum-line edge is the set of edges used by a single triangle. Above the crown's centre → upper arch.
    const edgeCount = new Map<number, number>();
    for (let t = 0; t < tris.length; t += 3) {
      for (let e = 0; e < 3; e++) {
        const a = ids[tris[t + e]], b = ids[tris[t + ((e + 1) % 3)]];
        const k = a < b ? a * n + b : b * n + a;
        edgeCount.set(k, (edgeCount.get(k) ?? 0) + 1);
      }
    }
    let yMin = Infinity, yMax = -Infinity;
    for (let t = 0; t < tris.length; t++) { const y = wp[tris[t] * 3 + 1]; if (y < yMin) yMin = y; if (y > yMax) yMax = y; }
    let bySum = 0, bN = 0;
    for (const [k, c] of edgeCount) {
      if (c !== 1) continue;
      const a = Math.floor(k / n), b = k % n;                  // ids are vertex indices, so they address wp directly
      bySum += wp[a * 3 + 1] + wp[b * 3 + 1]; bN += 2;
    }
    const mid = (yMin + yMax) / 2;
    const upper = bN ? bySum / bN > mid : mid > box.min.y + size.y / 2;
    const m = subMesh(g, tris, material, W);
    const th = thetaOf(m.position.x, m.position.z);
    refine(m, upper && Math.abs(th) < 1.05 ? 2 : 1);          // the upper front six carry the story and the close-up
    const local = m.geometry.boundingBox!.clone();            // centred on the tooth's own origin
    // Per-vertex gum-line coordinate (0 = biting edge, 1 = gum line) for staining and tartar.
    {
      const pa = m.geometry.attributes.position as THREE.BufferAttribute;
      const gum = new Float32Array(pa.count);
      const hh = local.max.y - local.min.y || 1;
      for (let i = 0; i < pa.count; i++) gum[i] = upper ? (pa.getY(i) - local.min.y) / hh : (local.max.y - pa.getY(i)) / hh;
      m.geometry.setAttribute('aGum', new THREE.BufferAttribute(gum, 1));
      m.geometry.setAttribute('aSeed', new THREE.BufferAttribute(new Float32Array(pa.count).fill(seed), 1));
    }
    const bb = local.clone().translate(m.position);           // where it sits in display space
    result.push({ mesh: m, upper, theta: th, box: bb, local, seed });
  }
  return result;
}

type Damage = {
  mesh: THREE.Mesh; kind: 'missing' | 'chip' | 'pose';
  mat?: THREE.MeshPhysicalMaterial; chipped?: THREE.Mesh; r0?: number; r1?: number; center?: THREE.Vector3;
  // pose: where the tooth sits "before" (rotation + offset from its home), resolving over the mix window
  rot?: THREE.Euler; offset?: THREE.Vector3; home?: THREE.Vector3; also?: THREE.Mesh[]; win?: [number, number];
};

/**
 * Cut a real incisal chip out of a tooth (local frame, origin = tooth centre). The cutter is a
 * large, gently lumpy sphere sitting off the mesial-incisal corner — the classic central-incisor
 * fracture, and the one corner no neighbour hides — so the break reads as an oblique, slightly
 * concave surface with an irregular rim rather than a planar notch. It bites deeper on the
 * labial face than the lingual, the way enamel actually fails.
 * Returns the chipped mesh plus the sphere so the intact tooth can mask the same region.
 */
function chipTooth(tooth: Tooth, toothMat: THREE.Material, fractureMat: THREE.Material) {
  const b = tooth.local, h = b.max.y - b.min.y, w = b.max.x - b.min.x;
  const sgn = tooth.theta >= 0 ? 1 : -1;                      // +1: the tooth sits at +x, so mesial (midline) is -x
  const mesialX = sgn > 0 ? b.min.x : b.max.x;
  const zF = b.max.z, zMid = (b.min.z + b.max.z) / 2;
  // Break line on the labial face: from ~42% along the biting edge up to ~30% of crown height at the mesial side.
  const a1 = new THREE.Vector3(mesialX + sgn * 0.42 * w, b.min.y, zF);
  const a2 = new THREE.Vector3(mesialX - sgn * 0.02 * w, b.min.y + 0.30 * h, zF);
  const corner = new THREE.Vector3(mesialX, b.min.y, zF);
  const R = 1.15 * h;
  const mid = a1.clone().add(a2).multiplyScalar(0.5);
  const u = a2.clone().sub(a1).normalize();
  const n = new THREE.Vector3(u.y, -u.x, 0);
  if (n.dot(corner.clone().sub(mid)) < 0) n.negate();         // centre lies on the corner's side of the line
  // Centre sits in FRONT of the labial face: the sphere shears enamel off the face and leaves a
  // fracture surface that faces the viewer (a bevel), while the lingual side keeps more.
  const zC = zF + 0.7 * (zF - zMid);
  const dz = zC - zF, half = a1.distanceTo(a2) / 2;
  const d = Math.sqrt(Math.max(0, R * R - dz * dz - half * half));
  const c = mid.clone().addScaledVector(n, d); c.z = zC;

  const amp = 0.05 * h, f = (Math.PI * 2) / (0.2 * h);
  const cutter = new THREE.IcosahedronGeometry(R, 4);
  const p = cutter.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const x = v.x + c.x, y = v.y + c.y, z = v.z + c.z;
    const nz = Math.sin(x * f + 1.7) * Math.cos(y * f * 1.3 + 0.4) + 0.6 * Math.sin(z * f * 0.8 + 2.9) * Math.sin(x * f * 1.9 + y * f * 0.7);
    v.multiplyScalar(1 + (amp * nz) / R);                   // same position → same offset, so the shell stays watertight
    p.setXYZ(i, v.x + c.x, v.y + c.y, v.z + c.z);
  }
  cutter.computeVertexNormals();

  // The cutter carries the same gum-line coordinate as the tooth so the CSG can interpolate it.
  const gum = new Float32Array(p.count);
  for (let i = 0; i < p.count; i++) gum[i] = THREE.MathUtils.clamp((p.getY(i) - b.min.y) / h, 0, 1);
  cutter.setAttribute('aGum', new THREE.BufferAttribute(gum, 1));
  cutter.setAttribute('aSeed', new THREE.BufferAttribute(new Float32Array(p.count).fill(tooth.seed), 1));
  cutter.setAttribute('aVeneer', new THREE.BufferAttribute(new Float32Array(p.count).fill(1), 1));

  const ev = new Evaluator();
  ev.attributes = ['position', 'normal', 'uv', 'aGum', 'aSeed', 'aVeneer'];
  ev.useGroups = true;
  const brushA = new Brush(tooth.mesh.geometry.clone(), toothMat); brushA.updateMatrixWorld();
  const brushB = new Brush(cutter, fractureMat); brushB.updateMatrixWorld();
  const chipped = ev.evaluate(brushA, brushB, SUBTRACTION) as THREE.Mesh;
  chipped.position.copy(tooth.mesh.position);
  chipped.castShadow = chipped.receiveShadow = true;
  // Mask radius with margin for the lumps, shrinking only as far as needed to uncover the corner.
  const r0 = R + amp * 1.3 + 0.01 * h;
  const r1 = Math.max(0, c.distanceTo(corner) - 0.15 * h);
  return { chipped, c, r0, r1 };
}

const GUM_MATCH = /gum|gingiv|tissue|mucosa/i;
const TEETH_MATCH = /tooth|teeth|enamel|dent/i;
const HIDE_MATCH = /base|stand|plate|plinth|support/i;
const NO_ROTATION: [number, number, number] = [0, 0, 0];
let prepCount = 0;

function Model({ src, gumMatch = GUM_MATCH, teethMatch = TEETH_MATCH, hideMatch = HIDE_MATCH, anteriorSpan = 0.38, rotation = NO_ROTATION, zoom = 1, mix, reduced }:
  Props & { mix: number; reduced: boolean }) {
  const { scene } = useGLTF(src);
  const rig = useRef<THREE.Group>(null);

  const prepared = useMemo(() => {
    const t0 = performance.now();
    if (process.env.NODE_ENV !== 'production') prepCount++;
    const root = scene.clone(true);
    root.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const scale = (3.4 * zoom) / Math.max(size.x, size.y, size.z);
    root.position.copy(center).multiplyScalar(-scale);
    root.scale.setScalar(scale);
    const display = new THREE.Group();
    display.rotation.set(rotation[0], rotation[1], rotation[2]);
    display.add(root);
    display.updateMatrixWorld(true);

    const toPhysical = (srcMat: THREE.MeshStandardMaterial) =>
      (srcMat as unknown as { isMeshPhysicalMaterial?: boolean }).isMeshPhysicalMaterial
        ? (srcMat as THREE.MeshPhysicalMaterial).clone()
        : new THREE.MeshPhysicalMaterial({
            color: srcMat.color?.clone() ?? new THREE.Color('#ffffff'),
            map: srcMat.map ?? null, normalMap: srcMat.normalMap ?? null,
            normalScale: srcMat.normalScale?.clone() ?? new THREE.Vector2(1, 1),
            roughnessMap: srcMat.roughnessMap ?? null, metalnessMap: srcMat.metalnessMap ?? null,
            roughness: srcMat.roughness ?? 0.6, metalness: srcMat.metalness ?? 0,
          });

    const teethMats: THREE.MeshPhysicalMaterial[] = [];
    const teeth: Tooth[] = [];
    const teethLayer = new THREE.Group();          // separated teeth live here, in display space
    const meshes: THREE.Mesh[] = [];
    root.traverse((o) => { if ((o as THREE.Mesh).isMesh) meshes.push(o as THREE.Mesh); });

    for (const m of meshes) {
      const srcMat = m.material as THREE.MeshStandardMaterial;
      const name = `${m.name} ${srcMat?.name ?? ''}`;
      if (hideMatch.test(name)) { m.visible = false; continue; }
      const mat = toPhysical(srcMat);
      const isGum = gumMatch.test(name) && !teethMatch.test(name);
      if (isGum) {
        mat.side = THREE.FrontSide;
        mat.roughness = Math.min(mat.roughness ?? 0.6, 0.55);
        mat.clearcoat = 0.35; mat.clearcoatRoughness = 0.45;
        mat.sheen = 0.5; mat.sheenColor = new THREE.Color('#F0B4AE'); mat.sheenRoughness = 0.7;
        mat.envMapIntensity = 1.2;
        m.material = mat; m.castShadow = m.receiveShadow = true;
        m.geometry.deleteAttribute('tangent');
        refine(m, 1);
        continue;
      }
      // Separated teeth are open shells; drawing both faces keeps a seam or a moved tooth from reading as a black hole.
      mat.side = THREE.DoubleSide;
      mat.clearcoat = 0.4; mat.clearcoatRoughness = 0.18;
      mat.specularIntensity = 1; mat.ior = 1.5; mat.envMapIntensity = 1.6;
      const parts = segmentTeeth(m, mat);
      if (parts.length >= 16) {
        m.visible = false;                            // the combined mesh is replaced by its teeth
        parts.forEach((t) => teethLayer.add(t.mesh));
        teeth.push(...parts);
      } else {
        m.material = mat; m.castShadow = m.receiveShadow = true;
      }
      teethMats.push(mat);
    }
    // teethLayer is in world/display space already (transforms baked), so it hangs off display's parent frame.
    const stage = new THREE.Group();
    stage.add(display); stage.add(teethLayer);

    // The veneer set: upper centrals through first premolars (eight teeth). Only these go to
    // porcelain; everything else is merely cleaned, so the back teeth never swing filthy→white.
    for (const t of teeth) {
      const v = t.upper && Math.abs(t.theta) <= 0.7 ? 1 : 0;
      const n = t.mesh.geometry.attributes.position.count;
      t.mesh.geometry.setAttribute('aVeneer', new THREE.BufferAttribute(new Float32Array(n).fill(v), 1));
    }

    // Front band for the veneer shader.
    const tb = new THREE.Box3();
    (teeth.length ? teeth.map((t) => t.mesh) : meshes).forEach((m) => tb.expandByObject(m));
    const zCut = tb.min.z + (tb.max.z - tb.min.z) * (1 - anteriorSpan);
    const feather = (tb.max.z - tb.min.z) * 0.06;
    const biteY = (tb.min.y + tb.max.y) / 2;                 // staining gathers away from the bite, toward the gum line
    // The craze line lives on the left central (the one beside the gap).
    const upperSorted = teeth.filter((t) => t.upper).sort((a, b) => a.theta - b.theta);
    const midIdx = upperSorted.findIndex((t) => t.theta >= 0);
    const crackSeed = upperSorted.length >= 8 && midIdx > 0 ? upperSorted[midIdx - 1].seed : -1;
    teethMats.forEach((mat) => patchVeneer(mat, zCut, feather, undefined, { biteY, crackSeed }));

    // Cast the "before" story on the upper front teeth.
    const damage: Damage[] = [];
    const front = teeth.filter((t) => t.upper).sort((a, b) => a.theta - b.theta);
    if (front.length >= 8) {
      const mid = front.findIndex((t) => t.theta >= 0);
      const at = (k: number) => front[Math.min(front.length - 1, Math.max(0, mid + k))];
      const centralL = at(0), centralR = at(-1), lateralR = at(-2), canineR = at(-3), lateralL = at(1), canineL = at(2);
      const pose = (t: Tooth, rot: THREE.Euler, offset: THREE.Vector3, win: [number, number] = [0.1, 0.6], also: THREE.Mesh[] = []) =>
        damage.push({ mesh: t.mesh, kind: 'pose', rot, offset, home: t.mesh.position.clone(), also, win });
      // Missing lateral; the neighbours have drifted toward the space, as teeth do.
      damage.push({ mesh: lateralR.mesh, kind: 'missing' });
      pose(centralR, new THREE.Euler(0, -0.1, 0.05), new THREE.Vector3(-0.025, 0.01, 0.01), [0.15, 0.65]);
      pose(canineR, new THREE.Euler(0.02, 0.08, -0.07), new THREE.Vector3(0.02, 0, 0.01), [0.15, 0.65]);
      // Crowded lateral on the other side: turned and tucked behind the arch.
      pose(lateralL, new THREE.Euler(0.03, -0.32, 0.02), new THREE.Vector3(0.01, 0.02, -0.06), [0.1, 0.6]);
      // Canine standing proud.
      pose(canineL, new THREE.Euler(0.04, 0.22, 0.08), new THREE.Vector3(0, -0.01, 0.035), [0.1, 0.6]);
      // Chipped central: real CSG fracture underneath, intact copy masked by the same sphere on top.
      // It also reads greyer than its neighbours (a tooth that took a knock often does) and sits a
      // touch apart from the other central, opening a gap.
      const base = centralL.mesh.material as THREE.MeshPhysicalMaterial;
      const shell = base.clone();                                      // chipped tooth's enamel, shaded like its neighbours
      patchVeneer(shell, zCut, feather, undefined, { grey: 1, biteY });
      const dentin = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#D8C7A4'), roughness: 0.5, metalness: 0,
        clearcoat: 0.08, clearcoatRoughness: 0.6, sheen: 0.3, sheenColor: new THREE.Color('#F3E6C8'), envMapIntensity: 0.9,
        side: THREE.DoubleSide,
      });
      const chip = chipTooth(centralL, shell, dentin);
      teethLayer.add(chip.chipped);
      const cm = base.clone();
      patchVeneer(cm, zCut, feather, { c: chip.c, r: chip.r0 }, { grey: 1, biteY });
      cm.polygonOffset = true; cm.polygonOffsetFactor = 1; cm.polygonOffsetUnits = 1;   // coincident skin: let the chipped copy win
      centralL.mesh.material = cm; centralL.mesh.castShadow = false;
      teethMats.push(cm, shell);
      damage.push({ mesh: centralL.mesh, kind: 'chip', mat: cm, chipped: chip.chipped, r0: chip.r0, r1: chip.r1, center: chip.c });
      pose(centralL, new THREE.Euler(0, 0.06, -0.03), new THREE.Vector3(0.022, 0, 0.012), [0.2, 0.7], [chip.chipped]);
    }

    if (process.env.NODE_ENV !== 'production') {
      let tris = 0; teeth.forEach((t) => { tris += t.mesh.geometry.attributes.position.count / 3; });
      const chipTris = damage.find((d) => d.kind === 'chip')?.chipped?.geometry.attributes.position.count ?? 0;
      (window as unknown as { __teethPrepared?: unknown }).__teethPrepared = { stage, teethMats, damage };
      (window as unknown as { __teeth?: unknown }).__teeth = { teeth: teeth.length, upper: teeth.filter((t) => t.upper).length, damage: damage.map((d) => d.kind), zCut, tris: Math.round(tris), chipTris: chipTris / 3, ms: Math.round(performance.now() - t0), prepCount };
    }
    return { stage, teethMats, damage };
  }, [scene, gumMatch, teethMatch, hideMatch, anteriorSpan, rotation, zoom, src]);

  useFrame((state, dt) => {
    if (process.env.NODE_ENV !== 'production') (window as unknown as { __teethLive?: unknown }).__teethLive = prepared;   // the committed one, not StrictMode's discarded twin
    const k = reduced ? 1 : 1 - Math.pow(0.0005, dt);
    for (const mat of prepared.teethMats) {
      const sh = (mat as Patched).userData.shader;
      if (sh && !sh.uniforms.uMix) { console.warn('teeth: shader without uMix', mat.uuid, Object.keys(sh.uniforms).slice(0, 12), mat.onBeforeCompile.toString().slice(0, 60)); continue; }
      if (sh) { const u = sh.uniforms.uMix as { value: number }; u.value += (mix - u.value) * k; }
      mat.clearcoat += ((0.4 + 0.6 * mix) - mat.clearcoat) * k;
      mat.clearcoatRoughness += ((0.18 - 0.1 * mix) - mat.clearcoatRoughness) * k;
    }
    for (const d of prepared.damage) {
      if (d.kind === 'missing') {
        const t = THREE.MathUtils.smoothstep(mix, 0.45, 0.8);
        d.mesh.visible = t > 0.001;
        const s = 0.15 + 0.85 * t;
        d.mesh.scale.lerp(new THREE.Vector3(s, s, s), k);
      } else if (d.kind === 'chip' && d.mat && d.chipped) {
        const sh = (d.mat as Patched).userData.shader;
        if (sh && !sh.uniforms.uChipR) { console.warn('teeth: chip shader without uChipR', d.mat.uuid, Object.keys(sh.uniforms).slice(0, 12)); continue; }
        if (sh) {
          const t = THREE.MathUtils.smoothstep(mix, 0.2, 0.7);
          const u = sh.uniforms.uChipR as { value: number };
          u.value += ((d.r0! + (d.r1! - d.r0!) * t) - u.value) * k;
          const healed = u.value <= d.r1! + 0.002;
          d.chipped.visible = !healed;
          d.mesh.castShadow = healed;
        }
      } else if (d.kind === 'pose' && d.rot && d.offset && d.home) {
        const [a, b] = d.win ?? [0.1, 0.6];
        const t = 1 - THREE.MathUtils.smoothstep(mix, a, b);
        d.mesh.rotation.x += (d.rot.x * t - d.mesh.rotation.x) * k;
        d.mesh.rotation.y += (d.rot.y * t - d.mesh.rotation.y) * k;
        d.mesh.rotation.z += (d.rot.z * t - d.mesh.rotation.z) * k;
        d.mesh.position.lerp(d.home.clone().addScaledVector(d.offset, t), k);
        for (const m of d.also ?? []) { m.position.copy(d.mesh.position); m.rotation.copy(d.mesh.rotation); }
      }
    }
    if (rig.current && !reduced) {
      const g = rig.current, kk = 1 - Math.pow(0.002, dt);
      g.rotation.y += (state.pointer.x * 0.28 - g.rotation.y) * kk;   // turn left/right only; no nodding
    }
  });

  return <group ref={rig}><primitive object={prepared.stage} /></group>;
}

function Fit() {
  const { camera, advance } = useThree();
  useEffect(() => {
    camera.position.set(0.2, 0.55, 6.2); camera.lookAt(0, 0, 0);
    if (process.env.NODE_ENV !== 'production') {
      const w = window as unknown as { __teethCam?: unknown; __teethFrame?: unknown };
      w.__teethCam = (p: number[], t: number[]) => { camera.position.set(p[0], p[1], p[2]); camera.lookAt(t[0], t[1], t[2]); };
      // Step the render loop by hand (QA captures while the pane is hidden and rAF is paused).
      w.__teethFrame = (n = 1) => { let t = performance.now(); for (let i = 0; i < n; i++) { t += 16.7; advance(t); } };
    }
  }, [camera, advance]);
  return null;
}

export default function TeethModel(props: Props) {
  const [mix, setMix] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const q = Number(new URLSearchParams(window.location.search).get('mix'));
    return Number.isFinite(q) && q > 0 ? Math.min(1, q / 100) : 0;
  });
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
          camera={{ fov: 30, near: 0.1, far: 50 }}
          gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.3 }}
          shadows
          frameloop={visible ? 'always' : 'never'}
          style={{ background: 'transparent' }}
        >
          <Fit />
          <Suspense fallback={null}>
            <Model {...props} mix={mix} reduced={reduced} />
            <ContactShadows position={[0, -1.35, 0]} opacity={0.3} blur={2.6} far={2.5} scale={9} color="#16181B" />
            <directionalLight position={[-2.5, 5, 5]} intensity={2.2} castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.0004} />
            <ambientLight intensity={0.2} />
            <Environment resolution={256}>
              <Lightformer form="rect" intensity={5.5} position={[-1.5, 4, 3]} rotation={[-Math.PI / 3, 0, 0]} scale={[6, 3, 1]} />
              <Lightformer form="rect" intensity={1.4} position={[-6, 1, 3]} rotation={[0, Math.PI / 2, 0]} scale={[4, 3, 1]} color="#dfe6f2" />
              <Lightformer form="rect" intensity={1.1} position={[6, 0.5, 2]} rotation={[0, -Math.PI / 2, 0]} scale={[4, 3, 1]} color="#f6e7d2" />
              <Lightformer form="ring" intensity={1.1} position={[2, 2, 7]} scale={[3, 3, 1]} />
            </Environment>
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
      <p className={styles.note}>
        An anatomical model, not a patient. Drag to see what porcelain changes on the front teeth: a missing lateral, a chipped edge,
        a tooth out of line, and the shade and surface of everything that shows when you smile.
        {props.credit ? ` ${props.credit}` : ''}
      </p>
    </div>
  );
}
