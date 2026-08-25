# Playtest — Robot Puzzle Shooter (current 3-wave build)

Tester: stranger (did not write the loop) + control.
Date: 2026-08-25.
Build: `game/` on `cursor/chief-of-staff-vault-1087` after the wave-1 tune (3 drones, 1.8s chase delay, first click focuses). Brotato 3-wave greybox. Old loot/extract 1/3 findings do not apply.

Bugs and confusion only. Ranked by what stops a stranger from **SOLVED**.

## Run

```bash
python3 -m http.server 8765
```

http://localhost:8765/game/

## Script (~5 min)

1. Load. Do you understand: shoot drones **and** turn nodes ON?
2. Wave 1: finish without dying immediately?
3. Upgrade screen: 3 cards, click one. Stats readable?
4. Waves 2–3: survive to SOLVED?
5. Die once. POWER DOWN? R retries?
6. Log crashes and confusion only.

## Session

| Run | What happened |
| --- | --- |
| Stranger (no fight) | Load copy: `WAVE 1 — WASD first. Red = drones. Blue = shoot ON.` Three red squares on the edges, one blue square. Does not move or shoot. After the chase delay, drones eat 5 HP. **POWER DOWN** at 8.7s (`W1 · HP 0 · nodes 0/1 · 0 down`). R → `WAVE 1`, HP 5, nodes `0/1`, 0 down. Retries. Never sees an upgrade. |
| Stranger (shoots red) | First click focuses (does not fire). Then shoots the red squares. All 3 drones die. HUD: `W1 · HP 3 · nodes 0/1 · 3 down`. Blue square still off. Status stays WAVE 1. Wave does not end. |
| Control | Does both jobs. Wave-clear pause works (3 cards). Reaches wave 3. If both nodes go ON and the horde dies: **SOLVED** / `CLEAR · nodes 2/2`. If only one node is ON under wave-3 pressure: **POWER DOWN** with `nodes 1/2`. |

No JS exceptions. Arena is still colored squares (untracked sprites are not loaded). R retries. HUD/hint text already says both jobs; the arena does not make the AND readable.

## Ranked issues (stops SOLVED first)

| Rank | Stops a stranger from SOLVED? | What happened |
| --- | --- | --- |
| 1 | **Yes** | **Dual objective is unread as AND.** Red squares read as the fight. Blue squares are unlabeled decoration. Killing every drone leaves `nodes 0/1` and the wave stuck. SOLVED needs all drones dead **and** every node ON. Control who reached wave 3 still POWER DOWNs at `nodes 1/2` if that AND is missed. Copy on the HUD is not enough. |
| 2 | **Yes — if they freeze** | **Wave 1 POWER DOWN.** A stranger who does not shoot still dies in wave 1 (3 drones after ~1.8s). R retries the same room. No upgrade, no wave 2. |
| 3 | Confusion | **You are colored squares.** White = you, red = drones, blue = node / green = ON. Title says robot. HUD splits the win across `nodes 0/1` and `N down`. First click focuses and does not shoot — easy to think shooting is broken. |
| 4 | Not reached | Upgrade cards exist. A stranger who never hits the blue square never gets the Brotato pick. |

## Crashes

None. POWER DOWN overlay: `Press R to retry`. R resets the run.

## Verdict (stranger can SOLVE this slice today?)

**No.** Biggest stop: **dual objective (drones AND nodes) is unclear** — a stranger kills the red squares or dies trying, and the blue node never reads as the other half of the win.

Re-test when an uncoached first run can tell the blue square is a second win condition, not decoration.
