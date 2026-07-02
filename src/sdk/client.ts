/**
 * ProClubs SDK Client
 * Main entry point for SDK functionality
 */

import type { SDKConfig } from './types';
import { getConfig } from './config';
import HTTPClient from './utils/http';
import MissionsModule from './modules/missions';

export class ProClubsSDK {
  private http: HTTPClient;
  public missions: MissionsModule;

  constructor(config?: Partial<SDKConfig>) {
    const sdkConfig = getConfig(config);
    this.http = new HTTPClient(sdkConfig);
    this.missions = new MissionsModule(this.http);
  }

  /**
   * Update SDK configuration
   */
  updateConfig(config: Partial<SDKConfig>): void {
    const newConfig = getConfig(config);
    this.http = new HTTPClient(newConfig);
    this.missions = new MissionsModule(this.http);
  }
}

export default ProClubsSDK;
