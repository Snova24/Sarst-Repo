# The Vault — vertical slice spec

Locked 2026-08-25 by Chief of Staff so Design / Art / Playtest / Game Dev can work in parallel. brandon overrides with one message.

## Fantasy

You are a runner inside a vault. Take the payload. Get out before lock-down.

## Platform / engine

- **Title:** The Vault
- **Engine:** HTML5 canvas + vanilla JS (this repo, `game/`)
- **Session:** ~5 minutes (several 90-second runs)

## Verbs (only these)

| Input | Action |
| --- | --- |
| WASD or arrows | Move |
| E or Space | Grab loot you are touching |

No combat. No jump. No inventory screen.

## 5-minute loop

1. Spawn in the extract zone (green).
2. Enter the vault floor. Three loot tokens are in the room.
3. A **90-second lock-down** starts when you grab the first token (or when you leave extract — first grab is the trigger).
4. Carry tokens automatically (touch = hold). You do not drop them.
5. Return to the extract zone before the timer hits 0.
6. **Win:** extract with ≥1 token. All 3 is a clean run.
7. **Lose:** timer hits 0 while you are not in extract, or you never extract. R to retry.

## Win / lose copy

- Win: `EXTRACTED — n/3`
- Lose: `LOCKED IN`
- Idle hint: `WASD move · E grab · get out`

## Content budget (slice)

- 1 room + extract alcove
- 1 player
- 3 loot tokens
- 1 timer
- Walls that block

## Explicit non-goals

Combat, guards with AI, story, dialogue, upgrades, crafting, multiplayer, accounts, audio requirement, mobile store page, a second biome.

## Cuts (if we slip)

1. Don't require all 3 tokens to win (already: ≥1).
2. Don't add enemy patrols.
3. Don't add a second floor.

## Art contract

Placeholders are rectangles. Art replaces files in `game/assets/` per `game/assets/README.md` without changing verbs.

## Feel targets (Game Dev)

- Movement should feel snappy, not floaty.
- Grab should be obvious (flash or pop).
- Timer must be readable at a glance.
- Retry in one key (`R`).
