import { Box, Typography, TextField, Button, MenuItem, InputAdornment } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupIcon from '@mui/icons-material/Group';
import '../styles/HomeSection.css';


export default function HomeSection() {
    return (
        <Box className="home-container">
            <Box className="home-content">
                {/** Texto da home, tudo é alteravel apenas esqueleto */}
                <Typography variant='h3' className='home-title'>
                    Procurando uma reserva rápida?
                </Typography>
                <Typography variant="subtitle1" className="home-subtitle">
                    Reserve facilmente em restaurantes próximos a você.
                </Typography>

                {/** Parte de search, não sabe inglês? sai da area kkkkkkkkk */}

                <Box className="search-box">

                    <Box className="field-wrapper">
                        <TextField
                            label="Local"
                            variant="outlined"
                            size="small"
                            className="search-field"
                            fullWidth
                        />
                        <LocationOnIcon className="field-icon" />
                    </Box>
                    <Box className="field-wrapper">
                        <TextField
                            label="Data"
                            type="date"
                            variant="outlined"
                            size="small"
                            className="search-field"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                        <CalendarMonthIcon className="field-icon" />

                    </Box>
                    {/** as linhas riscadas foi o chat, mas sem isso quebra */}
                    <Box className="field-wrapper">
                        <TextField
                            label=""
                            type="time"
                            variant="outlined"
                            size="small"
                            className="search-field"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                        <AccessTimeIcon className="field-icon" />
                    </Box>

                    <Box className="field-wrapper">
                        <TextField
                            label=""
                            select
                            variant="outlined"
                            size="small"
                            className="search-field"
                            fullWidth
                            defaultValue={2}
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                                <MenuItem key={n} value={n}>
                                    {n} {n === 1 ? 'pessoa' : 'pessoas'}
                                </MenuItem>
                            ))}
                        </TextField>
                        <GroupIcon className="field-icon" />
                    </Box>
                    <Button
                        variant='contained'
                        color='primary'
                        className='search-button'
                    >
                        Buscar
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}