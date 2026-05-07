"use client";

/**
 * SwapForm
 *
 * The main swap interface. Lets the user select two tokens, enter an amount,
 * see a price quote, and submit a swap transaction.
 *
 * HOW TO IMPLEMENT:
 *
 * STATE:
 *   - tokenIn / tokenOut  — selected token symbols (strings)
 *   - amountIn            — user-typed input amount (string)
 *   - amountOut           — quoted output amount (string, read-only)
 *   - isLoading           — true while fetching a quote or submitting a tx
 *   - error               — error message string or null
 *
 * QUOTE FLOW:
 *   1. When `amountIn` changes (debounce ~400ms), call `useQuote(tokenIn, amountIn)`.
 *   2. `useQuote` calls RouterClient.quote() which calls the pair contract's
 *      `get_quote(token_in, amount_in)` via Soroban RPC simulation.
 *   3. Display the returned amount in the output TokenInput (disabled).
 *   4. Show the effective exchange rate below: "1 TOKEN_IN ≈ X TOKEN_OUT".
 *
 * SWAP FLOW:
 *   1. On "Swap" button click, check wallet is connected (useWallet().address).
 *   2. Call RouterClient.buildSwapTx(address, tokenIn, amountIn, slippageBps).
 *      - slippageBps default: 50 (0.5%). Let the user adjust via a settings modal.
 *   3. Sign the returned XDR with the wallet kit: kit.signTransaction(xdr).
 *   4. Submit the signed XDR via Soroban RPC: server.sendTransaction(tx).
 *   5. Poll server.getTransaction(hash) until status is SUCCESS or FAILED.
 *   6. On success: clear amountIn, refresh quote, show success toast.
 *   7. On failure: show error message from the contract's error code.
 *
 * TOKEN FLIP:
 *   - The "↕" button swaps tokenIn ↔ tokenOut and amountIn ↔ amountOut.
 *
 * SLIPPAGE:
 *   - Default 0.5% (50 bps). Add a settings icon that opens a SlippageModal.
 *   - min_amount_out = amountOut * (1 - slippage). Pass to buildSwapTx.
 *
 * REFERENCES:
 *   - sdk/src/router.ts — RouterClient.buildSwapTx
 *   - sdk/src/pair.ts   — PairClient.getQuote
 *   - contracts/pair/src/lib.rs — swap() contract entry point
 */

import { useState } from "react";
import { TokenInput } from "@/components/ui/TokenInput";
import { useWallet } from "@/components/wallet/WalletProvider";
import { useQuote } from "@/hooks/useQuote";

// Placeholder token list — replace with dynamic list from the factory contract
// once factory.get_pair() is implemented.
const TOKENS = ["XLM", "USDC"];

export function SwapForm() {
  const { address, connect } = useWallet();

  const [tokenIn, setTokenIn] = useState(TOKENS[0]);
  const [tokenOut, setTokenOut] = useState(TOKENS[1]);
  const [amountIn, setAmountIn] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: pass real contract addresses from env once pair is deployed
  const { amountOut, isLoading: isQuoting } = useQuote(tokenIn, amountIn);

  /** Flip the token pair and amounts */
  function handleFlip() {
    // TODO: swap tokenIn ↔ tokenOut and amountIn ↔ amountOut
    setTokenIn(tokenOut);
    setTokenOut(tokenIn);
    setAmountIn(amountOut ?? "");
  }

  async function handleSwap() {
    if (!address) {
      await connect();
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      // TODO:
      // 1. Validate amountIn is a positive number
      // 2. Build the swap transaction via RouterClient.buildSwapTx()
      // 3. Sign with wallet kit
      // 4. Submit and poll for result
      // 5. Show success feedback
      throw new Error("Swap not yet implemented — see HOW TO IMPLEMENT above");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md flex flex-col gap-3">
      {/* Input token */}
      <TokenInput
        label="You pay"
        token={tokenIn}
        amount={amountIn}
        onAmountChange={setAmountIn}
        onTokenChange={setTokenIn}
        tokens={TOKENS.filter((t) => t !== tokenOut)}
        // TODO: pass real wallet balance from useTokenBalance(tokenIn)
      />

      {/* Flip button */}
      <div className="flex justify-center">
        <button
          onClick={handleFlip}
          aria-label="Flip tokens"
          className="p-2 rounded-full bg-surface-card border border-surface-border hover:bg-surface-border transition-colors"
        >
          ↕
        </button>
      </div>

      {/* Output token */}
      <TokenInput
        label="You receive"
        token={tokenOut}
        amount={isQuoting ? "…" : (amountOut ?? "")}
        onAmountChange={() => {}} // read-only
        onTokenChange={setTokenOut}
        tokens={TOKENS.filter((t) => t !== tokenIn)}
        disabled
      />

      {/* TODO: add exchange rate display, e.g. "1 XLM ≈ 0.09 USDC" */}

      {/* Error */}
      {error && (
        <p className="text-red-400 text-sm text-center" role="alert">
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        onClick={handleSwap}
        disabled={isSubmitting || isQuoting || !amountIn}
        className="w-full py-3 rounded-xl bg-brand text-white font-semibold hover:bg-brand-dark disabled:opacity-50 transition-colors"
      >
        {isSubmitting ? "Swapping…" : address ? "Swap" : "Connect Wallet"}
      </button>
    </div>
  );
}
