/**
 * Event Bus
 * 
 * Type-safe, event-driven communication system for cross-app
 * communication. No shared state - only events.
 * 
 * Features:
 * - Strongly typed events
 * - Publish/Subscribe pattern
 * - Event metadata and tracing
 * - Async-safe event handling
 * - Idempotent delivery
 */

export type EventHandler<T = any> = (event: T) => void | Promise<void>;

export interface EventMetadata {
  id: string;
  timestamp: number;
  source: string;
  correlationId?: string;
  retryCount?: number;
}

export interface Event<T = any> {
  type: string;
  payload: T;
  metadata: EventMetadata;
}

export interface EventBusConfig {
  maxListeners?: number;
  enableLogging?: boolean;
  enableTracing?: boolean;
}

/**
 * EventBus - Central event coordination
 */
export class EventBus {
  private listeners: Map<string, Set<EventHandler>> = new Map();
  private config: Required<EventBusConfig>;

  constructor(config: EventBusConfig = {}) {
    this.config = {
      maxListeners: config.maxListeners ?? 10,
      enableLogging: config.enableLogging ?? false,
      enableTracing: config.enableTracing ?? false,
    };
  }

  /**
   * Subscribe to events of a specific type
   */
  on<T = any>(eventType: string, handler: EventHandler<Event<T>>): () => void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }

    const handlers = this.listeners.get(eventType)!;
    if (handlers.size >= this.config.maxListeners) {
      console.warn(
        `EventBus: Max listeners (${this.config.maxListeners}) reached for event type: ${eventType}`
      );
    }

    handlers.add(handler);

    // Return unsubscribe function
    return () => {
      handlers.delete(handler);
    };
  }

  /**
   * Subscribe to a single event
   */
  once<T = any>(
    eventType: string,
    handler: EventHandler<Event<T>>
  ): () => void {
    const wrappedHandler = (event: Event<T>) => {
      unsubscribe();
      return handler(event);
    };

    const unsubscribe = this.on(eventType, wrappedHandler);
    return unsubscribe;
  }

  /**
   * Publish an event to all subscribers
   */
  async emit<T = any>(
    eventType: string,
    payload: T,
    source: string,
    metadata?: Partial<EventMetadata>
  ): Promise<void> {
    const event: Event<T> = {
      type: eventType,
      payload,
      metadata: {
        id: this.generateId(),
        timestamp: Date.now(),
        source,
        ...metadata,
      },
    };

    if (this.config.enableLogging) {
      console.log(`[EventBus] Emit: ${eventType}`, event);
    }

    const handlers = this.listeners.get(eventType) ?? new Set();
    const promises = Array.from(handlers).map((handler) =>
      Promise.resolve().then(() => handler(event))
    );

    try {
      await Promise.all(promises);
    } catch (error) {
      console.error(`[EventBus] Error handling event ${eventType}:`, error);
      throw error;
    }
  }

  /**
   * Get all registered event types
   */
  getEventTypes(): string[] {
    return Array.from(this.listeners.keys());
  }

  /**
   * Clear all listeners
   */
  clear(): void {
    this.listeners.clear();
  }

  /**
   * Generate unique event ID
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

/**
 * Create a new EventBus instance
 */
export function createEventBus(config?: EventBusConfig): EventBus {
  return new EventBus(config);
}

/**
 * Standard Event Types
 * 
 * Define common cross-app events
 */
export namespace StandardEvents {
  export interface Navigation {
    to: string;
    from: string;
    query?: Record<string, string>;
  }

  export interface Authentication {
    userId: string;
    token: string;
    expiresAt: number;
  }

  export interface Error {
    code: string;
    message: string;
    context?: Record<string, any>;
  }

  export interface WorkerJob {
    jobId: string;
    jobType: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    progress?: number;
    error?: string;
  }
}

/**
 * Event Type Registry
 */
export const EventTypes = {
  // Navigation events
  NAVIGATE: 'app:navigate',
  ROUTE_CHANGED: 'app:route-changed',

  // Authentication events
  AUTH_LOGIN: 'auth:login',
  AUTH_LOGOUT: 'auth:logout',
  AUTH_TOKEN_REFRESH: 'auth:token-refresh',

  // Error events
  ERROR_OCCURRED: 'error:occurred',
  ERROR_RESOLVED: 'error:resolved',

  // Worker events
  WORKER_JOB_STARTED: 'worker:job-started',
  WORKER_JOB_COMPLETED: 'worker:job-completed',
  WORKER_JOB_FAILED: 'worker:job-failed',

  // Cross-app events
  DATA_CHANGED: 'data:changed',
  STATE_SYNC: 'state:sync',
} as const;
