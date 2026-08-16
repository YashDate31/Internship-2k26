// Day 49: Axios API Service & Request Interceptor for College Sahayak
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to attach Auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('college_sahayak_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const fetchCollegeNotes = async (subject) => {
  try {
    const response = await api.get(`/notes?subject=${subject}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error.message);
    throw error;
  }
};

export default api;
