"use client";

/**
 * ConnectButton
 *
 * Displays the wallet connection state and lets the user connect/disconnect.
 *
 * HOW TO IMPLEMENT:
 * 1. Call `useWallet()` to get { address, connect, disconnect, isConnecting }.
 * 2. If `address` is null, render a "Connect Wallet" button that calls connect().
 * 3. If `address` is set, render a truncated address (first 4 + last 4 chars)
 *    with a dropdown or click handler that calls disconnect().
 * 4. While `isConnecting` is true, show a loading spinner or disabled state.
 *
 * EXAMPLE truncation helper:
 *   const short = `${address.slice(0, 4)}…${address.slice(-4)}`;
 */

import { useWallet } from "./WalletProvider";

export function ConnectButton() {
  const { address, connect, disconnect, isConnecting } = useWallet();

  // TODO: implement the connected/disconnected UI described above

  return (
    <button
      onClick={address ? disconnect : connect}
      disabled={isConnecting}
      className="px-4 py-2 rounded-lg bg-brand text-white font-medium hover:bg-brand-dark disabled:opacity-50 transition-colors"
    >
      {/* TODO: replace placeholder text with real state-driven labels */}
      {isConnecting ? "Connecting…" : address ? "Disconnect" : "Connect Wallet"}
    </button>
  );
}
