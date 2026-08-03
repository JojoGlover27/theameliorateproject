import Navbar from "@/components/Navbar";
import RotatingKeywordsBar from "@/components/RotatingKeywordsBar";
import HeroSection from "@/components/HeroSection";
import InnovationEcosystem from "@/components/InnovationEcosystem";
import AboutSection from "@/components/AboutSection";
import WhyWeExistSection from "@/components/WhyWeExistSection";
import MissionSection from "@/components/MissionSection";
import ImpactSection from "@/components/ImpactSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PartnersSection from "@/components/PartnersSection";
import SupportOurWork from "@/components/SupportOurWork";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <RotatingKeywordsBar />
    <HeroSection />
    <InnovationEcosystem />
    <AboutSection />
    <WhyWeExistSection />
    <MissionSection />
    <ImpactSection />
    <TestimonialsSection />
    <PartnersSection />
    <SupportOurWork />
    <TeamSection />
    <ContactSection />
    <NewsletterSection />
    <Footer />
  </div>
);

export default Index;
