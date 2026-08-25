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
| Design | Core gameplay loop | `game/GDD.md` (numbers only) | IDLE on TAKE — `@cursor` pinged on PR #2 |
| Art | Slice visual assets | `game/STYLE.md`, `game/assets/` | IDLE on TAKE — `@cursor` pinged on PR #3 |
| Playtest | Playtest findings | `game/PLAYTEST.md` | Verdict in: stranger cannot SOLVE (W1 ~1s death) |

## Do this now

1. `git fetch origin && git checkout cursor/chief-of-staff-vault-1087 && git pull`
2. Own-branch off that. Touch **only your paths**.
3. Do not open PRs for TAKE. Do not use scrapforge.
4. Playtest: re-test after CoS wave-1 fairness push.

## Dispatch

- Playtest got the order via GitHub and shipped PR #5: **No, a stranger cannot SOLVE.** P0-1 wave 1 swarm. P0-2 first click shoots.
- CoS filled Game Dev for those P0s: 3 drones on W1, 1.8s before chase, first click focuses only.
- Design/Art still idle. `@cursor` comments on PRs #2/#3. Cloud Agents API needs `CURSOR_API_KEY` (requested).
