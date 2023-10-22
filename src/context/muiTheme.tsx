import { FC, ReactNode } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { EStatus } from "../types/orders";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1750,
    },
  },
  palette: {
    primary: {
      main: "#940c0c",
      light: "#940c0c20",
      dark: "#740c0c",
    },
    secondary: {
      main: "#ECF0F1",
    },
    tag: {
      color: "#FAFAFA",
      bgColor: "#b5b5b5",
    },
    orderStatus: {
      [EStatus.PAID]: {
        color: "#FAFAFA",
        bgColor: "#388e3c",
      },
      [EStatus.PICKING_IN_PROGRESS]: {
        color: "#FAFAFA",
        bgColor: "#f5b922",
      },
      [EStatus.READY_FOR_COLLECTION]: {
        color: "#FAFAFA",
        bgColor: "#4400cc",
      },
      [EStatus.TO_BE_PICKED]: {
        color: "#FAFAFA",
        bgColor: "#6eade0",
      },
      [EStatus.CANCELLED]: {
        color: "#FAFAFA",
        bgColor: "#b90e0e",
      },
      [EStatus.DELIVERED]: {
        color: "#FAFAFA",
        bgColor: "#706f6f",
      },
    },
    orderRow: {
      cancelled: {
        color: "#b5b5b5",
        bgColor: "#f7f7f7",
      },
      delivered: {
        color: "#b5b5b5",
        bgColor: "#f7f7f7",
      },
    },
    orderNote: {
      main: "#706f6f",
      cancelled: "#9e9e9e",
      delivered: "#9e9e9e",
      header: "#000000",
    },
  },
});

interface MuiThemeProviderProps {
  children: ReactNode;
}

export const MuiThemeProvider: FC<MuiThemeProviderProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
