/**
 * ProClubs SDK
 * Complete API client for ProClubs application
 */

// Main client
export { ProClubsSDK as default, ProClubsSDK } from "./client";

// React integration
export { SDKProvider } from "./provider";
export { useSDK } from "./context";

// Modules
export { MissionsModule } from "./modules/missions";

// Types
export type {
  SDKConfig,
  APIResponse,
  APIError,
  ClubMember,
  ClubMemberFilters,
  Mission,
  MissionFilters,
  CreateMissionPayload,
  UpdateMissionPayload,
} from "./types";

// Utilities
export { HTTPClient } from "./utils/http";
