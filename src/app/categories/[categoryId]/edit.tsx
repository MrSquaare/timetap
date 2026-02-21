import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import { View } from "react-native";

import {
  CategoriesCreateEditForm,
  formOpts,
  useAppForm,
} from "../../../components/categories/CreateEditForm";
import {
  BottomSheet,
  BottomSheetAction,
  BottomSheetBackdrop,
  BottomSheetBody,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetView,
} from "../../../components/ui/BottomSheet";
import { Button } from "../../../components/ui/Button";
import { Center } from "../../../components/ui/Center";
import { Spinner } from "../../../components/ui/Spinner";
import { Text } from "../../../components/ui/Text";
import { Toast } from "../../../components/ui/Toast";
import {
  useCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "../../../lib/queries/category";

export default function CategoriesCreate() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const router = useRouter();
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const id = Number(categoryId);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const query = useCategoryByIdQuery(id);
  const mutation = useUpdateCategoryMutation({
    onSuccess: () => {
      router.back();
    },
    onError: (error) => {
      console.error("Failed to update category", error);
      setToastMessage("Unable to update category.");
      setToastOpen(true);
    },
  });
  const form = useAppForm({
    ...formOpts,
    defaultValues: {
      name: query.data?.name ?? "",
    },
    onSubmit: ({ value }) => {
      mutation.mutate({ id: id, name: value.name });
    },
  });

  const isPending = mutation.isPending || query.isLoading;

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
              <BottomSheetAction onPress={() => router.back()}>
                Close
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
            <BottomSheetTitle>Edit Category</BottomSheetTitle>
          </BottomSheetHeader>
          <BottomSheetBody>
            {query.isLoading ? (
              <Center>
                <Spinner size={64} />
              </Center>
            ) : query.isError ? (
              <Center>
                <Text className={"mb-2 text-lg"}>Error loading category.</Text>
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
              <CategoriesCreateEditForm
                form={form}
                isPending={mutation.isPending}
              />
            )}
          </BottomSheetBody>
        </BottomSheetView>
      </BottomSheet>
      <Toast
        message={toastMessage}
        onOpenChange={setToastOpen}
        open={toastOpen}
      />
    </>
  );
}
