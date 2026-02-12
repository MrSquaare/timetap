import {
  mutationOptions,
  queryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import {
  createEvent,
  deleteEvent,
  getEventById,
  getEventsByCategoryId,
  updateEvent,
} from "../../services/event";
import { queryClient } from "../query";

export const eventKeys = {
  all: ["events"] as const,
  list: (categoryId: number) => [...eventKeys.all, "list", categoryId] as const,
  detail: (id: number) => [...eventKeys.all, "detail", id] as const,
};

const eventsByCategoryIdQueryOptions = (categoryId: number) =>
  queryOptions({
    queryKey: eventKeys.list(categoryId),
    queryFn: () => getEventsByCategoryId({ categoryId }),
  });

export const useEventsByCategoryIdQuery = (
  categoryId: number,
  options?: Omit<
    ReturnType<typeof eventsByCategoryIdQueryOptions>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    ...options,
    ...eventsByCategoryIdQueryOptions(categoryId),
  });
};

const eventByIdQueryOptions = (id: number) =>
  queryOptions({
    queryKey: eventKeys.detail(id),
    queryFn: () => getEventById({ id }),
  });

export const useEventByIdQuery = (
  id: number,
  options?: Omit<
    ReturnType<typeof eventByIdQueryOptions>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    ...options,
    ...eventByIdQueryOptions(id),
  });
};

const createEventMutationOptions = mutationOptions({
  mutationFn: createEvent,
  onSuccess: (data) => {
    queryClient.invalidateQueries({
      queryKey: eventKeys.list(data.categoryId),
    });
  },
});

export const useCreateEventMutation = (
  options?: Omit<
    typeof createEventMutationOptions,
    "mutationKey" | "mutationFn"
  >,
) => {
  return useMutation({
    ...options,
    ...createEventMutationOptions,
    onSuccess: (...args) => {
      options?.onSuccess?.(...args);
      createEventMutationOptions.onSuccess?.(...args);
    },
  });
};

const updateEventMutationOptions = mutationOptions({
  mutationFn: updateEvent,
  onSuccess: (data) => {
    if (data) {
      queryClient.invalidateQueries({
        queryKey: eventKeys.detail(data.id),
      });
      queryClient.invalidateQueries({
        queryKey: eventKeys.list(data.categoryId),
      });
    }
  },
});

export const useUpdateEventMutation = (
  options?: Omit<
    typeof updateEventMutationOptions,
    "mutationKey" | "mutationFn"
  >,
) => {
  return useMutation({
    ...options,
    ...updateEventMutationOptions,
    onSuccess: (...args) => {
      options?.onSuccess?.(...args);
      updateEventMutationOptions.onSuccess?.(...args);
    },
  });
};

const deleteEventMutationOptions = mutationOptions({
  mutationFn: deleteEvent,
  onSuccess: (data) => {
    if (data) {
      queryClient.invalidateQueries({
        queryKey: eventKeys.list(data.categoryId),
      });
    }
  },
});

export const useDeleteEventMutation = (
  options?: Omit<
    typeof deleteEventMutationOptions,
    "mutationKey" | "mutationFn"
  >,
) => {
  return useMutation({
    ...options,
    ...deleteEventMutationOptions,
    onSuccess: (...args) => {
      options?.onSuccess?.(...args);
      deleteEventMutationOptions.onSuccess?.(...args);
    },
  });
};
