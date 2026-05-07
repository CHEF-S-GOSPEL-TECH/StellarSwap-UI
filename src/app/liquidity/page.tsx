import { LiquidityPanel } from "@/components/liquidity/LiquidityPanel";

/**
 * Liquidity page — add and remove liquidity.
 *
 * HOW TO EXTEND:
 * - Add a "Your Positions" section showing the connected wallet's LP token balance.
 *   Read LP token balance via the lp-token contract's `balance(address)` function.
 * - Add a pool stats card (TVL, 24h volume) once the pair contract is live.
 */
export default function LiquidityPage() {
  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold text-brand">Liquidity</h1>
      <LiquidityPanel />
    </div>
  );
}
