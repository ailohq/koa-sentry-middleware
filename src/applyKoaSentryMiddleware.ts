// eslint-disable-next-line import/no-extraneous-dependencies
import type Koa from "koa";
import type { Monitoring } from "@ailo/monitoring";
import { createSentryErrorHandler } from "./createSentryErrorHandler";
import { createSentryRequestMiddleware } from "./createSentryRequestMiddleware";
import { createSentryTracingMiddleware } from "./createSentryTracingMiddleware";

interface KoaSentryMiddlewareOptions {
  /**
   * Required if `trace` is true.
   */
  monitoring?: Monitoring;

  /**
   * If true, enables tracing using Sentry Performance.
   * Requires `monitoring` to be passed as well.
   * @default true
   */
  trace?: boolean;

  /**
   * Should trace the given request?
   * @default ctx => !["/ping", "/metrics"].includes(ctx.path)
   */
  traceRequest?(ctx: Koa.Context): boolean;
}

export function applyKoaSentryMiddleware(
  app: Koa,
  {
    monitoring,
    trace = !!monitoring,
    traceRequest = (ctx) => !["/ping", "/metrics"].includes(ctx.path),
  }: KoaSentryMiddlewareOptions = {}
) {
  app.use(createSentryRequestMiddleware());

  if (trace) {
    if (!monitoring) {
      throw new TypeError(
        `\`monitoring\` needs to be passed when \`trace\` is true`
      );
    }
    app.use(createSentryTracingMiddleware({ monitoring, traceRequest }));
  }

  app.on("error", createSentryErrorHandler());
}
