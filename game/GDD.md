# The Vault slice — Robot Puzzle Shooter

Locked 2026-08-25 by Chief of Staff after brandon named the original Game Dev **robot puzzle shooter**.

This replaces the heist/extract greybox and parks Design’s **TAKE** stealth spec (PR #2). Shooting is a **puzzle tool**, not a DPS check.

## Fantasy

You are a robot. Read the room. Shoot the right things. Walk out.

## Platform

- **Title:** Robot Puzzle Shooter (working title)
- **Product repo:** https://github.com/Snova24/Snova24-scrapforge (empty until Game Dev’s first commit)
- **Scratch:** HTML5 greybox in *this* repo (`game/`) — not the product
- **Session:** ~5 minutes

## Verbs (only these)

| Input | Action |
| --- | --- |
| WASD or arrows | Move |
| Mouse | Aim |
| Click or Space | Shoot (puzzle tool) |
| R | Retry |

No stealth, no grab-loot, no melee.

## 5-minute loop

1. Spawn as a robot on the left.
2. Three **nodes** in the room must be shot to ON.
3. One node is blocked by a **crate** — shoot the crate first.
4. When 3/3 nodes are ON, the **exit** unlocks (right side).
5. Walk into the exit.
6. **Win:** exit with 3/3. **Lose:** 90s lock-down after the first shot expires while you are not in the exit.
7. R retries.

## Win / lose copy

- Win: `SOLVED`
- Lose: `POWER DOWN`
- Idle: `WASD move · mouse aim · click shoot`

## Content budget

- 1 robot
- 1 projectile type
- 3 nodes
- 1 destructible crate
- 1 locked exit
- Walls

## Explicit non-goals

- Stealth TAKE (PR #2) — do not merge as the game
- Vault heist / relic extract
- Enemy health bars, gun-game arenas, story, upgrades, audio requirement

## Cuts if we slip

1. No extra enemy types.
2. No second room.
3. No ammo economy.

## Art contract

Placeholders are shapes. Drop-ins in `game/assets/` per `game/assets/README.md`.

## Owners

- **Game Dev (implementer):** agent **robot puzzle shooter** — `game/src/`, `game/index.html`
- **Design:** Core gameplay loop — tighten this GDD only, do not own src
- **Art:** Slice visual assets
- **Playtest:** Playtest findings
