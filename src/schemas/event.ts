import { z } from "zod";

export const eventSchema = z.object({
  id: z.number(),
  datetime: z.date(),
  description: z.string(),
  categoryId: z.number(),
});

export type Event = z.infer<typeof eventSchema>;
