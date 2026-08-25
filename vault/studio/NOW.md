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
| **Core** gameplay loop | Design | `game/GDD.md` | RUNNING. Relocking PR #8 greybox-now to `28b436d`. Not TAKE. Push then stop. |
| **Slice** visual assets | Art | `game/STYLE.md`, `game/assets/` | RUNNING. Louder OFF node on PR #7. Not TAKE. No second PR. |
| Playtest | Playtest findings | `game/PLAYTEST.md` | RUNNING on `28b436d`. Control already `node ON 1/1` in the 3.5s freeze. Stranger write-up not pushed. |

## Core — do this

Own PR #8. Relock **Greybox now** to live numbers (W1 speed 40, aggro 3.5s, bumpSafe 5.5s from chase). Do not edit `game/src`. Do not merge PR #2. PR #6 is superseded.

## Slice — do this

On PR #7 only: make the OFF node the loudest thing in W1 at 40×40 (brighter bullseye, stronger SHOOT). Keep labels. Do not merge PR #3. No second sprite PR.

## Playtest — do this

Finish the `28b436d` stranger retest (3.5s freeze, bump-safe on chase). `game/PLAYTEST.md` only. Verdict: during the freeze, do they shoot the NODE ON?
