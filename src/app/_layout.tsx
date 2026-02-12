import "../global.css";

import Ionicons from "@expo/vector-icons/Ionicons";
import { QueryClientProvider } from "@tanstack/react-query";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PropsWithChildren, useEffect, useMemo } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaListener } from "react-native-safe-area-context";
import { Uniwind } from "uniwind";

import { Text } from "../components/ui/Text";
import { database, migrations } from "../lib/database";
import { queryClient } from "../lib/query";
import { AppStack } from "../stack";
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

function AppWrapper({ children }: PropsWithChildren) {
  const { theme } = useThemeStore();

  useEffect(() => {
    Uniwind.setTheme(theme);
  }, [theme]);

  return (
    <SafeAreaListener
      onChange={({ insets }) => {
        Uniwind.updateInsets(insets);
      }}
    >
      <QueryClientProvider client={queryClient}>
        <KeyboardProvider>
          <GestureHandlerRootView>{children}</GestureHandlerRootView>
        </KeyboardProvider>
      </QueryClientProvider>
    </SafeAreaListener>
  );
}

function AppLoader() {
  const { loaded, error } = useLoader();

  useEffect(() => {
    if (loaded) {
      if (error) {
        console.error("App loading error:", error);
      }

      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (error) {
    return <AppError error={error} />;
  }

  if (loaded) {
    return <AppContent />;
  }

  return null;
}

function AppError({ error }: { error: Error }) {
  return (
    <View className={"bg-background flex-1 items-center justify-center p-4"}>
      <Text className={"text-red-500"}>{error.message}</Text>
    </View>
  );
}

function AppContent() {
  return <AppStack />;
}

export default function App() {
  return (
    <>
      <StatusBar />
      <AppWrapper>
        <View className={"bg-background p-safe flex-1"}>
          <AppLoader />
        </View>
      </AppWrapper>
    </>
  );
}
