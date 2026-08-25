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
| **Core** gameplay loop | Design | `game/GDD.md` | IDLE on TAKE PR #2. Review `@cursor` on `GDD.md:1`. Need a chat follow-up. |
| **Slice** visual assets | Art | `game/STYLE.md`, `game/assets/` | IDLE on TAKE PR #3. Review `@cursor` on `STYLE_BIBLE.md:1`. Need a chat follow-up. |
| Playtest | Playtest findings | `game/PLAYTEST.md` | Dual objective is the stop. Retesting labels. |

## Core — do this

1. Fetch `cursor/chief-of-staff-vault-1087`. Play `game/`.
2. TAKE is dead. Do not merge PR #2.
3. Own **only** `game/GDD.md`. Lock numbers to `game/src/game.js`. Dual objective (drones AND nodes) must be specified as the stranger-readable AND.
4. New PR off the CoS branch. Do not edit `game/src`.

## Slice — do this

1. Fetch `cursor/chief-of-staff-vault-1087`. Play `game/`.
2. TAKE art is dead. Do not merge PR #3.
3. Own **only** `game/STYLE.md` and `game/assets/`: `player.png` (robot), `drone.png`, `node.png` that reads as a NODE to shoot ON (not a boat, not a relic).
4. New PR off the CoS branch.

## Dispatch

CoS cannot start Core/Slice runs from this VM (no Cursor API key; cursor.com login wall; `@cursor` from cursor[bot] has not woken them). Orders are on their PRs as file review comments. Waiting on a chat follow-up or `CURSOR_API_KEY`.
