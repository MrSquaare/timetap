import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useRef } from "react";

import {
  EventsCreateEditForm,
  formOpts,
  useAppForm,
} from "../../../../components/events/CreateEditForm";
import {
  BottomSheet,
  BottomSheetAction,
  BottomSheetBackdrop,
  BottomSheetBody,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetView,
} from "../../../../components/ui/BottomSheet";
import { useCreateEventMutation } from "../../../../lib/queries/event";

export default function CreateEvent() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const router = useRouter();
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();

  const mutation = useCreateEventMutation({
    onSuccess: () => {
      router.back();
    },
  });

  const form = useAppForm({
    ...formOpts,
    defaultValues: {
      datetime: new Date(),
      description: "",
    },
    onSubmit: async ({ value }) => {
      mutation.mutate({
        ...value,
        categoryId: Number(categoryId),
      });
    },
  });

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
                disabled={mutation.isPending}
                onPress={() => router.back()}
              >
                Close
              </BottomSheetAction>
            }
            right={
              <BottomSheetAction
                disabled={mutation.isPending}
                onPress={() => form.handleSubmit()}
              >
                Create
              </BottomSheetAction>
            }
          >
            <BottomSheetTitle>Create Event</BottomSheetTitle>
          </BottomSheetHeader>
          <BottomSheetBody>
            <EventsCreateEditForm form={form} isPending={mutation.isPending} />
          </BottomSheetBody>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}
