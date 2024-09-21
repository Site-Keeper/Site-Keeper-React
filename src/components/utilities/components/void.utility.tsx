import { Box, Typography } from '@mui/material'
import voidImage from '../../../assets/img/void-image.svg'

export default function Void() {
  return (
    <Box
    display={'flex'}
    justifyContent={'center'}
    alignItems={'center'}
    flexDirection={'column'}
    gap={'30px'}
    sx={{
        width: '100%',
        height: '45vh'
    }}>
        <Box height={'60%'} width={'60%'}>
            <img src={voidImage} style={{width: '100%', height: '100%'}}/>
        </Box>
        <Typography variant='h3'>Lo sentimos, no hay nada que ver aqui</Typography>
    </Box>
  )
}
