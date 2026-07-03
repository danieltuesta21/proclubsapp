/**
 * ProClubs SDK Client
 * Main entry point for SDK functionality
 */

import type { SDKConfig } from "./types";
import { getConfig } from "./config";
import HTTPClient from "./utils/http";
import MissionsModule from "./modules/missions";
import ClubMembersModule from "./modules/clubMembers";
import ClubsModule from "./modules/clubs";

export class ProClubsSDK {
  private http: HTTPClient;
  public missions: MissionsModule;
  public clubMembers: ClubMembersModule;
  public clubs: ClubsModule;

  constructor(config?: Partial<SDKConfig>) {
    const sdkConfig = getConfig(config);
    this.http = new HTTPClient(sdkConfig);
    this.missions = new MissionsModule(this.http);
    this.clubMembers = new ClubMembersModule(this.http);
    this.clubs = new ClubsModule(this.http);
  }

  /**
   * Update SDK configuration
   */
  updateConfig(config: Partial<SDKConfig>): void {
    const newConfig = getConfig(config);
    this.http = new HTTPClient(newConfig);
    this.missions = new MissionsModule(this.http);
    this.clubMembers = new ClubMembersModule(this.http);
    this.clubs = new ClubsModule(this.http);
  }
}

export default ProClubsSDK;
