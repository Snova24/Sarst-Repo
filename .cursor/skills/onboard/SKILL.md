---
name: onboard
description: First-run interview that fills identity, goals, constraints, and key people. Use when the vault is new, identity.md still has [TODO] fields, or the user says onboard, set this up, who am I, or start from scratch.
---

# Onboard

Goal: turn a cold vault into a usable Chief of Staff in one conversation. Write files as you go. Do not wait until the end.

## Before you ask anything

Read `vault/identity.md`, `vault/goals.md`, `vault/command-center.md`, `vault/commitments.md`. Do not re-ask facts that are already filled (name, GitHub, email, engineer, prefers coding in files).

## Conversation

Ask in this order. One cluster at a time. Do not dump a 12-question form.

1. **Scope** — Is this vault personal, work, or both? If both, which wins when they conflict?
2. **Place** — Timezone, typical working hours, location if it matters.
3. **Season** — What would make the next 90 days a win? Force it into at most three Now goals. Park the rest under Next / Not now.
4. **People** — Who matters this season? Create `vault/people/<slug>.md` from `vault/templates/person.md` for each one named. A name without a file is a leak.
5. **Work on the plate** — Active projects. Create `vault/projects/<slug>.md` from the template. One-off tasks go to commitments, not projects.
6. **Constraints** — Hard nos, energy, family, hours, tools already in use (calendar, mail, notes). Record tools as "not connected" unless there is a real integration.
7. **Working agreement** — Anything about tone, when to interrupt, what "done" means for a briefing. Write durable preferences into `vault/identity.md` and a one-liner into `AGENTS.md` if needed.

If they want to skip a cluster, leave the `[TODO]` and move on. Never invent biography.

## Writes (required)

- Update `vault/identity.md`: fill what you learned, check off unknown items, set Last updated.
- Update `vault/goals.md`: real Now goals, not placeholders, if they gave any.
- Update `vault/command-center.md`: this week + today from those goals.
- Update `vault/commitments.md`: mark C-001 done if onboard actually finished; add any new promises.
- Create people/project files.
- Append a session line to `vault/log/sessions.md`.
- Check off the onboard inbox item and move it to Filed.

## Close

Give brandon a 5-line recap: scope, 90-day win, top 3 now, who matters, what is still `[TODO]`. Tell him the next useful thing to say is `brief me` tomorrow or `capture` with a dump.
