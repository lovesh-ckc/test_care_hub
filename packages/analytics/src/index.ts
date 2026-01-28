/**
 * Analytics SDK
 * 
 * Provides observability, telemetry, and event tracking
 * integrated with event-bus for cross-app insights.
 */

import { EventBus } from '@infinity/event-bus';

export interface AnalyticsEvent {
  name: string;
  category: string;
  properties?: Record<string, any>;
  timestamp: number;
}

export interface PageViewEvent {
  page: string;
  title: string;
  referrer?: string;
  properties?: Record<string, any>;
}

export interface ErrorEvent {
  error: Error;
  context?: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

/**
 * Analytics Manager
 */
export class AnalyticsManager {
  private eventBus: EventBus;
  private sessionId: string;
  private userId?: string;
  private buffer: AnalyticsEvent[] = [];
  private flushInterval: NodeJS.Timeout | null = null;

  constructor(eventBus: EventBus, config?: { flushIntervalMs?: number }) {
    this.eventBus = eventBus;
    this.sessionId = this.generateSessionId();

    if (config?.flushIntervalMs) {
      this.startAutoFlush(config.flushIntervalMs);
    }
  }

  /**
   * Set user context
   */
  setUser(userId: string): void {
    this.userId = userId;
  }

  /**
   * Track event
   */
  trackEvent(
    name: string,
    category: string,
    properties?: Record<string, any>
  ): void {
    const event: AnalyticsEvent = {
      name,
      category,
      properties: {
        sessionId: this.sessionId,
        userId: this.userId,
        ...properties,
      },
      timestamp: Date.now(),
    };

    this.buffer.push(event);

    if (this.buffer.length >= 10) {
      this.flush();
    }
  }

  /**
   * Track page view
   */
  trackPageView(page: string, title: string, properties?: Record<string, any>): void {
    const event: PageViewEvent = {
      page,
      title,
      referrer: typeof document !== 'undefined' ? document.referrer : undefined,
      properties: {
        sessionId: this.sessionId,
        userId: this.userId,
        ...properties,
      },
    };

    this.trackEvent('page_view', 'navigation', event);
  }

  /**
   * Track error
   */
  trackError(error: Error, severity: ErrorEvent['severity'] = 'medium', context?: Record<string, any>): void {
    const event: ErrorEvent = {
      error,
      context: {
        sessionId: this.sessionId,
        userId: this.userId,
        ...context,
      },
      severity,
    };

    this.trackEvent('error', 'error', {
      message: error.message,
      stack: error.stack,
      severity,
      ...event.context,
    });
  }

  /**
   * Flush events to analytics service
   */
  async flush(): Promise<void> {
    if (this.buffer.length === 0) {
      return;
    }

    const events = this.buffer.splice(0);

    try {
      // Send to analytics endpoint
      await this.sendEvents(events);
    } catch (error) {
      console.error('Failed to send analytics events:', error);
      // Put events back in buffer for retry
      this.buffer.unshift(...events);
    }
  }

  /**
   * Destroy analytics session
   */
  destroy(): void {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
    }
    this.flush();
  }

  /**
   * Private helper methods
   */
  private async sendEvents(events: AnalyticsEvent[]): Promise<void> {
    // Mock sending - replace with actual endpoint
    console.log('[Analytics] Sending events:', events);
  }

  private startAutoFlush(intervalMs: number): void {
    this.flushInterval = setInterval(() => {
      this.flush();
    }, intervalMs);
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

/**
 * Create analytics manager
 */
export function createAnalyticsManager(
  eventBus: EventBus,
  config?: { flushIntervalMs?: number }
): AnalyticsManager {
  return new AnalyticsManager(eventBus, config);
}
