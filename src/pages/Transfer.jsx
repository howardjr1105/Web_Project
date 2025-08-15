import React from "react";
import SidebarMenu from "../Componentes/SidebarMenu";
import TopBarMenu from "../Componentes/TopBarMenu";
import TransferStep1 from "../Componentes/TransferStep1";

const Transfer = () => {
  return (
    <div className="flex h-screen w-screen">
      <SidebarMenu activePage="Transferir" />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <TopBarMenu />
        <main className="flex-1 bg-gray-50 p-6">
          <TransferStep1 />
        </main>
      </div>
    </div>
  );
};

export default Transfer;
