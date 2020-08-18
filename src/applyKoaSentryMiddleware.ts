// eslint-disable-next-line import/no-extraneous-dependencies
import type Koa from "koa";
import { createSentryErrorHandler } from "./createSentryErrorHandler";
import { createSentryRequestMiddleware } from "./createSentryRequestMiddleware";
import { createSentryTracingMiddleware } from "./createSentryTracingMiddleware";

interface KoaSentryMiddlewareOptions {
  tracing?: boolean;
}

export function applyKoaSentryMiddleware(
  app: Koa,
  { tracing = true }: KoaSentryMiddlewareOptions = {}
) {
  app.use(createSentryRequestMiddleware());
  if (tracing) {
    app.use(createSentryTracingMiddleware());
  }
  app.on("error", createSentryErrorHandler());
}
