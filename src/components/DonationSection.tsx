import { Heart, Shield, Banknote } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection, fadeUp, staggerContainer } from "@/components/AnimatedSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const funds = [
  {
    icon: Shield,
    title: "Synapse Development & Security Fund",
    description:
      "Synapse is the backbone of The Ameliorate Project, a secure, anonymous telemedicine platform built specifically for LGBTQI+ individuals in Ghana. Your donation to this fund supports the ongoing development of end-to-end encryption, anonymous user infrastructure, and platform maintenance. Every contribution ensures that Synapse remains a safe digital space where users can access HIV care without fear of exposure or data breaches. Help us build the technology that keeps our community safe.",
  },
  {
    icon: Heart,
    title: "Synapse Access Fund",
    description:
      "All Synapse services are completely free, and the app is built to work offline so connectivity is never a barrier. What still stands in the way for many HIV-positive LGBTQI+ individuals in rural Ghana is access to a smartphone. The Synapse Access Fund closes that gap by providing devices to community members who need them, so every person, no matter how remote, can connect to Synapse and stay engaged in care. Your gift puts a private, life-saving tool directly into the hands of our most vulnerable community members.",
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
        <div className="max-w-2xl mx-auto space-y-5">
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Banknote className="w-6 h-6 text-primary" />
              <h3 className="font-semibold text-lg text-card-foreground">Mobile Money</h3>
            </div>
            <div className="space-y-2 text-sm text-card-foreground">
              <p><strong>MTN MoMo:</strong> +233 24 688 8486</p>
              <p><strong>Telecel Cash:</strong> +233 20 000 0000</p>
              <p className="text-muted-foreground">Reference: GiveAmelio</p>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Banknote className="w-6 h-6 text-primary" />
              <h3 className="font-semibold text-lg text-card-foreground">Bank Transfer</h3>
            </div>
            <div className="space-y-2 text-sm text-card-foreground">
              <p><strong>Account Name:</strong> The Ameliorate Project</p>
              <p><strong>Bank:</strong> Contact finance department</p>
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:finance@ameliorateproject.org" className="text-primary hover:underline">
                  finance@ameliorateproject.org
                </a>
              </p>
              <p className="text-muted-foreground">Reference: GiveAmelio</p>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default DonationSection;
