---
name: capture
description: File a dump of notes, links, meeting notes, voice-to-text, or "remind me" into the vault. Use when the user says capture, add this, remember this for later, dumps a meeting, or pastes unstructured notes.
---

# Capture

Inbox first, then file. Never let a dump exist only in chat.

## Step 1 — land it

Append the raw material to `vault/inbox.md` under Open, newest at the top, dated today. Keep the original wording. If it is long, also write `vault/journal/YYYY-MM-DD.md` (append if the file exists) and put a one-liner in the inbox that points at the journal file.

## Step 2 — slice

Pull out, as distinct objects:

| Kind | Where |
| --- | --- |
| Promise, deadline, ask, waiting-on | New or updated row in `vault/commitments.md` (next ID: C-00N) |
| Decision | `vault/decisions.md` |
| Person mentioned with substance | `vault/people/<slug>.md` (create from template if needed) |
| Body of work | `vault/projects/<slug>.md` |
| Goal / priority shift | `vault/goals.md` + command center |
| Trivia / link / someday | Stay in inbox or journal until brandon says it is a project |

If a commitment belongs to a person or project, add it there too. IDs stay unique in `commitments.md`.

## Step 3 — close the loop

- Check off each inbox item you fully filed. Move it to Filed with `Filed → path#anchor or C-00N`.
- Leave anything ambiguous in Open and ask **one** question, not a quiz.
- Touch `vault/command-center.md` if Today / Waiting / Inbox count changed.
- Session log: one line (`Captured N items, created C-00N, updated people/x.md`).

## Anti-patterns

- Do not "summarize" the dump in chat and skip the files.
- Do not create a project for a single task.
- Do not drop secrets or credentials into the repo. Redact and say so.
