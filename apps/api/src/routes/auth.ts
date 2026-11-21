import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { prisma } from '@case-support/database';
import { authConfig } from '../config/authConfig.js';
import { googleAuthService } from '../services/googleAuthService.js';
import { JwtSessionPayload } from '../plugins/authPlugin.js';

const CallbackBodySchema = z.object({
  code: z.string().min(1, 'Código de autorização é obrigatório'),
  state: z.string().optional(),
  redirectUri: z.string().url().optional()
});

export const authRoutes: FastifyPluginAsync = async (server) => {
  // 1. Gera URL de login do Google com State Anti-CSRF
  server.get('/google/url', async (request, reply) => {
    const query = request.query as { redirectUri?: string };
    const state = googleAuthService.generateState();

    reply.setCookie(authConfig.stateCookieName, state, {
      httpOnly: true,
      secure: authConfig.isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: 600 // 10 minutos
    });

    const url = googleAuthService.getAuthorizationUrl(state, query.redirectUri);
    return { url, state };
  });

  // 2. Troca do código de autorização e validação estrita de domínio corporativo
  server.post('/google/callback', async (request, reply) => {
    const parseResult = CallbackBodySchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        error: 'Requisição inválida',
        details: parseResult.error.flatten().fieldErrors
      });
    }

    const { code, state, redirectUri } = parseResult.data;
    const cookieState = request.cookies[authConfig.stateCookieName];

    // Validação Anti-CSRF: se o cookie de state existir, deve bater com o state recebido
    if (cookieState && state && cookieState !== state) {
      return reply.status(403).send({
        error: 'Validação de segurança Anti-CSRF falhou. Inicie o login novamente.'
      });
    }

    // Limpa cookie de state
    reply.clearCookie(authConfig.stateCookieName, { path: '/' });

    try {
      // Validação do token junto ao Google e restrição de domínio
      const googleUser = await googleAuthService.verifyCodeAndDomain(code, redirectUri);

      // Upsert do usuário no banco de dados corporativo
      let user = await prisma.user.findFirst({
        where: {
          OR: [
            { googleSub: googleUser.googleSub },
            { email: googleUser.email }
          ]
        }
      });

      if (!user) {
        // Primeiro acesso: cria novo usuário com papel padrão CASE_SUPPORT
        user = await prisma.user.create({
          data: {
            email: googleUser.email,
            name: googleUser.name,
            picture: googleUser.picture,
            googleSub: googleUser.googleSub,
            hostedDomain: googleUser.hostedDomain,
            role: 'CASE_SUPPORT',
            isActive: true,
            lastLoginAt: new Date()
          }
        });
      } else {
        // Usuário existente: atualiza dados do perfil Google e data de login
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            googleSub: googleUser.googleSub,
            name: googleUser.name,
            picture: googleUser.picture || user.picture,
            hostedDomain: googleUser.hostedDomain,
            lastLoginAt: new Date()
          }
        });
      }

      if (!user.isActive) {
        return reply.status(403).send({
          error: 'Esta conta corporativa está temporariamente desativada no sistema.'
        });
      }

      // Emite JWT de sessão interna
      const payload: JwtSessionPayload = {
        id: user.id,
        email: user.email,
        role: user.role
      };

      const token = server.jwt.sign(payload, { expiresIn: '7d' });

      // Configura Cookie HttpOnly de sessão seguro
      reply.setCookie(authConfig.sessionCookieName, token, {
        httpOnly: true,
        secure: authConfig.isProd,
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 // 7 dias
      });

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          picture: user.picture,
          role: user.role,
          isActive: user.isActive
        },
        token
      };
    } catch (err: any) {
      server.log.error({ err }, 'Erro no callback de autenticação Google');
      return reply.status(403).send({
        error: err.message || 'Falha na autenticação com Google Workspace'
      });
    }
  });

  // 3. Consulta do usuário autenticado atual
  server.get('/me', async (request) => {
    try {
      const cookieToken = request.cookies[authConfig.sessionCookieName];
      let decoded: JwtSessionPayload | null = null;

      if (cookieToken) {
        decoded = server.jwt.verify<JwtSessionPayload>(cookieToken);
      } else {
        decoded = await request.jwtVerify<JwtSessionPayload>();
      }

      if (!decoded?.id) {
        return { user: null };
      }

      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          email: true,
          name: true,
          picture: true,
          role: true,
          isActive: true
        }
      });

      if (!user || !user.isActive) {
        return { user: null };
      }

      return { user };
    } catch {
      return { user: null };
    }
  });

  // 4. Logout seguro
  server.post('/logout', async (_request, reply) => {
    reply.clearCookie(authConfig.sessionCookieName, { path: '/' });
    reply.clearCookie(authConfig.stateCookieName, { path: '/' });
    return { success: true };
  });
};
