import {
  mutationOptions,
  queryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import { Category } from "../../schemas/category";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../../services/category";
import { queryClient } from "../query";

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
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: categoryKeys.list() });
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
