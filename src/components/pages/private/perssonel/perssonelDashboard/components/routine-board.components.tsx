import { Box, Typography } from '@mui/material'
import DynamicIcon from '../../../../../utilities/DynamicIcon'

export default function RoutineBoard() {
  return (
    <Box height={'100%'} width={'50%'} gap={'30px'} padding={'30px'}>
      <Box width={'100%'} display={'flex'} justifyContent={'space-evenly'} alignItems={'center'} height={'100px'}>
        <Typography variant="h2"> Tu Rutina de Hoy</Typography>
        <Box width={'140px'} height={'40%'} padding={'5px 10px'} display={'flex'} bgcolor={'#E0F7FA'} borderRadius={'20px'} justifyContent={'space-between'} alignItems={'center'}>
          <DynamicIcon iconName={'CleanHandsIcon'} />
          <Typography variant="h3">Limpieza</Typography>
        </Box>
      </Box>
    </Box>
  )
}
