import { Box } from "@mui/system";
import DynamicIcon from "../../utilities/DynamicIcon";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

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
  { icon: "PeopleAltOutlinedIcon", name: "Gestión Usuarios", pathname: "/Gestións" },
  { icon: "ClassOutlinedIcon", name: "Gestión Rutinas", pathname: "/Gestiónss" },
  { icon: "DomainOutlinedIcon", name: "Gestión Espacios", pathname: "/Gestiónsss" },
  { icon: "DescriptionOutlinedIcon", name: "Gestión Reportes", pathname: "/Gestiónsssss" },
  { icon: "GridViewIcon", name: "Gestión Objetos Perdidos", pathname: "/Gestiónssssssssss" },
];

export function SideBarAdmin() {
  const location = useLocation();

  return (
    <Box
      sx={{
        width: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "30px",
        boxShadow:
          "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
        height: "90vh",
        gap: "20px",
      }}
    >
      {pages.map((page) => {
        return (
          <Box
            key={page.pathname}
            sx={{
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
          </Box>
        );
      })}
    </Box>
  );
}
