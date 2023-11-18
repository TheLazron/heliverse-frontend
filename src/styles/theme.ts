import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    primary: "#3F72AF",
    secondary: "#DBE2EF",
    white: "#F9F7F7",
    dark: "#112D4E",
  },
};

const customTheme = extendTheme({ colors });

export default customTheme;
