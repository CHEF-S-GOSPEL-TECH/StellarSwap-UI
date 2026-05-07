"use client";

/**
 * useQuote
 *
 * Fetches a price quote from the pair contract for a given input token and amount.
 * Debounces the input to avoid hammering the RPC on every keystroke.
 *
 * HOW TO IMPLEMENT:
 * 1. Import PairClient from sdk/src/pair.ts (or the compiled SDK package once published).
 * 2. Instantiate PairClient with config from environment variables:
 *      const client = new PairClient({
 *        contractId: process.env.NEXT_PUBLIC_PAIR_CONTRACT_ID!,
 *        rpcUrl: process.env.NEXT_PUBLIC_RPC_URL!,
 *        networkPassphrase: process.env.NEXT_PUBLIC_NETWORK_PASSPHRASE!,
 *      });
 * 3. In a useEffect, debounce `amountIn` by ~400ms, then call:
 *      const out = await client.getQuote(tokenIn, BigInt(Math.round(parseFloat(amountIn) * 1e7)));
 *    Convert the result back to a display string: (Number(out) / 1e7).toString()
 * 4. Handle the case where amountIn is empty or zero — set amountOut to null.
 * 5. Handle errors (e.g. no liquidity) — set amountOut to null and expose error.
 *
 * NOTE on units:
 *   All amounts in the contract are in base units (stroops equivalent, 7 decimals).
 *   Multiply display values by 1e7 before passing to the contract.
 *   Divide contract values by 1e7 before displaying.
 *
 * REFERENCES:
 *   - sdk/src/pair.ts — PairClient.getQuote
 *   - contracts/pair/src/lib.rs — get_quote()
 */

import { useState, useEffect } from "react";

interface UseQuoteResult {
  amountOut: string | null;
  isLoading: boolean;
  error: string | null;
}

export function useQuote(tokenIn: string, amountIn: string): UseQuoteResult {
  const [amountOut, setAmountOut] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!amountIn || parseFloat(amountIn) <= 0) {
      setAmountOut(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    // TODO: debounce this effect by 400ms using a cleanup timeout
    // TODO: instantiate PairClient and call getQuote(tokenIn, amountIn)
    // TODO: convert result from base units to display string
    // TODO: handle "no liquidity" error gracefully

    const timer = setTimeout(() => {
      // Placeholder — remove once PairClient is implemented
      setAmountOut(null);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [tokenIn, amountIn]);

  return { amountOut, isLoading, error };
}
