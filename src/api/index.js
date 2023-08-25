import axios from 'axios';
import storage from 'utils/storage';
import { getNewToken, getToken } from './auth';

export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://restio-server.onrender.com';

export const instance = axios.create({
  baseURL: BASE_URL,
});

const authRoutes = ['personnel', 'dishes', 'orders', 'tables', 'transactions'];

instance.interceptors.request.use(
  (request) => {
    if (authRoutes.some((route) => request.url.includes(route))) {
      const token = getToken();
      if (token && request.headers) {
        request.headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.data.status === 401 && error.response.data.message === 'Token expired.') {
      try {
        const token = await getNewToken();
        error.config.headers['Authorization'] = `Bearer ${token}`;
        return instance.request(error.config);
      } catch {
        storage.removeItem('userData');
        window.location.replace('/login');
      }
    } else if (
      error.response.data.status === 401 &&
      error.response.data.message === 'User authorization failed. Access denied.'
    ) {
      storage.removeItem('userData');
      window.location.replace('/login');
    } else if (error.response.data.status === 401) {
      storage.removeItem('userData');
      window.location.replace('/login');
    }
    return Promise.reject(error);
  }
);

export default instance;
