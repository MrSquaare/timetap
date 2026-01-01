import { Link, Stack } from "expo-router";
import { FC } from "react";
import { View } from "react-native";

import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { Text } from "../components/ui/Text";

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
  return (
    <View className={"bg-background flex-1"}>
      <Stack.Screen
        options={{
          title: "Home",
          headerRight: () => <HomeHeaderActions />,
        }}
      />
      <View className={"flex-1 items-center justify-center"}>
        <Text>Open up app/index.tsx to start working on your app!</Text>
      </View>
    </View>
  );
}
