/**
 * TokenInput
 *
 * A reusable input field for entering a token amount alongside a token selector.
 * Used in both SwapForm and LiquidityPanel.
 *
 * Props:
 *   label       — e.g. "You pay" or "Token A"
 *   token       — currently selected token symbol (e.g. "USDC")
 *   amount      — controlled input value (string to preserve decimal input UX)
 *   onAmountChange — called when the user types a new amount
 *   onTokenChange  — called when the user selects a different token
 *   tokens      — list of available token options
 *   disabled    — disables the input (e.g. for the output field in a swap)
 *   balance     — optional: wallet balance of the selected token to display
 *
 * HOW TO IMPLEMENT:
 * 1. Render a labelled container with two columns: amount input on the left,
 *    token selector dropdown on the right.
 * 2. The amount input should accept only numeric/decimal input. Validate with
 *    a regex like /^\d*\.?\d*$/ before calling onAmountChange.
 * 3. The token selector can be a <select> or a custom dropdown. For now a
 *    <select> is fine; a styled dropdown can be added later.
 * 4. If `balance` is provided, show it below the input as "Balance: X.XX TOKEN".
 *    Add a "MAX" button that sets the amount to the full balance.
 */

export interface TokenInputProps {
  label: string;
  token: string;
  amount: string;
  onAmountChange: (value: string) => void;
  onTokenChange: (token: string) => void;
  tokens: string[];
  disabled?: boolean;
  balance?: string;
}

export function TokenInput({
  label,
  token,
  amount,
  onAmountChange,
  onTokenChange,
  tokens,
  disabled = false,
  balance,
}: TokenInputProps) {
  // TODO: implement numeric validation on input change
  // TODO: implement MAX button when balance is provided

  return (
    <div className="rounded-xl bg-surface-card border border-surface-border p-4 flex flex-col gap-2">
      <span className="text-xs text-gray-400">{label}</span>

      <div className="flex items-center gap-3">
        {/* Amount input */}
        <input
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          disabled={disabled}
          className="flex-1 bg-transparent text-2xl font-semibold outline-none placeholder-gray-600 disabled:opacity-50"
          aria-label={`${label} amount`}
        />

        {/* Token selector — TODO: replace with styled dropdown */}
        <select
          value={token}
          onChange={(e) => onTokenChange(e.target.value)}
          className="bg-surface border border-surface-border rounded-lg px-3 py-1 text-sm font-medium"
          aria-label="Select token"
        >
          {tokens.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Balance row */}
      {balance !== undefined && (
        <div className="flex justify-between text-xs text-gray-400">
          <span>Balance: {balance} {token}</span>
          {/* TODO: wire MAX button to onAmountChange(balance) */}
          <button className="text-brand hover:underline">MAX</button>
        </div>
      )}
    </div>
  );
}
