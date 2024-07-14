import axios from 'axios';

const API_BASE_URL = 'https://api.coingecko.com/api/v3';

export const fetchData = async (endpoint: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const getCoinList = async () => {
  return await fetchData('coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false');
};

export const getTopVolumeCoins = async () => {
  return await fetchData('coins/markets?vs_currency=usd&order=volume_desc&per_page=10&page=1&sparkline=false');
};

export const getCoinDetails = async (id: string) => {
  return await fetchData(`coins/${id}`);
};

export const getGlobalData = async () => {
  return await fetchData('global');
};
