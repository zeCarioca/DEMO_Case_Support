import { FastifyPluginAsync } from 'fastify';
import { prisma } from '@case-support/database';

export const checklistRoutes: FastifyPluginAsync = async (server) => {
  // Toggle step completion status
  server.patch('/:progressId/toggle', async (request, reply) => {
    const { progressId } = request.params as { progressId: string };
    const { userId, notes } = (request.body as { userId?: string; notes?: string }) || {};

    const existing = await prisma.caseChecklistProgress.findUnique({
      where: { id: progressId },
      include: { template: true }
    });

    if (!existing) {
      return reply.status(404).send({ error: 'Checklist step not found' });
    }

    const nextCompleted = !existing.completed;

    const updated = await prisma.caseChecklistProgress.update({
      where: { id: progressId },
      data: {
        completed: nextCompleted,
        completedAt: nextCompleted ? new Date() : null,
        completedByUserId: nextCompleted ? userId || null : null,
        // Reset approval if step was unmarked
        approved: nextCompleted ? existing.approved : null,
        approvedAt: nextCompleted ? existing.approvedAt : null,
        approvedByUserId: nextCompleted ? existing.approvedByUserId : null,
        notes: notes !== undefined ? notes : existing.notes
      },
      include: {
        template: true,
        completedByUser: { select: { id: true, name: true, role: true } },
        approvedByUser: { select: { id: true, name: true, role: true } }
      }
    });

    return reply.send({ step: updated });
  });

  // Approve a step (by Case Manager or Legal)
  server.post('/:progressId/approve', async (request, reply) => {
    const { progressId } = request.params as { progressId: string };
    const { userId, approved } = (request.body as { userId?: string; approved: boolean });

    const existing = await prisma.caseChecklistProgress.findUnique({
      where: { id: progressId },
      include: { template: true }
    });

    if (!existing) {
      return reply.status(404).send({ error: 'Checklist step not found' });
    }

    if (!existing.completed && approved) {
      return reply.status(400).send({ error: 'Cannot approve a step that is not yet completed' });
    }

    const updated = await prisma.caseChecklistProgress.update({
      where: { id: progressId },
      data: {
        approved: approved,
        approvedAt: approved ? new Date() : null,
        approvedByUserId: approved ? userId || null : null
      },
      include: {
        template: true,
        completedByUser: { select: { id: true, name: true, role: true } },
        approvedByUser: { select: { id: true, name: true, role: true } }
      }
    });

    return reply.send({ step: updated });
  });

  // Update notes on a step
  server.patch('/:progressId/notes', async (request, reply) => {
    const { progressId } = request.params as { progressId: string };
    const { notes } = request.body as { notes: string };

    const updated = await prisma.caseChecklistProgress.update({
      where: { id: progressId },
      data: { notes }
    });

    return reply.send({ step: updated });
  });
};
