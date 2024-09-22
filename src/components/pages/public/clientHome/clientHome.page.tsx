import { SiteKeeperTheme } from "../../../../state/context/theme";
import Header from "./components/header.component";

export default function ClientHome() {
  return (
    <SiteKeeperTheme>
      <Header/>
    </SiteKeeperTheme>
  )
}
