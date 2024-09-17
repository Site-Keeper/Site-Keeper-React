import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar.component";

export default function ClientLayout() {
  return (
    <>
     <Navbar/>
     <Outlet/>
    </>
  )
}
