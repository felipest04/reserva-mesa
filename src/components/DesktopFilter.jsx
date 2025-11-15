import { Box, Chip, IconButton, Select, MenuItem, Menu } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRef } from "react";
import { Directions } from "@mui/icons-material";
import "../styles/DesktopFilter.css";




export default function DesktopFilter() {
    const scrollRef = useRef(null)
    {/** lista dos possvies */}
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
    ]
        {/** tentei fazer uma rolagem dinamica só vai dar de saber se funcionou quando tiver mais opções nos fitros */}
    const scroll = (direction) => {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({
            left: direction === "left" ? -200 : 200,
            behavior: "smooth",
        });
    }
    return(
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                padding: "1rem 0",
                borderBottom: "1px solido #ddd"
            }}
        >

            <Select
            defaultValue="filtros"
            size="small"
            sx={{ borderRadius: "20px", height: 36}}
            >
                {/** O que tem no filtro principal */}
                <MenuItem value="filtros">Filtros</MenuItem>
                <MenuItem value="rating">Melhore avaliações</MenuItem>
                <MenuItem value="price">Preços</MenuItem>
            </Select>


            <IconButton onClick={() => scroll("left")}>
                <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
                 {/** Percorre a lista de categorias disponivel // Backend*/}
             <Box
                ref={scrollRef}
                sx={{
                    display: "flex",
                    gap: 1,
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                    flex: 1,
                    paddingBottom: 0.5,
                    "&::-webkit-scrollbar": { display: "none" },
                }}
            >
                {categorias.map((cat) => (
                    <Chip
                        key={cat}
                        label={cat}
                        variant="outlined"
                        clickable
                        sx={{ borderRadius: "20px" }}
                    />
                ))}
            </Box>
                        <IconButton onClick={() => scroll("right")}>
                <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
        </Box>
    )
}