import React from "react";
import bancoLogo from "../assets/Logo_b.svg";

/**
 * Reusable card component
 * Props:
 * - type: visual variant, e.g., "green" | "blue" | "black" | "gray" | etc.
 * - number: masked card number text
 * - holder: card holder name
 * - expiry: expiry string
 */
const Card = ({ type = "gray", number, holder, expiry }) => {
  // Normalize unsupported tailwind color like "black" to a valid scale color
  const color = type === "black" ? "gray" : type;
  const gradient = `from-${color}-700 to-${color}-900`;
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-xl p-6 text-white relative overflow-hidden`}>
      <div className="flex justify-between items-start mb-8">
        <div className="w-30 h-8 rounded flex items-center justify-center">
          <img src={bancoLogo} alt="Banco Lafise" className="w-100 " />
        </div>
      </div>

      <div className="space-y-4 ml-3">
        <div className="text-2xl font-mono tracking-wider">{number}</div>

        <div className="flex justify-between items-end">
          <div>
            <div className="text-xs opacity-75">Card Holder</div>
            <div className="font-semibold">{holder}</div>
          </div>
          <div>
            <div className="text-xs opacity-75">Expires</div>
            <div className="font-semibold">{expiry}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
