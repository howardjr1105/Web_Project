import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../Componentes/SidebarMenu";
import TopBarMenu from "../Componentes/TopBarMenu";
import TransferStep1 from "../Componentes/TransferStep1";
import TransferStep2 from "../Componentes/TransferStep2";
import TransferStep3 from "../Componentes/TransferStep3";
import TransferStep4 from "../Componentes/TransferStep4";
import { fetchUserData } from "../services/apiService";

const Transfer = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const userId = "1";

  const [currentStep, setCurrentStep] = useState(1);
  const [originAccount, setOriginAccount] = useState("");
  const [destinationAccount, setDestinationAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [motivo, setMotivo] = useState("");
  const [email, setEmail] = useState("");
  const [transaction, setTransaction] = useState(null);
  // Mobile sidebar state
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

  const handleStep1Complete = (selectedAccount) => {
    setOriginAccount(selectedAccount);
    setCurrentStep(2);
  };

  const handleStep2Complete = (accountNumber) => {
    setDestinationAccount(accountNumber);
    setCurrentStep(3);
  };

  const handleStep3Complete = (transferAmount) => {
    setAmount(transferAmount);
    setCurrentStep(4);
  };

  const handleStep4Complete = (data) => {
    if (data.transaction) {
      setTransaction(data.transaction);
      // We'll handle the navigation in the Invoice component
    } else {
      // If no transaction data, just navigate to home
      navigate("/");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <SidebarMenu
        activePage="Transferir"
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <TopBarMenu 
          userProfilePhoto={userData?.profile_photo}
          userName={userData?.full_name}
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        <main className="flex-1 bg-gray-50 p-6">
          {currentStep === 1 && (
            <TransferStep1 
              userId={userId}
              onComplete={handleStep1Complete}
              onBack={handleBack}
            />
          )}
          {currentStep === 2 && (
            <TransferStep2
              defaultValue={destinationAccount}
              onComplete={handleStep2Complete}
              onBack={handleBack}
              originAccount={originAccount}
            />
          )}
          {currentStep === 3 && (
            <TransferStep3
              defaultValue={amount}
              onComplete={handleStep3Complete}
              onBack={handleBack}
              originAccount={originAccount}
              destinationAccount={destinationAccount}
            />
          )}
          {currentStep === 4 && (
            <TransferStep4
              originAccount={originAccount}
              destinationAccount={destinationAccount}
              amount={amount}
              defaultMotivo={motivo}
              defaultEmail={email}
              onBack={handleBack}
              onComplete={handleStep4Complete}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Transfer;
