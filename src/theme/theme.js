// src/theme/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#ff4081",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh", // garante que o body ocupe toda a altura
          margin: 0,
        },
        "#root": {
          display: "flex",
          flexDirection: "column",
          flex: 1, // faz o root ocupar o espaço disponível
        },
      },
    },
  },
});

export default theme;
