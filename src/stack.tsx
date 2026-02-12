import { Stack } from "expo-router";

import { Header } from "./components/ui/Header";

export const AppStack = () => {
  return (
    <Stack
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
    ></Stack>
  );
};
