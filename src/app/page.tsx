import { SwapForm } from "@/components/swap/SwapForm";

/**
 * Home page — the swap interface.
 *
 * HOW TO EXTEND:
 * - Add a price chart component below <SwapForm> once the pair contract is live.
 * - Add a recent trades feed by reading events from the Soroban RPC.
 */
export default function HomePage() {
  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-3xl font-bold text-brand">StellarSwap</h1>
      <SwapForm />
    </div>
  );
}
