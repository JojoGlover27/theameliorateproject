import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  PlayCircle,
  Download,
  GraduationCap,
  Activity,
  Lock,
  Smartphone,
  Eye,
  Users,
  AlertTriangle,
  TrendingUp,
  FileText,
  CheckCircle2,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterForm from "@/components/NewsletterForm";
import { AnimatedSection, fadeUp, staggerContainer } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import digihubLogo from "@/assets/digihub-logo.png.asset.json";

const courses = [
  {
    icon: Lock,
    level: "Beginner",
    title: "Digital Safety Foundations",
    lessons: 8,
    minutes: 55,
    blurb:
      "Passwords, passphrases, two-factor authentication and account recovery, explained without jargon.",
  },
  {
    icon: Smartphone,
    level: "Beginner",
    title: "Safer Phones, Safer Lives",
    lessons: 6,
    minutes: 40,
    blurb:
      "Lock screens, app permissions, backups, encrypted messaging and what to do if a device is seized or lost.",
  },
  {
    icon: Eye,
    level: "Intermediate",
    title: "Privacy & Surveillance Awareness",
    lessons: 7,
    minutes: 62,
    blurb:
      "How data trails form, how profiling works, and practical ways to reduce your visible footprint online.",
  },
  {
    icon: AlertTriangle,
    level: "Intermediate",
    title: "Blackmail, Catfishing & Online Entrapment",
    lessons: 9,
    minutes: 74,
    blurb:
      "Recognising entrapment patterns targeting LGBTQI+ people, safe dating practices and evidence preservation.",
  },
  {
    icon: ShieldCheck,
    level: "Advanced",
    title: "Incident Response & Digital Action Plans",
    lessons: 10,
    minutes: 90,
    blurb:
      "Build a personal Digital Action Plan: threat modelling, escalation paths, trusted contacts and recovery steps.",
  },
  {
    icon: Users,
    level: "Advanced",
    title: "Community Digital Rights Advocacy",
    lessons: 6,
    minutes: 58,
    blurb:
      "Ghanaian and regional digital rights law, documenting violations, and advocating safely as a community.",
  },
];

const videos = [
  { title: "Set up a strong passphrase in 3 minutes", duration: "3:12", topic: "Accounts" },
  { title: "Turning on two-factor authentication", duration: "4:40", topic: "Accounts" },
  { title: "Locking down your phone before you travel", duration: "6:05", topic: "Devices" },
  { title: "Spotting a catfish profile", duration: "7:22", topic: "Threats" },
  { title: "Encrypted messaging, step by step", duration: "5:18", topic: "Messaging" },
  { title: "What to do in the first hour after a breach", duration: "8:47", topic: "Response" },
];

const resources = [
  { title: "Digital Action Plan Template", format: "PDF", size: "420 KB" },
  { title: "Personal Threat Model Worksheet", format: "PDF", size: "310 KB" },
  { title: "Safer Dating & Meet-Up Checklist", format: "PDF", size: "275 KB" },
  { title: "Device Seizure Response Card", format: "PDF", size: "180 KB" },
  { title: "Secure Tools We Recommend", format: "PDF", size: "512 KB" },
  { title: "Community Facilitator Guide", format: "PDF", size: "1.1 MB" },
];

const clinics = [
  {
    title: "Module 1 — Intake & Safety Triage",
    body:
      "A short, anonymous intake that identifies whether someone faces an active threat, an ongoing risk or a learning need. No names required, only a generated participant code.",
  },
  {
    title: "Module 2 — Threat Modelling With the Participant",
    body:
      "Facilitators map what the participant wants to protect, who they are protecting it from, and what happens if protection fails. Output is a written, plain-language risk picture.",
  },
  {
    title: "Module 3 — Device & Account Hardening Clinic",
    body:
      "Hands-on session: screen locks, encrypted backups, passphrase managers, two-factor authentication, app permission clean-up and social media privacy review.",
  },
  {
    title: "Module 4 — Blackmail & Entrapment Response",
    body:
      "Recognising entrapment scripts, safe evidence capture, when and how to disengage, safe reporting routes, and connecting to legal and psychosocial support.",
  },
  {
    title: "Module 5 — Digital Action Plan",
    body:
      "Every participant leaves with a personal Digital Action Plan: their trusted contacts, escalation steps, backup locations and a review date.",
  },
  {
    title: "Module 6 — Follow-Up & Community Referral",
    body:
      "Optional anonymous follow-up after 30 days, plus referral into Synapse for health needs and into peer support networks for continued care.",
  },
];

const signals = [
  { label: "Active threat advisories", value: "7", trend: "+2 this week", tone: "text-brand-magenta" },
  { label: "Clinics delivered this quarter", value: "24", trend: "612 participants", tone: "text-primary" },
  { label: "Digital Action Plans issued", value: "489", trend: "+63 this month", tone: "text-brand-blue" },
  { label: "Reported incidents resolved", value: "82%", trend: "within 72 hours", tone: "text-accent" },
];

const advisories = [
  {
    severity: "High",
    title: "Fake dating profiles harvesting photos in Kumasi and Accra",
    detail:
      "Accounts request explicit images within the first conversation, then threaten exposure. Do not share identifiable images; capture screenshots and report through the clinic intake.",
  },
  {
    severity: "High",
    title: "SIM-swap attempts targeting community organisers",
    detail:
      "Set a SIM PIN with your mobile operator and move account recovery away from SMS to an authenticator app.",
  },
  {
    severity: "Medium",
    title: "Malicious 'health support' APK circulating on WhatsApp",
    detail:
      "The file requests contacts, storage and SMS permissions. Install apps only from official stores or verified Amelio links.",
  },
  {
    severity: "Medium",
    title: "Phishing emails impersonating donor organisations",
    detail:
      "Check sender domains carefully and never enter passwords from a link in an unexpected message.",
  },
];

const severityTone: Record<string, string> = {
  High: "bg-destructive/10 text-destructive border-destructive/30",
  Medium: "bg-accent/10 text-accent border-accent/30",
  Low: "bg-primary/10 text-primary border-primary/30",
};

const DigiHub = () => {
  const [filter, setFilter] = useState("All");
  const topics = ["All", ...Array.from(new Set(videos.map((v) => v.topic)))];
  const shown = filter === "All" ? videos : videos.filter((v) => v.topic === filter);

  useEffect(() => {
    document.title = "DigiHub Academy — Digital Rights & Cybersecurity | The Ameliorate Project";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section
        className="relative pt-32 md:pt-40 pb-14 md:pb-20 bg-[#070b1c]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, hsl(218 80% 30% / 0.65), transparent 55%), radial-gradient(circle at 80% 70%, hsl(262 70% 30% / 0.6), transparent 55%)",
        }}
      >
        <div className="container mx-auto px-4 md:px-8 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <img
              src={digihubLogo.url}
              alt="DigiHub logo"
              className="h-20 w-20 object-contain mx-auto mb-6"
              loading="eager"
            />
            <h1 className="font-sans font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-white mb-5">
              DigiHub <span className="text-[#3B82F6]">Academy</span>
            </h1>
            <p className="text-[#F5A524] font-semibold mb-5">Learn. Protect. Thrive.</p>
            <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto mb-8">
              A privacy-first digital rights and cybersecurity learning platform. Free courses, a video
              library, practical downloads, Digital Rights &amp; Safety Clinics and live threat awareness,
              built for individuals and communities who cannot afford to be exposed online.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button size="lg" className="rounded-md px-6" asChild>
                <a href="#courses">Start learning</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-md px-6 bg-transparent text-white border-white/40 hover:bg-white/10 hover:text-white"
                asChild
              >
                <a href="#clinics">Book a safety clinic</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-3">
              <GraduationCap className="text-primary" size={26} />
              <h2 className="text-3xl md:text-4xl text-foreground">Courses</h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-3xl mb-10">
              Self-paced learning tracks written in plain language, with no account, no tracking and no
              personal details required. Work through them alone or with a facilitator.
            </p>
          </AnimatedSection>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {courses.map((c) => (
              <motion.div
                key={c.title}
                variants={fadeUp}
                className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <c.icon className="text-primary" size={24} />
                  <Badge variant="secondary">{c.level}</Badge>
                </div>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{c.blurb}</p>
                <div className="mt-5 text-xs text-muted-foreground flex items-center gap-4">
                  <span>{c.lessons} lessons</span>
                  <span>{c.minutes} min</span>
                </div>
                <Progress value={0} className="mt-3 h-1.5" />
                <Button variant="outline" className="mt-5 rounded-md" asChild>
                  <a href="#newsletter">Join the next cohort</a>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video library */}
      <section id="videos" className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-3">
              <PlayCircle className="text-primary" size={26} />
              <h2 className="text-3xl md:text-4xl text-secondary-foreground">Video Library</h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-3xl mb-8">
              Short, practical walkthroughs you can follow on a low-end phone, with low-data versions
              available on request.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {topics.map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    filter === t
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-muted-foreground border-border hover:text-primary"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </AnimatedSection>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {shown.map((v) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 via-brand-blue/15 to-accent/20 grid place-items-center">
                  <PlayCircle className="text-primary" size={44} />
                </div>
                <div className="p-5">
                  <Badge variant="secondary" className="mb-2">{v.topic}</Badge>
                  <h3 className="font-semibold text-card-foreground leading-snug">{v.title}</h3>
                  <p className="text-xs text-muted-foreground mt-2">{v.duration}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Downloads */}
      <section id="downloads" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-3">
              <Download className="text-primary" size={26} />
              <h2 className="text-3xl md:text-4xl text-foreground">Downloads &amp; Toolkits</h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-3xl mb-10">
              Printable, offline-friendly resources you can use in a clinic, a workshop or on your own.
            </p>
          </AnimatedSection>

          <motion.div
            className="grid sm:grid-cols-2 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {resources.map((r) => (
              <motion.div
                key={r.title}
                variants={fadeUp}
                className="flex items-center gap-4 bg-card border border-border rounded-xl p-5 shadow-sm"
              >
                <FileText className="text-primary shrink-0" size={22} />
                <div className="flex-1">
                  <p className="font-medium text-card-foreground">{r.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {r.format} · {r.size}
                  </p>
                </div>
                <Button size="sm" variant="outline" className="rounded-md" asChild>
                  <a href="#newsletter">Request</a>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Clinics */}
      <section id="clinics" className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="text-primary" size={26} />
              <h2 className="text-3xl md:text-4xl text-secondary-foreground">
                Digital Rights &amp; Safety Clinics
              </h2>
            </div>
            <p className="text-muted-foreground text-lg mb-10">
              Facilitated, anonymous sessions delivered in person and remotely. Six modules take a
              participant from triage to a personal Digital Action Plan.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <Accordion type="single" collapsible className="w-full">
              {clinics.map((m) => (
                <AccordionItem key={m.title} value={m.title}>
                  <AccordionTrigger className="text-left">{m.title}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {m.body}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button className="rounded-md" asChild>
                <a href="/#contact">Request a clinic anonymously</a>
              </Button>
              <Button variant="outline" className="rounded-md" asChild>
                <a href="#newsletter">Get clinic dates by email</a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Intelligence dashboard */}
      <section id="intelligence" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-3">
              <Activity className="text-primary" size={26} />
              <h2 className="text-3xl md:text-4xl text-foreground">Threat Intelligence Dashboard</h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-3xl mb-10">
              A community-sourced picture of the digital threats currently affecting LGBTQI+ people, key
              populations and other marginalized populations in Ghana. Reports are aggregated and never
              attributed to an individual.
            </p>
          </AnimatedSection>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {signals.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className="bg-card border border-border rounded-2xl p-6 shadow-sm"
              >
                <p className={`text-3xl md:text-4xl font-bold ${s.tone}`}>{s.value}</p>
                <p className="text-sm text-card-foreground mt-2">{s.label}</p>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <TrendingUp size={12} /> {s.trend}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <AnimatedSection>
            <div className="bg-card border border-border rounded-2xl divide-y divide-border shadow-sm">
              {advisories.map((a) => (
                <div key={a.title} className="p-6 flex gap-4 items-start">
                  <span
                    className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full border ${severityTone[a.severity]}`}
                  >
                    {a.severity}
                  </span>
                  <div>
                    <p className="font-medium text-card-foreground">{a.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1">{a.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Advisories are reviewed weekly. To report an incident anonymously, use the contact form,
              no name or email is required.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Double opt-in newsletter */}
      <section id="newsletter" className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-8 max-w-2xl text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl text-secondary-foreground mb-4">
              The DigiHub Safety Briefing
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              New courses, clinic dates, toolkits and current threat advisories, delivered to your inbox.
            </p>
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm text-left">
              <NewsletterForm source="digihub" buttonLabel="Subscribe" />
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                  Double opt-in: we send a confirmation email first, and you are only added once you
                  confirm.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                  We store your email address only. No names, no profiling, no sharing with third
                  parties.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                  One-click unsubscribe in every email.
                </li>
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DigiHub;
