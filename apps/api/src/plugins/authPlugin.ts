import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { prisma, type User } from '@case-support/database';
import { authConfig } from '../config/authConfig.js';

export interface JwtSessionPayload {
  id: string;
  email: string;
  role: string;
}

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
  interface FastifyRequest {
    currentUser?: User | null;
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: JwtSessionPayload;
    user: JwtSessionPayload;
  }
}

export async function registerAuthPlugin(server: FastifyInstance) {
  server.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // 1. Try to read token from session cookie first
      const cookieToken = request.cookies[authConfig.sessionCookieName];
      let decoded: JwtSessionPayload | null = null;

      if (cookieToken) {
        decoded = server.jwt.verify<JwtSessionPayload>(cookieToken);
      } else {
        // 2. Fall back to Authorization: Bearer <token>
        decoded = await request.jwtVerify<JwtSessionPayload>();
      }

      if (!decoded?.id) {
        return reply.status(401).send({ error: 'Sessão inválida ou não autenticada' });
      }

      // 3. Verify user in database
      const user = await prisma.user.findUnique({
        where: { id: decoded.id }
      });

      if (!user) {
        return reply.status(401).send({ error: 'Usuário não encontrado' });
      }

      if (!user.isActive) {
        return reply.status(403).send({ error: 'Conta corporativa inativa ou suspensa' });
      }

      request.currentUser = user;
    } catch (err) {
      server.log.warn({ err }, 'Falha na autenticação da requisição');
      return reply.status(401).send({ error: 'Token de autenticação inválido ou expirado' });
    }
  });
}
