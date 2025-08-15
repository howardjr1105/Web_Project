const API_BASE_URL = 'http://localhost:5566';

export const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    if (!response.ok) {
      throw new Error(`Error fetching user data: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const fetchAccountData = async (accountId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/accounts/${accountId}`);
    if (!response.ok) {
      throw new Error(`Error fetching account data: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching account data:', error);
    throw error;
  }
};

export const fetchAllAccountsData = async (products) => {
  try {
    const accountPromises = products
      .filter(product => product.type === 'Account')
      .map(product => fetchAccountData(product.id));
    
    return await Promise.all(accountPromises);
  } catch (error) {
    console.error('Error fetching accounts data:', error);
    throw error;
  }
};

export const fetchAccountTransactions = async (accountId, page = 1, size = 10) => {
  try {
    const response = await fetch(`${API_BASE_URL}/accounts/${accountId}/transactions?page=${page}&size=${size}`);
    if (!response.ok) {
      throw new Error(`Error fetching transactions: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching account transactions:', error);
    throw error;
  }
};

export const fetchAllTransactions = async (accounts) => {
  try {
    const transactionPromises = accounts.map(async (account) => {
      const transactionData = await fetchAccountTransactions(account.account_number);
      return {
        accountId: account.account_number,
        transactions: transactionData.items || []
      };
    });
    
    const allTransactions = await Promise.all(transactionPromises);
    
    const flatTransactions = allTransactions.flatMap(({ accountId, transactions }) =>
      transactions.map(transaction => ({
        ...transaction,
        accountId
      }))
    );
    
    const uniqueTransactions = flatTransactions.filter((transaction, index, self) =>
      index === self.findIndex(t => t.transaction_number === transaction.transaction_number)
    );
    
    return uniqueTransactions.sort((a, b) => 
      new Date(b.transaction_date) - new Date(a.transaction_date)
    );
  } catch (error) {
    console.error('Error fetching all transactions:', error);
    throw error;
  }
};
