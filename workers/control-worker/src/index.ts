/**
 * Control Worker
 * 
 * Event-driven background job processor for control-center.
 * 
 * Rules:
 * - NO UI imports
 * - Fully isolated
 * - Event-driven only
 * - Idempotent operations
 * - Explicit retry policy
 * - Observable execution
 */

import { createEventBus, EventTypes } from '@infinity/event-bus';

interface Job {
  id: string;
  type: string;
  payload: any;
  status: 'pending' | 'running' | 'completed' | 'failed';
  retryCount: number;
  maxRetries: number;
  createdAt: number;
  startedAt?: number;
  completedAt?: number;
  error?: string;
}

const eventBus = createEventBus({ enableLogging: true });
const jobs = new Map<string, Job>();

/**
 * Job execution engine
 */
async function executeJob(job: Job): Promise<void> {
  try {
    job.status = 'running';
    job.startedAt = Date.now();

    await eventBus.emit('worker:job-started', { jobId: job.id, jobType: job.type }, 'control-worker');

    // Execute job based on type
    switch (job.type) {
      case 'sync-state':
        await handleSyncState(job);
        break;
      case 'cleanup':
        await handleCleanup(job);
        break;
      case 'health-check':
        await handleHealthCheck(job);
        break;
      default:
        throw new Error(`Unknown job type: ${job.type}`);
    }

    job.status = 'completed';
    job.completedAt = Date.now();

    await eventBus.emit('worker:job-completed', { jobId: job.id }, 'control-worker');
  } catch (error) {
    job.error = error instanceof Error ? error.message : String(error);
    job.retryCount++;

    if (job.retryCount < job.maxRetries) {
      // Retry with exponential backoff
      const delay = Math.pow(2, job.retryCount) * 1000;
      console.log(`Job ${job.id} failed, retrying in ${delay}ms...`);
      setTimeout(() => executeJob(job), delay);
    } else {
      job.status = 'failed';
      job.completedAt = Date.now();
      await eventBus.emit(
        'worker:job-failed',
        {
          jobId: job.id,
          error: job.error,
        },
        'control-worker'
      );
    }
  }
}

/**
 * Job handlers
 */
async function handleSyncState(job: Job): Promise<void> {
  console.log('[SyncState]', job.payload);
  // Simulate work
  await new Promise((resolve) => setTimeout(resolve, 1000));
}

async function handleCleanup(job: Job): Promise<void> {
  console.log('[Cleanup]', job.payload);
  // Simulate cleanup
  await new Promise((resolve) => setTimeout(resolve, 500));
}

async function handleHealthCheck(job: Job): Promise<void> {
  console.log('[HealthCheck]', job.payload);
  // Simulate health check
  const health = {
    status: 'ok',
    timestamp: Date.now(),
    uptime: process.uptime(),
  };
  console.log('Health:', health);
}

/**
 * Worker initialization
 */
async function initialize(): Promise<void> {
  console.log('[Worker] Starting control-worker...');

  // Listen for job requests
  eventBus.on('worker:submit-job', (event) => {
    const { jobType, payload, maxRetries = 3 } = event.payload;
    const jobId = event.metadata.id;

    const job: Job = {
      id: jobId,
      type: jobType,
      payload,
      status: 'pending',
      retryCount: 0,
      maxRetries,
      createdAt: Date.now(),
    };

    jobs.set(jobId, job);
    executeJob(job);
  });

  // Schedule periodic tasks
  setInterval(() => {
    eventBus.emit('worker:submit-job', { jobType: 'health-check', payload: {} }, 'control-worker');
  }, 60000); // Every minute

  console.log('[Worker] Initialized and listening for jobs...');
}

// Start worker
initialize().catch(console.error);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('[Worker] Shutting down gracefully...');
  process.exit(0);
});
