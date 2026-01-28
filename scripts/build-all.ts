/**
 * Build All Script
 * 
 * Orchestrates building all apps, packages, and workers
 * with proper dependency order and validation.
 */

import { spawn } from 'child_process';
import { promisify } from 'util';
import { exec as execCallback } from 'child_process';

const exec = promisify(execCallback);

interface BuildConfig {
  name: string;
  path: string;
  order: number;
  type: 'app' | 'package' | 'worker';
}

const buildOrder: BuildConfig[] = [
  // Packages first (no dependencies)
  { name: 'contracts', path: 'packages/contracts', order: 1, type: 'package' },
  { name: 'tokens', path: 'packages/tokens', order: 1, type: 'package' },
  { name: 'event-bus', path: 'packages/event-bus', order: 1, type: 'package' },
  
  // Packages that depend on above
  { name: 'ui', path: 'packages/ui', order: 2, type: 'package' },
  { name: 'layout-engine', path: 'packages/layout-engine', order: 2, type: 'package' },
  { name: 'typography-engine', path: 'packages/typography-engine', order: 2, type: 'package' },
  { name: 'auth', path: 'packages/auth', order: 2, type: 'package' },
  { name: 'analytics', path: 'packages/analytics', order: 2, type: 'package' },
  
  // Apps
  { name: 'control-center', path: 'apps/control-center', order: 3, type: 'app' },
  { name: 'command-center', path: 'apps/command-center', order: 3, type: 'app' },
  { name: 'care-hub', path: 'apps/care-hub', order: 3, type: 'app' },
  
  // Workers
  { name: 'control-worker', path: 'workers/control-worker', order: 4, type: 'worker' },
  { name: 'command-worker', path: 'workers/command-worker', order: 4, type: 'worker' },
  { name: 'care-worker', path: 'workers/care-worker', order: 4, type: 'worker' },
];

async function runCommand(name: string, cwd: string, command: string): Promise<void> {
  console.log(`\n[BUILD] Starting ${name}...`);
  
  return new Promise((resolve, reject) => {
    const proc = spawn('pnpm', ['run', 'build'], {
      cwd,
      stdio: 'inherit',
      shell: true,
    });

    proc.on('error', (error) => {
      console.error(`[BUILD] Failed to start ${name}:`, error);
      reject(error);
    });

    proc.on('exit', (code) => {
      if (code === 0) {
        console.log(`[BUILD] ✓ ${name} built successfully`);
        resolve();
      } else {
        console.error(`[BUILD] ✗ ${name} failed with exit code ${code}`);
        reject(new Error(`${name} build failed`));
      }
    });
  });
}

async function validateContracts(): Promise<void> {
  console.log('\n[VALIDATION] Validating federation contracts...');
  try {
    await exec('pnpm validate-contracts');
    console.log('[VALIDATION] ✓ Contracts validated');
  } catch (error) {
    console.error('[VALIDATION] ✗ Contract validation failed:', error);
    throw error;
  }
}

async function buildAll(): Promise<void> {
  console.log('🏗️  Infinity Platform - Full Build\n');
  console.log('Build order:');
  
  const sortedBuilds = buildOrder.sort((a, b) => a.order - b.order);
  sortedBuilds.forEach((item) => {
    console.log(`  [${item.order}] ${item.name} (${item.type})`);
  });

  try {
    // Build by order
    for (const config of sortedBuilds) {
      await runCommand(config.name, config.path, 'build');
    }

    // Validate contracts
    await validateContracts();

    console.log('\n✅ All builds completed successfully!');
  } catch (error) {
    console.error('\n❌ Build failed:', error);
    process.exit(1);
  }
}

buildAll();
