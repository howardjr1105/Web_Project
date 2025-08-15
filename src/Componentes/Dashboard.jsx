import React from "react";
import { FiCopy, FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import bancoLogo from "../assets/Logo_b.svg";

const Dashboard = () => {
  const [showBalance, setShowBalance] = useState(true);

  const cards = [
    {
      id: 1,
      number: "5325 •••• •••• 9033",
      holder: "Mike Smith",
      expiry: "06/22",
      type: "green",
      gradient: "from-green-600 to-green-800",
    },
    {
      id: 2,
      number: "5789 •••• •••• 2847",
      holder: "Mike Smith",
      expiry: "09/24",
      type: "blue",
      gradient: "from-blue-900 to-blue-700",
    },
    {
      id: 3,
      number: "4809 •••• •••• 2234",
      holder: "Mike Smith",
      expiry: "09/24",
      type: "black",
      gradient: "from-gray-800 to-gray-900",
    },
  ];

  const accounts = [
    {
      type: "NIO Cuenta",
      number: "10234567",
      balance: "C$ 38,456",
      flag: "🇳🇮",
    },
    {
      type: "USD Cuenta",
      number: "10239849",
      balance: "USD 22,380",
      flag: "🇺🇸",
    },
    {
      type: "USD Cuenta",
      number: "10638567",
      balance: "USD 12,400",
      flag: "🇺🇸",
    },
  ];

  const transactions = [
    {
      date: "14/11/2021",
      description: "Walmart",
      debit: "320.00",
      balance: "2,100",
    },
    {
      date: "12/11/2021",
      description: "Hugo Delivery",
      debit: "12.45",
      balance: "2,100",
    },
    {
      date: "14/Nov/2021",
      description: "Walmart Carretera Masaya",
      debit: "320.00",
      balance: "2,100",
    },
  ];

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

      {/* Main Content */}
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
                      <span className="text-sm text-gray-600">
                        {account.number}
                      </span>
                      <FiCopy className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
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
                        Débito USD
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Balance USD
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((transaction, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transaction.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transaction.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transaction.debit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transaction.balance}
                        </td>
                      </tr>
                    ))}
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
