import { Box } from "@mui/system";
import DynamicIcon from "../../utilities/DynamicIcon";
import { List, ListItemButton, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

interface IPages {
  icon: string;
  name: string;
  pathname: string;
}

const pages: IPages[] = [
  {
    icon: "GridViewIcon",
    name: "Admin Dashboard",
    pathname: "/admin-dashboard",
  },
  { icon: "PeopleAltOutlinedIcon", name: "Gestión Usuarios", pathname: "/admin-users" },
  { icon: "ClassOutlinedIcon", name: "Gestión Rutinas", pathname: "/admin-routines" },
  { icon: "DomainOutlinedIcon", name: "Gestión Espacios", pathname: "/admin-spaces" },
  { icon: "DescriptionOutlinedIcon", name: "Gestión Reportes", pathname: "/admin-reports" },
  { icon: "Inventory2OutlinedIcon", name: "Gestión Objetos Perdidos", pathname: "/admin-lost-objects" },
];

export function SideBarAdmin() {
  const location = useLocation();

  return (
    <Box
      sx={{
        width: "360px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "30px",
        minHeight: '89vh',
        height: "100%",
        gap: "20px",
      }}
    >
      <List sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}>
      {pages.map((page) => {
        return (
          <ListItemButton
            component={Link}
            to={`${page.pathname}`}
            key={page.pathname}
            sx={{
              padding: '0px',
              width: "280px",
              height: "40px",
              display: "flex",
              gap: "10px",
              alignItems: "center",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#E5E7EB",
              },
            }}
          >
            <DynamicIcon
              iconName={page.icon}
              sx={{
                width: "25px",
                height: "25px",
                color: "secondary.main",
                marginLeft: "10px",
              }}
            ></DynamicIcon>
            <Typography
              variant="subtitle1"
              sx={{
                textDecoration:
                  location.pathname === page.pathname ? "underline" : "",
                textDecorationColor: "rgb(107, 92, 255)",
                textDecorationThickness: "2px",
              }}
            >
              {page.name}
            </Typography>
          </ListItemButton>
        );
      })}
      </List>
    </Box>
  );
}
