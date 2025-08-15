import React, { useState } from "react";

const TransactionsTable = () => {
  const [activeTab, setActiveTab] = useState("Movimientos");

  // Sample transaction data
  const transactions = [
    {
      date: "14/Nov/2021",
      description: "Walmart Carretera Masaya",
      debitUSD: "320.00",
      balanceUSD: "2,100"
    },
    {
      date: "14/Nov/2021",
      description: "Walmart Carretera Masaya",
      debitUSD: "320.00",
      balanceUSD: "2,100"
    },
    {
      date: "14/Nov/2021",
      description: "Walmart Carretera Masaya",
      debitUSD: "320.00",
      balanceUSD: "2,100"
    },
    {
      date: "14/Nov/2021",
      description: "Walmart Carretera Masaya",
      debitUSD: "320.00",
      balanceUSD: "2,100"
    },
    {
      date: "14/Nov/2021",
      description: "Walmart Carretera Masaya",
      debitUSD: "320.00",
      balanceUSD: "2,100"
    },
    {
      date: "14/Nov/2021",
      description: "Walmart Carretera Masaya",
      debitUSD: "320.00",
      balanceUSD: "2,100"
    },
    {
      date: "14/Nov/2021",
      description: "Walmart Carretera Masaya",
      debitUSD: "320.00",
      balanceUSD: "2,100"
    },
    {
      date: "14/Nov/2021",
      description: "Walmart Carretera Masaya",
      debitUSD: "320.00",
      balanceUSD: "2,100"
    },
    {
      date: "14/Nov/2021",
      description: "Walmart Carretera Masaya",
      debitUSD: "320.00",
      balanceUSD: "2,100"
    },
    {
      date: "14/Nov/2021",
      description: "Walmart Carretera Masaya",
      debitUSD: "320.00",
      balanceUSD: "2,100"
    },
    {
      date: "14/Nov/2021",
      description: "Walmart Carretera Masaya",
      debitUSD: "320.00",
      balanceUSD: "2,100"
    }
  ];

  const tabs = [
    { id: "Movimientos", label: "Movimientos", active: true },
    { id: "Estado", label: "Estado", active: false },
    { id: "Detalle", label: "Detalle", active: false },
    { id: "Fondo no Disponible", label: "Fondo no Disponible", active: false }
  ];

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-semibold text-gray-900">Mis Transacciones</h1>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Table Content */}
      <div className="p-6">
        {activeTab === "Movimientos" && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Débito USD
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {transaction.debitUSD}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {transaction.balanceUSD}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "Estado" && (
          <div className="text-center py-12">
            <p className="text-gray-500">Contenido del estado de transacciones</p>
          </div>
        )}

        {activeTab === "Detalle" && (
          <div className="text-center py-12">
            <p className="text-gray-500">Detalles de transacciones</p>
          </div>
        )}

        {activeTab === "Fondo no Disponible" && (
          <div className="text-center py-12">
            <p className="text-gray-500">Información de fondos no disponibles</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsTable;
