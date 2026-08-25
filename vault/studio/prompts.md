# Paste these into the staff agents

CoS cannot DM other Cloud Agents. Paste the block for that agent as a follow-up.

## Core gameplay loop (Game Dev)

```
Standing order is vault/studio/NOW.md on branch cursor/chief-of-staff-vault-1087. Fetch and pull that branch.

You are Game Dev for The Vault slice. Spec is locked in game/GDD.md. Greybox already runs: from repo root, python3 -m http.server 8765, open http://localhost:8765/game/

Own only game/src/ and game/index.html. Make the loop feel good (move, grab, extract, timer, win/lose). Juice is fine. No combat, no new systems, no second map, no audio required.

Do not rewrite vault/. Do not invent a different game. Open a PR with the playable improvements.
```

## Slice visual assets (Art)

```
Standing order is vault/studio/NOW.md on branch cursor/chief-of-staff-vault-1087. Fetch and pull that branch.

Loop is locked in game/GDD.md. Greybox uses colored rects. You own game/STYLE.md and game/assets/ only.

Deliver: (1) one-page style bible in game/STYLE.md, (2) must-have vs later asset list, (3) drop-in PNGs using the filenames in game/assets/README.md so Game Dev does not change code. No new mechanics. Open a PR.
```

## Playtest findings (Playtest)

```
Standing order is vault/studio/NOW.md on branch cursor/chief-of-staff-vault-1087. Fetch and pull that branch.

There is now a playable: from repo root, python3 -m http.server 8765, then open http://localhost:8765/game/

Run the script in game/PLAYTEST.md as a stranger. Log crashes and confusion only. Rank by "stops the slice." Fill the Findings section. Do not add features. Open a PR with the updated PLAYTEST.md.
```
