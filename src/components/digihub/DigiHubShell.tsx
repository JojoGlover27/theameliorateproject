import { useEffect, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import digihubLogo from "@/assets/digihub-logo.png";

interface Props {
  title: string;
  eyebrow?: string;
  description: string;
  children: ReactNode;
}

const DigiHubShell = ({ title, eyebrow = "DigiHub", description, children }: Props) => {
  useEffect(() => {
    document.title = `${title} — DigiHub | The Ameliorate Project`;
  }, [title]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <section
        className="relative pt-28 md:pt-36 pb-12 md:pb-16 bg-[#070b1c]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, hsl(218 80% 32% / 0.6), transparent 55%), radial-gradient(circle at 85% 60%, hsl(275 70% 34% / 0.55), transparent 55%)",
        }}
      >
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <Link
            to="/digihub"
            className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={15} /> Back to DigiHub
          </Link>
          <div className="flex items-start gap-4">
            <img src={digihubLogo} alt="" aria-hidden className="h-12 w-12 object-contain hidden sm:block" />
            <div>
              <p className="text-[#F5A524] text-xs font-semibold uppercase tracking-[0.2em] mb-2">{eyebrow}</p>
              <h1 className="font-sans font-bold tracking-tight text-3xl md:text-5xl text-white mb-4">{title}</h1>
              <p className="text-slate-300 text-base md:text-lg max-w-3xl leading-relaxed">{description}</p>
            </div>
          </div>
        </div>
      </section>
      <main className="bg-background">{children}</main>
      <Footer />
    </div>
  );
};

export default DigiHubShell;
