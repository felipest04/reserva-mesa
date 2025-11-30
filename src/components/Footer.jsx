import { Box, Container, Typography } from "@mui/material";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import "../styles/Footer.css"

export default function Footer() {
  return (
    <Box>
      <Container className="footer" maxWidth={false}>
        <Typography>© {new Date().getFullYear()} ReservaMesa</Typography>

        <div className="footer-icons">
          {/* Seis ícones de exemplo */}
          <a href="https://linkedin.com/in/usuario1" target="_blank"><FaLinkedin /></a>
          <a href="https://github.com/felipest04/reserva-mesa/tree/master" target="_blank"><FaGithub /></a>
        </div>
      </Container>
    </Box>
  );
}
