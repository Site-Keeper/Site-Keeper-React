import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";
import { LoginModal } from "./login.component";
import { Avatar, Menu, MenuItem } from "@mui/material";
import logo from '../../../assets/img/favicon-removebg-preview.png'
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const pages = [{ name: "Home", path: "/" }, { name: "Objetos Perdidos", path: "/lost-objects" }];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated, checkAuthentication } = useAuth();

  const handleCloseModal = () => {
    setOpen(false);
    checkAuthentication(); // Verificar autenticación cuando se cierra el modal
  };

  const handleLogout = () => {
    console.log('hpl;a')
    // Eliminar token y user del sessionStorage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setIsAuthenticated(false); // Actualizar estado
    handleCloseUserMenu()
  };

  useEffect(() => {
    // Verificar autenticación al montar el componente
    checkAuthentication();
  }, []);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  console.log(location.pathname)
  return (
    <Box sx={{ display: "flex", position: "static", padding: "0 50px ", justifyContent: "space-between", alignItems: 'center', width: '100%', height: '100px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <Box sx={{ height: '10vh', display: "flex", alignContent: "center" }}>
        <img src={logo} style={{ height: "90%" }} alt="RIWI" />
      </Box>
      {isAuthenticated && <Box sx={{ display: { xs: "none", md: "flex", gap: '20px' } }}>
        {pages.map((page) => (
          <Button
            key={page.name}
            color="primary"
            onClick={() => navigate(page.path)}
            sx={{
              display: "block",
              padding: '5px',
              textTransform: 'capitalize',
              borderBottom:
              location.pathname === page.path
              ? '3px solid rgb(107, 92, 255)'
              : "none"
            }}
          >
            <Typography variant="h3">{page.name}</Typography>
          </Button>
        ))}
      </Box>}
      <Box sx={{ flexGrow: 0 }}>
        {isAuthenticated ? <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, bgcolor: '#6B5CFF' }}>
          <Avatar alt="Remy Sharp" src="" />
        </IconButton> : <Button onClick={() => setOpen(true)} variant="outlined" sx={{ color: '#6B5CFF', borderColor: '#6B5CFF' }}>Login</Button>}
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}>
              <Typography sx={{ textAlign: "center" }}>
                {setting}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <LoginModal showLoginModal={open} handleCloseModal={handleCloseModal} />
    </Box>
  );
};

export default Navbar;
