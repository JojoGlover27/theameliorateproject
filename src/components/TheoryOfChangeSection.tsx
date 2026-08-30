import { motion } from "framer-motion";
import {
  Users, ShieldCheck, Search, Cpu, Handshake,
  Ear, Microscope, Lightbulb, Link2, Megaphone, LineChart,
  Heart, Lock, BookOpen, MessagesSquare, Building2,
  Sparkles, KeyRound, Compass, Scale,
} from "lucide-react";
import { AnimatedSection, fadeUp, staggerContainer } from "@/components/AnimatedSection";

const columns = [
  {
    number: "01",
    title: "What We Bring",
    tint: "tint-purple",
    heading: "text-primary",
    badge: "bg-primary text-primary-foreground",
    items: [
      { icon: Users, title: "Community insight & lived experience", text: "Deep understanding of the realities, needs and priorities of marginalised communities." },
      { icon: ShieldCheck, title: "Privacy-first thinking", text: "Confidentiality, safety and dignity embedded in everything we do." },
      { icon: Search, title: "Research & evidence", text: "Community knowledge and data translated into actionable insights." },
      { icon: Cpu, title: "Technology & innovation", text: "Human-centred digital solutions designed around real-world needs." },
      { icon: Handshake, title: "Partnerships & collective action", text: "Collaboration across communities, health, technology, research, human rights and other sectors." },
    ],
  },
  {
    number: "02",
    title: "What We Do",
    tint: "tint-pink",
    heading: "text-brand-magenta",
    badge: "bg-brand-magenta text-primary-foreground",
    items: [
      { icon: Ear, title: "Listen & understand", text: "Engage communities to identify unmet needs, barriers and priorities." },
      { icon: Microscope, title: "Research & generate evidence", text: "Investigate challenges and document community experiences." },
      { icon: Lightbulb, title: "Design & innovate", text: "Co-create practical, privacy-first solutions with communities." },
      { icon: Link2, title: "Connect & strengthen", text: "Link people to services, information, resources and opportunities while building stronger partnerships." },
      { icon: Megaphone, title: "Advocate & influence", text: "Translate evidence and community voice into advocacy and systems change." },
      { icon: LineChart, title: "Learn & improve", text: "Continuously test, monitor and adapt to ensure greater impact." },
    ],
  },
{
    number: "03",
    title: "What We Achieve",
    tint: "tint-gold",
    heading: "text-brand-gold",
    badge: "bg-brand-gold text-secondary-foreground",
    items: [
      { icon: Heart, title: "Greater access", text: "People can access health, knowledge and opportunities with fewer barriers." },
      { icon: Lock, title: "Greater privacy & safety", text: "People can seek services and participate digitally without unnecessary exposure or risk." },
      { icon: BookOpen, title: "Better-informed communities", text: "People have access to clear, credible and usable information." },
      { icon: MessagesSquare, title: "Stronger community voice", text: "Lived experience and community evidence influence programmes, policies and decisions." },
      { icon: Building2, title: "More responsive systems", text: "Health, digital and social systems become more inclusive, accountable and responsive." },
    ],
  },
  {
    number: "04",
    title: "The Change We See",
    tint: "tint-teal",
    heading: "text-brand-teal",
    badge: "bg-brand-teal text-primary-foreground",
    items: [
      { icon: Sparkles, title: "Healthier, safer, more informed lives", text: "People who have historically faced exclusion or greater risk can live healthier, safer and more informed lives." },
      { icon: KeyRound, title: "Privacy, dignity and agency", text: "People can seek services and participate digitally without unnecessary exposure or risk." },
      { icon: Compass, title: "Confident access to services & information", text: "People can access services and navigate information with confidence and fewer barriers." },
      { icon: Scale, title: "Shaping the systems that affect them", text: "Community voice and lived experience influence programmes, policies and decisions." },
    ],
  },
];

const TheoryOfChangeSection = () => (
  <section className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-4 md:px-8 max-w-7xl">
      <AnimatedSection className="text-center mb-4">
        <h2 className="text-3xl md:text-4xl text-foreground inline-block relative pb-3">
          Our Theory of Change
          <span aria-hidden className="absolute left-1/2 -translate-x-1/2 -bottom-0 h-1 w-40 rounded-full bg-brand-gold" />
        </h2>
      </AnimatedSection>
      <AnimatedSection className="text-center mb-10">
        <h3 className="text-2xl md:text-3xl text-foreground mb-4">How We Create Change</h3>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
          We believe lasting change happens when communities are listened to, protected and equipped to shape the systems that affect their lives.
        </p>
      </AnimatedSection>

      <motion.div
        className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        {columns.map((col) => (
          <motion.div
            key={col.number}
            variants={fadeUp}
            className={`bg-card ${col.tint} rounded-xl border border-border shadow-sm overflow-hidden flex flex-col`}
          >
            <div className={`${col.badge} px-5 py-3 flex items-center gap-3`}>
              <span className="text-xl font-bold font-sans">{col.number}</span>
              <span className="font-semibold font-sans uppercase tracking-wide text-sm">{col.title}</span>
            </div>
            <ul className="p-5 space-y-4">
              {col.items.map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <span className={`shrink-0 mt-0.5 grid place-items-center h-9 w-9 rounded-full border border-border bg-background ${col.heading}`}>
                    <item.icon size={18} strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="font-semibold text-card-foreground text-sm leading-snug">{item.title}</p>
                    <p className="text-muted-foreground text-sm mt-1 leading-relaxed">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
))}
      </motion.div>
    </div>
  </section>
);

export default TheoryOfChangeSection;
