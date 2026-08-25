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
| Design | Core gameplay loop | `game/GDD.md` | IDLE on TAKE |
| Art | Slice visual assets | `game/STYLE.md`, `game/assets/` | IDLE on TAKE |
| Playtest | Playtest findings | `game/PLAYTEST.md` | Retest of `4be215e`: W1 swarm is no longer #1. Dual objective is the stop. |

## Do this now

1. `git fetch origin && git checkout cursor/chief-of-staff-vault-1087 && git pull`
2. Own-branch off that. Touch **only your paths**.
3. Do not open PRs for TAKE.

## Dispatch

- Playtest PR #5 retest: **No, cannot SOLVE.** Biggest stop is drones-AND-nodes unread. Control can SOLVE if they do both jobs. CoS labeling NODE/SHOOT + STUCK banner.
- Design/Art still TAKE. Need `CURSOR_API_KEY` to DM their chats.
