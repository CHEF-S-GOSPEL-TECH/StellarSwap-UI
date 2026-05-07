import type { Metadata } from "next";
import "./globals.css";
import { WalletProvider } from "@/components/wallet/WalletProvider";
import { Navbar } from "@/components/ui/Navbar";

export const metadata: Metadata = {
  title: "StellarSwap",
  description: "A constant-product AMM on Stellar",
};

/**
 * Root layout — wraps every page.
 *
 * HOW TO EXTEND:
 * - Add global providers (toast notifications, theme, etc.) inside <WalletProvider>.
 * - Keep this file thin. Page-level layout belongs in each page's own layout.tsx.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>
          <Navbar />
          <main className="min-h-screen px-4 py-8 max-w-5xl mx-auto">
            {children}
          </main>
        </WalletProvider>
      </body>
    </html>
  );
}
