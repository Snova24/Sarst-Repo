# Playtest script — Robot Puzzle Shooter

Playtest owns **Findings**. Script is for a stranger run of the greybox.

## How to run

Branch `cursor/chief-of-staff-vault-1087`, repo root:

```bash
python3 -m http.server 8765
```

Open http://localhost:8765/game/

## Script (5 minutes)

1. Load. Do you know you are a robot that shoots puzzles, not a stealth thief?
2. Move WASD. Aim with mouse. Shoot.
3. Find the crate-blocked node. Can you tell to shoot the crate?
4. Turn all 3 nodes ON. Does the exit read as open?
5. Walk into the right-side exit. Win = SOLVED?
6. Retry R. Lose once by waiting out the clock after a shot. POWER DOWN?
7. Do **not** play Design PR #2 (TAKE stealth) — that is the wrong game.

Log crashes and confusion only. Rank by stops the slice.

## Findings

_Status: greybox retargeted to Robot Puzzle Shooter 2026-08-25. Original Game Dev agent is **robot puzzle shooter** (not visible from this environment)._

| Rank | Stops the slice? | What happened |
| --- | --- | --- |
| | | |

Crashes:

Confusion:

Verdict (stranger can finish 5 minutes?): `pending`
