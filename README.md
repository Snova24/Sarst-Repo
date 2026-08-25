# The Vault — Chief of Staff

Persistent memory and operating system for **Brandon Davis**, run by Cursor agents. Chat is cheap. This repo is the source of truth.

If you just opened this: say **onboard** (or `/onboard`) and talk. The agent will fill `vault/identity.md`, goals, and constraints from the conversation.

## The game (in this repo)

Staff are live. Standing order: [`vault/studio/NOW.md`](vault/studio/NOW.md).

**Game (this repo):** Robot Puzzle Shooter — Brotato-style waves + puzzle nodes.

```bash
python3 -m http.server 8765
```

http://localhost:8765/game/ — WASD, mouse aim, click shoot, pick upgrades, survive 3 waves.

## What this is

A Chief of Staff does the work *around* the work:

- remembers who you are and what you promised
- captures dumps so they do not live in your head
- puts a recommended next action in front of you
- prepares meetings from people and project files
- closes the week so next week is not a reset

It does **not** silently take over engineering, invent a calendar it cannot see, or keep a second todo list in chat.

## How to use it

Open this repo in Cursor (desktop or a [Cloud Agent](https://cursor.com/agents)). Then speak in plain language:

| You say | The agent runs |
| --- | --- |
| `onboard` / "set this up" | First-run interview → identity, goals, people |
| `brief me` / "what's on my plate" | Command center + commitments + inbox |
| `capture` + a dump | Files notes, promises, people, projects |
| `what should I do` | Prioritize against goals |
| `prep me for X` | Meeting brief from vault files |
| `weekly review` | Week wrap, carry-forward, command center refresh |
| `remember that…` | Durable write to the right file |

You can also invoke skills directly: `/onboard`, `/briefing`, `/capture`, `/prioritize`, `/meeting-prep`, `/weekly-review`, `/learn`.

## Layout

```
AGENTS.md                 # How every agent should behave
.cursor/rules/            # Always-on CoS rule
.cursor/skills/           # Playbooks (briefing, capture, …)
vault/
  INDEX.md                # Map of the vault
  identity.md             # Who brandon is
  command-center.md       # This week / today
  goals.md                # Season outcomes
  commitments.md          # Open loops
  decisions.md            # Choices that should stick
  inbox.md                # Unfiled capture
  people/  projects/  journal/  weekly/  log/
scripts/status.py         # Sanity-check the spine
```

## After every useful session

The agent should have updated vault files. **Merge the PR** (Cloud Agents) or commit so the next session starts warm. If it stayed in chat only, the memory did not land.

## Health check

```bash
python3 scripts/status.py
```

Prints whether the spine files exist, how many inbox items are open, and the current command center.

## What this replaced

This repository started life as a GitHub Skills "Code with Copilot" course template. The Vault is the actual product.
