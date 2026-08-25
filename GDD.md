# Slice 0 — TAKE

One-page vertical slice. **This is the 5-minute loop.** Game Dev implements this and nothing else until a stranger can finish it.

Working title: **TAKE** (placeholder; brandon names the game later). Not “The Vault” — that name is the Chief of Staff repo.

Engine / platform: **unspecified.** Use whatever Game Dev already opened. This spec is rules, not a stack.

---

## Player fantasy

You are one person in a small guarded room. You read the patrol, take the relic, and leave. Greybox must deliver *I committed and got out* or *I got greedy and got seen*. If that feeling is missing, retune the room — do not add systems.

## Core verbs (locked)

| Verb | Does | Does not |
| --- | --- | --- |
| **Move** | Walk | Sprint, sneak toggle, roll, jump |
| **Take** | Pick up the relic when adjacent; extract at the door while holding it | Use on guards, stash, drop |

Cover is spatial, not a third verb. Standing in **shadow** makes you invisible. Standing in light inside a view cone is **Caught**.

Do not add verbs.

## 5-minute loop

One room. One relic. Two identical guards. Clock starts on first move.

| Time | What happens |
| --- | --- |
| 0:00–0:20 | Door, relic, and both patrols are readable. No tutorial popup. |
| 0:20–3:30 | Cross light using shadow. Learn the two routes. Commit. |
| 3:30–4:30 | **Take** the relic. Guards do not change behavior (no alarm phase). |
| 4:30–5:00 | Walk to the door and **Take** (extract). |

Restart is instant. Same room. No loadout, no hub.

### Paper map (build this)

```
##############
#D..s.......#     D  door / extract
#...........#     R  relic
#..G-----G..#     G  guard (same type, polyline patrol)
#.....s.....#     s  shadow / cover (4 volumes)
#..s....R...#
#.....s.....#     .  lit floor
##############     #  wall
```

Guards: 60° cone, range ~4 tiles, patrol the dashed line, pause 1s at each end, then reverse. No chase. No search. In cone + lit = lose.

## Win / lose

- **Win:** holding the relic, extract at the door, clock > 0.
- **Lose:** Caught, **or** clock hits 0 without a win.
- No score, stars, or combo. Win and lose screens + one key to retry.

A stranger must be able to say why they won or lost in one sentence.

## Content budget (slice only)

| Thing | Count |
| --- | --- |
| Player | 1 capsule |
| Guard type | 1 (instance count 2) |
| Relic | 1 |
| Rooms | 1 (~12×12) |
| Shadow volumes | 4 |
| Extract | 1 door |
| Screens | play, win, lose (title optional) |

Placeholders are correct. Cones and the relic must read at a glance.

## Three cuts

1. **Combat** — no weapons, takedowns, stun, killing guards.
2. **Meta** — no second mission, hub, unlocks, XP, inventory beyond “holding relic or not.”
3. **Detection systems** — no alert meter, phases, cameras, lasers, gadgets, throwable noise.

If Game Dev already built more than this: keep Move / Take / shadow / two patrols / 5:00 / win-lose. Everything else is a cut. Do not invent a replacement fantasy.

## Non-goals

- Engine work, renderer, networking, accounts, live-ops (assume **offline**).
- Final art, animation sets, audio production (one placeholder beep is enough).
- Story, dialogue, cutscenes, character select, crafting, skill trees.
- Open world, second floor, outdoor, extra relic types.
- Store copy, ASO, Discord, backend.
- Treating `Snova24/Sarst-Repo` (The Vault) or `alpha-budget-docs` as the game.

## Acceptance (stranger, 5 minutes)

1. They finish a win **or** a lose without a developer in the room.
2. They can state the loop: *move through shadow, take the relic, leave before the clock or the cone.*
3. They know why the run ended.

If (2) fails, the room/cone/UI is wrong — not the spec. Do not add a verb to explain it.

## Paper play (3 runs)

| Run | Plan | Result |
| --- | --- | --- |
| 1 | Wait both guards to the right, hug left shadows, take, extract. | Win ~3:40. Loop holds. |
| 2 | Rush the relic on spawn. | Caught at mid-line. Lose is instant and fair. |
| 3 | Take the relic, then wait in shadow for a “better” gap until 0:00. | Timeout. Greed is a lose. Do not add a stash or drop-relic verb to “fix” this. |

Handoff to Game Dev: build the paper map. Do not ask what it should feel like — it should feel like **Take**.
