import "../global.css";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View } from "react-native";
import { SafeAreaListener } from "react-native-safe-area-context";
import { Uniwind, useCSSVariable } from "uniwind";

import { useThemeStore } from "../stores/theme";

export default function App() {
  const { theme } = useThemeStore();
  const background = useCSSVariable("--color-background");
  const foreground = useCSSVariable("--color-foreground");

  useEffect(() => {
    Uniwind.setTheme(theme);
  }, [theme]);

  return (
    <SafeAreaListener
      onChange={({ insets }) => {
        Uniwind.updateInsets(insets);
      }}
    >
      <View className={"bg-background p-safe flex-1"}>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: String(background) },
            headerTintColor: String(foreground),
          }}
        />
        <StatusBar />
      </View>
    </SafeAreaListener>
  );
}
