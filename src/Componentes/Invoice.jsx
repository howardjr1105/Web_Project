import React from 'react';
import { FaCheckCircle, FaFileInvoiceDollar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Invoice = ({ transaction, onComplete }) => {
  const navigate = useNavigate();
  
  if (!transaction) return null;

  const handleFinalize = () => {
    if (onComplete) {
      try {
        onComplete();
      } catch (e) {
        // no-op; ensure navigation still happens
      }
    }
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900">Comprobante de Transferencia</h1>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex flex-col items-center justify-center py-8 bg-green-50 rounded-lg">
          <FaCheckCircle className="text-green-500 text-5xl mb-4" />
          <h2 className="text-xl font-medium text-gray-900">¡Transferencia Exitosa!</h2>
          <p className="text-gray-600 mt-2">Tu transferencia se ha realizado correctamente</p>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
              <FaFileInvoiceDollar className="text-green-600" />
              Detalles de la transacción
            </h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {transaction.transaction_number && (
              <div className="grid grid-cols-2 p-4">
                <div className="text-sm text-gray-500">Número de transacción</div>
                <div className="text-sm font-medium text-gray-900">{transaction.transaction_number}</div>
              </div>
            )}
            {transaction.transaction_date && (
              <div className="grid grid-cols-2 p-4">
                <div className="text-sm text-gray-500">Fecha y hora</div>
                <div className="text-sm font-medium text-gray-900">
                  {new Date(transaction.transaction_date).toLocaleString()}
                </div>
              </div>
            )}
            {transaction.description && (
              <div className="grid grid-cols-2 p-4">
                <div className="text-sm text-gray-500">Descripción</div>
                <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
              </div>
            )}
            {transaction.transaction_type && (
              <div className="grid grid-cols-2 p-4">
                <div className="text-sm text-gray-500">Tipo de transacción</div>
                <div className="text-sm font-medium text-gray-900">{transaction.transaction_type}</div>
              </div>
            )}
          </div>
        </div>

        {(transaction.origin || transaction.destination) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {transaction.origin && (
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Origen</h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Cuenta: <span className="font-medium text-gray-900">{transaction.origin}</span></p>
                </div>
              </div>
            )}
            
            {transaction.destination && (
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Destino</h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Cuenta: <span className="font-medium text-gray-900">{transaction.destination}</span></p>
                </div>
              </div>
            )}
          </div>
        )}

        {transaction.amount && (
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Monto transferido</h3>
            <div className="text-center">
              <span className="text-2xl font-bold text-gray-900">
                {transaction.amount.value?.toLocaleString?.() || transaction.amount.value || '0'} {transaction.amount.currency || 'NIO'}
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
          <button
            onClick={handleFinalize}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Finalizar
          </button>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Este comprobante es válido como constancia de la transacción realizada.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
