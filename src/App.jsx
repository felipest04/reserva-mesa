import {ThemeProvider, CssBaseline} from '@mui/material';
import theme from "./theme/theme.js";
import {BrowserRouter, Routes, Route, useLocation, Navigate} from 'react-router-dom';

import Header from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

import Home from './pages/Home/HomeSection.jsx';
import MainPage from './pages/Main/mainPage.jsx';
import RestauranteDetalhes from './pages/Restaurante/restauranteDetalhes.jsx';
import FazerReserva from './pages/Restaurante/FazerReserva.jsx';
import ReservaConfirmada from './pages/Restaurante/ReservaConfirmada.jsx';

import Cadastro from './pages/Cadastro.jsx';
import Login from './pages/Login.jsx';
import Perfil from './pages/Perfil/Perfil.jsx';
import MinhasReservas from "./pages/Reservas/MinhasReservas";

import {AuthProvider, useAuth} from './context/AuthContext.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

// --- Layout que decide se mostra Header/Footer/Filtros ---
function Layout() {
    const location = useLocation();
    const publicPaths = ["/login", "/cadastro"];
    const isPublic = publicPaths.includes(location.pathname);

    return (
        <>
            {!isPublic && <Header/>}

            <Routes>
                {/* Página inicial: redireciona dependendo do login */}
                <Route
                    path="/"
                    element={
                        <RequireAuthRedirect>
                            <Home/>
                        </RequireAuthRedirect>
                    }
                />

                {/* Páginas públicas */}
                <Route path="/login" element={<Login/>}/>
                <Route path="/cadastro" element={<Cadastro/>}/>

                {/* Rotas protegidas */}
                <Route
                    path="/home"
                    element={
                        <PrivateRoute>
                            <Home/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/restaurantes/:id"
                    element={
                        <PrivateRoute>
                            <RestauranteDetalhes/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/restaurantes/:id/reservar"
                    element={
                        <PrivateRoute>
                            <FazerReserva/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/restaurantes/:id/reserva-confirmada"
                    element={
                        <PrivateRoute>
                            <ReservaConfirmada/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/perfil"
                    element={
                        <PrivateRoute>
                            <Perfil/>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/minhas-reservas"
                    element={
                        <PrivateRoute>
                            <MinhasReservas/>
                        </PrivateRoute>
                    }
                />
                <Route path="/main" element={<MainPage/>}/>
            </Routes>

            {!isPublic && <Footer/>}
        </>
    );
}

function RequireAuthRedirect({children}) {
    const {user} = useAuth();
    return user ? children : <Navigate to="/login" replace/>;
}

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AuthProvider>
                <BrowserRouter>
                    <Layout/>
                </BrowserRouter>
            </AuthProvider>
        </ThemeProvider>
    );
}