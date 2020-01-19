import axios from 'axios';

export const Http = axios.create();

export const ApplicationHttp = axios.create({
  baseURL: process.env.APPLICATION_SERVICE_URL,
});

export const AuthHttp = axios.create({
  baseURL: process.env.AUTH_SERVICE_URL,
});
