import "../global.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { PropsWithChildren, useEffect, useMemo } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaListener } from "react-native-safe-area-context";
import { Uniwind } from "uniwind";

import { PortalHost } from "../components/ui/Portal";
import { Text } from "../components/ui/Text";
import { database, migrations } from "../lib/database";
import { queryClient } from "../lib/query";
import { AppStack } from "../stack";
import { useThemeStore } from "../stores/theme";

SplashScreen.preventAutoHideAsync();

const useLoader = () => {
  const migrationResult = useMigrations(database, migrations);

  const loaded = useMemo(() => {
    const migrationLoaded = migrationResult.success || !!migrationResult.error;

    return migrationLoaded;
  }, [migrationResult]);

  const error = useMemo(() => {
    const migrationError = migrationResult.error
      ? new Error(`Migration Error: ${migrationResult.error.message}`)
      : null;

    return migrationError;
  }, [migrationResult]);

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
        <GestureHandlerRootView>{children}</GestureHandlerRootView>
      </QueryClientProvider>
    </SafeAreaListener>
  );
}

function AppError({ error }: { error: Error }) {
  return (
    <View className={"flex-1 items-center justify-center bg-background p-4"}>
      <Text className={"text-red-500"}>{error.message}</Text>
    </View>
  );
}

function AppContent() {
  return <AppStack />;
}

export default function App() {
  const { loaded, error } = useLoader();

  useEffect(() => {
    if (loaded) {
      if (error) {
        console.error("App loading error:", error);
      }

      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <StatusBar />
      <AppWrapper>
        <View className={"flex-1 bg-background p-safe"}>
          {error ? <AppError error={error} /> : <AppContent />}
        </View>
        <PortalHost />
      </AppWrapper>
    </>
  );
}
