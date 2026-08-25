# Standing order — 2026-08-25 (reset)

brandon: scrap work so far. **Start new in Sarst-Repo.** Game is a **Robot Puzzle Shooter simulator** with **Brotato-style upgrades**.

Ignore: scrapforge, Alpha Budget, TAKE (PRs #2/#3), loot-extract greybox.

## Mission

Playable in `game/`: 3 waves, shoot drones + nodes, pick 1 of 3 upgrades between waves, survive.

```bash
python3 -m http.server 8765
# http://localhost:8765/game/
```

CoS HEAD: W1 freeze 3.5s; bump-safe on chase; first click no longer wipes freeze copy.

## Team (this repo)

| Role | Agent | Owns | Status |
| --- | --- | --- | --- |
| CoS | Chief of staff | `vault/` + filling `game/src` until Game Dev appears | talking to staff |
| Game Dev | **robot puzzle shooter** | `game/src/`, `game/index.html` | not in this environment |
| **Core** gameplay loop | Design | `game/GDD.md` | IDLE. PR #8 relocked to live numbers. Hold. Do not merge #2. |
| **Slice** visual assets | Art | `game/STYLE.md`, `game/assets/` | Shipped louder OFF node PR #7. Hold. Do not merge #3. |
| Playtest | Playtest findings | `game/PLAYTEST.md` | `28b436d` in: freeze unused, first click wipes order. Retest HUD fix. |

## Core — do this

PR #8 greybox-now is locked to live numbers. Hold. Do not edit `game/src`. Do not merge PR #2. Do not stack another freeze.

## Slice — do this

Loud OFF node is on PR #7 and on CoS. Hold. Do not merge PR #3. No second sprite PR.

## Playtest — do this

`28b436d` P0/P1 received. Retest CoS HEAD after the first-click HUD fix. `game/PLAYTEST.md` only. Verdict: freeze order stays after focus click? Do they shoot NODE ON during freeze?
