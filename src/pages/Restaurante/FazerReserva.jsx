// src/pages/FazerReserva.jsx
import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Container, Box, TextField, Typography, Button } from "@mui/material";

export default function FazerReserva() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Horário vindo pela URL (caso tenha sido selecionado na tela anterior)
  const horaInicial = searchParams.get("hora") || "";

  const [date, setDate] = useState("");
  const [time, setTime] = useState(horaInicial);
  const [people, setPeople] = useState(2);

  const submit = async (e) => {
    e.preventDefault();

    // Simulação de envio enquanto o backend não está pronto
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Navega para a confirmação
    navigate(`/restaurantes/${id}/reserva-confirmada`);
  };

  return (
    <Container sx={{ mt: 4 }} maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Finalizar reserva – Restaurante {id}
      </Typography>

      <Box
        component="form"
        onSubmit={submit}
        sx={{ display: "grid", gap: 2, mt: 2 }}
      >
        <TextField
          type="date"
          label="Data"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <TextField
          type="time"
          label="Hora"
          InputLabelProps={{ shrink: true }}
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />

        <TextField
          type="number"
          label="Quantidade de pessoas"
          value={people}
          onChange={(e) => setPeople(e.target.value)}
          inputProps={{ min: 1 }}
          required
        />

        <Button variant="contained" color="error" type="submit">
          Confirmar reserva
        </Button>
      </Box>
    </Container>
  );
}
