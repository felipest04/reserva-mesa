import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import '../styles/Navbar.css';

export default function Navbar() {

  return(
    <AppBar position='fixed' color='inherit' elevation={1} className='navbar'>
      {/** Com comportamentos do MUI abaixo vai o nome e a logo do restaurante */}
      <Toolbar className='navbar-toolbar'>
        <img src="" alt="logo-img" />

        <Box className="navbar-logo">
          <RestaurantMenuIcon color='primary' />
          <Typography variant='h6' className='navbar-title'>
            Restaurante do desespero
          </Typography>


      {/** Links de navegção da navbar do site, OBS: Está em texto mas se quiserem podem colocar icons/MUI fornece*/}
        </Box>
        <Box className="navbar-links">
        <Button className="navbar-link" color="inherit">Home</Button>
        <Button className="navbar-link" color="inherit">Restaurantes</Button>
        <Button className="navbar-link" color="inherit">Contato</Button>


      {/** Botão de reserva do Site*/}
          <Button
          variant='contained'
          color='primary'
          className='navbar-btn'
          >Faça sua Reserva</Button>
        </Box>
      </Toolbar>
    </AppBar>

  )
}