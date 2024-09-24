import { Box, Button, Typography, useTheme, useMediaQuery, Select, MenuItem } from "@mui/material";
import siteKeeperLogo from '../../../../../assets/img/sitekeeper-logo-image.ico'
import siteKeeperHeaderImg from '../../../../../assets/img/site-keeper-header-image.jpg'
import { useNavigate } from "react-router-dom";
import spanishFlag from '../../../../../assets/img/spain-flag.png';
import englishFlag from '../../../../../assets/img/united-states-flag.png';

const translations: Record<string, {
    navItems: string[];
    ctaButton: string;
    title: string;
    subtitle: string;
  }> = {
    en: {
      navItems: ['Services', 'About Us', 'FAQ'],
      ctaButton: 'Try Demo',
      title: 'Unlock the potential of your spaces',
      subtitle: 'At SiteKeeper, we specialize in optimizing spaces for businesses. From finding lost objects to offering top-tier management solutions, we have everything covered.',
    },
    es: {
      navItems: ['Servicios', 'Sobre Nosotros', 'Preguntas Frecuentes'],
      ctaButton: 'Probar Demo',
      title: 'Desbloquea el potencial de tus espacios',
      subtitle: 'En SiteKeeper somos especialistas en optimizar espacios para empresas. Desde encontrar objetos perdidos hasta ofrecer soluciones de gestión de primera categoría, tenemos todo cubierto.',
    }
  };
  

interface IProp{
    language: 'en' | 'es',
    setLanguage: React.Dispatch<React.SetStateAction<'en' | 'es'>>
}

export default function Header( {language, setLanguage} : IProp) {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const t = translations[language];

    const scrollToSection = (elementId: string) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'es' : 'en');
    };

    return (
        <Box sx={{
            background: 'linear-gradient(90deg, #B79C8A 0%, #E7E0D9 100%)',
            height: { xs: 'auto', md: '760px' },
            padding: { xs: theme.spacing(2), sm: theme.spacing(3), md: 0 }
        }}>
            <Box position="absolute" top={25} left={10}>
                <Select
                    value={language}
                    onChange={toggleLanguage}
                    sx={{ minWidth: 70, borderColor: 'red' }}
                >
                    <MenuItem value="es">
                        <Box display="flex" alignItems="center">
                            <img src={spanishFlag} alt="Spanish" style={{ width: 20, marginRight: 8 }} />
                        </Box>
                    </MenuItem>
                    <MenuItem value="en">
                        <Box display="flex" alignItems="center">
                            <img src={englishFlag} alt="English" style={{ width: 20, marginRight: 8 }} />
                        </Box>
                    </MenuItem>
                </Select>
            </Box>
            <Box sx={{
                height: { xs: 'auto', md: '100px' },
                width: '100%',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-around',
                alignItems: 'center',
                gap: { xs: theme.spacing(2), md: 0 },
            }}>
                <Box sx={{
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: theme.spacing(2)
                }}>
                    <Box height={'50px'}>
                        <img src={siteKeeperLogo} style={{ height: '100%' }} alt="SiteKeeper Logo" />
                    </Box>
                    <Typography color='white' variant="subtitle1">SiteKeeper</Typography>
                </Box>
                <Box sx={{
                    height: { xs: 'auto', md: '100%' },
                    gap: { xs: theme.spacing(2), md: theme.spacing(4) },
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {t.navItems.map((text, index) => (
                        <Typography
                            key={index}
                            color='white'
                            variant="subtitle1"
                            onClick={() => scrollToSection(['services', 'about', 'faq'][index])}
                            sx={{ cursor: 'pointer' }}
                        >
                            {text}
                        </Typography>
                    ))}
                </Box>
                <Box sx={{
                    height: { xs: 'auto', md: '100%' },
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: { xs: theme.spacing(2), md: 0 }
                }}>
                    <Button 
                        color="warning" 
                        variant="contained" 
                        onClick={() => navigate('/')} 
                        sx={{ 
                            borderRadius: '33px', 
                            height: '34px', 
                            minWidth: '121px', 
                            border: '1px solid black' 
                        }}
                    >
                        {t.ctaButton}
                    </Button>
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                marginTop: { xs: theme.spacing(4), md: 0 }
            }}>
                <Box sx={{
                    width: { xs: '100%', md: '50%' },
                    height: { xs: 'auto', md: '660px' },
                    display: 'flex',
                    color: 'white',
                    flexDirection: 'column',
                    padding: { 
                        xs: theme.spacing(2), 
                        md: `0 ${theme.spacing(5)} 0 ${theme.spacing(2.5)}` 
                    },
                    justifyContent: 'center',
                    gap: { xs: theme.spacing(3), md: theme.spacing(5) }
                }}>
                    <Typography 
                        variant="h1" 
                        sx={{ 
                            fontSize: { 
                                xs: theme.typography.h4.fontSize, 
                                sm: theme.typography.h3.fontSize, 
                                md: theme.typography.h2.fontSize 
                            } 
                        }}
                    >
                        {t.title}
                    </Typography>
                    <Typography variant='subtitle2'>
                        {t.subtitle}
                    </Typography>
                </Box>
                <Box sx={{
                    width: { xs: '100%', md: '50%' },
                    height: { xs: '300px', md: '660px' },
                    display: 'flex',
                    color: 'white',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    marginTop: { xs: theme.spacing(2), md: 0 }
                }}>
                    <img
                        src={siteKeeperHeaderImg}
                        alt="Site Keeper Header"
                        style={{ 
                            height: '100%', 
                            objectFit: 'cover', 
                            objectPosition: isMobile ? 'center' : '0px -300px' 
                        }}
                    />
                </Box>
            </Box>
        </Box>
    )
}