# Deploying Next.js Monorepos to Firebase App Hosting
> [!IMPORTANT]
> This guide documents the "hard-won" configuration required to make Firebase App Hosting play nice with an NPM Workspaces monorepo.

## 1. Git & Workspace Setup
*   **One Git to Rule Them All**: Ensure there are NO nested `.git` folders in `apps/*` or `packages/*`. If you moved folders, delete their hidden `.git` directories.
*   **NPM Workspaces**: Define your workspaces in the root `package.json`.
*   **Root Directory**: In the Firebase Console, set the **Root Directory** to `/` (the root of the repo), NOT the sub-app folder. This allows the builder to resolve shared packages.
*   **Node.js Version**: Node 18 is deprecated/decommissioned on Firebase as of late 2025. Use **Node 20 or 22** in your `engines` and `tsconfig` targets.

## 2. Next.js Configuration (`apps/web/next.config.ts`)
Enable **Standalone Output**. This is required for the App Hosting adapter.
```typescript
const nextConfig: NextConfig = {
  output: 'standalone',
};
```

## 3. The "Flattening" Build Script (`package.json`)
The App Hosting adapter expects a standard Next.js layout. In a monorepo, standalone output is nested (e.g., `.next/standalone/apps/web/...`). You must "flatten" this structure back to the root during the build.

```json
"scripts": {
  "build": "npm run build -w packages/shared && npm run build -w apps/web && rm -rf .next public && mkdir -p .next/standalone && cp -r apps/web/.next/standalone/apps/web/. .next/standalone/ && cp -r apps/web/.next/standalone/node_modules .next/standalone/node_modules && cp -r apps/web/.next/static .next/static && cp -r apps/web/public public",
  "start": "PORT=8080 node .next/standalone/server.js"
}
```

## 4. Platform-Specific Pitfalls (`EBADPLATFORM`)
Cloud builders (App Hosting, Cloud Build) run on **Linux x64**. If your root `package.json` explicitly lists macOS-only dependencies, the build will fail.
*   **The Culprit**: `fsevents` and platform-specific binaries like `lightningcss-darwin-arm64`.
*   **Fix**: Remove these from your root `dependencies`. NPM will automatically pull the correct binary for the actual build platform if they are listed as optional/transitive dependencies.

## 5. Cloud Functions & Monorepo "Vendoring"
The Firebase Functions builder often fails to resolve local workspace packages (e.g., `@agentrack/shared`) because it doesn't have access to the full monorepo at install time.
*   **Solution**: "Vendor" your local packages into the functions directory during `predeploy`.
*   **firebase.json**:
    ```json
    "predeploy": [
      "npm run build -w packages/shared",
      "rm -rf apps/functions/libs && mkdir -p apps/functions/libs",
      "cp -r packages/shared apps/functions/libs/",
      "cp -r packages/sql-sdk apps/functions/libs/",
      "npm --prefix \"$RESOURCE_DIR\" run build"
    ]
    ```
*   **package.json (functions)**: Use `file:./libs/shared` instead of workspace versions.

## 6. Data Connect Shared SDK
When sharing a Data Connect SDK across Frontend (React) and Backend (Node), ensure `react: true` is set in reaching the SDK.
*   **connector.yaml**:
    ```yaml
    generate:
      javascriptSdk:
        - outputDir: ../../packages/sql-sdk
          react: true
    ```
*   **Imports**: Use `@agentrack/sql-sdk/react` for Next.js and `@agentrack/sql-sdk` for Functions.

## 7. Build-Time Safeguards (`lib/firebase.ts`)
Next.js tries to pre-render pages during `next build`. If your Firebase config relies on `NEXT_PUBLIC_` vars that aren't in the build environment, it will crash.
*   **Fix**: Check if `apiKey` exists before calling `initializeApp`, or use placeholders for the build phase.

## 8. Troubleshooting
*   **Permission Error (os error 1)**: Often caused by a `package-lock.json` existing in a parent directory (like your home folder `/Users/name/`). Delete the rogue lockfile.
*   **Port 8080 Error**: Usually means the container crashed *before* it could listen. Check that `server.js` can find its `.next` folder.
*   **Module Not Found (@dataconnect/generated)**: Ensure you've removed all stale imports after moving to a shared SQL SDK.
