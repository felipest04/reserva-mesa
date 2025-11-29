// src/components/MapContainer.jsx
// tem que buscas para o mapa aparecer
import { Box, Typography } from "@mui/material";
import '../styles/MapContainer.css';

export default function MapContainer({ show, restaurants = [] }) {
    if (!show) return null; // só renderiza se show = true

    return (
        <Box className="map-container">
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                Mapa interativo
            </Typography>

            {/* Placeholder dos pins do mapa */}
            {restaurants.length > 0 ? (
                restaurants.map(r => (
                    <Typography
                        key={r.id}
                        variant="body2"
                        color="text.primary"
                        sx={{ background: '#f0f0f0', p: 0.5, borderRadius: 1, mb: 0.5 }}
                    >
                        {r.name} - {r.address}
                    </Typography>
                ))
            ) : (
                <Typography variant="body2" color="text.secondary">
                    Nenhum restaurante selecionado
                </Typography>
            )}
        </Box>
    );
}
