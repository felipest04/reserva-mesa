import { useEffect, useState } from "react";
import { CircularProgress, Box, Typography, Card, CardContent } from "@mui/material";
import { getMinhasReservas } from "../services/api";

export default function MinhasReservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarReservas() {
      try {
        const response = await getMinhasReservas();
        setReservas(response.data); // Axios => data
      } catch (error) {
        setErro("Não foi possível carregar suas reservas.");
      } finally {
        setLoading(false);
      }
    }

    carregarReservas();
  }, []);

  // Carregando
  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Carregando reservas...</Typography>
      </Box>
    );
  }

  // Erro
  if (erro) {
    return (
      <Typography sx={{ color: "red", textAlign: "center", mt: 4 }}>
        {erro}
      </Typography>
    );
  }

  // Nenhuma reserva
  if (reservas.length === 0) {
    return (
      <Typography sx={{ textAlign: "center", mt: 4, fontSize: 18 }}>
        Você ainda não possui reservas.
      </Typography>
    );
  }

  // Exibir reservas
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
        Minhas Reservas
      </Typography>

      {reservas.map((reserva) => (
        <Card key={reserva.id} sx={{ mb: 2, borderRadius: 2, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {reserva.restaurante?.nome}
            </Typography>

            <Typography>Data: {reserva.dataReserva}</Typography>
            <Typography>Hora: {reserva.horario}</Typography>
            <Typography>Pessoas: {reserva.quantidadePessoas}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
