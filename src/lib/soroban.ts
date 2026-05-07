/**
 * soroban.ts — Soroban RPC client singleton
 *
 * Provides a shared SorobanRpc.Server instance configured from environment variables.
 * Import this wherever you need to simulate or submit transactions.
 *
 * HOW TO USE:
 *   import { sorobanServer } from "@/lib/soroban";
 *   const result = await sorobanServer.simulateTransaction(tx);
 *
 * HOW TO EXTEND:
 * - Add a `horizonServer` export for Horizon API calls (account sequence numbers,
 *   native XLM balances).
 * - Add a `submitAndPoll(xdr)` helper that submits a signed transaction and polls
 *   getTransaction() until status is SUCCESS or FAILED (max ~30s, 2s intervals).
 *
 * REFERENCES:
 *   - @stellar/stellar-sdk — SorobanRpc.Server
 *   - https://soroban.stellar.org/docs/reference/rpc
 */

import { SorobanRpc } from "@stellar/stellar-sdk";

// Lazily initialised — avoids errors during SSR (Next.js server render)
let _server: SorobanRpc.Server | null = null;

export function sorobanServer(): SorobanRpc.Server {
  if (!_server) {
    const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;
    if (!rpcUrl) throw new Error("NEXT_PUBLIC_RPC_URL is not set");
    _server = new SorobanRpc.Server(rpcUrl, { allowHttp: rpcUrl.startsWith("http://") });
  }
  return _server;
}

/**
 * submitAndPoll
 *
 * Submits a signed transaction XDR and polls until it is confirmed or fails.
 *
 * HOW TO IMPLEMENT:
 * 1. Call server.sendTransaction(xdr) to broadcast.
 * 2. If status is PENDING, poll server.getTransaction(hash) every 2 seconds.
 * 3. Return when status is SUCCESS or throw when status is FAILED.
 * 4. Time out after 30 seconds.
 *
 * @param signedXdr — base64-encoded signed transaction XDR
 * @returns transaction hash on success
 */
export async function submitAndPoll(_signedXdr: string): Promise<string> {
  // TODO: implement submit + poll loop described above
  throw new Error("submitAndPoll not yet implemented");
}
