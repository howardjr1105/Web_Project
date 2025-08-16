import React, { useState, useEffect } from "react";
import SidebarMenu from "../Componentes/SidebarMenu";
import TopBarMenu from "../Componentes/TopBarMenu";
import TransferStep1 from "../Componentes/TransferStep1";
import TransferStep2 from "../Componentes/TransferStep2";
import { fetchUserData } from "../services/apiService";

const Transfer = () => {
  const [userData, setUserData] = useState(null);
  const userId = "1";

  const [step, setStep] = useState(1);
  const [originAccount, setOriginAccount] = useState("");
  const [destinationAccount, setDestinationAccount] = useState("");

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
      <SidebarMenu activePage="Transferir" />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <TopBarMenu 
        userProfilePhoto={userData?.profile_photo}
          userName={userData?.full_name}/>
        <main className="flex-1 bg-gray-50 p-6">
          {step === 1 && (
            <TransferStep1 
              userId={userId}
              onContinue={({ originAccount }) => {
                setOriginAccount(originAccount);
                setStep(2);
              }}
            />
          )}
          {step === 2 && (
            <TransferStep2
              defaultValue={destinationAccount}
              onBack={() => setStep(1)}
              onContinue={({ destinationAccount }) => {
                setDestinationAccount(destinationAccount);
                // TODO: proceed to Step 3 component when available
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Transfer;
