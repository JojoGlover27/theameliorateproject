import { Lock, TestTube, Video, Pill, Activity, Truck } from "lucide-react";

const services = [
  {
    icon: Lock,
    title: "Anonymous Registration & Access",
    desc: "Create a private profile using only a unique ID — no personal information required.",
  },
  {
    icon: TestTube,
    title: "Self-Testing",
    desc: "Order discreet home test kits for HIV, Hepatitis B, and full STI panels. Results uploaded securely and privately.",
  },
  {
    icon: Video,
    title: "Telemedicine Consultations",
    desc: "Connect anonymously with affirming doctors and nurses via voice call or text chat — all end-to-end encrypted.",
  },
  {
    icon: Pill,
    title: "PrEP & PEP Access",
    desc: "Start or continue PrEP/PEP safely with virtual initiation, follow-up, and reminders.",
  },
  {
    icon: Activity,
    title: "ART & Medication Support",
    desc: "Adherence support, refill requests, issue tracking, daily reminders, and a progress dashboard.",
  },
  {
    icon: Truck,
    title: "Discreet Delivery & Nutrition Support",
    desc: "Home or safe-point delivery of medications plus basic nutritional guidance to support your health journey.",
  },
];

const ServicesSection = () => (
  <section id="services" className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-4 md:px-8 max-w-5xl">
      <h2 className="text-3xl md:text-4xl text-foreground mb-4">Our Services</h2>
      <p className="text-lg text-muted-foreground mb-10 max-w-2xl">
        We offer a complete, secure, and fully anonymous care pathway through the Synapse platform.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.title} className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
            <s.icon className="text-primary mb-4" size={28} />
            <h3 className="text-lg font-semibold text-card-foreground mb-2 font-sans">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 text-center text-muted-foreground italic">
        Your identity stays hidden. Your care stays uninterrupted.
      </p>
    </div>
  </section>
);

export default ServicesSection;
