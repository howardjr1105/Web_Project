import React from "react";
import SidebarMenu from "../Componentes/SidebarMenu";
import TopBarMenu from "../Componentes/TopBarMenu";
import TransactionsTable from "../Componentes/TransactionsTable";

const Transactions = () => {
  return (
    <div className="flex h-screen w-screen">
      <SidebarMenu activePage="Mis transacciones" />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <TopBarMenu />
        <main className="flex-1 bg-gray-50 p-6">
          <TransactionsTable />
        </main>
      </div>
    </div>
  );
};

export default Transactions;
