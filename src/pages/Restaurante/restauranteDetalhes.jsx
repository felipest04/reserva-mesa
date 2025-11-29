// Página que mostra todas as informações de um restaurante

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Box
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import { getRestauranteById } from "../../api/restauranteApi";
import { mockRestaurantes } from "../../mocks/MockRestaurantes";

export default function RestauranteDetalhes() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const navigate = useNavigate();

  // Busca dados via API → fallback para mock
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRestauranteById(id);

        if (res?.data) {
          setRestaurant(res.data);
          return;
        }
      } catch (err) {
        console.warn("API falhou, usando mock.");
      }

      // FALLBACK MOCK
      const mock = mockRestaurantes.find(r => r.id === parseInt(id));
      setRestaurant(mock);
    };

    fetchData();
  }, [id]);

  if (!restaurant)
    return (
      <Container sx={{ mt: 6 }}>
        <Typography>Carregando...</Typography>
      </Container>
    );

  const horarios = restaurant.horarios || [];
  const rating = restaurant.rating || 4;

  const reservarComHorario = (hora) => {
    navigate(`/restaurantes/${id}/reservar?hora=${hora}`);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>

        {/* Card principal */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={restaurant.photo}
            />

            <CardContent>
              <Typography variant="h4" gutterBottom>
                {restaurant.name}
              </Typography>

              {restaurant.address && (
                <Typography variant="body1" sx={{ mb: 2 }}>
                  📍 {restaurant.address}
                </Typography>
              )}

              {/* Avaliação */}
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon
                    key={index}
                    fontSize="medium"
                    sx={{
                      color: index < rating ? "#FFD700" : "#ccc",
                      mr: 0.5
                    }}
                  />
                ))}
                <Typography sx={{ ml: 1 }}>{rating.toFixed(1)}</Typography>
              </Box>

              {/* Horários */}
              <Typography variant="h6" sx={{ mt: 3 }}>
                Horários disponíveis
              </Typography>

              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
                {horarios.map(hora => (
                  <Button
                    key={hora}
                    variant="outlined"
                    size="small"
                    onClick={() => reservarComHorario(hora)}
                  >
                    {hora}
                  </Button>
                ))}
              </Box>

            </CardContent>
          </Card>
        </Grid>

        {/* Card lateral */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Reservar mesa</Typography>

              <Typography variant="body2" sx={{ mt: 1 }}>
                Clique abaixo para preencher os dados da sua reserva.
              </Typography>

              <Button
                variant="contained"
                color="error"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => navigate(`/restaurantes/${id}/reservar`)}
              >
                Fazer reserva
              </Button>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Container>
  );
}
