import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  config: {
    initialColorMode: 'system', // 'light', 'dark' ou 'system'
    useSystemColorMode: true, // Respeita preferência do sistema
  },
  fonts: {
    heading: "system-ui, 'Segoe UI', Roboto, sans-serif",
    body: "system-ui, 'Segoe UI', Roboto, sans-serif",
  },
  colors: {
    brand: {
      500: "#aa3bff",
      600: "#9933e6",
      // Dark mode
      400: "#c084fc",
    },
  },
  semanticTokens: {
    colors: {
      // Cores que mudam automaticamente com o tema
      text: {
        default: "#6b6375",
        _dark: "#9ca3af",
      },
      heading: {
        default: "#08060d",
        _dark: "#f3f4f6",
      },
      bg: {
        default: "#ffffff",
        _dark: "#16171d",
      },
      cardBg: {
        default: "#ffffff",
        _dark: "#1f2028",
      },
      border: {
        default: "#e5e4e7",
        _dark: "#374151",
      },
      accentBg: {
        default: "rgba(170, 59, 255, 0.1)",
        _dark: "rgba(192, 132, 252, 0.15)",
      },
      accentBorder: {
        default: "rgba(170, 59, 255, 0.5)",
        _dark: "rgba(192, 132, 252, 0.5)",
      },
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? '#16171d' : '#ffffff',
        color: props.colorMode === 'dark' ? '#9ca3af' : '#6b6375',
      },
    }),
  },
  components: {
    // Customizações de componentes para dark mode
    Card: {
      baseStyle: (props) => ({
        container: {
          bg: props.colorMode === 'dark' ? '#1f2028' : 'white',
          borderColor: props.colorMode === 'dark' ? '#374151' : 'gray.200',
        },
      }),
    },
    Input: {
      variants: {
        outline: (props) => ({
          field: {
            bg: props.colorMode === 'dark' ? '#1f2028' : 'white',
            borderColor: props.colorMode === 'dark' ? '#374151' : 'gray.200',
            _hover: {
              borderColor: props.colorMode === 'dark' ? '#4b5563' : 'gray.300',
            },
          },
        }),
      },
    },
    Textarea: {
      variants: {
        outline: (props) => ({
          bg: props.colorMode === 'dark' ? '#1f2028' : 'white',
          borderColor: props.colorMode === 'dark' ? '#374151' : 'gray.200',
          _hover: {
            borderColor: props.colorMode === 'dark' ? '#4b5563' : 'gray.300',
          },
        }),
      },
    },
    Select: {
      variants: {
        outline: (props) => ({
          field: {
            bg: props.colorMode === 'dark' ? '#1f2028' : 'white',
            borderColor: props.colorMode === 'dark' ? '#374151' : 'gray.200',
            _hover: {
              borderColor: props.colorMode === 'dark' ? '#4b5563' : 'gray.300',
            },
          },
        }),
      },
    },
  },
});
