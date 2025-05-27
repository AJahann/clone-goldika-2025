import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface TypeBackground {
    secondary: string;
  }
  interface Palette {
    border: {
      primary: string;
      secondary: string;
    };
  }

  interface PaletteOptions {
    border?: {
      primary: string;
      secondary: string;
    };
  }

  interface TypeText {
    body: string;
  }
}

const theme = createTheme({
  direction: "rtl",
  palette: {
    mode: "dark",
    primary: {
      main: "#f1ab1f",
      light: "#fcca17",
    },
    grey: {
      "400": "#84879a",
    },
    secondary: {
      main: "#494c5a",
    },
    warning: {
      main: "#191207",
    },
    success: {
      main: "#2ed64a",
    },
    error: {
      main: "#da2b2b",
    },
    background: {
      default: "#2a2c34",
      paper: "#373943",
      secondary: "#bfbcb6",
    },
    common: {
      white: "#f2f2f3",
    },
    text: {
      primary: "#f2f2f3",
      secondary: "#ffffffb6",
      body: "#373943",
    },
    border: {
      primary: "#fff",
      secondary: "#f2f2f360",
    },
  },
  typography: {
    fontFamily: "inherit",
    h1: {
      fontSize: "1.75rem",
      lineHeight: "32px",
      fontWeight: 400,
    },
    h2: {
      fontSize: "1.5rem",
    },
    h3: {
      fontSize: "1.25rem",
    },
    body1: {
      fontSize: "16px",
      lineHeight: "24px",
    },
    body2: {
      fontSize: "13px",
      lineHeight: "24px",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "inherit",
          boxShadow: "none !important",
          borderRadius: "8px",
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          fontFamily: "inherit",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: "16px !important",
        },
      },
    },
  },
});

export default theme;
