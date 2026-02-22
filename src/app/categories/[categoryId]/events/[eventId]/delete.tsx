import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";

import {
  Dialog,
  DialogAction,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../../components/ui/Dialog";
import { Text } from "../../../../../components/ui/Text";
import { Toast } from "../../../../../components/ui/Toast";
import { useDeleteEventMutation } from "../../../../../lib/queries/event";

export default function DeleteEvent() {
  const router = useRouter();
  const { categoryId, eventId } = useLocalSearchParams<{
    categoryId: string;
    eventId: string;
  }>();
  const id = Number(eventId);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const mutation = useDeleteEventMutation({
    onSuccess: () => {
      router.dismissTo(`/categories/${categoryId}`);
    },
    onError: (error) => {
      console.error("Failed to delete event", error);
      setToastMessage("Unable to delete event.");
      setToastOpen(true);
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
      <Dialog
        onOpenChange={(open) => {
          if (!open) {
            router.back();
          }
        }}
        open={true}
      >
        <DialogHeader>
          <DialogTitle>Delete Event</DialogTitle>
          <DialogDescription>Delete this event permanently?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogAction
            disabled={mutation.isPending}
            onPress={() => router.back()}
            size={"sm"}
            variant={"action"}
          >
            <Text>Cancel</Text>
          </DialogAction>
          <DialogAction
            disabled={mutation.isPending}
            onPress={() => mutation.mutate({ id })}
            size={"sm"}
          >
            <Text>Delete</Text>
          </DialogAction>
        </DialogFooter>
      </Dialog>
      <Toast
        message={toastMessage}
        onOpenChange={setToastOpen}
        open={toastOpen}
      />
    </>
  );
}
