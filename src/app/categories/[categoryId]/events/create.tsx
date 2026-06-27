import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";

import {
  EventsCreateEditForm,
  formOpts,
  useAppForm,
} from "../../../../components/events/CreateEditForm";
import {
  SheetAction,
  SheetBody,
  SheetHeader,
  SheetTitle,
  SheetView,
} from "../../../../components/ui/Sheet";
import { Toast } from "../../../../components/ui/Toast";
import { useCreateEventMutation } from "../../../../lib/queries/event";

export default function CreateEvent() {
  const router = useRouter();
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const mutation = useCreateEventMutation({
    onSuccess: () => {
      router.back();
    },
    onError: (error) => {
      console.error("Failed to create event", error);
      setToastMessage("Unable to create event.");
      setToastOpen(true);
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
      <SheetView>
        <SheetHeader
          left={
            <SheetAction
              disabled={mutation.isPending}
              onPress={() => router.back()}
            >
              Close
            </SheetAction>
          }
          right={
            <SheetAction
              disabled={mutation.isPending}
              onPress={() => form.handleSubmit()}
            >
              Create
            </SheetAction>
          }
        >
          <SheetTitle>Create Event</SheetTitle>
        </SheetHeader>
        <SheetBody>
          <EventsCreateEditForm form={form} isPending={mutation.isPending} />
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
