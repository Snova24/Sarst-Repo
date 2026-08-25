# Playtest script — The Vault slice

Playtest owns the **Findings** section. CoS wrote the script so this can start immediately.

## How to run

From repo root, on branch `cursor/chief-of-staff-vault-1087`:

```bash
python3 -m http.server 8765
```

Open http://localhost:8765/game/ as a **stranger**. No coaching.

## Script (5 minutes)

1. Load the page. Can you tell what to do before you move?
2. Move with WASD. Does it feel stuck or slippery?
3. Find and grab at least one gold token (E / Space). Does grab register?
4. Notice the timer. Is lock-down obvious?
5. Extract to the green alcove with ≥1 token. Win screen?
6. Retry with R. Die once on purpose (wait out the timer). Lose screen?
7. Optional: extract with 3/3.

Log **crashes and confusion only**. Rank by stops the slice. No feature requests unless the loop is broken.

## Findings

_Status: greybox shipped 2026-08-25. Playtest agent: fill this in after a real run._

| Rank | Stops the slice? | What happened |
| --- | --- | --- |
| | | |

Crashes:

Confusion:

Verdict (stranger can finish 5 minutes?): `pending`
