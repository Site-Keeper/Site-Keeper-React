import { Box, Typography } from "@mui/material";
import logo from '../../../assets/img/logoRiwi.png'

export function Footer() {
    return (
        <Box sx={{width: '100%', height: '140px', display: 'flex', justifyContent: 'center', alignItems: 'space-between'}}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '33%'}}>
                <img src={logo} style={{height: '100px'}} alt="logo" />
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '33%'}}>
                <Typography variant="subtitle1">© 2022 Riwi. Todos los derechos reservados.</Typography>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center',gap: '10px', width: '33%'}}>
                <Typography variant="subtitle1">Powered by</Typography>
                <img src={logo} style={{height: '100px'}} alt="logo" />
            </Box>
        </Box>
    );
}