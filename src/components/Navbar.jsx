import { AppBar, Toolbar, Button, Typography } from "@mui/material";

function Navbar({ onNavigate}) {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Restaurante
        </Typography>

        <button color="inherit" onClick={() => onNavigate("home")}>Início</button>
        {console.log("O botao redirecionou para a parte de reserva de mesas ")}
        <button color="inherit" onClick={() => onNavigate("reserva")}>Reserva</button>
        <button color="inherit" onClick={() => onNavigate("confirmacao")}>Confirmação</button>

            </Toolbar>
        </AppBar>
    )
}


export default Navbar;