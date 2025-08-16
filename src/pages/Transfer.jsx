import React, { useState, useEffect } from "react";
import SidebarMenu from "../Componentes/SidebarMenu";
import TopBarMenu from "../Componentes/TopBarMenu";
import TransferStep1 from "../Componentes/TransferStep1";
import TransferStep2 from "../Componentes/TransferStep2";
import TransferStep3 from "../Componentes/TransferStep3";
import TransferStep4 from "../Componentes/TransferStep4";
import { fetchUserData } from "../services/apiService";

const Transfer = () => {
  const [userData, setUserData] = useState(null);
  const userId = "1";

  const [step, setStep] = useState(1);
  const [originAccount, setOriginAccount] = useState("");
  const [destinationAccount, setDestinationAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [motivo, setMotivo] = useState("");
  const [email, setEmail] = useState("");

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
                setStep(3);
              }}
            />
          )}
          {step === 3 && (
            <TransferStep3
              defaultValue={amount}
              onBack={() => setStep(2)}
              onContinue={({ amount }) => {
                setAmount(amount);
                setStep(4);
              }}
            />
          )}
          {step === 4 && (
            <TransferStep4
              originAccount={originAccount}
              destinationAccount={destinationAccount}
              amount={amount}
              defaultMotivo={motivo}
              defaultEmail={email}
              onBack={() => setStep(3)}
              onContinue={({ motivo, email }) => {
                setMotivo(motivo);
                setEmail(email);
                // TODO: Confirm/submit transfer step here
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Transfer;
