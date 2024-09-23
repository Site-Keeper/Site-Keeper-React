import { useState } from "react";
import { SiteKeeperTheme } from "../../../../state/context/theme";
import AboutSection from "./components/about-us.component";
import FAQSection from "./components/faq.component";
import Footer from "./components/footer.component";
import Header from "./components/header.component";
import ServicesSection from "./components/services-section.component";

export default function ClientHome() {
  const [language, setLanguage] = useState<'en' | 'es'>('es');

  return (
    <SiteKeeperTheme>
      <Header language={language} setLanguage={setLanguage}/>
      <ServicesSection language={language}/>
      <AboutSection language={language}/>
      <FAQSection language={language}/>
      <Footer language={language}/>
    </SiteKeeperTheme>
  )
}
