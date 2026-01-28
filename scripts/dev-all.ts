/**
 * Dev All Script
 * 
 * Starts development mode for all apps, packages, and workers.
 * Runs with proper parallelization and watch modes.
 */

import { spawn } from 'child_process';

interface DevConfig {
  name: string;
  path: string;
  command: string;
  parallel: boolean;
}

const devConfigs: DevConfig[] = [
  // Apps (all parallel)
  { name: 'control-center', path: 'apps/control-center', command: 'pnpm dev', parallel: true },
  { name: 'command-center', path: 'apps/command-center', command: 'pnpm dev', parallel: true },
  { name: 'care-hub', path: 'apps/care-hub', command: 'pnpm dev', parallel: true },
  
  // Workers (all parallel)
  { name: 'control-worker', path: 'workers/control-worker', command: 'pnpm dev', parallel: true },
  { name: 'command-worker', path: 'workers/command-worker', command: 'pnpm dev', parallel: true },
  { name: 'care-worker', path: 'workers/care-worker', command: 'pnpm dev', parallel: true },
];

function startDev(config: DevConfig): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`[DEV] Starting ${config.name}...`);
    
    const proc = spawn('pnpm', ['dev'], {
      cwd: config.path,
      stdio: 'inherit',
      shell: true,
    });

    proc.on('error', (error) => {
      console.error(`[DEV] Failed to start ${config.name}:`, error);
      reject(error);
    });

    // For dev, we don't wait for exit (it's a watch process)
    if (!config.parallel) {
      proc.on('exit', (code) => {
        resolve();
      });
    } else {
      // For parallel, resolve immediately
      resolve();
    }
  });
}

async function devAll(): Promise<void> {
  console.log('🚀 Infinity Platform - Development Mode\n');
  console.log('Starting services:');
  
  devConfigs.forEach((config) => {
    console.log(`  • ${config.name} on ${config.path}`);
  });

  try {
    // Start all dev servers in parallel
    await Promise.all(devConfigs.map(startDev));

    console.log('\n✅ All development servers started!');
    console.log('\nAccess:');
    console.log('  Control Center: http://localhost:3000');
    console.log('  Command Center: http://localhost:3001');
    console.log('  Care Hub: http://localhost:3002');
    console.log('\nWorkers running in background on ports 4001-4003\n');
  } catch (error) {
    console.error('\n❌ Failed to start development servers:', error);
    process.exit(1);
  }
}

devAll();
