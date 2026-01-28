/**
 * Command Worker
 * 
 * Event-driven background job processor for command-center.
 * Handles execution workflows and operational tasks.
 */

import { createEventBus } from '@infinity/event-bus';

interface WorkflowJob {
  id: string;
  workflowId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  retryCount: number;
  createdAt: number;
  startedAt?: number;
  completedAt?: number;
  error?: string;
}

const eventBus = createEventBus({ enableLogging: true });
const workflows = new Map<string, WorkflowJob>();

/**
 * Execute workflow
 */
async function executeWorkflow(job: WorkflowJob): Promise<void> {
  try {
    job.status = 'running';
    job.startedAt = Date.now();
    job.progress = 0;

    console.log(`[Workflow] Starting ${job.workflowId} (${job.id})`);

    // Simulate workflow execution with progress
    for (let i = 0; i < 10; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      job.progress = ((i + 1) / 10) * 100;

      await eventBus.emit(
        'worker:job-started',
        {
          jobId: job.id,
          jobType: 'workflow',
          progress: job.progress,
        },
        'command-worker'
      );
    }

    job.status = 'completed';
    job.completedAt = Date.now();
    console.log(`[Workflow] Completed ${job.workflowId}`);

    await eventBus.emit(
      'worker:job-completed',
      { jobId: job.id, workflowId: job.workflowId },
      'command-worker'
    );
  } catch (error) {
    job.error = error instanceof Error ? error.message : String(error);
    job.retryCount++;

    if (job.retryCount < 3) {
      const delay = Math.pow(2, job.retryCount) * 1000;
      console.log(`[Workflow] Failed, retrying in ${delay}ms`);
      setTimeout(() => executeWorkflow(job), delay);
    } else {
      job.status = 'failed';
      job.completedAt = Date.now();
      await eventBus.emit(
        'worker:job-failed',
        { jobId: job.id, error: job.error },
        'command-worker'
      );
    }
  }
}

/**
 * Worker initialization
 */
async function initialize(): Promise<void> {
  console.log('[Worker] Starting command-worker...');

  eventBus.on('worker:submit-job', (event) => {
    const { jobType, payload } = event.payload;

    if (jobType === 'execute-workflow') {
      const job: WorkflowJob = {
        id: event.metadata.id,
        workflowId: payload.workflowId,
        status: 'pending',
        progress: 0,
        retryCount: 0,
        createdAt: Date.now(),
      };

      workflows.set(job.id, job);
      executeWorkflow(job);
    }
  });

  console.log('[Worker] Initialized and listening for workflows...');
}

initialize().catch(console.error);

process.on('SIGTERM', () => {
  console.log('[Worker] Shutting down...');
  process.exit(0);
});
