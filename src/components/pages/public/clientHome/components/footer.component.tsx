import { Box, Button, Typography } from '@mui/material';
import siteKeeperLogo from '../../../../../assets/img/sitekeeper-logo-image.ico'
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    return (
        <Box height={'100px'} width={'100%'} display={'flex'} justifyContent={'space-around'} alignItems={'center'}>
            <Box height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} gap={'15px'}>
                <Box height={'50px'}>
                    <img src={siteKeeperLogo} style={{ height: '100%' }} alt="SiteKeeper Logo" />
                </Box>
                <Typography variant="subtitle1" color="gray">SiteKeeper</Typography>
            </Box>
            <Typography variant="body2" color="gray">
                © 2023 SiteKeeper. All Rights Reserved.
            </Typography>
            <Box height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Button color="warning" variant="contained" onClick={() => navigate('/')} sx={{ borderRadius: '33px', height: '34px', minWidth: '121px', border: '1px solid black' }}>Probar Demo</Button>
            </Box>
        </Box>
    );
};

export default Footer;