import { z } from "zod";

export const categorySchema = z.object({
  id: z.int(),
  name: z.string().min(1).max(50),
});

export type Category = z.infer<typeof categorySchema>;
