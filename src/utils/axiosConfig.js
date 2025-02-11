import axios from 'axios';

/**
 * Configuration de base d'Axios
 * @param {Function} navigate - Fonction pour naviguer entre les pages.
 */
export const setupAxios = (navigate) => {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;

  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      config.headers['X-Binarybox-Api-Key'] = import.meta.env.VITE_API_KEY;
            
      return config;
    },
    (error) => Promise.reject(error)
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        navigate('/');
      }
      return Promise.reject(error);
    }
  );
};
