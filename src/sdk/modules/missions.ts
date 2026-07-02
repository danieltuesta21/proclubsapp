/**
 * Missions Module
 * API client for mission-related endpoints
 */

import type { HTTPClient } from "../utils/http";
import type {
  Mission,
  MissionFilters,
  CreateMissionPayload,
  UpdateMissionPayload,
  APIResponse,
} from "../types";

export class MissionsModule {
  private http: HTTPClient;

  constructor(http: HTTPClient) {
    this.http = http;
  }

  /**
   * Get all missions
   */
  async list(filters?: MissionFilters): Promise<APIResponse<Mission[]>> {
    const searchParams = new URLSearchParams();
    if (filters?.status) searchParams.append("status", filters.status);
    if (filters?.limit) searchParams.append("limit", String(filters.limit));
    if (filters?.offset) searchParams.append("offset", String(filters.offset));

    const query = searchParams.toString();
    const path = query ? `/missions?${query}` : "/missions";

    return this.http.get<Mission[]>(path);
  }

  /**
   * Get a single mission by ID
   */
  async get(missionId: string): Promise<APIResponse<Mission>> {
    return this.http.get<Mission>(`/missions/${missionId}`);
  }

  /**
   * Create a new mission
   */
  async create(payload: CreateMissionPayload): Promise<APIResponse<Mission>> {
    return this.http.post<Mission>("/missions", payload);
  }

  /**
   * Update a mission
   */
  async update(missionId: string, payload: UpdateMissionPayload): Promise<APIResponse<Mission>> {
    return this.http.patch<Mission>(`/missions/${missionId}`, payload);
  }

  /**
   * Delete a mission
   */
  async delete(missionId: string): Promise<APIResponse<{ success: boolean }>> {
    return this.http.delete<{ success: boolean }>(`/missions/${missionId}`);
  }
}

export default MissionsModule;
