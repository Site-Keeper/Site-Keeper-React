import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar.component";
import { SideBarAdmin } from "./components/sideBarAdmin.component";
import { Box } from "@mui/material";

export default function AdminLayout() {
  return (
    <>
     <Navbar/>
     <hr style={{ color: '#E5E7EB', margin: "0"}}></hr>
     <Box sx={{display: "flex"}}>
      <SideBarAdmin/>
      <Outlet/>
     </Box>
    </>
  )
}
