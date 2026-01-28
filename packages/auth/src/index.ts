/**
 * Authentication SDK
 * 
 * Provides authentication and authorization utilities
 * integrated with event-bus for cross-app sync.
 */

import { EventBus, EventTypes } from '@infinity/event-bus';

export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
  permissions: string[];
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface AuthContext {
  user: User | null;
  token: AuthToken | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

/**
 * AuthSDK - Unified authentication manager
 */
export class AuthSDK {
  private context: AuthContext;
  private eventBus: EventBus;

  constructor(eventBus: EventBus) {
    this.eventBus = eventBus;
    this.context = {
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    };
  }

  /**
   * Initialize auth from stored token
   */
  async initialize(): Promise<void> {
    this.context.isLoading = true;
    try {
      const token = this.getStoredToken();
      if (token && !this.isTokenExpired(token)) {
        this.context.token = token;
        await this.refreshUser();
      }
    } catch (error) {
      console.error('Auth initialization failed:', error);
    } finally {
      this.context.isLoading = false;
    }
  }

  /**
   * Login user
   */
  async login(email: string, password: string): Promise<AuthToken> {
    this.context.isLoading = true;
    try {
      // Mock login - replace with actual auth endpoint
      const token: AuthToken = {
        accessToken: `token_${Date.now()}`,
        refreshToken: `refresh_${Date.now()}`,
        expiresAt: Date.now() + 3600000, // 1 hour
      };

      this.context.token = token;
      this.storeToken(token);

      await this.refreshUser();
      await this.eventBus.emit('auth:login', { token }, 'auth-sdk');

      return token;
    } finally {
      this.context.isLoading = false;
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    this.context.user = null;
    this.context.token = null;
    this.context.isAuthenticated = false;
    this.clearStoredToken();
    await this.eventBus.emit('auth:logout', {}, 'auth-sdk');
  }

  /**
   * Refresh user information
   */
  private async refreshUser(): Promise<void> {
    if (!this.context.token) {
      return;
    }

    try {
      // Mock user fetch - replace with actual endpoint
      this.context.user = {
        id: '1',
        email: 'user@example.com',
        name: 'User Name',
        roles: ['user'],
        permissions: ['read', 'write'],
      };
      this.context.isAuthenticated = true;
    } catch (error) {
      console.error('Failed to refresh user:', error);
      this.context.isAuthenticated = false;
    }
  }

  /**
   * Check if user has permission
   */
  hasPermission(permission: string): boolean {
    if (!this.context.user) {
      return false;
    }
    return this.context.user.permissions.includes(permission);
  }

  /**
   * Check if user has role
   */
  hasRole(role: string): boolean {
    if (!this.context.user) {
      return false;
    }
    return this.context.user.roles.includes(role);
  }

  /**
   * Get current auth context
   */
  getContext(): AuthContext {
    return { ...this.context };
  }

  /**
   * Token storage helpers
   */
  private getStoredToken(): AuthToken | null {
    const stored = localStorage.getItem('auth_token');
    return stored ? JSON.parse(stored) : null;
  }

  private storeToken(token: AuthToken): void {
    localStorage.setItem('auth_token', JSON.stringify(token));
  }

  private clearStoredToken(): void {
    localStorage.removeItem('auth_token');
  }

  private isTokenExpired(token: AuthToken): boolean {
    return Date.now() > token.expiresAt;
  }
}

/**
 * Create auth SDK instance
 */
export function createAuthSDK(eventBus: EventBus): AuthSDK {
  return new AuthSDK(eventBus);
}
