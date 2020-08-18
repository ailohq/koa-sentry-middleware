// eslint-disable-next-line import/no-extraneous-dependencies
import type Koa from "koa";
import * as Sentry from "@sentry/node";
import { Span } from "@sentry/apm";

// Copy of `Sentry.Handlers.tracingHandler()`,
// but for koa instead of express
// ( https://github.com/getsentry/sentry-javascript/blob/master/packages/node/src/handlers.ts#L20 )
// eslint-disable-next-line unicorn/consistent-function-scoping
export const createSentryTracingMiddleware = (): Koa.Middleware => async (
  ctx,
  next
) => {
  const reqMethod = ctx.method;
  const reqUrl = ctx.url;

  let traceId;
  let parentSpanId;
  let sampled;

  // If there is a trace header set, we extract the data from it and set the span on the scope
  // to be the origin an created transaction set the parent_span_id / trace_id
  if (ctx.request.headers["sentry-trace"]) {
    const span = Span.fromTraceparent(ctx.request.headers["sentry-trace"]);
    if (span) {
      traceId = span.traceId;
      parentSpanId = span.parentSpanId;
      sampled = span.sampled;
    }
  }

  const correlationId: string | undefined =
    ctx.request.headers["x-correlation-id"];

  const transaction = Sentry.startTransaction({
    name: `${reqMethod} ${reqUrl}`,
    op: "http.server",
    parentSpanId,
    sampled,
    traceId,
    tags: {
      correlation_id: correlationId || "unknown",
    },
  });

  // We put the transaction on the scope so users can attach children to it
  Sentry.getCurrentHub().configureScope((scope) => {
    scope.setSpan(transaction);
  });

  ctx.__sentry_transaction = transaction;

  try {
    await next();
  } finally {
    transaction.setHttpStatus(ctx.status);
    transaction.finish();

    Sentry.getCurrentHub().configureScope((scope) => {
      scope.setSpan(undefined);
    });
  }
};
