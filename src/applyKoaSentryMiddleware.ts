// eslint-disable-next-line import/no-extraneous-dependencies
import type Koa from "koa";
import type { Monitoring } from "@ailo/monitoring";
import { createSentryErrorHandler } from "./createSentryErrorHandler";
import { createSentryRequestMiddleware } from "./createSentryRequestMiddleware";
import { createSentryTracingMiddleware } from "./createSentryTracingMiddleware";

interface KoaSentryMiddlewareOptions {
  /**
   * If given, enables tracing using Sentry Performance.
   */
  monitoring?: Monitoring;
}

export function applyKoaSentryMiddleware(
  app: Koa,
  { monitoring }: KoaSentryMiddlewareOptions = {}
) {
  app.use(createSentryRequestMiddleware());
  if (monitoring) {
    app.use(createSentryTracingMiddleware(monitoring));
  }
  app.on("error", createSentryErrorHandler());
}
