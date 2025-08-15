import { useState } from "react";
import "./App.css";
import SidebarMenu from "./Componentes/SidebarMenu.jsx";
import TopBarMenu from "./Componentes/TopBarMenu.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <SidebarMenu />

      <div className="flex-1 flex flex-col">
        <TopBarMenu />

        <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
          <h1 className="text-2xl font-bold">Bienvenido a Banco LAFISE</h1>
        </main>
      </div>
    </div>
  );
}

export default App;
