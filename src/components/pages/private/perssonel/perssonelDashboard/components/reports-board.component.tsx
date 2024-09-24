import { Box, Typography } from '@mui/material'
import DynamicIcon from '../../../../../utilities/DynamicIcon'
import ReportsCard from './reports-card.component';

const reportItems: Array<{
  name: string;
  location: string;
  status: 'Pendiente' | 'En progreso' | 'Completado' | 'Cancelado';  // Tipos específicos de status
  description: string;
}> = [
  { name: 'Baño Hombres', location: '5to Piso - Zona Oriental', status: 'Pendiente', description: 'Se rompió el envase de jabón está regado por toda la mesa' },
  { name: 'Baño Mujeres', location: '5to Piso - Zona Oriental', status: 'En progreso', description: 'Se rompió el envase de jabón está regado por toda la mesa' },
  { name: 'Baño Hombres', location: '5to Piso - Zona Oriental', status: 'Completado', description: 'Se rompió el envase de jabón está regado por toda la mesa' },
  { name: 'Baño Mujeres', location: '5to Piso - Zona Oriental', status: 'Cancelado', description: 'Se rompió el envase de jabón está regado por toda la mesa' },
];

export default function ReportsBoard() {
  return (
    <Box height={'100%'} width={'50%'} gap={'30px'} padding={'30px'}>
      <Box width={'100%'} display={'flex'} justifyContent={'space-evenly'} alignItems={'center'} height={'100px'}>
        <Typography variant="h2"> Reportes</Typography>
        <Box width={'140px'} height={'40%'} padding={'5px 10px'} display={'flex'} bgcolor={'#E0F7FA'} borderRadius={'20px'} justifyContent={'space-between'} alignItems={'center'}>
          <DynamicIcon iconName={'CleanHandsIcon'} />
          <Typography variant="h3">Limpieza</Typography>
        </Box>
      </Box>
        {reportItems.map((item, index) => (
              <ReportsCard key={index} item={item}/>
            ))}
    </Box>
  )
}
