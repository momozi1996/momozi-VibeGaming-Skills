# CLOUDLINE / 云间慢行

## Scope
- Custom Three.js rail-driving game, authored for the requested single-file delivery. Not a reskin of the kart template.
- Reuse: allgame architecture/acceptance methods; local MIT Three.js r160 dependency only.
- New: continuous 3D CatmullRom coastline railway; two physical island stations; acceleration/braking/grade/curvature/wind comfort model; passenger exchange; tips/streak; separate workshop scene and upgrade animation; touch controls, audio, pause/reset.
- Visual layers: peach/blue twilight, thick low-poly cloudbanks, faceted floating rock islands, terracotta villages, warm windows/lighthouses, timber/brass/forest-green tram, restrained cream-and-teal HUD.
- Units: meters, seconds, m/s internally, km/h in HUD. Closed route uses arc-length sampling. Avatar is constrained to rails; arrow keys orbit camera, not derail train.
- Start: 12 passengers, stationary just departing Saltlight; first destination Mango. Hold W/S or touch pedals. Stations need a low-speed stop; excessive speed triggers an explicitly announced emergency stop and comfort/tip penalty, never a smooth-arrival reward.
- Doors E or on-screen button while docked. Timed visible exchange; reward once per actual stop, next station unlocked after doors close. Loop remains playable indefinitely.
- Workshop available only stopped at station, with an initial docked entry available. Two sequential parts, animated install, roof/rack/lantern/vine visual changes; no currency requirement for first refit.
- Non-goals: copied franchise assets, full rigid-body derailment, multiplayer, missions beyond passenger service.

## Delivery & tests
- `cloudline.html`: self-contained engine, CSS, readable game code; file:// and offline supported. Source split retained only for maintenance.
- Test real keyboard/touch input, both stations and loop, high-speed fail, reward idempotency, door lock, comfort, workshop, pause/blur, restart, corrupted local storage, mobile layout, page errors and screenshots.
- Browser emulation does not establish physical-device performance or subjective audio quality.
