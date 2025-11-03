"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#D0BCFF",
      contrastText: "#1C0F33",
    },
    secondary: {
      main: "#F2B8C6",
      contrastText: "#370B19",
    },
    error: {
      main: "#F2B8B5",
    },
    success: {
      main: "#81D288",
    },
    warning: {
      main: "#F9DE81",
    },
    background: {
      default: "#141218",
      paper: "#1D1B20",
    },
    text: {
      primary: "#E6E0E9",
      secondary: "#CAC4D0",
    },
    divider: "#3F3B43",
  },
  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
    h1: {
      fontSize: "2.8rem",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontSize: "2.4rem",
      fontWeight: 600,
      letterSpacing: "-0.015em",
    },
    h3: {
      fontSize: "1.9rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.6rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.95rem",
      lineHeight: 1.5,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: "0.02em",
    },
    caption: {
      fontSize: "0.8rem",
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#141218",
          color: "#E6E0E9",
        },
        "a, a:visited": {
          color: "#D0BCFF",
          textDecorationColor: "rgba(208, 188, 255, 0.4)",
          transition: "color 0.2s ease, text-decoration-color 0.2s ease",
        },
        "a:hover": {
          color: "#F2DAFF",
          textDecoration: "underline",
          textDecorationColor: "#F2DAFF",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(29, 27, 32, 0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #3F3B43",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 10,
          paddingBottom: 10,
          fontSize: "0.95rem",
        },
        containedPrimary: {
          color: "#1C0F33 !important",
          "&:hover": {
            color: "#120820 !important",
          },
        },
        containedSecondary: {
          color: "#33121B !important",
          "&:hover": {
            color: "#1F0A11 !important",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#201F24",
          border: "1px solid #3F3B43",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1D1B20",
          borderRadius: 24,
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 12,
        },
        outlined: {
          borderColor: "#3F3B43",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#3F3B43",
        },
      },
    },
  },
});

export default theme;
