import React from "react";
import SidebarMenu from "../Componentes/SidebarMenu";
import TopBarMenu from "../Componentes/TopBarMenu";
import Dashboard from "../Componentes/Dashboard";

const Home = () => {
  return (
    <div className="flex h-screen w-screen">
      <SidebarMenu />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <TopBarMenu />
        <main className="flex-1 bg-gray-50 p-6">
          <Dashboard />
        </main>
      </div>
    </div>
  );
};

export default Home;
