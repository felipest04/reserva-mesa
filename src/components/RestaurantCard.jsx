import {Card, CardMedia, CardContent, Typography, CardActions, Button, Box} from "@mui/material";
import {useNavigate} from "react-router-dom";
import "../styles/RestauroCard.css";

export default function RestaurantCard({restaurant}) {
    const navigate = useNavigate();

    if (!restaurant) return null;

    const horarios = restaurant.horarios || ["12:00", "13:00", "14:00"];

    const reservarComHorario = (hora) => {
        navigate(`/restaurantes/${restaurant.id}/reservar?hora=${hora}`);
    };

    return (
        <Card className="restauro-card">
            <CardMedia
                component="img"
                image={restaurant.urlImagem || "/assets/FotoDefault.png"}
                alt={restaurant.nome || "Restaurante"}
                className="restauro-card-image"
            />

            <Box className="restauro-card-content-wrapper">
                {/* O conteúdo é separado do botão de ações */}
                <Box>
                    <CardContent className="restauro-card-content">
                        {/* Nome do Restaurante (Centralizado e Destaque) */}
                        <Typography variant="h5" className="restauro-nome" gutterBottom>
                            {restaurant.nome || "Nome não disponível"}
                        </Typography>

                        {/* Endereço (Alinhado à direita, como no exemplo) */}
                        <Typography variant="body2" color="text.secondary" className="restauro-endereco">
                            {restaurant.endereco || "Endereço não disponível"}
                        </Typography>
                    </CardContent>

                    <hr className="restauro-separator" />

                    {/* Horários (Organizados e Circulares) */}
                    <Box className="restauro-card-times">
                        {horarios.map((hora) => (
                            <Button
                                key={hora}
                                variant="outlined"
                                size="small"
                                className="restauro-card-time-btn"
                                onClick={() => reservarComHorario(hora)}
                            >
                                {hora}
                            </Button>
                        ))}
                    </Box>
                </Box>

                {/* Botão de detalhes (Abaixo da linha, como no exemplo) */}
                <CardActions className="restauro-card-actions">
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => navigate(`/restaurantes/${restaurant.id}`)}
                    >
                        Ver detalhes
                    </Button>
                </CardActions>
            </Box>
        </Card>
    );
}