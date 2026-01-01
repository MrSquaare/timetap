import { Stack } from "expo-router";
import { View } from "react-native";

import { SettingsThemePicker } from "../components/settings/SettingsThemePicker";
import { Text } from "../components/ui/Text";
import { useThemeStore } from "../stores/theme";

export default function Settings() {
  const { theme, setTheme } = useThemeStore();

  return (
    <View className={"bg-background flex-1"}>
      <Stack.Screen
        options={{
          title: "Settings",
        }}
      />
      <View className={"flex-1 p-4"}>
        <Text className={"mb-2 text-lg font-medium"}>Theme</Text>
        <SettingsThemePicker onThemeChange={setTheme} selectedTheme={theme} />
      </View>
    </View>
  );
}
