import React from "react";
import bancoLogo from "../assets/Logo.svg";
import {
  FaExchangeAlt,
  FaMoneyCheckAlt,
  FaCog,
  FaWallet,
  FaListAlt,
} from "react-icons/fa";

const menuItems = [
  { label: "Tablero", icon: <FaListAlt /> },
  { label: "Transferir", icon: <FaExchangeAlt /> },
  { label: "Pagar", icon: <FaMoneyCheckAlt /> },
  { label: "Mis transacciones", icon: <FaWallet /> },
  { label: "Gestionar", icon: <FaCog /> },
  { label: "Cheques", icon: <FaMoneyCheckAlt /> },
  { label: "Administrar", icon: <FaCog /> },
  { label: "Ahorro automático", icon: <FaWallet /> },
  { label: "Configuración", icon: <FaCog /> },
];

export default function SidebarMenu() {
  return (
    <div className="h-screen m-0 p-0">
      <aside className="hidden lg:flex lg:w-64 h-screen bg-white text-black flex-col justify-between shadow-md">
        <div className="pt-0">
          <img src={bancoLogo} alt="Banco Lafise" className="w-80 mb-4" />
          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="flex items-center pl-8 pt-2 pb-2 gap-3 rounded hover:bg-gray-100 transition w-full shadow hover:shadow-md text-left"
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="bg-gray-100 p-4 text-sm border-t border-gray-300">
          <div className="mb-1">
            💱 <strong>Tasa de cambio</strong>
          </div>
          <div className="flex justify-between">
            <span>NIO: 36.32</span>
            <span>USD: 37.07</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
