import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';

const PermCalculatorInputSchema = z.object({
  jobOrderStartDate: z.string(), // YYYY-MM-DD
  jobOrderEndDate: z.string(),   // Must be >= 30 days
  sundayAd1Date: z.string(),
  sundayAd2Date: z.string(),
  nofStartDate: z.string(),
  nofEndDate: z.string(),        // 10 business days
  additional1Date: z.string().optional(),
  additional2Date: z.string().optional(),
  additional3Date: z.string().optional()
});

export const calculatorRoutes: FastifyPluginAsync = async (server) => {
  server.post('/perm-timeline', async (request, reply) => {
    const parsed = PermCalculatorInputSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({ error: 'Invalid dates', details: parsed.error.format() });
    }

    const d = parsed.data;

    const allDates = [
      new Date(d.jobOrderStartDate),
      new Date(d.jobOrderEndDate),
      new Date(d.sundayAd1Date),
      new Date(d.sundayAd2Date),
      new Date(d.nofStartDate),
      new Date(d.nofEndDate)
    ];

    if (d.additional1Date) allDates.push(new Date(d.additional1Date));
    if (d.additional2Date) allDates.push(new Date(d.additional2Date));
    if (d.additional3Date) allDates.push(new Date(d.additional3Date));

    // Earliest recruitment activity date
    const earliestDate = new Date(Math.min(...allDates.map((date) => date.getTime())));
    // Latest recruitment activity date
    const latestDate = new Date(Math.max(...allDates.map((date) => date.getTime())));

    // Job order duration in days
    const jobOrderDays = Math.round(
      (new Date(d.jobOrderEndDate).getTime() - new Date(d.jobOrderStartDate).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    // 30-day quiet period starts the day after the last recruitment action
    const quietPeriodEnd = new Date(latestDate);
    quietPeriodEnd.setDate(quietPeriodEnd.getDate() + 30);

    // Earliest permitted ETA-9089 filing date is day after quiet period
    const earliestFilingDate = new Date(quietPeriodEnd);

    // Latest permitted ETA-9089 filing date: 180 days after earliest recruitment activity
    const latestFilingDate = new Date(earliestDate);
    latestFilingDate.setDate(latestFilingDate.getDate() + 180);

    const warnings: string[] = [];
    if (jobOrderDays < 30) {
      warnings.push(`SWA Job Order duration is ${jobOrderDays} days, but minimum 30 days is required by DOL.`);
    }

    if (earliestFilingDate > latestFilingDate) {
      warnings.push('Recruitment window exceeded 180 days! ETA-9089 cannot be filed without re-running expired steps.');
    }

    return reply.send({
      earliestRecruitmentDate: earliestDate.toISOString().split('T')[0],
      latestRecruitmentDate: latestDate.toISOString().split('T')[0],
      jobOrderDurationDays: jobOrderDays,
      quietPeriodEnds: quietPeriodEnd.toISOString().split('T')[0],
      earliestFilingDate: earliestFilingDate.toISOString().split('T')[0],
      latestFilingDate: latestFilingDate.toISOString().split('T')[0],
      warnings,
      isValid: warnings.length === 0
    });
  });
};
