# Bug list — Slice 0 TAKE

Ranked by **stops the slice**. Playtest 2026-08-25. Stranger tester. No feature requests.

| ID | Sev | Stops slice? | Issue |
| --- | --- | --- | --- |
| P0-1 | P0 | Yes | **No playable build.** Repo `main` is a Copilot course. PR #2 is `GDD.md` only. No HTML/JS/engine project, no run command, no hosted play URL. A stranger cannot start, win, or lose. |
| P0-2 | P0 | Yes | **Wrong front door.** Landing README teaches Codespaces + Copilot, not TAKE. A stranger who did not write this will do the course (or bounce) and never find the game. |
| P1-1 | P1 | Yes, on first greybox | **Player spawn is not on the paper map.** GDD shows `D`, `R`, two `G`, four `s`. No `P` / start tile. Implementer and player will guess. Wrong guess makes the 5:00 loop unfair or unreadable. |
| P1-2 | P1 | Yes, first session | **“Take” means two different actions.** Pick up relic when adjacent; extract at the door while holding. Same verb, no UI copy specified. A stranger who grabs the relic will walk to the door and not know they must Take again. |
| P1-3 | P1 | Yes, first session | **Controls and engine unspecified.** GDD: “Use whatever Game Dev already opened.” Game Dev opened nothing. Move / Take keys, mouse vs keyboard, and how adjacency works are unknown. Clock “starts on first move” — if the player never finds Move, the session hangs with no fail state. |
| P1-4 | P1 | Maybe | **Guard start facing / first waypoint omitted.** Paper play #2 (“rush relic on spawn → caught at mid-line”) assumes a spawn-time cone the map does not state. First death can feel random, so the player cannot say *why* they lost in one sentence. |
| P2-1 | P2 | Confusion | **ASCII `G-----G` reads as a wall or corridor**, not a patrol polyline. `s` vs `.` is easy to miss. First-time room reading fails the “0:00–0:20 readable” beat before code exists. |
| P2-2 | P2 | Confusion | **Three names, one repo.** “The Vault” (CoS), leftover Copilot skill, working title TAKE. Stranger cannot tell which thing they are supposed to finish in 5 minutes. |

## Not logged

Polish, art quality, audio, extra missions, combat, tutorials-as-features. Out of scope until P0-1 is gone.

## Close when

A stranger can launch the GDD paper map, finish one win or one lose in 5 minutes, and say why — without a developer standing there.
