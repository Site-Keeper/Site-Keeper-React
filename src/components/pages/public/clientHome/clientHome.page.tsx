import { SiteKeeperTheme } from "../../../../state/context/theme";
import AboutSection from "./components/about-us.component";
import FAQSection from "./components/faq.component";
import Footer from "./components/footer.component";
import Header from "./components/header.component";
import ServicesSection from "./components/services-section.component";

export default function ClientHome() {
  return (
    <SiteKeeperTheme>
      <Header/>
      <ServicesSection/>
      <AboutSection/>
      <FAQSection/>
      <Footer/>
    </SiteKeeperTheme>
  )
}
