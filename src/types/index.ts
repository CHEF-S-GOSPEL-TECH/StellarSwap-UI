/**
 * Shared TypeScript types for StellarSwap UI.
 *
 * Keep domain types here so they can be imported across components and hooks
 * without circular dependencies.
 */

/** A token known to the UI */
export interface Token {
  /** SEP-41 contract address on Stellar */
  contractId: string;
  /** Display symbol, e.g. "USDC" */
  symbol: string;
  /** Display name, e.g. "USD Coin" */
  name: string;
  /** Always 7 on Stellar */
  decimals: 7;
  /** Optional logo URL */
  logoUrl?: string;
}

/** A trading pair registered in the factory */
export interface Pair {
  /** Pair contract address */
  contractId: string;
  token0: Token;
  token1: Token;
  /** Current reserves in base units (stroops equivalent) */
  reserve0: bigint;
  reserve1: bigint;
  /** LP token contract address */
  lpTokenContractId: string;
}

/** Result of a swap quote */
export interface QuoteResult {
  amountOut: bigint;
  /** Effective price: amountOut / amountIn */
  price: number;
  /** Price impact as a fraction, e.g. 0.003 = 0.3% */
  priceImpact: number;
}
