import { FlashList } from "@shopify/flash-list";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { FC } from "react";
import { Pressable, View } from "react-native";

import { EventCard } from "../../../components/events/Card";
import { Button } from "../../../components/ui/Button";
import { Center } from "../../../components/ui/Center";
import { FAB } from "../../../components/ui/FAB";
import { Icon } from "../../../components/ui/Icon";
import { Spinner } from "../../../components/ui/Spinner";
import { Text } from "../../../components/ui/Text";
import { useCategoryByIdQuery } from "../../../lib/queries/category";
import { useEventsByCategoryIdQuery } from "../../../lib/queries/event";

const CategoriesDetailsHeaderActions: FC<{
  categoryId: string;
}> = ({ categoryId }) => {
  return (
    <View className={"flex-row gap-2"}>
      <Link asChild href={`/categories/${categoryId}/edit`}>
        <Button
          accessibilityLabel={"Edit Category"}
          hitSlop={8}
          variant={"action"}
        >
          <Icon name={"pencil-outline"} size={24} />
        </Button>
      </Link>
      <Link asChild href={`/categories/${categoryId}/delete`}>
        <Button
          accessibilityLabel={"Delete Category"}
          hitSlop={8}
          variant={"action"}
        >
          <Icon name={"trash-outline"} size={24} />
        </Button>
      </Link>
    </View>
  );
};

export default function CategoryDetails() {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const id = Number(categoryId);
  const categoryQuery = useCategoryByIdQuery(id);
  const eventsQuery = useEventsByCategoryIdQuery(id);

  if (categoryQuery.isLoading) {
    return (
      <Center>
        <Spinner size={64} />
      </Center>
    );
  }

  if (categoryQuery.isError || !categoryQuery.data) {
    return (
      <Center>
        <Text>Error loading category.</Text>
      </Center>
    );
  }

  return (
    <View className={"flex-1 bg-background"}>
      <Stack.Screen
        options={{
          title: categoryQuery.data.name,
          headerRight: () => (
            <CategoriesDetailsHeaderActions categoryId={categoryId} />
          ),
        }}
      />

      {eventsQuery.isLoading ? (
        <Center>
          <Spinner size={64} />
        </Center>
      ) : eventsQuery.isError ? (
        <Center>
          <Text className={"mb-2 text-lg"}>Error loading events.</Text>
          <Button onPress={() => eventsQuery.refetch()} size={"lg"}>
            <Text>Retry</Text>
          </Button>
        </Center>
      ) : eventsQuery.data?.length ? (
        <FlashList
          ItemSeparatorComponent={() => <View className={"h-2"} />}
          contentContainerClassName={"p-4"}
          data={eventsQuery.data}
          renderItem={({ item }) => (
            <Link
              asChild
              href={`/categories/${categoryId}/events/${item.id}/edit`}
            >
              <Pressable>
                <EventCard event={item} />
              </Pressable>
            </Link>
          )}
        />
      ) : (
        <Center>
          <Text className={"mb-2 text-lg"}>No event found.</Text>
          <Link asChild href={`/categories/${categoryId}/events/create`}>
            <Button size={"lg"}>
              <Text>Create one!</Text>
            </Button>
          </Link>
        </Center>
      )}

      {eventsQuery.data?.length ? (
        <Link asChild href={`/categories/${categoryId}/events/create`}>
          <FAB accessibilityLabel={"Add Event"}>
            <Icon name={"add"} size={24} />
          </FAB>
        </Link>
      ) : null}
    </View>
  );
}
