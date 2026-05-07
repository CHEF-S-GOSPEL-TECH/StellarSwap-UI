/**
 * Navbar
 *
 * Top navigation bar with the app logo, page links, and wallet connect button.
 *
 * HOW TO IMPLEMENT:
 * 1. Use Next.js <Link> for client-side navigation between "/" (Swap) and "/liquidity".
 * 2. Highlight the active route using Next.js `usePathname()` hook.
 * 3. Place <ConnectButton /> on the right side.
 *
 * ACCESSIBILITY:
 * - Use a <nav> element with aria-label="Main navigation".
 * - Ensure active link has aria-current="page".
 */

import Link from "next/link";
import { ConnectButton } from "@/components/wallet/ConnectButton";

export function Navbar() {
  return (
    <nav
      aria-label="Main navigation"
      className="flex items-center justify-between px-6 py-4 border-b border-surface-border bg-surface-card"
    >
      {/* Logo */}
      <Link href="/" className="text-xl font-bold text-brand">
        StellarSwap
      </Link>

      {/* Page links — TODO: add active state via usePathname() */}
      <div className="flex gap-6 text-sm font-medium">
        <Link href="/" className="hover:text-brand transition-colors">
          Swap
        </Link>
        <Link href="/liquidity" className="hover:text-brand transition-colors">
          Liquidity
        </Link>
      </div>

      {/* Wallet */}
      <ConnectButton />
    </nav>
  );
}
