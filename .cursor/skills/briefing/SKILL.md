---
name: briefing
description: Produce a current operating briefing from the vault. Use when the user says brief me, what's on my plate, start of day, good morning, what's up, or asks for status / command center.
---

# Briefing

Read, then speak. Do not re-research brandon's life from the internet.

## Read (in order)

1. `vault/command-center.md`
2. `vault/goals.md`
3. `vault/commitments.md` — open + waiting
4. `vault/inbox.md` — count unchecked items
5. `vault/log/sessions.md` — last entry only
6. Any project or person file linked from the command center

## Output (this shape, nothing fluffier)

```
# Briefing — {date}

## Do this next
1. ...   (the single best use of the next 90 minutes)
2. ...
3. ...

## On the clock
- overdue / due in 48h from commitments

## Waiting on
- ...

## Inbox
- N unfiled — mention only if N > 0, offer to drain

## Watch
- risks from command center + project files
```

Rules:

- Every item must point at a vault file or ID (`C-001`, `projects/the-vault.md`). No orphan advice.
- If identity still has `[TODO]`s, the first action is onboard — say that once.
- If you have no calendar access, do not invent meetings. Say "no calendar connected".
- Recommend declining or deferring one thing if the plate is overloaded.

## After the briefing

Refresh `vault/command-center.md` so Today / This week / Waiting / Risks / Inbox count match what you just said. Append a one-line session log if anything changed.
