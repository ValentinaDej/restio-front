import axios from 'axios';
import storage from 'utils/storage';
import { getNewToken, getToken } from './auth';

export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'https://restio-test.onrender.com'
    : 'https://restio-test.onrender.com';

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

let tokenRefreshAttempts = 0;

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error);
    if (
      error.response.status === 401 ||
      error.response.message === 'User authorization failed. Access denied.' ||
      error.response.data.message === 'Request failed with status code 401'
    ) {
      if (tokenRefreshAttempts < 1) {
        try {
          tokenRefreshAttempts++;
          const token = await getNewToken();
          error.config.headers['Authorization'] = `Bearer ${token}`;
          error.config.maxRedirects = 0;
          return instance.request(error.config);
        } catch {
          storage.removeItem('userData');
          window.location.replace('/login');
        }
      } else {
        storage.removeItem('userData');
        window.location.replace('/login');
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
