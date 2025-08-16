import React, { useEffect, useState } from "react";
import SidebarMenu from "../Componentes/SidebarMenu";
import TopBarMenu from "../Componentes/TopBarMenu";
import TransactionsTable from "../Componentes/TransactionsTable";
import { fetchUserData, fetchAllAccountsData, fetchAllTransactions } from "../services/apiService";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const userId = "1";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const user = await fetchUserData(userId);
        setUserData(user);

        if (user.products && user.products.length > 0) {
          const accountsData = await fetchAllAccountsData(user.products);
          if (accountsData.length > 0) {
            const tx = await fetchAllTransactions(accountsData);
            setTransactions(tx);
          }
        }
      } catch (e) {
        setError(e.message || "Error loading transactions");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId]);
  return (
    <div className="flex h-screen w-screen">
      <SidebarMenu activePage="Mis transacciones" isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <TopBarMenu
          userProfilePhoto={userData?.profile_photo}
          userName={userData?.full_name}
          onMenuClick={() => setIsSidebarOpen(true)}
        />
        <main className="flex-1 bg-gray-50 p-6">
          <TransactionsTable transactions={transactions} loading={loading} error={error} />
        </main>
      </div>
    </div>
  );
};

export default Transactions;
