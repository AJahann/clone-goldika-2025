import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface TypeBackground {
    secondary: string;
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
    secondary: {
      main: "#494c5a",
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
      lineHeight: "32px",
    },
  },
});

export default theme;
