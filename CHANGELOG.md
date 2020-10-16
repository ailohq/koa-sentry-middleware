# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.3.0](https://github.com/ailohq/koa-sentry-middleware/compare/v2.2.2...v2.3.0) (2020-10-16)


### Features

* Mark the transaction always as sampled if `tracesSampleRate` is set to 1 (META-75) ([1c49130](https://github.com/ailohq/koa-sentry-middleware/commit/1c49130b12c425a97ce14affca6e836a35289a64))

### [2.2.2](https://github.com/ailohq/koa-sentry-middleware/compare/v2.2.1...v2.2.2) (2020-10-16)


### Bug Fixes

* Also pass `device_id` and `session_id` to Sentry context from the request headers (META-121) ([8bc561e](https://github.com/ailohq/koa-sentry-middleware/commit/8bc561ea44c991ad6f5a1630a9b2952cbe799cde))

### [2.2.1](https://github.com/ailohq/koa-sentry-middleware/compare/v2.2.0...v2.2.1) (2020-09-29)


### Bug Fixes

* Rename traceparent header to `ailo-traceparent` ([25a7909](https://github.com/ailohq/koa-sentry-middleware/commit/25a790990e0468d42233bbc1a50f332f7c0a5304))

## [2.2.0](https://github.com/ailohq/koa-sentry-middleware/compare/v2.1.1...v2.2.0) (2020-09-29)


### Features

* get traceparent header from `ailo-trace-token` header as well ([63b9577](https://github.com/ailohq/koa-sentry-middleware/commit/63b9577dace959402ceef9740cf4954f114b3104))

### [2.1.1](https://github.com/ailohq/koa-sentry-middleware/compare/v2.1.0...v2.1.1) (2020-09-15)


### Bug Fixes

* Properly wrap request in a sentry transaction ([06375af](https://github.com/ailohq/koa-sentry-middleware/commit/06375afd3e13b180f2714c0a8696faf07b609e2a))

## [2.1.0](https://github.com/ailohq/koa-sentry-middleware/compare/v2.0.1...v2.1.0) (2020-09-15)


### Features

* Ignore tracing for /ping and /metrics requests by default ([50e03f1](https://github.com/ailohq/koa-sentry-middleware/commit/50e03f1abe5c9e25bf837c58637b8181afbc013e))

### [2.0.1](https://github.com/ailohq/koa-sentry-middleware/compare/v2.0.0...v2.0.1) (2020-08-19)


### Bug Fixes

* Bind http event emitters to cls namespace ([2ae7c08](https://github.com/ailohq/koa-sentry-middleware/commit/2ae7c083c2c4a607422d95cf5d633ad355a531ed))

## [2.0.0](https://github.com/ailohq/koa-sentry-middleware/compare/v1.0.1...v2.0.0) (2020-08-19)


### ⚠ BREAKING CHANGES

* You have to pass `{ monitoring }` into the `applyKoaSentryMiddleware()` function.

### Features

* use `Monitoring.runInTransaction` to avoid problems with empty scope if there are several http requests happening at once ([7b67a84](https://github.com/ailohq/koa-sentry-middleware/commit/7b67a8426ff404ec2e861d3087cba2dbef7feb22))

### 1.0.1 (2020-08-18)
