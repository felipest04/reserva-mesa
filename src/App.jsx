import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './styles/theme';
import MainPage from './pages/mainPage';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainPage />
    </ThemeProvider>
  );
}
