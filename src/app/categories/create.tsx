import { useRouter } from "expo-router";
import { useState } from "react";

import {
  CategoriesCreateEditForm,
  formOpts,
  useAppForm,
} from "../../components/categories/CreateEditForm";
import {
  SheetAction,
  SheetBody,
  SheetHeader,
  SheetTitle,
  SheetView,
} from "../../components/ui/Sheet";
import { Toast } from "../../components/ui/Toast";
import { useCreateCategoryMutation } from "../../lib/queries/category";

export default function CreateCategory() {
  const router = useRouter();
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const mutation = useCreateCategoryMutation({
    onSuccess: () => {
      router.back();
    },
    onError: (error) => {
      console.error("Failed to create category", error);
      setToastMessage("Unable to create category.");
      setToastOpen(true);
    },
  });
  const form = useAppForm({
    ...formOpts,
    onSubmit: ({ value }) => {
      mutation.mutate({ name: value.name });
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
          <SheetTitle>Create Category</SheetTitle>
        </SheetHeader>
        <SheetBody>
          <CategoriesCreateEditForm
            form={form}
            isPending={mutation.isPending}
          />
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
