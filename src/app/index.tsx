import { Link, Stack } from "expo-router";
import { Box } from "../components/ui/Box";
import { Text } from "../components/ui/Text";
import { FC } from "react";
import { Icon } from "../components/ui/Icon";

const HomeHeaderActions: FC = () => {
  return (
    <Box>
      <Link href={"settings"} asChild>
        <Icon name="settings-outline" size={24} />
      </Link>
    </Box>
  );
};

export default function Home() {
  return (
    <Box flex={1}>
      <Stack.Screen
        options={{ title: "Home", headerRight: () => <HomeHeaderActions /> }}
      />
      <Box
        backgroundColor="mainBackground"
        alignItems="center"
        justifyContent="center"
        flex={1}
      >
        <Text>Open up app/index.tsx to start working on your app!</Text>
      </Box>
    </Box>
  );
}
