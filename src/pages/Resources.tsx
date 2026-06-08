import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResourcesSection from "@/components/ResourcesSection";
import DownloadCTASection from "@/components/DownloadCTASection";

const Resources = () => {
  useEffect(() => {
    document.title = "Resources & Downloads — The Ameliorate Project";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 md:pt-28">
        <DownloadCTASection />
        <ResourcesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
