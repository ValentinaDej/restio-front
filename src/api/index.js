import axios from 'axios';
import storage from 'utils/storage';

export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://restio-test.onrender.com';

axios.defaults.baseURL = BASE_URL;

export const instance = axios.create({
  baseURL: BASE_URL,
});

axios.interceptors.request.use(
  (request) => {
    if (
      request.url.startsWith('admin') ||
      request.url.includes('waiter') ||
      request.url.includes('cook')
    ) {
      const auth = storage.getItem('userData');
      if (auth?.token && request.headers) {
        request.headers['Authorization'] = 'Bearer ' + auth.token;
      }
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401 || error.response.data.message === '401 Unauthorized') {
      storage.removeItem('userData');
      window.location.replace('/login');
      return Promise.reject({ message: 'Please login again.' });
    }
    return Promise.reject(error);
  }
);
