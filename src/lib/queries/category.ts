import {
  mutationOptions,
  queryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import { Category } from "../../schemas/category";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../../services/category";
import { queryClient } from "../query";

import { eventKeys } from "./event";

export const categoryKeys = {
  all: ["categories"] as const,
  list: () => [...categoryKeys.all] as const,
  detail: (id: number) => [...categoryKeys.all, id] as const,
};

const categoriesQueryOptions = queryOptions({
  queryKey: categoryKeys.list(),
  queryFn: getCategories,
});

export const useCategoriesQuery = (
  options?: Omit<typeof categoriesQueryOptions, "queryKey" | "queryFn">,
) => {
  return useQuery({
    ...options,
    ...categoriesQueryOptions,
  });
};

const categoryByIdQueryOptions = (id: number) =>
  queryOptions({
    queryKey: categoryKeys.detail(id),
    queryFn: () => getCategoryById({ id }),
    placeholderData: (prev) => {
      return (
        prev ??
        queryClient
          .getQueryData<Category[]>(categoryKeys.list())
          ?.find((category) => category.id === id)
      );
    },
  });

export const useCategoryByIdQuery = (
  id: number,
  options?: Omit<
    ReturnType<typeof categoryByIdQueryOptions>,
    "queryKey" | "queryFn" | "placeholderData"
  >,
) => {
  return useQuery({
    ...options,
    ...categoryByIdQueryOptions(id),
  });
};

const createCategoryMutationOptions = mutationOptions({
  mutationFn: createCategory,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: categoryKeys.list() });
  },
});

export const useCreateCategoryMutation = (
  options?: Omit<
    typeof createCategoryMutationOptions,
    "mutationKey" | "mutationFn"
  >,
) => {
  return useMutation({
    ...options,
    ...createCategoryMutationOptions,
    onSuccess: (...args) => {
      options?.onSuccess?.(...args);
      createCategoryMutationOptions.onSuccess?.(...args);
    },
  });
};

const updateCategoryMutationOptions = mutationOptions({
  mutationFn: updateCategory,
  onSuccess: (data) => {
    if (!data) return;

    queryClient.invalidateQueries({ queryKey: categoryKeys.list() });
    queryClient.invalidateQueries({ queryKey: categoryKeys.detail(data.id) });
  },
});

export const useUpdateCategoryMutation = (
  options?: Omit<
    typeof updateCategoryMutationOptions,
    "mutationKey" | "mutationFn"
  >,
) => {
  return useMutation({
    ...options,
    ...updateCategoryMutationOptions,
    onSuccess: (...args) => {
      options?.onSuccess?.(...args);
      updateCategoryMutationOptions.onSuccess?.(...args);
    },
  });
};

const deleteCategoryMutationOptions = mutationOptions({
  mutationFn: deleteCategory,
  onSuccess: (data) => {
    if (!data) return;

    queryClient.invalidateQueries({ queryKey: categoryKeys.list() });
    queryClient.invalidateQueries({ queryKey: categoryKeys.detail(data.id) });
    queryClient.invalidateQueries({ queryKey: eventKeys.list(data.id) });
  },
});

export const useDeleteCategoryMutation = (
  options?: Omit<
    typeof deleteCategoryMutationOptions,
    "mutationKey" | "mutationFn"
  >,
) => {
  return useMutation({
    ...options,
    ...deleteCategoryMutationOptions,
    onSuccess: (...args) => {
      options?.onSuccess?.(...args);
      deleteCategoryMutationOptions.onSuccess?.(...args);
    },
  });
};
