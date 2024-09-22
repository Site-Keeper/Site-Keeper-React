import { Typography, Button, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

export default function AboutSection() {
    const features = [
        "Planificación Eficiente del Espacio",
        "Recuperación de Objetos Perdidos",
        "Herramientas Integrales de Gestión"
    ];

    return (
        <Box component={'section'} id='about' padding="50px">
            <Typography variant="overline" gutterBottom>
                Transforma Tu Espacio de Trabajo
            </Typography>
            <Typography variant="h3" component="h1" gutterBottom>
                Revoluciona Tu Experiencia de Gestión de Espacios
            </Typography>
            <Box maxWidth={'525px'}>
                <Typography variant="body1">
                    En SiteKeeper, nos dedicamos a proporcionar soluciones de primera clase que mejoran la organización y gestión de tu espacio. Nuestros servicios innovadores atienden a empresas de todos los tamaños, asegurando eficiencia y productividad.
                </Typography>
            </Box>
            <List>
                {features.map((feature, index) => (
                    <ListItem key={index} disableGutters>
                        <ListItemIcon>
                            <CheckIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                    </ListItem>
                ))}
            </List>
            <Box mt={3}>
                <Button variant="contained" color="secondary" size="large">
                    Comienza a Optimizar Ahora
                </Button>
            </Box>
        </Box>
    );
}