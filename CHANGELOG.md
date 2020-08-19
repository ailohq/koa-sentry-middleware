# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.0.1](https://github.com/ailohq/koa-sentry-middleware/compare/v2.0.0...v2.0.1) (2020-08-19)


### Bug Fixes

* Bind http event emitters to cls namespace ([2ae7c08](https://github.com/ailohq/koa-sentry-middleware/commit/2ae7c083c2c4a607422d95cf5d633ad355a531ed))

## [2.0.0](https://github.com/ailohq/koa-sentry-middleware/compare/v1.0.1...v2.0.0) (2020-08-19)


### ⚠ BREAKING CHANGES

* You have to pass `{ monitoring }` into the `applyKoaSentryMiddleware()` function.

### Features

* use `Monitoring.runInTransaction` to avoid problems with empty scope if there are several http requests happening at once ([7b67a84](https://github.com/ailohq/koa-sentry-middleware/commit/7b67a8426ff404ec2e861d3087cba2dbef7feb22))

### 1.0.1 (2020-08-18)
