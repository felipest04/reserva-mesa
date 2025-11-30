// Página inicial que lista os restaurantes

import { useEffect, useState } from "react";
import { Container, Box, TextField, Grid, CircularProgress } from "@mui/material";
import RestaurantCard from "../../components/RestaurantCard.jsx";
import { getRestaurantes } from "../../api/restauranteApi.jsx";


export default function Home() {
  const [restaurants, setRestaurants] = useState([]);   // Lista de restaurantes
  const [loading, setLoading] = useState(true);         // Estado de carregamento
  const [query, setQuery] = useState("");               // Texto da busca

  // Carrega os restaurantes ao abrir a página
  useEffect(() => {
    getRestaurantes()
      .then(res => setRestaurants(res.data))
      .finally(() => setLoading(false));
  }, []);

  // Filtra pelo nome do restaurante
  const filtered = restaurants.filter(r =>
    r.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Container sx={{ mt: 4 }}>
      {/* Campo de busca */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Pesquisar por nome"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </Box>

      {/* Loading enquanto carrega */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        // Grid com os cards dos restaurantes
        <Grid container spacing={3}>
          {filtered.map(r => (
            <Grid item xs={12} sm={6} md={4} key={r.id}>
              <RestaurantCard restaurant={r} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
