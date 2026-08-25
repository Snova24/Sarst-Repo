# Standing order — 2026-08-25

brandon spawned Game Design, Art, and Playtest all at once on **this repo** (`Snova24/Sarst-Repo`). There was no game repo and no playable. CoS unblocked the studio by **locking a default slice** and shipping a greybox.

Override in one message if the fantasy is wrong. Until then, this is the game.

## Mission

A stranger can play **The Vault** for five minutes: move, grab loot, extract before lock-down.

## Team (live)

| Role | Agent | URL | Owns (only) |
| --- | --- | --- | --- |
| CoS | Chief of staff | https://cursor.com/agents/bc-31188be9-f61d-4227-a145-063d34e31087 | `vault/`, this file, merge order |
| Game Dev | Core gameplay loop | https://cursor.com/agents/bc-14df8331-383a-4bd4-b7a7-5c187dda80bc | `game/src/`, `game/index.html` |
| Art | Slice visual assets | https://cursor.com/agents/bc-6f6ed739-7b8e-487d-8b76-2cb2c152940a | `game/STYLE.md`, `game/assets/` |
| Playtest | Playtest findings | https://cursor.com/agents/bc-016cebd0-fd39-4b95-a735-930757896489 | `game/PLAYTEST.md` |

Shared, read-only for everyone except CoS/Design tighten: `game/GDD.md`.

## Do this now

1. `git fetch origin && git checkout cursor/chief-of-staff-vault-1087 && git pull`
2. Work on **your own branch** off that branch: `cursor/<role>-1087` is fine if unique; otherwise `cursor/<role>-slice-1087`
3. Touch **only your owned paths**. PR against `cursor/chief-of-staff-vault-1087` (or `main` after #1 merges)
4. Do not invent a second game. Do not add combat, story, audio, accounts.

## Merge order

1. Playable loop (`game/src`, `game/index.html`)
2. Spec cuts (`game/GDD.md` numbers only)
3. Art drop-ins (`game/assets`, `game/STYLE.md`)
4. Playtest report (`game/PLAYTEST.md`)

## Paste-prompts

See [prompts.md](prompts.md). brandon can paste each into the matching agent so they stop rediscovering The Vault.
