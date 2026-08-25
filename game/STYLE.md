# Style bible — The Vault slice

Art owns this file. CoS stubbed the contract so Game Dev can ship without art.

## Look (fill in)

- Mood:
- Palette (3–5 hex):
- Shape language:
- UI: HUD is HTML (`.hud` in `src/game.css`). Do not hide loot count or timer.

## Must-have (this slice)

Drop PNGs using these exact names. Greybox uses colored rects until the file loads.

| File | Stands in for | Size hint |
| --- | --- | --- |
| `player.png` | Runner | 64×64, facing right ok |
| `loot.png` | Payload token | 48×48 |
| `extract.png` | Extract floor tile | 64×64, tileable-ish |

## Later (not this PR)

Guards, props, particles, logo, audio, second room.

## Rules

- Do not change verbs or the map layout in `game/src/game.js`.
- Transparent PNG, dark-friendly.
- If a file is missing, the game must still run.
