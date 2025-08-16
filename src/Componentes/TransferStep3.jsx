import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";

const isPositiveNumber = (value) => {
  if (value === "") return false;
  const normalized = value.replace(",", ".");
  const num = Number(normalized);
  return Number.isFinite(num) && num > 0;
};

const sanitizeAmountInput = (value) => {
  // Allow digits and a single dot or comma as decimal separator
  let v = value.replace(/[^0-9.,]/g, "");
  const parts = v.split(/[.,]/);
  if (parts.length > 2) {
    // Keep only the first decimal separator
    v = parts[0] + "." + parts.slice(1).join("");
  } else if (v.includes(",")) {
    v = v.replace(",", ".");
  }
  return v;
};

const TransferStep3 = ({ defaultValue = "", onBack, onComplete, originAccount, destinationAccount }) => {
  const [amount, setAmount] = useState(String(defaultValue));
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    setAmount(sanitizeAmountInput(e.target.value));
  };

  const handleBlur = () => setTouched(true);

  const valid = isPositiveNumber(amount);
  const showError = touched && amount !== "" && !valid;

  const handleContinue = () => {
    if (!valid) return;
    const normalized = amount.replace(",", ".");
    const num = Number(normalized);
    if (onComplete) onComplete(num);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900">Transferir</h1>
      </div>

      {/* Step Indicator */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between max-w-2xl">
          {/* Step 1 (done) */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mb-2">
              <FaCheck className="text-white text-sm" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">Paso 1</p>
              <p className="text-xs text-gray-500">Cuenta origen</p>
            </div>
          </div>

          <div className="flex-1 h-0.5 bg-green-300 mx-4"></div>

          {/* Step 2 (done) */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mb-2">
              <FaCheck className="text-white text-sm" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">Paso 2</p>
              <p className="text-xs text-gray-500">Cuenta destino</p>
            </div>
          </div>

          <div className="flex-1 h-0.5 bg-green-300 mx-4"></div>

          {/* Step 3 (active) */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mb-2">
              <FaCheck className="text-white text-sm" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">Paso 3</p>
              <p className="text-xs text-gray-500">Monto a transferir</p>
            </div>
          </div>

          <div className="flex-1 h-px bg-gray-300 mx-4"></div>

          {/* Step 4 (pending) */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mb-2">
              <span className="text-gray-600 text-sm font-medium">4</span>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Paso 4</p>
              <p className="text-xs text-gray-400">Datos adicionales</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monto a debitar
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ingrese un monto positivo"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${showError ? 'border-red-500' : 'border-gray-300'}`}
          />
          <div className="text-xs text-gray-500">
            Solo números. Puede usar punto o coma como separador decimal. Debe ser mayor a 0.
          </div>
          {showError && (
            <p className="text-sm text-red-600">Ingrese un monto válido mayor a 0.</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 border-t border-gray-200 flex justify-end gap-4">
        {onBack && (
          <button
            onClick={onBack}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Atrás
          </button>
        )}
        <button
          onClick={handleContinue}
          disabled={!valid}
          className={`px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${!valid ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default TransferStep3;
