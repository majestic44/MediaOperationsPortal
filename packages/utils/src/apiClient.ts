import axios from 'axios';

export const createApiClient = (baseURL: string, getToken?: () => string | null) => {
  const instance = axios.create({ baseURL });

  instance.interceptors.request.use((config) => {
    const token = getToken?.();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};
