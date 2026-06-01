import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResourcesSection from "@/components/ResourcesSection";

const Resources = () => (
  <div className="min-h-screen">
    <Navbar />
    <main className="pt-24 md:pt-28">
      <ResourcesSection />
    </main>
    <Footer />
  </div>
);

export default Resources;
