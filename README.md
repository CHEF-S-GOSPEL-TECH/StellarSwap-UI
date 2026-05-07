# StellarSwap UI

Frontend for the [StellarSwap](https://github.com/CHEF-S-GOSPEL-TECH/StellarSwap) constant-product AMM on Stellar.

Built with Next.js 14, Tailwind CSS, and the Stellar Wallets Kit (Freighter).

> **Status:** Scaffold complete. All components and hooks are stubbed with detailed implementation instructions. The UI builds and renders but requires the core contracts to be deployed before live data flows work.

---

## Structure

```
src/
  app/
    layout.tsx          # Root layout — WalletProvider + Navbar
    page.tsx            # Swap page
    liquidity/
      page.tsx          # Liquidity page
  components/
    ui/
      Navbar.tsx        # Top nav with wallet button
      TokenInput.tsx    # Reusable token amount + selector input
    swap/
      SwapForm.tsx      # Swap interface
    liquidity/
      LiquidityPanel.tsx    # Add/Remove tab switcher
      AddLiquidityForm.tsx  # Deposit tokens, receive LP tokens
      RemoveLiquidityForm.tsx # Burn LP tokens, receive tokens
    wallet/
      WalletProvider.tsx  # Stellar Wallets Kit context + useWallet hook
      ConnectButton.tsx   # Connect/disconnect button
  hooks/
    useQuote.ts         # Fetches swap quote from pair contract
    useTokenBalance.ts  # Fetches SEP-41 token balance for connected wallet
    useReserves.ts      # Fetches pair reserves
  lib/
    soroban.ts          # Soroban RPC client + submitAndPoll helper
  types/
    index.ts            # Shared domain types (Token, Pair, QuoteResult)
```

---

## Quick Start

```bash
cp .env.example .env.local
# Fill in contract addresses after deploying the core contracts

npm install
npm run dev
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_RPC_URL` | Soroban RPC endpoint |
| `NEXT_PUBLIC_NETWORK_PASSPHRASE` | Stellar network passphrase |
| `NEXT_PUBLIC_FACTORY_CONTRACT_ID` | Deployed factory contract address |
| `NEXT_PUBLIC_HORIZON_URL` | Horizon API endpoint |

---

## Contributing

Every file contains a `HOW TO IMPLEMENT` comment block explaining exactly what needs to be built. Start with the wallet provider, then the hooks, then wire them into the components.

**Dependency order:**
1. `WalletProvider` — wallet connection (no contract dependency)
2. `useReserves` + `useTokenBalance` — read-only contract calls
3. `useQuote` — depends on `PairClient.getQuote`
4. `SwapForm` — depends on `useQuote` + wallet
5. `AddLiquidityForm` / `RemoveLiquidityForm` — depends on reserves + wallet

The core SDK lives in the [StellarSwap](https://github.com/CHEF-S-GOSPEL-TECH/StellarSwap) repo under `sdk/src/`. Import from there once the SDK is published, or copy the files locally during development.

---

## License

MIT
