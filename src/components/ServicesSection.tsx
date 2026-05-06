import { motion } from "framer-motion";
import { AnimatedSection, fadeUp, staggerContainer } from "@/components/AnimatedSection";
import serviceTelemedicine from "@/assets/service-telemedicine.jpg";
import serviceTesting from "@/assets/service-testing.jpg";
import serviceMedications from "@/assets/service-medications.jpg";
import serviceDelivery from "@/assets/service-delivery.jpg";
import serviceCondoms from "@/assets/service-condoms.jpg";
import serviceNutrition from "@/assets/service-nutrition.jpg";

const services = [
  { image: serviceTelemedicine, title: "Telemedicine Consultations", desc: "Connect anonymously with affirming doctors and nurses via voice call or text chat, all end-to-end encrypted." },
  { image: serviceTesting, title: "Self-Testing Kits", desc: "Order discreet home test kits for HIV, Hepatitis B, and full STI panels. Results uploaded securely and privately." },
  { image: serviceMedications, title: "PrEP, PEP & ART Access", desc: "Start or continue PrEP/PEP safely with virtual initiation, follow-up, reminders, adherence support, and refills." },
  { image: serviceDelivery, title: "Discreet Delivery", desc: "Home or safe-point delivery of medications via anonymous third-party couriers. Plain, tamper-evident packaging." },
  { image: serviceCondoms, title: "Condoms & Lubricants", desc: "Discreet delivery of condoms, lubricants, and other prevention supplies to your chosen safe location." },
  { image: serviceNutrition, title: "Nutrition & Wellness Support", desc: "Targeted nutritional packages, fortified supplements and high-protein foods to support adherence and viral suppression." },
];

const ServicesSection = () => (
  <section id="services" className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-4 md:px-8 max-w-5xl">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl text-foreground mb-4">Our Services</h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl">
          We offer a complete, secure, and anonymous care pathway through the Synapse platform.
        </p>
      </AnimatedSection>
      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        {services.map((s) => (
          <motion.div key={s.title} variants={fadeUp} className="bg-card rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow overflow-hidden flex flex-col">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src={s.image}
                alt={s.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-5 flex-1">
              <h3 className="text-lg font-semibold text-card-foreground mb-2 font-sans">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <AnimatedSection>
        <p className="mt-10 text-center text-muted-foreground italic">
          Your identity stays hidden. Your care stays uninterrupted.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default ServicesSection;
