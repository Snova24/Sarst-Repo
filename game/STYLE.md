# Style bible — Robot Puzzle Shooter

Art owns this file and `game/assets/`. CoS already `drawImage`s the three PNGs. **No new mechanics. No `game/src`.**

Arena: dark floor `#141820`. Mint `#7DFFB3` is ON. Drone red `#D45B5B` is the threat. **OFF node is the loudest thing in wave 1** — gold/white bullseye + cyan hex, hotter than the reds.

## Must-have (PR #7)

| File | Is | Draw size | PNG |
| --- | --- | --- | --- |
| `assets/player.png` | Scrap robot (cream hull, mint visor) | 28×28 | 56×56 |
| `assets/drone.png` | Cheap red chaser | 22×22 | 44×44 |
| `assets/node.png` | **OFF NODE** targeting bullseye (not a boat, not a relic). Designed to win the 40×40 read against drones. | 40×40 | 80×80 |

Keep NODE / SHOOT / YOU labels in the greybox until Playtest says silhouettes are enough.

PNGs are RGB on `#141820`. Missing files must not crash.

## Optional later

Projectile, upgrade-card chrome. HUD stays HTML.

## Dead

TAKE art (PR #3). Do not merge that look. No second sprite PR.
