import { Box, Typography } from '@mui/material'
import ServicesCard from './services-card.component'
import Grid from '@mui/material/Grid2';
import BoltSharpIcon from '@mui/icons-material/BoltSharp';
import AutoAwesomeSharpIcon from '@mui/icons-material/AutoAwesomeSharp';
import LockIcon from '@mui/icons-material/Lock';
import FavoriteIcon from '@mui/icons-material/Favorite';

const items = [
  {
    title: "Gestión de Espacios",
    description: "Maximiza la productividad con nuestros servicios expertos de organización de espacios.",
    icon: <BoltSharpIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: "Objetos Perdidos",
    description: "Nunca pierdas el rastro de objetos importantes con nuestro servicio especializado de recuperación.",
    icon: <AutoAwesomeSharpIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: "Soluciones de Gestión",
    description: "Potencia tu negocio con herramientas innovadoras para supervisar espacios y empleados eficazmente.",
    icon: <LockIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: "Soluciones a Medida",
    description: "Opciones personalizadas para satisfacer las necesidades específicas de las operaciones de tu negocio.",
    icon: <FavoriteIcon sx={{ fontSize: 40 }} />,
  }
];


export default function ServicesSection() {
  return (
    <Box component={'section'} id='services' width={'100%'} height={'475px'} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} alignItems={'center'}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Typography variant='subtitle1' color='gray'>Optimiza tu espacio</Typography>
        <Typography variant='h3' textAlign={'center'}>Soluciones eficaces para organizar tu espacio</Typography>
      </Box>
      <Box height={'200px'} width={'100%'}>
        <Grid container>
          {items.map((item) => (
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
              <ServicesCard cardInfo={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
