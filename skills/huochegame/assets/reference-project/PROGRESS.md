# Delivery status — CLOUDLINE

## Implemented

- Custom rail-driving implementation, one Three.js engine / render loop / state source.
- Offline HTML embeds Three.js r160, readable game source, CSS, generated textures and procedural audio. No requests or fonts loaded from the network.
- A 725.02 m, closed, 3D CatmullRom loop, arc-length sampled; elevation changes, sea crossing, trestles, sleepers, guard rails and overhead wires.
- Saltlight Terminus and Mango Tide stations, physical islands, terracotta houses, warm windows, trees, lighthouses, docks, lamps, pennants, residents and distant rail-ring islands.
- Twilight-to-night sky, stars, ocean ripples, thick faceted cloudbanks and birds.
- Forest-green and brass tram with wood floor, arched glass, a driver and up to 16 visible passengers; animated wheels, subtle body roll, inertia, grade, wind, suspension motion and track-clack audio.
- Genuine W/S and pointer/touch driving; three camera views, arrow / drag orbit, pause, blur/cancel release, sound and restart controls.
- Comfort, money, streak, route progress and passenger HUD derived from real state. Gentle stop bonus starts at +75; emergency stop, rough driving, and once-only rewards covered.
- Door opening/closing and passenger boarding state machine. Next leg only after completed boarding; full round-trip works.
- Separate isometric Cloudworks scene, two sequential workshop operations, real changing tram geometry, visible workshop exit. Full upgrade and money persist; invalid/unavailable storage safely falls back.

## Verification

**Final status: complete. All 24 / 24 main and edge checks passed on the final single-file build.**

See `tests/report.json` and `tests/edge-report.json` for the final machine-readable results and exact browser version. `screenshots/` contains desktop, mobile, boarding, workshop and production-file evidence.

- Main game suite: 17 checks covering real keyboard input, coast/brake, camera, illegal door action, pause, both full route legs, smooth +75 / streak, repeated reward refusal, rough/emergency arrival, restart, full workshop, persistence, blur, invalid save, mobile pointer input and runtime errors.
- Edge suite: actual CDP touch hold/release/cancel and multi-touch, responsive viewport changes, no station payout from workshop visit, denied storage, offline production file without a debug hook, short real rAF timing sample, runtime errors.
- Route-completion tests explicitly use a time-compressed 60 Hz control fixture. They advance the complete physics path, not a teleport; a separate station edge test deliberately sets up a near-station fixture.
- Production tested via file:// with the browser context offline. No external asset requests.
- Visually inspected desktop departure, driving, Mango docking, boarding, completed workshop and 390×844 mobile scenes. Corrected lost vertex colors in static geometry batching; final rock faces retain their intended shaded slate colors.
- Fixed a genuine phone-rotation issue: renderer.setSize no longer writes a stale inline canvas width, and render dimensions use the document viewport. Responsive tests wait for viewport propagation before measuring overflow; no assertion removed.

## Known boundaries

- Cozy lightweight rail simulation, not rigid-body derailment or a traffic network. Arrow keys rotate the camera rather than steer off rails.
- Both named route legs share one continuous loop. Distant orbital tracks are scenery, not additional selectable levels.
- The first workshop upgrade is free; no economy shop or additional paid upgrades.
- localStorage saves money and completed refit only, not a mid-route position.
- Real physical phones, Safari/Firefox compatibility, long-session memory soak and subjective audio listening were not exhaustively tested. Touch is Chrome emulation. Short local headless FPS is not a universal performance guarantee.
- Allgame used as an architectural/acceptance method. No kart template gameplay or franchise assets copied.

## Maintain

Edit `src/game.js`, `src/style.css`, `src/shell.html`, then `node build.mjs`.
Only `cloudline.html` is needed to play or distribute. Do not replace the existing workspace root index or other projects.
