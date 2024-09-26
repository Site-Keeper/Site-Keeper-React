import { Box, CircularProgress, Typography } from '@mui/material';

interface TransparentLoaderProps {
  isLoading: boolean;
}

export const Loader = ({ isLoading }: TransparentLoaderProps) => {
  if (!isLoading) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent background
        zIndex: 9999, // Ensure it's on top of other elements
      }}
    >
      <CircularProgress 
        size={60} 
        thickness={4} 
        sx={{ 
          color: 'primary.main',
          marginBottom: 2,
        }} 
      />
      <Typography 
        variant="h6" 
        sx={{ 
          color: 'primary.main',
          fontWeight: 'bold',
        }}
      >
        Cargando...
      </Typography>
    </Box>
  );
};