// Página que exibe todas as reservas do usuário

import { useEffect, useState } from "react";
import { Container, Grid, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import { getMinhasReservas } from "../api/restauranteApi";

export default function MinhasReservas() {
  // null significa "ainda não carregou"
  const [reservas, setReservas] = useState(null);

  // Busca as reservas ao carregar a página
  useEffect(() => {
    getMinhasReservas().then(res => setReservas(res.data));
  }, []);

  // Exibe loading enquanto carrega
  if (!reservas) return <Container sx={{ mt:4 }}><CircularProgress /></Container>;

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {reservas.map(r => (
          <Grid item xs={12} md={6} key={r.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{r.restaurantName}</Typography>
                <Typography>Data: {r.date}</Typography>
                <Typography>Hora: {r.time}</Typography>
                <Typography>Pessoas: {r.people}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
