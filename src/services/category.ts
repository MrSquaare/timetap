import { database } from "../lib/database";
import { Category } from "../schemas/category";
import { categories } from "../tables/categories";

export const getCategories = async () => {
  return await database.select().from(categories).orderBy(categories.name);
};

export type CreateCategoryPayload = Pick<Category, "name">;

export const createCategory = async (payload: CreateCategoryPayload) => {
  const [category] = await database
    .insert(categories)
    .values(payload)
    .returning();

  return category;
};
