import { Box, Button, Typography } from "@mui/material";
import siteKeeperLogo from '../../../../../assets/img/logoRiwi.png'
import siteKeeperHeaderImg from '../../../../../assets/img/site-keeper-header-image.jpg'

export default function Header() {
    return (
        <Box height={'760px'} sx={{
            background: 'linear-gradient(90deg, #B79C8A 0%, #E7E0D9 100%)'
        }}>
            <Box height={'100px'} width={'100%'} display={'flex'}>
                <Box height={'100%'} width='33%' display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <img src={siteKeeperLogo} style={{ height: '100%' }} />
                    <Typography color='white' variant="subtitle1">SiteKeeper</Typography>
                </Box>
                <Box height={'100%'} gap={'35px'} width='33%' display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Typography color='white' variant="subtitle1">Servicios</Typography>
                    <Typography color='white' variant="subtitle1">Sobre Nosotros</Typography>
                    <Typography color='white' variant="subtitle1">Preguntas Frecuentes</Typography>
                </Box>
                <Box height={'100%'} width='33%' display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Button color="warning" variant="contained" sx={{ borderRadius: '33px', height: '34px', minWidth: '121px', border: '1px solid black' }} >Probar Demo</Button>
                </Box>
            </Box>
            <Box display={'flex'}>
                <Box width={'50%'} height={'660px'} display={'flex'} color={'white'} flexDirection={'column'} paddingLeft={'5%'} paddingRight={'10%'} justifyContent={'center'}>
                    <Typography variant="h1">Desbloquea el potencial de tus espacios</Typography>
                    <Typography variant='subtitle2'>En <span style={{ color: 'primary.main' }}>SiteKeeper</span> somos especialistas en optimizar espacios para empresas. Desde encontrar objetos perdidos hasta ofrecer soluciones de gestión de primera categoría, tenemos todo cubierto.</Typography>
                </Box>
                <Box
                    width={'50%'}
                    height={'660px'}
                    display={'flex'}
                    color={'white'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    overflow={'hidden'}
                >
                    <img
                        src={siteKeeperHeaderImg}
                        alt="Site Keeper Header"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition:'0px -500px' }}
                    />
                </Box>
            </Box>
        </Box>
    )
}
