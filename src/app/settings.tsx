import { Stack } from "expo-router";
import { Box } from "../components/ui/Box";
import { Text } from "../components/ui/Text";

export default function Settings() {
  return (
    <Box flex={1}>
      <Stack.Screen options={{ title: "Settings" }} />
      <Box
        backgroundColor="mainBackground"
        alignItems="center"
        justifyContent="center"
        flex={1}
      >
        <Text>Open up app/settings.tsx to customize this screen.</Text>
      </Box>
    </Box>
  );
}
