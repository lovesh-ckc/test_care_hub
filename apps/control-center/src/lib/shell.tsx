import React from 'react';
import type { ReactNode } from 'react';
import { EventBridge } from './event-bridge';

/**
 * Shell Component - Orchestration layer
 * 
 * Responsibilities:
 * - Owns routing and navigation
 * - Manages authentication boundaries
 * - Coordinates cross-app communication
 * - Orchestrates microfrontend loading
 */
export function Shell({ children }: { children: ReactNode }) {
  return (
    <EventBridge>
      <div className="flex h-screen flex-col">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="text-xl font-bold text-gray-900">Infinity Control</div>
            <nav className="flex gap-4">
              <a href="/command" className="text-sm text-gray-600 hover:text-gray-900">
                Command Center
              </a>
              <a href="/care" className="text-sm text-gray-600 hover:text-gray-900">
                Care Hub
              </a>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-gray-50 px-6 py-4 text-xs text-gray-500">
          <div>Infinity Platform v0.1.0 | Enterprise-Grade Microfrontend Architecture</div>
        </footer>
      </div>
    </EventBridge>
  );
}
