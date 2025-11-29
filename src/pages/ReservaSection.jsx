import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Box, TextField, Typography, Button, Card, CardMedia, CardContent, CircularProgress } from "@mui/material";
import { createReserva, getRestauranteById } from "../services/api";

export default function FazerReserva() {
  const { id } = useParams(); // ID do restaurante
  const navigate = useNavigate();

  // Dados do restaurante
  const [restaurante, setRestaurante] = useState(null);
  const [loadingRestaurante, setLoadingRestaurante] = useState(true);

  // Estados do formulário
  const [dataReserva, setDataReserva] = useState("");
  const [horario, setHorario] = useState("");
  const [quantidadePessoas, setQuantidadePessoas] = useState(2);

  // Buscar o restaurante atual
  useEffect(() => {
    const fetchRestaurante = async () => {
      try {
        const { data } = await getRestauranteById(id);
        setRestaurante(data);
      } catch (e) {
        console.error("Erro ao buscar restaurante:", e);
      } finally {
        setLoadingRestaurante(false);
      }
    };
    fetchRestaurante();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();

    try {
      await createReserva({
        restauranteId: id,
        dataReserva,
        horario,
        quantidadePessoas,
      });

      navigate("/minhas-reservas");
    } catch (error) {
      console.error("Erro ao criar reserva:", error);
      alert("Não foi possível realizar a reserva.");
    }
  };

  if (loadingRestaurante) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!restaurante) {
    return (
      <Typography sx={{ mt: 5, textAlign: "center" }}>
        Restaurante não encontrado.
      </Typography>
    );
  }

  return (
    <Container sx={{ mt: 4 }} maxWidth="sm">
      
      {/* Card do restaurante */}
      <Card sx={{ mb: 3, borderRadius: 3, overflow: "hidden" }}>
        {restaurante.imagemUrl && (
          <CardMedia
            component="img"
            height="180"
            image={restaurante.imagemUrl}
            alt={restaurante.nome}
          />
        )}
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {restaurante.nome}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {restaurante.descricao || "Restaurante sem descrição."}
          </Typography>
        </CardContent>
      </Card>

      {/* Formulário */}
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Fazer Reserva
      </Typography>

      <Box
        component="form"
        onSubmit={submit}
        sx={{
          display: "grid",
          gap: 2,
          mt: 2,
          bgcolor: "rgba(0,0,0,0.03)",
          p: 3,
          borderRadius: 2,
        }}
      >
        <TextField
          type="date"
          label="Data"
          InputLabelProps={{ shrink: true }}
          value={dataReserva}
          onChange={(e) => setDataReserva(e.target.value)}
          required
        />

        <TextField
          type="time"
          label="Horário"
          InputLabelProps={{ shrink: true }}
          value={horario}
          onChange={(e) => setHorario(e.target.value)}
          required
        />

        <TextField
          type="number"
          label="Quantidade de Pessoas"
          value={quantidadePessoas}
          onChange={(e) => setQuantidadePessoas(e.target.value)}
          inputProps={{ min: 1 }}
          required
        />

        <Button variant="contained" color="primary" type="submit">
          Confirmar Reserva
        </Button>
      </Box>
    </Container>
  );
}
