import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import MissionSection from "@/components/MissionSection";
import SynapseSection from "@/components/SynapseSection";
import ServicesSection from "@/components/ServicesSection";
import ResourcesSection from "@/components/ResourcesSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <AboutSection />
    <MissionSection />
    <SynapseSection />
    <ServicesSection />
    <ResourcesSection />
    <FaqSection />
    <Footer />
  </div>
);

export default Index;
