import type { Transaction } from "@sentry/tracing";
import * as Sentry from "@sentry/node";
// eslint-disable-next-line import/no-extraneous-dependencies
import type Koa from "koa";

// Copy of `Sentry.Handlers.errorHandler()`,
// but for koa instead of express
// ( https://github.com/getsentry/sentry-javascript/blob/master/packages/node/src/handlers.ts#L388 )
// eslint-disable-next-line unicorn/consistent-function-scoping
export const createSentryErrorHandler = () => (
  err: Error,
  ctx: Koa.Context
): void => {
  Sentry.withScope((scope) => {
    const transaction: Transaction | undefined = ctx.__sentry_transaction;
    if (transaction) {
      scope.setSpan(transaction);
    }

    ctx.sentryEventId = Sentry.captureException(err);
  });
};
