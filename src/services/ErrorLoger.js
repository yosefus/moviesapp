import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

export const init = () => {
  Sentry.init({
    dsn: 'https://2f63ef8362ef45de9eeb4b9b75717408@o1044819.ingest.sentry.io/6021283',
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
};

export const log = (error) => {
  Sentry.captureException(error);
};
