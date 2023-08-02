import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '?';

axios.defaults.baseURL = BASE_URL;

export const instance = axios.create({
  baseURL: BASE_URL,
});
