/**
 * Federation Contracts
 * 
 * Defines the public interface for all federated modules.
 * - Semantic versioning is mandatory
 * - Version mismatch fails at runtime
 * - All types are strictly defined
 */

export const COMMAND_CENTER_VERSION = '0.1.0';
export const CARE_HUB_VERSION = '0.1.0';

/**
 * CommandCenter Module Contract
 * 
 * Defines the interface that command-center microfrontend
 * must expose to the control-center shell.
 */
export interface CommandCenterContract {
  name: 'CommandCenter';
  version: typeof COMMAND_CENTER_VERSION;
  scope: 'command-center';
  module: './Module';
  dependencies: {
    react: '^19.0.0';
    'react-dom': '^19.0.0';
  };
}

export function getCommandCenterContract(): CommandCenterContract {
  return {
    name: 'CommandCenter',
    version: COMMAND_CENTER_VERSION,
    scope: 'command-center',
    module: './Module',
    dependencies: {
      react: '^19.0.0',
      'react-dom': '^19.0.0',
    },
  };
}

/**
 * CareHub Module Contract
 * 
 * Defines the interface that care-hub microfrontend
 * must expose to the control-center shell.
 */
export interface CareHubContract {
  name: 'CareHub';
  version: typeof CARE_HUB_VERSION;
  scope: 'care-hub';
  module: './Module';
  dependencies: {
    react: '^19.0.0';
    'react-dom': '^19.0.0';
  };
}

export function getCareHubContract(): CareHubContract {
  return {
    name: 'CareHub',
    version: CARE_HUB_VERSION,
    scope: 'care-hub',
    module: './Module',
    dependencies: {
      react: '^19.0.0',
      'react-dom': '^19.0.0',
    },
  };
}

/**
 * Contract Validation
 * 
 * Validates that loaded module matches contract definition
 * and has compatible version.
 */
export interface ContractValidator {
  name: string;
  version: string;
  validateVersion(requiredVersion: string): boolean;
}

export class VersionMismatchError extends Error {
  constructor(
    public module: string,
    public expected: string,
    public actual: string
  ) {
    super(
      `Version mismatch for ${module}: expected ${expected}, got ${actual}`
    );
    this.name = 'VersionMismatchError';
  }
}

export function validateContractVersion(
  moduleName: string,
  expectedVersion: string,
  actualVersion: string
): void {
  if (expectedVersion !== actualVersion) {
    throw new VersionMismatchError(moduleName, expectedVersion, actualVersion);
  }
}
