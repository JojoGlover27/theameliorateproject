import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SynapseSection from "@/components/SynapseSection";
import ServicesSection from "@/components/ServicesSection";
import CTASection from "@/components/CTASection";
import FaqSection from "@/components/FaqSection";
import DonationSection from "@/components/DonationSection";
import InnovationPageHero from "@/components/InnovationPageHero";
import synapseLogo from "@/assets/synapse-logo.png.asset.json";

const Synapse = () => (
  <div className="min-h-screen">
    <Navbar />
    <InnovationPageHero
      emoji="❤️"
      name="Synapse"
      tagline="Anonymous healthcare access"
      accent="hsl(var(--destructive))"
      logo={synapseLogo.url}
      description="Synapse is an offline-first telemedicine platform that delivers anonymous HIV prevention and care to LGBTQI+ communities, key populations and other marginalized populations across Ghana. Users can reach PrEP, PEP, ART, self-testing, mental wellness support and discreet delivery without walking into a facility and without exposing who they are."
      cta={{ label: "Open the Synapse prototype", href: "https://synapse-prototype.lovable.app/" }}
    />
    <SynapseSection />
    <ServicesSection />
    <CTASection />
    <FaqSection />
    <DonationSection />
    <Footer />
  </div>
);

export default Synapse;
