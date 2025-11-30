import { useEffect, useState } from "react";
import { CircularProgress, Box, Typography, Card, CardContent } from "@mui/material";
import { getMinhasReservas } from "../../api/restauranteApi.jsx";

 



import "../../styles/MinhasReservas.css";

export default function MinhasReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarReservas() {
      try {
        const response = await getMinhasReservas();
        setReservas(response.data);
      } catch (error) {
        setErro("Você ainda não possui nenhuma reserva.");
      } finally {
        setLoading(false);
      }
    }

    carregarReservas();
  }, []);

  // Loading
  if (loading) {
    return (
      <Box className="loading-container">
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Carregando reservas...</Typography>
      </Box>
    );
  }

  // Erro
  if (erro) {
    return (
      <Box className="erro-reservas">
        <Typography>{erro}</Typography>
      </Box>
    );
  }

  // Nenhuma reserva
  if (reservas.length === 0) {
    return (
      <Box className="sem-reservas">
        <Typography variant="h5">Você ainda não possui reservas</Typography>
        <Typography variant="body1" color="text.secondary">
          Assim que fizer uma reserva, ela aparecerá aqui.
        </Typography>
      </Box>
    );
  }

  // Exibir reservas
  return (
    <Box className="minhas-reservas-container">
      <Typography variant="h5">Minhas Reservas</Typography>
      {reservas.map((reserva) => (
        <Card key={reserva.id} className="reserva-card">
          <CardContent>
            <Typography variant="h6">{reserva.restaurante?.nome}</Typography>
            <Typography>Data: {reserva.dataReserva}</Typography>
            <Typography>Hora: {reserva.horario}</Typography>
            <Typography>Pessoas: {reserva.quantidadePessoas}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
