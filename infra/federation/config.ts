/**
 * Federation Configuration
 * 
 * Module Federation setup for all microfrontends.
 * Defines shared dependencies and remote modules.
 */

export const FederationConfig = {
  // Control Center (Shell)
  controlCenter: {
    name: 'control_center',
    filename: 'remoteEntry.js',
    exposes: {
      './Shell': './src/lib/shell',
      './EventBridge': './src/lib/event-bridge',
    },
    shared: {
      react: { singleton: true, requiredVersion: '^19.0.0' },
      'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
      '@infinity/contracts': { singleton: true },
      '@infinity/event-bus': { singleton: true },
    },
  },

  // Command Center (Remote)
  commandCenter: {
    name: 'command_center',
    filename: 'remoteEntry.js',
    exposes: {
      './Module': './src/app/page',
      './Layout': './src/app/layout',
    },
    shared: {
      react: { singleton: true, requiredVersion: '^19.0.0' },
      'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
      '@infinity/contracts': { singleton: true },
      '@infinity/event-bus': { singleton: true },
      '@infinity/ui': { singleton: false },
    },
  },

  // Care Hub (Remote)
  careHub: {
    name: 'care_hub',
    filename: 'remoteEntry.js',
    exposes: {
      './Module': './src/app/page',
      './Layout': './src/app/layout',
    },
    shared: {
      react: { singleton: true, requiredVersion: '^19.0.0' },
      'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
      '@infinity/contracts': { singleton: true },
      '@infinity/event-bus': { singleton: true },
      '@infinity/ui': { singleton: false },
      '@infinity/analytics': { singleton: false },
    },
  },
};

/**
 * Remote Entry Points
 */
export const Remotes = {
  commandCenter: 'http://localhost:3001/_next/static/remoteEntry.js',
  careHub: 'http://localhost:3002/_next/static/remoteEntry.js',
};
