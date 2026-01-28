'use client';

import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { createEventBus } from '@infinity/event-bus';

type EventBridgeContextType = ReturnType<typeof createEventBus>;

const EventBridgeContext = createContext<EventBridgeContextType | null>(null);

export function EventBridge({ children }: { children: ReactNode }) {
  const eventBus = React.useMemo(() => createEventBus(), []);

  return (
    <EventBridgeContext.Provider value={eventBus}>
      {children}
    </EventBridgeContext.Provider>
  );
}

export function useEventBus() {
  const context = useContext(EventBridgeContext);
  if (!context) {
    throw new Error('useEventBus must be used within EventBridge');
  }
  return context;
}
