#!/usr/bin/env python3
"""Sanity-check The Vault spine and print the command center."""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VAULT = ROOT / "vault"

SPINE = [
    "INDEX.md",
    "identity.md",
    "command-center.md",
    "goals.md",
    "commitments.md",
    "decisions.md",
    "inbox.md",
    "log/sessions.md",
]

SKILLS = [
    "onboard",
    "briefing",
    "capture",
    "prioritize",
    "meeting-prep",
    "weekly-review",
    "learn",
]


def fail(message: str) -> None:
    print(f"FAIL  {message}")
    raise SystemExit(1)


def main() -> None:
    errors = 0

    def check(ok: bool, message: str) -> None:
        nonlocal errors
        if ok:
            print(f"OK    {message}")
        else:
            print(f"FAIL  {message}")
            errors += 1

    check((ROOT / "AGENTS.md").is_file(), "AGENTS.md exists")
    check((ROOT / "README.md").is_file(), "README.md exists")
    check(
        (ROOT / ".cursor/rules/chief-of-staff.mdc").is_file(),
        ".cursor/rules/chief-of-staff.mdc exists",
    )

    for rel in SPINE:
        path = VAULT / rel
        check(path.is_file() and path.stat().st_size > 0, f"vault/{rel}")

    for skill in SKILLS:
        skill_md = ROOT / ".cursor/skills" / skill / "SKILL.md"
        check(skill_md.is_file(), f"skill {skill}")
        if skill_md.is_file():
            text = skill_md.read_text(encoding="utf-8")
            check(
                f"name: {skill}" in text,
                f"skill {skill} name matches folder",
            )

    inbox = (VAULT / "inbox.md").read_text(encoding="utf-8")
    # Count checkboxes only under the Open section, not Filed / examples.
    open_section = inbox.split("## Open", 1)[-1].split("## Filed", 1)[0]
    open_items = re.findall(r"^- \[ \] ", open_section, flags=re.M)
    print(f"INFO  inbox open items: {len(open_items)}")

    command_center = (VAULT / "command-center.md").read_text(encoding="utf-8")
    if len(open_items) == 1:
        expected = "1 unfiled"
    else:
        expected = f"{len(open_items)} unfiled"
    check(
        expected in command_center,
        f"command-center inbox count matches ({expected})",
    )

    identity = (VAULT / "identity.md").read_text(encoding="utf-8")
    todos = identity.count("[TODO]")
    print(f"INFO  identity [TODO] markers: {todos}")

    print()
    print("--- command-center.md ---")
    print((VAULT / "command-center.md").read_text(encoding="utf-8").rstrip())

    if errors:
        fail(f"{errors} check(s) failed")
    print()
    print("Vault spine is healthy.")


if __name__ == "__main__":
    sys.exit(main())
