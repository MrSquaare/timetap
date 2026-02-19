import { eq } from "drizzle-orm";

import { database } from "../lib/database";
import { Category } from "../schemas/category";
import { categories } from "../tables/categories";

export const getCategories = async () => {
  return await database.select().from(categories).orderBy(categories.name);
};

export type GetCategoryByIdParams = {
  id: number;
};

export const getCategoryById = async (params: GetCategoryByIdParams) => {
  const category = await database
    .select()
    .from(categories)
    .where(eq(categories.id, params.id))
    .then((rows) => rows.at(0));

  return category ?? null;
};

export type CreateCategoryPayload = Pick<Category, "name">;

export const createCategory = async (payload: CreateCategoryPayload) => {
  const [category] = await database
    .insert(categories)
    .values(payload)
    .returning();

  return category;
};

export type UpdateCategoryPayload = Pick<Category, "id"> &
  Partial<Pick<Category, "name">>;

export const updateCategory = async (payload: UpdateCategoryPayload) => {
  const [category] = await database
    .update(categories)
    .set({
      name: payload.name,
    })
    .where(eq(categories.id, payload.id))
    .returning();

  return category;
};

export type DeleteCategoryPayload = Pick<Category, "id">;

export const deleteCategory = async (payload: DeleteCategoryPayload) => {
  const [category] = await database
    .delete(categories)
    .where(eq(categories.id, payload.id))
    .returning();

  return category;
};
