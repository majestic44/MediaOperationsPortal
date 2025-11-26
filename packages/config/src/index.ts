// packages/config/src/index.ts

export interface ApiConfig {
  baseUrl: string;
}

export interface AuthConfig {
  jwtSecret: string;
}

export interface FrontendEnv {
  NEXT_PUBLIC_API_URL: string;
}

export const getApiConfig = (): ApiConfig => ({
  baseUrl: process.env.API_URL || 'http://localhost:3001',
});
