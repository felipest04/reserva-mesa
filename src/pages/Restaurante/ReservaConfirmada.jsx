import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ReservaConfirmada() {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: "center", marginTop: 8 }}>
      <Typography variant="h4" gutterBottom>
        Reserva Confirmada!
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        Sua reserva foi registrada com sucesso.  
        Agradecemos a preferência!
      </Typography>

      <Button variant="contained" onClick={() => navigate("/")}>
        Voltar para a Página Inicial
      </Button>
    </Box>
  );
}
