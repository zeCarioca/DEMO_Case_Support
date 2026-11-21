import { FastifyPluginAsync } from 'fastify';
import { PermResolutionRequestSchema } from '@case-support/shared-types';
import { resolveNewspaperForLocation } from '../services/newspaper/resolutionEngine.js';

export const newspaperRoutes: FastifyPluginAsync = async (server) => {
  // POST /api/newspapers/resolve
  server.post('/resolve', async (request, reply) => {
    try {
      const parsed = PermResolutionRequestSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({
          error: 'INVALID_INPUT',
          details: parsed.error.format()
        });
      }

      const result = resolveNewspaperForLocation(parsed.data);
      return result;
    } catch (err) {
      server.log.error(err);
      return reply.status(500).send({
        error: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to resolve PERM newspaper'
      });
    }
  });

  // GET /api/newspapers/resolve
  server.get('/resolve', async (request, reply) => {
    try {
      const query = request.query as Record<string, string>;
      const lat = query.lat ? parseFloat(query.lat) : undefined;
      const lng = query.lng ? parseFloat(query.lng) : undefined;

      const parsed = PermResolutionRequestSchema.safeParse({
        zip_code: query.zip_code || query.zip,
        city: query.city,
        state: query.state,
        county_fips: query.county_fips,
        cbsa_code: query.cbsa_code,
        lat: isNaN(lat as number) ? undefined : lat,
        lng: isNaN(lng as number) ? undefined : lng
      });

      if (!parsed.success) {
        return reply.status(400).send({
          error: 'INVALID_INPUT',
          details: parsed.error.format()
        });
      }

      const result = resolveNewspaperForLocation(parsed.data);
      return result;
    } catch (err) {
      server.log.error(err);
      return reply.status(500).send({
        error: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to resolve PERM newspaper'
      });
    }
  });
};
