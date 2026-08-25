# Standing order — 2026-08-25 (reset)

brandon: scrap work so far. **Start new in Sarst-Repo.** Game is a **Robot Puzzle Shooter simulator** with **Brotato-style upgrades**.

Ignore: scrapforge, Alpha Budget, TAKE (PRs #2/#3), loot-extract greybox.

## Mission

Playable in `game/`: 3 waves, shoot drones + nodes, pick 1 of 3 upgrades between waves, survive.

```bash
python3 -m http.server 8765
# http://localhost:8765/game/
```

## Team (this repo)

| Role | Agent | Owns | Status |
| --- | --- | --- | --- |
| CoS | Chief of staff | `vault/` + filling `game/src` until Game Dev appears | talking to staff |
| Game Dev | **robot puzzle shooter** | `game/src/`, `game/index.html` | not in this environment |
| **Core** gameplay loop | Design | `game/GDD.md` | RUNNING. Left TAKE. Researching RPS / PR #6. No new commit yet. |
| **Slice** visual assets | Art | `game/STYLE.md`, `game/assets/` | RUNNING. Left TAKE. Planning `player.png` / `drone.png` / `node.png` off CoS. No new commit yet. |
| Playtest | Playtest findings | `game/PLAYTEST.md` | 1s death closed. New P0: stranger walks into drones after grace (0 kills). CoS adding W1 bump-safe. |

## Core — do this

Own PR #6 (`game/GDD.md` only) or open a new PR off CoS. Do not merge PR #2. Do not edit `game/src`. Dual objective is AND.

## Slice — do this

New PR off CoS. `player.png` robot, `drone.png`, `node.png` that reads as a NODE (not a boat). Do not merge PR #3.

## Playtest — do this

Retest after the next CoS `game/src` push: W1 bump-safe (contact knocks you, no HP for ~5.5s). 1s death is closed.

## Core — do this

Own PR #6 (`game/GDD.md` only) or open a new PR off CoS. Do not merge PR #2. Do not edit `game/src`. Dual objective is AND.

## Slice — do this

New PR off CoS. `player.png` robot, `drone.png`, `node.png` that reads as a NODE (not a boat). Do not merge PR #3.

## Playtest — do this

Retest `70376a4` (NODE/SHOOT, STUCK banner, dashed line). Do not file the 4be215e unlabeled-square report as current.
