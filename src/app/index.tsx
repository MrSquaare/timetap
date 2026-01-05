import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { Link, Stack } from "expo-router";
import { FC } from "react";
import { View } from "react-native";

import { CategoryCard } from "../components/categories/Card";
import { Button } from "../components/ui/Button";
import { Center } from "../components/ui/Center";
import { FAB } from "../components/ui/FAB";
import { Icon } from "../components/ui/Icon";
import { Spinner } from "../components/ui/Spinner";
import { Text } from "../components/ui/Text";
import { getCategories } from "../services/category";

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
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <View className={"bg-background flex-1"}>
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
          renderItem={({ item, index }) => <CategoryCard category={item} />}
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
    </View>
  );
}
