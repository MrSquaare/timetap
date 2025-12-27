import { Link, Stack } from "expo-router";
import { FC } from "react";
import { Text, View } from "react-native";
import { useCSSVariable } from "uniwind";

import { Icon } from "../components/ui/Icon";

const HomeHeaderActions: FC = () => {
  const foreground = useCSSVariable("--color-foreground");

  return (
    <View>
      <Link asChild href={"settings"}>
        <Icon color={String(foreground)} name={"settings-outline"} size={24} />
      </Link>
    </View>
  );
};

export default function Home() {
  return (
    <View className={"flex-1 bg-background"}>
      <Stack.Screen
        options={{
          title: "Home",
          headerRight: () => <HomeHeaderActions />,
        }}
      />
      <View className={"flex-1 items-center justify-center"}>
        <Text className={"text-foreground"}>
          Open up app/index.tsx to start working on your app!
        </Text>
      </View>
    </View>
  );
}
