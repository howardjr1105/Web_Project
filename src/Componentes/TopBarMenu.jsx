import React from "react";
import { FaBars, FaBell } from "react-icons/fa";

export default function TopBarMenu({ userProfilePhoto, userName, onMenuClick }) {
  return (
    <header className="w-full h-16 bg-white shadow flex items-center justify-between px-4 lg:px-8 py-2">
      <button
        className="text-xl text-gray-700 hover:text-gray-900 lg:hidden"
        onClick={onMenuClick}
        aria-label="Abrir menú"
      >
        <FaBars />
      </button>

      <div className="flex items-center gap-4 ml-auto">
        <button className="text-xl text-gray-700 hover:text-gray-900">
          <FaBell />
        </button>

        <input
          type="text"
          placeholder="Buscar"
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hidden sm:block"
        />

        <img
          src={userProfilePhoto}
          alt={userName || "Perfil"}
          className="w-10 h-10 rounded-full object-cover border border-gray-300"
        />
      </div>
    </header>
  );
}
