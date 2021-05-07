# @ailo/koa-sentry-middleware

Middleware for Koa HTTP server that:

- configures Sentry scope with Koa HTTP request information,
- catches errors that happen in Koa request-response cycle,
- wraps HTTP request-response in a [Sentry Transaction](https://docs.sentry.io/product/performance/).

## Usage example

1. Setup Sentry (`@sentry/node` and `@sentry/tracing` packages - refer to Sentry docs).

2. `yarn add @ailo/koa-sentry-middleware`

3. ```ts
   import { applyKoaSentryMiddleware } from "@ailo/koa-sentry-middleware";
   import { monitoring } from "./utils/monitoring";

   export const app = new Koa();
   applyKoaSentryMiddleware(app, { monitoring });
   ```

## Development

```sh
yarn
yarn start
```

## Testing

```sh
yarn lint # prettier and eslint
yarn test # unit tests
yarn test:watch # unit tests in watch mode
```

## Releasing

**Note: Releasing is done manually (CI isn't configured yet).** Linters, tests, build and so on are run during each `git push` / `yarn release`.

```sh
yarn release # will automatically ask you about version bump, run tests and build, and push new version to git & npm
```
