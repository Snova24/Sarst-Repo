# Playtest — Robot Puzzle Shooter (Brotato slice)

Tester: stranger. Date: 2026-08-25.
Build: CoS `25258d3` (HTML default is the gate line; `game.js?v=w1gate4`). Gate + walk-in already closed on `4eaa11c`. Do not re-file them.

## Run

```bash
python3 -m http.server 8765
```

http://localhost:8765/game/

Hard-reload so `src/game.js?v=w1gate4` loads.

## Script (stranger, ~5 min)

1. Load. Do you understand: shoot drones **and** turn nodes ON?
2. Wave 1: can you finish without dying immediately?
3. Upgrade screen: 3 cards, click one. Did stats change in a readable way?
4. Waves 2–3: denser. Survive to SOLVED?
5. Die once (hug drones). POWER DOWN? R retries?
6. Log crashes and confusion only. Rank by stops the slice.

## Session

| Run | What happened |
| --- | --- |
| Load | No reds. HTML default is the gate line; after JS, status still flips to `kill RED drones AND shoot BLUE NODE ON`. Footer still explains W1. |
| W1 | Shoot the labeled NODE → horde. During 20s immunity, W1 clears. Upgrade pick. HP 5. |
| W2 | Leave W2 if both jobs happen (upgrade pick). |
| W3 stranger | **POWER DOWN**, `node ON 1/2`, `11 drones down` (no W3 kills). 12 reds on screen. |
| Control | **SOLVED.** `CLEAR · HP 1 · node ON 2/2 · 23 drones down`. R retries. |

Crashes: none.

## Ranked issues

| ID | Sev | Stops slice? | What happened |
| --- | --- | --- | --- |
| Gate / walk-in | — | Closed | Not re-filed. W1 is leaveable. |
| P0 | P0 | Yes | **W3.** Stranger POWER DOWNs. Dual job on 12 drones + 2 nodes is unread as play. |
| P1 | P1 | Confusion | Load status still becomes the AND line after JS. Did not stop W1. |

## Verdict

**Can a stranger SOLVE today? No.** Biggest stop: Wave 3 (POWER DOWN with a node still off). Control can SOLVE if they do both jobs every wave.
