'use client';

import { Suspense } from 'react';
import { Shell } from '@control-center/lib/shell';
import { AppLoader } from '@control-center/lib/federation/app-loader';
import { ErrorBoundary } from '@control-center/lib/error-boundary';

export default function Page() {
  return (
    <ErrorBoundary>
      <Shell>
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          <AppLoader />
        </Suspense>
      </Shell>
    </ErrorBoundary>
  );
}
