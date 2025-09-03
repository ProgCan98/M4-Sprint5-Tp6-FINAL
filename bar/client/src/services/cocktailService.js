import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getCocktails = async (params = {}) => {
  const response = await axios.get(`${API_URL}/cocktails`, { params });
  return response.data;
};

export const getCocktailById = async (id) => {
  const response = await axios.get(`${API_URL}/cocktails/${id}`);
  return response.data;
};
