/**
 * ProClubs SDK Client
 * Main entry point for SDK functionality
 */

import type { SDKConfig } from "./types";
import { getConfig } from "./config";
import HTTPClient from "./utils/http";
import MissionsModule from "./modules/missions";
import ClubMembersModule from "./modules/clubMembers";

export class ProClubsSDK {
  private http: HTTPClient;
  public missions: MissionsModule;
  public clubMembers: ClubMembersModule;

  constructor(config?: Partial<SDKConfig>) {
    const sdkConfig = getConfig(config);
    this.http = new HTTPClient(sdkConfig);
    this.missions = new MissionsModule(this.http);
    this.clubMembers = new ClubMembersModule(this.http);
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
