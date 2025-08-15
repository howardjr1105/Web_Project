import { useState } from "react";
import "./App.css";
import SidebarMenu from "./Componentes/SidebarMenu.jsx";
import TopBarMenu from "./Componentes/TopBarMenu.jsx";
import Dashboard from "./Componentes/Dashboard.jsx";

function App() {

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
}

export default App;
