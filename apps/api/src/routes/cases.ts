import { FastifyPluginAsync } from 'fastify';
import { prisma } from '@case-support/database';
import { z } from 'zod';

const CreateCaseBodySchema = z.object({
  caseNumber: z.string().min(1),
  clientName: z.string().min(1),
  sponsorName: z.string().min(1),
  jobTitle: z.string().min(1),
  socCode: z.string().optional(),
  eb3Category: z.enum(['SKILLED_WORKER', 'PROFESSIONAL', 'OTHER_WORKERS']).default('SKILLED_WORKER'),
  currentPhase: z.enum(['PHASE_A_DOL_PERM', 'PHASE_B_USCIS_I140', 'PHASE_C_GREEN_CARD_AOS']).default('PHASE_A_DOL_PERM'),
  googleDriveUrl: z.string().optional(),
  flagCaseNumber: z.string().optional()
});

export const caseRoutes: FastifyPluginAsync = async (server) => {
  // List all cases with progress summary
  server.get('/', async (request, reply) => {
    const cases = await prisma.case.findMany({
      include: {
        checklists: {
          select: {
            completed: true,
            approved: true
          }
        },
        customTasks: {
          select: {
            completed: true,
            isArchived: true
          }
        },
        caseSupport: { select: { name: true, email: true } },
        caseManager: { select: { name: true, email: true } }
      },
      orderBy: { updatedAt: 'desc' }
    });

    const enriched = cases.map((c: any) => {
      const activeCustomTasks = c.customTasks?.filter((t: any) => !t.isArchived) || [];
      const totalSteps = c.checklists.length + activeCustomTasks.length;
      const completedSteps =
        c.checklists.filter((item: any) => item.completed).length +
        activeCustomTasks.filter((t: any) => t.completed).length;
      const progressPercent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
      return {
        ...c,
        totalSteps,
        completedSteps,
        progressPercent
      };
    });

    return reply.send({ cases: enriched });
  });

  // Get single case details with full checklist item status and custom tasks
  server.get('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const caseRecord = await prisma.case.findUnique({
      where: { id },
      include: {
        checklists: {
          include: {
            template: true,
            completedByUser: { select: { id: true, name: true, role: true } },
            approvedByUser: { select: { id: true, name: true, role: true } }
          },
          orderBy: { template: { order: 'asc' } }
        },
        customTasks: {
          orderBy: { createdAt: 'asc' }
        },
        caseSupport: true,
        caseManager: true
      }
    });

    if (!caseRecord) {
      return reply.status(404).send({ error: 'Case not found' });
    }

    const activeCustomTasks = caseRecord.customTasks?.filter((t: any) => !t.isArchived) || [];
    const totalSteps = caseRecord.checklists.length + activeCustomTasks.length;
    const completedSteps =
      caseRecord.checklists.filter((item: any) => item.completed).length +
      activeCustomTasks.filter((t: any) => t.completed).length;
    const progressPercent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

    return reply.send({
      case: {
        ...caseRecord,
        totalSteps,
        completedSteps,
        progressPercent
      }
    });
  });

  // Create new case & automatically initialize its checklist from templates
  server.post('/', async (request, reply) => {
    const parsed = CreateCaseBodySchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid input', details: parsed.error.format() });
    }

    const data = parsed.data;

    // Check if caseNumber is already taken
    const existing = await prisma.case.findUnique({
      where: { caseNumber: data.caseNumber }
    });
    if (existing) {
      return reply.status(409).send({ error: `Case number ${data.caseNumber} already exists` });
    }

    const newCase = await prisma.case.create({
      data: {
        caseNumber: data.caseNumber,
        clientName: data.clientName,
        sponsorName: data.sponsorName,
        jobTitle: data.jobTitle,
        socCode: data.socCode,
        eb3Category: data.eb3Category,
        currentPhase: data.currentPhase,
        googleDriveUrl: data.googleDriveUrl,
        flagCaseNumber: data.flagCaseNumber
      }
    });

    // Attach initial phase checklist templates
    const templates = await prisma.checklistTemplate.findMany({
      where: { phase: data.currentPhase },
      orderBy: { order: 'asc' }
    });

    for (const tmpl of templates) {
      await prisma.caseChecklistProgress.create({
        data: {
          caseId: newCase.id,
          templateId: tmpl.id,
          completed: false
        }
      });
    }

    return reply.status(201).send({ case: newCase });
  });

  // Update external reference links & notes
  server.patch('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const body = request.body as Record<string, any>;

    const updated = await prisma.case.update({
      where: { id },
      data: body
    });

    return reply.send({ case: updated });
  });

  // Create custom task for a case
  server.post('/:id/tasks', async (request, reply) => {
    const { id: caseId } = request.params as { id: string };
    const CreateTaskSchema = z.object({
      title: z.string().min(1),
      assignedRole: z.string().default('CASE_SUPPORT'),
      criticalNote: z.string().optional().nullable(),
      notes: z.string().optional().nullable()
    });

    const parsed = CreateTaskSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid input', details: parsed.error.format() });
    }

    const task = await prisma.caseCustomTask.create({
      data: {
        caseId,
        title: parsed.data.title,
        assignedRole: parsed.data.assignedRole,
        criticalNote: parsed.data.criticalNote,
        notes: parsed.data.notes
      }
    });

    return reply.status(201).send({ task });
  });

  // Toggle custom task completion
  server.patch('/:caseId/tasks/:taskId/toggle', async (request, reply) => {
    const { taskId } = request.params as { caseId: string; taskId: string };
    const existing = await prisma.caseCustomTask.findUnique({ where: { id: taskId } });
    if (!existing) {
      return reply.status(404).send({ error: 'Task not found' });
    }

    const nextCompleted = !existing.completed;
    const updated = await prisma.caseCustomTask.update({
      where: { id: taskId },
      data: {
        completed: nextCompleted,
        completedAt: nextCompleted ? new Date() : null
      }
    });

    return reply.send({ task: updated });
  });

  // Archive / unarchive custom task
  server.patch('/:caseId/tasks/:taskId/archive', async (request, reply) => {
    const { taskId } = request.params as { caseId: string; taskId: string };
    const { isArchived } = (request.body as { isArchived: boolean }) || { isArchived: true };
    const existing = await prisma.caseCustomTask.findUnique({ where: { id: taskId } });
    if (!existing) {
      return reply.status(404).send({ error: 'Task not found' });
    }

    const updated = await prisma.caseCustomTask.update({
      where: { id: taskId },
      data: {
        isArchived,
        archivedAt: isArchived ? new Date() : null
      }
    });

    return reply.send({ task: updated });
  });

  // Delete custom task permanently
  server.delete('/:caseId/tasks/:taskId', async (request, reply) => {
    const { taskId } = request.params as { caseId: string; taskId: string };
    const existing = await prisma.caseCustomTask.findUnique({ where: { id: taskId } });
    if (!existing) {
      return reply.status(404).send({ error: 'Task not found' });
    }

    await prisma.caseCustomTask.delete({ where: { id: taskId } });
    return reply.send({ success: true, deletedTaskId: taskId });
  });
};

