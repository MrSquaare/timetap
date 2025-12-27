import "../global.css";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View } from "react-native";
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
    <View className={"flex-1 bg-background"}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: String(background) },
          headerTintColor: String(foreground),
        }}
      />
      <StatusBar />
    </View>
  );
}
