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
  const updates = Object.fromEntries(
    Object.entries({ name: payload.name }).filter(
      ([, value]) => value !== undefined,
    ),
  );

  if (Object.keys(updates).length === 0) {
    return getCategoryById({ id: payload.id });
  }

  const category = await database
    .update(categories)
    .set(updates)
    .where(eq(categories.id, payload.id))
    .returning()
    .then((rows) => rows.at(0));

  return category ?? null;
};

export type DeleteCategoryPayload = Pick<Category, "id">;

export const deleteCategory = async (payload: DeleteCategoryPayload) => {
  const category = await database
    .delete(categories)
    .where(eq(categories.id, payload.id))
    .returning()
    .then((rows) => rows.at(0));

  return category ?? null;
};
