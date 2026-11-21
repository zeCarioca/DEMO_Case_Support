import { FastifyPluginAsync } from 'fastify';
import { prisma } from '@case-support/database';
import { z } from 'zod';

const PriorityEnum = z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']);

const CreateTaskSchema = z.object({
  title: z.string().min(1),
  priority: PriorityEnum.default('MEDIUM'),
  assignedRole: z.string().default('CASE_SUPPORT'),
  description: z.string().optional().nullable(),
  dueDate: z.string().optional().nullable(),
  tags: z.string().optional().nullable()
});

const UpdateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  priority: PriorityEnum.optional(),
  assignedRole: z.string().optional(),
  description: z.string().optional().nullable(),
  dueDate: z.string().optional().nullable(),
  tags: z.string().optional().nullable(),
  isCompleted: z.boolean().optional(),
  order: z.number().int().optional()
});

const ReorderSchema = z.object({
  tasks: z.array(z.object({
    id: z.string(),
    priority: PriorityEnum,
    order: z.number().int()
  }))
});

export const priorityTaskRoutes: FastifyPluginAsync = async (server) => {
  // Get all priority tasks
  server.get('/', async (request, reply) => {
    const tasks = await prisma.priorityTask.findMany({
      orderBy: [
        { isCompleted: 'asc' },
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });
    return reply.send({ tasks });
  });

  // Create new priority task
  server.post('/', async (request, reply) => {
    const parsed = CreateTaskSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid input', details: parsed.error.format() });
    }

    const { title, priority, assignedRole, description, dueDate, tags } = parsed.data;

    // Find current max order in this priority tier
    const lastTask = await prisma.priorityTask.findFirst({
      where: { priority },
      orderBy: { order: 'desc' },
      select: { order: true }
    });
    const nextOrder = (lastTask?.order ?? -1) + 1;

    const task = await prisma.priorityTask.create({
      data: {
        title,
        priority,
        assignedRole,
        description: description || null,
        dueDate: dueDate ? new Date(dueDate) : null,
        tags: tags || null,
        order: nextOrder
      }
    });

    return reply.status(201).send({ task });
  });

  // Update existing priority task
  server.patch('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const parsed = UpdateTaskSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid input', details: parsed.error.format() });
    }

    const { dueDate, isCompleted, ...rest } = parsed.data;
    const dataToUpdate: any = { ...rest };

    if (dueDate !== undefined) {
      dataToUpdate.dueDate = dueDate ? new Date(dueDate) : null;
    }
    if (isCompleted !== undefined) {
      dataToUpdate.isCompleted = isCompleted;
      dataToUpdate.completedAt = isCompleted ? new Date() : null;
    }

    const updated = await prisma.priorityTask.update({
      where: { id },
      data: dataToUpdate
    });

    return reply.send({ task: updated });
  });

  // Bulk reorder tasks across/within priority columns
  server.put('/reorder', async (request, reply) => {
    const parsed = ReorderSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid input', details: parsed.error.format() });
    }

    const updates = parsed.data.tasks.map((t) =>
      prisma.priorityTask.update({
        where: { id: t.id },
        data: {
          priority: t.priority,
          order: t.order
        }
      })
    );

    await prisma.$transaction(updates);
    return reply.send({ success: true, count: updates.length });
  });

  // Delete priority task
  server.delete('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    await prisma.priorityTask.delete({
      where: { id }
    });
    return reply.send({ success: true, deletedId: id });
  });
};
