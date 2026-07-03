/**
 * Clubs Module
 * API client for club related endpoints
 */

import type { HTTPClient } from "../utils/http";
import type { APIResponse, Club } from "../types";

export class ClubsModule {
  private http: HTTPClient;

  constructor(http: HTTPClient) {
    this.http = http;
  }

  /**
   * Get a single club by ID
   */
  async get(clubId: string): Promise<APIResponse<Club>> {
    return this.http.get<Club>(`/clubs/${clubId}`);
  }
}

export default ClubsModule;