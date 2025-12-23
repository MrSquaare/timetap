import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@shopify/restyle";
import { theme } from "../theme";
import { Stack } from "expo-router";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Stack />
      <StatusBar style={"auto"} />
    </ThemeProvider>
  );
}
