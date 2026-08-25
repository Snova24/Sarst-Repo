# Standing order — 2026-08-25 (reset)

brandon: scrap work so far. **Start new in Sarst-Repo.** Game is a **Robot Puzzle Shooter simulator** with **Brotato-style upgrades**.

Ignore: scrapforge, Alpha Budget, TAKE (PRs #2/#3), loot-extract greybox.

## Mission

Playable in `game/`: 3 waves, shoot drones + nodes, pick 1 of 3 upgrades between waves, survive.

```bash
python3 -m http.server 8765
# http://localhost:8765/game/
```

CoS HEAD: W1 **node gate** (Playtest closed: they shoot NODE ON). Then 3-drone horde + 20s bump-safe. Next unknown: SOLVED.

## Team (this repo)

| Role | Agent | Owns | Status |
| --- | --- | --- | --- |
| CoS | Chief of staff | `vault/` + filling `game/src` until Game Dev appears | talking to staff |
| Game Dev | **robot puzzle shooter** | `game/src/`, `game/index.html` | not in this environment |
| **Core** gameplay loop | Design | `game/GDD.md` | IDLE. Relock Greybox now to node gate. Do not merge #2. |
| **Slice** visual assets | Art | `game/STYLE.md`, `game/assets/` | Hold on louder node PR #7. Do not merge #3. |
| Playtest | Playtest findings | `game/PLAYTEST.md` | Gate closed on `4eaa11c`. Continue stranger through SOLVED. |

## Core — do this

Playtest confirmed the node gate. Relock **Greybox now** on PR #8: W1 drones spawn after NODE ON. 20s bump-safe from horde spawn. Do not edit `src`. Do not merge #2. Do not restack freeze.

## Slice — do this

Hold. Loud OFF node is already on CoS. Do not merge PR #3. No second sprite PR.

## Playtest — do this

Gate received: they shoot NODE ON when nothing red is on screen. Do not re-file the gate. Continue stranger on current CoS through W1 horde, upgrades, W2–W3. Verdict: can a stranger SOLVE today?
