# Studio roster

How we staff Cloud Agents to ship **the game**. Game Dev is already working. Do not clone it.

Hard cap: **3 concurrent agents**. One owner of the game repo `main`. Extra agents wait.

Working title, engine, and repo are still unknown — see [../projects/the-game.md](../projects/the-game.md). The roster below still holds for an indie slice.

## Now (running)

| Agent | Mission | Status |
| --- | --- | --- |
| **Chief of Staff** | Memory, priorities, staffing, unblocking. Does not write game code. | This vault — running |
| **Game Dev** | Playable build. Engine, systems, input, loop, bugs. Single implementer. | Working (not visible from this environment) |

## Next to spawn (one at a time)

Spawn only when the trigger is true. If two triggers fire, Design wins until the loop is fun.

### 1. Game Design

- **Trigger:** Game Dev is inventing rules, content, or scope while coding — or brandon cannot answer "what is the 5-minute loop?"
- **Mission:** Lock the vertical slice. Write `GDD.md` (short): fantasy, verbs, win/lose, session length, what is *out*. Cut features. Playtest on paper.
- **Not:** Engine work, asset production, store copy.
- **Handoff to Game Dev:** A slice spec Game Dev can implement without asking "what should this feel like?"
- **First prompt:**
  > You are Game Design, not engineering. Repo is the game. Read whatever exists. Produce a one-page vertical-slice spec: player fantasy, core verbs, 5-minute loop, win/lose, content budget, explicit non-goals. Do not add systems. Open a PR. If the loop is already written, tighten it and list the three cuts.

### 2. Art / Content

- **Trigger:** Loop is playable and *fun enough* with placeholders. Look is now the thing that makes it feel unfinished.
- **Mission:** Style bible (1 page), placeholder→final pipeline, UI readability, animation list tied to verbs. Produce a small final set, not a universe.
- **Not:** New mechanics. Do not block Game Dev on perfect art.
- **First prompt:**
  > You are Art. Loop is locked — do not redesign gameplay. Deliver: (1) one-page style bible, (2) list of assets required for the slice with must-have vs later, (3) the must-have set or clear temp→final slots Game Dev can drop in. PR only.

### 3. Playtest / QA

- **Trigger:** Someone who did not write the code can play 5 minutes without a developer standing there.
- **Mission:** Session script, crash list, "is it fun" notes, reproduce-or-close. File bugs Game Dev can pick up. No feature ideas unless the loop is broken.
- **First prompt:**
  > You are Playtest/QA. Do not add features. Write a 5-minute play script, run it, log crashes and confusion, rank by "stops the slice." PR with `PLAYTEST.md` + bug list.

## Do not spawn yet

| Role | Why wait |
| --- | --- |
| Audio | Placeholder SFX until the slice is fun. Audio too early is decoration. |
| Narrative / writer | Only if the game *is* a story. Most slices are verbs first. |
| Marketing / ASO / store | After a trailerable 30 seconds exists. |
| Backend / liveops / accounts | Only if the slice requires it. Assume offline until proven otherwise. |
| Community / Discord | After there are players. |
| Second Game Dev | Split-brain on one codebase. Unblock with smaller PRs, not a twin. |
| "Creative director" as a fourth voice | Design already owns that. |

## How they talk

```
brandon
  └── Chief of Staff (this vault)     priorities, roster, memory
        ├── Game Dev                  playable build (owner of game repo)
        ├── Game Design               slice spec (spawn when triggered)
        ├── Art                       look for the locked loop
        └── Playtest/QA               after a stranger can play
```

- Game Dev does not wait on Art for greybox.
- Design does not merge engine PRs.
- CoS does not implement. If the game needs code, that is Game Dev.
- Every agent opens a PR. brandon (or CoS briefing) decides merge order: **playable loop > spec cuts > art > polish**.

## Kill / pause rules

Pause an agent when: it is waiting on a human for >1 day, duplicating Game Dev, or producing docs nobody used in the last two PRs. The roster should shrink as the slice firms up, not grow.
