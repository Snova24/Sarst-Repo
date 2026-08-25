# Style bible — Vault slice

One page. Dresses the locked 5-minute loop. Does **not** add verbs, systems, or story.

## Status

The slice is still greybox in this repo. This look is the temp→final contract so Game Dev can swap rectangles for PNGs without waiting on a universe. If Design names different verbs, **remap slots** — do not redraw the IP.

## Pillars

1. **Read the verb in one second.** Silhouette and color role beat detail.
2. **Four chromatic jobs, no more.** Cream = you. Amber = interact. Teal = extract/win. Oxide = fail/hazard. Steel + charcoal = the room.
3. **Thick outline, flat fill.** Board-game tokens on an archive floor. No photoreal metal, no painterly noise as gameplay info.
4. **UI is a filing system.** HUD sits on a steel bar with an amber rule. Empty meters; Game Dev draws numbers in type, never in the sprite.

## Palette (hex)

| Token | Hex | Job |
| --- | --- | --- |
| Charcoal | `#1B1F2A` | Void, outline, unlit wall |
| Steel | `#3D4555` | Floor, bulkhead, HUD chassis |
| Cream | `#F4EDE1` | Player, readable type on dark |
| Amber | `#E6A23C` | Interact, focus, timer, “do this” |
| Teal | `#2A9D8F` | Goal / extract / win |
| Oxide | `#C44536` | Hazard / fail |
| Outline | `#0E1118` | 6px-equivalent rim on every token |

Contrast: cream on charcoal and amber on charcoal must stay ≥ 4.5:1. Never put oxide on teal; never put two roles on one object.

## Shape language

- **Player:** cream capsule + amber chevron. No face. Chevron up = idle, chevron along motion = act.
- **Goal:** teal hex vault-door + keyhole.
- **Hazard:** oxide spiked seal + down chevron.
- **Pickup:** amber diamond dossier.
- **Focus:** four amber corner brackets + cream dot.
- **Room:** square steel tiles, rivets, one amber pad max per screen.

Octagons/hexes for architecture and UI wells. Capsules for the actor. Diamonds for pickups. Spikes only on fail.

## Type

In-game type is **not** in the PNGs (sprites stay wordless). Use a geometric sans (preview uses `Rajdhani`). HUD labels: cream, 18px+ on dark, sentence case, no all-caps walls. One amber word for the current verb.

## Motion (tied to verbs, not new ones)

| Verb slot | What the eye should see |
| --- | --- |
| Idle | Capsule breathing, chevron up |
| Move | Capsule translates; no smear frames required |
| Act | `player_act` + `focus` on the target |
| Collect | Pickup scales down into the player |
| Fail | Hazard holds; smash to `state_fail` |
| Win | Goal door reads open; smash to `state_win` |

Juice budget for the slice: one squash on act, one flash (amber or oxide) on confirm/fail. No particles as information.

## Do not

- New enemy types, portraits, cutscenes, store key art.
- Readable letters inside sprites.
- A second palette “for variety.”
- Blocking Game Dev on transparency, normal maps, or animation sheets.

CSS tokens: [`tokens.css`](tokens.css). Drop-in files: [`slots/`](slots/). List: [`ASSET_LIST.md`](ASSET_LIST.md).
