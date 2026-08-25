# Style bible — TAKE (slice 0)

One page. Dresses the locked loop in `GDD.md` (PR #2). **No new verbs.**

Loop: *move through shadow, take the relic, leave before the clock or the cone.*

## Status

Placeholders are legal in greybox. This kit is the temp→final set so the room, cone, and relic read at a glance. If Game Dev already drew rects, swap files — do not add combat, alarms, or a second mission to “use” extra art.

## Pillars

1. **Read the commit in one second.** Shadow vs light, relic vs empty hands, cone vs not-in-cone.
2. **Four chromatic jobs.** Cream = you. Amber = relic / clock / “do Take.” Teal = door / extract / win. Oxide = guard visor, cone, caught. Steel + charcoal = lit floor vs wall. **Shadow is darker steel, not a fifth hue.**
3. **Thick outline, flat fill.** Board-game tokens. Player is a **capsule**. Guard is an **angular visor block**. Never the same silhouette.
4. **HUD is a clock + relic well.** No score, stars, combo, or life pips. Type (cream, geometric sans) draws the numbers — never bake digits into the PNG.

## Palette

| Token | Hex | Job in TAKE |
| --- | --- | --- |
| Charcoal | `#1B1F2A` | Void, walls, shadow pool, outline |
| Steel | `#3D4555` | Lit floor `.` |
| Cream | `#F4EDE1` | Player |
| Amber | `#E6A23C` | Relic, clock well, Take highlight |
| Teal | `#2A9D8F` | Door / extract / win |
| Oxide | `#C44536` | Guard visor, view cone, caught |
| Outline | `#0E1118` | Rim on every token |

Cream-on-charcoal and amber-on-charcoal ≥ 4.5:1. Do not put oxide on teal. Cone draws **over** the floor, 35–45% opacity in-engine (PNG is opaque; set alpha in code).

## Shape language (paper map)

| GDD glyph | Slot | Shape |
| --- | --- | --- |
| player | `player.png` / `player_hold.png` | Cream capsule. Empty chest = no relic. Amber diamond on chest = holding. |
| `G` | `guard.png` | Steel trapezoid, oxide visor. Two instances, one art. |
| `R` | `relic.png` | Amber diamond dossier. |
| `D` | `door.png` | Teal hex vault-door. |
| `s` | `shadow.png` | Dark tile. Four volumes. |
| `.` | `floor.png` | Steel lit tile. |
| `#` | `wall.png` | Charcoal bulkhead. |
| cone | `cone.png` | Oxide 60° wedge. Rotate to patrol facing. |

## Motion (locked verbs only)

| Verb | Eye |
| --- | --- |
| **Move** | Capsule translates. No walk cycle required. Bob 2px idle. |
| **Take** (relic) | Relic scales into `player_hold`. One amber flash. |
| **Take** (extract) | At door while holding → `state_win`. |
| Caught | Cone overlap while lit → `state_fail`. Instant. |
| Clock 0 | Same fail card. Greed is a lose. |

No sneak toggle, roll, jump, weapons, or alarm phase to animate.

## Do not

- A second guard type, cameras, lasers, portraits, cutscenes.
- Letters inside sprites.
- Life pips or score in the HUD PNG.
- Blocking Game Dev on alpha knockouts (chroma `#1B1F2A` or draw on charcoal).

Greybox: [`tokens.css`](tokens.css). Files: [`slots/`](slots/). List: [`ASSET_LIST.md`](ASSET_LIST.md). Preview: [`preview.html`](preview.html) is a still board, not a playable TAKE.
