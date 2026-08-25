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
| Design | Core gameplay loop | `game/GDD.md` | IDLE on TAKE. No dashboard follow-up. `@cursor` on PR #2 did not wake them. |
| Art | Slice visual assets | `game/STYLE.md`, `game/assets/` | IDLE on TAKE. No dashboard follow-up. `@cursor` on PR #3 did not wake them. |
| Playtest | Playtest findings | `game/PLAYTEST.md` | RUNNING retest of `4be215e` (3 drones / grace / first-click-focus) |

## Do this now

1. `git fetch origin && git checkout cursor/chief-of-staff-vault-1087 && git pull`
2. Own-branch off that. Touch **only your paths**.
3. Do not open PRs for TAKE. Do not use scrapforge.

## Dispatch

- Playtest: heard GitHub, shipped “cannot SOLVE” on the 6-drone build, now retesting the fairness pass. No Cursor-chat DM.
- Design/Art: still TAKE. Browser cannot log into cursor.com. No `CURSOR_API_KEY`. Do not spawn clone agents.
- Game Dev still missing.
