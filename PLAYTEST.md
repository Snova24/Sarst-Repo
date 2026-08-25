# Playtest — Slice 0 TAKE

Tester: stranger (did not write the loop or the spec).
Date: 2026-08-25.
Session: 5-minute first-play attempt. **Bugs and confusion only.**

## Play script (what I tried)

1. Open the repo a first-time player would open: https://github.com/Snova24/Sarst-Repo
2. Find how to play. Run the game. Do not read author notes if a playable build exists.
3. If a build exists, play 5 minutes with no developer in the room:
   - Figure out Move / Take / shadow / the two guards without a tutorial popup.
   - Take the relic. Extract at the door. Win or lose. Retry once.
4. Stop. Do not invent extra verbs.

## Result

**Could not start.** The slice is unplayable. There is no greybox, no executable, no web build, no itch/Play link, and no in-repo “how to run.”

What a stranger actually finds:

| Surface | What is there | Can you play? |
| --- | --- | --- |
| `main` README | GitHub Skills Copilot / Codespaces course | No — that is a different product |
| PR #1 | The Vault (Chief of Staff markdown) | No |
| PR #2 `GDD.md` | Paper spec for **TAKE** | No — rules, not a game |
| Art agent | Style bible / PNGs in progress, no engine | No |

Game Dev (`Core gameplay loop`) shipped the spec and went **idle**. No implementer is building the paper map.

I did not complete a win or a lose. I cannot state from play that the loop is “move through shadow, take the relic, leave before the clock or the cone.” I can only quote the GDD.

## Ranked issues (stops the slice first)

See [BUGS.md](BUGS.md). P0-1 is enough to fail acceptance.

## Acceptance (from `GDD.md`) vs this session

| Gate | Result |
| --- | --- |
| Finish a win **or** a lose without a developer | **Fail** — nothing to run |
| State the loop from play | **Fail** — no play |
| Know why the run ended | **Fail** — no run |

Re-test when a stranger can launch the paper map without this repo’s authors.
