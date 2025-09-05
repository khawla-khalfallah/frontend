import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  // baseURL: 'http://dreamlearn.local',

  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    // 'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token aux requêtes après connexion
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Intercepteur pour gérer les erreurs
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Gérer la déconnexion si le token est invalide
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;