import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import ecosystemImage from "@/assets/ecosystem-ring.png.asset.json";

const HeroSection = () => (
  <section
    className="relative pt-32 md:pt-40 pb-14 md:pb-20 overflow-hidden bg-[#070b1c]"
    style={{
      backgroundImage:
        "radial-gradient(circle at 15% 15%, hsl(262 70% 25% / 0.7), transparent 55%), radial-gradient(circle at 85% 80%, hsl(190 80% 25% / 0.55), transparent 55%)",
    }}
  >
    <div className="container mx-auto px-4 md:px-8">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="font-sans font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6 text-white">
            Privacy-First Innovation
            <br />
            for <span className="text-[#F5A524]">Health,</span>{" "}
            <span className="text-[#EC4899]">Rights</span> &amp;
            <br />
            <span className="text-[#3B82F6]">Digital Safety</span>
          </h1>
          <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-5">
            The Ameliorate Project builds privacy-first innovations that expand access to healthcare,
            trusted knowledge, digital rights and cybersecurity, grounded in the realities, lived
            experiences and evolving needs of LGBTQI+ communities, key populations and other
            marginalized populations in Ghana.
          </p>
          <p className="text-[#F5A524] font-semibold mb-8">Better, Without Barriers.</p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="rounded-md text-base px-6" asChild>
              <Link to="/synapse">Explore Synapse</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-md text-base px-6 bg-transparent text-white border-white/40 hover:bg-white/10 hover:text-white"
              asChild
            >
              <a href="https://orenta-ai-prototype.lovable.app" target="_blank" rel="noopener noreferrer">
                Meet Orenta
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-md text-base px-6 bg-transparent text-white border-white/40 hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link to="/digihub">Visit DigiHub</Link>
            </Button>
          </div>
        </motion.div>
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <img
            src={ecosystemImage.url}
            alt="The Ameliorate Project innovation ecosystem: Synapse, Orenta and DigiHub connected around the Ameliorate Project logo"
            width={1254}
            height={1121}
            loading="eager"
            decoding="async"
            {...({ fetchpriority: "high" } as Record<string, string>)}
            className="w-full max-w-xl object-contain"
          />
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
