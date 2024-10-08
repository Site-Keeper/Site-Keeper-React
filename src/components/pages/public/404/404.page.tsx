import { Box, Button, Typography } from '@mui/material'
import image404 from '../../../../assets/img/404-image.svg'
import { useNavigate } from 'react-router-dom'

export default function Page404() {
  const navigate = useNavigate()

  return (
    <Box height={'100vh'} width='100vw' display={'flex'} gap={'30px'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
        <Box height={'50vh'} width={'50vw'}>
            <img src={image404} style={{width: '100%', height: '100%'}}/>
        </Box>
        <Typography variant='h2'>Esta pagina no fue encontrada</Typography>
        <Button variant={'contained'} onClick={() => navigate('/')}> Volver a Home</Button>
    </Box>
  )
}
