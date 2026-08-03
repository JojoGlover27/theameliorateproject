import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InnovationPageHero from "@/components/InnovationPageHero";
import SupportOurWork from "@/components/SupportOurWork";
import NewsletterSection from "@/components/NewsletterSection";
import { AnimatedSection, fadeUp, staggerContainer } from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { Smartphone, Lock, EyeOff, AlertTriangle, Users, GraduationCap } from "lucide-react";
import digihubLogo from "@/assets/logo-digihub.png";

const accent = "hsl(var(--brand-blue))";

const modules = [
  {
    icon: Smartphone,
    title: "Device safety",
    body: "Locking, encrypting and cleaning your phone so a borrowed, stolen or seized device does not expose you.",
  },
  {
    icon: Lock,
    title: "Secure communication",
    body: "Choosing safer messaging apps, verifying who you are talking to and reducing what you leave behind.",
  },
  {
    icon: EyeOff,
    title: "Privacy and identity",
    body: "Managing separate identities online, tightening social media exposure and limiting what strangers can find.",
  },
  {
    icon: AlertTriangle,
    title: "Threat awareness",
    body: "Recognising blackmail, catfishing, entrapment, doxxing and phishing before they escalate into real-world harm.",
  },
  {
    icon: Users,
    title: "Digital Rights & Safety Clinics",
    body: "Community sessions where people bring real situations and leave with practical protection steps.",
  },
  {
    icon: GraduationCap,
    title: "Free learning resources",
    body: "Guides, checklists and short lessons designed for low-end devices and limited data.",
  },
];

const DigiHub = () => (
  <div className="min-h-screen">
    <Navbar />
    <InnovationPageHero
      emoji="💙"
      name="DigiHub"
      tagline="Digital safety academy"
      accent={accent}
      logo={digihubLogo}
      description="DigiHub is our cybersecurity and digital rights academy. It teaches the people most targeted online, LGBTQI+ communities, key populations and other marginalized populations, how to protect their devices, their identities and their conversations from surveillance, blackmail and exposure."
    />

    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <AnimatedSection>
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-foreground mb-4">The digital safety journey</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Digital harm is physical harm. Every module turns a common threat into a skill people can use immediately.
            </p>
          </div>
        </AnimatedSection>
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
        >
          {modules.map((m) => (
            <motion.div key={m.title} variants={fadeUp} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <m.icon className="mb-3 h-6 w-6" style={{ color: accent }} />
              <h3 className="font-semibold text-lg text-card-foreground mb-2">{m.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{m.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    <SupportOurWork />
    <NewsletterSection />
    <Footer />
  </div>
);

export default DigiHub;
