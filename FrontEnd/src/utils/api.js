
// src/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api'; 

// Axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Add authorization header to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle unauthorized responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403 || error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Fetch progress data
export const getProgress = (referenceId) => {
  return api.get(`/approvals/${referenceId}`);
};

export const fetchReferenceId = async () => {
  const response = await api.post('/approvals', {
    userId: 'exampleUserId',
    document: 'exampleDocument',
  });

  console.log(response);
  return response.data;
};
