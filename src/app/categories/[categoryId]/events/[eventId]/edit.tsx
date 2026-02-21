import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useRef } from "react";
import { View } from "react-native";

import {
  EventsCreateEditForm,
  formOpts,
  useAppForm,
} from "../../../../../components/events/CreateEditForm";
import {
  BottomSheet,
  BottomSheetAction,
  BottomSheetBackdrop,
  BottomSheetBody,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetView,
} from "../../../../../components/ui/BottomSheet";
import { Button } from "../../../../../components/ui/Button";
import { Center } from "../../../../../components/ui/Center";
import { Spinner } from "../../../../../components/ui/Spinner";
import { Text } from "../../../../../components/ui/Text";
import {
  useEventByIdQuery,
  useUpdateEventMutation,
} from "../../../../../lib/queries/event";

export default function EditEvent() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const router = useRouter();
  const { categoryId, eventId } = useLocalSearchParams<{
    categoryId: string;
    eventId: string;
  }>();
  const id = Number(eventId);

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
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: "transparentModal",
          animation: "none",
        }}
      />
      <BottomSheet
        backdropComponent={BottomSheetBackdrop}
        onClose={() => router.back()}
        ref={bottomSheetRef}
      >
        <BottomSheetView>
          <BottomSheetHeader
            left={
              <BottomSheetAction
                disabled={isPending}
                onPress={() =>
                  router.push(
                    `/categories/${categoryId}/events/${eventId}/delete`,
                  )
                }
              >
                Delete
              </BottomSheetAction>
            }
            right={
              query.data ? (
                <BottomSheetAction
                  disabled={isPending}
                  onPress={() => form.handleSubmit()}
                >
                  Save
                </BottomSheetAction>
              ) : null
            }
          >
            <BottomSheetTitle>Edit Event</BottomSheetTitle>
          </BottomSheetHeader>
          <BottomSheetBody>
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
          </BottomSheetBody>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}
