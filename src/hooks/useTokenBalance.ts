"use client";

/**
 * useTokenBalance
 *
 * Fetches the balance of a SEP-41 token for the connected wallet address.
 *
 * HOW TO IMPLEMENT:
 * 1. Get the connected wallet address from useWallet().address.
 * 2. If address is null, return { balance: null, isLoading: false }.
 * 3. Use the Soroban RPC to simulate a call to the token contract's
 *    `balance(address)` function:
 *      - Build a simulateTransaction call invoking balance(walletAddress)
 *        on the token contract at `tokenContractId`.
 *      - Parse the returned ScVal (i128) to a bigint.
 *      - Convert to display string: (Number(balance) / 1e7).toFixed(7)
 * 4. Refresh the balance after each successful transaction (pass a `refreshKey`
 *    dependency or call a returned `refresh()` function).
 *
 * NOTE:
 *   For XLM (native), use the Horizon API instead of the token contract:
 *     GET /accounts/{address} → balances[].balance where asset_type === "native"
 *
 * REFERENCES:
 *   - @stellar/stellar-sdk — SorobanRpc.Server, Contract, scValToNative
 *   - contracts/lp-token/src/lib.rs — balance() function
 */

import { useState, useEffect } from "react";
import { useWallet } from "@/components/wallet/WalletProvider";

interface UseTokenBalanceResult {
  balance: string | null;
  isLoading: boolean;
  refresh: () => void;
}

export function useTokenBalance(tokenContractId: string): UseTokenBalanceResult {
  const { address } = useWallet();
  const [balance, setBalance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!address || !tokenContractId) {
      setBalance(null);
      return;
    }

    setIsLoading(true);

    // TODO: implement balance fetch described above
    // Placeholder — remove once implemented
    setBalance(null);
    setIsLoading(false);
  }, [address, tokenContractId, tick]);

  return {
    balance,
    isLoading,
    refresh: () => setTick((t) => t + 1),
  };
}
