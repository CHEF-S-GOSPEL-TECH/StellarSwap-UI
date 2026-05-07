"use client";

/**
 * RemoveLiquidityForm
 *
 * Lets the user burn LP tokens to withdraw their proportional share of reserves.
 *
 * HOW TO IMPLEMENT:
 *
 * STATE:
 *   - lpAmount     — LP token amount to burn (string)
 *   - isSubmitting — true while tx is in flight
 *   - error        — error string or null
 *
 * EXPECTED OUTPUT DISPLAY:
 *   Show the user how much token A and token B they will receive before confirming.
 *   Formula (from docs/architecture.md — Remove Liquidity):
 *     amount_a = lpAmount * reserve_a / lp_supply
 *     amount_b = lpAmount * reserve_b / lp_supply
 *   Fetch reserves via PairClient.getReserves() and lp_supply via the LP token
 *   contract's total_supply() function.
 *
 * REMOVE LIQUIDITY FLOW:
 *   1. Validate lpAmount is positive and <= user's LP balance.
 *   2. Call PairClient.removeLiquidity(address, lpAmount) to get unsigned XDR.
 *      NOTE: The pair contract reads LP tokens from its own balance delta.
 *      The SDK must first build an LP token transfer to the pair, then call
 *      remove_liquidity(to). See docs/architecture.md — "Remove Liquidity" data flow.
 *   3. Sign with wallet kit.
 *   4. Submit and poll for result.
 *   5. On success: show amounts received, clear form.
 *
 * REFERENCES:
 *   - sdk/src/pair.ts — PairClient.removeLiquidity
 *   - contracts/pair/src/lib.rs — remove_liquidity() entry point
 *   - docs/architecture.md — Remove Liquidity data flow
 */

import { useState } from "react";
import { useWallet } from "@/components/wallet/WalletProvider";

export function RemoveLiquidityForm() {
  const { address, connect } = useWallet();

  const [lpAmount, setLpAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: fetch user's LP token balance via useTokenBalance(LP_TOKEN_ADDRESS)
  // TODO: compute expected token A and B output from lpAmount, reserves, lp_supply

  async function handleRemoveLiquidity() {
    if (!address) {
      await connect();
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      // TODO: implement remove liquidity flow described above
      throw new Error("Remove liquidity not yet implemented — see HOW TO IMPLEMENT above");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {/* LP token amount input */}
      <div className="rounded-xl bg-surface-card border border-surface-border p-4 flex flex-col gap-2">
        <span className="text-xs text-gray-400">LP Tokens to burn</span>
        <input
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          value={lpAmount}
          onChange={(e) => setLpAmount(e.target.value)}
          className="bg-transparent text-2xl font-semibold outline-none placeholder-gray-600"
          aria-label="LP token amount"
        />
        {/* TODO: show LP token balance and MAX button */}
      </div>

      {/* TODO: show expected output — "You will receive: X TOKEN_A + Y TOKEN_B" */}

      {error && (
        <p className="text-red-400 text-sm text-center" role="alert">
          {error}
        </p>
      )}

      <button
        onClick={handleRemoveLiquidity}
        disabled={isSubmitting || !lpAmount}
        className="w-full py-3 rounded-xl bg-brand text-white font-semibold hover:bg-brand-dark disabled:opacity-50 transition-colors"
      >
        {isSubmitting ? "Removing…" : address ? "Remove Liquidity" : "Connect Wallet"}
      </button>
    </div>
  );
}
