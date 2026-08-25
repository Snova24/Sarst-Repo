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
| **Core** gameplay loop | Design | `game/GDD.md` | RUNNING on RPS (`cursor/rps-gdd-80bc`). Playing greybox. No GDD commit yet. Own/replace PR #6. Do not merge #2. |
| **Slice** visual assets | Art | `game/STYLE.md`, `game/assets/` | RUNNING. Shipped PR #7. Node reads as hex NODE (not a boat). Do not merge #3. |
| Playtest | Playtest findings | `game/PLAYTEST.md` | RUNNING. Written report is still `4be215e`. Retest of labeled/bump-safe/sprites (`60149a0`) in flight. |

## Core — do this

Own PR #6 (`game/GDD.md` only) or open a new PR off CoS. Lock numbers to `60149a0` (speed `40 + waveIndex * 18`, W1 bumpSafe 5.5s). Dual objective is AND. Do not merge PR #2. Do not edit `game/src`.

## Slice — do this

PR #7 is the art drop-in. Hold. Do not merge PR #3. Do not pile TAKE art.

## Playtest — do this

Do not file `4be215e` unlabeled squares as current. Retest CoS HEAD `60149a0` (NODE/SHOOT labels + bump-safe + sprites). `game/PLAYTEST.md` only.
