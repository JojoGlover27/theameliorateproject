import { Heart, Shield, Phone, Mail } from "lucide-react";
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
      "Many HIV-positive LGBTQI+ individuals in rural Ghana lack smartphones, internet access, or the financial means to afford treatment. The Synapse Access Fund directly subsidises care for these community members — covering medication delivery, data costs, and device access so they can connect to Synapse and receive life-saving ART, PrEP, PEP, and counselling services. Your gift removes the barriers between our most vulnerable community members and the care they deserve.",
  },
];

const DonationSection = () => (
  <section id="donate" className="py-16 md:py-24 bg-secondary">
    <div className="container mx-auto px-4 md:px-8 max-w-4xl">
      <h2 className="text-3xl md:text-4xl text-secondary-foreground mb-4 text-center">
        Support The Ameliorate Project
      </h2>
      <p className="text-center text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
        Every donation fuels anonymous, stigma-free HIV care for LGBTQI+ communities in Ghana. Choose a fund to support:
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {funds.map((f) => (
          <Card key={f.title} className="border-border shadow-sm">
            <CardHeader className="flex flex-row items-start gap-3 pb-2">
              <f.icon className="w-7 h-7 text-primary shrink-0 mt-1" />
              <CardTitle className="text-lg md:text-xl leading-snug">{f.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border p-6 md:p-8 max-w-lg mx-auto text-center shadow-sm">
        <h3 className="font-sans text-sm uppercase tracking-wider font-semibold text-secondary-foreground mb-4">
          How to Donate
        </h3>
        <div className="space-y-3 text-sm text-card-foreground">
          <div className="flex items-center justify-center gap-2">
            <Phone className="w-4 h-4 text-primary" />
            <span>
              <strong>Mobile Money:</strong> +233 246888486
            </span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            <span>
              <strong>Bank Transfer:</strong>{" "}
              <a href="mailto:finance@ameliorateproject.org" className="text-primary hover:underline">
                finance@ameliorateproject.org
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default DonationSection;
