import { AppBar, Toolbar, Typography, Box, TextField, IconButton, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <AppBar position="sticky" color="primary" sx={{ boxShadow: 'none' }}>
            <Toolbar sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                {/* Título clicável que leva para a Home */}
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{
                        color: "white",
                        textDecoration: "none",
                        flexGrow: 1,
                        fontWeight: 700,
                        '&:hover': { opacity: 0.9 }
                    }}
                >
                    ReservaMesa
                </Typography>

                {/* Campo de busca (Ocultado em telas pequenas) */}
                <Box
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        alignItems: 'center',
                        bgcolor: 'rgba(255,255,255,0.10)',
                        px: 0.5,
                        py: 0.25,
                        borderRadius: 1,
                        mr: 1
                    }}
                >
                    <TextField
                        size="small"
                        placeholder="Buscar restaurante"
                        sx={{
                            '& .MuiInputBase-root': {
                                bgcolor: 'transparent',
                                color: 'white',
                                paddingRight: 0,
                            },
                            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                            width: 260
                        }}
                        inputProps={{ 'aria-label': 'buscar restaurante' }}
                    />
                    <IconButton
                        color="inherit"
                        sx={{
                            ml: 0.5,
                            bgcolor: 'transparent',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' }
                        }}
                        aria-label="buscar"
                    >
                        <SearchIcon />
                    </IconButton>
                </Box>

                {/* Link para a página Minhas Reservas */}
                <Button
                    color="inherit"
                    component={Link}
                    to="/minhas-reservas"
                    sx={{
                        ml: 1,
                        bgcolor: 'transparent',
                        borderRadius: 1,
                        fontWeight: 600,
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
                        display: { xs: 'none', sm: 'block' }
                    }}
                >
                    Reservas
                </Button>


                {/* Botão de Logout */}
                <IconButton
                    color="inherit"
                    onClick={handleLogout}
                    sx={{
                        ml: 1,
                        bgcolor: 'transparent',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' }
                    }}
                    aria-label="sair da conta"
                    title="Sair"
                >
                    <LogoutIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}