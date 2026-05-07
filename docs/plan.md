# StellarSwap UI — Build Plan

The frontend is built in layers that mirror the core contract dependency order.
Each layer can be worked on independently once the layer before it is done.
All PRs target `develop`. `main` is stable only.

---

## Layer 1 — Wallet Connection (no contract dependency)

**Goal:** A user can connect and disconnect their Freighter wallet. The connected address is available everywhere in the app.

**Files:**
- `src/components/wallet/WalletProvider.tsx` — initialise StellarWalletsKit, manage address state, expose `connect` / `disconnect`
- `src/components/wallet/ConnectButton.tsx` — show truncated address when connected, open modal when not

**Done when:** Clicking "Connect Wallet" opens the Freighter modal, the address appears in the navbar, and "Disconnect" clears it.

---

## Layer 2 — Read-Only Contract Calls (depends on: deployed pair + LP token contracts)

**Goal:** The app can read live data from the chain without any wallet interaction.

**Files:**
- `src/lib/soroban.ts` — implement `submitAndPoll`; verify `sorobanServer()` works against testnet
- `src/hooks/useReserves.ts` — call `PairClient.getReserves()`, poll every 10s
- `src/hooks/useTokenBalance.ts` — call token contract `balance(address)` for SEP-41 tokens; use Horizon for native XLM
- `src/hooks/useQuote.ts` — debounce input, call `PairClient.getQuote()`, convert base units ↔ display

**Done when:** Reserves and wallet balances render correctly on the swap and liquidity pages with real testnet data.

---

## Layer 3 — Swap (depends on: Layer 1 + Layer 2 + pair `swap` function)

**Goal:** A connected user can swap token A for token B end-to-end.

**Files:**
- `src/components/swap/SwapForm.tsx` — wire `useQuote` into the output field; implement `handleSwap` (build tx → sign → submit → poll)
- `src/components/ui/TokenInput.tsx` — implement numeric validation, MAX button, balance display

**Flow:**
1. User types amount → `useQuote` fetches output amount
2. Exchange rate and price impact displayed below the form
3. User clicks Swap → `RouterClient.buildSwapTx` → wallet signs → `submitAndPoll` → success toast

**Done when:** A testnet swap settles and reserves update on screen.

---

## Layer 4 — Liquidity (depends on: Layer 1 + Layer 2 + pair `add_liquidity` / `remove_liquidity`)

**Goal:** A connected user can add and remove liquidity.

**Files:**
- `src/components/liquidity/AddLiquidityForm.tsx` — proportional amount auto-fill via `library.ts::quote`; first-deposit notice; `PairClient.addLiquidity` flow
- `src/components/liquidity/RemoveLiquidityForm.tsx` — expected output preview; `PairClient.removeLiquidity` flow
- `src/components/liquidity/LiquidityPanel.tsx` — add "Your Position" section showing LP balance and pool share %

**Done when:** A testnet add-liquidity and remove-liquidity round-trip works and LP balance updates correctly.

---

## Layer 5 — Polish & UX (depends on: Layers 1–4)

**Goal:** The app is production-ready for testnet launch.

**Tasks:**
- Styled token selector dropdown (replace `<select>` in `TokenInput`)
- Slippage settings modal (default 0.5%, user-adjustable)
- Transaction status toasts (pending / success / failed)
- Active route highlight in `Navbar` via `usePathname()`
- Price impact warning (highlight red when impact > 2%)
- Mobile-responsive layout pass
- Error boundary around swap and liquidity forms

---

## Layer 6 — Mainnet & Production (depends on: all above + mainnet contract deployment)

**Tasks:**
- Swap `NEXT_PUBLIC_NETWORK_PASSPHRASE` and contract IDs to mainnet values
- Dynamic token list fetched from the factory contract (`get_pair` registry)
- Analytics / event tracking (optional)
- Vercel production deployment with environment secrets

---

## Notes

- All amounts in the contracts are in **base units (7 decimals)**. Multiply display values by `1e7` before passing to contracts; divide by `1e7` before displaying.
- The pair contract never calls `transferFrom`. The SDK must build token transfer operations to the pair address **before** calling `add_liquidity`, `remove_liquidity`, or `swap`. See `docs/architecture.md` in the core repo for the exact data flows.
- The core SDK (`sdk/src/`) lives in the [StellarSwap](https://github.com/CHEF-S-GOSPEL-TECH/StellarSwap) repo. Import from there once published, or symlink/copy during local development.
