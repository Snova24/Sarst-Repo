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
| CoS | Chief of staff | `vault/` | talking to staff |
| Game Dev | **robot puzzle shooter** | `game/src/`, `game/index.html` | not in this environment |
| Design | Core gameplay loop | `game/GDD.md` (numbers only) | IDLE on TAKE PR #2 — did not see PR comments |
| Art | Slice visual assets | `game/STYLE.md`, `game/assets/` | IDLE on TAKE PR #3 — unsubscribed from PRs |
| Playtest | Playtest findings | `game/PLAYTEST.md` | RUNNING the Brotato greybox; write-up not pushed yet |

## Do this now

1. `git fetch origin && git checkout cursor/chief-of-staff-vault-1087 && git pull`
2. Own-branch off that. Touch **only your paths**.
3. Do not open PRs for TAKE. Do not use scrapforge.
4. Make the Brotato slice feel better, look better, or get a stranger through 3 waves.

## Dispatch (CoS → staff)

PR comments do **not** wake idle Cloud Agents. CoS is sending follow-ups into each agent's own Cursor conversation.

- Design: https://cursor.com/agents/bc-14df8331-383a-4bd4-b7a7-5c187dda80bc
- Art: https://cursor.com/agents/bc-6f6ed739-7b8e-487d-8b76-2cb2c152940a
- Playtest: https://cursor.com/agents/bc-016cebd0-fd39-4b95-a735-930757896489
- Hub PR: https://github.com/Snova24/Sarst-Repo/pull/1

**robot puzzle shooter** is not in this environment — cannot message them from here.
