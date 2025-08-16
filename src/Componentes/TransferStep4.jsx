import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { fetchAccountData } from "../services/apiService";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const TransferStep4 = ({
  originAccount,
  destinationAccount,
  amount,
  defaultMotivo = "",
  defaultEmail = "",
  onBack,
  onContinue,
}) => {
  const [motivo, setMotivo] = useState(defaultMotivo);
  const [email, setEmail] = useState(defaultEmail);
  const [touched, setTouched] = useState({ motivo: false, email: false });

  const [originInfo, setOriginInfo] = useState(null);
  const [loadingOrigin, setLoadingOrigin] = useState(false);
  const [originError, setOriginError] = useState(null);

  useEffect(() => {
    const loadOrigin = async () => {
      if (!originAccount) return;
      try {
        setLoadingOrigin(true);
        setOriginError(null);
        const data = await fetchAccountData(originAccount);
        setOriginInfo(data);
      } catch (e) {
        setOriginError(e.message || "Error cargando cuenta origen");
      } finally {
        setLoadingOrigin(false);
      }
    };
    loadOrigin();
  }, [originAccount]);

  const emailValid = emailRegex.test(email);
  const motivoValid = motivo.trim().length > 0;
  const formValid = emailValid && motivoValid;

  const handleContinue = () => {
    if (!formValid) return;
    onContinue && onContinue({ motivo: motivo.trim(), email: email.trim() });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
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

          <div className="flex-1 h-0.5 bg-green-300 mx-4"></div>

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

          <div className="flex-1 h-0.5 bg-green-300 mx-4"></div>

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

          <div className="flex-1 h-0.5 bg-green-300 mx-4"></div>

          {/* Step 4 (active) */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mb-2">
              <FaCheck className="text-white text-sm" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">Paso 4</p>
              <p className="text-xs text-gray-500">Datos adicionales</p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-gray-200 shadow-sm rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Cuenta a debitar</h3>
          <p className="text-sm text-gray-600">Número: <span className="font-medium text-gray-800">{originAccount}</span></p>
          {loadingOrigin && <p className="text-sm text-gray-500 mt-1">Cargando saldo...</p>}
          {originError && <p className="text-sm text-red-600 mt-1">{originError}</p>}
          {originInfo && (
            <>
              <p className="text-sm text-gray-600 mt-1">Alias: <span className="font-medium text-gray-800">{originInfo.alias}</span></p>
              <p className="text-sm text-gray-600 mt-1">Moneda: <span className="font-medium text-gray-800">{originInfo.currency}</span></p>
              <p className="text-sm text-gray-600 mt-1">Saldo disponible: <span className="font-medium text-gray-800">{originInfo.balance?.toLocaleString?.() ?? originInfo.balance}</span></p>
            </>
          )}
        </div>
        <div className="border border-gray-200 shadow-sm rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Cuenta de destino</h3>
          <p className="text-sm text-gray-600">Número: <span className="font-medium text-gray-800">{destinationAccount}</span></p>
          <p className="text-sm text-gray-600 mt-1">Saldo a acreditar: <span className="font-medium text-gray-800">{amount?.toLocaleString?.() ?? amount}</span></p>
        </div>
      </div>

      {/* Form */}
      <div className="px-6 pb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Motivo</label>
          <input
            type="text"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, motivo: true }))}
            placeholder="Escriba el motivo de la transferencia"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${touched.motivo && !motivoValid ? 'border-red-500' : 'border-gray-300'}`}
          />
          {touched.motivo && !motivoValid && (
            <p className="text-sm text-red-600 mt-1">El motivo es obligatorio.</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Correo para notificación</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            placeholder="correo@dominio.com"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${touched.email && !emailValid ? 'border-red-500' : 'border-gray-300'}`}
          />
          {touched.email && !emailValid && (
            <p className="text-sm text-red-600 mt-1">Ingrese un correo electrónico válido.</p>
          )}
        </div>
      </div>

      {/* Actions */}
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
          disabled={!formValid}
          className={`px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${!formValid ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default TransferStep4;
