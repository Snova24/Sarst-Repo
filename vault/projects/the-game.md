# Project — The Vault (game)

Slug: `the-game`
Status: `active`
Last updated: 2026-08-25

## Why this exists

A 5-minute playable extraction slice, produced by a parallel Cloud Agent studio on this repo.

## Outcome

A stranger can load `game/`, grab loot, extract or get locked in, and retry — without a developer standing there.

## Locked

| | |
| --- | --- |
| Title | The Vault |
| Engine | HTML5 canvas + vanilla JS |
| Repo | `github.com/Snova24/Sarst-Repo` (`game/`) |
| Spec | [../../game/GDD.md](../../game/GDD.md) |
| Standing order | [../studio/NOW.md](../studio/NOW.md) |

## Links

- Play: `python3 -m http.server 8765` → http://localhost:8765/game/
- Game Dev: https://cursor.com/agents/bc-14df8331-383a-4bd4-b7a7-5c187dda80bc
- Art: https://cursor.com/agents/bc-6f6ed739-7b8e-487d-8b76-2cb2c152940a
- Playtest: https://cursor.com/agents/bc-016cebd0-fd39-4b95-a735-930757896489
- CoS: https://cursor.com/agents/bc-31188be9-f61d-4227-a145-063d34e31087

## Now

- [x] Lock loop + ship greybox
- [ ] Game Dev feel pass
- [ ] Art drop-ins
- [ ] Playtest findings
- [ ] brandon paste prompts (CoS cannot DM staff)

## Waiting on

Staff + brandon (prompts). Fantasy override if heist/extract is wrong.

## Risks

- Agents stay on stale `main` (Copilot template) instead of this branch
- Lane violations (Art editing `game/src`, etc.)
- Default fantasy is a CoS lock, not a brandon brief

## People

- brandon — owner
- Core gameplay loop — Game Dev
- Slice visual assets — Art
- Playtest findings — Playtest
- Chief of Staff — this vault

## Log

- 2026-08-25 — Parallel staff spawned; CoS locked HTML5 slice and shipped greybox.
- 2026-08-24 — brandon: game-dev agent is working; asked for optimal production roster.
