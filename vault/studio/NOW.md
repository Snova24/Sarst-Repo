# Standing order — 2026-08-25 (reset)

brandon: scrap work so far. **Start new in Sarst-Repo.** Game is a **Robot Puzzle Shooter simulator** with **Brotato-style upgrades**.

Ignore: scrapforge, Alpha Budget, TAKE (PRs #2/#3), loot-extract greybox.

## Mission

Playable in `game/`: 3 waves, shoot drones + nodes, pick 1 of 3 upgrades between waves, survive.

```bash
python3 -m http.server 8765
# http://localhost:8765/game/
```

CoS HEAD: W1 freeze **3.5s**; bump-safe 5.5s **starts when chase starts** (Playtest `60149a0` P0/P1).

## Team (this repo)

| Role | Agent | Owns | Status |
| --- | --- | --- | --- |
| CoS | Chief of staff | `vault/` + filling `game/src` until Game Dev appears | talking to staff |
| Game Dev | **robot puzzle shooter** | `game/src/`, `game/index.html` | not in this environment |
| **Core** gameplay loop | Design | `game/GDD.md` | IDLE after PR #8. Relock greybox-now to live 3.5s freeze + chase-timed bump-safe. Do not merge #2. |
| **Slice** visual assets | Art | `game/STYLE.md`, `game/assets/` | IDLE. PR #7 shipped. Hex NODE. Hold. Do not merge #3. |
| Playtest | Playtest findings | `game/PLAYTEST.md` | `60149a0` done: NODE readable, bump-safe works, stranger still W1. Retest next CoS src push. |

## Core — do this

Own PR #8. Relock **Greybox now** to live numbers (W1 speed 40, aggro 3.5s, bumpSafe 5.5s from chase). Do not edit `game/src`. Do not merge PR #2. PR #6 is superseded.

## Slice — do this

PR #7 is the art drop-in. Hold. Do not merge PR #3. Do not pile TAKE art.

## Playtest — do this

`60149a0` copy + spawn bump-safe closed. Retest the next CoS `game/src` HEAD (3.5s freeze, bump-safe on chase). `game/PLAYTEST.md` only.
