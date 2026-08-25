# Standing order — 2026-08-25 (reset)

brandon: scrap work so far. **Start new in Sarst-Repo.** Game is a **Robot Puzzle Shooter simulator** with **Brotato-style upgrades**.

Ignore: scrapforge, Alpha Budget, TAKE (PRs #2/#3), loot-extract greybox.

## Mission

Playable in `game/`: 3 waves, shoot drones + nodes, pick 1 of 3 upgrades between waves, survive.

```bash
python3 -m http.server 8765
# http://localhost:8765/game/
```

CoS HEAD: W1 **node gate** — no drones until NODE ON, then 3-drone horde. Do not restack freeze.

## Team (this repo)

| Role | Agent | Owns | Status |
| --- | --- | --- | --- |
| CoS | Chief of staff | `vault/` + filling `game/src` until Game Dev appears | talking to staff |
| Game Dev | **robot puzzle shooter** | `game/src/`, `game/index.html` | not in this environment |
| **Core** gameplay loop | Design | `game/GDD.md` | IDLE. Relock Greybox now to W1 node gate. Do not merge #2. |
| **Slice** visual assets | Art | `game/STYLE.md`, `game/assets/` | Hold on louder node PR #7. Do not merge #3. |
| Playtest | Playtest findings | `game/PLAYTEST.md` | `79ff71e` in: HUD closed, still skip NODE. Retest node gate. |

## Core — do this

Playtest `43f8e61`: freeze copy stays; stranger still skips NODE. Relock **Greybox now** on PR #8: W1 drones spawn **after** the node is ON (not another freeze). Do not edit `src`. Do not merge #2.

## Slice — do this

Hold. Loud OFF node is already on CoS. Do not merge PR #3. No second sprite PR.

## Playtest — do this

`79ff71e` P0 received (HUD closed, still skip NODE). Retest CoS HEAD after the W1 node gate. `game/PLAYTEST.md` only. Verdict: with no reds on screen, do they shoot the NODE ON?
