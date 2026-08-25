# Style bible — Robot Puzzle Shooter

Art owns this file and `game/assets/`. **No new mechanics.** No TAKE board.

Arena: dark floor `#141820`, mint `#7DFFB3`, drone red `#D45B5B`, node-off blue `#4D8DFF`. Brotato-readable top-down. One robot, cheap drones, glowing nodes.

## Must-have drop-ins

| File | Is | Draw size | PNG |
| --- | --- | --- | --- |
| `assets/player.png` | Scrap robot — cream hull, mint visor, treads fused to the body | 28×28 | 56×56 RGB |
| `assets/drone.png` | Cheap red chaser — fat body, yellow eye, short rotors. Must still read as a hunk at 22px, not a plus. | 22×22 | 44×44 RGB |
| `assets/node.png` | Puzzle **NODE** to shoot ON — hexagonal pylon + blue bullseye. Not a boat. Not a relic. | 40×40 | 80×80 RGB |

PNGs are opaque RGB on `#141820` so they sit on the arena floor. `game.js` already `drawImage`s these three; if a file is missing, `onerror` keeps the greybox rect. Do not throw.

## Optional later

Projectile, upgrade-card chrome. HUD stays HTML.

## Dead

Do not ship relic / guard / shadow / door / cone slots. Do not merge https://github.com/Snova24/Sarst-Repo/pull/3.
