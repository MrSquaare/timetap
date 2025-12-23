import { createTheme } from "@shopify/restyle";

const palette = {
  white: "#FFFFFF",
  black: "#000000",
};

export const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    mainForeground: palette.black,
  },
  spacing: {},
  textVariants: {
    defaults: {
      color: "mainForeground",
    },
  },
});

export type Theme = typeof theme;
