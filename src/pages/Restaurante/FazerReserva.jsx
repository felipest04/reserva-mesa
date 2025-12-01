// src/pages/FazerReserva.jsx
import {useState} from "react";
import {useParams, useNavigate, useSearchParams} from "react-router-dom";
import {Container, Box, TextField, Typography, Button} from "@mui/material";
import {criarReserva} from "../../api/restauranteApi.jsx";

export default function FazerReserva() {
    const {id} = useParams(); // restauranteId
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const horaInicial = searchParams.get("hora") || "";

    const [date, setDate] = useState("");
    const [time, setTime] = useState(horaInicial);
    const [people, setPeople] = useState(2);
    const [nomeCliente, setNomeCliente] = useState("");
    const [telefone, setTelefone] = useState("");

    const { userId } = useAuth();

    const submit = async (e) => {
        e.preventDefault();

        const dataHora = `${date}T${time}:00`;

        // payload ajustado para o backend
        const payload = {
            nomeCliente,
            telefone,
            dataHora,
            restauranteId: Number(id),
            usuarioId: usuarioId
        };

        try {
            await criarReserva(payload);
            navigate(`/restaurantes/${id}/reserva-confirmada`);
        } catch (err) {
            console.error("Erro ao criar reserva", err);
            alert("Erro ao criar reserva.");
        }
    };

    return (
        <Container sx={{mt: 4}} maxWidth="sm">
            <Typography variant="h5" gutterBottom>
                Finalizar reserva – Restaurante {id}
            </Typography>

            <Box component="form" onSubmit={submit} sx={{display: "grid", gap: 2, mt: 2}}>
                <TextField
                    label="Seu nome"
                    value={nomeCliente}
                    onChange={(e) => setNomeCliente(e.target.value)}
                    required
                />

                <TextField
                    label="Telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    required
                />

                <TextField
                    type="date"
                    label="Data"
                    InputLabelProps={{shrink: true}}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />

                <TextField
                    type="time"
                    label="Hora"
                    InputLabelProps={{shrink: true}}
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />

                <TextField
                    type="number"
                    label="Quantidade de pessoas"
                    value={people}
                    onChange={(e) => setPeople(e.target.value)}
                    inputProps={{min: 1}}
                    required
                />

                <Button variant="contained" color="error" type="submit">
                    Confirmar reserva
                </Button>
            </Box>
        </Container>
    );
}
