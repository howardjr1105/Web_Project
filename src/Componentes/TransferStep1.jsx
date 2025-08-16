import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { fetchUserData, fetchAllAccountsData } from "../services/apiService";

const TransferStep1 = ({ userId = "1", onComplete, onBack }) => {
  const [formData, setFormData] = useState({
    originAccount: "",
  });
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        setLoading(true);
        setError(null);
        const user = await fetchUserData(userId);
        if (user.products && user.products.length > 0) {
          const accountsData = await fetchAllAccountsData(user.products);
          const formattedAccounts = accountsData.map(acc => ({
            number: acc.account_number?.toString?.() ?? String(acc.account_number),
            alias: acc.alias,
            currency: acc.currency,
            balance: acc.balance,
          }));
          const uniqueAccounts = formattedAccounts.filter((acc, idx, self) =>
            idx === self.findIndex(a => a.number === acc.number)
          );
          setAccounts(uniqueAccounts);
        } else {
          setAccounts([]);
        }
      } catch (e) {
        setError(e.message || 'Error cargando cuentas');
      } finally {
        setLoading(false);
      }
    };
    loadAccounts();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContinue = () => {
    if (formData.originAccount && onComplete) {
      onComplete(formData.originAccount);
    }
  };

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

          <div className="flex-1 h-px bg-gray-300 mx-4"></div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mb-2">
              <span className="text-gray-600 text-sm font-medium">2</span>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Paso 2</p>
              <p className="text-xs text-gray-400">Cuenta destino</p>
            </div>
          </div>

          <div className="flex-1 h-px bg-gray-300 mx-4"></div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mb-2">
              <span className="text-gray-600 text-sm font-medium">3</span>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Paso 3</p>
              <p className="text-xs text-gray-400">Monto a transferir</p>
            </div>
          </div>

          <div className="flex-1 h-px bg-gray-300 mx-4"></div>

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

      <div className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cuenta a debitar
            </label>
            <select
              name="originAccount"
              value={formData.originAccount}
              onChange={handleInputChange}
              disabled={loading || !!error}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="" disabled>
                {loading ? 'Cargando cuentas...' : (error ? 'Error cargando cuentas' : 'Seleccione una cuenta')}
              </option>
              {accounts.map((acc) => (
                <option key={acc.number} value={acc.number}>
                  {`${acc.currency} ${acc.balance?.toLocaleString?.() ?? acc.balance} - ${acc.alias} (${acc.number})`}
                </option>
              ))}
            </select>
            {error && (
              <p className="mt-1 text-xs text-red-600">{error}</p>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-gray-200 flex justify-end gap-4">
        <button
          onClick={handleContinue}
          disabled={!formData.originAccount}
          className={`px-6 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${!formData.originAccount ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default TransferStep1;
