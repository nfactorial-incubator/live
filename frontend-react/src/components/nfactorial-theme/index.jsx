import { createTheme, ThemeProvider } from "@mui/material/styles";

const nfaDefaultColor = "#e01425";

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: nfaDefaultColor,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: nfaDefaultColor,
        },
      },
    },
    MuiInputLabelRoot: {
      styleOverrides: {
        root: {
          color: nfaDefaultColor,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          display: "flex",
          justifyContent: "space-between",
        },
      },
    },
  },
});

export const NFactorialTheme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};