# Clipbook

A Sunday circular you actually keep. Filter by interest, start with the high-value strip, then clip grocery codes, bank bonuses, and 0% credit. Join merchant clubs so Clipbook can nag you by location and flash a barcode at the register.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

```bash
npm test          # domain tests
npm run build     # production bundle
```

## What it is

No accounts. Wallet lives in the browser (`localStorage` key `clipbook.wallet.v1`). Clubs live in `clipbook.clubs.v1`. Catalog is fictional merchants — Harbor Pantry, Willow Table, and the rest — not scraped store codes.

Join a club, pin Tideglass (or allow GPS), and Clipbook reminds you which membership perks apply nearby. Open **Show at register** for a Code 39 the till can scan, or type `HARBOR10` / `HP-482910` in **Scan barcode**.

## Studio

Standing orders: [`studio/NOW.md`](studio/NOW.md). Product: [`studio/PRODUCT.md`](studio/PRODUCT.md).
