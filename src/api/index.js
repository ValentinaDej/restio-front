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
      request.url.includes('admin') ||
      request.url.includes('waiter') ||
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

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401 || error.response.data.message === '401 Unauthorized') {
      try {
        const token = await getNewToken();
        error.config.headers['Authorization'] = `Bearer ${token}`;
        return axios.request(error.config);
      } catch (refreshError) {
        storage.removeItem('userData');
        window.location.replace('/login');
        return Promise.reject({ message: 'Please login again.' });
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
