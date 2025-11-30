import { Box, Chip, IconButton, Select, MenuItem } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRef } from "react";
import "../styles/DesktopFilter.css";

export default function DesktopFilter() {
    const scrollRef = useRef(null);

    const categorias = [
        "Italian",
        "Brunch",
        "Mexican",
        "Pizza",
        "Seafood",
        "American",
        "Japanese",
        "Birthdays",
        "Romantic",
        "Burger",
        "Vegan",
        "Barbecue",
        "Sushi",
        "Fast Food",
        "Healthy",
        "Chinese",
        "Desserts",
        "Steakhouse",
        "Coffee",
        "Brazilian"
    ];

    const scroll = (direction) => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: direction === "left" ? -200 : 200,
            behavior: "smooth",
        });
    };

    return (
        <Box className="filter-container">
            <Select
                defaultValue="filtros"
                size="small"
                className="filter-select"
            >
                <MenuItem value="filtros">Filtros</MenuItem>
                <MenuItem value="rating">Melhores avaliações</MenuItem>
                <MenuItem value="price">Preços</MenuItem>
                <MenuItem value="distance">Distância</MenuItem>
                <MenuItem value="open_now">Aberto agora</MenuItem>
            </Select>

            <IconButton onClick={() => scroll("left")} className="scroll-btn">
                <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>

            <Box
                ref={scrollRef}
                className="chips-scroll-area"
            >
                {categorias.map((cat) => (
                    <Chip
                        key={cat}
                        label={cat}
                        clickable
                        className="filter-chip"
                    />
                ))}
            </Box>

            <IconButton onClick={() => scroll("right")} className="scroll-btn">
                <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
        </Box>
    );
}
