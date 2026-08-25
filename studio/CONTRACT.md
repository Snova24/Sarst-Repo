# Agent contracts

Today is 2026-08-25. Coupons expire around Sep–Dec 2026. Include 2 expired coupons (before Aug 25, 2026) so the UI can show an expired state.

## Catalog agent — write only these files

- `src/data/catalog.ts` — export `COUPONS: Coupon[]` (24+ original fictional merchants, not real brand names). Mix of percent, amount, bogo, freeShipping. At least one `featured: true`. Unique `id` slugs. Unique `code` strings like `HARBOR10`. Spread categories. Colors are hex accents.
- `src/lib/coupons.ts`
  - `getCoupon(id: string): Coupon | undefined`
  - `filterCoupons(coupons: Coupon[], query: CouponQuery, now?: Date): Coupon[]`
    - search matches merchant, title, description, code (case insensitive)
    - category `all` or exact
    - default hide expired unless `walletOnly` (wallet shows expired clipped ones at the bottom)
    - sort: `ending` by expiresAt asc, `save` by discountScore desc, `newest` by publishedAt desc
  - `walletSavings(coupons: Coupon[], entries: WalletEntry[], now?: Date): number`
    - sum `estimatedSave` for clipped, not used, not expired
- `src/lib/wallet.ts`
  - `STORAGE_KEY = "clipbook.wallet.v1"`
  - `loadWallet(): WalletEntry[]` / `saveWallet(entries: WalletEntry[]): void`
  - `useWallet()` React hook:
    - `entries`, `clip(id)`, `unclip(id)`, `markUsed(id)`, `markUnused(id)`, `isClipped(id)`, `isUsed(id)`
    - persist on every change
    - safe if localStorage missing
- `src/lib/coupons.test.ts` and `src/lib/wallet.test.ts` — vitest, cover filter, sort, expired hiding, savings, clip/unclip/used. Mock localStorage in wallet tests.

Use types from `src/types.ts` and helpers from `src/lib/format.ts` (`discountScore`, `estimatedSave`, `isExpired`). `verbatimModuleSyntax` is on: use `import type` for types.

## Product UI agent — write only these files

- `src/App.tsx` (replace stub)
- `src/styles.css`
- `src/components/**` as needed

Import catalog and wallet. Do not edit `src/data` or `src/lib`. If catalog files are missing when you start, still write UI against the contract above; Chief will integrate.

Must-have UX:
1. Header: Clipbook wordmark, wallet count, estimated savings.
2. View toggle: Browse | Wallet.
3. Featured deal (first `featured` live coupon) on Browse.
4. Search input, category chips including All, sort select.
5. Responsive ticket grid. Each ticket: merchant, discount, title, expiry, Clip button, Copy code.
6. Click ticket (not the buttons) opens a detail overlay: full terms, min spend, copy, clip, mark used if in wallet.
7. Copy writes `code` to clipboard and shows a short toast “Copied MERCHANT code”.
8. Wallet: clipped tickets, unused + live first, then used, then expired. Empty state copy.
9. Keyboard: Escape closes overlay.
10. Mobile usable at 390px.

Visual: follow `studio/PRODUCT.md`. Perforated tickets, punch holes, cream paper, clip red, no generic dashboard chrome. Accessible labels on icon-only buttons.
