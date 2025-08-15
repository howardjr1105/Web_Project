import React from "react";
import { FiCopy, FiEye, FiEyeOff } from "react-icons/fi";

/**
 * Reusable account card component
 * Props:
 * - type: alias or account type name
 * - flag: emoji or icon for currency/country
 * - number: account number string
 * - balance: formatted balance string
 * - showBalance: boolean to show/hide balance
 * - onToggleShowBalance: function to toggle balance visibility
 * - onCopy: optional copy handler (defaults to copying number)
 */
const AccountCard = ({
  type,
  flag,
  number,
  balance,
  showBalance,
  onToggleShowBalance,
  onCopy,
}) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(number);
    } catch (e) {
      // no-op fallback
    }
    if (onCopy) onCopy(number);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">{type}</h3>
        <span className="text-2xl">{flag}</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-green-600">{number}</span>
          <button onClick={handleCopy} title="Copiar" aria-label="Copiar">
            <FiCopy className="w-4 h-4 text-green-600 cursor-pointer hover:text-gray-600" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-800">
            {showBalance ? balance : "••••••"}
          </span>
          <button
            onClick={onToggleShowBalance}
            className="text-gray-400 hover:text-gray-600"
            title={showBalance ? "Ocultar saldo" : "Mostrar saldo"}
            aria-label={showBalance ? "Ocultar saldo" : "Mostrar saldo"}
          >
            {showBalance ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
