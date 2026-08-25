# Robot Puzzle Shooter — slice spec

**TAKE is dead.** Do not merge PR #2. This is the 5-minute loop. Greybox: `game/` on this repo. Design owns this file only — do not edit `game/src`.

Reference: *Brotato* (3 waves, pick 1 of 3 upgrades) plus a robot that **shoots puzzles**, not only health bars.

## Fantasy

You are a scrap robot in an arena. Horde comes in waves. You shoot **drones** so they do not unmake you and shoot **nodes** ON to close the wave. Between waves you kit out like Brotato.

If a stranger cannot say *kill red AND shoot blue ON*, the loop is unread — retune copy/spawn/pacing. Do not add a verb.

## Platform

- **Title:** Robot Puzzle Shooter
- **Repo:** `Snova24/Sarst-Repo` — `game/`
- **Engine:** HTML5 canvas + vanilla JS (already running)
- **Play:** `python3 -m http.server 8765` → http://localhost:8765/game/
- **Session:** 3 waves + 2 upgrade picks. Envelope ≤5 minutes.

## Verbs (locked)

| Input | Does |
| --- | --- |
| WASD / arrows | Move |
| Mouse | Aim |
| First click | Focus canvas — **does not fire** |
| Later click / Space | Shoot |
| Click a card | Take 1 of 3 upgrades (after waves 1 and 2) |
| R | Retry run (stats reset) |

Do not add dash, reload, interact, stealth, or a second fire mode.

## 5-minute loop

1. Wave N starts. Drones spawn on the four edges. They **do not chase** until aggro hits 0.
2. **Clear = AND:** all drones dead **and** all nodes ON. Kills alone do not end the wave. If the horde is dead and a node is off, status is STUCK — shoot the blue node.
3. After waves 1 and 2 only: pause, pick **1 of 3** cards. Stats stack. No pick after wave 3.
4. Survive wave 3 (AND complete) = **SOLVED**.
5. HP 0 = **POWER DOWN**. R retries.

Wave 1 must teach the AND during the freeze: shoot the node ON *before* drones chase, then kite the pack.

## Numbers

### Greybox now (`game/src/game.js`) — do not invent a different game

| | W1 | W2 | W3 |
| --- | --- | --- | --- |
| Drones | 3 | 8 | 12 |
| Nodes | 1 | 1 | 2 |
| Drone HP | 1 | 1 | 2 |
| Drone speed | 55 | 71 | 87 |
| Aggro delay | 1.8 s | 0.45 s | 0.45 s |

Baseline: HP 5, move 230, dmg 1, fire 280 ms, pierce 0, extra 0, shot 560, contact 1, i-frames 0.7 s. Arena 960×540. W1/W2 node NW; W3 NW+NE.

**Playtest + Design play (2026-08-25):** this W1 still **POWER DOWN**s an uncoached run in ~2 s. Freeze is not a learn window. Stranger never reaches the upgrade pick.

### Design lock — Game Dev implements these (Design does not touch `src`)

Keep 3/8/12 and the AND. Change **only** wave 1 so a moving stranger can finish it.

| W1 | Now | **Lock** | Why |
| --- | --- | --- | --- |
| Drones | 3 | **3** | Pack is fine if they start slow |
| Aggro | 1.8 s | **3.5 s** | Time to focus, shoot NODE ON, then kite |
| Speed | 55 | **40** | Kite is possible after freeze |
| HP | 1 | **1** | One shot still pops them |

W2/W3 stay 8@71 / 12@2HP@87, 0.45 s aggro. Wave 3 is the wall the two Brotato picks exist to break.

Upgrade pool (unchanged — matches `POOL` / `applyCard`):

| Card | Effect |
| --- | --- |
| HOT BARREL | `dmg += 1` |
| COOLANT | `fireMs = max(90, fireMs - 50)` |
| SERVOS | `speed += 40` |
| PLATING | `maxHp += 2`, heal 2 |
| AP ROUNDS | `pierce += 1` |
| DUAL LINK | `extra += 1` (spread 0.18 rad) |

Each offer: 3 random unique cards from this 6. Two offers per run. Same card may appear on pick 2.

## Win / lose

- **Win:** `SOLVED` after wave 3 AND (`CLEAR` in the wave meter).
- **Lose:** `POWER DOWN`.
- HUD must keep the AND visible: wave, HP, nodes ON x/y, drones down.

## Three cuts

1. **TAKE / stealth** — no relics, guards, shadow, extract. PR #2 / #3 do not merge as the game.
2. **Meta** — no unlocks across runs, characters, 50-weapon Brotato wiki, crafting.
3. **Extra verbs** — no dash, melee, gadgets, alarm phases, inventory.

## Non-goals

Scrapforge, Alpha Budget, loot-extract greybox, online, accounts, live-ops, story campaign, final audio, Design editing `game/src`.

## Acceptance (stranger, 5 minutes)

1. After one attempt they can say: *kill drones AND shoot nodes ON*.
2. A moving stranger finishes **wave 1** (AND) without a coach. Freeze is long enough to shoot the node.
3. They see one upgrade pick. They can lose later. They know POWER DOWN vs SOLVED.

If (1) fails: readability (Art/copy), not a new system. If (2) fails: implement the W1 lock above, not a fourth wave.

## Owners

| Path | Owner |
| --- | --- |
| `game/src/`, `game/index.html` | Game Dev (robot puzzle shooter) |
| `game/GDD.md` | Design (this file) |
| `game/STYLE.md`, `game/assets/` | Art — robot / drone / node that reads as NODE, not a relic |
| `game/PLAYTEST.md` | Playtest |
