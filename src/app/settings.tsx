import { Stack } from "expo-router";
import { Text, View } from "react-native";

import { ThemePicker } from "../components/settings/ThemePicker";
import { useThemeStore } from "../stores/theme";

export default function Settings() {
  const { theme, setTheme } = useThemeStore();

  return (
    <View className={"flex-1 bg-background"}>
      <Stack.Screen
        options={{
          title: "Settings",
        }}
      />
      <View className={"flex-1 p-4"}>
        <Text className={"mb-2 text-lg font-medium text-foreground"}>
          Theme
        </Text>
        <ThemePicker onThemeChange={setTheme} selectedTheme={theme} />
      </View>
    </View>
  );
}
