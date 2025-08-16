import React, { useState, useEffect } from "react";
import SidebarMenu from "../Componentes/SidebarMenu";
import TopBarMenu from "../Componentes/TopBarMenu";
import Dashboard from "../Componentes/Dashboard";
import { fetchUserData } from "../services/apiService";

const Home = () => {
  const [userData, setUserData] = useState(null);
  const userId = "1";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const user = await fetchUserData(userId);
        setUserData(user);
      } catch (error) {
        console.error('Error loading user data in Home:', error);
      }
    };

    loadUserData();
  }, [userId]);

  return (
    <div className="flex h-screen w-screen">
      <SidebarMenu activePage="Tablero" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <TopBarMenu 
          userProfilePhoto={userData?.profile_photo}
          userName={userData?.full_name}
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        <main className="flex-1 bg-gray-50 p-6">
          <Dashboard userId={userId} />
        </main>
      </div>
    </div>
  );
};

export default Home;
