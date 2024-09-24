import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar.component";
import { Footer } from "./components/footer.component";
import { Box } from "@mui/material";

export default function ClientLayout() {
  return (
    <>
      <Box minHeight={'100vh'} width={'100vw'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
        <Navbar />
        <Box flexGrow={1}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </>
  );
}
