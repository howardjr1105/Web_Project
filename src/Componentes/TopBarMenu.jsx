import React from "react";
import { FaBars, FaBell } from "react-icons/fa";
import profilePic from "../assets/perfil.svg";

export default function TopBarMenu() {
  return (
    <header className="w-full h-16 bg-white shadow flex items-center justify-between px-4 lg:px-8">
      {/* Menú hamburguesa */}
      <button className="text-xl text-gray-700 hover:text-gray-900">
        <FaBars />
      </button>

      {/* Notificación + búsqueda + perfil */}
      <div className="flex items-center gap-4">
        {/* Notificaciones */}
        <button className="text-xl text-gray-700 hover:text-gray-900">
          <FaBell />
        </button>

        {/* Buscador */}
        <input
          type="text"
          placeholder="Buscar"
          className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Perfil */}
        <img
          src={profilePic}
          alt="Perfil"
          className="w-10 h-10 rounded-full object-cover border border-gray-300"
        />
      </div>
    </header>
  );
}
