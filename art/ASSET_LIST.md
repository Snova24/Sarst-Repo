# Slice assets — must-have vs later

Art for the 5-minute loop only. No new mechanics. If a row is not needed by the locked verbs, skip it — do not invent a use.

## Must-have (in this PR)

These files live in [`slots/`](slots/) and are named for drop-in. Greybox color is the CSS token Game Dev can use *until* the PNG is hooked.

| Slot file | Role | Greybox until hooked | Size |
| --- | --- | --- | --- |
| `player.png` | You | cream capsule | 256² |
| `player_act.png` | You, doing the verb | cream capsule, lean | 256² |
| `goal.png` | Win / extract | teal hex | 256² |
| `hazard.png` | Fail source | oxide spike-seal | 256² |
| `pickup.png` | Interact / collect | amber diamond | 256² |
| `focus.png` | Selection / aim | amber corners | 256² |
| `floor.png` | Walkable | steel tile | 256² |
| `wall.png` | Blocker | charcoal bulkhead | 256² |
| `bg_arena.png` | One-screen playfield | charcoal room + one amber pad | 960×640 |
| `hud_panel.png` | Timer / pips / objective well | steel bar, amber rule | 960×225 |
| `state_win.png` | Session win | teal door open | 960×640 |
| `state_fail.png` | Session fail | oxide seal | 960×640 |
| `style_sheet.png` | Bible sheet (not in-game) | — | 960×640 |

Also must-have, **not a PNG:** [`tokens.css`](tokens.css) (and `tokens.json`) so a web or engine build can greybox the same roles before sprites land.

## Must-have if the loop uses it (no file yet — do not block)

Ship only when Game Dev actually draws the verb. Slot names reserved:

| Slot name | When to produce |
| --- | --- |
| `player_fail.png` | Hit reaction distinct from `state_fail` |
| `pip_on.png` / `pip_off.png` | Lives or charges, if not CSS rects |
| `timer_fill.png` | If the HUD bar is a sprite, not a CSS width |
| `button_up.png` / `button_down.png` | If there is an on-screen confirm |

Until then: CSS pips and a CSS timer using `--vault-cream` / `--vault-amber`.

## Later (not this slice)

- Extra hazards, elite variants, NPC portraits
- Parallax, debris kits, animated vault-door sheets
- Store / trailer / icon set beyond the four role tokens
- Audio-synced VFX, screen-space dirt, normal maps
- Narrative slides, credits art, locale-specific signage
- A second biome

## Animation list (slice)

| Clip | Frames needed | Notes |
| --- | --- | --- |
| `idle` | 1 (held `player.png`) | Bob in code, 2px |
| `act` | 1 (`player_act.png`) | 120–180ms then back |
| `win` / `fail` | stills | Full-screen cards, 1s hold |

No walk cycle required if move is a tween. Add a 4-frame walk only if Playtest says the capsule feels stuck.
