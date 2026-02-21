import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";

import {
  Dialog,
  DialogAction,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/Dialog";
import { Text } from "../../../components/ui/Text";
import { Toast } from "../../../components/ui/Toast";
import { useDeleteCategoryMutation } from "../../../lib/queries/category";

export default function DeleteCategory() {
  const router = useRouter();
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const id = Number(categoryId);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const mutation = useDeleteCategoryMutation({
    onSuccess: () => {
      router.dismissTo("/");
    },
    onError: (error) => {
      console.error("Failed to delete category", error);
      setToastMessage("Unable to delete category.");
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
          <DialogTitle>Delete Category</DialogTitle>
          <DialogDescription>
            Delete this category and all of its events permanently?
          </DialogDescription>
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
