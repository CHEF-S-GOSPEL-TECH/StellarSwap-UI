"use client";

/**
 * WalletProvider
 *
 * Wraps the app with Stellar Wallets Kit context so any component can access
 * the connected wallet and account address.
 *
 * We use @creit.tech/stellar-wallets-kit which supports Freighter (the standard
 * Stellar browser wallet) and other SEP-7 compatible wallets.
 *
 * HOW TO IMPLEMENT:
 * 1. Import StellarWalletsKit and WalletNetwork from "@creit.tech/stellar-wallets-kit".
 * 2. Instantiate the kit:
 *      const kit = new StellarWalletsKit({
 *        network: WalletNetwork.TESTNET,   // or MAINNET for production
 *        selectedWalletId: FREIGHTER_ID,   // default to Freighter
 *        modules: allowAllModules(),       // enable all supported wallets
 *      });
 * 3. Create a React context (WalletContext) that exposes:
 *      - kit: the StellarWalletsKit instance
 *      - address: string | null  (connected account public key)
 *      - connect(): opens the wallet selection modal
 *      - disconnect(): clears the session
 * 4. On mount, attempt to restore a previous session by calling kit.getAddress()
 *    and storing the result in state.
 * 5. Provide the context value via <WalletContext.Provider>.
 *
 * REFERENCE:
 * - https://stellarwalletskit.dev
 * - Freighter docs: https://docs.freighter.app
 */

import React, { createContext, useContext } from "react";

// ---------------------------------------------------------------------------
// Context shape — expand this as wallet features are added
// ---------------------------------------------------------------------------
interface WalletContextValue {
  /** Connected wallet's public key, or null if not connected */
  address: string | null;
  /** Opens the wallet selection modal */
  connect: () => Promise<void>;
  /** Disconnects the current wallet session */
  disconnect: () => void;
  /** True while a connection attempt is in progress */
  isConnecting: boolean;
}

const WalletContext = createContext<WalletContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider — TODO: implement wallet kit initialisation (see HOW TO IMPLEMENT)
// ---------------------------------------------------------------------------
export function WalletProvider({ children }: { children: React.ReactNode }) {
  // TODO: initialise StellarWalletsKit here
  // TODO: manage address state with useState
  // TODO: implement connect() — call kit.openModal() and store the returned address
  // TODO: implement disconnect() — clear address state

  const stub: WalletContextValue = {
    address: null,
    connect: async () => { throw new Error("WalletProvider not implemented"); },
    disconnect: () => {},
    isConnecting: false,
  };

  return (
    <WalletContext.Provider value={stub}>
      {children}
    </WalletContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook — use this in any component that needs wallet access
// ---------------------------------------------------------------------------
export function useWallet(): WalletContextValue {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used inside <WalletProvider>");
  return ctx;
}
