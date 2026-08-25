# Slice assets — must-have vs later

Locked to **TAKE** (`GDD.md`). Content budget is the list. Do not invent a use for leftover files.

## Must-have (this PR)

| Slot | GDD | Greybox | Size |
| --- | --- | --- | --- |
| `player.png` | You, empty-handed | cream capsule | 256² |
| `player_hold.png` | You, holding relic | cream + amber diamond | 256² |
| `player_act.png` | Take (adjacent) | cream lean | 256² |
| `guard.png` | `G` ×2, one type | steel visor block | 256² |
| `relic.png` | `R` | amber diamond | 256² |
| `door.png` | `D` extract | teal hex | 256² |
| `floor.png` | `.` lit | steel tile | 256² |
| `shadow.png` | `s` ×4 | charcoal tile | 256² |
| `wall.png` | `#` | charcoal bulkhead | 256² |
| `cone.png` | 60° view | oxide wedge; 40% alpha in engine | 256² |
| `focus.png` | adjacent-Take cue | amber corners | 256² |
| `bg_arena.png` | one room | charcoal + one amber pad | 960×640 |
| `hud_panel.png` | clock + relic well | steel bar; **no pips** | 960×175 |
| `state_win.png` | extract with relic | teal door | 960×640 |
| `state_fail.png` | Caught or timeout | oxide seal | 960×640 |
| `style_sheet.png` | bible sheet (not in-game) | — | 960×640 |

Also must-have, not a PNG: [`tokens.css`](tokens.css) / [`tokens.json`](tokens.json).

`pickup.png` is the same image as `relic.png`. `goal.png` is the same image as `door.png`. Prefer the TAKE names.

## Later (not this slice)

| File / idea | Why wait |
| --- | --- |
| `hazard.png` | No traps. Lose is cone or clock. Keep file as leftover; do not place it. |
| Extra guard types, cameras, lasers | Cut: detection systems |
| Walk cycle, door open sheet, portraits | Slice is 1-frame poses + tween |
| Title key art, store, audio-synced VFX | After a stranger can finish 5 minutes |
| `pip_on` / score / combo HUD | Spec: no score, stars, combo |
| Second room / relic variants | Cut: meta |

## Animation list (slice)

| Clip | Frames | Notes |
| --- | --- | --- |
| idle | `player.png` | 2px bob in code |
| hold | `player_hold.png` | swap on Take relic |
| act | `player_act.png` | 120–180ms on Take |
| guard | `guard.png` | rotate with polyline; pause 1s at ends |
| cone | `cone.png` | parent to guard facing |
| win / fail | stills | 1s + one key to retry |

No chase cycle. Guards do not change behavior after Take.
