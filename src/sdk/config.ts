import type { SDKConfig } from './types';

const API_BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost';
const API_PORT = import.meta.env.VITE_SERVER_PORT || 9501;

const DEFAULT_CONFIG: SDKConfig = {
  baseURL: `${API_BASE_URL}:${API_PORT}/api/v1`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export function getConfig(config?: Partial<SDKConfig>): SDKConfig {
  return {
    ...DEFAULT_CONFIG,
    ...config,
    headers: {
      ...DEFAULT_CONFIG.headers,
      ...config?.headers,
    },
  };
}

export default DEFAULT_CONFIG;
