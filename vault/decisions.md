# Decisions

Log choices that should still make sense in six months. Newest first.

## 2026-08-24 — Lean studio: Game Dev + CoS, then Design, then Art, then QA

- **Decision:** Optimal production staff is **not** a full department. Cap **3 concurrent** Cloud Agents. Game Dev owns the playable build. Next spawn is Game Design *only if* the 5-minute loop is undefined; Art after the loop is fun with placeholders; Playtest/QA after a non-author can finish 5 minutes. Audio, narrative, marketing, backend, and a second Game Dev wait.
- **Why:** One working implementer plus a swarm of parallel agents produces conflicting PRs and no slice. Fun before decoration.
- **Revisit if:** The game is actually a narrative title, a live-service, or already has a locked loop and needs art to be demoable.

## 2026-08-24 — The Vault is the Chief of Staff's memory

- **Decision:** This GitHub repo (`Snova24/Sarst-Repo`, "The Vault") is the durable operating system for Brandon's Chief of Staff. Cursor Cloud Agents read and write markdown here.
- **Why:** Chat context dies. Files in git do not. A leftover GitHub Copilot skills-course template is not the product.
- **Revisit if:** Brandon wants a different store (Obsidian-only, Notion, a private gist) or splits personal vs work into two vaults.
