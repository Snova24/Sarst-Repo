# Decisions

Log choices that should still make sense in six months. Newest first.

## 2026-08-25 — Product repo is Snova24/Snova24-scrapforge

- **Decision:** The game lives at https://github.com/Snova24/Snova24-scrapforge (brandon: `Snova24/scrapforge`). The Vault is memory. scrapforge is empty; **robot puzzle shooter** makes the first playable commit. This CoS environment cannot push there.
- **Why:** brandon named the repo. Staff were building into the wrong place.
- **Revisit if:** a different scrapforge URL appears with actual code.

## 2026-08-25 — Original Game Dev is robot puzzle shooter; that is the game

- **Decision:** Implementer is the Cloud Agent named **robot puzzle shooter**. The 5-minute slice is a robot puzzle shooter (shoot nodes, exit). Design’s TAKE spec (PR #2) and the heist greybox are parked. Core gameplay loop is Design, not Game Dev.
- **Why:** brandon said to loop in the original Game Dev by that name. This environment cannot see that agent; brandon pastes the prompt.
- **Revisit if:** brandon sends the agent URL/repo and the build already lives elsewhere.

## 2026-08-25 — Default slice: The Vault HTML5 extraction, this repo

- **Decision:** The game is **The Vault**, in `game/` of `Snova24/Sarst-Repo`. Engine is HTML5 canvas. Loop: move, grab loot, extract in 90s. CoS shipped a greybox so parallel staff have a target. File lanes in `vault/studio/NOW.md`.
- **Why:** Design, Art, and Playtest spawned together on an empty CoS repo and were stuck in discovery. brandon ordered the whole team involved immediately.
- **Revisit if:** brandon names a different fantasy, engine, or repo.

## 2026-08-25 — Owner override: parallel staff, CoS coordinates

- **Decision:** The sequential spawn cap is waived. Collision control is **file lanes**, not fewer agents. CoS may scaffold a greybox to unblock; Game Dev owns `game/src` after that.
- **Why:** brandon spawned Design/Art/Playtest at once and told CoS to manage immediately.
- **Revisit if:** PRs start colliding anyway — then pause Art or Playtest.

## 2026-08-24 — Lean studio: Game Dev + CoS, then Design, then Art, then QA

- **Decision:** Optimal production staff is **not** a full department. Cap **3 concurrent** Cloud Agents. Game Dev owns the playable build. Next spawn is Game Design *only if* the 5-minute loop is undefined; Art after the loop is fun with placeholders; Playtest/QA after a non-author can finish 5 minutes. Audio, narrative, marketing, backend, and a second Game Dev wait.
- **Why:** One working implementer plus a swarm of parallel agents produces conflicting PRs and no slice. Fun before decoration.
- **Revisit if:** The game is actually a narrative title, a live-service, or already has a locked loop and needs art to be demoable.

## 2026-08-24 — The Vault is the Chief of Staff's memory

- **Decision:** This GitHub repo (`Snova24/Sarst-Repo`, "The Vault") is the durable operating system for Brandon's Chief of Staff. Cursor Cloud Agents read and write markdown here.
- **Why:** Chat context dies. Files in git do not. A leftover GitHub Copilot skills-course template is not the product.
- **Revisit if:** Brandon wants a different store (Obsidian-only, Notion, a private gist) or splits personal vs work into two vaults.
