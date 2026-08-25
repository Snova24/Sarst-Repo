---
name: meeting-prep
description: Prepare brandon for a conversation, 1:1, interview, or named meeting. Use when the user says prep, meeting prep, 1:1 with, catch up with, or names a person and an upcoming talk.
---

# Meeting prep

## Identify the meeting

Need: who, when (if known), purpose. If purpose is missing, infer one sentence from the person/project files and flag it as inferred.

## Read

- `vault/people/<slug>.md` — create from template if this is a new person, using only what brandon just said
- Relevant `vault/projects/*.md`
- `vault/commitments.md` rows involving that person
- `vault/decisions.md` if a prior call is on point
- Last journal/session mentions of the name (`rg` is fine)

No calendar: do not invent a time. "When" can be unknown.

## Output

```
# Prep — {person or meeting} — {date or unknown}

## Purpose
One sentence.

## Relationship
3 bullets from the person file. If the file is empty, say so.

## Open loops
Commitments IDs, waiting-on, promises.

## Aim
What "good" looks like by the end of the conversation (brandon's outcome).

## Ask
Questions worth actually asking. Max 5.

## Watch
Risks, sensitivities, decisions that should not get re-opened.

## After
What you will write back into the vault when he reports how it went.
```

Keep it one screen. After the meeting, use `capture` on his notes — do not pre-write a recap.
