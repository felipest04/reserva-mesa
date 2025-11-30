// src/features/HomeSection.jsx
import { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, MenuItem, CircularProgress } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupIcon from "@mui/icons-material/Group";

import { getRestaurantes } from "../../api/restauranteApi";
import RestaurantCard from "../../components/RestaurantCard.jsx";
import MapContainer from "../../components/MapContainer";

// Mock de restaurantes para teste
import { mockRestaurantes } from "../../mocks/MockRestaurantes.js"; // <--- REMOVER AO INTEGRAR COM API REAL
import "../../styles/HomeSection.css";

export default function HomeSection() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [showMap, setShowMap] = useState(false); // controla exibição do mapa e cards

    useEffect(() => {
        console.log("Home carregou, chamando API...");

        getRestaurantes()
            .then(res => {
                console.log("Resposta da API:", res);
                setRestaurants(res.data);
            })
            .catch(err => {
                console.error("Erro na requisição, usando mock:", err);
                // Se der erro na API, usamos o mock para teste
                setRestaurants(mockRestaurantes); // <--- REMOVER AO INTEGRAR COM API REAL
            })
            .finally(() => setLoading(false));
    }, []);

    const filtered = (restaurants || []).filter(r =>
        r.name.toLowerCase().includes(query.toLowerCase())
    );

    const handleSearch = () => {
        setShowMap(true); // mostra mapa e cards após a busca
    };

    return (
        <Box className="home-container">
            <Box className="home-content">
                {/* Texto da home */}
                <Typography variant="h3" className="home-title">
                    Procurando uma reserva rápida?
                </Typography>
                <Typography variant="subtitle1" className="home-subtitle">
                    Reserve facilmente em restaurantes próximos a você.
                </Typography>

                {/* Caixa de busca */}
                <Box className="search-box">
                    <Box className="field-wrapper">
                        <TextField
                            label="Local"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                        />
                        <LocationOnIcon className="field-icon" />
                    </Box>

                    <Box className="field-wrapper">
                        <TextField
                            label="Data"
                            type="date"
                            variant="outlined"
                            size="small"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                        <CalendarMonthIcon className="field-icon" />
                    </Box>

                    <Box className="field-wrapper">
                        <TextField
                            label="Hora"
                            type="time"
                            variant="outlined"
                            size="small"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                        <AccessTimeIcon className="field-icon" />
                    </Box>

                    <Box className="field-wrapper">
                        <TextField
                            label="Pessoas"
                            select
                            variant="outlined"
                            size="small"
                            fullWidth
                            defaultValue={2}
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                                <MenuItem key={n} value={n}>
                                    {n} {n === 1 ? "pessoa" : "pessoas"}
                                </MenuItem>
                            ))}
                        </TextField>
                        <GroupIcon className="field-icon" />
                    </Box>

                    <Button
                        variant="contained"
                        color="primary"
                        className="search-button"
                        onClick={handleSearch}
                    >
                        Buscar
                    </Button>
                </Box>

                {/* Layout principal */}
                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            gap: 2,
                            mt: 3,
                            alignItems: "flex-start",
                            height: "80vh",
                        }}
                    >
                        {/* Lista de restaurantes e mapa só aparecem após buscar */}
                        {showMap && (
                            <>
                                <Box
                                    className="restaurant-list"
                                    sx={{
                                        flex: 1,
                                        overflowY: "auto",
                                        pr: 2,
                                    }}
                                >
                                    {filtered.map(r => (
                                        <RestaurantCard key={r.id} restaurant={r} />
                                    ))}
                                </Box>

                                <Box
                                    className="map-wrapper"
                                    sx={{
                                        width: { xs: "100%", md: "400px" },
                                        position: { xs: "relative", md: "sticky" },
                                        top: { md: "80px" },
                                        height: "100%",
                                    }}
                                >
                                    <MapContainer show={showMap} restaurants={filtered} />
                                </Box>
                            </>
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    );
}
