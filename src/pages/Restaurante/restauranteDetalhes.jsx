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

export default function RestauranteDetalhes() {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getRestauranteById(id);

                if (res?.data) {
                    setRestaurant(res.data);
                } else {
                    setRestaurant(null);
                }
            } catch (err) {
                console.error("Erro ao buscar restaurante:", err);
                setRestaurant(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading)
        return (
            <Container sx={{ mt: 6 }}>
                <Typography>Carregando...</Typography>
            </Container>
        );

    if (!restaurant)
        return (
            <Container sx={{ mt: 6 }}>
                <Typography variant="h5" color="error">
                    Restaurante não encontrado ou erro de conexão.
                </Typography>
                <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>Voltar para a Home</Button>
            </Container>
        );

    const {
        nome,
        endereco,
        urlImagem,
        rating,
        horariosFuncionamento
    } = restaurant;

    const ratingValue = rating || 4;

    let horariosDisponiveis = [];
    try {
        if (horariosFuncionamento) {
            const parsedHorarios = JSON.parse(horariosFuncionamento);
            if (Array.isArray(parsedHorarios)) {
                horariosDisponiveis = parsedHorarios.sort();
            }
        }
    } catch (e) {
        console.error("Erro ao parsear horários de funcionamento:", e);
        horariosDisponiveis = [];
    }

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
                            image={urlImagem || "/assets/FotoDefault.png"}
                            alt={nome || "Restaurante"}
                        />

                        <CardContent>
                            <Typography variant="h4" gutterBottom>
                                {nome || "Nome não disponível"}
                            </Typography>

                            {endereco && (
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    📍 {endereco}
                                </Typography>
                            )}

                            {/* Horários */}
                            <Typography variant="h6" sx={{ mt: 3 }}>
                                Horários disponíveis
                            </Typography>

                            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
                                {horariosDisponiveis.map(hora => (
                                    <Button
                                        key={hora}
                                        variant="outlined"
                                        size="small"
                                        // Chama a função de redirecionamento, passando o horário
                                        onClick={() => reservarComHorario(hora)}
                                    >
                                        {hora}
                                    </Button>
                                ))}

                                {horariosDisponiveis.length === 0 && (
                                    <Typography color="text.secondary">Nenhum horário disponível para reserva hoje.</Typography>
                                )}
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
                                Clique em um horário acima ou no botão para preencher os dados.
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