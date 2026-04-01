import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: "system-ui, 'Segoe UI', Roboto, sans-serif",
    body: "system-ui, 'Segoe UI', Roboto, sans-serif",
  },
  colors: {
    brand: {
      500: "#aa3bff",
    },
    text: "#6b6375",
    heading: "#08060d",
    bg: "#ffffff",
  },
  styles: {
    global: {
      body: {
        bg: "bg",
        color: "text",
      },
    },
  },
});
