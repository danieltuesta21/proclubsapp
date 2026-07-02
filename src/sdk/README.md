# ProClubs SDK

Internal API client SDK for the ProClubs application. Provides type-safe access to all API endpoints with built-in error handling and request management.

## Installation & Setup

### Import and Initialize

```typescript
import ProClubsSDK from '@/sdk';

// Initialize with default config
const sdk = new ProClubsSDK();

// Or with custom config
const sdk = new ProClubsSDK({
  baseURL: 'https://api.example.com',
  timeout: 60000,
});
```

## Usage Examples

### Missions API

```typescript
// Get all missions
const response = await sdk.missions.list();
console.log(response.data);

// Get with filters
const response = await sdk.missions.list({
  status: 'active',
  limit: 10,
  offset: 0,
});

// Get single mission
const response = await sdk.missions.get('mission-123');

// Create mission
const response = await sdk.missions.create({
  name: 'New Mission',
  description: 'Mission description',
  status: 'active',
});

// Update mission
const response = await sdk.missions.update('mission-123', {
  status: 'completed',
});

// Delete mission
const response = await sdk.missions.delete('mission-123');
```

## Configuration

The SDK can be configured with the following options:

```typescript
interface SDKConfig {
  baseURL: string;           // API base URL
  timeout?: number;          // Request timeout in ms (default: 30000)
  headers?: Record<string, string>; // Custom headers
}
```

### Environment Variables

The SDK will automatically use:
- `VITE_API_BASE_URL` - Base URL for API requests (default: `http://localhost:3001/api`)

## Project Structure

```
src/sdk/
├── client.ts          # Main SDK client
├── config.ts          # Configuration management
├── types.ts           # TypeScript type definitions
├── index.ts           # Public exports
├── modules/           # Feature modules
│   └── missions.ts    # Missions API client
└── utils/
    └── http.ts        # HTTP client utility
```

## Adding New Modules

To add a new API module:

1. Create a new file in `src/sdk/modules/`
2. Define types in `src/sdk/types.ts` (if needed)
3. Implement the module class
4. Integrate into `src/sdk/client.ts`
5. Export from `src/sdk/index.ts`

Example:

```typescript
// src/sdk/modules/players.ts
export class PlayersModule {
  constructor(private http: HTTPClient) {}

  async list(): Promise<APIResponse<Player[]>> {
    return this.http.get<Player[]>('/players');
  }
}
```

```typescript
// src/sdk/client.ts
export class ProClubsSDK {
  public players: PlayersModule;

  constructor(config?: Partial<SDKConfig>) {
    this.players = new PlayersModule(this.http);
  }
}
```

## Error Handling

All SDK methods throw `APIError` exceptions. Handle errors appropriately:

```typescript
try {
  const response = await sdk.missions.get('mission-123');
} catch (error) {
  const apiError = error as APIError;
  console.error(`Error: ${apiError.status} - ${apiError.message}`);
}
```

## Response Structure

All SDK methods return an `APIResponse<T>` object:

```typescript
interface APIResponse<T> {
  data: T;              // Response data
  status: number;       // HTTP status code
  message?: string;     // Optional message
}
```
