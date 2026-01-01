import "../global.css";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo } from "react";
import { View } from "react-native";
import { SafeAreaListener } from "react-native-safe-area-context";
import { Uniwind } from "uniwind";

import { Header } from "../components/ui/Header";
import { Text } from "../components/ui/Text";
import { database, migrations } from "../lib/database";
import { useThemeStore } from "../stores/theme";

SplashScreen.preventAutoHideAsync();

const useLoader = () => {
  const migrationResult = useMigrations(database, migrations);
  const fontResult = useFonts(Ionicons.font);

  const loaded = useMemo(() => {
    const migrationLoaded = migrationResult.success || !!migrationResult.error;
    const fontLoaded = fontResult[0];

    return migrationLoaded && fontLoaded;
  }, [migrationResult, fontResult]);

  const error = useMemo(() => {
    const migrationError = migrationResult.error
      ? new Error(`Migration Error: ${migrationResult.error.message}`)
      : null;
    const fontError = fontResult[1]
      ? new Error(`Font Error: ${fontResult[1].message}`)
      : null;

    return migrationError || fontError;
  }, [migrationResult, fontResult]);

  return { loaded, error };
};

function AppError({ error }: { error: Error }) {
  return (
    <View className={"bg-background flex-1 items-center justify-center p-4"}>
      <Text className={"text-red-500"}>{error.message}</Text>
    </View>
  );
}

function AppContent() {
  return (
    <Stack
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
    />
  );
}

export default function App() {
  const { loaded, error } = useLoader();
  const { theme } = useThemeStore();

  useEffect(() => {
    if (loaded) {
      if (error) {
        console.error("App loading error:", error);
      }

      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    Uniwind.setTheme(theme);
  }, [theme]);

  return (
    <>
      <StatusBar />
      <SafeAreaListener
        onChange={({ insets }) => {
          Uniwind.updateInsets(insets);
        }}
      >
        <View className={"bg-background p-safe flex-1"}>
          {error ? <AppError error={error} /> : loaded ? <AppContent /> : null}
        </View>
      </SafeAreaListener>
    </>
  );
}
