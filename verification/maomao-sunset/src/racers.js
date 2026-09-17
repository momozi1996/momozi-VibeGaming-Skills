import * as THREE from 'three';

/**
 * ALOHA KART / sculpted collectible racers.
 * +Y up, +Z forward; root origin is at the tire contact patch.
 * All art is original geometry / locally generated canvas paint. No assets,
 * lights, scene assumptions, module dependencies, or per-frame allocations.
 * Static pieces are welded into material batches; wheel meshes share geometry.
 */
export const CHARACTERS = [
  { id: 'mochi', name: 'Mochi', subtitle: '奶油团子 · 椰风领航员', color: '#81d8bd', fur: '#fff0d3', accent: '#ff8e91', eyes: '#657d67', muzzle: '#fff8e9', ear: '#e6b898', number: '01', emoji: '🌺' },
  { id: 'mango', name: 'Mango', subtitle: '橘子汽水 · 阳光冲浪手', color: '#ff956f', fur: '#eda555', accent: '#ffdc72', eyes: '#548b7b', muzzle: '#ffedcd', ear: '#d18443', number: '02', emoji: '🥭' },
  { id: 'luna', name: 'Luna', subtitle: '月光乌龙 · 星夜追风者', color: '#a7a1e5', fur: '#393b50', accent: '#ffdb85', eyes: '#b6c6ed', muzzle: '#8c869d', ear: '#303347', number: '03', emoji: '🌙' },
  { id: 'oreo', name: 'Oreo', subtitle: '黑糖奶盖 · 海盐小队长', color: '#79bee9', fur: '#333741', accent: '#8ce0da', eyes: '#c6a968', muzzle: '#fff5e3', ear: '#30323b', number: '04', emoji: '🐾' },
  { id: 'sakura', name: 'Sakura', subtitle: '樱花三色 · 花岛漫游家', color: '#eea5b5', fur: '#ffedcf', accent: '#ee789d', eyes: '#829374', muzzle: '#fff7e7', ear: '#be794e', number: '05', emoji: '🌸' },
  { id: 'coco', name: 'Coco', subtitle: '可可布丁 · 椰林探险家', color: '#e3bf85', fur: '#dfbd92', accent: '#6dc9be', eyes: '#79cbd7', muzzle: '#a17b65', ear: '#695044', number: '06', emoji: '🥥' },
];

const TAU = Math.PI * 2;
const UP = new THREE.Vector3(0, 1, 0);
const GEO = new Map();
const MATERIALS = new Map();
const TEXTURES = new Map();
const getCharacter = id => CHARACTERS.find(c => c.id === id) || CHARACTERS[0];
const geometry = (key, build) => {
  if (!GEO.has(key)) GEO.set(key, build());
  return GEO.get(key);
};
const sphere = () => geometry('sphere', () => new THREE.SphereGeometry(1, 24, 16));
const smallSphere = () => geometry('small-sphere', () => new THREE.SphereGeometry(1, 10, 7));
const box = () => geometry('box', () => new THREE.BoxGeometry(1, 1, 1));
const torus = () => geometry('torus', () => new THREE.TorusGeometry(1, 0.1, 8, 40));
const cylinder = () => geometry('cylinder', () => new THREE.CylinderGeometry(1, 1, 1, 24));

function material(key, values) {
  if (!MATERIALS.has(key)) {
    const mat = new THREE.MeshPhysicalMaterial(values);
    mat.name = key;
    MATERIALS.set(key, mat);
  }
  return MATERIALS.get(key);
}
function commons() {
  return {
    cream: material('ivory', { color: '#fff2d9', roughness: 0.38, clearcoat: 0.6 }),
    chrome: material('chrome', { color: '#dde9e6', metalness: 0.82, roughness: 0.22, clearcoat: 0.65 }),
    gold: material('champagne', { color: '#f2c36f', metalness: 0.62, roughness: 0.28 }),
    rubber: material('rubber', { color: '#252c34', roughness: 0.84 }),
    leather: material('leather', { color: '#58464b', roughness: 0.74 }),
    seat: material('seat-insert', { color: '#eacba5', roughness: 0.8 }),
    ink: material('ink', { color: '#29272f', roughness: 0.34 }),
    eye: material('eye', { color: '#171b28', roughness: 0.15, clearcoat: 1, clearcoatRoughness: 0.08 }),
    glint: material('glint', { color: '#ffffff', roughness: 0.1, emissive: '#ffffff', emissiveIntensity: 0.16 }),
    pink: material('ear-pink', { color: '#eaa1a3', roughness: 0.8 }),
    blush: material('blush', { color: '#eda6a1', roughness: 0.9 }),
    nose: material('nose', { color: '#bc797c', roughness: 0.36, clearcoat: 0.25 }),
    whiteLamp: material('headlamps', { color: '#fff4d5', emissive: '#ffdf9c', emissiveIntensity: 0.4, roughness: 0.15, clearcoat: 1 }),
    redLamp: material('tail-lamps', { color: '#ff767c', emissive: '#fa4a52', emissiveIntensity: 0.32, roughness: 0.24, clearcoat: 1 }),
    leaf: material('leaf', { color: '#5b9e79', roughness: 0.63 }),
    petalPink: material('petal-pink', { color: '#ffb0bb', roughness: 0.6, sheen: 0.35, sheenColor: '#ffecdf' }),
    petalCoral: material('petal-coral', { color: '#f9818c', roughness: 0.58, sheen: 0.35, sheenColor: '#ffc1b1' }),
    petalYellow: material('petal-yellow', { color: '#ffdb7d', roughness: 0.65 }),
  };
}

// A tiny indexed merger, deliberately local rather than an addons dependency.
// Matrices are baked only at construction. Groups retain only animated pivots.
class Sculpt {
  constructor() { this.buckets = new Map(); }
  add(mat, geo, position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0]) {
    const m = new THREE.Matrix4().compose(
      new THREE.Vector3(...position),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(...rotation)),
      new THREE.Vector3(...scale),
    );
    return this.matrix(mat, geo, m);
  }
  matrix(mat, geo, matrix) {
    let b = this.buckets.get(mat);
    if (!b) { b = { p: [], n: [], uv: [], i: [] }; this.buckets.set(mat, b); }
    const p = geo.attributes.position;
    const n = geo.attributes.normal;
    const uv = geo.attributes.uv;
    const offset = b.p.length / 3;
    const normalMatrix = new THREE.Matrix3().getNormalMatrix(matrix);
    const v = new THREE.Vector3();
    for (let k = 0; k < p.count; k++) {
      v.fromBufferAttribute(p, k).applyMatrix4(matrix); b.p.push(v.x, v.y, v.z);
      if (n) v.fromBufferAttribute(n, k).applyMatrix3(normalMatrix).normalize();
      else v.set(0, 1, 0);
      b.n.push(v.x, v.y, v.z);
      b.uv.push(uv ? uv.getX(k) : 0, uv ? uv.getY(k) : 0);
    }
    if (geo.index) for (let k = 0; k < geo.index.count; k++) b.i.push(offset + geo.index.getX(k));
    else for (let k = 0; k < p.count; k++) b.i.push(offset + k);
    return this;
  }
  ball(mat, position, scale, rotation, tiny = false) {
    return this.add(mat, tiny ? smallSphere() : sphere(), position, scale, rotation);
  }
  rod(mat, from, to, radius = 0.02) {
    const a = new THREE.Vector3(...from), b = new THREE.Vector3(...to);
    const delta = b.sub(a);
    const m = new THREE.Matrix4().compose(
      a.addScaledVector(delta, 0.5),
      new THREE.Quaternion().setFromUnitVectors(UP, delta.clone().normalize()),
      new THREE.Vector3(radius, delta.length(), radius),
    );
    return this.matrix(mat, cylinder(), m);
  }
  tube(mat, points, radius = 0.02, segments = 28, radial = 8) {
    const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
    const g = new THREE.TubeGeometry(curve, segments, radius, radial, false);
    this.add(mat, g); g.dispose();
    return this;
  }
  finish(parent, name = 'sculpt', shadow = true) {
    const meshes = [];
    for (const [mat, b] of this.buckets) {
      // A material batch is identical on repeat creations. Retaining these
      // buffers makes menu selection / rebuilding an eight-kart grid bounded
      // even when the host simply removes an old group without disposing it.
      const g = geometry(`sculpt:${name}:${mat.uuid}`, () => {
        const buffer = new THREE.BufferGeometry();
        buffer.setAttribute('position', new THREE.Float32BufferAttribute(b.p, 3));
        buffer.setAttribute('normal', new THREE.Float32BufferAttribute(b.n, 3));
        buffer.setAttribute('uv', new THREE.Float32BufferAttribute(b.uv, 2));
        buffer.setIndex(b.i);
        buffer.computeBoundingSphere();
        return buffer;
      });
      const mesh = new THREE.Mesh(g, mat);
      mesh.name = `${name}:${mat.name || mat.uuid.slice(0, 5)}`;
      // Keep sun-shadow submissions for silhouette-bearing sculpture only;
      // chrome, tiny facial marks, pollen and lens highlights need no casters.
      mesh.castShadow = shadow && !/(chrome|champagne|ink|eye|glint|ear-pink|blush|nose|headlamps|tail-lamps|leaf|petal|whisker|iris|goggle-glass|decal|exhaust-flame)/.test(mat.name);
      mesh.receiveShadow = shadow;
      parent.add(mesh); meshes.push(mesh);
    }
    this.buckets.clear();
    return meshes;
  }
}

function paintedTexture(key, base, paint, size = 512) {
  if (TEXTURES.has(key)) return TEXTURES.get(key);
  let canvas;
  if (typeof document !== 'undefined' && document.createElement) canvas = document.createElement('canvas');
  else if (typeof OffscreenCanvas !== 'undefined') canvas = new OffscreenCanvas(size, size);
  const ctx = canvas?.getContext('2d');
  let tex;
  if (ctx) {
    canvas.width = canvas.height = size;
    ctx.fillStyle = base; ctx.fillRect(0, 0, size, size);
    paint(ctx, size);
    tex = new THREE.CanvasTexture(canvas);
  } else {
    // Headless construction is supported (e.g. simulation/syntax tests).
    const rgb = new THREE.Color(base).getHex(THREE.SRGBColorSpace);
    tex = new THREE.DataTexture(new Uint8Array([rgb >> 16, (rgb >> 8) & 255, rgb & 255, 255]), 1, 1);
    tex.needsUpdate = true;
  }
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  tex.name = `aloha:${key}`;
  TEXTURES.set(key, tex);
  return tex;
}

function furTexture(c, part = 'head') {
  return paintedTexture(`fur:${c.id}:${part}`, c.fur, (ctx, s) => {
    ctx.scale(s, s);
    const blob = (color, x, y, rx, ry, rotation = 0) => {
      ctx.fillStyle = color; ctx.beginPath(); ctx.ellipse(x, y, rx, ry, rotation, 0, TAU); ctx.fill();
    };
    if (part === 'head') {
      if (c.id === 'mango') {
        // Hand-painted tapered tabby stripes: three crown marks, side cheek bars.
        ctx.fillStyle = '#bd7136';
        for (const [x, lean] of [[0.19, -0.018], [0.25, 0], [0.31, 0.018]]) {
          ctx.beginPath(); ctx.moveTo(x - 0.021, 0.23);
          ctx.bezierCurveTo(x - 0.02, 0.33, x + lean, 0.36, x + lean, 0.414);
          ctx.bezierCurveTo(x + 0.019, 0.36, x + 0.022, 0.3, x + 0.021, 0.23); ctx.fill();
        }
        for (const side of [-1, 1]) for (let i = 0; i < 3; i++) {
          blob('#bd7136', 0.25 + side * (0.19 + i * 0.007), 0.49 + i * 0.064, 0.064, 0.013, side * -0.25);
        }
        blob('#f4c583', 0.74, 0.23, 0.13, 0.095);
      } else if (c.id === 'oreo') {
        ctx.fillStyle = '#fff5e4'; ctx.beginPath(); ctx.moveTo(0.246, 0.34);
        ctx.bezierCurveTo(0.222, 0.45, 0.234, 0.52, 0.181, 0.59);
        ctx.bezierCurveTo(0.14, 0.67, 0.18, 0.82, 0.25, 0.82);
        ctx.bezierCurveTo(0.34, 0.79, 0.35, 0.66, 0.304, 0.58);
        ctx.bezierCurveTo(0.265, 0.52, 0.267, 0.41, 0.246, 0.34); ctx.fill();
      } else if (c.id === 'sakura') {
        blob('#c98a4e', 0.12, 0.39, 0.105, 0.22, -0.19);
        blob('#78574a', 0.375, 0.34, 0.077, 0.25, 0.1);
        blob('#a86c43', 0.8, 0.3, 0.12, 0.18, -0.4);
        blob('#76574a', 0.7, 0.57, 0.085, 0.12, 0.5);
      } else if (c.id === 'coco') {
        const g = ctx.createRadialGradient(0.25, 0.55, 0.035, 0.25, 0.55, 0.25);
        g.addColorStop(0, '#6b5148'); g.addColorStop(0.6, '#81604e'); g.addColorStop(1, '#dfbd92');
        ctx.fillStyle = g; ctx.fillRect(0, 0.23, 0.53, 0.63);
        blob('#80624e', 0.25, 0.18, 0.038, 0.058);
      } else if (c.id === 'mochi') {
        blob('#efd9b9', 0.13, 0.17, 0.085, 0.17, -0.24);
        blob('#efddbe', 0.75, 0.34, 0.13, 0.13);
        blob('#f6e5c9', 0.39, 0.19, 0.065, 0.12, 0.22);
      } else if (c.id === 'luna') {
        blob('#45465c', 0.75, 0.39, 0.2, 0.32);
      }
    } else if (part === 'tail') {
      if (c.id === 'mango' || c.id === 'sakura') {
        for (let i = 0; i < 6; i++) {
          ctx.fillStyle = c.id === 'mango' ? '#b9753b' : (i % 2 ? '#84604b' : '#c8894e');
          ctx.fillRect(i * 0.155, 0, 0.072, 1);
        }
      }
      if (c.id === 'coco') { ctx.fillStyle = '#79604e'; ctx.fillRect(0, 0, 1, 1); }
      if (c.id === 'oreo' || c.id === 'mochi' || c.id === 'mango') {
        ctx.fillStyle = '#fff1d6'; ctx.fillRect(0.78, 0, 0.22, 1);
      }
    } else {
      if (c.id === 'mango') for (let i = 0; i < 4; i++) blob('#bd793f', 0.72, 0.27 + i * 0.14, 0.21, 0.025, 0.2);
      if (c.id === 'sakura') { blob('#bc804d', 0.7, 0.34, 0.18, 0.24); blob('#765747', 0.9, 0.65, 0.12, 0.2); }
    }
    // Sub-pixel, deterministic fibers, not random noise regenerated per kart.
    let seed = 1391 + c.id.charCodeAt(0);
    const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) | 0; return (seed >>> 0) / 4294967296; };
    ctx.lineWidth = 0.0008;
    for (let i = 0; i < 3400; i++) {
      ctx.strokeStyle = i % 2 ? 'rgba(255,250,228,.055)' : 'rgba(52,36,27,.025)';
      const x = random(), y = random();
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + (random() - 0.5) * 0.004, y + 0.003 + random() * 0.006); ctx.stroke();
    }
  });
}

function catMaterials(c) {
  const fur = part => material(`${c.id}:fur:${part}`, {
    color: '#ffffff', map: furTexture(c, part), roughness: 0.87,
    sheen: 0.32, sheenRoughness: 0.8, sheenColor: '#f8dbb9',
  });
  return {
    head: fur('head'), body: fur('body'), tail: fur('tail'),
    ear: material(`${c.id}:ear`, { color: c.ear, roughness: 0.86, sheen: 0.25 }),
    muzzle: material(`${c.id}:muzzle`, { color: c.muzzle, roughness: 0.88, sheen: 0.25 }),
    iris: material(`${c.id}:iris`, { color: c.eyes, roughness: 0.24, clearcoat: 1 }),
    accessory: material(`${c.id}:accessory`, { color: c.accent, roughness: 0.43, clearcoat: 0.2 }),
    whisker: material(`${c.id}:whisker`, { color: ['oreo', 'luna', 'coco'].includes(c.id) ? '#ddd3be' : '#8c7465', roughness: 0.8 }),
  };
}

function earGeometry() {
  return geometry('ear', () => {
    const s = new THREE.Shape();
    s.moveTo(-0.205, 0);
    s.bezierCurveTo(-0.245, 0.18, -0.14, 0.56, -0.035, 0.64);
    s.bezierCurveTo(0.01, 0.68, 0.045, 0.66, 0.075, 0.59);
    s.bezierCurveTo(0.15, 0.45, 0.255, 0.16, 0.225, 0.035);
    s.quadraticCurveTo(0, -0.075, -0.205, 0);
    const g = new THREE.ExtrudeGeometry(s, { depth: 0.045, bevelEnabled: true, bevelThickness: 0.07, bevelSize: 0.055, bevelSegments: 4, steps: 1, curveSegments: 10 });
    g.computeVertexNormals(); return g;
  });
}

function headGeometry() {
  return geometry('kitten-head', () => {
    const g = new THREE.SphereGeometry(1, 48, 32), p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
      // Broader lower cheeks, softly domed crown; not a scaled box.
      p.setXYZ(i, x * (1 + 0.095 * (0.15 - y)), y, z * (1 + 0.035 * (1 - y * y)));
    }
    g.computeVertexNormals(); return g;
  });
}

function bodyShell() {
  return geometry('kart-shell', () => {
    const rings = [
      [0.80, 1.31, 0.46, 0], [0.96, 1.47, 0.51, 0],
      [1.025, 1.55, 0.66, 0], [1.01, 1.53, 0.84, 0],
      [0.94, 1.43, 0.99, 0], [0.86, 1.34, 1.035, -0.015],
      [0.69, 0.82, 1.015, -0.29], [0.635, 0.765, 0.935, -0.29],
      [0.615, 0.735, 0.65, -0.29],
    ];
    const p = [], uv = [], ind = [], n = 96;
    for (let r = 0; r < rings.length; r++) {
      const [rx, rz, y, offset] = rings[r];
      for (let i = 0; i <= n; i++) {
        const t = i / n * TAU, sn = Math.sin(t), cs = Math.cos(t);
        const x = Math.sign(sn) * Math.pow(Math.abs(sn), 0.57) * rx * (cs > 0 ? 0.97 : 1);
        const z = Math.sign(cs) * Math.pow(Math.abs(cs), 0.57) * rz + offset;
        p.push(x, y, z); uv.push(i / n, r / (rings.length - 1));
        if (r < rings.length - 1 && i < n) {
          const a = r * (n + 1) + i, b = a + n + 1;
          ind.push(a, a + 1, b, a + 1, b + 1, b);
        }
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(p, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); g.setIndex(ind); g.computeVertexNormals();
    return g;
  });
}

function roundPanel() {
  return geometry('rounded-panel', () => {
    const s = new THREE.Shape(), r = 0.21;
    s.moveTo(-0.5 + r, -0.5); s.lineTo(0.5 - r, -0.5);
    s.quadraticCurveTo(0.5, -0.5, 0.5, -0.5 + r); s.lineTo(0.5, 0.5 - r);
    s.quadraticCurveTo(0.5, 0.5, 0.5 - r, 0.5); s.lineTo(-0.5 + r, 0.5);
    s.quadraticCurveTo(-0.5, 0.5, -0.5, 0.5 - r); s.lineTo(-0.5, -0.5 + r);
    s.quadraticCurveTo(-0.5, -0.5, -0.5 + r, -0.5);
    return new THREE.ExtrudeGeometry(s, { depth: 0.6, bevelEnabled: true, bevelSize: 0.07, bevelThickness: 0.2, bevelSegments: 3, steps: 1, curveSegments: 8 }).translate(0, 0, -0.3);
  });
}

function taperedTail() {
  return geometry('curled-tail', () => {
    const points = [[0, 0, 0], [0.28, 0.09, -0.12], [0.36, 0.31, -0.45], [0.40, 0.77, -0.75], [0.22, 0.96, -0.83], [0.02, 0.88, -0.82], [0, 0.70, -0.78]];
    const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
    const count = 44, radial = 16, frames = curve.computeFrenetFrames(count, false);
    const positions = [], uvs = [], indices = [];
    for (let i = 0; i <= count; i++) {
      const t = i / count, center = curve.getPointAt(t);
      const radius = (0.14 + 0.065 * Math.sin(Math.PI * t)) * (t > 0.8 ? Math.sqrt(Math.max(0.001, (1 - t) / 0.2)) : 1);
      for (let j = 0; j <= radial; j++) {
        const a = j / radial * TAU;
        const v = center.clone().addScaledVector(frames.normals[i], radius * Math.cos(a)).addScaledVector(frames.binormals[i], radius * Math.sin(a));
        positions.push(v.x, v.y, v.z); uvs.push(t, j / radial);
        if (i < count && j < radial) {
          const k = i * (radial + 1) + j, next = k + radial + 1;
          indices.push(k, k + 1, next, next, k + 1, next + 1);
        }
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2)); g.setIndex(indices); g.computeVertexNormals(); return g;
  });
}

// Flowers have fat curved petals, an inset throat and raised pollen: little
// porcelain hibiscus / plumeria sculptures rather than flat sprite billboards.
function flower(sculpt, center, size, petals, petalMat, coreMat, angle = 0, hibiscus = false) {
  const [x, y, z] = center;
  for (let i = 0; i < petals; i++) {
    const a = i / petals * TAU + angle;
    sculpt.ball(petalMat, [x + Math.sin(a) * size * 0.48, y + Math.cos(a) * size * 0.48, z + 0.012], [size * 0.36, size * 0.61, size * 0.20], [0.12, 0.16, -a], true);
  }
  sculpt.ball(coreMat, [x, y, z + size * 0.20], [size * 0.24, size * 0.24, size * 0.19], undefined, true);
  if (hibiscus) {
    sculpt.tube(coreMat, [[x, y, z + size * 0.18], [x + size * 0.09, y + size * 0.15, z + size * 0.44], [x + size * 0.16, y + size * 0.4, z + size * 0.57]], size * 0.044, 9, 5);
    for (let i = 0; i < 4; i++) sculpt.ball(coreMat, [x + size * (0.16 + Math.sin(i * 2) * 0.1), y + size * (0.4 + Math.cos(i * 2) * 0.085), z + size * 0.57], [size * 0.065, size * 0.065, size * 0.065], undefined, true);
  }
}

function starGeometry() {
  return geometry('star', () => {
    const s = new THREE.Shape();
    for (let i = 0; i < 10; i++) {
      const a = i / 10 * TAU, r = i % 2 ? 0.43 : 1;
      if (i === 0) s.moveTo(Math.sin(a) * r, Math.cos(a) * r);
      else s.lineTo(Math.sin(a) * r, Math.cos(a) * r);
    }
    s.closePath();
    return new THREE.ExtrudeGeometry(s, { depth: 0.15, bevelEnabled: true, bevelSize: 0.06, bevelThickness: 0.05, bevelSegments: 2, steps: 1 });
  });
}

function addAccessories(head, torso, c, m, common) {
  const h = new Sculpt(), b = new Sculpt();
  if (c.id === 'mochi' || c.id === 'sakura' || c.id === 'coco') {
    const palette = c.id === 'sakura' ? [common.petalPink, common.cream, m.accessory] : c.id === 'coco' ? [common.cream, common.petalYellow, m.accessory] : [common.cream, common.petalYellow, common.cream];
    for (let i = 0; i < 9; i++) {
      const t = -1.8 + i / 8 * 3.6;
      flower(b, [Math.sin(t) * 0.40, 1.89 - Math.cos(t) * 0.12, -0.24 + Math.cos(t) * 0.365], 0.096, 5, palette[i % 3], common.petalYellow, i * 0.7);
    }
    b.add(m.accessory, torus(), [0, 1.87, -0.26], [0.38, 0.32, 0.34], [Math.PI / 2, 0, 0]);
    if (c.id === 'mochi') {
      h.ball(common.leaf, [-0.57, 0.54, 0.29], [0.12, 0.23, 0.028], [0, 0, -0.67], true);
      flower(h, [-0.52, 0.54, 0.34], 0.22, 5, common.petalCoral, common.petalYellow, 0.15, true);
    } else if (c.id === 'sakura') {
      h.ball(common.leaf, [0.56, 0.56, 0.20], [0.12, 0.22, 0.035], [0, 0, 0.7], true);
      flower(h, [0.50, 0.55, 0.31], 0.18, 5, common.petalPink, common.petalYellow, 0.12);
      flower(h, [0.67, 0.38, 0.27], 0.125, 5, common.cream, common.petalYellow, 0.45);
      flower(h, [0.33, 0.69, 0.19], 0.108, 5, m.accessory, common.petalYellow, -0.2);
    } else {
      h.ball(common.leaf, [-0.5, 0.55, 0.16], [0.065, 0.26, 0.03], [0, 0.3, -0.53], true);
      h.ball(common.leaf, [-0.6, 0.50, 0.17], [0.068, 0.22, 0.03], [0, 0.1, -0.98], true);
      flower(h, [-0.51, 0.42, 0.30], 0.16, 5, common.cream, common.petalYellow, 0.15);
    }
  } else if (c.id === 'mango') {
    // Brass-framed sea-glass goggles sit above the eyebrows, not over the eyes.
    const glass = material('goggle-glass', { color: '#509a91', metalness: 0.18, roughness: 0.13, clearcoat: 1 });
    h.tube(common.leather, [[-0.57, 0.45, 0.18], [-0.66, 0.44, -0.15], [-0.45, 0.43, -0.46], [0, 0.43, -0.55], [0.45, 0.43, -0.46], [0.66, 0.44, -0.15], [0.57, 0.45, 0.18]], 0.042, 32);
    for (const side of [-1, 1]) {
      h.add(common.gold, torus(), [side * 0.23, 0.49, 0.30], [0.205, 0.151, 0.205], [-0.25, side * 0.12, 0]);
      h.ball(glass, [side * 0.23, 0.49, 0.293], [0.183, 0.133, 0.037], [-0.25, side * 0.12, 0]);
      h.ball(common.glint, [side * 0.23 - 0.049, 0.537, 0.331], [0.044, 0.016, 0.009], [0, 0, -0.3], true);
    }
    h.tube(common.gold, [[-0.06, 0.49, 0.32], [0, 0.525, 0.33], [0.06, 0.49, 0.32]], 0.021, 8);
    b.add(m.accessory, torus(), [0, 1.86, -0.25], [0.39, 0.31, 0.34], [Math.PI / 2, 0, 0]);
    flower(b, [-0.26, 1.8, 0.1], 0.125, 5, common.cream, common.petalYellow, 0.35);
  } else if (c.id === 'luna') {
    const moon = geometry('moon-pin', () => {
      const s = new THREE.Shape();
      s.absarc(0, 0, 1, Math.PI * 0.29, Math.PI * 1.71, false);
      s.bezierCurveTo(-0.13, -0.49, -0.32, 0.34, Math.cos(Math.PI * 0.29), Math.sin(Math.PI * 0.29));
      return new THREE.ExtrudeGeometry(s, { depth: 0.12, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 2, steps: 1, curveSegments: 16 });
    });
    h.add(common.gold, moon, [0, 0.415, 0.475], [0.105, 0.105, 0.105], [0.35, 0, -0.22]);
    h.add(common.gold, starGeometry(), [0.53, 0.68, 0.23], [0.1, 0.1, 0.1], [0.05, -0.2, -0.15]);
    b.add(m.accessory, torus(), [0, 1.86, -0.25], [0.36, 0.32, 0.33], [Math.PI / 2, 0, 0]);
    b.add(common.gold, starGeometry(), [0, 1.75, 0.105], [0.095, 0.095, 0.08]);
    // Bow visible from the rear camera.
    b.ball(m.accessory, [-0.14, 1.85, -0.61], [0.17, 0.095, 0.075], [0, 0, -0.42]);
    b.ball(m.accessory, [0.14, 1.85, -0.61], [0.17, 0.095, 0.075], [0, 0, 0.42]);
    b.ball(common.gold, [0, 1.85, -0.68], [0.06, 0.068, 0.046], undefined, true);
  } else {
    // Tuxedo cat: a seafoam sailor kerchief with a proper tied rear knot.
    b.add(m.accessory, torus(), [0, 1.85, -0.25], [0.37, 0.31, 0.45], [Math.PI / 2, 0, 0]);
    b.ball(m.accessory, [0, 1.7, 0.105], [0.22, 0.24, 0.035]);
    b.ball(common.cream, [0, 1.81, 0.148], [0.05, 0.03, 0.015], undefined, true);
    b.ball(m.accessory, [0, 1.85, -0.60], [0.09, 0.09, 0.075]);
    for (const side of [-1, 1]) b.ball(m.accessory, [side * 0.14, 1.71, -0.625], [0.09, 0.23, 0.035], [0, side * 0.3, side * -0.6]);
    h.ball(common.cream, [-0.48, 0.53, 0.08], [0.07, 0.06, 0.10], undefined, true);
  }
  h.finish(head, `head-accessories:${c.id}`); b.finish(torso, `neck-accessories:${c.id}`);
}

function createCat(c, common, accessories = true) {
  const cat = new THREE.Group(); cat.name = `driver:${c.id}`;
  const m = catMaterials(c), body = new Sculpt();
  body.ball(m.body, [0, 1.47, -0.30], [0.445, 0.54, 0.355]);
  body.ball(m.muzzle, [0, 1.48, -0.006], [0.29, 0.37, 0.092]);
  // Bent forelegs, with the actual mittens attached to the moving wheel.
  for (const side of [-1, 1]) {
    body.tube(m.body, [[side * 0.31, 1.68, -0.20], [side * 0.40, 1.49, 0.10], [side * 0.27, 1.54, 0.40]], 0.115, 15, 10);
    body.ball(m.muzzle, [side * 0.24, 1.035, 0.24], [0.155, 0.10, 0.24]);
  }
  body.finish(cat, 'body');

  const head = new THREE.Group(); head.name = 'head'; head.position.set(0, 2.33, -0.24); cat.add(head);
  const face = new Sculpt();
  face.add(m.head, headGeometry(), [0, 0, 0], [0.735, 0.595, 0.565]);
  for (const side of [-1, 1]) {
    face.ball(m.muzzle, [side * 0.124, -0.19, 0.557], [0.19, 0.137, 0.113]);
    face.ball(common.blush, [side * 0.436, -0.115, 0.441], [0.108, 0.055, 0.018], [0, side * 0.38, 0], true);
    // Three whiskers, gently swept forward with soft tips.
    for (let i = 0; i < 3; i++) {
      face.tube(m.whisker, [[side * 0.285, -0.16 - i * 0.039, 0.59], [side * 0.50, -0.13 - i * 0.068, 0.60], [side * (0.78 - Math.abs(i - 1) * 0.045), -0.09 - i * 0.10, 0.51]], 0.006, 12, 5);
    }
    for (let i = 0; i < 3; i++) face.ball(m.whisker, [side * (0.182 + (i % 2) * 0.047), -0.18 - Math.floor(i / 2) * 0.038, 0.66], [0.009, 0.008, 0.006], undefined, true);
    face.tube(m.ear, [[side * 0.15, 0.30, 0.472], [side * 0.26, 0.327, 0.475], [side * 0.36, 0.302, 0.448]], 0.024, 12, 8);
  }
  face.ball(m.muzzle, [0, -0.29, 0.558], [0.145, 0.073, 0.055]);
  face.ball(common.nose, [0, -0.119, 0.679], [0.063, 0.042, 0.033]);
  face.ball(common.nose, [0, -0.14, 0.68], [0.039, 0.033, 0.025], undefined, true);
  face.ball(common.glint, [-0.018, -0.107, 0.707], [0.013, 0.007, 0.004], undefined, true);
  face.tube(common.ink, [[0, -0.157, 0.686], [0, -0.209, 0.683]], 0.008, 6, 5);
  face.tube(common.ink, [[-0.092, -0.238, 0.658], [-0.051, -0.253, 0.675], [0, -0.216, 0.685], [0.051, -0.253, 0.675], [0.092, -0.238, 0.658]], 0.008, 16, 5);
  face.finish(head, 'face');

  const eyes = [], ears = [];
  for (const side of [-1, 1]) {
    const eye = new THREE.Group(); eye.name = side < 0 ? 'eye-left' : 'eye-right';
    eye.position.set(side * 0.278, 0.105, 0.532); eye.rotation.y = side * 0.20;
    const e = new Sculpt();
    e.ball(common.eye, [0, 0, 0], [0.156, 0.182, 0.056]);
    e.ball(m.iris, [side * -0.009, -0.007, 0.047], [0.103, 0.130, 0.025]);
    e.ball(common.eye, [side * -0.009, 0.005, 0.071], [0.061, 0.099, 0.014]);
    e.ball(common.glint, [-0.044, 0.071, 0.086], [0.034, 0.038, 0.01], undefined, true);
    e.ball(common.glint, [0.047, -0.042, 0.075], [0.014, 0.015, 0.007], undefined, true);
    e.finish(eye, `eye:${side}`, false); head.add(eye); eyes.push(eye);

    const ear = new THREE.Group(); ear.name = `ear-${side}`;
    ear.position.set(side * 0.49, 0.365, -0.025); ear.rotation.z = -side * 0.30;
    ear.scale.set(1.10, 0.75, 1);
    const outer = c.id === 'mochi' ? m.muzzle : c.id === 'sakura' && side < 0 ? m.muzzle : m.ear;
    const a = new Sculpt();
    a.add(outer, earGeometry());
    a.add(common.pink, earGeometry(), [0.009, 0.073, 0.095], [0.62, 0.71, 0.31]);
    a.ball(m.muzzle, [0, 0.065, 0.127], [0.115, 0.055, 0.03], undefined, true);
    a.finish(ear, `ear:${c.id}:${side}`); head.add(ear); ears.push(ear);
  }
  const tail = new THREE.Group(); tail.name = 'curled-tail'; tail.position.set(0.38, 1.06, -0.32);
  const t = new THREE.Mesh(taperedTail(), m.tail); t.castShadow = true; t.receiveShadow = true; tail.add(t); cat.add(tail);
  if (accessories) addAccessories(head, cat, c, m, common);
  return { cat, head, eyes, ears, tail, materials: m };
}

function wheelMeshes(common) {
  // Build once, use the same three buffers for every wheel of every kart.
  if (GEO.has('wheel-batches')) return GEO.get('wheel-batches');
  const s = new Sculpt();
  const profile = [[0.26, -0.155], [0.32, -0.186], [0.388, -0.175], [0.431, -0.13], [0.44, -0.075], [0.44, 0.075], [0.431, 0.13], [0.388, 0.175], [0.32, 0.186], [0.26, 0.155], [0.26, -0.155]].map(p => new THREE.Vector2(...p));
  const lathe = new THREE.LatheGeometry(profile, 36);
  s.add(common.rubber, lathe, [0, 0, 0], [1, 1, 1], [0, 0, Math.PI / 2]); lathe.dispose();
  for (let i = 0; i < 30; i++) for (const side of [-1, 1]) {
    const a = (i + (side > 0 ? 0.25 : 0)) / 30 * TAU;
    s.add(common.rubber, box(), [side * 0.077, Math.cos(a) * 0.441, Math.sin(a) * 0.441], [0.14, 0.02, 0.058], [a, side * 0.18, 0]);
  }
  const rim = geometry('wheel-rim', () => new THREE.TorusGeometry(1, 0.1, 6, 28));
  const spoke = geometry('wheel-spoke', () => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.4, -0.5); shape.lineTo(0.4, -0.5);
    shape.lineTo(0.5, -0.4); shape.lineTo(0.5, 0.4);
    shape.lineTo(0.4, 0.5); shape.lineTo(-0.4, 0.5);
    shape.lineTo(-0.5, 0.4); shape.lineTo(-0.5, -0.4); shape.closePath();
    return new THREE.ExtrudeGeometry(shape, { depth: 0.6, bevelEnabled: true, bevelSize: 0.07, bevelThickness: 0.2, bevelSegments: 1, steps: 1 }).translate(0, 0, -0.3);
  });
  for (const side of [-1, 1]) {
    s.add(common.rubber, cylinder(), [side * 0.172, 0, 0], [0.287, 0.015, 0.287], [0, 0, Math.PI / 2]);
    s.add(common.chrome, rim, [side * 0.186, 0, 0], [0.287, 0.287, 0.287], [0, Math.PI / 2, 0]);
    s.add(common.chrome, rim, [side * 0.201, 0, 0], [0.249, 0.249, 0.11], [0, Math.PI / 2, 0]);
    for (let i = 0; i < 6; i++) {
      const a = i / 6 * TAU;
      s.add(common.chrome, spoke, [side * 0.198, Math.cos(a) * 0.155, Math.sin(a) * 0.155], [0.038, 0.204, 0.051], [a, 0, 0]);
      s.ball(common.chrome, [side * 0.228, Math.cos(a) * 0.078, Math.sin(a) * 0.078], [0.011, 0.015, 0.015], undefined, true);
    }
    s.add(common.chrome, cylinder(), [side * 0.201, 0, 0], [0.106, 0.035, 0.106], [0, 0, Math.PI / 2]);
    // Placeholder material is replaced with kart enamel at instantiation.
    s.add(common.cream, cylinder(), [side * 0.226, 0, 0], [0.065, 0.009, 0.065], [0, 0, Math.PI / 2]);
  }
  const group = new THREE.Group();
  const meshes = s.finish(group, 'wheel');
  const batches = meshes.map(mesh => ({ geometry: mesh.geometry, material: mesh.material }));
  GEO.set('wheel-batches', batches); return batches;
}

function decalMaterial(c) {
  const map = paintedTexture(`decals:${c.id}`, '#fff3d9', (ctx, s) => {
    ctx.fillStyle = c.color; ctx.fillRect(0, 0, s, s);
    ctx.strokeStyle = '#fff4dd'; ctx.lineWidth = s * 0.028;
    ctx.beginPath(); ctx.roundRect(s * 0.06, s * 0.06, s * 0.88, s * 0.88, s * 0.18); ctx.stroke();
    ctx.fillStyle = '#fff5df'; ctx.beginPath(); ctx.arc(s * 0.5, s * 0.46, s * 0.30, 0, TAU); ctx.fill();
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#344b51';
    ctx.font = `900 ${s * 0.35}px sans-serif`; ctx.fillText(c.number, s * 0.5, s * 0.48);
    ctx.font = `800 ${s * 0.088}px sans-serif`; ctx.fillText('ALOHA', s * 0.5, s * 0.84);
    // A little paw embossed above the number medallion.
    ctx.fillStyle = '#344b51';
    for (const [x, y, r] of [[0.43, 0.13, 0.013], [0.47, 0.105, 0.015], [0.515, 0.105, 0.015], [0.55, 0.13, 0.013], [0.491, 0.151, 0.024]]) {
      ctx.beginPath(); ctx.arc(s * x, s * y, s * r, 0, TAU); ctx.fill();
    }
  }, 256);
  return material(`decal:${c.id}`, { map, roughness: 0.4, clearcoat: 0.8, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 });
}

function addKartBody(parent, c, paint, common) {
  const s = new Sculpt();
  s.add(paint, bodyShell());
  s.ball(common.rubber, [0, 0.48, -0.04], [0.9, 0.135, 1.4]);
  // Cockpit dark well, padded bucket seat and cream quilted insert.
  s.ball(common.leather, [0, 0.755, -0.3], [0.63, 0.17, 0.76]);
  s.add(common.leather, roundPanel(), [0, 1.25, -0.73], [1.04, 1.11, 0.17], [-0.13, 0, 0]);
  s.add(common.seat, roundPanel(), [0, 1.29, -0.612], [0.74, 0.8, 0.043], [-0.13, 0, 0]);
  for (const side of [-1, 1]) s.ball(common.leather, [side * 0.43, 1.14, -0.46], [0.13, 0.42, 0.22], [-0.15, 0, side * 0.08]);
  for (let i = 0; i < 5; i++) s.tube(common.leather, [[-0.28, 1.02 + i * 0.115, -0.53 - i * 0.016], [0, 1.015 + i * 0.115, -0.527 - i * 0.016], [0.28, 1.02 + i * 0.115, -0.53 - i * 0.016]], 0.005, 12, 4);
  // Raised hood insert and twin enamel racing pinstripes.
  s.add(common.cream, roundPanel(), [0, 1.016, 1.10], [0.82, 0.59, 0.041], [-Math.PI / 2, 0, 0]);
  for (const side of [-1, 1]) {
    s.tube(common.cream, [[side * 0.48, 0.964, 1.36], [side * 0.49, 1.015, 1.14], [side * 0.48, 1.032, 0.86]], 0.018, 15, 6);
    s.tube(common.chrome, [[side * 0.925, 0.70, -1.21], [side * 1.025, 0.72, -0.78], [side * 1.025, 0.72, 0.52], [side * 0.94, 0.70, 1.23]], 0.019, 28, 6);
    // Separate fender brows give the shell a distinctly toy-roadster silhouette.
    for (const z of [-1.09, 1.065]) {
      s.tube(paint, [[side * 1.015, 0.56, z - 0.48], [side * 1.055, 0.89, z - 0.29], [side * 1.055, 1.015, z], [side * 1.055, 0.89, z + 0.29], [side * 1.015, 0.56, z + 0.48]], 0.052, 26, 7);
    }
    s.ball(common.chrome, [side * 0.65, 0.818, 1.443], [0.251, 0.179, 0.10], [-0.16, side * 0.20, 0]);
    s.ball(common.whiteLamp, [side * 0.65, 0.834, 1.515], [0.199, 0.125, 0.063], [-0.16, side * 0.20, 0]);
    s.ball(common.glint, [side * 0.69, 0.87, 1.567], [0.048, 0.026, 0.012], undefined, true);
    s.ball(common.chrome, [side * 0.66, 0.755, -1.473], [0.219, 0.123, 0.081]);
    s.ball(common.redLamp, [side * 0.66, 0.765, -1.529], [0.174, 0.079, 0.038]);
    // Exhaust cans with dark recessed mouths (pointing rearward, -Z).
    s.add(common.chrome, cylinder(), [side * 0.56, 0.457, -1.52], [0.113, 0.42, 0.113], [Math.PI / 2, 0, 0]);
    s.add(common.rubber, cylinder(), [side * 0.56, 0.457, -1.738], [0.082, 0.012, 0.082], [Math.PI / 2, 0, 0]);
    s.add(common.chrome, torus(), [side * 0.56, 0.457, -1.749], [0.094, 0.094, 0.094]);
    s.rod(common.chrome, [side * 0.54, 0.94, -1.12], [side * 0.54, 1.095, -1.35], 0.028);
    // A pair of recessed side gills, plus exposed tiny chassis bolts.
    for (let i = 0; i < 3; i++) s.add(common.rubber, roundPanel(), [side * 1.029, 0.79, -0.40 + i * 0.16], [0.16, 0.034, 0.018], [0, Math.PI / 2, -0.18]);
    for (const z of [-0.82, 0.72]) s.ball(common.chrome, [side * 0.955, 0.915, z], [0.024, 0.016, 0.024], undefined, true);
  }
  // Soft cream bumpers and chrome supports. Overall length stays under 3.8m.
  s.tube(common.chrome, [[-0.88, 0.48, 1.43], [-0.83, 0.44, 1.72], [0, 0.44, 1.79], [0.83, 0.44, 1.72], [0.88, 0.48, 1.43]], 0.061, 34, 8);
  s.add(common.cream, roundPanel(), [0, 0.474, 1.77], [0.85, 0.135, 0.07]);
  s.tube(common.chrome, [[-0.90, 0.43, -1.46], [-0.86, 0.42, -1.72], [0, 0.42, -1.77], [0.86, 0.42, -1.72], [0.90, 0.43, -1.46]], 0.052, 32, 8);
  s.add(common.cream, roundPanel(), [0, 0.455, -1.782], [0.55, 0.125, 0.049]);
  s.ball(common.rubber, [0, 0.686, 1.541], [0.29, 0.085, 0.04]);
  for (let i = 0; i < 3; i++) s.rod(common.chrome, [-0.20, 0.66 + i * 0.028, 1.579], [0.20, 0.66 + i * 0.028, 1.579], 0.006);
  // Low surfboard-shaped rear deck / wing, intentionally below the tail.
  s.add(common.cream, roundPanel(), [0, 1.105, -1.335], [1.58, 0.37, 0.07], [-Math.PI / 2, 0, 0]);
  s.add(paint, roundPanel(), [0, 1.144, -1.335], [0.075, 0.33, 0.006], [-Math.PI / 2, 0, 0]);
  s.finish(parent, 'coachwork');

  const decals = new Sculpt(), decal = decalMaterial(c);
  const plane = geometry('decal-plane', () => new THREE.PlaneGeometry(1, 1));
  decals.add(decal, plane, [0, 1.044, 1.10], [0.39, 0.40, 1], [-Math.PI / 2, 0, 0]);
  decals.add(decal, plane, [0, 0.805, -1.551], [0.30, 0.255, 1], [0, Math.PI, 0]);
  for (const side of [-1, 1]) decals.add(decal, plane, [side * 1.032, 0.752, 0.28], [0.30, 0.275, 1], [0, side * Math.PI / 2, 0]);
  decals.finish(parent, 'enamel-decals', false);
}

function addSteering(parent, paint, common, catMat) {
  const assembly = new THREE.Group(); assembly.name = 'steering-wheel';
  assembly.position.set(0, 1.49, 0.48); assembly.rotation.x = 0.64; parent.add(assembly);
  const s = new Sculpt();
  s.add(common.rubber, torus(), [0, 0, 0], [0.303, 0.303, 0.40]);
  for (let i = 0; i < 3; i++) {
    const a = i / 3 * TAU;
    s.rod(common.chrome, [0, 0, 0], [Math.sin(a) * 0.28, Math.cos(a) * 0.28, 0], 0.02);
  }
  s.ball(paint, [0, 0, -0.015], [0.095, 0.095, 0.043]);
  // Front/back padded mittens wrap around the 9-and-3 wheel positions.
  for (const side of [-1, 1]) {
    s.ball(catMat.muzzle, [side * 0.278, 0.045, -0.014], [0.131, 0.12, 0.115]);
    for (let i = 0; i < 3; i++) s.ball(catMat.muzzle, [side * 0.278 + (i - 1) * 0.051, 0.011, 0.077], [0.035, 0.055, 0.041], undefined, true);
    for (const offset of [-0.026, 0.026]) s.tube(catMat.whisker, [[side * 0.278 + offset, 0.016, 0.113], [side * 0.278 + offset, -0.019, 0.111]], 0.003, 4, 4);
  }
  s.finish(assembly, 'steering');
  const column = new Sculpt(); column.rod(common.chrome, [0, 1.49, 0.48], [0, 0.96, 0.86], 0.032); column.finish(parent, 'steering-column');
  return assembly;
}

/**
 * createKart(characterId = 'mochi', options = {}) -> THREE.Group
 * options: { color?: THREE.ColorRepresentation, scale?: number,
 *            shadows?: boolean, accessories?: boolean }
 * root.userData.animate({time=0,speed=0,steer=0,drift=0,boost=0,dt=1/60})
 *   time/dt seconds, speed world-units/sec, steer -1..1, drift/boost number|bool.
 * root.userData.dispose(): stop animation and detach instance children. Shared
 *   geometry/materials/textures stay cached. Remove root from scene separately.
 *   Do NOT traverse-dispose materials/geometries: other racers share them.
 * Optional inspectable parts live in root.userData.parts, with no scene lights.
 */
export function createKart(characterId = 'mochi', options = {}) {
  const c = getCharacter(characterId), common = commons();
  const color = options.color ?? c.color;
  const colorKey = new THREE.Color(color).getHexString();
  const paint = material(`enamel:${colorKey}`, { color, metalness: 0.12, roughness: 0.27, clearcoat: 1, clearcoatRoughness: 0.19 });
  const root = new THREE.Group(); root.name = `aloha-kart:${c.id}`;
  const coach = new THREE.Group(); coach.name = 'sprung-body'; root.add(coach);
  addKartBody(coach, c, paint, common);
  const driver = createCat(c, common, options.accessories !== false); coach.add(driver.cat);
  const steering = addSteering(coach, paint, common, driver.materials);
  const wheels = [], frontPivots = [];
  for (const z of [-1.09, 1.065]) for (const side of [-1, 1]) {
    const pivot = new THREE.Group(); pivot.position.set(side * 1.028, 0.455, z);
    pivot.name = `${z > 0 ? 'front' : 'rear'}-${side < 0 ? 'left' : 'right'}-axle`; root.add(pivot);
    const spin = new THREE.Group(); spin.name = 'wheel-spin'; pivot.add(spin);
    for (const batch of wheelMeshes(common)) {
      const mesh = new THREE.Mesh(batch.geometry, batch.material === common.cream ? paint : batch.material);
      mesh.castShadow = batch.material === common.rubber; mesh.receiveShadow = true; spin.add(mesh);
    }
    wheels.push(spin); if (z > 0) frontPivots.push(pivot);
  }
  const flames = new THREE.Group(); flames.name = 'boost-exhaust'; flames.visible = false;
  flames.position.z = -1.75; flames.scale.z = 0.01; coach.add(flames);
  const flameMat = material('exhaust-flame', { color: '#b3ffef', emissive: '#70f8e0', emissiveIntensity: 3, roughness: 0.5 });
  const flame = new Sculpt();
  for (const side of [-1, 1]) flame.ball(flameMat, [side * 0.56, 0.457, -0.20], [0.068, 0.068, 0.22]);
  flame.finish(flames, 'exhaust-flame', false);

  const characterPhase = CHARACTERS.indexOf(c) * 0.73;
  let wheelAngle = 0, disposed = false;
  root.userData.characterId = c.id;
  root.userData.character = c;
  root.userData.parts = { body: coach, cat: driver.cat, head: driver.head, tail: driver.tail, eyes: driver.eyes, ears: driver.ears, wheels, steering, frontPivots };
  root.userData.animate = (state = {}) => {
    if (disposed) return;
    const time = Number.isFinite(state.time) ? state.time : 0;
    const dt = Number.isFinite(state.dt) ? Math.min(Math.max(state.dt, 0), 0.1) : 1 / 60;
    const speed = Number.isFinite(state.speed) ? state.speed : 0;
    const steer = Number.isFinite(state.steer) ? THREE.MathUtils.clamp(state.steer, -1, 1) : 0;
    const drift = Number(state.drift) || 0, boost = Number(state.boost) || 0;
    const moving = Math.min(Math.abs(speed) / 16, 1);
    wheelAngle = (wheelAngle + speed * dt / 0.455) % TAU;
    for (const wheel of wheels) wheel.rotation.x = wheelAngle;
    for (const pivot of frontPivots) pivot.rotation.y = steer * 0.36;
    steering.rotation.z = -steer * 0.37;
    coach.position.y = Math.sin(time * (7 + moving * 9)) * 0.010 * moving;
    coach.rotation.z = -steer * (0.025 + moving * 0.025) - THREE.MathUtils.clamp(drift, -1, 1) * steer * 0.024;
    driver.cat.position.y = Math.sin(time * 2.4 + characterPhase) * (0.009 + 0.007 * (1 - moving));
    driver.head.rotation.y = steer * 0.13;
    driver.head.rotation.z = Math.sin(time * 1.65 + characterPhase) * 0.022 * (1 - moving) + steer * 0.025;
    driver.tail.rotation.y = Math.sin(time * 2.2 + characterPhase) * 0.095 + steer * 0.09;
    driver.tail.rotation.z = Math.sin(time * 2.7 + characterPhase) * 0.065;
    for (let i = 0; i < driver.ears.length; i++) {
      const side = i === 0 ? -1 : 1;
      driver.ears[i].rotation.z = -side * 0.30 + Math.sin(time * 2.4 + i + characterPhase) * 0.024;
    }
    const blinkTime = ((time + characterPhase) % 5.6 + 5.6) % 5.6;
    const blink = blinkTime > 5.34 ? 1 - Math.sin((blinkTime - 5.34) / 0.26 * Math.PI) * 0.92 : 1;
    for (const eye of driver.eyes) eye.scale.y = blink;
    flames.visible = boost > 0.01;
    // Local elongation at the exhaust lip, never shifts the tailpipes.
    flames.scale.z = boost > 0 ? 0.85 + (Math.sin(time * 37) + 1) * 0.18 : 0.01;
  };
  root.userData.dispose = () => {
    if (disposed) return;
    disposed = true;
    root.clear();
  };
  if (Number.isFinite(options.scale) && options.scale > 0) root.scale.setScalar(options.scale);
  if (options.shadows === false) root.traverse(obj => { if (obj.isMesh) { obj.castShadow = false; obj.receiveShadow = false; } });
  return root;
}

/** Optional UI portrait: standalone original inline SVG, no external resources. */
export function createPortrait(characterId = 'mochi') {
  const c = getCharacter(characterId);
  const patch = c.id === 'oreo' ? '<path d="M60 29Q54 44 45 64Q60 80 76 63Q63 44 60 29" fill="#fff5e4"/>'
    : c.id === 'sakura' ? '<ellipse cx="38" cy="40" rx="16" ry="22" fill="#c98a4e"/><ellipse cx="83" cy="40" rx="13" ry="20" fill="#78574a"/>'
      : c.id === 'coco' ? '<ellipse cx="60" cy="55" rx="27" ry="25" fill="#80604f"/>'
        : c.id === 'mango' ? '<path d="M48 24l4 15M60 22v16M72 24l-4 15" stroke="#b8763f" stroke-width="5" stroke-linecap="round"/>' : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="${c.name}"><rect width="120" height="120" rx="34" fill="${c.color}"/><ellipse cx="60" cy="100" rx="37" ry="9" fill="#253d45" opacity=".12"/><path d="M27 47L23 16Q23 9 30 14L48 30M73 30L92 14Q98 10 97 18L93 47" fill="${c.ear}" stroke="${c.fur}" stroke-width="6" stroke-linejoin="round"/><path d="M29 32l-1-12 13 13M82 33l11-13-2 16" fill="#eaa1a3"/><ellipse cx="60" cy="57" rx="39" ry="34" fill="${c.fur}"/>${patch}<ellipse cx="60" cy="72" rx="18" ry="12" fill="${c.muzzle}"/><g fill="#222630"><ellipse cx="44" cy="53" rx="7" ry="9"/><ellipse cx="77" cy="53" rx="7" ry="9"/></g><g fill="white"><circle cx="42" cy="50" r="2.4"/><circle cx="75" cy="50" r="2.4"/></g><g fill="#eea2a2" opacity=".65"><ellipse cx="33" cy="67" rx="6" ry="3"/><ellipse cx="88" cy="67" rx="6" ry="3"/></g><path d="M56 67Q60 64 64 67L60 71Z" fill="#bd797c"/><path d="M60 71v3m-7 0q4 5 7 0q4 5 8 0" fill="none" stroke="#695650" stroke-width="1.5" stroke-linecap="round"/><path d="M22 69l15 2m-17 4l17-1m47-3l15-2m-15 5l17 1" stroke="#8b786a" stroke-width="1.4" stroke-linecap="round"/><rect x="35" y="91" width="50" height="10" rx="5" fill="#fff3dc"/><circle cx="83" cy="30" r="8" fill="${c.accent}"/><circle cx="83" cy="30" r="3" fill="#ffe296"/></svg>`;
}
