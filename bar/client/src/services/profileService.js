import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getProfiles = async () => {
  const response = await axios.get(`${API_URL}/profiles`);
  return response.data;
};

export const createProfile = async (data) => {
  const response = await axios.post(`${API_URL}/profiles`, data);
  return response.data;
};

export const updateProfile = async (id, data) => {
  const response = await axios.put(`${API_URL}/profiles/${id}`, data);
  return response.data;
};

export const deleteProfile = async (id) => {
  const response = await axios.delete(`${API_URL}/profiles/${id}`);
  return response.data;
};

export const addToWatchlist = async (profileId, cocktailId) => {
  const response = await axios.post(
    `${API_URL}/profiles/${profileId}/watchlist`,
    { cocktailId }
  );
  return response.data;
};

export const removeFromWatchlist = async (profileId, cocktailId) => {
  const response = await axios.delete(
    `${API_URL}/profiles/${profileId}/watchlist/${cocktailId}`
  );
  return response.data;
};

export const getProfileById = async (id) => {
  const response = await axios.get(`${API_URL}/profiles/${id}`);
  return response.data;
};
