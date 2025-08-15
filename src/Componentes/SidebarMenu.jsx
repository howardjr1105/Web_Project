import React from "react";
import bancoLogo from "../assets/Logo_v.svg";
import {
  FaExchangeAlt,
  FaMoneyCheckAlt,
  FaCog,
  FaWallet,
  FaListAlt,
} from "react-icons/fa";
import { HiArrowsRightLeft } from "react-icons/hi2";

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
      <aside className="hidden lg:flex lg:w-64 h-screen bg-white text-black flex-col shadow-md">
        <div className="flex-1 flex flex-col">
          <div className="flex-shrink-0">
            <img src={bancoLogo} alt="Banco Lafise" className="w-60 mb-2 px-2" />
          </div>
          <nav className="flex-1 space-y-1 px-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="flex items-center pl-4 py-1.5 gap-2 rounded hover:bg-gray-100 transition w-full text-left text-sm"
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-shrink-0 bg-white p-3 border-t border-gray-200">
          <h3 className="text-xl font-medium mb-2 text-black-800">Tasa de cambio</h3>
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 justify-between w-full">
                <select className="text-xs border-gray-300 rounded px-1 py-0.5 bg-white p-6 h-8 w-20 shadow-sm">
                    <option>Cordoba</option>
                  </select>
                  <select className="text-xs border-gray-300 rounded px-1 py-0.5 bg-white p-6 h-8 w-20 shadow-sm">
                    <option>USD</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-5 pt-3">
                <div className="flex flex-col gap-0.5 text-center">
                  <span className="text-s">NIO: 36.32</span>
                </div>
                <div className="flex items-center justify-center">
                  <div className="bg-green-500 rounded-full p-1.5">
                    <HiArrowsRightLeft className="text-white text-s" />
                  </div>
                </div>
                <div className="flex flex-col gap-0.5 text-center">
                  <span className="text-s">USD: 37.07</span>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 space-y-0.5">
                <p className="truncate">IP: 190.49.57.4.23</p>
                <p className="truncate">Último: 2025/08/15 08:21</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
