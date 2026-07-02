/**
 * HTTP Client Utility
 * Handles API requests with error handling and response typing
 */

import type { SDKConfig, APIResponse, APIError } from '../types';

export class HTTPClient {
  private config: SDKConfig;

  constructor(config: SDKConfig) {
    this.config = config;
  }

  /**
   * Make a GET request
   */
  async get<T = unknown>(
    path: string,
    options?: RequestInit,
  ): Promise<APIResponse<T>> {
    return this.request<T>('GET', path, undefined, options);
  }

  /**
   * Make a POST request
   */
  async post<T = unknown>(
    path: string,
    body?: unknown,
    options?: RequestInit,
  ): Promise<APIResponse<T>> {
    return this.request<T>('POST', path, body, options);
  }

  /**
   * Make a PUT request
   */
  async put<T = unknown>(
    path: string,
    body?: unknown,
    options?: RequestInit,
  ): Promise<APIResponse<T>> {
    return this.request<T>('PUT', path, body, options);
  }

  /**
   * Make a PATCH request
   */
  async patch<T = unknown>(
    path: string,
    body?: unknown,
    options?: RequestInit,
  ): Promise<APIResponse<T>> {
    return this.request<T>('PATCH', path, body, options);
  }

  /**
   * Make a DELETE request
   */
  async delete<T = unknown>(
    path: string,
    options?: RequestInit,
  ): Promise<APIResponse<T>> {
    return this.request<T>('DELETE', path, undefined, options);
  }

  /**
   * Generic request handler
   */
  private async request<T = unknown>(
    method: string,
    path: string,
    body?: unknown,
    options?: RequestInit,
  ): Promise<APIResponse<T>> {
    const url = `${this.config.baseURL}${path}`;

    const requestOptions: RequestInit = {
      method,
      ...options,
      headers: {
        ...this.config.headers,
        ...options?.headers,
      },
    };

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(
        () => controller.abort(),
        this.config.timeout || 30000,
      );

      const response = await fetch(url, {
        ...requestOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        const error: APIError = {
          status: response.status,
          message: data.message || response.statusText,
          code: data.code,
        };
        throw error;
      }

      return {
        data: data as T,
        status: response.status,
        message: data.message,
      };
    } catch (error) {
      if (error instanceof TypeError) {
        throw {
          status: 0,
          message: 'Network error',
        } as APIError;
      }
      throw error;
    }
  }
}

export default HTTPClient;
