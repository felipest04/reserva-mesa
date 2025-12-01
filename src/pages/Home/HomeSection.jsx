import {useEffect, useState, useMemo} from "react";
import {Box, Typography, TextField, Button, MenuItem, CircularProgress} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupIcon from "@mui/icons-material/Group";
import SearchIcon from '@mui/icons-material/Search';

import {getRestaurantes} from "../../api/restauranteApi.jsx";
import RestaurantCard from "../../components/RestaurantCard.jsx";

import "../../styles/HomeSection.css";

export default function HomeSection() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // showMap não é mais necessário
    const [showMap, setShowMap] = useState(false);

    // Estados para os filtros
    const today = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedTime, setSelectedTime] = useState("");
    const [partySize, setPartySize] = useState(2);


    useEffect(() => {
        getRestaurantes()
            .then(res => {
                setRestaurants(res.data);
            })
            .catch(err => {
                console.error("Erro na requisição:", err);
            })
            .finally(() => setLoading(false));
    }, []);

    const availableTimes = useMemo(() => {
        const times = new Set();
        restaurants.forEach(r => {
            try {
                if (r.horarios_funcionamento) {
                    const parsedTimes = JSON.parse(r.horarios_funcionamento);
                    parsedTimes.forEach(time => times.add(time));
                }
            } catch (e) {
                console.error("Erro ao parsear horarios_funcionamento:", r.horarios_funcionamento, e);
            }
        });
        // Ordena os horários para exibição
        return Array.from(times).sort();
    }, [restaurants]);

    // Lógica de filtragem
    const filtered = useMemo(() => {
        return restaurants
            .filter(r =>
                (r.nome || "")
                    .toLowerCase()
                    .includes((searchQuery || "").toLowerCase())
            )
            .filter(r => {
                if (!selectedTime) return true;

                try {
                    const availableSlots = JSON.parse(r.horarios_funcionamento || "[]");
                    return availableSlots.includes(selectedTime);
                } catch (e) {
                    return false;
                }
            });
    }, [restaurants, searchQuery, selectedTime]);


    const handleSearchClick = () => {
        setShowMap(true);
    }


    return (
        <Box className="home-container">
            <Box className="home-content">
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
                            label="Restaurante"
                            type="search"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <SearchIcon className="field-icon"/>
                    </Box>

                    <Box className="field-wrapper">
                        <TextField
                            label="Data"
                            type="date"
                            variant="outlined"
                            size="small"
                            fullWidth
                            InputLabelProps={{shrink: true}}
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                        <CalendarMonthIcon className="field-icon"/>
                    </Box>

                    <Box className="field-wrapper">
                        <TextField
                            label="Hora"
                            select
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                        >
                            <MenuItem value="">Qualquer hora</MenuItem>
                            {availableTimes.map(time => (
                                <MenuItem key={time} value={time}>
                                    {time}
                                </MenuItem>
                            ))}
                        </TextField>
                        <AccessTimeIcon className="field-icon"/>
                    </Box>

                    <Box className="field-wrapper">
                        <TextField
                            label="Pessoas"
                            select
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={partySize}
                            onChange={(e) => setPartySize(parseInt(e.target.value))}
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                                <MenuItem key={n} value={n}>
                                    {n} {n === 1 ? "pessoa" : "pessoas"}
                                </MenuItem>
                            ))}
                        </TextField>
                        <GroupIcon className="field-icon"/>
                    </Box>

                    <Button
                        variant="contained"
                        color="primary"
                        className="search-button"
                        onClick={handleSearchClick}
                    >
                        Buscar ({filtered.length})
                    </Button>
                </Box>

                {loading ? (
                    <Box sx={{display: "flex", justifyContent: "center", mt: 8}}>
                        <CircularProgress/>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: {xs: "column", md: "row"},
                            gap: 2,
                            mt: 3,
                            alignItems: "flex-start",
                        }}
                    >
                        <Box
                            className="restaurant-list"
                            sx={{
                                flex: 1,
                                overflowY: "auto",
                                pr: 2,
                                width: '100%'
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                {showMap ? `Resultados da busca (${filtered.length})` : "Restaurantes Populares"}
                            </Typography>
                            {filtered.length > 0 ? (
                                filtered.map(r => (
                                    <RestaurantCard key={r.id} restaurant={r}/>
                                ))
                            ) : (
                                <Typography color="textSecondary" sx={{mt: 2}}>
                                    Nenhum restaurante encontrado com os filtros selecionados.
                                </Typography>
                            )}
                        </Box>

                    </Box>
                )}
            </Box>
        </Box>
    );
}