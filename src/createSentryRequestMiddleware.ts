import * as Sentry from "@sentry/node";
// eslint-disable-next-line import/no-extraneous-dependencies
import type Koa from "koa";

// Copy of `Sentry.Handlers.requestHandler()`,
// but for koa instead of express
// ( https://github.com/getsentry/sentry-javascript/blob/master/packages/node/src/handlers.ts#L326 )
// eslint-disable-next-line unicorn/consistent-function-scoping
export const createSentryRequestMiddleware = (): Koa.Middleware => {
  let request: Koa.Request | undefined;

  Sentry.getCurrentHub().configureScope((scope) => {
    scope.addEventProcessor((event) => {
      if (request) {
        return Sentry.Handlers.parseRequest(event, request);
      }
      return event;
    });
  });

  return async (ctx, next) => {
    request = ctx.request;

    Sentry.getCurrentHub().configureScope((scope) => {
      scope.clearBreadcrumbs();
      scope.setTags({
        device_id: ctx.request.headers["ailo-device-id"],
        session_id: ctx.request.headers["ailo-session-id"],
        correlation_id: ctx.request.headers["ailo-correlation-id"],
      });
    });

    await next();

    request = undefined;

    Sentry.getCurrentHub().configureScope((scope) => {
      scope.setTags({
        // This is the only way to remove tags for now
        // ( https://github.com/getsentry/sentry-javascript/issues/2218 )
        /* eslint-disable @typescript-eslint/no-explicit-any */
        device_id: undefined as any,
        session_id: undefined as any,
        correlation_id: undefined as any,
        /* eslint-enable @typescript-eslint/no-explicit-any */
      });
    });
  };
};
