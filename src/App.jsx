// src/App.jsx
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from "./theme/theme.js";
import MainPage from './pages/Main/mainPage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Navbar.jsx';
import Home from './pages/Home/HomeSection.jsx';
import Footer from './components/Footer.jsx';
import DesktopFilter from './components/DesktopFilter.jsx';



import RestauranteDetalhes from './pages/Restaurante/restauranteDetalhes.jsx';
import FazerReserva from './pages/Restaurante/FazerReserva.jsx';
import ReservaConfirmada from './pages/Restaurante/ReservaConfirmada.jsx';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>

        <Header />
        <DesktopFilter />

        <Routes>
          <Route path="/" element={<Home />} />

          {/* Página de detalhes */}
          <Route path="/restaurantes/:id" element={<RestauranteDetalhes />} />

          <Route path="/restaurantes/:id/reservar" element={<FazerReserva/>} />

          <Route path="/restaurantes/:id/reserva-confirmada" element={<ReservaConfirmada />} />

          <Route path="/main" element={<MainPage />} />
        </Routes>

        <Footer />

      </BrowserRouter>
    </ThemeProvider>
  );
}
