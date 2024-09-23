import { Box, Button, Typography } from "@mui/material";
import siteKeeperLogo from '../../../../../assets/img/sitekeeper-logo-image.ico'
import siteKeeperHeaderImg from '../../../../../assets/img/site-keeper-header-image.jpg'
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    const scrollToSection = (elementId: string) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Box height={'760px'} sx={{
            background: 'linear-gradient(90deg, #B79C8A 0%, #E7E0D9 100%)'
        }}>
            <Box height={'100px'} width={'100%'} display={'flex'} justifyContent={'space-around'}>
                <Box height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} gap={'15px'}>
                    <Box height={'50px'}>
                        <img src={siteKeeperLogo} style={{ height: '100%' }} alt="SiteKeeper Logo" />
                    </Box>
                    <Typography color='white' variant="subtitle1">SiteKeeper</Typography>
                </Box>
                <Box height={'100%'} gap={'35px'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Typography
                        color='white'
                        variant="subtitle1"
                        onClick={() => scrollToSection('services')}
                        sx={{ cursor: 'pointer' }}
                    >
                        Servicios
                    </Typography>
                    <Typography
                        color='white'
                        variant="subtitle1"
                        onClick={() => scrollToSection('about')}
                        sx={{ cursor: 'pointer' }}
                    >
                        Sobre Nosotros
                    </Typography>
                    <Typography
                        color='white'
                        variant="subtitle1"
                        onClick={() => scrollToSection('faq')}
                        sx={{ cursor: 'pointer' }}
                    >
                        Preguntas Frecuentes
                    </Typography>
                </Box>
                <Box height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Button color="warning" variant="contained" onClick={() => navigate('/')} sx={{ borderRadius: '33px', height: '34px', minWidth: '121px', border: '1px solid black' }} >Probar Demo</Button>
                </Box>
            </Box>
            <Box display={'flex'}>
                <Box width={'50%'} height={'660px'} display={'flex'} color={'white'} flexDirection={'column'} paddingLeft={'5%'} paddingRight={'10%'} justifyContent={'center'} gap={'40px'}>
                    <Typography variant="h1">Desbloquea el potencial de tus espacios</Typography>
                    <Typography variant='subtitle2'>En <span style={{ color: 'rgb(242,205,97)' }}>SiteKeeper</span> somos especialistas en optimizar espacios para empresas. Desde encontrar objetos perdidos hasta ofrecer soluciones de gestión de primera categoría, tenemos todo cubierto.</Typography>
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
                        style={{ height: '100%', objectFit: 'cover', objectPosition: '0px -300px' }}
                    />
                </Box>
            </Box>
        </Box>
    )
}