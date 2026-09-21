# Counterline · Dust Protocol
Original desktop-browser tactical FPS inspired by Counter-Strike. Three.js, meters/seconds, XZ floor/Y up. New project; no Valve assets or code and no template game inherited. Uses the allgame skill's architecture and acceptance workflow, not its racing/adventure code.

Loop: menu → 3-second deployment → clear three bots / approach bomb → hold E for 5 seconds inside 2.8 m → win; health zero or bomb timer expires → lose. First to five rounds. Kills alone do not win. Pause freezes all gameplay timers. Each round resets health, ammo, bots, bomb and effects. Buy between deployment and active play within the spawn zone; earned money funds weapons and armor.

Features to implement: mouse pointer lock, WASD, jump, crouch, walk, hitscan + recoil + headshots + cover, ADS, reload, three weapons, bot navigation/LOS/attacks, planted bomb, minimap, scoreboard, sound synthesis, settings, round/match restart.

Art: original procedural desert compound, arched gate, worn plaster/stone/paving, wood crates, blue-green doors, palms, cables, distant skyline, first-person detailed procedural rifle and animated enemy soldiers. All runtime assets local. Desktop keyboard + mouse; no touch gameplay, networking, Valve map recreation, real CS2 economy/subtick/physics, or claimed perfect bug-free compatibility.

Verification: pure simulation unit tests + actual Chromium input and screenshots; development-only deterministic fixture API; production smoke test with fixture absent. No autoplay posing as gameplay.
