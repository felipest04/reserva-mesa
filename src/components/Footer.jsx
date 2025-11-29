// Rodapé simples da aplicação

import { Box, Container, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ py: 4, mt: 6, bgcolor: "#fafafa" }}>
      <Container>
        {/* Mostra o ano atual de forma automática */}
        <Typography>© {new Date().getFullYear()} ReservaMesa</Typography>
      </Container>
    </Box>
  );
}
