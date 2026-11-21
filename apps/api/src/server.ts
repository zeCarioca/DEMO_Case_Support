import fastify from 'fastify';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import jwt from '@fastify/jwt';
import { sopRoutes } from './routes/sops.js';
import { caseRoutes } from './routes/cases.js';
import { checklistRoutes } from './routes/checklists.js';
import { priorityTaskRoutes } from './routes/priorityTasks.js';
import { newspaperRoutes } from './routes/newspapers.js';
import { authRoutes } from './routes/auth.js';
import { registerAuthPlugin } from './plugins/authPlugin.js';
import { authConfig } from './config/authConfig.js';

const server = fastify({
  logger: true
});

// Secure CORS configuration with origin whitelist
await server.register(cors, {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (authConfig.allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      return cb(null, true);
    }
    return cb(new Error('Origem não autorizada pelas políticas de segurança CORS'), false);
  },
  credentials: true
});

// Cookie and JWT session handling
await server.register(cookie, {
  secret: authConfig.cookieSecret
});

await server.register(jwt, {
  secret: authConfig.jwtSecret
});

// Decorate server with authenticate middleware
await registerAuthPlugin(server);

// Health check
server.get('/health', async () => {
  return { status: 'healthy', timestamp: new Date().toISOString() };
});

// Authentication Routes
await server.register(authRoutes, { prefix: '/api/auth' });

// Public Utility Routes
await server.register(newspaperRoutes, { prefix: '/api/newspapers' });

// Protected Corporate API Routes (requires active corporate session)
await server.register(async (protectedScope) => {
  protectedScope.addHook('onRequest', server.authenticate);

  await protectedScope.register(sopRoutes, { prefix: '/sops' });
  await protectedScope.register(caseRoutes, { prefix: '/cases' });
  await protectedScope.register(checklistRoutes, { prefix: '/checklists' });
  await protectedScope.register(priorityTaskRoutes, { prefix: '/priority-tasks' });
}, { prefix: '/api' });

const PORT = parseInt(process.env.PORT || '4000', 10);
const HOST = process.env.HOST || '0.0.0.0';

try {
  await server.listen({ port: PORT, host: HOST });
  console.log(`Server listening on http://localhost:${PORT}`);
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
