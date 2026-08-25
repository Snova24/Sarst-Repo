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

| Role | Agent | Owns |
| --- | --- | --- |
| CoS | Chief of staff | `vault/` |
| Game Dev | **robot puzzle shooter** (and implementers on this repo) | `game/src/`, `game/index.html` |
| Design | Core gameplay loop | `game/GDD.md` (numbers only) |
| Art | Slice visual assets | `game/STYLE.md`, `game/assets/` |
| Playtest | Playtest findings | `game/PLAYTEST.md` |

## Do this now

1. `git fetch origin && git checkout cursor/chief-of-staff-vault-1087 && git pull`
2. Own-branch off that. Touch **only your paths**.
3. Do not open PRs for TAKE. Do not use scrapforge.
4. Make the Brotato slice feel better, look better, or get a stranger through 3 waves.

## Merge order

playable feel → GDD numbers → art drop-ins → playtest
