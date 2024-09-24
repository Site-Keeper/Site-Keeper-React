import { Typography, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const translations = {
    en: {
        overline: "Transform Your Workspace",
        title: "Revolutionize Your Space Management Experience",
        description: "At SiteKeeper, we are dedicated to providing first-class solutions that enhance the organization and management of your space. Our innovative services cater to businesses of all sizes, ensuring efficiency and productivity.",
        features: [
            "Efficient Space Planning",
            "Lost Item Recovery",
            "Comprehensive Management Tools"
        ],
        ctaButton: "Start Optimizing Now"
    },
    es: {
        overline: "Transforma Tu Espacio de Trabajo",
        title: "Revoluciona Tu Experiencia de Gestión de Espacios",
        description: "En SiteKeeper, nos dedicamos a proporcionar soluciones de primera clase que mejoran la organización y gestión de tu espacio. Nuestros servicios innovadores atienden a empresas de todos los tamaños, asegurando eficiencia y productividad.",
        features: [
            "Planificación Eficiente del Espacio",
            "Recuperación de Objetos Perdidos",
            "Herramientas Integrales de Gestión"
        ],
        ctaButton: "Comienza a Optimizar Ahora"
    }
};

interface IProp {
    language: 'en' | 'es';
}

export default function AboutSection({ language }: IProp) {
    const t = translations[language];

    return (
        <Box component={'section'} id='about' padding="50px" position="relative">
            <Typography variant="overline" gutterBottom>
                {t.overline}
            </Typography>
            <Typography variant="h3" component="h1" gutterBottom>
                {t.title}
            </Typography>
            <Box maxWidth={'525px'}>
                <Typography variant="body1">
                    {t.description}
                </Typography>
            </Box>
            <List>
                {t.features.map((feature, index) => (
                    <ListItem key={index} disableGutters>
                        <ListItemIcon>
                            <CheckIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
