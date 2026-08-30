import Navbar from "@/components/Navbar";
import RotatingKeywordsBar from "@/components/RotatingKeywordsBar";
import HeroSection from "@/components/HeroSection";
import EcosystemSection from "@/components/EcosystemSection";
import AboutSection from "@/components/AboutSection";
import WhyWeExistSection from "@/components/WhyWeExistSection";
import OurJourneySection from "@/components/OurJourneySection";
import MissionSection from "@/components/MissionSection";
import TheoryOfChangeSection from "@/components/TheoryOfChangeSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import DonationSection from "@/components/DonationSection";
import FaqSection from "@/components/FaqSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <RotatingKeywordsBar />
    <HeroSection />
    <EcosystemSection />
    <AboutSection />
    <MissionSection />
    <WhyWeExistSection />
    <OurJourneySection />
    <TestimonialsSection />
    <DonationSection />
    <FaqSection />
    <TeamSection />
    <ContactSection />
    <NewsletterSection />
    <Footer />
  </div>
);

export default Index;

