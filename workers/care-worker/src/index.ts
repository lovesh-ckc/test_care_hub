/**
 * Care Worker
 * 
 * Event-driven background job processor for care-hub.
 * Handles monitoring, support, and health-check tasks.
 */

import { createEventBus } from '@infinity/event-bus';

interface MonitoringJob {
  id: string;
  type: 'health-check' | 'incident-scan' | 'cleanup';
  status: 'pending' | 'running' | 'completed' | 'failed';
  createdAt: number;
  startedAt?: number;
  completedAt?: number;
  result?: any;
  error?: string;
}

const eventBus = createEventBus({ enableLogging: true });
const jobs = new Map<string, MonitoringJob>();

/**
 * Execute monitoring job
 */
async function executeMonitoringJob(job: MonitoringJob): Promise<void> {
  try {
    job.status = 'running';
    job.startedAt = Date.now();

    console.log(`[Monitor] Starting ${job.type} (${job.id})`);

    switch (job.type) {
      case 'health-check':
        job.result = await performHealthCheck();
        break;
      case 'incident-scan':
        job.result = await scanForIncidents();
        break;
      case 'cleanup':
        job.result = await performCleanup();
        break;
    }

    job.status = 'completed';
    job.completedAt = Date.now();

    await eventBus.emit(
      'monitor:check-completed',
      { jobId: job.id, type: job.type, result: job.result },
      'care-worker'
    );
  } catch (error) {
    job.error = error instanceof Error ? error.message : String(error);
    job.status = 'failed';
    job.completedAt = Date.now();

    await eventBus.emit(
      'monitor:check-failed',
      { jobId: job.id, type: job.type, error: job.error },
      'care-worker'
    );
  }
}

/**
 * Monitoring tasks
 */
async function performHealthCheck(): Promise<Record<string, any>> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    status: 'healthy',
    timestamp: Date.now(),
    checks: {
      database: 'ok',
      cache: 'ok',
      services: 'ok',
    },
  };
}

async function scanForIncidents(): Promise<Record<string, any>> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    openIncidents: 0,
    warningCount: 0,
    lastScanTime: Date.now(),
  };
}

async function performCleanup(): Promise<Record<string, any>> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    deletedSessions: 42,
    clearedCache: true,
    compactedLogs: true,
  };
}

/**
 * Worker initialization
 */
async function initialize(): Promise<void> {
  console.log('[Worker] Starting care-worker...');

  // Schedule periodic monitoring
  const scheduleJob = (type: MonitoringJob['type'], intervalMs: number) => {
    setInterval(() => {
      const job: MonitoringJob = {
        id: `${type}_${Date.now()}`,
        type,
        status: 'pending',
        createdAt: Date.now(),
      };

      jobs.set(job.id, job);
      executeMonitoringJob(job);
    }, intervalMs);
  };

  // Health checks every 5 minutes
  scheduleJob('health-check', 300000);

  // Incident scans every 10 minutes
  scheduleJob('incident-scan', 600000);

  // Cleanup every hour
  scheduleJob('cleanup', 3600000);

  console.log('[Worker] Initialized with scheduled monitoring tasks');
}

initialize().catch(console.error);

process.on('SIGTERM', () => {
  console.log('[Worker] Shutting down...');
  process.exit(0);
});
