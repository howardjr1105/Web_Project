import React, { useEffect, useState } from "react";
import { FaCheck, FaCheckCircle, FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";
import { fetchAccountData } from "../services/apiService";
import Invoice from "./Invoice";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const TransferStep4 = ({
  originAccount,
  destinationAccount,
  amount,
  defaultMotivo = "",
  defaultEmail = "",
  onBack,
  onComplete,
}) => {
  const [motivo, setMotivo] = useState(defaultMotivo);
  const [email, setEmail] = useState(defaultEmail);
  const [touched, setTouched] = useState({ motivo: false, email: false });
  const [originInfo, setOriginInfo] = useState(null);
  const [loadingOrigin, setLoadingOrigin] = useState(false);
  const [originError, setOriginError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);

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

  const hasInsufficientBalance = originInfo && amount > originInfo.balance;

  const handleContinue = async () => {
    if (!formValid) return;

    if (hasInsufficientBalance) {
      setNotification({
        type: 'error',
        message: 'Saldo insuficiente. El monto a transferir es superior al saldo disponible en la cuenta de origen.'
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setNotification(null);

      const response = await fetch('http://localhost:5566/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          origin: originAccount,
          destination: destinationAccount,
          amount: {
            currency: originInfo?.currency || 'NIO',
            value: amount
          }
        })
      });

      if (response.ok) {
        const transactionData = await response.json();
        setTransaction(transactionData);
        setShowInvoice(true);
      } else {
        throw new Error(`Error en la transacción: ${response.status}`);
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Error en la transacción. Por favor, vuelva a intentarlo.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleComplete = () => {
    onComplete && onComplete({ 
      motivo: motivo.trim(), 
      email: email.trim(),
      transaction
    });
  };

  if (showInvoice && transaction) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <Invoice 
            transaction={transaction} 
            onComplete={handleComplete} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900">Transferir</h1>
      </div>

      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between max-w-2xl">
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

      {/* Notification */}
      {notification && (
        <div className={`mx-6 mt-6 p-4 rounded-md flex items-center gap-3 ${
          notification.type === 'success' 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          {notification.type === 'success' ? (
            <FaCheckCircle className="text-green-600 text-lg" />
          ) : (
            <FaExclamationTriangle className="text-red-600 text-lg" />
          )}
          <p className={`text-sm ${
            notification.type === 'success' ? 'text-green-800' : 'text-red-800'
          }`}>
            {notification.message}
          </p>
        </div>
      )}

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
              <p className="text-sm text-gray-600 mt-1">Saldo disponible: <span className={`font-medium ${hasInsufficientBalance ? 'text-red-600' : 'text-gray-800'}`}>{originInfo.balance?.toLocaleString?.() ?? originInfo.balance}</span></p>
              {hasInsufficientBalance && (
                <p className="text-xs text-red-600 mt-1">⚠️ Saldo insuficiente para esta transferencia</p>
              )}
            </>
          )}
        </div>
        <div className="border border-gray-200 shadow-sm rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Cuenta de destino</h3>
          <p className="text-sm text-gray-600">Número: <span className="font-medium text-gray-800">{destinationAccount}</span></p>
          <p className="text-sm text-gray-600 mt-1">Moneda: <span className="font-medium text-gray-800">{originInfo?.currency || 'NIO'}</span></p>
          <p className="text-sm text-gray-600 mt-1">Saldo a acreditar: <span className="font-medium text-gray-800">{amount?.toLocaleString?.() ?? amount}</span></p>
        </div>
      </div>

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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
          />
          {touched.email && !emailValid && (
            <p className="text-sm text-red-600 mt-1">Ingrese un correo electrónico válido.</p>
          )}
        </div>
      </div>

      <div className="p-6 border-t border-gray-200 flex justify-end gap-4">
        {onBack && (
          <button
            onClick={onBack}
            disabled={isSubmitting}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Atrás
          </button>
        )}
        <button
          onClick={handleContinue}
          disabled={!formValid || isSubmitting}
          className={`px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${!formValid || isSubmitting ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
        >
          {isSubmitting ? 'Procesando...' : 'Continuar'}
        </button>
      </div>
    </div>
  );
};

export default TransferStep4;
