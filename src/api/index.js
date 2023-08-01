import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'development' ? 'https://et-back-23.vercel.app' : '?';

export const instance = axios.create({
  baseURL: BASE_URL,
});
