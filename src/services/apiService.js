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
