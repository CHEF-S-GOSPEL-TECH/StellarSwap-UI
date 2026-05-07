"use client";

/**
 * LiquidityPanel
 *
 * Tabbed interface for adding and removing liquidity from a pair.
 *
 * HOW TO IMPLEMENT:
 *
 * TABS:
 *   - "Add Liquidity" tab — renders <AddLiquidityForm />
 *   - "Remove Liquidity" tab — renders <RemoveLiquidityForm />
 *   Use local state (activeTab: "add" | "remove") to toggle between them.
 *
 * POOL STATS (optional, add after pair contract is live):
 *   - Show current reserves from PairClient.getReserves().
 *   - Show the user's LP token balance and their % share of the pool.
 *   - Read LP balance via the lp-token contract's balance(address) function.
 */

import { useState } from "react";
import { AddLiquidityForm } from "./AddLiquidityForm";
import { RemoveLiquidityForm } from "./RemoveLiquidityForm";

type Tab = "add" | "remove";

export function LiquidityPanel() {
  const [activeTab, setActiveTab] = useState<Tab>("add");

  return (
    <div className="w-full max-w-md flex flex-col gap-4">
      {/* Tab switcher */}
      <div className="flex rounded-xl overflow-hidden border border-surface-border">
        {(["add", "remove"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            aria-pressed={activeTab === tab}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-brand text-white"
                : "bg-surface-card text-gray-400 hover:text-white"
            }`}
          >
            {tab === "add" ? "Add Liquidity" : "Remove Liquidity"}
          </button>
        ))}
      </div>

      {/* Active form */}
      {activeTab === "add" ? <AddLiquidityForm /> : <RemoveLiquidityForm />}
    </div>
  );
}
