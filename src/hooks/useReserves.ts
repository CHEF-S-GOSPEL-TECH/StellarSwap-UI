/**
 * useReserves
 *
 * Fetches the current reserves of the pair contract.
 *
 * HOW TO IMPLEMENT:
 * 1. Instantiate PairClient with env config (see useQuote.ts for the pattern).
 * 2. Call client.getReserves() which invokes the pair contract's get_reserves().
 * 3. Return [reserveA, reserveB] as bigints.
 * 4. Poll every 10 seconds (or on a manual refresh trigger) to keep reserves fresh.
 *
 * REFERENCES:
 *   - sdk/src/pair.ts — PairClient.getReserves
 *   - contracts/pair/src/lib.rs — get_reserves()
 */

import { useState, useEffect } from "react";

interface UseReservesResult {
  reserveA: bigint | null;
  reserveB: bigint | null;
  isLoading: boolean;
  refresh: () => void;
}

export function useReserves(): UseReservesResult {
  const [reserveA, setReserveA] = useState<bigint | null>(null);
  const [reserveB, setReserveB] = useState<bigint | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setIsLoading(true);

    // TODO: instantiate PairClient and call getReserves()
    // TODO: set reserveA and reserveB from the result
    // TODO: set up a 10-second polling interval (clear on cleanup)
    // Placeholder — remove once implemented
    setIsLoading(false);
  }, [tick]);

  return {
    reserveA,
    reserveB,
    isLoading,
    refresh: () => setTick((t) => t + 1),
  };
}
