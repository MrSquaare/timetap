import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import {
  Dialog,
  DialogAction,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/Dialog";
import { Text } from "../../../components/ui/Text";
import { useDeleteCategoryMutation } from "../../../lib/queries/category";

export default function DeleteCategory() {
  const router = useRouter();
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const id = Number(categoryId);

  const mutation = useDeleteCategoryMutation({
    onSuccess: () => {
      router.dismissTo("/");
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
    </>
  );
}
