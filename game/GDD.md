# Robot Puzzle Shooter — slice spec

**Reset 2026-08-25.** Scrapforge, TAKE stealth, and the loot/extract greybox are dead. The game lives in **this repo** (`game/`). Reference: *Brotato* (wave survival + pick 1 of 3 upgrades) plus a robot that **shoots puzzles**, not only health bars.

**Greybox lock:** numbers below match the playable build in `game/src/game.js` (3/8/12, chase delay, first click focuses, dual-obj copy). Do not spec a different genre or loop.

## Fantasy

You are a scrap robot in an arena sim. Horde comes in waves. You shoot **nodes** to close each wave and shoot **drones** so they do not unmake you. Between waves you kit out like Brotato.

## Platform

- **Title:** Robot Puzzle Shooter
- **Repo:** `Snova24/Sarst-Repo` — `game/`
- **Engine:** HTML5 canvas + vanilla JS
- **Arena:** 960×540
- **Session:** 3 waves + 2 upgrade picks. Envelope ≤5 minutes.

## Verbs

| Input | Action |
| --- | --- |
| WASD / arrows | Move |
| Mouse | Aim |
| First click (page load) | Focus the canvas — **does not fire**. Status: `Click again or press SPACE to shoot` |
| Later click / Space | Shoot |
| Click a card | Take the upgrade (between waves) |
| R | Retry run |

## 5-minute loop

1. Wave N: drones spawn on the four edges. They **do not chase** until the aggro timer hits 0. Status: `WAVE N — kill RED drones AND shoot BLUE NODE ON`.
2. **Clear the wave:** all drones dead **and** all nodes ON (shot). Either objective alone does not end the wave. If the horde is dead and a node is still off, status is `WAVE N STUCK — drones down. SHOOT THE BLUE NODE ON`.
3. **Upgrade:** after waves 1 and 2 only. Pause (`PICK AN UPGRADE` / `WAVE CLEAR — pick one`). Pick 1 of 3 cards (Brotato). Stats stack. Pool refills each offer (the same card can show up again next pick).
4. Waves 1 → 2 → 3. Survive wave 3 = **SOLVED** (HUD wave reads `CLEAR`). No third pick.
5. HP hits 0 = **POWER DOWN**. R retries. Upgrades and kills reset.

Arena labels in the greybox: player `YOU`, drones `DRONE`, nodes `NODE` + `SHOOT` (off) / `ON` (shot). Nodes are 40×40.

## Baseline (run start / R)

| Stat | Value |
| --- | --- |
| HP / max HP | 5 / 5 |
| Move speed | 230 px/s |
| Damage | 1 |
| Fire interval | 280 ms |
| Pierce | 0 |
| Extra projectiles | 0 |
| Shot speed | 560 px/s |
| Contact damage | 1 HP |
| I-frames after hit | 0.7 s |

## Wave budget (slice)

Matches `WAVES` + spawn math in `game/src/game.js`.

| Wave | Drones | Nodes | Drone HP | Drone speed | Aggro delay | Role |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 3 | 1 | 1 | 55 | **1.8 s** | Teach: WASD during freeze, then kite + shoot the NW node ON |
| 2 | 8 | 1 | 1 | 71 | 0.45 s | Denser 1-HP pack, one upgrade in |
| 3 | 12 | 2 | 2 | 87 | 0.45 s | Spike: HP doubles, two nodes, two upgrades in |

- Drone HP: `1 + floor(waveIndex / 2)` → 1, 1, **2**
- Drone speed: `55 + waveIndex * 16` → 55, 71, **87**
- W1/W2 node: northwest. W3 nodes: northwest + northeast.
- Kills persist across waves (3 + 8 + 12 = **23** on a full clear).
- Wave 1 freeze is a learn window, not a free win: AFK still **POWER DOWN** after the 1.8 s (5 contact hits). Move during the freeze.
- Wave 3 is the only 2-HP wave. Without damage or pierce, each drone takes two shots (24 drone-hits + 2 nodes). The two Brotato picks exist to break that wall.
- Dual objective is AND: a live run that killed all 12 wave-3 drones at `nodes 0/2` stayed on WAVE 3 until both nodes went ON.

## Upgrade pool (Brotato-style)

Each pick: **3 random unique** cards from this pool of 6. Labels are the greybox card strings. Effects are `applyCard`.

| Card | Greybox text | Effect |
| --- | --- | --- |
| HOT BARREL | `+1 damage` | `dmg += 1` |
| COOLANT | `faster fire` | `fireMs = max(90, fireMs - 50)` |
| SERVOS | `+move speed` | `speed += 40` |
| PLATING | `+2 HP` | `maxHp += 2` and heal 2 (capped at max) |
| AP ROUNDS | `shots pierce +1` | `pierce += 1` |
| DUAL LINK | `+1 projectile` | `extra += 1` (spread 0.18 rad when 2+ shots) |

COOLANT floor is 90 ms. From 280 ms that is four picks to cap; this slice only offers **two** picks, so a double COOLANT run lands at 180 ms.

## Win / lose

- Win: `SOLVED` after wave 3 (`CLEAR` in the wave meter)
- Lose: `POWER DOWN` at HP 0
- HUD: `Wn · HP n · node ON x/y · n drones down`

## Non-goals (this slice)

- Scrapforge repo
- TAKE stealth (Sarst-Repo PR #2 / #3) — do not merge, do not respec
- Relics, guards, shadow, extract, loot-extract greybox
- Alpha Budget
- Meta progression across runs, characters, 50 weapons, online

## Owners

| Path | Owner |
| --- | --- |
| `game/src/`, `game/index.html` | Game Dev (**robot puzzle shooter** + anyone implementing) |
| `game/GDD.md` | Design (Core gameplay loop) — numbers locked to the greybox |
| `game/STYLE.md`, `game/assets/` | Art |
| `game/PLAYTEST.md` | Playtest |
