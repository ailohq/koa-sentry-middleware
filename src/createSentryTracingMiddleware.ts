// eslint-disable-next-line import/no-extraneous-dependencies
import type Koa from "koa";
import type { SentryMonitoring } from "@ailo/monitoring";
import { Span } from "@sentry/apm";

// Copy of `Sentry.Handlers.tracingHandler()`,
// but for koa instead of express
// ( https://github.com/getsentry/sentry-javascript/blob/master/packages/node/src/handlers.ts#L20 )
export const createSentryTracingMiddleware = ({
  monitoring,
  traceRequest,
}: {
  monitoring: SentryMonitoring;
  traceRequest?(ctx: Koa.Context): boolean;
}): Koa.Middleware => (ctx, next) => {
  if (traceRequest && !traceRequest(ctx)) {
    return next();
  }

  const reqMethod = ctx.method;
  const reqPath = ctx.path;

  let traceId;
  let parentSpanId;
  let sampled;
  const traceparent =
    ctx.request.headers["ailo-traceparent"] ||
    ctx.request.headers["sentry-trace"];
  if (traceparent) {
    const span = Span.fromTraceparent(traceparent);
    if (span) {
      traceId = span.traceId;
      parentSpanId = span.parentSpanId;
      sampled = monitoring.options.tracesSampleRate >= 1 ? true : span.sampled;
    }
  }

  return monitoring.runInTransaction(
    {
      name: `${reqMethod} ${reqPath}`,
      op: "http.server",
      parentSpanId,
      sampled,
      traceId,
      tags: {
        device_id: ctx.request.headers["ailo-device-id"],
        session_id: ctx.request.headers["ailo-session-id"],
        correlation_id: ctx.request.headers["ailo-correlation-id"],
      },
    },
    async (transaction) => {
      ctx.__sentry_transaction = transaction;

      try {
        const result = await next();
        transaction.setHttpStatus(ctx.status);
        return result;
      } catch (error) {
        transaction.setHttpStatus(500);
        throw error;
      }
    },
    [ctx.req, ctx.res, ctx.req.socket]
  );
};
