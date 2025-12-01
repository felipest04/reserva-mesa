import {useEffect, useState} from "react";
import {CircularProgress, Box, Typography, Card, CardContent} from "@mui/material";
import {getMinhasReservas} from "../../api/restauranteApi.jsx";

import "../../styles/MinhasReservas.css";

export default function MinhasReservas() {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    const usuarioId = 1; // 👈 TEMPORÁRIO até ter login

    const formatDateTime = (dataHoraString) => {
        if (!dataHoraString) return '';

        const date = new Date(dataHoraString);

        if (isNaN(date)) return dataHoraString;

        // Formata a data (DD/MM/AAAA) e a hora (HH:MM) no locale brasileiro (pt-BR)
        // O horário é formatado automaticamente para o fuso horário local do usuário
        const formattedDate = date.toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });

        const formattedTime = date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false // Garante o formato 24h
        });

        return `${formattedDate} às ${formattedTime}`;
    };

    useEffect(() => {
        async function carregarReservas() {
            try {
                const response = await getMinhasReservas(usuarioId);
                setReservas(response.data);
            } catch (error) {
                setErro("Você ainda não possui nenhuma reserva.");
            } finally {
                setLoading(false);
            }
        }

        carregarReservas();
    }, []);

    if (loading) {
        return (
            <Box className="loading-container">
                <CircularProgress/>
                <Typography sx={{mt: 2}}>Carregando reservas...</Typography>
            </Box>
        );
    }

    if (erro) {
        return (
            <Box className="erro-reservas">
                <Typography>{erro}</Typography>
            </Box>
        );
    }

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

    return (
        <Box className="minhas-reservas-container">
            <Typography variant="h5">Minhas Reservas</Typography>
            {reservas.map((reserva) => (
                <Card key={reserva.id} className="reserva-card">
                    <CardContent>
                        <Typography variant="h6">{reserva.restaurante?.nome}</Typography>
                        <Typography>Data: {formatDateTime(reserva.dataHora)}</Typography>
                        <Typography>Cliente: {reserva.nomeCliente}</Typography>
                        <Typography>Telefone: {reserva.telefone}</Typography>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}
