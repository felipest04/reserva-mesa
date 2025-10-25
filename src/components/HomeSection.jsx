import { Typography, Container, duration} from "@mui/material";

function HomeSection() {
    return (
        <Container sx={{ mt: 4}}>
            <Typography variant="h3" gutterBottom>
                Bem vindo ao Restaurante
            </Typography>

            <Typography variant="body1">
                Aqui nos vamos reservar a mesa 
                Escolha horarios quantidade pessoas
            </Typography>
        </Container>
    )
}

export default HomeSection;