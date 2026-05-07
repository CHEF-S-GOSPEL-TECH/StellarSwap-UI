"use client";

/**
 * AddLiquidityForm
 *
 * Lets the user deposit token A and token B into the pair to receive LP tokens.
 *
 * HOW TO IMPLEMENT:
 *
 * STATE:
 *   - amountA / amountB — user-typed amounts (strings)
 *   - isSubmitting      — true while tx is in flight
 *   - error             — error string or null
 *
 * PROPORTIONAL AMOUNT CALCULATION:
 *   When the user types amountA, auto-calculate amountB using the library helper:
 *     import { quote } from the core SDK (sdk/src/library.ts)
 *     amountB = quote(BigInt(amountA * 1e7), reserveA, reserveB) / 1e7
 *   Fetch reserves via PairClient.getReserves().
 *   If reserves are 0 (first deposit), the user sets both amounts freely.
 *
 * ADD LIQUIDITY FLOW:
 *   1. Validate both amounts are positive numbers.
 *   2. Call PairClient.addLiquidity(address, amountA, amountB) to get unsigned XDR.
 *      NOTE: The pair contract derives deposited amounts from balance deltas —
 *      the SDK must first build token transfer operations, then call add_liquidity(to).
 *      See docs/architecture.md — "Add Liquidity" data flow.
 *   3. Sign with wallet kit.
 *   4. Submit and poll for result.
 *   5. On success: show LP tokens minted, clear form.
 *
 * MINIMUM LIQUIDITY NOTE:
 *   On the very first deposit, MINIMUM_LIQUIDITY (1,000 base units) is permanently
 *   locked. The user receives sqrt(amountA * amountB) - 1000 LP tokens.
 *   Display a notice when reserves are 0.
 *
 * REFERENCES:
 *   - sdk/src/pair.ts — PairClient.addLiquidity
 *   - sdk/src/library.ts — quote() helper
 *   - contracts/pair/src/math.rs — calc_lp_tokens_to_mint
 *   - docs/architecture.md — Add Liquidity data flow
 */

import { useState } from "react";
import { TokenInput } from "@/components/ui/TokenInput";
import { useWallet } from "@/components/wallet/WalletProvider";

const TOKENS = ["XLM", "USDC"];

export function AddLiquidityForm() {
  const { address, connect } = useWallet();

  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * When the user changes amountA, auto-fill amountB proportionally.
   * TODO: fetch reserves and call the quote() helper from sdk/src/library.ts.
   */
  function handleAmountAChange(value: string) {
    setAmountA(value);
    // TODO: if reserves > 0, compute amountB = quote(value, reserveA, reserveB)
    //       and call setAmountB with the result
  }

  async function handleAddLiquidity() {
    if (!address) {
      await connect();
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      // TODO: implement add liquidity flow described above
      throw new Error("Add liquidity not yet implemented — see HOW TO IMPLEMENT above");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <TokenInput
        label="Token A"
        token={TOKENS[0]}
        amount={amountA}
        onAmountChange={handleAmountAChange}
        onTokenChange={() => {}}
        tokens={[TOKENS[0]]}
        // TODO: pass real balance from useTokenBalance(TOKENS[0])
      />

      <TokenInput
        label="Token B"
        token={TOKENS[1]}
        amount={amountB}
        onAmountChange={setAmountB}
        onTokenChange={() => {}}
        tokens={[TOKENS[1]]}
        // TODO: pass real balance from useTokenBalance(TOKENS[1])
      />

      {/* TODO: show "First deposit — MINIMUM_LIQUIDITY will be locked" notice when reserves are 0 */}

      {error && (
        <p className="text-red-400 text-sm text-center" role="alert">
          {error}
        </p>
      )}

      <button
        onClick={handleAddLiquidity}
        disabled={isSubmitting || !amountA || !amountB}
        className="w-full py-3 rounded-xl bg-brand text-white font-semibold hover:bg-brand-dark disabled:opacity-50 transition-colors"
      >
        {isSubmitting ? "Adding…" : address ? "Add Liquidity" : "Connect Wallet"}
      </button>
    </div>
  );
}
