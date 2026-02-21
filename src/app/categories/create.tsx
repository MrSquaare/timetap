import { Stack, useRouter } from "expo-router";
import { useRef } from "react";

import {
  CategoriesCreateEditForm,
  formOpts,
  useAppForm,
} from "../../components/categories/CreateEditForm";
import {
  BottomSheet,
  BottomSheetAction,
  BottomSheetBackdrop,
  BottomSheetBody,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetView,
} from "../../components/ui/BottomSheet";
import { useCreateCategoryMutation } from "../../lib/queries/category";

export default function CreateCategory() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const router = useRouter();
  const mutation = useCreateCategoryMutation({
    onSuccess: () => {
      router.back();
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
            <BottomSheetTitle>Create Category</BottomSheetTitle>
          </BottomSheetHeader>
          <BottomSheetBody>
            <CategoriesCreateEditForm
              form={form}
              isPending={mutation.isPending}
            />
          </BottomSheetBody>
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}
