import React, { useState, useEffect } from "react";
import { FiCopy, FiEye, FiEyeOff } from "react-icons/fi";
import bancoLogo from "../assets/Logo_b.svg";
import { fetchUserData, fetchAllAccountsData, fetchAllTransactions } from "../services/apiService";

const Dashboard = ({ userId = "1" }) => {
  const [showBalance, setShowBalance] = useState(true);
  const [userData, setUserData] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cards = [
    {
      id: 1,
      number: "5325 •••• •••• 9033",
      holder: userData?.full_name || "Mike Smith",
      expiry: "06/22",
      type: "green",
      gradient: "from-green-600 to-green-800",
    },
    {
      id: 2,
      number: "5789 •••• •••• 2847",
      holder: userData?.full_name || "Mike Smith",
      expiry: "09/24",
      type: "blue",
      gradient: "from-blue-900 to-blue-700",
    },
    {
      id: 3,
      number: "4809 •••• •••• 2234",
      holder: userData?.full_name || "Mike Smith",
      expiry: "09/24",
      type: "black",
      gradient: "from-gray-800 to-gray-900",
    },
  ];

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const user = await fetchUserData(userId);
        setUserData(user);

        if (user.products && user.products.length > 0) {
          const accountsData = await fetchAllAccountsData(user.products);
          
          const formattedAccounts = accountsData.map(account => ({
            type: account.alias,
            number: account.account_number.toString(),
            balance: `${account.currency} ${account.balance.toLocaleString()}`,
            flag: account.currency === "NIO" ? "🇳🇮" : "🇺🇸",
            rawBalance: account.balance,
            currency: account.currency
          }));
          
          const uniqueAccounts = formattedAccounts.filter((account, index, self) =>
            index === self.findIndex(a => a.number === account.number)
          );
          
          setAccounts(uniqueAccounts);
          
          if (accountsData.length > 0) {
            const transactionsData = await fetchAllTransactions(accountsData);
            setTransactions(transactionsData);
          }
        }
      } catch (err) {
        setError(err.message);
        console.error('Error loading user data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Cargando datos del usuario...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Mis tarjetas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`bg-gradient-to-br ${card.gradient} rounded-xl p-6 text-white relative overflow-hidden`}
            >
              <div className="flex justify-between items-start mb-8">
                <div className="w-30 h-8 rounded flex items-center justify-center">
                <img src={bancoLogo} alt="Banco Lafise" className="w-100 " />
                </div>
              </div>

              <div className="space-y-4 ml-3">
                <div className="text-2xl font-mono tracking-wider">
                  {card.number}
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-xs opacity-75">Card Holder</div>
                    <div className="font-semibold">{card.holder}</div>
                  </div>
                  <div>
                    <div className="text-xs opacity-75">Expires</div>
                    <div className="font-semibold">{card.expiry}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Cuentas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {accounts.map((account, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-sm border"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">
                      {account.type}
                    </h3>
                    <span className="text-2xl">{account.flag}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-green-600">
                        {account.number}
                      </span>
                      <FiCopy className="w-4 h-4 text-green-600 cursor-pointer hover:text-gray-600" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-800">
                        {showBalance ? account.balance : "••••••"}
                      </span>
                      <button
                        onClick={() => setShowBalance(!showBalance)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {showBalance ? (
                          <FiEyeOff className="w-4 h-4" />
                        ) : (
                          <FiEye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Transacciones recientes
              </h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Ver todas
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Descripción
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Monto
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.slice(0, 10).map((transaction, index) => {
                      const formatDate = (dateString) => {
                        const date = new Date(dateString);
                        return date.toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        });
                      };

                      const isCredit = transaction.transaction_type === 'Credit';
                      const amountColor = isCredit ? 'text-green-600' : 'text-red-600';
                      const amountPrefix = isCredit ? '+' : '-';

                      return (
                        <tr key={transaction.transaction_number} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatDate(transaction.transaction_date)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {transaction.description || transaction.bank_description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              isCredit 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {transaction.transaction_type}
                            </span>
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${amountColor}`}>
                            {amountPrefix}{transaction.amount.currency} {transaction.amount.value.toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
