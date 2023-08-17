import axios from 'axios';
import storage from 'utils/storage';
import { getNewToken } from './auth';

export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://restio-test.onrender.com';

export const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  (request) => {
    if (
      request.url.includes('personnel') ||
      request.url.includes('dishes') ||
      request.url.includes('cook')
    ) {
      const auth = storage.getItem('userData');
      if (auth?.token && request.headers) {
        request.headers['Authorization'] = `Bearer ${auth.token}`;
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
