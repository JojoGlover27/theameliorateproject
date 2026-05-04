import Navbar from "@/components/Navbar";
import RotatingKeywordsBar from "@/components/RotatingKeywordsBar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhyWeExistSection from "@/components/WhyWeExistSection";
import MissionSection from "@/components/MissionSection";
import SynapseSection from "@/components/SynapseSection";
import ServicesSection from "@/components/ServicesSection";
import CTASection from "@/components/CTASection";
import DonationSection from "@/components/DonationSection";
import ResourcesSection from "@/components/ResourcesSection";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <RotatingKeywordsBar />
    <HeroSection />
    <AboutSection />
    <WhyWeExistSection />
    <MissionSection />
    <SynapseSection />
    <ServicesSection />
    <CTASection />
    <DonationSection />
    <ResourcesSection />
    <FaqSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
