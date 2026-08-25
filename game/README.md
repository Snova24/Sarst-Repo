# The Vault — playable slice

**Robot Puzzle Shooter** greybox. Spec: [GDD.md](GDD.md).

## Run

```bash
python3 -m http.server 8765
```

Open http://localhost:8765/game/

WASD move, mouse aim, click/space shoot, R retry.

## Lanes

| Path | Owner |
| --- | --- |
| `game/src/`, `game/index.html` | **robot puzzle shooter** (original Game Dev) |
| `game/GDD.md` | Design (Core gameplay loop) may tighten; fantasy is locked |
| `game/STYLE.md`, `game/assets/` | Art |
| `game/PLAYTEST.md` | Playtest |
