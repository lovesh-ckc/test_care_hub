'use client';

import { Suspense } from 'react';

/**
 * AppLoader - Dynamically loads federated modules
 * 
 * Integrates with Module Federation to load microfrontends
 * at runtime based on route and contract definitions.
 */
export function AppLoader() {
  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <div className="p-8">
        <h2 className="mb-4 text-lg font-semibold">Federation Ready</h2>
        <p className="text-gray-600">
          Shell application loaded. Ready to load federated microfrontends.
        </p>
        <div className="mt-6 space-y-4">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h3 className="font-semibold text-gray-900">Command Center</h3>
            <p className="text-sm text-gray-600">Operational workflows and execution</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h3 className="font-semibold text-gray-900">Care Hub</h3>
            <p className="text-sm text-gray-600">Support and monitoring workflows</p>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

function LoadingPlaceholder() {
  return (
    <div className="p-8">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-32 rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-3/4 rounded bg-gray-200" />
      </div>
    </div>
  );
}
