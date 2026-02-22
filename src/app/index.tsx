import { FlashList } from "@shopify/flash-list";
import { Link, Stack } from "expo-router";
import { FC, useState } from "react";
import { Pressable, View } from "react-native";

import { CategoryCard } from "../components/categories/Card";
import { Button } from "../components/ui/Button";
import { Center } from "../components/ui/Center";
import { FAB } from "../components/ui/FAB";
import { Icon } from "../components/ui/Icon";
import { Spinner } from "../components/ui/Spinner";
import { Text } from "../components/ui/Text";
import { Toast } from "../components/ui/Toast";
import { useCategoriesQuery } from "../lib/queries/category";
import { useCreateEventMutation } from "../lib/queries/event";

const HomeHeaderActions: FC = () => {
  return (
    <View>
      <Link asChild href={"settings"}>
        <Button accessibilityLabel={"Settings"} hitSlop={8} variant={"action"}>
          <Icon name={"settings-outline"} size={24} />
        </Button>
      </Link>
    </View>
  );
};

export default function Home() {
  const query = useCategoriesQuery();
  const [toastMessage, setToastMessage] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const createEventMutation = useCreateEventMutation();

  const handleQuickAdd = (categoryId: number, categoryName: string) => {
    createEventMutation.mutate(
      {
        categoryId,
        datetime: new Date(),
        description: "",
      },
      {
        onSuccess: () => {
          setToastMessage(`Event quick added to ${categoryName}`);
          setToastOpen(true);
        },
        onError: () => {
          setToastMessage("Unable to quick add event");
          setToastOpen(true);
        },
      },
    );
  };

  return (
    <View className={"flex-1 bg-background"}>
      <Stack.Screen
        options={{
          title: "Home",
          headerRight: () => <HomeHeaderActions />,
        }}
      />

      {query.isLoading ? (
        <Center>
          <Spinner size={64} />
        </Center>
      ) : query.isError ? (
        <Center>
          <Text className={"mb-2 text-lg"}>Error loading categories.</Text>
          <Button onPress={() => query.refetch()} size={"lg"}>
            <Text>Retry</Text>
          </Button>
        </Center>
      ) : query.data?.length ? (
        <FlashList
          ItemSeparatorComponent={() => <View className={"h-2"} />}
          contentContainerClassName={"p-4"}
          data={query.data}
          renderItem={({ item }) => (
            <Link asChild href={`/categories/${item.id}`}>
              <Pressable>
                <CategoryCard
                  category={item}
                  onQuickAdd={() => handleQuickAdd(item.id, item.name)}
                  quickAddDisabled={createEventMutation.isPending}
                />
              </Pressable>
            </Link>
          )}
        />
      ) : (
        <Center>
          <Text className={"mb-2 text-lg"}>No category found.</Text>
          <Link asChild href={"categories/create"}>
            <Button size={"lg"}>
              <Text>Create one!</Text>
            </Button>
          </Link>
        </Center>
      )}
      {query.data?.length ? (
        <Link asChild href={"categories/create"}>
          <FAB accessibilityLabel={"Create Category"}>
            <Icon name={"add"} size={24} />
          </FAB>
        </Link>
      ) : null}

      <Toast
        message={toastMessage}
        onOpenChange={setToastOpen}
        open={toastOpen}
      />
    </View>
  );
}
