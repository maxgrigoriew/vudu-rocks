import axios from 'axios';

export const API_URL = 'https://jsonplaceholder.typicode.com';
const config = {
  baseURL: API_URL,
};
const http = axios.create(config);
http.interceptors.request.use((config) => config);
export { http };
