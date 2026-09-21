# 冻结版本源码导航

所有行号相对 `assets/reference-project/src/game.js`；重写后的行号会变化，以函数名为准。

| 行号 | 符号 / 分区 |
|---|---|
| 77 | `function mat(color, opts = {}) {` |
| 89 | `const M = {` |
| 139 | `function mesh(` |
| 158 | `function box(p, x, y, z, sx, sy, sz, m) {` |
| 161 | `function ball(p, x, y, z, sx, sy, sz, m, detail = 1) {` |
| 164 | `function cyl(p, x, y, z, r, h, m, n = 8, rt = r) {` |
| 167 | `function beam(p, a, b, width, material, depth = width) {` |
| 173 | `function group(parent, x = 0, y = 0, z = 0) {` |
| 180 | `function batchStatic(root) {` |
| 232 | `function textureLabel(` |
| 262 | `function sign(parent, text, x, y, z, w = 6, h = 1.3) {` |
| 273 | `// ─── 1. SKY, CLOUDS, SEA ───────────────────────────────────────────────────────` |
| 283 | `function glowTexture() {` |
| 296 | `function halo(parent, x, y, z, size, color = 0xffddaa, opacity = 0.4) {` |
| 366 | `function cloud(x, y, z, s = 1) {` |
| 389 | `// ─── 2. SINGLE SOURCE OF TRUTH: THE CONTINUOUS ARC-LENGTH RAILWAY ───────────────` |
| 390 | `const controlPoints = [` |
| 413 | `function frame(distance) {` |
| 421 | `function nearestDistance(point) {` |
| 433 | `const stations = [` |
| 451 | `function offsetPath(points, side = 0, up = 0) {` |
| 456 | `function tubePath(parent, pts, r, material, segments = pts.length * 2) {` |
| 525 | `// ─── 3. HAND-BUILT LOW-POLY ISLAND TOWNS ────────────────────────────────────────` |
| 526 | `function tree(parent, x, y, z, s = 1, type = 0) {` |
| 577 | `function flowerBox(p, x, y, z, w = 1.6) {` |
| 594 | `function lamp(p, x, y, z) {` |
| 600 | `function roof(p, w, h, d, y) {` |
| 628 | `function house(` |
| 692 | `function island(p, x, y, z, r, theme = 0) {` |
| 764 | `const salt = island(world, -102, 24, 23, 35);` |
| 791 | `const mango = island(world, 99, 31, -84, 38, 1);` |
| 817 | `function lighthouse(p, x, y, z, s = 1) {` |
| 839 | `function makeDock(p, x, y, z) {` |
| 852 | `function resident(p, x, y, z, color = M.blue, variant = 0, s = 1) {` |
| 894 | `function platform(station) {` |
| 1003 | `function bunting(p, a, b) {` |
| 1034 | `// ─── 4. THE TRAM: TIMBER, ARCHES, BRASS, PEOPLE AND LITTLE DETAILS ──────────────` |
| 1035 | `function archGeometry(w, h, border = 0) {` |
| 1056 | `function makeTram(parent, upgraded = false) {` |
| 1336 | `// ─── 5. OLIVER'S SEPARATE DIORAMA WORKSHOP ──────────────────────────────────────` |
| 1337 | `const workshopScene = new THREE.Scene();` |
| 1424 | `// ─── 6. INPUT, SAVE DATA AND EVENT-DRIVEN GAME STATE ────────────────────────────` |
| 1425 | `const SAVE_KEY = "cloudline.v1";` |
| 1441 | `function save() {` |
| 1454 | `const state = {` |
| 1498 | `function resetInput() {` |
| 1503 | `function syncUpgrade() {` |
| 1510 | `function toast(message, seconds = 4) {` |
| 1515 | `function subtitle(main, sub = "", seconds = 5) {` |
| 1521 | `function start() {` |
| 1528 | `function completeJourney() {` |
| 1552 | `function dock(stationIndex, emergency = false) {` |
| 1581 | `function operateDoors() {` |
| 1603 | `function finishBoarding() {` |
| 1632 | `function enterWorkshop() {` |
| 1655 | `function updateWorkshopUI() {` |
| 1678 | `function upgrade(step) {` |
| 1692 | `function leaveWorkshop() {` |
| 1702 | `function returnFromWorkshop() {` |
| 1710 | `function resetJourney() {` |
| 1758 | `function modal(type = "pause") {` |
| 1773 | `function resume() {` |
| 1779 | `function changeView() {` |
| 1790 | `function toggleSound() {` |
| 1812 | `function bindPedal(id, key) {` |
| 1913 | `// ─── 7. TINY PROCEDURAL AUDIO ENGINE (NO DOWNLOADS) ────────────────────────────` |
| 1921 | `function initAudio() {` |
| 1943 | `function tone(freq, duration = 0.2, volume = 0.2, type = "sine") {` |
| 1960 | `function playBell() {` |
| 1964 | `function updateAudio() {` |
| 1985 | `// ─── 8. SIMULATION: INERTIA, GRADE, BENDS, WIND, COMFORT, STATIONS ──────────────` |
| 1987 | `function simulate(dt) {` |
| 2134 | `// ─── 9. CAMERA, ANIMATION AND THE STATE-DERIVED HUD ─────────────────────────────` |
| 2140 | `function present(dt) {` |
| 2308 | `function updateUI() {` |
| 2389 | `function resize() {` |
| 2407 | `function loop(now) {` |

界面 DOM：`src/shell.html`；完整像素布局和响应式断点：`src/style.css`。
