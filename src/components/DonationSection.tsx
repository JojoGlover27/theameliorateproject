import { Heart, Shield, Banknote, Sparkles, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection, fadeUp, staggerContainer } from "@/components/AnimatedSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const funds = [
  {
    icon: Heart,
    title: "Synapse Fund",
    description:
      "Support anonymous healthcare, telemedicine, HIV prevention, treatment and discreet care services.",
  },
  {
    icon: Sparkles,
    title: "Orenta Fund",
    description:
      "Support evidence-aware AI, trusted knowledge, research integration and responsible AI development.",
  },
  {
    icon: Shield,
    title: "DigiHub Fund",
    description:
      "Support cybersecurity education, Digital Rights & Safety Clinics, learning resources and digital inclusion.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Fund",
    description:
      "Support The Ameliorate Project's overall innovation ecosystem, helping us design, build and scale new privacy-first solutions where they are needed most.",
  },
];

const DonationSection = () => (
  <section id="donate" className="py-16 md:py-24 bg-secondary">
    <div className="container mx-auto px-4 md:px-8 max-w-4xl">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl text-secondary-foreground mb-4 text-center">Support Our Work</h2>
        <p className="text-center text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
          Every contribution helps us build and sustain privacy-first innovations that improve lives. Your support allows us to expand access to healthcare, trusted knowledge, digital rights education and safer digital participation for communities too often left behind.
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
              <p className="text-muted-foreground">Reference: Give2Amelio</p>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Banknote className="w-6 h-6 text-primary" />
              <h3 className="font-semibold text-lg text-card-foreground">Bank Transfer</h3>
            </div>
            <div className="space-y-2 text-sm text-card-foreground">
              <p><strong>Account Name:</strong> The Ameliorate Project</p>
              <p><strong>Bank:</strong> Contact Finance Department</p>
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:finance@ameliorateproject.org" className="text-primary hover:underline">
                  finance@ameliorateproject.org
                </a>
              </p>
              <p className="text-muted-foreground">Reference: Give2Amelio</p>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default DonationSection;
