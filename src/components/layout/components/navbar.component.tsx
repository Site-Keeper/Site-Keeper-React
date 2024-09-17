import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect } from 'react';
import { LoginModal } from './login.component';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthentication = () => {
    // Verificar si hay token y user en sessionStorage
    const token = sessionStorage.getItem('token');
    const user = sessionStorage.getItem('user');

    setIsAuthenticated(!!token && !!user);
  };

  const handleCloseModal = () => {
    setOpen(false);
    checkAuthentication(); // Verificar autenticación cuando se cierra el modal
  };

  const handleLogout = () => {
    // Eliminar token y user del sessionStorage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setIsAuthenticated(false); // Actualizar estado
  };

  useEffect(() => {
    // Verificar autenticación al montar el componente
    checkAuthentication();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mi Navbar
          </Typography>
          {isAuthenticated ? (
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          ) : (
            <Button onClick={() => setOpen(true)} color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <LoginModal showLoginModal={open} handleCloseModal={handleCloseModal} />
    </Box>
  );
};

export default Navbar;
