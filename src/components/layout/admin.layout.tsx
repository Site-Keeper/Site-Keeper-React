import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar.component";
import { SideBarAdmin } from "./components/sideBarAdmin.component";
import { Box } from "@mui/material";

export default function AdminLayout() {
  return (
    <>
     <Navbar/>
     <Box sx={{display: "flex"}}>
      <SideBarAdmin/>
      <Outlet/>
     </Box>
    </>
  )
}
