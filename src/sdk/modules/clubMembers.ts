/**
 * Club Members Module
 * API client for club member related endpoints
 */

import type { HTTPClient } from "../utils/http";
import type { APIResponse, ClubMember, ClubMemberFilters } from "../types";

export class ClubMembersModule {
  private http: HTTPClient;

  constructor(http: HTTPClient) {
    this.http = http;
  }

  /**
   * Get all club members
   */
  async list(filters?: ClubMemberFilters): Promise<APIResponse<ClubMember[]>> {
    const searchParams = new URLSearchParams();
    // if (filters?.status) searchParams.append("status", filters.status);
    // if (filters?.limit) searchParams.append("limit", String(filters.limit));
    // if (filters?.offset) searchParams.append("offset", String(filters.offset));

    const query = searchParams.toString();
    const path = query ? `/club-members?${query}` : "/club-members";

    return this.http.get<ClubMember[]>(path);
  }

  /**
   * Get a single club member by ID
   */
  async get(clubMemberId: string): Promise<APIResponse<ClubMember>> {
    return this.http.get<ClubMember>(`/club-members/${clubMemberId}`);
  }
}

export default ClubMembersModule;
