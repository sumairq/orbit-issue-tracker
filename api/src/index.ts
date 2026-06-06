import 'module-alias/register';
import 'dotenv/config';
import 'reflect-metadata';
import express, { Express } from 'express';
import cors from 'cors';

import createDatabaseConnection from 'database/createConnection';
import { addRespondToResponse } from 'middleware/response';
import { authenticateUser } from 'middleware/authentication';
import { handleError } from 'middleware/errors';
import { RouteNotFoundError } from 'errors';

import { attachPublicRoutes, attachPrivateRoutes } from './routes';

// Cache the connection across warm serverless invocations so we only
// initialize a single DataSource per container.
let connectionPromise: Promise<unknown> | null = null;
const ensureDatabaseConnection = (): Promise<unknown> => {
  if (!connectionPromise) {
    connectionPromise = createDatabaseConnection().catch(error => {
      // Reset so the next request can retry instead of caching the failure.
      connectionPromise = null;
      throw error;
    });
  }
  return connectionPromise;
};

const createApp = (): Express => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded());

  app.use(addRespondToResponse);

  app.use((_req, _res, next) => {
    ensureDatabaseConnection().then(() => next(), next);
  });

  attachPublicRoutes(app);

  app.use('/', authenticateUser);

  attachPrivateRoutes(app);

  app.use((req, _res, next) => next(new RouteNotFoundError(req.originalUrl)));
  app.use(handleError);

  return app;
};

const app = createApp();

// On Vercel (and other serverless platforms) the function must export the
// Express app; the platform handles incoming requests. Locally we listen.
if (!process.env.VERCEL) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server start on port ${port}`);
  });
}

export default app;
