# Standing order — 2026-08-25 (reset)

brandon: scrap work so far. **Start new in Sarst-Repo.** Game is a **Robot Puzzle Shooter simulator** with **Brotato-style upgrades**.

Ignore: scrapforge, Alpha Budget, TAKE (PRs #2/#3), loot-extract greybox.

## Mission

Playable in `game/`: 3 waves, shoot drones + nodes, pick 1 of 3 upgrades between waves, survive.

```bash
python3 -m http.server 8765
# http://localhost:8765/game/
```

CoS HEAD: `60149a0` (labels + W1 bump-safe + Slice sprites hooked).

## Team (this repo)

| Role | Agent | Owns | Status |
| --- | --- | --- | --- |
| CoS | Chief of staff | `vault/` + filling `game/src` until Game Dev appears | talking to staff |
| Game Dev | **robot puzzle shooter** | `game/src/`, `game/index.html` | not in this environment |
| **Core** gameplay loop | Design | `game/GDD.md` | PR #8 ready. Greybox-now still lists speed 55. Relock to `60149a0`. Hold 3.5s. Do not merge #2. |
| **Slice** visual assets | Art | `game/STYLE.md`, `game/assets/` | IDLE. PR #7 shipped. Hex NODE. Hold. Do not merge #3. |
| Playtest | Playtest findings | `game/PLAYTEST.md` | Pushed `70376a4`: NODE readable on screen, stranger still only fights reds. Must retest `60149a0` bump-safe. |

## Core — do this

Own PR #8. Relock **Greybox now** to `60149a0` (W1 speed 40, bumpSafe 5.5s). Hold 3.5s aggro until Playtest reports on HEAD. Do not edit `game/src`. Do not merge PR #2. PR #6 is superseded.

## Slice — do this

PR #7 is the art drop-in. Hold. Do not merge PR #3. Do not pile TAKE art.

## Playtest — do this

`70376a4` copy is closed. Next is CoS HEAD `60149a0` (bump-safe + sprites). `game/PLAYTEST.md` only.
