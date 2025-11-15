import { Box, Typography, Chip, Rating, Button } from "@mui/material";
import "../styles/RestauroCard.css";


export default function CardsRestauro({ restaurante }) {
    return (
        <div>
            {/** Estilo do card, como essa parte é de outra pessoa pode ser apagado e feito pelo css */}
            <Box
            
                sx={{
                    display: "flex",
                    gap: 2,
                    padding: 2,
                    borderRadius: 3,
                    border: "1px solid #eee",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                    marginBottom: 2,
                    backgroundColor: "#fff"
                }}
            >
                {/* Imagem do restaurantee aqui malandro */}
                <Box
                    component="img"
                    src={restaurante.image}
                    alt={restaurante.name}
                    sx={{
                        width: 160,
                        height: 120,
                        borderRadius: 2,
                        objectFit: "cover"
                    }}
                />

                {/* Infos dos restaurantees  */}
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">{restaurante.name}</Typography>

                    <Rating value={restaurante.rating} readOnly size="small" />

                    <Typography variant="body2" color="text.secondary">
                        {restaurante.category} • {restaurante.city}
                    </Typography>

                    {/* horários disponíveis os já setados por padrão, não precisa ser verdade */}
                    <Box sx={{ display: "flex", gap: 1, marginTop: 1 }}>
                        {restaurante.times?.map((t, i) => (
                            <Button
                                key={i}
                                variant="contained"
                                size="small"
                                sx={{ backgroundColor: "#d32f2f" }}
                            >
                                {t}
                            </Button>
                        ))}
                    </Box>
                </Box>
            </Box>
        </div>
    )
}