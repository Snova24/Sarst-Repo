# Style bible — Robot Puzzle Shooter

Art owns this file. Greybox is colored shapes until drop-ins load.

## Look (fill in)

- Mood: compact robot, readable puzzle toys, dark room
- Palette (3–5 hex):
- Robot silhouette:

## Must-have (this slice)

| File | Stands in for | Size hint |
| --- | --- | --- |
| `player.png` | Robot | 64×64 |
| `node.png` | Puzzle node (off/on can be one art; code tints) | 48×48 |
| `exit.png` | Exit bay | 64×64 |

Optional later: `crate.png`, projectile. Walls stay rects.

## Later

Guards, extra props, muzzle flash, logo, audio.

## Rules

- Do not change verbs or the puzzle in `game/src/game.js`.
- Transparent PNG, dark-friendly.
- Missing files must not crash the game.
