# Delivery status — 2026-09-21

## Project
- Standalone original Three.js tactical FPS, new implementation.
- Location: `cs2-three/`; no existing projects overwritten.
- Dev server: http://127.0.0.1:4399
- Production preview: http://127.0.0.1:4400
- Current loop: deploy → retake/defuse or death/detonation → round result → next round → first-to-five match result → replay/menu.

## Completed implementation
- Shared map/collision/occlusion/navigation data, original textured compound, arched entry, cover and planted device.
- Pointer-lock keyboard/mouse FPS controls, automatic rifle, semi-automatic pistol, scoped bolt-action sniper, spread/recoil, headshots and body hits, occluded hitscan, ammo/reload conservation.
- Three bots, pathfinding, LOS, strafe, damage, difficulty; original articulated models.
- 65-second bomb objective, interruptible five-second defuse, 3-second deployment, 4-second intermission, first-to-five match.
- Spawn-only armory, economy, armor, HUD, minimap, scoreboard, feed, pause, settings persistence, restart.
- Weapon animation, procedural textures, shadows, tracers, impact effects, blast/smoke and synthesized event audio.

## Actual verification performed
- `npm test`: **28/28 passing**, latest transcript in `artifacts/unit-tests.txt`.
- `node tests/browser.mjs`: **23/23 passing** in current Chrome/ANGLE Metal, 1440×900, DPR 1. Real input tests plus explicit DEV-only deterministic fixtures. Report: `artifacts/browser-report.json`.
- `npm run build`: passed. Vite reports a >500 kB JS chunk warning (565.28 kB raw, 150.20 kB gzip); not suppressed or misrepresented as a build error.
- `node tests/production.mjs`: **10/10 passing**, including absent debug API, shooting/reloading, real movement, pause, settings persistence/corruption and 720p/1080p layout. Report: `artifacts/production-report.json`.
- Additional production fault injection: WebGL disabled → actionable supported-browser error appears, verified and screenshotted (`artifacts/fallback-report.json`). Expected renderer console errors in this fault-injection test are not normal-play failures.
- No browser console errors or failed HTTP responses in the normal development or production test runs.
- Recent measured requestAnimationFrame FPS in development browser suite: approximately 60 on this environment. This is not a guarantee on other hardware or a long-duration benchmark.
- Visually inspected actual menu, courtyard combat, defuse, match result, and 720p/production screenshots. Screenshot files in `artifacts/`.

## Issues found and fixed during iteration
- Normalized indexed/non-indexed geometry and UV attributes before merging static meshes; fixed startup crash.
- Improved pointer-lock test synchronization to wait for acquisition event completion.
- Enforced one press per shot for pistol/sniper; rifle alone supports held full-auto fire.
- Moved viewmodels away from camera clipping, added beveled/texture detail, corrected menu brand contrast.
- Added shared-data ray occlusion regression and production debug-boundary checks.

## Verification limitations / deliberate scope
- No networking, Valve content, touch controls, exact CS2 ballistics/economy/subtick simulation, grenade system or physical destruction.
- Bot routes and collision use axis-aligned obstacle data; decorative architecture is not a rigid-body simulation.
- End-state browser scenarios use documented actor-placement/time/score fixtures, not a claim of several full unaided human matches.
- Current desktop Chrome was tested; Safari/Firefox, real phones, prolonged soak testing and subjective audio listening were not performed.
- Initial and final art is generated in source; no third-party art downloaded. Full source and Three.js notices included.
