# Deployment Configuration

## Architecture Overview

This monorepo deploys to a distributed infrastructure:

- **Control Center (Shell)**: Deployed to primary CDN
- **Microfrontends**: Deployed to separate CDN with version hashing
- **Workers**: Deployed as serverless functions or containers
- **Shared Assets**: Versioned and immutable on CDN

## Deployment Strategy

### Apps
Each app builds independently and uploads artifacts to CDN:

```
control-center/
├─ dist/
│  ├─ _next/
│  └─ public/

command-center/
├─ dist/
│  ├─ remoteEntry.js (v0.1.0)
│  ├─ _next/
│  └─ public/

care-hub/
├─ dist/
│  ├─ remoteEntry.js (v0.1.0)
│  ├─ _next/
│  └─ public/
```

### Workers
Workers deploy as separate services:
- control-worker (service, daemon)
- command-worker (service, daemon)
- care-worker (service, daemon)

### Versioning
All federation assets are versioned:
- Federation contracts: Semantic versioning enforced
- Remote entry points: Immutable URLs with version hashes
- Packages: Published to private registry

## CI/CD Pipeline

### Build Stage
1. Install dependencies
2. Run type-check
3. Validate contracts
4. Build all packages
5. Build all apps
6. Build all workers

### Test Stage
1. Run unit tests
2. Run integration tests
3. Validate federation contracts

### Deploy Stage
1. Upload apps to CDN (versioned)
2. Update federation manifests
3. Deploy workers
4. Run smoke tests
5. Update DNS/routing

## Infrastructure Requirements

- Node.js 18+
- pnpm 8+
- CDN with versioning support
- Container runtime (Docker)
- Artifact registry
- CI/CD platform (GitHub Actions, GitLab CI, etc.)

## Key Files

- `federation/config.ts` - Federation module definitions
- `environments/index.ts` - Environment configurations
- CI/CD pipelines in `.github/workflows/` or similar
