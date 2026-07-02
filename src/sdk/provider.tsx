/**
 * SDK Provider Component
 * Wraps the app and provides SDK access to all children
 */

import { ReactNode, useMemo } from "react";
import ProClubsSDK from "./client";
import type { SDKConfig } from "./types";
import { SDKContext } from "./context";

interface SDKProviderProps {
  children: ReactNode;
  config?: Partial<SDKConfig>;
}

export function SDKProvider({ children, config }: SDKProviderProps) {
  const sdk = useMemo(() => new ProClubsSDK(config), [config]);

  return <SDKContext.Provider value={sdk}>{children}</SDKContext.Provider>;
}

export default SDKProvider;
