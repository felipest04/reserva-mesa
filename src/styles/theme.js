import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#d32f2f', // vermelho elegante
    },
    secondary: {
      main: '#212121', // cinza escuro
    },
    background: {
      default: '#fafafa',
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, sans-serif',
  },
});