# The Vault — playable slice

HTML5 greybox for the 5-minute loop. Spec: [GDD.md](GDD.md).

## Run

From the repo root:

```bash
python3 -m http.server 8765
```

Open http://localhost:8765/game/

## Lanes

| Path | Owner |
| --- | --- |
| `game/src/`, `game/index.html` | Game Dev (Core gameplay loop) |
| `game/STYLE.md`, `game/assets/` | Art (Slice visual assets) |
| `game/PLAYTEST.md` | Playtest |
| `game/GDD.md` | Locked by CoS; numbers only unless brandon overrides |
