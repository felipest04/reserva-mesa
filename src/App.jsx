import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from "./theme/theme.js";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Header from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import DesktopFilter from './components/DesktopFilter.jsx';

import Home from './pages/Home/HomeSection.jsx';
import MainPage from './pages/Main/mainPage.jsx';
import RestauranteDetalhes from './pages/Restaurante/restauranteDetalhes.jsx';
import FazerReserva from './pages/Restaurante/FazerReserva.jsx';
import ReservaConfirmada from './pages/Restaurante/ReservaConfirmada.jsx';

import Cadastro from './pages/Cadastro.jsx';
import Login from './pages/Login.jsx';
import Perfil from './pages/Perfil/Perfil.jsx';


import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import MinhasReservas from "./pages/Reservas/MinhasReservas";


// --- Página inicial que decide se vai para login ou home ---
/*function Inicial() {
  const { user } = useAuth();
  return user ? <Navigate to="/home" replace /> : <Navigate to="/home" replace />;
}
*/
// --- Layout que decide se mostra Header/Footer/Filtros ---
function Layout() {
  const location = useLocation();
  const publicPaths = ["/login", "/cadastro"];
  const isPublic = publicPaths.includes(location.pathname);

  return (
    <>
      {!isPublic && <Header />}
      {!isPublic && <DesktopFilter />}

      <Routes>
        {/* Página inicial redireciona */}
        <Route path="/" element={<Home />} />

        {/* Páginas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path='/minhas-reservas' element={<MinhasReservas />} />

        {/* Páginas protegidas */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/main" element={<MainPage />} />

        <Route
          path="/restaurantes/:id"
          element={
            <PrivateRoute>
              <RestauranteDetalhes />
            </PrivateRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />

        <Route
          path="/restaurantes/:id/reservar"
          element={
            <PrivateRoute>
              <FazerReserva />
            </PrivateRoute>
          }
        />
        <Route
          path="/restaurantes/:id/reserva-confirmada"
          element={
            <PrivateRoute>
              <ReservaConfirmada />
            </PrivateRoute>
          }
        />
      </Routes>

      {!isPublic && <Footer />}
    </>
  );
}

// --- Componente principal do App ---
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
