# Style bible — Robot Puzzle Shooter

Art owns this file and `game/assets/`. Greybox shapes stay until Game Dev hooks the PNGs. **No new mechanics.**

Arena: dark floor `#141820`, mint `#7DFFB3`, drone red `#D45B5B`, node-off blue `#4D8DFF`. Brotato-readable top-down. One robot, cheap drones, glowing nodes.

## Must-have (this PR)

| File | Is | Draw size in `game.js` | PNG |
| --- | --- | --- | --- |
| `assets/player.png` | Scrap robot (cream hull, mint visor, treads) | 28×28 | 56×56 |
| `assets/drone.png` | Cheap red chaser (yellow eye) | 22×22 | 44×44 |
| `assets/node.png` | Puzzle **NODE** to shoot ON — hexagonal pylon + bullseye. Not a boat. Not a relic. | 40×40 | 80×80 |

PNGs are RGB on `#141820`. Missing files must not crash — greybox rects remain valid.

## Optional later

Projectile, upgrade-card chrome. HUD stays HTML.

## Hook (Game Dev, not this PR)

`drawImage` the three files over the current `fill()` / `drawNode()` rects. Keep the NODE / SHOOT / YOU labels until Playtest says silhouettes are enough. Do not change waves, upgrades, or verbs.

## Dead

TAKE art (PR #3): relic, guard, shadow, door, cone. Do not merge that look into this arena.
