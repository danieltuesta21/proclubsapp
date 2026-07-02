/**
 * SDK Configuration
 */

import type { SDKConfig } from './types';

const DEFAULT_CONFIG: SDKConfig = {
  baseURL: process.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
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
