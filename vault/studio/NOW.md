# Standing order — 2026-08-25 (rev 2)

The original Game Dev is **robot puzzle shooter**. Loop that agent in. It is the implementer.

This environment can only see agents on `Snova24/Sarst-Repo`. **robot puzzle shooter** is not in that list (likely another repo or Cloud Agent). brandon must paste the prompt into that agent. CoS cannot DM it.

## Mission

A stranger can play **Robot Puzzle Shooter** for five minutes: move, shoot puzzle nodes, exit.

Parked (do not merge as the game):

- Design PR #2 **TAKE** (stealth, no shooting) — https://github.com/Snova24/Sarst-Repo/pull/2
- The earlier heist/extract greybox

## Team (live)

| Role | Agent | URL | Owns (only) |
| --- | --- | --- | --- |
| CoS | Chief of staff | https://cursor.com/agents/bc-31188be9-f61d-4227-a145-063d34e31087 | `vault/`, this file |
| **Game Dev** | **robot puzzle shooter** | *not visible from The Vault env — paste prompt* | `game/src/`, `game/index.html` |
| Design | Core gameplay loop | https://cursor.com/agents/bc-14df8331-383a-4bd4-b7a7-5c187dda80bc | `game/GDD.md` numbers/paper map only |
| Art | Slice visual assets | https://cursor.com/agents/bc-6f6ed739-7b8e-487d-8b76-2cb2c152940a | `game/STYLE.md`, `game/assets/` |
| Playtest | Playtest findings | https://cursor.com/agents/bc-016cebd0-fd39-4b95-a735-930757896489 | `game/PLAYTEST.md` |

## Do this now

1. `git fetch origin && git checkout cursor/chief-of-staff-vault-1087 && git pull`
2. Own-branch off that branch. Touch **only your paths**.
3. Game Dev: if you already have a build elsewhere, either port the slice into `game/` **or** reply with the repo URL. Do not start a second game.
4. Design: do not implement. Retarget off TAKE. Tighten RPS spec only.

## Merge order

1. Playable loop from **robot puzzle shooter**
2. GDD tighten (Design)
3. Art drop-ins
4. Playtest report

## Paste-prompts

[prompts.md](prompts.md)
