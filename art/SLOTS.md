# Temp → final slots (TAKE)

Greybox first. Alias these names in the engine. Do not rename files to match engine defaults.

```
Player        → art/slots/player.png
PlayerHold    → art/slots/player_hold.png
PlayerAct     → art/slots/player_act.png
Guard         → art/slots/guard.png          (×2 instances)
Relic         → art/slots/relic.png
Door          → art/slots/door.png
Floor         → art/slots/floor.png          (lit)
Shadow        → art/slots/shadow.png         (×4 volumes)
Wall          → art/slots/wall.png
Cone          → art/slots/cone.png           (opacity 0.4, rotate with guard)
Focus         → art/slots/focus.png          (optional adjacent cue)
Arena         → art/slots/bg_arena.png       (or tile Floor/Wall/Shadow on the paper map)
Hud           → art/slots/hud_panel.png      (clock in center well; relic icon in teal well)
StateWin      → art/slots/state_win.png
StateFail     → art/slots/state_fail.png
```

Pivots: tokens **center**; floor/shadow/wall **top-left**; HUD **top-center**; win/fail **center**. Cone pivot: **apex** (the point of the wedge), not the bounding-box center — if the engine can’t, offset in code so the apex sits on the guard.

## Transparency

PNGs include a charcoal backplate. Knock out `#1B1F2A` **or** draw on charcoal. Cone must be additive/alpha in code even if the file is opaque.

## Leftover

`hazard.png`, `pickup.png`, `goal.png` — aliases or unused. Prefer `relic` / `door`. Do not spawn a hazard to fill the file.

## Preview

[`preview.html`](preview.html) is the readability check, **not** the game. No Move / Take / clock on that page.
