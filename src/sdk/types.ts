/**
 * SDK Type Definitions
 */

export interface SDKConfig {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface APIResponse<T = unknown> {
  data: T;
  status: number;
  message?: string;
}

export interface APIError {
  status: number;
  message: string;
  code?: string;
}

/**
 * Mission Types
 */
export interface Mission {
  id: string;
  name: string;
  status: MissionStatus;
  launchDate: string;
  target: string;
  description: "active" | "completed" | "planned";
}

export interface MissionFilters {
  status?: "active" | "completed" | "planned";
  limit?: number;
  offset?: number;
}

export interface CreateMissionPayload {
  name: string;
  description: string;
  status: "active" | "completed" | "planned";
}

export interface UpdateMissionPayload {
  name?: string;
  description?: string;
  status?: "active" | "completed" | "planned";
}

/**
 * Club Member Types
 */
export interface ClubMember {
  name: string;
  proPos: string;
  gamesPlayed: string;
  goals: string;
  assists: string;
  manOfTheMatch: string;
  winRate: string;
  ratingAve: string;
  passesMade: string;
  passSuccessRate: string;
  tacklesMade: string;
  tackleSuccessRate: string;
}

export interface ClubMemberFilters {
  status?: 'active' | 'completed' | 'pending';
  limit?: number;
  offset?: number;
}