import {
  Link,
  Redirect,
  Stack,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { FC } from "react";
import { View } from "react-native";

import { Button } from "../../../components/ui/Button";
import { Center } from "../../../components/ui/Center";
import { Icon } from "../../../components/ui/Icon";
import { Spinner } from "../../../components/ui/Spinner";
import { Text } from "../../../components/ui/Text";
import { useCategoryByIdQuery } from "../../../lib/queries/category";

const CategoriesDetailsHeaderActions: FC<{ id: string }> = ({ id }) => {
  return (
    <View>
      <Link asChild href={`/categories/${id}/edit`}>
        <Button accessibilityLabel={"Settings"} hitSlop={8} variant={"action"}>
          <Icon name={"pencil-outline"} size={24} />
        </Button>
      </Link>
    </View>
  );
};

export default function CategoriesDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const categoryId = Number(id);
  const query = useCategoryByIdQuery(categoryId);

  if (query.isLoading) {
    return (
      <View className={"bg-foreground/33 flex-1"}>
        <Stack.Screen
          options={{
            headerShown: false,
            presentation: "transparentModal",
            animation: "none",
          }}
        />
        <Center>
          <Spinner size={64} />
        </Center>
      </View>
    );
  }

  if (query.isError) {
    return (
      <View className={"bg-foreground/33 flex-1"}>
        <Stack.Screen
          options={{
            headerShown: false,
            presentation: "transparentModal",
            animation: "none",
          }}
        />
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
      </View>
    );
  }

  if (!query.data) {
    return <Redirect href={"/"} />;
  }

  return (
    <View className={"bg-background flex-1"}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: query.data.name,
          headerRight: () => <CategoriesDetailsHeaderActions id={id} />,
        }}
      />
      <View className={"flex-1 p-4"}>
        <Center>
          <Text>No event found.</Text>
        </Center>
      </View>
    </View>
  );
}
