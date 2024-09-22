import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar.component";
import { Footer } from "./components/footer.component";

export default function ClientLayout() {
  return (
    <>
     <Navbar/>
     <Outlet/>
     <Footer/>
    </>
  )
}
