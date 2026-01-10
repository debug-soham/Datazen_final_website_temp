import { app } from '../server/routes';
// Note: We need to make sure routes.ts exports 'app' or we need to restructure.
// Let's check server/routes.ts content again.
// It exports registerRoutes(app). 
// So I need to instantiate express here, register routes, and export.

import express from 'express';
import { registerRoutes } from '../server/routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register routes
// registerRoutes is async, returns server, but for Vercel we just need the app with routes attached.
// We need to wait for registerRoutes to complete if it does setup.
// However, Vercel functions are stateless lambda.
// Ideally, we export a handler.

// Let's wrap this in a way Vercel expects. 
// Vercel expects "export default function (request, response)" or similar for Node.js
// OR if using Express, "export default app".

// Since registerRoutes is async, we might need a top-level await or a wrapper.
// But Vercel Node.js runtime supports async start?
// Actually simpler:
// export default async function handler(req, res) {
//   await registerRoutes(app);
//   app(req, res);
// }
// Wait, doing this every request is bad for perf if it connects to DB.
// But `registerRoutes` in this codebase seems to just `app.post(...)`.
// Let's look at `server/routes.ts` again in previous turn.
// It imports `storage` from `./storage`.
// It does `const httpServer = createServer(app); return httpServer;`.
// It adds routes to `app`.

// So:
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// We need to ensure we don't re-register routes on every cold start if possible, 
// but for now let's just do it.
await registerRoutes(app);

export default app;
