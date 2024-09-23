import { Box, Typography } from "@mui/material";
import logo from '../../../assets/img/logoRiwi.png'
import logoSiteKeeper from '../../../assets/img/sitekeeper-logo-image.ico'

export function Footer() {
    return (
        <Box sx={{width: '100%', height: '100px', display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderTop: '0.5px solid #E0E0E0', marginTop:'20px'}}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70px'}}>
                <img src={logo} style={{height: '100%'}} alt="logo" />
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Typography variant="subtitle2" color="gray">© 2022 Riwi. Todos los derechos reservados.</Typography>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center',gap: '10px', height: '50px'}}>
                <Typography variant="subtitle2" color="gray">Powered by</Typography>
                <img src={logoSiteKeeper} style={{height: '100%'}} alt="logo" />
            </Box>
        </Box>
    );
}