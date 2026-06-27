import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import {
  EventsCreateEditForm,
  formOpts,
  useAppForm,
} from "../../../../../components/events/CreateEditForm";
import { Button } from "../../../../../components/ui/Button";
import { Center } from "../../../../../components/ui/Center";
import {
  SheetAction,
  SheetBody,
  SheetHeader,
  SheetTitle,
  SheetView,
} from "../../../../../components/ui/Sheet";
import { Spinner } from "../../../../../components/ui/Spinner";
import { Text } from "../../../../../components/ui/Text";
import { Toast } from "../../../../../components/ui/Toast";
import {
  useEventByIdQuery,
  useUpdateEventMutation,
} from "../../../../../lib/queries/event";

export default function EditEvent() {
  const router = useRouter();
  const { categoryId, eventId } = useLocalSearchParams<{
    categoryId: string;
    eventId: string;
  }>();
  const id = Number(eventId);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const query = useEventByIdQuery(id);
  const routerBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const updateMutation = useUpdateEventMutation({
    onSuccess: routerBack,
    onError: (error) => {
      console.error("Failed to update event", error);
      setToastMessage("Unable to update event.");
      setToastOpen(true);
    },
  });

  const form = useAppForm({
    ...formOpts,
    defaultValues: {
      datetime: query.data ? new Date(query.data.datetime) : new Date(),
      description: query.data?.description || "",
    },
    onSubmit: async ({ value }) => {
      updateMutation.mutate({
        id,
        ...value,
      });
    },
  });

  const isPending = updateMutation.isPending || query.isLoading;

  return (
    <>
      <SheetView>
        <SheetHeader
          left={
            <SheetAction
              disabled={isPending}
              onPress={() =>
                router.push(
                  `/categories/${categoryId}/events/${eventId}/delete`,
                )
              }
            >
              Delete
            </SheetAction>
          }
          right={
            query.data ? (
              <SheetAction
                disabled={isPending}
                onPress={() => form.handleSubmit()}
              >
                Save
              </SheetAction>
            ) : null
          }
        >
          <SheetTitle>Edit Event</SheetTitle>
        </SheetHeader>
        <SheetBody>
          {query.isLoading ? (
            <Center>
              <Spinner size={64} />
            </Center>
          ) : query.isError ? (
            <Center>
              <Text className={"mb-2 text-lg"}>Error loading event.</Text>
              <View className={"flex-row gap-2"}>
                <Button onPress={() => router.back()} size={"lg"}>
                  <Text>Back</Text>
                </Button>
                <Button onPress={() => query.refetch()} size={"lg"}>
                  <Text>Retry</Text>
                </Button>
              </View>
            </Center>
          ) : (
            <EventsCreateEditForm
              form={form}
              isPending={updateMutation.isPending}
            />
          )}
        </SheetBody>
      </SheetView>
      <Toast
        message={toastMessage}
        onOpenChange={setToastOpen}
        open={toastOpen}
      />
    </>
  );
}
