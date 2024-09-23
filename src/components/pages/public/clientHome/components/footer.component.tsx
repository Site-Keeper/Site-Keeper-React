import React from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import siteKeeperLogo from '../../../../../assets/img/sitekeeper-logo-image.ico';
import { useNavigate } from 'react-router-dom';

interface Translations {
  companyName: string;
  copyright: string;
  ctaButton: string;
}

interface LanguageTranslations {
  en: Translations;
  es: Translations;
}

const translations: LanguageTranslations = {
  en: {
    companyName: "SiteKeeper",
    copyright: "© 2024 SiteKeeper. All Rights Reserved.",
    ctaButton: "Try Demo",
  },
  es: {
    companyName: "SiteKeeper",
    copyright: "© 2024 SiteKeeper. Todos los derechos reservados.",
    ctaButton: "Probar Demo",
  },
};

type Language = 'en' | 'es';

interface IProp {
  language: Language;
}

const Footer: React.FC<IProp> = ({ language }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const t = translations[language];

  return (
    <Box
      sx={{
        height: { xs: 'auto', sm: '100px' },
        width: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: theme.spacing(2),
        gap: { xs: theme.spacing(2), sm: 0 }
      }}
    >
      <Box
        sx={{
          height: { xs: 'auto', sm: '100%' },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: theme.spacing(2)
        }}
      >
        <Box height={'50px'}>
          <img src={siteKeeperLogo} style={{ height: '100%' }} alt="SiteKeeper Logo" />
        </Box>
        <Typography
          variant="subtitle1"
          color="gray"
          sx={{
            fontSize: { xs: theme.typography.subtitle2.fontSize, sm: theme.typography.subtitle1.fontSize }
          }}
        >
          {t.companyName}
        </Typography>
      </Box>
      <Typography
        variant="body2"
        color="gray"
        sx={{
          textAlign: 'center',
          fontSize: { xs: theme.typography.caption.fontSize, sm: theme.typography.body2.fontSize }
        }}
      >
        {t.copyright}
      </Typography>
      <Box
        sx={{
          height: { xs: 'auto', sm: '100%' },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Button
          color="warning"
          variant="contained"
          onClick={() => navigate('/')}
          sx={{
            borderRadius: '33px',
            height: '34px',
            minWidth: { xs: '100%', sm: '121px' },
            border: '1px solid black',
            fontSize: { xs: theme.typography.caption.fontSize, sm: theme.typography.button.fontSize }
          }}
        >
          {t.ctaButton}
        </Button>
      </Box>
    </Box>
  );
};

export default Footer;
