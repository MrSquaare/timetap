import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { categories } from "./categories";

export const events = sqliteTable("events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  datetime: integer("datetime", { mode: "timestamp" }).notNull(),
  description: text("description").default("").notNull(),
  categoryId: integer("category_id")
    .references(() => categories.id, { onDelete: "cascade" })
    .notNull(),
});
