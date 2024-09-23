import { Box, Typography } from '@mui/material';
import ServicesCard from './services-card.component';
import Grid from '@mui/material/Grid2';
import BoltSharpIcon from '@mui/icons-material/BoltSharp';
import AutoAwesomeSharpIcon from '@mui/icons-material/AutoAwesomeSharp';
import LockIcon from '@mui/icons-material/Lock';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Item {
  title: string;
  description: string;
}

interface LanguageTranslations {
  title: string;
  subtitle: string;
  items: Item[];
  changeLanguage: string;
}

interface Translations {
  en: LanguageTranslations;
  es: LanguageTranslations;
}

const translations: Translations = {
  en: {
    title: "Optimize your space",
    subtitle: "Effective solutions to organize your space",
    items: [
      {
        title: "Space Management",
        description: "Maximize productivity with our expert space organization services.",
      },
      {
        title: "Lost and Found",
        description: "Never lose track of important items with our specialized recovery service.",
      },
      {
        title: "Management Solutions",
        description: "Empower your business with innovative tools to effectively monitor spaces and employees.",
      },
      {
        title: "Customized Solutions",
        description: "Personalized options to meet the specific needs of your business operations.",
      }
    ],
    changeLanguage: "Cambiar a Español"
  },
  es: {
    title: "Optimiza tu espacio",
    subtitle: "Soluciones eficaces para organizar tu espacio",
    items: [
      {
        title: "Gestión de Espacios",
        description: "Maximiza la productividad con nuestros servicios expertos de organización de espacios.",
      },
      {
        title: "Objetos Perdidos",
        description: "Nunca pierdas el rastro de objetos importantes con nuestro servicio especializado de recuperación.",
      },
      {
        title: "Soluciones de Gestión",
        description: "Potencia tu negocio con herramientas innovadoras para supervisar espacios y empleados eficazmente.",
      },
      {
        title: "Soluciones a Medida",
        description: "Opciones personalizadas para satisfacer las necesidades específicas de las operaciones de tu negocio.",
      }
    ],
    changeLanguage: "Change to English"
  }
};

const icons = [
  <BoltSharpIcon sx={{ fontSize: 40 }} />,
  <AutoAwesomeSharpIcon sx={{ fontSize: 40 }} />,
  <LockIcon sx={{ fontSize: 40 }} />,
  <FavoriteIcon sx={{ fontSize: 40 }} />
];

// Definir el tipo de idioma permitido
type Language = 'en' | 'es';

interface IProp {
  language: Language;
}

export default function ServicesSection({ language }: IProp) {
  const t: LanguageTranslations = translations[language];

  return (
    <Box component={'section'} id='services' width={'100%'} height={'auto'} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} alignItems={'center'} padding={'30px 0px'}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Typography variant='subtitle1' color='gray'>{t.title}</Typography>
        <Typography variant='h3' textAlign={'center'}>{t.subtitle}</Typography>
      </Box>
      <Box width={'100%'}>
        <Grid container>
          {t.items.map((item: Item, index: number) => (
            <Grid
              key={item.title}
              padding={'10px'}
              sx={{
                width: {
                  xs: '100%',
                  sm: '50%',
                  md: '25%',
                }
              }}
            >
              <ServicesCard cardInfo={{ ...item, icon: icons[index] }} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
