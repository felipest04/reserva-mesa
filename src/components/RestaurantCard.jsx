import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import "../styles/RestauroCard.css";

export default function RestaurantCard({ restaurant }) {
  const navigate = useNavigate();

  if (!restaurant) return null;

  const horarios = restaurant.horarios || ["12:00", "13:00", "14:00"];
  const rating = restaurant.rating || 4;

  // Função para ir direto para a reserva com horário pré-selecionado
  const reservarComHorario = (hora) => {
    navigate(`/restaurantes/${restaurant.id}/reservar?hora=${hora}`);
  };

  return (
    <Card className="restauro-card">
      {/* Imagem */}
      <CardMedia
        component="img"
        image={restaurant.photo || "/assets/FotoDefault.png"}
        alt={restaurant.name || "Restaurante"}
        className="restauro-card-image"
      />

      {/* Conteúdo */}
      <Box className="restauro-card-content-wrapper">
        <CardContent className="restauro-card-content">
          <Typography variant="h6" gutterBottom>
            {restaurant.name || "Nome não disponível"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {restaurant.address || "Endereço não disponível"}
          </Typography>

          {/* Horários */}
          <Box className="restauro-card-times">
            {horarios.map((hora) => (
              <Button
                key={hora}
                variant="outlined"
                size="small"
                className="restauro-card-time-btn"
                onClick={() => reservarComHorario(hora)} // 👈 ADICIONADO
              >
                {hora}
              </Button>
            ))}
          </Box>

          {/* Avaliação */}
          <Box className="restauro-card-rating">
            {Array.from({ length: 5 }).map((_, index) => (
              <StarIcon
                key={index}
                fontSize="small"
                className={index < rating ? "star-filled" : "star-empty"}
              />
            ))}
            <Typography variant="body2" color="text.secondary" className="rating-text">
              {rating.toFixed(1)}
            </Typography>
          </Box>
        </CardContent>

        <CardActions className="restauro-card-actions">
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => navigate(`/restaurantes/${restaurant.id}`)} // 👈 DETALHES
          >
            Ver detalhes
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}
