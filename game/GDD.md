# Robot Puzzle Shooter — slice spec

**Reset 2026-08-25.** Scrapforge, TAKE stealth, and the loot/extract greybox are dead. The game lives in **this repo** (`game/`). Reference: *Brotato* (wave survival + pick 1 of 3 upgrades) plus a robot that **shoots puzzles**, not only health bars.

## Fantasy

You are a scrap robot in an arena sim. Horde comes in waves. You shoot **nodes** to close each wave and shoot **drones** so they do not unmake you. Between waves you kit out like Brotato.

## Platform

- **Title:** Robot Puzzle Shooter
- **Repo:** `Snova24/Sarst-Repo` — `game/`
- **Engine:** HTML5 canvas + vanilla JS
- **Session:** ~5 minutes (3 waves + 2 upgrade picks)

## Verbs

| Input | Action |
| --- | --- |
| WASD / arrows | Move |
| Mouse | Aim |
| Click / Space | Shoot |
| Click a card | Take the upgrade (between waves) |
| R | Retry run |

## 5-minute loop

1. Wave N: drones chase. One or more **nodes** sit in the arena.
2. **Clear the wave:** all drones dead **and** all nodes ON (shot).
3. **Upgrade:** pause. Pick 1 of 3 cards (Brotato). Stats stack.
4. Waves 1 → 2 → 3. Survive wave 3 = **SOLVED**.
5. HP hits 0 = **POWER DOWN**. R retries. Upgrades reset.

## Wave budget (slice)

| Wave | Drones | Nodes | Notes |
| --- | --- | --- | --- |
| 1 | 3 | 1 | ~1.8s before drones chase (stranger learn window) |
| 2 | 8 | 1 | |
| 3 | 12 | 2 | |

Playtest 2026-08-25: 6 drones from all edges + click-to-focus-shoots = POWER DOWN in ~1s. Wave 1 must be survivable standing still for a beat.

## Upgrade pool (Brotato-style)

Each pick: 3 random unique cards.

| Card | Effect |
| --- | --- |
| HOT BARREL | +1 damage |
| COOLANT | Faster fire |
| SERVOS | +move speed |
| PLATING | +2 max HP and heal 2 |
| AP ROUNDS | Shots pierce +1 enemy |
| DUAL LINK | +1 projectile (spread) |

## Win / lose

- Win: `SOLVED` after wave 3
- Lose: `POWER DOWN`
- HUD: wave, HP, nodes, kills

## Non-goals (this slice)

- Scrapforge repo
- TAKE stealth (Sarst-Repo PR #2 / #3)
- Alpha Budget
- Meta progression across runs, characters, 50 weapons, online

## Owners

| Path | Owner |
| --- | --- |
| `game/src/`, `game/index.html` | Game Dev (**robot puzzle shooter** + anyone implementing) |
| `game/GDD.md` | Design (Core gameplay loop) — numbers only after this lock |
| `game/STYLE.md`, `game/assets/` | Art |
| `game/PLAYTEST.md` | Playtest |
