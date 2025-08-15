import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";

const TransferStep1 = () => {
  const [formData, setFormData] = useState({
    transactionType: "Terceros",
    originAccount: "",
    destinationAccount: "",
    debitConcept: "",
    creditConcept: "",
    reference: "",
    confirmationEmail: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContinue = () => {
    // Logic for continuing to step 2
    console.log("Form data:", formData);
  };

  const handleBack = () => {
    // Logic for going back
    console.log("Going back");
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900">Transferir</h1>
      </div>

      {/* Step Indicator */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between max-w-2xl">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mb-2">
              <FaCheck className="text-white text-sm" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">Paso 1</p>
              <p className="text-xs text-gray-500">Cuenta origen</p>
            </div>
          </div>

          {/* Connector Line */}
          <div className="flex-1 h-px bg-gray-300 mx-4"></div>

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mb-2">
              <FaCheck className="text-white text-sm" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">Paso 2</p>
              <p className="text-xs text-gray-500">Cuenta destino</p>
            </div>
          </div>

          {/* Connector Line */}
          <div className="flex-1 h-px bg-gray-300 mx-4"></div>

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mb-2">
              <FaCheck className="text-white text-sm" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">Paso 3</p>
              <p className="text-xs text-gray-500">Monto a transferir</p>
            </div>
          </div>

          {/* Connector Line */}
          <div className="flex-1 h-px bg-gray-300 mx-4"></div>

          {/* Step 4 */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de transacción
              </label>
              <select
                name="transactionType"
                value={formData.transactionType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="Terceros">Terceros</option>
                <option value="Propias">Propias</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Concepto de débito
              </label>
              <input
                type="text"
                name="debitConcept"
                value={formData.debitConcept}
                onChange={handleInputChange}
                placeholder="Cancelación de préstamo"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Referencia
              </label>
              <input
                type="text"
                name="reference"
                value={formData.reference}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cuenta
              </label>
              <select
                name="originAccount"
                value={formData.originAccount}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">NIO Cuenta</option>
                <option value="10424667">10424667</option>
                <option value="C$ 38,456">C$ 38,456</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Concepto de crédito
              </label>
              <input
                type="text"
                name="creditConcept"
                value={formData.creditConcept}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enviar confirmación a:
              </label>
              <input
                type="email"
                name="confirmationEmail"
                value={formData.confirmationEmail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 border-t border-gray-200 flex justify-end gap-4">
        <button
          onClick={handleBack}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Atrás
        </button>
        <button
          onClick={handleContinue}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default TransferStep1;
