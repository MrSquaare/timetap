import { z } from "zod/mini";

export const themeSchema = z.enum(["light", "dark", "system"]);

export type Theme = z.infer<typeof themeSchema>;
