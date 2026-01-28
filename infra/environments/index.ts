/**
 * Environment Configuration
 * 
 * Environment-specific settings for development, staging, and production.
 */

export interface EnvironmentConfig {
  name: 'development' | 'staging' | 'production';
  debug: boolean;
  apiUrl: string;
  analyticsUrl: string;
  remotes: {
    commandCenter: string;
    careHub: string;
  };
  workers: {
    controlWorker: string;
    commandWorker: string;
    careWorker: string;
  };
  auth: {
    provider: string;
    clientId: string;
    domain: string;
  };
}

const baseConfigs: Record<string, EnvironmentConfig> = {
  development: {
    name: 'development',
    debug: true,
    apiUrl: 'http://localhost:3000/api',
    analyticsUrl: 'http://localhost:4000',
    remotes: {
      commandCenter: 'http://localhost:3001/_next/static/remoteEntry.js',
      careHub: 'http://localhost:3002/_next/static/remoteEntry.js',
    },
    workers: {
      controlWorker: 'http://localhost:4001',
      commandWorker: 'http://localhost:4002',
      careWorker: 'http://localhost:4003',
    },
    auth: {
      provider: 'auth0',
      clientId: 'dev_client_id',
      domain: 'dev.auth0.com',
    },
  },
  staging: {
    name: 'staging',
    debug: false,
    apiUrl: 'https://staging-api.example.com',
    analyticsUrl: 'https://staging-analytics.example.com',
    remotes: {
      commandCenter: 'https://staging.example.com/command-center/remoteEntry.js',
      careHub: 'https://staging.example.com/care-hub/remoteEntry.js',
    },
    workers: {
      controlWorker: 'https://staging-workers.example.com/control',
      commandWorker: 'https://staging-workers.example.com/command',
      careWorker: 'https://staging-workers.example.com/care',
    },
    auth: {
      provider: 'auth0',
      clientId: 'staging_client_id',
      domain: 'staging.auth0.com',
    },
  },
  production: {
    name: 'production',
    debug: false,
    apiUrl: 'https://api.example.com',
    analyticsUrl: 'https://analytics.example.com',
    remotes: {
      commandCenter: 'https://cdn.example.com/command-center/v0.1.0/remoteEntry.js',
      careHub: 'https://cdn.example.com/care-hub/v0.1.0/remoteEntry.js',
    },
    workers: {
      controlWorker: 'https://workers.example.com/control',
      commandWorker: 'https://workers.example.com/command',
      careWorker: 'https://workers.example.com/care',
    },
    auth: {
      provider: 'auth0',
      clientId: 'production_client_id',
      domain: 'example.auth0.com',
    },
  },
};

export function getEnvironmentConfig(env: string = process.env.NODE_ENV || 'development'): EnvironmentConfig {
  const config = baseConfigs[env as keyof typeof baseConfigs];
  if (!config) {
    throw new Error(`Unknown environment: ${env}`);
  }
  return config;
}

export default baseConfigs;
