/*
 * CLOUDLINE · 云间慢行
 * A tiny, self-contained railway game. Three.js r160 is embedded above (MIT).
 * Everything else — geometry, canvas textures, audio and gameplay — is generated here.
 * Coordinate convention: Y up, tram nose +Z. Distances in metres, velocity in m/s.
 */
(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const mix = (a, b, t) => a + (b - a) * t;
  const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
  const UP = V(0, 1, 0),
    TAU = Math.PI * 2;
  let seed = 19371;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const range = (a, b) => mix(a, b, random());
  const mobile = () => innerWidth < 601;
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
  } catch (error) {
    $("loading").innerHTML =
      "<b>云朵还没有准备好</b><span>此浏览器无法启动 WebGL。请使用支持硬件加速的 Chrome、Edge 或 Safari。</span>";
    console.error(error);
    return;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile() ? 1.5 : 1.75));
  renderer.setSize(
    document.documentElement.clientWidth,
    document.documentElement.clientHeight,
    false, // CSS owns canvas size: prevents a stale inline width on phone rotation.
  );
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.13;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  $("scene").appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x9dafc9, 0.0022);
  const camera = new THREE.PerspectiveCamera(
    49,
    innerWidth / innerHeight,
    0.2,
    1800,
  );
  const world = new THREE.Group();
  scene.add(world);
  const hemi = new THREE.HemisphereLight(0xcad7ff, 0x698d91, 2.35);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffcf9b, 3.3);
  sun.position.set(-100, 160, 90);
  scene.add(sun);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -65;
  sun.shadow.camera.right = 65;
  sun.shadow.camera.top = 65;
  sun.shadow.camera.bottom = -65;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 420;
  sun.shadow.bias = -0.0006;
  sun.shadow.normalBias = 0.16;
  scene.add(sun.target);
  const fill = new THREE.DirectionalLight(0xbab8f2, 0.65);
  fill.position.set(80, 50, -70);
  scene.add(fill);
  const matCache = new Map();
  function mat(color, opts = {}) {
    const key = color + JSON.stringify(opts);
    if (matCache.has(key)) return matCache.get(key);
    const m = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.87,
      flatShading: true,
      ...opts,
    });
    matCache.set(key, m);
    return m;
  }
  const M = {
    cream: mat(0xf4deac),
    plaster: mat(0xf0d7af),
    plasterPink: mat(0xdca791),
    plasterGold: mat(0xe6bf7b),
    plasterWhite: mat(0xf4e5c8),
    roof: mat(0xbb644e),
    roofLight: mat(0xdc8561),
    roofDark: mat(0x944f4d),
    stone: mat(0x7b818b),
    rock: mat(0x73777e),
    rockDark: mat(0x5b6577),
    rockLight: mat(0x92928c),
    grass: mat(0x809879),
    grassLight: mat(0xa1ad80),
    path: mat(0xd1bd98),
    wood: mat(0x92664b),
    woodLight: mat(0xc6925c),
    woodDark: mat(0x674f44),
    green: mat(0x245d51),
    greenLight: mat(0x49816a),
    greenDark: mat(0x193e3e),
    leaf: mat(0x528570),
    leafLight: mat(0x89a275),
    leafDark: mat(0x3b6c62),
    iron: mat(0x49545c, { metalness: 0.65, roughness: 0.4 }),
    rail: mat(0xaca6a0, { metalness: 0.65, roughness: 0.33 }),
    brass: mat(0xd3a359, { metalness: 0.6, roughness: 0.38 }),
    glow: mat(0xffd783, { emissive: 0xffad42, emissiveIntensity: 1.0 }),
    dark: mat(0x324851),
    glass: mat(0x99d9d0, {
      transparent: true,
      opacity: 0.19,
      metalness: 0.18,
      roughness: 0.13,
      depthWrite: false,
    }),
    orange: mat(0xe9a362),
    pink: mat(0xd29ca3),
    blue: mat(0x668eaa),
    white: mat(0xf7e8cb),
    skin: mat(0xe4b389),
    skinDark: mat(0xa97c5a),
    hair: mat(0x64504a),
  };
  const boxGeo = new THREE.BoxGeometry(1, 1, 1);
  const icoGeo = new THREE.IcosahedronGeometry(1, 1);
  const lowIco = new THREE.IcosahedronGeometry(1, 0);
  const cylinderGeo = new THREE.CylinderGeometry(1, 1, 1, 8);
  const sphereGeo = new THREE.SphereGeometry(1, 12, 8);
  function mesh(
    parent,
    geo,
    material,
    x = 0,
    y = 0,
    z = 0,
    sx = 1,
    sy = 1,
    sz = 1,
  ) {
    const m = new THREE.Mesh(geo, material);
    m.position.set(x, y, z);
    m.scale.set(sx, sy, sz);
    m.castShadow = true;
    m.receiveShadow = true;
    parent.add(m);
    return m;
  }
  function box(p, x, y, z, sx, sy, sz, m) {
    return mesh(p, boxGeo, m, x, y, z, sx, sy, sz);
  }
  function ball(p, x, y, z, sx, sy, sz, m, detail = 1) {
    return mesh(p, detail ? icoGeo : lowIco, m, x, y, z, sx, sy, sz);
  }
  function cyl(p, x, y, z, r, h, m, n = 8, rt = r) {
    return mesh(p, new THREE.CylinderGeometry(rt, r, h, n), m, x, y, z);
  }
  function beam(p, a, b, width, material, depth = width) {
    const mid = a.clone().add(b).multiplyScalar(0.5),
      o = box(p, mid.x, mid.y, mid.z, width, a.distanceTo(b), depth, material);
    o.quaternion.setFromUnitVectors(UP, b.clone().sub(a).normalize());
    return o;
  }
  function group(parent, x = 0, y = 0, z = 0) {
    const g = new THREE.Group();
    g.position.set(x, y, z);
    parent.add(g);
    return g;
  }
  // Batch opaque static geometry by material: detailed towns without thousands of draw calls.
  function batchStatic(root) {
    root.updateMatrixWorld(true);
    const buckets = new Map(),
      remove = [];
    root.traverse((o) => {
      if (
        !o.isMesh ||
        Array.isArray(o.material) ||
        o.material.transparent ||
        o.userData.noBatch
      )
        return;
      const key = o.material.uuid;
      if (!buckets.has(key))
        buckets.set(key, { mat: o.material, p: [], n: [], uv: [], c: [] });
      const b = buckets.get(key);
      const g = o.geometry.index
        ? o.geometry.toNonIndexed()
        : o.geometry.clone();
      g.applyMatrix4(o.matrixWorld);
      const a = g.attributes;
      if (o.material.vertexColors) {
        for (let i = 0; i < a.position.count * 3; i++)
          b.c.push(a.color ? a.color.array[i] : 1);
      }
      for (let i = 0; i < a.position.array.length; i++)
        b.p.push(a.position.array[i]);
      for (let i = 0; i < a.normal.array.length; i++)
        b.n.push(a.normal.array[i]);
      if (a.uv)
        for (let i = 0; i < a.uv.array.length; i++) b.uv.push(a.uv.array[i]);
      else for (let i = 0; i < a.position.count * 2; i++) b.uv.push(0);
      g.dispose();
      remove.push(o);
    });
    remove.forEach((o) => o.removeFromParent());
    const inverse = root.matrixWorld.clone().invert();
    for (const b of buckets.values()) {
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(b.p, 3));
      g.setAttribute("normal", new THREE.Float32BufferAttribute(b.n, 3));
      g.setAttribute("uv", new THREE.Float32BufferAttribute(b.uv, 2));
      if (b.c.length)
        g.setAttribute("color", new THREE.Float32BufferAttribute(b.c, 3));
      g.applyMatrix4(inverse);
      g.computeBoundingSphere();
      const o = new THREE.Mesh(g, b.mat);
      o.castShadow = true;
      o.receiveShadow = true;
      root.add(o);
    }
  }
  function textureLabel(
    text,
    w = 512,
    h = 128,
    bg = "#254f48",
    fg = "#fff0ca",
    fontSize = 45,
  ) {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const cx = c.getContext("2d");
    cx.fillStyle = bg;
    cx.fillRect(0, 0, w, h);
    cx.strokeStyle = fg;
    cx.lineWidth = 2;
    cx.strokeRect(10, 10, w - 20, h - 20);
    cx.textAlign = "center";
    cx.textBaseline = "middle";
    cx.fillStyle = fg;
    cx.font = `${fontSize}px Georgia`;
    cx.fillText(text, w / 2, h / 2 + 2, w - 35);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return new THREE.MeshStandardMaterial({
      map: t,
      roughness: 0.8,
      side: THREE.DoubleSide,
    });
  }
  function sign(parent, text, x, y, z, w = 6, h = 1.3) {
    return mesh(
      parent,
      new THREE.PlaneGeometry(w, h),
      textureLabel(text),
      x,
      y,
      z,
    );
  }

  // ─── 1. SKY, CLOUDS, SEA ───────────────────────────────────────────────────────
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: { night: { value: 0 } },
    vertexShader: `varying vec3 v;void main(){v=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader: `varying vec3 v;uniform float night;void main(){float h=normalize(v).y;vec3 top=mix(vec3(.24,.36,.57),vec3(.085,.14,.29),night);vec3 mid=mix(vec3(.66,.62,.72),vec3(.31,.36,.55),night);vec3 low=mix(vec3(.99,.77,.59),vec3(.66,.49,.60),night);vec3 col=mix(low,mid,smoothstep(-.08,.14,h));col=mix(col,top,smoothstep(.06,.65,h));gl_FragColor=vec4(col,1.);}`,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(1400, 32, 20), skyMat);
  scene.add(sky);
  function glowTexture() {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const x = c.getContext("2d"),
      g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, "rgba(255,218,158,.7)");
    g.addColorStop(0.25, "rgba(255,213,166,.25)");
    g.addColorStop(1, "rgba(255,204,162,0)");
    x.fillStyle = g;
    x.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }
  const glowMap = glowTexture();
  function halo(parent, x, y, z, size, color = 0xffddaa, opacity = 0.4) {
    const o = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowMap,
        color,
        transparent: true,
        opacity,
        depthWrite: false,
      }),
    );
    o.position.set(x, y, z);
    o.scale.set(size, size, 1);
    parent.add(o);
    return o;
  }
  const sunset = new THREE.Mesh(
    new THREE.SphereGeometry(23, 32, 16),
    new THREE.MeshBasicMaterial({ color: 0xffddaa, fog: false }),
  );
  sunset.position.set(-410, 88, -560);
  scene.add(sunset);
  halo(scene, -410, 88, -560, 180, 0xffc994, 0.65);
  const starPos = [];
  for (let i = 0; i < 550; i++) {
    const a = range(0, TAU),
      e = range(0.13, 1.48);
    starPos.push(
      Math.cos(a) * Math.cos(e) * 900,
      Math.sin(e) * 900,
      Math.sin(a) * Math.cos(e) * 900,
    );
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starPos, 3),
  );
  const stars = new THREE.Points(
    starGeo,
    new THREE.PointsMaterial({
      size: 1.4,
      color: 0xfff1d6,
      transparent: true,
      opacity: 0.47,
      fog: false,
      sizeAttenuation: true,
    }),
  );
  scene.add(stars);
  const waterMat = new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 } },
    vertexShader: `varying vec3 v;uniform float time;void main(){vec3 p=position;p.z+=sin(p.x*.024+time*.3)*.22;v=p;gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`,
    fragmentShader: `varying vec3 v;uniform float time;void main(){float wave=sin(v.x*.16+sin(v.y*.022)*4.+time*.5)*sin(v.y*.4+time*.32);float glint=pow(max(0.,wave),15.);float band=.5+.5*sin(v.y*.012+v.x*.003);vec3 c=mix(vec3(.12,.37,.52),vec3(.27,.55,.65),band);c+=glint*.12;float d=smoothstep(120.,850.,length(v.xy));c=mix(c,vec3(.79,.70,.71),d);gl_FragColor=vec4(c,1.);}`,
  });
  const water = new THREE.Mesh(
    new THREE.PlaneGeometry(2600, 2600, 50, 50),
    waterMat,
  );
  water.rotation.x = -Math.PI / 2;
  water.position.y = -35;
  scene.add(water);
  const cloudGroup = new THREE.Group();
  scene.add(cloudGroup);
  const cloudMats = [
    mat(0xd6cad3),
    mat(0xe8d4ce),
    mat(0xc4c5d4),
    mat(0xe9ddd8),
  ];
  const cloudGeo = new THREE.IcosahedronGeometry(1, 2);
  function cloud(x, y, z, s = 1) {
    const g = group(cloudGroup, x, y, z);
    for (let j = 0; j < 7; j++)
      mesh(
        g,
        cloudGeo,
        cloudMats[j % 4],
        range(-13, 13) * s,
        range(-1, 3) * s,
        range(-6, 6) * s,
        range(8, 15) * s,
        range(3.5, 7) * s,
        range(6, 11) * s,
      );
    return g;
  }
  for (let i = 0; i < 64; i++) {
    const a = range(0, TAU),
      r = range(70, 580);
    cloud(Math.cos(a) * r, range(-23, 1), Math.sin(a) * r, range(0.8, 2.8));
  }
  batchStatic(cloudGroup);

  // ─── 2. SINGLE SOURCE OF TRUTH: THE CONTINUOUS ARC-LENGTH RAILWAY ───────────────
  const controlPoints = [
    [-100, 26, 45],
    [-74, 26, 46],
    [-43, 29, 43],
    [-12, 39, 30],
    [22, 46, 0],
    [43, 44, -32],
    [68, 34, -58],
    [99, 33, -64],
    [122, 33, -49],
    [137, 38, -17],
    [137, 48, 35],
    [113, 52, 80],
    [57, 45, 112],
    [-7, 29, 123],
    [-73, 20, 117],
    [-116, 24, 89],
    [-121, 26, 61],
  ].map((a) => V(...a));
  const curve = new THREE.CatmullRomCurve3(controlPoints, true, "centripetal");
  curve.arcLengthDivisions = 5000;
  curve.updateArcLengths();
  const trackLength = curve.getLength();
  function frame(distance) {
    const u = (((distance / trackLength) % 1) + 1) % 1,
      p = curve.getPointAt(u),
      t = curve.getTangentAt(u).normalize(),
      r = V(t.z, 0, -t.x).normalize(),
      n = new THREE.Vector3().crossVectors(t, r).normalize();
    return { u, p, t, r, n };
  }
  function nearestDistance(point) {
    let best = Infinity,
      s = 0;
    for (let i = 0; i < 4000; i++) {
      const d = curve.getPointAt(i / 4000).distanceToSquared(point);
      if (d < best) {
        best = d;
        s = (i / 4000) * trackLength;
      }
    }
    return s;
  }
  const stations = [
    {
      name: "Saltlight Terminus",
      zh: "盐光始发站 · 归家的灯火",
      s: 0,
      index: 0,
      waiting: [],
    },
    {
      name: "Mango Tide",
      zh: "芒果潮汐 · 海风与晚归的人",
      s: nearestDistance(V(99, 33, -64)),
      index: 1,
      waiting: [],
    },
  ];
  const railway = new THREE.Group();
  world.add(railway);
  function offsetPath(points, side = 0, up = 0) {
    return points.map((f) =>
      f.p.clone().addScaledVector(f.r, side).addScaledVector(f.n, up),
    );
  }
  function tubePath(parent, pts, r, material, segments = pts.length * 2) {
    const c = new THREE.CatmullRomCurve3(pts, false, "centripetal");
    return mesh(
      parent,
      new THREE.TubeGeometry(c, segments, r, 5, false),
      material,
    );
  }
  // Shared track samples are used for decking, sleepers, rails and guard rails.
  const frames = [];
  for (let i = 0; i <= 700; i++) frames.push(frame((i / 700) * trackLength));
  for (const side of [-1.12, 1.12])
    tubePath(railway, offsetPath(frames, side, 0.17), 0.09, M.rail, 1400);
  for (const side of [-2.15, 2.15]) {
    tubePath(railway, offsetPath(frames, side, -0.54), 0.13, M.woodDark, 1400);
    tubePath(railway, offsetPath(frames, side, 1.35), 0.045, M.iron, 1400);
  }
  for (let d = 0; d < trackLength; d += 1.55) {
    const f = frame(d),
      o = box(railway, f.p.x, f.p.y - 0.12, f.p.z, 4.75, 0.24, 0.72, M.wood);
    o.quaternion.setFromRotationMatrix(
      new THREE.Matrix4().makeBasis(f.r, f.n, f.t),
    );
  }
  for (let d = 0; d < trackLength; d += 5.8) {
    const f = frame(d);
    for (const s of [-2.15, 2.15])
      beam(
        railway,
        f.p.clone().addScaledVector(f.r, s).addScaledVector(f.n, -0.4),
        f.p.clone().addScaledVector(f.r, s).addScaledVector(f.n, 1.4),
        0.075,
        M.iron,
      );
  }
  // Trestles and triangular cross braces visually support the long sea bridge.
  for (let d = 0; d < trackLength; d += 19) {
    const f = frame(d);
    const baseY = Math.max(-21, f.p.y - 36);
    for (const side of [-1.65, 1.65]) {
      const a = f.p.clone().addScaledVector(f.r, side);
      a.y -= 0.7;
      const b = a.clone();
      b.y = baseY;
      beam(railway, a, b, 0.55, M.woodDark);
      cyl(railway, b.x, b.y - 1, b.z, 1.5, 2, M.stone);
    }
    const a = f.p.clone().addScaledVector(f.r, -1.65);
    a.y -= 2;
    const b = f.p.clone().addScaledVector(f.r, 1.65);
    b.y -= 14;
    beam(railway, a, b, 0.24, M.woodLight);
    const c = f.p.clone().addScaledVector(f.r, 1.65);
    c.y -= 2;
    const e = f.p.clone().addScaledVector(f.r, -1.65);
    e.y -= 14;
    beam(railway, c, e, 0.24, M.woodLight);
  }
  // Overhead wire poles establish the unmistakable silhouette of a vintage tram line.
  for (let d = 10; d < trackLength; d += 36) {
    const f = frame(d),
      base = f.p.clone().addScaledVector(f.r, -2.65),
      top = base.clone().add(V(0, 8.2, 0));
    beam(railway, base, top, 0.19, M.woodDark);
    beam(railway, top, top.clone().addScaledVector(f.r, 3.25), 0.14, M.iron);
    ball(railway, top.x, top.y - 0.2, top.z, 0.35, 0.3, 0.35, M.glow);
  }
  tubePath(railway, offsetPath(frames, 0, 7.9), 0.021, M.iron, 1400);

  // ─── 3. HAND-BUILT LOW-POLY ISLAND TOWNS ────────────────────────────────────────
  function tree(parent, x, y, z, s = 1, type = 0) {
    const g = group(parent, x, y, z);
    cyl(g, 0, 1.8 * s, 0, 0.25 * s, 3.6 * s, M.woodDark, 6);
    if (type === 1) {
      for (let k = 0; k < 3; k++)
        mesh(
          g,
          new THREE.ConeGeometry((1.3 - k * 0.25) * s, (3.7 - k * 0.5) * s, 7),
          k % 2 ? M.leafDark : M.leaf,
          0,
          (3 + k * 1.15) * s,
          0,
        );
    } else {
      ball(g, 0, 4.3 * s, 0, 2.2 * s, 2.7 * s, 1.8 * s, M.leaf);
      ball(
        g,
        -1.25 * s,
        3.6 * s,
        0.25 * s,
        1.65 * s,
        1.8 * s,
        1.5 * s,
        M.leafLight,
      );
      ball(
        g,
        1.1 * s,
        3.7 * s,
        -0.3 * s,
        1.5 * s,
        1.9 * s,
        1.6 * s,
        M.leafDark,
      );
      if (type === 2)
        for (let i = 0; i < 7; i++)
          ball(
            g,
            range(-1.5, 1.5) * s,
            range(3.3, 5.7) * s,
            range(-1.2, 1.2) * s,
            0.18 * s,
            0.2 * s,
            0.18 * s,
            M.orange,
            0,
          );
    }
    return g;
  }
  function flowerBox(p, x, y, z, w = 1.6) {
    box(p, x, y, z, w, 0.3, 0.55, M.woodLight);
    for (let k = 0; k < 5; k++) {
      ball(p, x - w * 0.4 + k * w * 0.2, y + 0.2, z, 0.24, 0.23, 0.3, M.leaf);
      ball(
        p,
        x - w * 0.4 + k * w * 0.2,
        y + 0.37,
        z,
        0.13,
        0.13,
        0.13,
        k % 2 ? M.orange : M.pink,
        0,
      );
    }
  }
  function lamp(p, x, y, z) {
    cyl(p, x, y + 2.8, z, 0.08, 5.6, M.iron);
    beam(p, V(x, y + 5.4, z), V(x + 0.55, y + 5.6, z), 0.09, M.iron);
    box(p, x + 0.55, y + 5.2, z, 0.5, 0.65, 0.5, M.glow);
    cyl(p, x + 0.55, y + 5.58, z, 0.42, 0.15, M.iron, 4, 0);
  }
  function roof(p, w, h, d, y) {
    const shape = new THREE.Shape();
    shape.moveTo(-w / 2, 0);
    shape.lineTo(0, h);
    shape.lineTo(w / 2, 0);
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: d,
      bevelEnabled: false,
    });
    mesh(p, geo, M.roof, 0, y, -d / 2);
    for (let i = 0; i < Math.ceil(d / 0.48); i++) {
      const z = -d / 2 + i * 0.48;
      for (const side of [-1, 1]) {
        const a = V(0, y + h + 0.04, z),
          b = V(side * (w / 2 + 0.12), y - 0.06, z);
        beam(p, a, b, 0.115, i % 4 === 0 ? M.roofDark : M.roofLight, 0.12);
      }
    }
    // Ridge caps and slightly uneven eaves are deliberately modeled, not a texture.
    beam(
      p,
      V(0, y + h + 0.1, -d / 2 - 0.15),
      V(0, y + h + 0.1, d / 2 + 0.15),
      0.22,
      M.roofLight,
    );
  }
  function house(
    p,
    x,
    y,
    z,
    w = 6,
    h = 7,
    d = 6,
    angle = 0,
    color = M.plaster,
  ) {
    const g = group(p, x, y, z);
    g.rotation.y = angle;
    box(g, 0, h / 2, 0, w, h, d, color);
    box(g, 0, 0.2, 0, w + 0.25, 0.4, d + 0.25, M.stone);
    roof(g, w + 1.0, 2.2, d + 1, h);
    box(g, w * 0.28, h + 1, -d * 0.1, 1.05, 2.5, 1.1, M.plaster);
    box(g, w * 0.28, h + 2.35, -d * 0.1, 1.3, 0.27, 1.3, M.roofDark);
    for (const side of [-1, 1])
      for (let level = 0; level < 2; level++) {
        const yy = level === 0 ? h * 0.28 : h * 0.71;
        for (const xx of [-w * 0.27, w * 0.27]) {
          box(g, xx, yy, side * (d / 2 + 0.05), 1.25, 1.6, 0.13, M.woodDark);
          box(g, xx, yy, side * (d / 2 + 0.14), 1.02, 1.36, 0.08, M.glow);
          box(g, xx, yy, side * (d / 2 + 0.19), 0.09, 1.4, 0.08, M.cream);
          box(g, xx, yy, side * (d / 2 + 0.19), 1.05, 0.07, 0.08, M.cream);
          for (const s of [-1, 1])
            box(
              g,
              xx + s * 0.79,
              yy,
              side * (d / 2 + 0.1),
              0.36,
              1.65,
              0.15,
              M.greenLight,
            );
          if (level === 1 && side === 1)
            flowerBox(g, xx, yy - 0.95, d / 2 + 0.4, 1.65);
        }
      }
    for (const side of [-1, 1]) {
      box(g, side * (w / 2 + 0.06), h * 0.64, 0, 0.15, 1.6, 1.2, M.woodDark);
      box(g, side * (w / 2 + 0.15), h * 0.64, 0, 0.05, 1.3, 0.95, M.glow);
    }
    box(g, 0, 1.25, d / 2 + 0.07, 1.35, 2.5, 0.19, M.green);
    box(g, 0, 0.17, d / 2 + 0.75, 2, 0.35, 1.25, M.path);
    ball(g, 0.43, 1.3, d / 2 + 0.23, 0.07, 0.07, 0.07, M.brass);
    if (random() > 0.35) {
      box(
        g,
        0,
        3.3,
        d / 2 + 1.0,
        w * 0.75,
        0.16,
        1.9,
        M.greenLight,
      ).rotation.x = 0.13;
      for (const xx of [-w * 0.36, w * 0.36])
        cyl(g, xx, 1.65, d / 2 + 1.7, 0.06, 3.3, M.woodDark);
    }
    return g;
  }
  function island(p, x, y, z, r, theme = 0) {
    const g = group(p, x, y, z);
    // Irregular rings create actual faceted hanging rock, rather than a spherical planet.
    const verts = [],
      colors = [],
      indices = [],
      n = 13;
    const rings = [
      { y: 0, r: 1 },
      { y: -4, r: 1.04 },
      { y: -15, r: 0.73 },
      { y: -27, r: 0.29 },
      { y: -34, r: 0.03 },
    ];
    for (let k = 0; k < rings.length; k++)
      for (let j = 0; j < n; j++) {
        const a = (j / n) * TAU,
          rad = r * rings[k].r * range(0.87, 1.13);
        verts.push(
          Math.cos(a) * rad,
          rings[k].y + (k === 0 ? 0 : range(-2, 2)),
          Math.sin(a) * rad * 0.83,
        );
        const c = new THREE.Color(
          [0x93918a, 0x7d7f86, 0x686f7d, 0x606d79][Math.min(k, 3)],
        );
        c.multiplyScalar(range(0.88, 1.15));
        colors.push(c.r, c.g, c.b);
      }
    for (let k = 0; k < rings.length - 1; k++)
      for (let j = 0; j < n; j++) {
        const a = k * n + j,
          b = k * n + ((j + 1) % n),
          c = (k + 1) * n + j,
          d = (k + 1) * n + ((j + 1) % n);
        indices.push(a, b, c, b, d, c);
      }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    mesh(g, geo, mat(0xffffff, { vertexColors: true }));
    cyl(g, 0, -0.2, 0, r, 1.2, M.grass, 13, r * 0.99).scale.z = 0.83;
    cyl(g, 0, 0.25, 0, r * 0.75, 0.25, M.grassLight, 13).scale.z = 0.8;
    for (let i = 0; i < 15; i++) {
      const a = range(0, TAU),
        rr = range(0.78, 0.97) * r;
      ball(
        g,
        Math.cos(a) * rr,
        -range(1, 4),
        Math.sin(a) * rr * 0.84,
        range(1.8, 3.8),
        range(2, 4),
        range(1.5, 3),
        i % 2 ? M.rockLight : M.rock,
      );
      if (i % 2 === 0)
        ball(
          g,
          Math.cos(a) * rr,
          0.45,
          Math.sin(a) * rr * 0.84,
          2.5,
          0.7,
          2,
          M.leafDark,
        );
    }
    return g;
  }
  const salt = island(world, -102, 24, 23, 35);
  // Clear southern edge for the railway and station; houses sit along stepped lanes.
  box(salt, 0, 0.7, 3, 38, 0.32, 3.5, M.path);
  box(salt, -5, 0.7, -8, 3.4, 0.32, 24, M.path);
  house(salt, -13, 0.6, 4, 7, 8, 6, 0.12, M.plasterWhite);
  house(salt, 1, 0.6, 2, 6, 6.8, 5, -0.06, M.plasterGold);
  house(salt, 12, 0.6, -5, 7, 9, 6, -0.25, M.plasterPink);
  house(salt, -14, 0.6, -10, 6, 7.6, 6, 0.04, M.plaster);
  house(salt, -2, 0.6, -16, 8, 9, 6, 0, M.plasterWhite);
  house(salt, 18, 0.6, -17, 5.5, 6.3, 5, -0.3, M.plasterGold);
  for (const [x, z, s, t] of [
    [-23, 11, 1.2, 0],
    [-22, -4, 1.4, 1],
    [24, 5, 1.3, 0],
    [24, -8, 1, 1],
    [9, -18, 1, 0],
    [-12, -22, 1.2, 1],
    [9, 11, 0.85, 0],
  ])
    tree(salt, x, 0.6, z, s, t);
  for (const [x, z] of [
    [-8, 9],
    [9, 6],
    [20, -3],
    [-5, -7],
  ])
    lamp(salt, x, 0.7, z);
  const mango = island(world, 99, 31, -84, 38, 1);
  box(mango, 0, 0.7, 7, 41, 0.3, 3, M.path);
  box(mango, -4, 0.7, -5, 3, 0.3, 28, M.path);
  house(mango, -17, 0.6, 1, 7, 8.5, 6, 0.15, M.plasterGold);
  house(mango, -2, 0.6, 4, 7, 7.5, 6, -0.04, M.plasterWhite);
  house(mango, 14, 0.6, 0, 6, 9, 6, -0.2, M.plasterPink);
  house(mango, -12, 0.6, -13, 7, 8, 6, 0.1, M.plaster);
  house(mango, 6, 0.6, -14, 8, 9.3, 7, -0.2, M.plasterWhite);
  house(mango, 24, 0.6, -10, 5, 6, 5, -0.2, M.plasterGold);
  for (const [x, z, s, t] of [
    [-28, 6, 1.25, 2],
    [-23, -14, 1.3, 0],
    [26, 1, 1.25, 2],
    [15, -20, 1.4, 1],
    [0, -23, 1.0, 0],
    [8, 10, 0.8, 2],
    [-9, 10, 0.65, 2],
  ])
    tree(mango, x, 0.6, z, s, t);
  for (const [x, z] of [
    [-10, 8],
    [8, 6],
    [20, -2],
    [-4, -12],
  ])
    lamp(mango, x, 0.7, z);
  function lighthouse(p, x, y, z, s = 1) {
    const g = group(p, x, y, z);
    g.scale.setScalar(s);
    cyl(g, 0, 1, 0, 3.5, 2, M.stone, 10);
    cyl(g, 0, 8, 0, 2.25, 14, M.plasterWhite, 12, 1.65);
    cyl(g, 0, 9.6, 0, 2.03, 2.1, M.roof, 12, 1.93);
    cyl(g, 0, 15.5, 0, 2.6, 0.55, M.cream, 12);
    cyl(g, 0, 17, 0, 1.65, 2.8, M.glow, 10);
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * TAU;
      cyl(g, Math.cos(a) * 1.7, 17, Math.sin(a) * 1.7, 0.12, 2.8, M.greenDark);
    }
    cyl(g, 0, 18.8, 0, 2.4, 1.25, M.greenDark, 12, 0);
    cyl(g, 0, 19.8, 0, 0.07, 1.2, M.brass);
    box(g, 0, 3, 2.23, 1.25, 3, 0.1, M.greenDark);
    for (let i = 0; i < 3; i++)
      box(g, 0, 5.5 + i * 3, 2.14 - i * 0.12, 0.6, 1, 0.07, M.glow);
    halo(g, 0, 17, 0, 11, 0xffd58f, 0.4);
    return g;
  }
  lighthouse(salt, -27, 0.5, -13, 0.82);
  lighthouse(mango, 23, 0.5, -20, 0.85);
  function makeDock(p, x, y, z) {
    const g = group(p, x, y, z);
    for (let k = 0; k < 14; k++)
      box(g, 0, -0.15, k * 0.65, 3.9, 0.3, 0.53, M.woodLight);
    for (let k = 0; k < 4; k++)
      for (const s of [-1, 1])
        cyl(g, s * 1.6, -1.9, k * 2.6, 0.18, 4.5, M.woodDark);
    box(g, 0, 0.45, 4.3, 1.5, 0.9, 1.4, M.wood);
    box(g, 1, 0.5, 6.5, 0.8, 1, 0.8, M.wood);
    beam(g, V(-1.5, 0.5, 0), V(-1.5, 0.5, 8), 0.06, M.cream);
  }
  makeDock(salt, 24, 0, 13);
  makeDock(mango, -26, 0, 14);
  function resident(p, x, y, z, color = M.blue, variant = 0, s = 1) {
    const g = group(p, x, y, z);
    g.scale.setScalar(s);
    cyl(g, 0, 0.75, 0, 0.28, 0.9, color, 7, 0.23);
    ball(
      g,
      0,
      1.48,
      0,
      0.26,
      0.3,
      0.25,
      variant % 3 === 0 ? M.skinDark : M.skin,
    );
    ball(g, 0, 1.64, -0.05, 0.27, 0.19, 0.24, M.hair);
    for (const side of [-1, 1]) {
      box(g, side * 0.13, 0.19, 0, 0.16, 0.42, 0.2, M.dark);
      box(g, side * 0.13, 0.03, 0.1, 0.18, 0.13, 0.32, M.woodDark);
      beam(
        g,
        V(side * 0.25, 1.1, 0),
        V(side * 0.36, 0.65, 0.06),
        0.13,
        variant % 3 === 0 ? M.skinDark : M.skin,
      );
    }
    if (variant % 2 === 0) {
      cyl(g, 0, 1.72, 0, 0.4, 0.1, M.cream, 10);
      cyl(
        g,
        0,
        1.86,
        0,
        0.25,
        0.23,
        variant % 4 === 0 ? M.greenLight : M.woodLight,
        10,
      );
    } else if (variant % 3 === 0) ball(g, 0, 1.8, 0, 0.3, 0.2, 0.27, M.roof);
    if (variant % 4 === 1) box(g, 0.4, 0.63, 0, 0.3, 0.5, 0.33, M.woodLight);
    return g;
  }
  function platform(station) {
    const f = frame(station.s),
      g = group(world, f.p.x, f.p.y, f.p.z);
    g.quaternion.setFromRotationMatrix(
      new THREE.Matrix4().makeBasis(f.r, f.n, f.t),
    );
    station.group = g;
    box(g, 5.2, -0.3, 0, 5.7, 1.1, 23, M.stone);
    box(g, 5.2, 0.3, 0, 5.9, 0.25, 23.3, M.path);
    for (let z = -11; z <= 11; z += 1)
      box(g, 2.5, 0.45, z, 0.23, 0.06, 0.65, M.cream);
    for (const z of [-8, 8]) {
      cyl(g, 7.5, 3, z, 0.13, 5.5, M.woodDark);
      box(g, 6, 5.7, z, 4.5, 0.2, 0.25, M.woodDark);
    }
    box(g, 5.6, 5.7, 0, 6, 0.2, 20, M.greenLight);
    for (let i = 0; i < 14; i++) {
      box(
        g,
        2.7,
        5.35,
        -9.5 + i * 1.45,
        0.2,
        0.65,
        0.74,
        i % 2 ? M.greenLight : M.cream,
      );
    }
    for (const z of [-8, 8]) {
      const board = sign(g, station.name, 5.2, 4.7, z, 6.5, 1.05);
      board.rotation.y = z < 0 ? Math.PI : 0;
    }
    for (const z of [-6, 5]) {
      box(g, 6, 0.95, z, 1, 0.16, 3.3, M.woodLight);
      box(g, 6.4, 1.4, z, 0.15, 0.8, 3.3, M.greenDark);
      for (const dz of [-1.1, 1.1])
        box(g, 6, 0.62, z + dz, 0.2, 0.65, 0.2, M.iron);
    }
    lamp(g, 3.6, 0.5, -10);
    lamp(g, 3.6, 0.5, 10);
    flowerBox(g, 7, 0.7, 9, 1.9);
    const residents = new THREE.Group();
    residents.position.copy(g.position);
    residents.quaternion.copy(g.quaternion);
    scene.add(residents);
    station.peopleGroup = residents;
    const outfits = [M.orange, M.blue, M.pink, M.greenLight, M.cream, M.roof];
    for (let k = 0; k < 6; k++) {
      const person = resident(
        residents,
        3.8 + (k % 2) * 0.9,
        0.48,
        -4 + k * 1.55,
        outfits[k],
        k,
        0.83 + random() * 0.15,
      );
      person.rotation.y = -Math.PI / 2;
      station.waiting.push({ obj: person, home: person.position.clone() });
    }
  }
  stations.forEach(platform);
  // Distant floating neighborhoods and their own orbiting railway silhouettes.
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * TAU + 0.35,
      r = range(270, 520),
      x = Math.cos(a) * r,
      z = Math.sin(a) * r,
      y = range(18, 62),
      size = range(14, 26);
    const g = island(world, x, y, z, size);
    for (let k = 0; k < 3; k++)
      house(
        g,
        (k - 1) * 7,
        0.6,
        range(-4, 4),
        4.5,
        range(5, 8),
        4,
        0.1 * k,
        k % 2 ? M.plasterPink : M.plaster,
      );
    for (let k = 0; k < 4; k++)
      tree(
        g,
        range(-size * 0.7, size * 0.7),
        0.7,
        range(-size * 0.4, size * 0.4),
        0.7,
        k % 2,
      );
    if (i % 3 === 0) lighthouse(g, -size * 0.5, 0.5, 0, 0.5);
    if (i % 2 === 0) {
      const pts = [];
      for (let j = 0; j <= 48; j++) {
        const b = (j / 48) * TAU;
        pts.push(
          V(
            x + Math.cos(b) * (size + 13),
            y + 2 + Math.sin(b) * 3,
            z + Math.sin(b) * (size + 13),
          ),
        );
      }
      tubePath(world, pts, 0.35, M.woodDark, 100);
    }
  }
  // Pennants tied across village streets.
  function bunting(p, a, b) {
    beam(p, a, b, 0.035, M.woodDark);
    for (let j = 1; j < 9; j++) {
      const pos = a.clone().lerp(b, j / 9);
      pos.y -= Math.sin((j / 9) * Math.PI) * 0.55;
      const g = new THREE.BufferGeometry();
      g.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(
          [
            pos.x - 0.32,
            pos.y,
            pos.z,
            pos.x + 0.32,
            pos.y,
            pos.z,
            pos.x,
            pos.y - 0.9,
            pos.z,
          ],
          3,
        ),
      );
      g.computeVertexNormals();
      mesh(p, g, mat(j % 2 ? 0xe3b983 : 0x8da990, { side: THREE.DoubleSide }));
    }
  }
  bunting(salt, V(-14, 7, 8), V(6, 6.8, 9));
  bunting(mango, V(-16, 8, 5), V(6, 7.8, 8));
  batchStatic(world);

  // ─── 4. THE TRAM: TIMBER, ARCHES, BRASS, PEOPLE AND LITTLE DETAILS ──────────────
  function archGeometry(w, h, border = 0) {
    const s = new THREE.Shape(),
      r = w / 2;
    s.moveTo(-r, 0);
    s.lineTo(r, 0);
    s.lineTo(r, h - r);
    s.absarc(0, h - r, r, 0, Math.PI, false);
    s.lineTo(-r, 0);
    if (border) {
      const ir = r - border,
        ih = h - border;
      const hole = new THREE.Path();
      hole.moveTo(-ir, border);
      hole.lineTo(-ir, ih - ir);
      hole.absarc(0, ih - ir, ir, Math.PI, 0, true);
      hole.lineTo(ir, border);
      hole.lineTo(-ir, border);
      s.holes.push(hole);
    }
    return new THREE.ShapeGeometry(s, 16);
  }
  function makeTram(parent, upgraded = false) {
    const root = group(parent),
      body = group(root, 0, 0.48, 0),
      wheelGroup = group(root);
    const wheels = [];
    for (const z of [-2.4, 2.4]) {
      const axle = cyl(wheelGroup, 0, 0.43, z, 0.12, 3.6, M.iron, 10);
      axle.rotation.z = Math.PI / 2;
      for (const side of [-1, 1]) {
        const wh = cyl(
          wheelGroup,
          side * 1.25,
          0.43,
          z,
          0.48,
          0.22,
          M.iron,
          14,
        );
        wh.rotation.z = Math.PI / 2;
        wheels.push(wh);
        const rim = cyl(
          wheelGroup,
          side * 1.39,
          0.43,
          z,
          0.24,
          0.06,
          M.brass,
          12,
        );
        rim.rotation.z = Math.PI / 2;
      }
    }
    box(body, 0, 0.33, 0, 3.3, 0.46, 7.3, M.woodDark);
    box(body, 0, 0.63, 0, 3.45, 0.24, 7.5, M.woodLight);
    box(body, 0, 0.06, 0, 1.9, 0.38, 3.8, M.iron);
    for (let z = -3.3; z <= 3.3; z += 0.42)
      box(body, 0, 0.79, z, 3.1, 0.07, 0.34, M.woodLight);
    for (const side of [-1, 1]) {
      box(body, side * 1.53, 1.27, 0, 0.2, 0.93, 6.95, M.green);
      box(body, side * 1.66, 0.86, 0, 0.12, 0.14, 7.13, M.brass);
      box(body, side * 1.65, 1.67, 0, 0.1, 0.09, 7.14, M.brass);
      for (let k = -3; k <= 3; k++)
        box(body, side * 1.645, 1.26, k, 0.04, 0.62, 0.035, M.greenLight);
      for (const z of [-2.28, 0, 2.28]) {
        const arch = mesh(
          body,
          archGeometry(1.93, 1.94, 0.095),
          M.woodLight,
          side * 1.55,
          1.72,
          z,
        );
        arch.rotation.y = (side * Math.PI) / 2;
        const glass = mesh(
          body,
          archGeometry(1.73, 1.75),
          M.glass,
          side * 1.56,
          1.8,
          z,
        );
        glass.rotation.y = (side * Math.PI) / 2;
      }
      for (const z of [-3.35, -1.13, 1.13, 3.35])
        box(body, side * 1.52, 2.68, z, 0.15, 2.1, 0.16, M.greenDark);
      box(body, side * 1.63, 3.61, 0, 0.22, 0.19, 7.3, M.woodLight);
      // A modest base awning; the full garden roof is the workshop reward.
      box(
        body,
        side * 1.73,
        3.67,
        0,
        0.48,
        0.12,
        7.35,
        M.greenLight,
      ).rotation.z = -side * 0.2;
    }
    for (const z of [-3.5, 3.5]) {
      box(body, 0, 1.28, z, 3.1, 0.95, 0.2, M.green);
      box(body, 0, 1.72, z, 3.2, 0.09, 0.12, M.brass);
      for (const x of [-0.77, 0.77]) {
        const w = mesh(
          body,
          archGeometry(1.35, 1.88, 0.1),
          M.woodLight,
          x,
          1.77,
          z,
        );
        w.rotation.y = z < 0 ? Math.PI : 0;
        const glass = mesh(
          body,
          archGeometry(1.17, 1.71),
          M.glass,
          x,
          1.85,
          z + (z > 0 ? 0.02 : -0.02),
        );
        glass.rotation.y = z < 0 ? Math.PI : 0;
      }
      box(body, 0, 2.7, z, 0.1, 2, 0.2, M.greenDark);
      const label = sign(
        body,
        "COASTLINE",
        0,
        3.52,
        z + Math.sign(z) * 0.08,
        2.7,
        0.38,
      );
      if (z < 0) label.rotation.y = Math.PI;
      box(body, 0, 0.72, z + Math.sign(z) * 0.29, 3.6, 0.22, 0.42, M.woodDark);
      for (const x of [-1.06, 1.06]) {
        const light = mesh(
          body,
          sphereGeo,
          M.glow,
          x,
          1.4,
          z + Math.sign(z) * 0.2,
          0.22,
          0.22,
          0.15,
        );
        halo(body, x, 1.4, z + Math.sign(z) * 0.27, 1.6, 0xffdda2, 0.22);
      }
    }
    sign(body, "07", 0, 1.3, 3.62, 0.64, 0.4);
    // Roof with a real curved cross section and low hanging eaves.
    const shape = new THREE.Shape();
    shape.moveTo(-1.95, 0);
    shape.quadraticCurveTo(-1.8, 0.69, 0, 0.72);
    shape.quadraticCurveTo(1.8, 0.69, 1.95, 0);
    shape.lineTo(-1.95, 0);
    const roof = mesh(
      body,
      new THREE.ExtrudeGeometry(shape, {
        depth: 7.7,
        bevelEnabled: false,
        curveSegments: 12,
      }),
      upgraded ? M.greenLight : M.greenDark,
      0,
      3.72,
      -3.85,
    );
    for (const z of [-3.3, 3.3]) box(body, 0, 3.8, z, 4, 0.1, 0.16, M.brass);
    // Pantograph lightly touches the overhead wire. Decorative but attached to the car.
    beam(body, V(0, 4.25, -0.9), V(0, 5.65, 0.1), 0.085, M.iron);
    beam(body, V(0, 5.65, 0.1), V(0, 7.4, -0.55), 0.085, M.iron);
    box(body, 0, 7.4, -0.55, 2, 0.08, 0.14, M.iron);
    const luggage = group(body, 0, 4.3, -2.15);
    box(luggage, 0, 0.4, 0, 1.55, 0.8, 1.2, M.woodLight);
    for (const x of [-0.5, 0.5])
      box(luggage, x, 0.41, 0, 0.09, 0.82, 1.22, M.woodDark);
    box(luggage, 0, 0.85, 0, 0.55, 0.08, 0.1, M.brass);
    const decor = group(body);
    decor.visible = upgraded;
    // The upgrade is actual geometry: roof rack, travel trunks, lanterns and vines.
    for (const x of [-1.4, 1.4]) {
      beam(decor, V(x, 4.1, 0.5), V(x, 4.75, 0.5), 0.09, M.brass);
      beam(decor, V(x, 4.1, 3), V(x, 4.75, 3), 0.09, M.brass);
      beam(decor, V(x, 4.75, 0.5), V(x, 4.75, 3), 0.09, M.brass);
    }
    for (const z of [0.5, 1.1, 1.7, 2.3, 3])
      box(decor, 0, 4.5, z, 2.9, 0.1, 0.09, M.brass);
    box(decor, -0.55, 4.91, 1.5, 1.25, 0.8, 1.2, M.roof);
    box(decor, 0.7, 4.84, 1.8, 1, 0.65, 1.7, M.green);
    for (const x of [-0.95, -0.15, 0.4, 0.95])
      box(decor, x, 4.92, 1.5, 0.08, 0.84, 1.22, M.woodLight);
    ball(decor, -0.1, 5.48, 2.3, 0.75, 0.38, 0.52, M.cream);
    for (const side of [-1, 1]) {
      for (let k = 0; k < 19; k++) {
        const z = -3.3 + k * 0.37,
          y = 3.77 - Math.sin(k * 0.6) * 0.16;
        beam(
          decor,
          V(side * 1.96, y, z),
          V(side * 1.96, y - 0.25, z + 0.4),
          0.04,
          M.leafDark,
        );
        const leaf = ball(
          decor,
          side * 2.03,
          y - 0.18,
          z,
          0.12,
          0.22,
          0.23,
          k % 3 ? M.leaf : M.leafLight,
          0,
        );
        leaf.rotation.x = k * 0.8;
        if (k % 5 === 0)
          ball(decor, side * 2.05, y - 0.35, z, 0.11, 0.1, 0.11, M.orange, 0);
      }
      for (const z of [-2.8, 2.8]) {
        beam(
          decor,
          V(side * 1.9, 3.8, z),
          V(side * 2.04, 3.18, z),
          0.04,
          M.brass,
        );
        box(decor, side * 2.04, 3.02, z, 0.3, 0.45, 0.3, M.glow);
        cyl(decor, side * 2.04, 3.3, z, 0.23, 0.12, M.greenDark, 6, 0);
        halo(decor, side * 2.07, 3.05, z, 1.8, 0xffd57b, 0.35);
      }
    }
    // Benches and a varied seated passenger roster are visible through the arched glass.
    for (const side of [-1, 1]) {
      box(body, side * 1.05, 1.1, 0, 0.65, 0.2, 5.8, M.woodLight);
      box(body, side * 1.34, 1.55, 0, 0.15, 0.95, 5.9, M.woodDark);
    }
    const passengerModels = [];
    for (let i = 0; i < 16; i++) {
      const side = i % 2 ? -1 : 1,
        z = -2.8 + Math.floor(i / 2) * 0.78;
      const p = resident(
        body,
        side * 0.95,
        0.99,
        z,
        [M.orange, M.blue, M.pink, M.cream, M.greenLight][i % 5],
        i,
        0.62,
      );
      p.rotation.y = side < 0 ? Math.PI / 2 : -Math.PI / 2;
      passengerModels.push(p);
    }
    const driver = resident(body, -0.6, 1.03, 2.9, M.blue, 2, 0.76);
    driver.rotation.y = 0;
    // A separate sliding door panel: no departure before it has closed.
    const door = group(body, 1.68, 1.75, 2.4);
    box(door, 0, 0.85, 0, 0.06, 1.65, 0.84, M.greenDark);
    const dg = mesh(door, archGeometry(0.69, 1.38), M.glass, 0.04, 0.14, 0);
    dg.rotation.y = Math.PI / 2;
    box(door, 0.08, 0.7, -0.27, 0.07, 0.23, 0.05, M.brass);
    return { root, body, roof, decor, wheels, passengerModels, door, luggage };
  }
  const tram = makeTram(scene);
  const tramLight = new THREE.PointLight(0xffcc78, 5, 12, 2);
  tramLight.position.set(0, 3, 0);
  tram.body.add(tramLight);
  const smoke = [];
  for (let i = 0; i < 9; i++) {
    const o = ball(
      scene,
      0,
      0,
      0,
      0.5,
      0.5,
      0.5,
      mat(0xf2ddd0, { transparent: true, opacity: 0.17, depthWrite: false }),
    );
    o.visible = false;
    smoke.push({ obj: o, life: 0 });
  }
  const birds = [];
  for (let i = 0; i < 8; i++) {
    const g = group(scene);
    const wings = [];
    for (const s of [-1, 1]) {
      const a = box(g, s * 0.55, 0, 0, 1.2, 0.045, 0.2, M.cream);
      wings.push(a);
    }
    birds.push({
      g,
      wings,
      phase: random() * TAU,
      r: range(40, 110),
      y: range(51, 78),
    });
  }

  // ─── 5. OLIVER'S SEPARATE DIORAMA WORKSHOP ──────────────────────────────────────
  const workshopScene = new THREE.Scene();
  workshopScene.background = new THREE.Color(0x8ba7b4);
  workshopScene.fog = new THREE.FogExp2(0x8ba7b4, 0.007);
  workshopScene.add(new THREE.HemisphereLight(0xd4e4ff, 0x799281, 2.4));
  const workSun = new THREE.DirectionalLight(0xffd7a3, 3.5);
  workSun.position.set(-25, 50, 30);
  workshopScene.add(workSun);
  workSun.castShadow = true;
  workSun.shadow.mapSize.set(1024, 1024);
  workSun.shadow.camera.left = -30;
  workSun.shadow.camera.right = 30;
  workSun.shadow.camera.top = 30;
  workSun.shadow.camera.bottom = -30;
  workSun.shadow.normalBias = 0.12;
  workSun.shadow.bias = -0.0003;
  const workStatic = new THREE.Group();
  workshopScene.add(workStatic);
  const workIsland = island(workStatic, 0, -1.1, 0, 19);
  box(workStatic, 0, 0, 0, 19, 0.6, 21, M.path);
  box(workStatic, 0, 0.35, 0, 15, 0.12, 18, M.woodLight);
  for (let x = -7; x <= 7; x += 0.65)
    box(workStatic, x, 0.44, 0, 0.04, 0.02, 18, M.woodDark);
  // Open-faced workshop so the whole refit remains visible in the isometric camera.
  box(workStatic, 0, 3.2, -8, 15, 6, 0.4, M.plaster);
  box(workStatic, 7.5, 2, -4, 0.35, 3.5, 8, M.plasterPink);
  for (const x of [-7.5, 7.5])
    for (const z of [-8, 7]) {
      box(workStatic, x, 4, z, 0.42, 7.4, 0.42, M.woodDark);
      box(workStatic, x, 7.7, 0, 0.38, 0.35, 16, M.woodDark);
    }
  box(workStatic, 0, 7.8, -8, 15.5, 0.4, 0.4, M.woodDark);
  for (const x of [-5, -1, 3]) {
    box(workStatic, x, 3.8, -7.75, 2.4, 2.5, 0.2, M.woodDark);
    box(workStatic, x, 3.8, -7.59, 2, 2.1, 0.12, M.glow);
    box(workStatic, x, 3.8, -7.47, 0.1, 2.1, 0.12, M.woodLight);
    box(workStatic, x, 3.8, -7.47, 2, 0.1, 0.12, M.woodLight);
  }
  sign(workStatic, "OLIVER CLOUDWORKS", -0.6, 6.1, -7.72, 10, 1.3);
  box(workStatic, -5, 1.4, -5.7, 3.7, 0.35, 1.9, M.woodDark);
  for (const x of [-6.4, -3.6])
    box(workStatic, x, 0.7, -5.7, 0.23, 1.4, 1.7, M.woodDark);
  for (let i = 0; i < 6; i++) {
    box(
      workStatic,
      -6.3 + i * 0.48,
      1.75,
      -5.6,
      0.28,
      0.25,
      0.6,
      i % 2 ? M.iron : M.brass,
    );
  }
  box(workStatic, 5.2, 1.1, -5.7, 3.2, 2.2, 2.6, M.stone);
  box(workStatic, 5.2, 1.05, -4.31, 1.7, 1.4, 0.1, M.glow);
  cyl(workStatic, 5.2, 4.5, -5.8, 0.7, 4.8, M.iron, 8);
  halo(workStatic, 5.2, 1.1, -4, 5, 0xff9c47, 0.6);
  for (let i = 0; i < 7; i++) {
    const x = i % 2 ? -5.5 : 5.6,
      z = 1.5 + Math.floor(i / 2) * 1.65;
    box(workStatic, x, 0.8, z, 1.5, 1.4, 1.4, i % 2 ? M.wood : M.greenDark);
    for (const dx of [-0.5, 0.5])
      box(workStatic, x + dx, 0.8, z, 0.07, 1.45, 1.44, M.woodLight);
  }
  for (const x of [-1.12, 1.12])
    box(workStatic, x, 0.53, 1, 0.13, 0.13, 25, M.rail);
  for (let z = -11; z < 14; z += 1.1)
    box(workStatic, 0, 0.45, z, 3.7, 0.16, 0.4, M.woodDark);
  tree(workStatic, -13, 0, -3, 1.5);
  tree(workStatic, 12, 0, 4, 1.2, 2);
  tree(workStatic, -10, 0, 10, 0.9);
  lamp(workStatic, -8, 0, 9);
  flowerBox(workStatic, -6, 0.7, 7, 2);
  resident(workStatic, -3, 0.55, -0.5, M.greenLight, 0, 1.15);
  resident(workStatic, 3, 0.55, 2, M.orange, 3, 0.9);
  bunting(workStatic, V(-7.5, 7.5, 7), V(7.5, 7.5, 7));
  batchStatic(workStatic);
  const workTram = makeTram(workshopScene);
  workTram.root.position.set(0, 0.62, 1);
  const sparks = [];
  for (let i = 0; i < 20; i++) {
    const p = ball(workshopScene, 0, 0, 0, 0.045, 0.045, 0.045, M.glow, 0);
    p.visible = false;
    sparks.push(p);
  }
  const workCamera = new THREE.OrthographicCamera(-24, 24, 18, -18, 0.1, 300);

  // ─── 6. INPUT, SAVE DATA AND EVENT-DRIVEN GAME STATE ────────────────────────────
  const SAVE_KEY = "cloudline.v1";
  let saved = { coins: 240, upgrade: false };
  try {
    const raw = JSON.parse(localStorage.getItem(SAVE_KEY));
    if (
      raw &&
      raw.version === 1 &&
      Number.isFinite(raw.coins) &&
      raw.coins >= 0 &&
      raw.coins <= 9999999 &&
      typeof raw.upgrade === "boolean"
    )
      saved = { coins: Math.floor(raw.coins), upgrade: raw.upgrade };
  } catch (_) {
    /* Private browsing / invalid storage: just start with defaults. */
  }
  function save() {
    try {
      localStorage.setItem(
        SAVE_KEY,
        JSON.stringify({
          version: 1,
          coins: state.coins,
          upgrade: state.upgraded,
        }),
      );
    } catch (_) {}
  }
  const START_DISTANCE = 4;
  const state = {
    mode: "ready",
    paused: false,
    time: 0,
    distance: START_DISTANCE,
    speed: 0,
    acceleration: 0,
    throttle: 0,
    brake: 0,
    comfort: 100,
    coins: saved.coins,
    streak: 0,
    passengers: 12,
    nextStation: 1,
    lastStation: 0,
    legStart: START_DISTANCE,
    legEnd: stations[1].s,
    dockedStation: 0,
    dwell: 0,
    doorOpen: 0,
    doorPhase: "closed",
    rewarded: false,
    arrivals: 0,
    misses: 0,
    streakBroken: false,
    legMinComfort: 100,
    legRoughness: 0,
    wind: 0,
    curveForce: 0,
    grade: 0,
    upgraded: saved.upgrade,
    view: 0,
    orbit: 0,
    workStep: 0,
    workProgress: 0,
    workStage: "idle",
    workReturnMode: "ready",
    workExit: 0,
    sound: true,
    toastTime: 0,
    subtitleTime: 0,
    prevSpeed: 0,
  };
  const input = { power: false, brake: false, left: false, right: false };
  function resetInput() {
    for (const k in input) input[k] = false;
    $("power").classList.remove("held");
    $("brake").classList.remove("held");
  }
  function syncUpgrade() {
    for (const t of [tram, workTram]) {
      t.decor.visible = state.upgraded;
      t.roof.material = state.upgraded ? M.greenLight : M.greenDark;
    }
  }
  syncUpgrade();
  function toast(message, seconds = 4) {
    $("toast").querySelector("div").textContent = message;
    $("toast").classList.add("show");
    state.toastTime = seconds;
  }
  function subtitle(main, sub = "", seconds = 5) {
    $("subtitle").querySelector("strong").textContent = main;
    $("subtitle").querySelector("span").textContent = sub;
    $("subtitle").style.opacity = "1";
    state.subtitleTime = seconds;
  }
  function start() {
    if (state.mode !== "ready") return;
    state.mode = "driving";
    $("welcome").style.display = "none";
    initAudio();
    subtitle("全员上车。", "下一站：Mango Tide · 海岸线", 4.5);
  }
  function completeJourney() {
    if (state.rewarded) return;
    state.rewarded = true;
    state.arrivals++;
    const smooth =
      state.comfort >= 75 &&
      state.legMinComfort >= 58 &&
      state.legRoughness < 30 &&
      !state.streakBroken;
    const fare = state.passengers * 4;
    let tip = 0;
    if (smooth) {
      state.streak++;
      tip = 75 + Math.max(0, state.streak - 1) * 15;
    } else state.streak = 0;
    state.coins += fare + tip;
    save();
    toast(
      smooth
        ? `平稳抵达 +${tip} ✦  ·  车费 +${fare}  ·  连胜 ×${state.streak}`
        : `抵达车站 · 车费 +${fare}。下一程，再温柔一点。`,
      6,
    );
  }
  function dock(stationIndex, emergency = false) {
    state.mode = "docked";
    state.speed = 0;
    state.acceleration = 0;
    state.throttle = 0;
    state.brake = 0;
    state.dockedStation = stationIndex;
    state.doorPhase = "closed";
    state.dwell = 0;
    state.rewarded = false;
    resetInput();
    if (emergency) {
      state.comfort = Math.max(12, state.comfort - 32);
      state.legMinComfort = Math.min(state.comfort, state.legMinComfort);
      state.streakBroken = true;
      state.streak = 0;
      state.misses++;
      toast("进站过快，安全制动已介入。连胜中断，请提前减速。", 7);
    } else {
      toast("已停稳 · 按 E 打开车门，让海风和旅人进来。", 5);
    }
    subtitle(
      `抵达 ${stations[stationIndex].name}`,
      emergency
        ? "这次停靠有些颠簸。下次试着提前制动。"
        : "请打开车门，让乘客上下车。",
      4,
    );
  }
  function operateDoors() {
    initAudio();
    if (state.paused) return;
    if (state.mode === "docked" && state.doorPhase === "closed") {
      state.mode = "boarding";
      state.doorPhase = "opening";
      state.dwell = 0;
      state.boardingStart = state.passengers;
      resetInput();
      playBell();
      subtitle(
        `车门开启——${stations[state.dockedStation].name}`,
        "请稍候……乘客正在上下车。",
        7,
      );
      completeJourney();
    } else if (state.mode === "ready") {
      toast("乘客已经就座。点击「启程」开始第一段旅程。");
    } else if (state.mode === "driving") {
      toast("行车中不能打开车门。请先在站台停稳。");
    }
  }
  function finishBoarding() {
    const station = state.dockedStation;
    state.lastStation = station;
    state.nextStation = 1 - station;
    state.legStart = state.distance;
    let end =
      stations[state.nextStation].s +
      Math.floor(state.distance / trackLength) * trackLength;
    if (end <= state.distance + 10) end += trackLength;
    state.legEnd = end;
    state.mode = "driving";
    state.doorPhase = "closed";
    state.doorOpen = 0;
    state.streakBroken = false;
    state.legRoughness = 0;
    state.comfort = clamp(state.comfort + 14, 0, 100);
    state.legMinComfort = state.comfort;
    state.rewarded = false;
    stations[station].waiting.forEach((p) => {
      p.obj.visible = true;
      p.obj.position.copy(p.home);
    });
    subtitle(
      "全员上车。",
      `下一站：${stations[state.nextStation].name} · 海岸线`,
      4,
    );
    playBell();
  }
  function enterWorkshop() {
    if (state.paused) return;
    if (!["ready", "docked"].includes(state.mode)) {
      toast("工坊只在停稳、车门关闭时接待。请先抵达车站。");
      return;
    }
    state.workReturnMode = state.mode;
    state.mode = "workshop";
    state.workStep = state.upgraded ? 2 : 0;
    state.workProgress = 0;
    state.workStage = "idle";
    state.workExit = 0;
    resetInput();
    $("hud").style.display = "none";
    $("workshopUI").style.display = "block";
    workTram.root.position.set(0, 0.62, 1);
    workTram.body.rotation.set(0, 0, 0);
    workTram.roof.position.y = 3.72;
    workTram.decor.position.y = 0;
    syncUpgrade();
    updateWorkshopUI();
    initAudio();
  }
  function updateWorkshopUI() {
    const busy = state.workStage !== "idle";
    $("upgrade1").classList.toggle("done", state.workStep >= 1);
    $("upgrade2").classList.toggle("done", state.workStep >= 2);
    $("upgrade1").disabled = busy || state.workStep >= 1;
    $("upgrade2").disabled = busy || state.workStep !== 1;
    $("part1Text").textContent =
      state.workStep >= 1 ? "新叶片已装好 ✓" : "拆下旧部件";
    $("part2Text").textContent =
      state.workStep >= 2 ? "旅途的小伙伴已就位 ✓" : "准备电车";
    $("upgradeFill").style.width = (state.workStep / 2) * 100 + "%";
    $("upgradeCaption").textContent =
      state.workStep >= 2
        ? "改装完成。新的旅程，在等你。"
        : state.workStep === 1
          ? "叶片已就位。再添一点旅途的小心意。"
          : "第一回改装，Oliver 请客。";
    $("leaveWorkshop").disabled = busy;
    $("leaveWorkshop").innerHTML =
      state.workStep >= 2
        ? "全员上车，驶出工坊 <span>→</span>"
        : "暂不改装，返回车站 <span>→</span>";
  }
  function upgrade(step) {
    if (
      state.mode !== "workshop" ||
      state.workStage !== "idle" ||
      state.workStep !== step
    )
      return;
    state.workStage = "install";
    state.workProgress = 0;
    resetInput();
    updateWorkshopUI();
    $("upgradeCaption").textContent = "坐好，看工坊完成改装。";
    playBell();
  }
  function leaveWorkshop() {
    if (state.mode !== "workshop" || state.workStage !== "idle") return;
    state.workStage = "exit";
    state.workExit = 0;
    $("leaveWorkshop").disabled = true;
    $("upgrade1").disabled = true;
    $("upgrade2").disabled = true;
    $("upgradeCaption").textContent = "全员上车。下一站：海岸线。";
    playBell();
  }
  function returnFromWorkshop() {
    state.mode = state.workReturnMode;
    $("hud").style.display = "block";
    $("workshopUI").style.display = "none";
    syncUpgrade();
    resetInput();
    subtitle("全员上车。", "下一站：海岸线。", 4);
  }
  function resetJourney() {
    resetInput();
    Object.assign(state, {
      mode: "ready",
      paused: false,
      time: 0,
      distance: START_DISTANCE,
      speed: 0,
      acceleration: 0,
      throttle: 0,
      brake: 0,
      comfort: 100,
      streak: 0,
      passengers: 12,
      nextStation: 1,
      lastStation: 0,
      legStart: START_DISTANCE,
      legEnd: stations[1].s,
      dockedStation: 0,
      dwell: 0,
      doorOpen: 0,
      doorPhase: "closed",
      rewarded: false,
      arrivals: 0,
      misses: 0,
      streakBroken: false,
      legMinComfort: 100,
      legRoughness: 0,
      wind: 0,
      view: 0,
      orbit: 0,
      toastTime: 0,
      subtitleTime: 0,
    });
    for (const s of stations)
      s.waiting.forEach((p) => {
        p.obj.visible = true;
        p.obj.position.copy(p.home);
      });
    $("welcome").style.display = "block";
    $("hud").style.display = "block";
    $("workshopUI").style.display = "none";
    $("modal").hidden = true;
    $("toast").classList.remove("show");
    $("subtitle").style.opacity = 0;
    cameraInitialized = false;
    syncUpgrade();
  }
  function modal(type = "pause") {
    if (state.paused) {
      resume();
      return;
    }
    state.paused = true;
    resetInput();
    $("modal").hidden = false;
    $("modalTitle").textContent =
      type === "help" ? "一份慢行指南" : "让风景等一会儿。";
    $("modalContent").innerHTML =
      type === "help"
        ? '<div class="guide-row"><span>平缓给动力 / 制动</span><kbd>W / S</kbd></div><div class="guide-row"><span>环顾风景 / 切换视角</span><kbd>← → / V</kbd></div><div class="guide-row"><span>停站后打开车门</span><kbd>E</kbd></div><div class="guide-row"><span>静音 / 暂停</span><kbd>M / Esc</kbd></div><div class="guide-note">轻点动力控制在 24–34 km/h，侧风和弯道时再慢一点。距站约 65 m 开始刹车，以不超过 7 km/h 进入站台。高速越过停车点会触发安全制动并失去小费。<br><br>停站开门后，请等待上下客完成。工坊可在出发前或抵达后、开门前进入。手机长按底部踏板即可驾驶。</div>'
        : "<p>电车已暂停，乘客正在欣赏窗外。<br>休息好了，再继续这段旅程吧。</p>";
  }
  function resume() {
    state.paused = false;
    $("modal").hidden = true;
    resetInput();
    if (audio.ctx && state.sound) audio.ctx.resume().catch(() => {});
  }
  function changeView() {
    state.view = (state.view + 1) % 3;
    toast(
      [
        "随行视角 · 让海风从窗边经过",
        "远景视角 · 把群岛收入眼底",
        "车头视角 · 沿着星光前行",
      ][state.view],
      2.3,
    );
  }
  function toggleSound() {
    state.sound = !state.sound;
    $("sound").classList.toggle("muted", !state.sound);
    $("sound").setAttribute(
      "aria-label",
      state.sound ? "关闭声音" : "开启声音",
    );
    initAudio();
  }
  $("start").onclick = start;
  $("doors").onclick = operateDoors;
  $("workshop").onclick = enterWorkshop;
  $("welcomeWorkshop").onclick = enterWorkshop;
  $("upgrade1").onclick = () => upgrade(0);
  $("upgrade2").onclick = () => upgrade(1);
  $("leaveWorkshop").onclick = leaveWorkshop;
  $("pause").onclick = () => modal();
  $("help").onclick = () => modal("help");
  $("resume").onclick = resume;
  $("restart").onclick = resetJourney;
  $("view").onclick = changeView;
  $("sound").onclick = toggleSound;
  function bindPedal(id, key) {
    const b = $(id);
    b.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      if (state.paused || !["ready", "driving"].includes(state.mode)) return;
      initAudio();
      if (state.mode === "ready") start();
      b.setPointerCapture(e.pointerId);
      input[key] = true;
      b.classList.add("held");
    });
    for (const evt of ["pointerup", "pointercancel", "lostpointercapture"])
      b.addEventListener(evt, () => {
        input[key] = false;
        b.classList.remove("held");
      });
  }
  bindPedal("power", "power");
  bindPedal("brake", "brake");
  addEventListener("keydown", (e) => {
    if (
      [
        "KeyW",
        "KeyS",
        "ArrowLeft",
        "ArrowRight",
        "Space",
        "ArrowUp",
        "ArrowDown",
      ].includes(e.code)
    )
      e.preventDefault();
    if (e.repeat) return;
    if (e.code === "Escape" || e.code === "KeyP") {
      modal();
      return;
    }
    if (state.paused) return;
    if (e.code === "KeyM") {
      toggleSound();
      return;
    }
    if (state.mode === "workshop") return;
    if (e.code === "KeyV") changeView();
    if (e.code === "KeyE") operateDoors();
    if (e.code === "ArrowLeft") input.left = true;
    if (e.code === "ArrowRight") input.right = true;
    if (
      ["KeyW", "KeyS", "ArrowUp", "ArrowDown", "Space"].includes(e.code) &&
      ["ready", "driving"].includes(state.mode)
    ) {
      initAudio();
      if (state.mode === "ready") start();
      const k = ["KeyS", "ArrowDown", "Space"].includes(e.code)
        ? "brake"
        : "power";
      input[k] = true;
      $(k === "brake" ? "brake" : "power").classList.add("held");
    }
  });
  addEventListener("keyup", (e) => {
    if (["KeyW", "ArrowUp"].includes(e.code)) {
      input.power = false;
      $("power").classList.remove("held");
    }
    if (["KeyS", "ArrowDown", "Space"].includes(e.code)) {
      input.brake = false;
      $("brake").classList.remove("held");
    }
    if (e.code === "ArrowLeft") input.left = false;
    if (e.code === "ArrowRight") input.right = false;
  });
  addEventListener("blur", () => {
    resetInput();
    if (!state.paused && state.mode !== "ready") modal();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      resetInput();
      if (!state.paused && state.mode !== "ready") modal();
    }
  });
  // Touch horizontal camera drag does not conflict with the pedal buttons.
  let drag = null;
  renderer.domElement.addEventListener("pointerdown", (e) => {
    drag = { id: e.pointerId, x: e.clientX };
    renderer.domElement.setPointerCapture(e.pointerId);
  });
  renderer.domElement.addEventListener("pointermove", (e) => {
    if (drag && drag.id === e.pointerId) {
      state.orbit = clamp(
        state.orbit + (e.clientX - drag.x) * 0.006,
        -1.2,
        1.2,
      );
      drag.x = e.clientX;
    }
  });
  for (const name of ["pointerup", "pointercancel", "lostpointercapture"])
    renderer.domElement.addEventListener(name, () => (drag = null));

  // ─── 7. TINY PROCEDURAL AUDIO ENGINE (NO DOWNLOADS) ────────────────────────────
  const audio = {
    ctx: null,
    master: null,
    motor: null,
    motorGain: null,
    nextClick: 0,
  };
  function initAudio() {
    try {
      if (!audio.ctx) {
        const A = window.AudioContext || window.webkitAudioContext;
        if (!A) return;
        audio.ctx = new A();
        audio.master = audio.ctx.createGain();
        audio.master.gain.value = 0.25;
        audio.master.connect(audio.ctx.destination);
        audio.motor = audio.ctx.createOscillator();
        audio.motor.type = "triangle";
        audio.motorGain = audio.ctx.createGain();
        audio.motorGain.gain.value = 0;
        audio.motor.connect(audio.motorGain).connect(audio.master);
        audio.motor.start();
      }
      if (audio.ctx.state === "suspended" && state.sound)
        audio.ctx.resume().catch(() => {});
    } catch (_) {
      /* Audio is optional; driving never depends on audio permission. */
    }
  }
  function tone(freq, duration = 0.2, volume = 0.2, type = "sine") {
    if (!audio.ctx || !state.sound) return;
    const now = audio.ctx.currentTime,
      o = audio.ctx.createOscillator(),
      g = audio.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, now);
    g.gain.setValueAtTime(volume, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + duration);
    o.connect(g).connect(audio.master);
    o.start(now);
    o.stop(now + duration + 0.02);
    o.onended = () => {
      o.disconnect();
      g.disconnect();
    };
  }
  function playBell() {
    tone(830, 0.8, 0.2);
    tone(1244, 0.95, 0.08);
  }
  function updateAudio() {
    if (!audio.ctx) return;
    const t = audio.ctx.currentTime,
      moving = state.mode === "driving" && !state.paused && state.sound;
    audio.master.gain.setTargetAtTime(
      state.sound && !state.paused ? 0.25 : 0,
      t,
      0.06,
    );
    audio.motor.frequency.setTargetAtTime(38 + state.speed * 5, t, 0.1);
    audio.motorGain.gain.setTargetAtTime(
      moving ? Math.min(0.14, state.speed * 0.014) : 0,
      t,
      0.12,
    );
    if (moving && state.speed > 1 && t > audio.nextClick) {
      tone(90 + state.speed * 3, 0.045, 0.11, "triangle");
      audio.nextClick = t + Math.max(0.085, 1.55 / state.speed);
    }
  }

  // ─── 8. SIMULATION: INERTIA, GRADE, BENDS, WIND, COMFORT, STATIONS ──────────────
  // The simulation owns timers; render frames and UI do not independently advance gameplay.
  function simulate(dt) {
    if (state.paused) return;
    state.time += dt;
    if (state.toastTime > 0) {
      state.toastTime -= dt;
      if (state.toastTime <= 0) $("toast").classList.remove("show");
    }
    if (state.subtitleTime > 0) {
      state.subtitleTime -= dt;
      if (state.subtitleTime <= 0) $("subtitle").style.opacity = 0;
    }
    state.orbit = clamp(
      state.orbit + ((input.right ? 1 : 0) - (input.left ? 1 : 0)) * dt * 0.75,
      -1.25,
      1.25,
    );
    if (state.mode === "workshop") {
      if (state.workStage === "install") {
        const duration = state.workStep === 0 ? 4 : 5;
        state.workProgress += dt / duration;
        const t = clamp(state.workProgress, 0, 1);
        $("upgradeFill").style.width = ((state.workStep + t) / 2) * 100 + "%";
        if (state.workStep === 0) {
          workTram.roof.position.y = 3.72 + Math.sin(t * Math.PI) * 2;
          workTram.roof.rotation.z = Math.sin(t * TAU) * 0.08;
          if (t > 0.52) workTram.roof.material = M.greenLight;
        } else {
          workTram.decor.visible = true;
          workTram.decor.position.y = (1 - t) * 2;
          workTram.decor.scale.setScalar(0.85 + 0.15 * t);
        }
        if (t >= 1) {
          state.workStep++;
          state.workStage = "idle";
          workTram.roof.position.y = 3.72;
          workTram.roof.rotation.z = 0;
          if (state.workStep === 2) {
            state.upgraded = true;
            workTram.decor.position.y = 0;
            workTram.decor.scale.setScalar(1);
            save();
            syncUpgrade();
          }
          updateWorkshopUI();
          playBell();
        }
      } else if (state.workStage === "exit") {
        state.workExit += dt;
        workTram.root.position.z = 1 + state.workExit * state.workExit * 2;
        if (state.workExit >= 2.3) returnFromWorkshop();
      }
      return;
    }
    if (state.mode === "boarding") {
      state.dwell += dt;
      const t = state.dwell;
      state.doorPhase = t < 1 ? "opening" : t < 5.8 ? "open" : "closing";
      state.doorOpen =
        t < 1 ? t : t < 5.8 ? 1 : clamp(1 - (t - 5.8) / 1.1, 0, 1);
      if (t > 1 && t < 5.6) {
        const departing = Math.floor((t - 1) / 0.55);
        state.passengers = clamp(
          state.boardingStart -
            departing +
            Math.max(0, Math.floor((t - 1.9) / 0.65)) * 2,
          4,
          16,
        );
      }
      const waiting = stations[state.dockedStation].waiting;
      waiting.forEach((p, i) => {
        const a = clamp((t - 1 - i * 0.55) / 1.4, 0, 1);
        p.obj.position.copy(p.home).lerp(V(1.45, 0.48, 2.4), a);
        p.obj.visible = a < 0.97;
        p.obj.rotation.z =
          Math.sin(state.time * 10 + i) * 0.035 * (a > 0 && a < 1 ? 1 : 0);
      });
      if (t >= 7) {
        state.passengers = state.dockedStation === 1 ? 14 : 12;
        finishBoarding();
      }
      return;
    }
    if (state.mode !== "driving") return;
    const f = frame(state.distance),
      ahead = frame(state.distance + 2.5),
      behind = frame(state.distance - 2.5);
    const curvature = ahead.t.clone().sub(behind.t).length() / 5;
    state.curveForce = state.speed * state.speed * curvature;
    state.grade = f.t.y;
    const exposed = (f.p.y > 37 && f.p.z < 65) || (f.p.z > 90 && f.p.x < 60);
    state.wind = exposed
      ? 0.32 + 0.68 * (0.5 + 0.5 * Math.sin(state.time * 0.36 + f.u * 11))
      : 0;
    const oldA = state.acceleration;
    // Gradually spool motor and brake; tapping W/S is gentler than holding them flat out.
    state.throttle = mix(
      state.throttle,
      input.power ? 1 : 0,
      1 - Math.exp(-dt * 1.8),
    );
    state.brake = mix(
      state.brake,
      input.brake ? 1 : 0,
      1 - Math.exp(-dt * 3.7),
    );
    const motor =
      state.throttle *
      (state.upgraded ? 2.85 : 2.65) *
      (1 - (0.45 * state.speed) / 17);
    const drag = 0.09 + 0.0015 * state.speed * state.speed;
    state.acceleration = motor - state.brake * 5.7 - drag - state.grade * 2.7;
    if (state.speed <= 0.01 && !input.power) state.acceleration = 0; // parking brake on gradients
    state.speed = clamp(state.speed + state.acceleration * dt, 0, 16.67);
    const jerk = Math.abs(state.acceleration - oldA) / Math.max(dt, 0.001);
    const roughAccel = Math.max(0, Math.abs(state.acceleration) - 1.55) * 1.45;
    const roughCorner = Math.max(0, state.curveForce - 1.6) * 2.4;
    const roughWind = state.wind * Math.max(0, state.speed - 6) * 0.22;
    const roughJerk = Math.max(0, jerk - 4.4) * 0.07;
    const roughness =
      (roughAccel + roughCorner + roughWind + roughJerk) *
      (state.upgraded ? 0.78 : 1);
    const recovery = state.speed > 0.8 && roughness < 0.35 ? 0.6 : 0;
    state.comfort = clamp(state.comfort + (recovery - roughness) * dt, 0, 100);
    state.legRoughness += roughness * dt;
    state.legMinComfort = Math.min(state.legMinComfort, state.comfort);
    if (state.comfort < 56 && !state.streakBroken) {
      state.streakBroken = true;
      state.streak = 0;
      toast("连胜中断。找到平衡，重新赚取小费。", 6.5);
    }
    const previous = state.distance;
    state.distance += state.speed * dt;
    const remaining = state.legEnd - state.distance;
    // Only the current target may dock; high-speed station crossings are penalized once.
    if (remaining < 11 && remaining >= -1 && state.speed < 1.95) {
      state.distance = state.legEnd;
      dock(state.nextStation, false);
    } else if (
      previous < state.legEnd + 1 &&
      state.distance >= state.legEnd + 1
    ) {
      state.distance = state.legEnd;
      dock(state.nextStation, true);
    }
  }

  // ─── 9. CAMERA, ANIMATION AND THE STATE-DERIVED HUD ─────────────────────────────
  let cameraInitialized = false,
    uiTimer = 0,
    smokeClock = 0;
  const cameraTarget = V(),
    cameraDesired = V();
  function present(dt) {
    const f = frame(state.distance),
      slope = Math.asin(f.t.y),
      yaw = Math.atan2(f.t.x, f.t.z);
    tram.root.position.copy(f.p);
    tram.root.rotation.set(0, yaw, 0);
    tram.root.rotateX(-slope);
    const near = frame(state.distance + 4),
      cross = f.t.x * near.t.z - f.t.z * near.t.x;
    const roll = clamp(
      cross * state.speed * state.speed * 0.008,
      -0.095,
      0.095,
    );
    const moving = state.speed > 0.2;
    tram.body.rotation.z = mix(
      tram.body.rotation.z,
      -roll +
        Math.sin(state.time * 2.3) * state.wind * 0.012 +
        (moving ? Math.sin(state.time * 7) * 0.005 : 0),
      1 - Math.exp(-dt * 6),
    );
    tram.body.rotation.x = mix(
      tram.body.rotation.x,
      -state.acceleration * 0.004,
      1 - Math.exp(-dt * 4),
    );
    tram.body.position.y =
      0.48 + (moving ? Math.sin(state.distance * 2.6) * 0.016 : 0);
    tram.door.position.z = 2.4 - state.doorOpen * 0.93;
    tram.passengerModels.forEach((p, i) => {
      p.visible = i < state.passengers;
      p.rotation.z =
        Math.sin(state.time * 1.3 + i) * 0.012 + (moving ? roll * 0.4 : 0);
    });
    for (const w of tram.wheels) w.rotation.x = -state.distance / 0.48;
    // Three view presets: close scenic chase, broad landscape, and driver's-eye forward view.
    const side = f.r.clone().multiplyScalar(-1),
      back = f.t.clone().multiplyScalar(-1);
    if (state.view === 2) {
      cameraDesired
        .copy(f.p)
        .addScaledVector(f.n, 3.6)
        .addScaledVector(f.t, 4.3)
        .addScaledVector(f.r, Math.sin(state.orbit) * 0.65);
      cameraTarget
        .copy(f.p)
        .addScaledVector(f.t, 35)
        .addScaledVector(f.n, 3.2)
        .addScaledVector(f.r, Math.sin(state.orbit) * 18);
    } else {
      const angle = state.orbit,
        dist = state.view === 1 ? 42 : 23,
        sideAmount = state.view === 1 ? 29 : 17,
        up = state.view === 1 ? 26 : 12;
      const offset = back
        .multiplyScalar(dist)
        .addScaledVector(side, sideAmount);
      offset.applyAxisAngle(UP, angle);
      cameraDesired
        .copy(f.p)
        .add(offset)
        .add(V(0, up, 0));
      cameraTarget
        .copy(f.p)
        .addScaledVector(f.t, state.view === 1 ? 15 : 10)
        .add(V(0, state.view === 1 ? 1 : 2.6, 0));
      if (mobile()) {
        cameraDesired.addScaledVector(f.t, -6).add(V(0, 7, 0));
        cameraTarget.add(V(0, 3, 0));
      }
    }
    if (!cameraInitialized) {
      camera.position.copy(cameraDesired);
      cameraInitialized = true;
    } else camera.position.lerp(cameraDesired, 1 - Math.exp(-dt * 4));
    camera.lookAt(cameraTarget);
    if (state.view === 2 && moving)
      camera.rotateZ(Math.sin(state.distance * 2) * 0.0015);
    // Twilight slowly deepens, but remains readable and warm rather than pitch black.
    const night = 0.5 - 0.5 * Math.cos(state.time / 190);
    skyMat.uniforms.night.value = night * 0.7;
    stars.material.opacity = 0.35 + night * 0.55;
    sun.intensity = 3.3 - night * 0.9;
    hemi.intensity = 2.35 - night * 0.6;
    waterMat.uniforms.time.value = state.time;
    const lightPos = f.p.clone().add(V(-85, 120, 70));
    sun.position.copy(lightPos);
    sun.target.position.copy(f.p);
    for (const b of birds) {
      const a = state.time * 0.05 + b.phase;
      b.g.position.set(
        Math.cos(a) * b.r,
        b.y + Math.sin(a * 2) * 2,
        Math.sin(a) * b.r - 22,
      );
      b.g.rotation.y = -a;
      for (let i = 0; i < 2; i++)
        b.wings[i].rotation.z =
          Math.sin(state.time * 3.5 + b.phase) * (i ? 1 : -1) * 0.35;
    }
    // Steam-like warm air wisps only appear while the motor is producing power.
    if (!state.paused) {
      smokeClock += dt;
      if (
        state.mode === "driving" &&
        state.throttle > 0.3 &&
        smokeClock > 0.38
      ) {
        smokeClock = 0;
        const p = smoke.find((x) => x.life <= 0);
        if (p) {
          p.life = 2;
          p.obj.visible = true;
          p.obj.position
            .copy(f.p)
            .addScaledVector(f.n, 5.5)
            .addScaledVector(f.t, -2.8);
        }
      }
      for (const s of smoke)
        if (s.life > 0) {
          s.life -= dt;
          s.obj.position.y += dt * 0.75;
          s.obj.position.x += dt * 0.6;
          const size = (2 - s.life) * 0.8 + 0.3;
          s.obj.scale.set(size, size * 0.6, size);
          s.obj.material.opacity = Math.max(0, s.life * 0.07);
          if (s.life <= 0) s.obj.visible = false;
        }
    }
    if (state.mode === "workshop") {
      const aspect = innerWidth / innerHeight,
        span = mobile() ? 18 : 18;
      workCamera.left = -span * aspect;
      workCamera.right = span * aspect;
      workCamera.top = span;
      workCamera.bottom = -span;
      workCamera.updateProjectionMatrix();
      const target = mobile() ? V(0, 0, 0) : V(6, 2, 1);
      workCamera.position.copy(target).add(V(-27, 28, 34));
      workCamera.lookAt(target);
      if (mobile()) {
        workCamera.position.add(V(0, 5, 0));
        workCamera.lookAt(V(0, -6, 0));
      }
      for (let i = 0; i < sparks.length; i++) {
        const s = sparks[i];
        s.visible = state.workStage === "install";
        if (s.visible) {
          const age = (state.time * 2 + i * 0.17) % 1;
          s.position.set(
            -1.8 + Math.cos(i * 2.4) * age * 2,
            2 + age * 3,
            Math.sin(i * 1.7) * age * 2,
          );
          s.scale.setScalar((1 - age) * 0.06);
        }
      }
      workTram.body.rotation.z =
        state.workStage === "install" ? Math.sin(state.time * 11) * 0.009 : 0;
    }
    uiTimer += dt;
    if (uiTimer > 0.08) {
      updateUI();
      uiTimer = 0;
    }
  }
  function updateUI() {
    const dest = stations[state.nextStation],
      remain = Math.max(0, state.legEnd - state.distance),
      kmh = state.speed * 3.6;
    $("speed").textContent = Math.round(kmh).toString().padStart(2, "0");
    $("speedFill").style.width = Math.min(100, (kmh / 60) * 100) + "%";
    $("speedFill").style.background = kmh > 36 ? "#edac85" : "#f8d392";
    $("destName").textContent =
      state.mode === "docked" || state.mode === "boarding"
        ? stations[state.dockedStation].name
        : dest.name;
    $("destZh").textContent = dest.zh;
    $("dist").textContent = Math.round(remain) + " m";
    $("lineName").textContent =
      state.nextStation === 1
        ? "01  THE COASTLINE"
        : "02  THE SALTLIGHT RETURN";
    $("money").textContent = state.coins.toLocaleString();
    $("streak").textContent = "连胜 ×" + state.streak;
    $("passengers").innerHTML = state.passengers + " <em>/ 16 人</em>";
    const comfort = state.comfort;
    $("comfortText").innerHTML =
      (comfort > 80 ? "舒适惬意" : comfort > 56 ? "有些摇晃" : "请温柔驾驶") +
      ` <em>${Math.round(comfort)}%</em>`;
    $("comfortFill").style.width = comfort + "%";
    $("comfortFill").style.background =
      comfort > 75 ? "#b7d8ac" : comfort > 50 ? "#efce8f" : "#eaa386";
    $("fromStation").textContent = stations[state.lastStation].name;
    $("toStation").textContent = dest.name;
    $("routeTrain").style.left =
      clamp(
        ((state.distance - state.legStart) / (state.legEnd - state.legStart)) *
          100,
        0,
        100,
      ) + "%";
    $("condition").textContent =
      state.wind > 0.4
        ? "侧风"
        : state.curveForce > 1.7
          ? "高架弯道"
          : state.grade > 0.055
            ? "上坡"
            : state.grade < -0.055
              ? "下坡"
              : "平稳";
    $("speedAdvice").textContent =
      state.mode === "boarding"
        ? "乘客上下车"
        : state.mode === "docked"
          ? "停站 · 开门"
          : remain < 65
            ? "进站请减速"
            : state.wind > 0.5
              ? "侧风 · 慢行"
              : kmh > 36
                ? "松开动力"
                : kmh < 2
                  ? "缓缓出发"
                  : "轻轻走，稳稳停";
    const minutes = 18 * 60 + 42 + Math.floor(state.time / 12);
    $("weatherLabel").innerHTML =
      (minutes < 19 * 60 ? "海岸的黄昏" : "星光的海岸") +
      `<small>${Math.floor(minutes / 60) % 24}:${String(minutes % 60).padStart(2, "0")} &nbsp; · &nbsp; ${state.wind > 0.4 ? "侧风" : "微风"}</small>`;
    $("weatherIcon").textContent = minutes < 19 * 60 ? "☀" : "☾";
    const a = frame(state.distance),
      tag =
        a.p.x < -62
          ? "Saltlight Terminus"
          : a.p.z < -36
            ? "Mango Tide"
            : a.p.z > 65
              ? "The Cloudwater Viaduct"
              : "The Long Crossing";
    $("locationName").innerHTML =
      tag +
      `<small>${tag === "Saltlight Terminus" ? "盐光始发站 · 归家的灯火" : tag === "Mango Tide" ? "芒果潮汐 · 让晚风捎一封信" : tag === "The Long Crossing" ? "跨海长桥 · 云从脚下经过" : "云水高架 · 眺望更远的岛屿"}</small>`;
    $("dockAction").style.display = state.mode === "docked" ? "flex" : "none";
    // Boarding message and dock buttons never overlap.
    if (state.mode === "docked") $("subtitle").style.opacity = 0;
  }
  function resize() {
    renderer.setSize(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight,
      false, // CSS owns canvas size: prevents a stale inline width on phone rotation.
    );
    renderer.setPixelRatio(Math.min(devicePixelRatio, mobile() ? 1.5 : 1.75));
    camera.aspect =
      document.documentElement.clientWidth /
      document.documentElement.clientHeight;
    camera.fov = mobile() ? 56 : 49;
    camera.updateProjectionMatrix();
    cameraInitialized = false;
  }
  addEventListener("resize", resize);
  resize();
  let last = performance.now(),
    accumulator = 0;
  function loop(now) {
    requestAnimationFrame(loop);
    const elapsed = Math.min((now - last) / 1000, 0.15);
    last = now;
    if (!state.paused) {
      accumulator += elapsed;
      let steps = 0;
      while (accumulator >= 1 / 60 && steps < 9) {
        simulate(1 / 60);
        accumulator -= 1 / 60;
        steps++;
      }
    } else accumulator = 0;
    present(state.paused ? 0 : elapsed);
    updateAudio();
    renderer.render(
      state.mode === "workshop" ? workshopScene : scene,
      state.mode === "workshop" ? workCamera : camera,
    );
  }
  updateUI();
  present(0.016);
  requestAnimationFrame(loop);
  $("loading").style.opacity = 0;
  setTimeout(() => $("loading").remove(), 550);
  // Explicit test mode only. Shipping gameplay has no teleport/time-acceleration hotkeys.
  if (new URLSearchParams(location.search).has("test"))
    window.__cloudline = {
      state,
      input,
      stations,
      trackLength,
      frame,
      simulate,
      updateUI,
      snapshot: () => JSON.parse(JSON.stringify(state)),
      step(seconds) {
        for (let i = 0; i < seconds * 60; i++) simulate(1 / 60);
        present(0.016);
        updateUI();
      },
      setDistance(d) {
        state.distance = d;
      },
      renderer,
      tram,
      workTram,
      save,
    };
})();
