# Clipbook

A Sunday circular you actually keep. Clip coupons into a wallet, copy codes at checkout, and see what you still stand to save.

## Who it is for

Someone who collects grocery, dining, and retail codes and loses them in screenshots. Clipbook is the booklet.

## V1 surface

- **Browse** — ticket-style cards for every live deal, featured deal on top.
- **Filter** — interest chips (groceries, dining, shopping, travel, out, tech, bank bonuses, 0% cards, 0% loans, punch cards) plus a **High value** chip.
- **Get the most** — a section ranked by dollar value ($80+) so the biggest bonuses and 0% windows sit at the top.
- **Sort** — ending soon, biggest save, newest.
- **Detail** — merchant, terms, expiry, min spend, copy code, clip / unclip.
- **Punch cards** — some deals lock the code until you confirm each listed task. Stamping a task clips the ticket and fills a progress bar. Undo is allowed. Savings only count after the card is full.
- **Bank bonuses** — ads that claim hundreds to open a checking account, with requirements, clawbacks, fees, and a dated **safe exit** so you can close and leave.
- **0% credit** — a section for balance-transfer cards and 0% personal loans: intro APR, then-APR, fees, payoff clock, clean exit.
- **Wallet** — clipped coupons, ending-soon first, mark used, remove.
- **Savings** — rough dollars still available from unused, unlocked wallet items.

No accounts. Wallet lives in `localStorage` key `clipbook.wallet.v1`.

## Visual

Paper coupon insert, not a SaaS dashboard.

- Cream paper `#F4EDE3`, ink `#1C1814`, clip red `#E23C2F`, sage `#2F6A4A`, gold `#C4A35A`.
- Display serif for titles (Fraunces). Body sans (Outfit).
- Cards look like perforated tickets: dashed gutters, round punch holes, stamp-like category marks.
- Motion: small, paper-like (lift, stamp). No glassmorphism, no generic indigo Tailwind kit.

## Out of scope

Auth, backend, real merchant APIs, maps, barcode scanning, browser extension.
