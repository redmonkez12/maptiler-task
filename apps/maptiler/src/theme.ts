"use client";

import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    customBlack: {
      main: string;
    };
  }

  interface PaletteOptions {
    customBlack?: {
      main: string;
    };
  }
}

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  cssVariables: true,
  palette: {
    customBlack: {
      main: "#1D1616",
    },
  },
});

export default theme;
