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
  description: string;
  status: 'active' | 'completed' | 'pending';
  createdAt: string;
  updatedAt: string;
}

export interface MissionFilters {
  status?: 'active' | 'completed' | 'pending';
  limit?: number;
  offset?: number;
}

export interface CreateMissionPayload {
  name: string;
  description: string;
  status: 'active' | 'completed' | 'pending';
}

export interface UpdateMissionPayload {
  name?: string;
  description?: string;
  status?: 'active' | 'completed' | 'pending';
}
