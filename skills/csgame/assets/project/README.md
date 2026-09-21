# COUNTERLINE — Dust Protocol

A playable **Three.js tactical FPS inspired by Counter-Strike**, with an original desert compound, procedural models, and local AI opponents. This is **not Valve's CS2**, an official product, or an online multiplayer client.

## Play

```sh
npm ci
npm run dev
```

Open the URL printed by Vite (default `http://127.0.0.1:4399`). Use a desktop browser with WebGL2 and a keyboard/mouse. Click **Deploy to Site** to capture the mouse. Escape releases the mouse and pauses the game.

For a static production build:

```sh
npm run build
npm run preview
```

Alternatively serve `dist/` with any static HTTP server. Do not open `index.html` with `file://`.

## The operation

Retake **Al Safra Compound** from three defenders. A bomb is already planted at **site A**. Each round gives you **65 seconds** after a three-second deployment countdown.

- Clear enemies with accurate fire; headshots deal triple damage.
- Approach the device at A and **hold E for five uninterrupted seconds**.
- Moving, jumping, firing, or releasing E interrupts the defuse. Killing all enemies **does not** automatically win the round.
- Death or bomb detonation gives the opponent a point. First to **five rounds** wins the match.
- Press **B** within six meters of the insertion point to purchase a rifle, scoped sniper, or armor. The local armory pauses gameplay. All gameplay also pauses while settings or the pause menu are open.
- Each new round restores health, 50 armor, ammunition, and enemies. Purchased primary weapon choice persists within the match; additional purchased armor does not carry over.

## Controls

| Action | Input |
|---|---|
| Move | W / A / S / D |
| Look | Mouse |
| Fire | Left mouse; hold for rifle automatic fire |
| Aim / scope | Hold right mouse |
| Reload | R |
| Primary / sidearm | 1 / 2 or mouse wheel |
| Crouch | C or left Ctrl |
| Quiet walk | Shift |
| Jump | Space |
| Defuse | Hold E near bomb |
| Armory | B near spawn |
| Scoreboard | Hold Tab |
| Pause / release mouse | Escape |

The sidearm and bolt-action sniper require a new mouse press for each shot. Mouse sensitivity, sound volume, and bot difficulty are saved locally; match progress is not persisted. Storage failures are non-fatal.

## Implemented

- First-person camera, pointer lock, collision, jumping, crouching and walking.
- Occluded hitscan weapons, spread, recoil, reload conservation, body/head hit regions and hit feedback.
- Three weapon models, animated viewmodels, muzzle flashes, tracers and impact sparks.
- Three bots with collision-derived A* navigation, line-of-sight checks, strafing and difficulty-dependent fire.
- Objective, defuse interruption, round/match results, clean restart, economy and armory.
- Procedural textured architecture, archway, crates, palms, utility details, shadows and original soldier models.
- Live minimap, enemy contacts only while visible, health/armor/ammo, kill feed and scoreboard.
- Locally synthesized weapon, movement and objective audio. No external runtime fonts, textures, models or audio requests.

## Verification

```sh
npm test             # pure simulation / navigation regression suite
npm run test:browser # running dev server required on port 4399
```

The browser test uses Playwright and local Chrome on macOS. Set `CHROME_PATH` to a Chrome/Chromium executable on other systems. `TEST_URL` overrides the test URL. It intentionally uses a **development-only fixture API** for actor placement and accelerated end-state scenarios; movement, firing, reloading, defusing, purchasing, pausing and replay are exercised through real browser input. That API is omitted from production builds.

See `artifacts/browser-report.json`, `artifacts/production-report.json`, screenshots, and `PROGRESS.md` for the actual checks performed. The tests are not a guarantee of zero bugs or universal GPU/browser compatibility.

## Architecture

- `src/map.js` — shared map bounds/obstacles, collision, visibility and A*.
- `src/simulation.js` — authoritative state, weapons, objective, economy, bots and events.
- `src/world.js` — procedural textures and batched static geometry.
- `src/models.js` — procedural weapons, hands and articulated soldiers.
- `src/audio.js` — Web Audio synthesis.
- `src/main.js` — input, render loop, raycasts, UI, settings and development fixtures.
- `src/style.css` / `index.html` — interface.

## Scope and known limitations

Single-player desktop prototype: no networking, matchmaking, Valve assets/maps, grenades, dropped weapons, penetration, destructible scenery, exact CS2 recoil/economy/subtick behavior, advanced animation rigs, or touch controls. Bots are intentionally simple. Geometry collision is primarily axis-aligned; decorative objects are not individually physical. Rendering quality and frame rate depend on the GPU. Audio synthesis is implemented but not subjectively auditioned in automated tests.

All original art is procedurally generated in source. See `LICENSE` and `THIRD_PARTY.md`.
