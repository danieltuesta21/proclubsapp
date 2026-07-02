/**
 * SDK React Context
 * Provides SDK access throughout the app
 */

import { createContext, useContext } from 'react';
import type { ProClubsSDK } from './client';

const SDKContext = createContext<ProClubsSDK | null>(null);

/**
 * Hook to access the SDK from anywhere in the app
 */
export function useSDK(): ProClubsSDK {
  const sdk = useContext(SDKContext);
  if (!sdk) {
    throw new Error('useSDK must be used within SDKProvider');
  }
  return sdk;
}

export { SDKContext };
