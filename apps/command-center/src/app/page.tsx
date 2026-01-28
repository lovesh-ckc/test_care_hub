'use client';

import { useEffect, useState } from 'react';
import { getCommandCenterContract } from '@infinity/contracts';

export default function Page() {
  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
    const c = getCommandCenterContract();
    setContract(c);
  }, []);

  return (
    <div className="p-8">
      <h1 className="mb-4 text-3xl font-bold">Command Center</h1>
      <p className="text-gray-600">
        Operational workflows and execution management
      </p>
      
      {contract && (
        <div className="mt-6 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-2 font-semibold">Module Contract</h2>
          <pre className="overflow-auto rounded bg-gray-200 p-4 text-sm">
            {JSON.stringify(contract, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="font-semibold text-gray-900">Workflows</h3>
          <p className="text-sm text-gray-600">Manage operational tasks</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="font-semibold text-gray-900">Execution</h3>
          <p className="text-sm text-gray-600">Monitor job execution</p>
        </div>
      </div>
    </div>
  );
}
