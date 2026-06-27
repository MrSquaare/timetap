import { Stack } from "expo-router";
import { useResolveClassNames } from "uniwind";

import { Header } from "./components/ui/Header";

export const AppStack = () => {
  const { backgroundColor } = useResolveClassNames("bg-background");

  return (
    <Stack
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
    >
      <Stack.Screen name={"index"} />
      <Stack.Screen
        name={"categories/create"}
        options={{
          headerShown: false,
          presentation: "formSheet",
          sheetAllowedDetents: "fitToContents",
          contentStyle: {
            backgroundColor,
          },
        }}
      />
      <Stack.Screen
        name={"categories/[categoryId]/edit"}
        options={{
          headerShown: false,
          presentation: "formSheet",
          sheetAllowedDetents: "fitToContents",
          contentStyle: {
            backgroundColor,
          },
        }}
      />
      <Stack.Screen
        name={"categories/[categoryId]/delete"}
        options={{
          headerShown: false,
          presentation: "transparentModal",
          animation: "none",
        }}
      />
      <Stack.Screen
        name={"categories/[categoryId]/events/create"}
        options={{
          headerShown: false,
          presentation: "formSheet",
          sheetAllowedDetents: "fitToContents",
          contentStyle: {
            backgroundColor,
          },
        }}
      />
      <Stack.Screen
        name={"categories/[categoryId]/events/[eventId]/edit"}
        options={{
          headerShown: false,
          presentation: "formSheet",
          sheetAllowedDetents: "fitToContents",
          contentStyle: {
            backgroundColor,
          },
        }}
      />
      <Stack.Screen
        name={"categories/[categoryId]/events/[eventId]/delete"}
        options={{
          headerShown: false,
          presentation: "transparentModal",
          animation: "none",
        }}
      />
    </Stack>
  );
};
