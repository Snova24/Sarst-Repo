# Temp → final slots

Game Dev does not wait on Art for greybox. Hook these paths when look is the remaining unfinished feeling.

## Contract

1. Draw a rect (or engine sprite) whose **name** matches the slot.
2. Fill with the greybox hex from `ASSET_LIST.md` / `tokens.css`.
3. Replace the fill with `art/slots/<name>.png` — same pivot, same logical size.
4. Do not rename files to match an engine default; alias in the engine.

Suggested in-engine names (alias → file):

```
Player        → art/slots/player.png
PlayerAct     → art/slots/player_act.png
Goal          → art/slots/goal.png
Hazard        → art/slots/hazard.png
Pickup        → art/slots/pickup.png
Focus         → art/slots/focus.png
Floor         → art/slots/floor.png
Wall          → art/slots/wall.png
Arena         → art/slots/bg_arena.png
Hud           → art/slots/hud_panel.png
StateWin      → art/slots/state_win.png
StateFail     → art/slots/state_fail.png
```

Pivots: tokens **center**; floor/wall **top-left**; HUD **top-center**; win/fail **center**.

## Transparency

PNGs shipped with charcoal backplates (generator has no alpha). Treat `#1B1F2A` as chroma **or** draw them on charcoal. Do not block the loop on a knockout pass.

## Preview

Open [`preview.html`](preview.html) to see palette, tokens, HUD, and win/fail together. That page is the readability check, not a game.
