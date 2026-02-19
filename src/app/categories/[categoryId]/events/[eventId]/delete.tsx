import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import {
  Dialog,
  DialogAction,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../../components/ui/Dialog";
import { Text } from "../../../../../components/ui/Text";
import { useDeleteEventMutation } from "../../../../../lib/queries/event";

export default function DeleteEvent() {
  const router = useRouter();
  const { categoryId, eventId } = useLocalSearchParams<{
    categoryId: string;
    eventId: string;
  }>();
  const id = Number(eventId);

  const mutation = useDeleteEventMutation({
    onSuccess: () => {
      router.dismissTo(`/categories/${categoryId}`);
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
    </>
  );
}
