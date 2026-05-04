import { Heart, Shield, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection, fadeUp, staggerContainer } from "@/components/AnimatedSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const funds = [
  {
    icon: Shield,
    title: "Synapse Development & Security Fund",
    description:
      "Synapse is the backbone of The Ameliorate Project — a secure, anonymous telemedicine platform built specifically for LGBTQI+ individuals in Ghana. Your donation to this fund supports the ongoing development of end-to-end encryption, anonymous user infrastructure, and platform maintenance. Every contribution ensures that Synapse remains a safe digital space where users can access HIV care without fear of exposure or data breaches. Help us build the technology that keeps our community safe.",
  },
  {
    icon: Heart,
    title: "Synapse Access Fund",
    description:
      "All Synapse services are completely free — but reaching them still requires a smartphone, mobile data, and reliable connectivity. Many HIV-positive LGBTQI+ individuals in rural Ghana lack these basic enablers, leaving them cut off from anonymous, life-saving care. The Synapse Access Fund bridges that gap by providing data bundles, device access, and discreet last-mile delivery logistics so every member of our community — no matter how remote — can connect to Synapse and stay engaged in care. Your gift removes the digital barriers between our most vulnerable community members and the care they deserve.",
  },
];

const DonationSection = () => (
  <section id="donate" className="py-16 md:py-24 bg-secondary">
    <div className="container mx-auto px-4 md:px-8 max-w-4xl">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl text-secondary-foreground mb-4 text-center">
          Support The Ameliorate Project
        </h2>
        <p className="text-center text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
          Every donation fuels anonymous, stigma-free HIV care for LGBTQI+ communities in Ghana. Choose a fund to support:
        </p>
      </AnimatedSection>

      <motion.div
        className="grid md:grid-cols-2 gap-6 mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {funds.map((f) => (
          <motion.div key={f.title} variants={fadeUp}>
            <Card className="border-border shadow-sm h-full">
              <CardHeader className="flex flex-row items-start gap-3 pb-2">
                <f.icon className="w-7 h-7 text-primary shrink-0 mt-1" />
                <CardTitle className="text-lg md:text-xl leading-snug">{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <AnimatedSection>
        <div className="bg-card rounded-xl border border-border p-6 md:p-8 max-w-lg mx-auto text-center shadow-sm">
          <h3 className="font-sans text-sm uppercase tracking-wider font-semibold text-secondary-foreground mb-4">
            How to Donate
          </h3>
          <div className="space-y-3 text-sm text-card-foreground">
            <div className="flex items-center justify-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              <span><strong>Mobile Money:</strong> +233 246888486</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <span>
                <strong>Bank Transfer:</strong>{" "}
                <a href="mailto:finance@ameliorateproject.org" className="text-primary hover:underline">finance@ameliorateproject.org</a>
              </span>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default DonationSection;
