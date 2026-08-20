import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Shield,
  Lock,
  GraduationCap,
  Megaphone,
  Users,
  Scale,
  BookOpen,
  Smartphone,
  PlayCircle,
  AlertTriangle,
  Newspaper,
  Download,
  ClipboardCheck,
  Sparkles,
  AppWindow,
  CalendarDays,
  Award,
  Target,
  ArrowRight,
  CheckCircle2,
  Eye,
  HeartHandshake,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterForm from "@/components/NewsletterForm";
import ThreatMap from "@/components/digihub/ThreatMap";
import AskOrenta from "@/components/digihub/AskOrenta";
import { AnimatedSection, fadeUp, staggerContainer } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import digihubLogo from "@/assets/digihub-logo.png";
import digihubShield from "@/assets/digihub-shield.png";
import { alerts, badges, challenge, news, secureApps, videos } from "@/data/digihub";
import { appLogo } from "@/pages/digihub/Apps";
import { getScore, PrivacyScoreResult } from "@/lib/digihub-store";

const journey = [
  { icon: ClipboardCheck, title: "Take Privacy Score", sub: "Know your risk level", to: "/digihub/privacy-score" },
  { icon: Sparkles, title: "Ask Orenta", sub: "Get instant answers", to: "#ask-orenta" },
  { icon: AppWindow, title: "Explore Secure Apps", sub: "Find trusted tools", to: "/digihub/apps" },
  { icon: Users, title: "Join the Clinics", sub: "Workshops & cohorts", to: "/digihub/clinics" },
  { icon: Target, title: "Create Action Plan", sub: "Personalised for you", to: "/digihub/action-plan" },
];

const capabilities = [
  { icon: Scale, title: "Digital Rights", blurb: "Understand your rights online and offline.", to: "/digihub/digital-rights", tone: "text-primary bg-primary/10" },
  { icon: ShieldCheck, title: "Cybersecurity", blurb: "Practical tools and training to stay safe online.", to: "/digihub/cybersecurity", tone: "text-brand-blue bg-brand-blue/10" },
  { icon: Lock, title: "Privacy Guides", blurb: "Step-by-step guides to protect your privacy.", to: "/digihub/privacy-guides", tone: "text-brand-magenta bg-brand-magenta/10" },
  { icon: Smartphone, title: "Secure Apps You Can Trust", blurb: "Curated list of privacy-friendly apps and tools.", to: "/digihub/apps", tone: "text-emerald-600 bg-emerald-500/10" },
  { icon: PlayCircle, title: "Video Library & Tutorials", blurb: "Learn at your own pace with short, practical videos.", to: "/digihub/videos", tone: "text-brand-gold bg-brand-gold/10" },
  { icon: Users, title: "Digital Rights & Safety Clinics", blurb: "Workshops, training and community support.", to: "/digihub/clinics", tone: "text-primary bg-primary/10" },
  { icon: AlertTriangle, title: "Scam Alerts", blurb: "Stay updated on the latest scams and threats.", to: "/digihub/alerts", tone: "text-destructive bg-destructive/10" },
  { icon: Newspaper, title: "News & Explainers", blurb: "Short updates on digital rights and privacy issues.", to: "/digihub/news", tone: "text-brand-blue bg-brand-blue/10" },
  { icon: Download, title: "Digital Safety Toolkit", blurb: "Downloads, checklists and practical templates.", to: "/digihub/toolkits", tone: "text-accent bg-accent/10" },
];

const clinicFeatures = [
  { icon: Users, label: "In-person Workshops", sub: "Accra, Kumasi and beyond" },
  { icon: PlayCircle, label: "Virtual Workshops", sub: "Join from any device" },
  { icon: ClipboardCheck, label: "Practical Exercises", sub: "Hands-on, not theory" },
  { icon: HeartHandshake, label: "Community Cohorts", sub: "Learn together over weeks" },
  { icon: Target, label: "Personal Safety Plans", sub: "Leave with your own plan" },
  { icon: Award, label: "Completion Certificates", sub: "Earn and share" },
];

const heroLabels = [
  { icon: GraduationCap, label: "Learn", pos: "top-2 left-2 md:top-4 md:left-6" },
  { icon: Shield, label: "Protect", pos: "top-2 right-2 md:top-4 md:right-6" },
  { icon: Megaphone, label: "Advocate", pos: "bottom-2 left-2 md:bottom-6 md:left-2" },
  { icon: Users, label: "Empower", pos: "bottom-2 right-2 md:bottom-6 md:right-2" },
];

const pillars = [
  { icon: Lock, label: "Privacy First" },
  { icon: Users, label: "People Centered" },
  { icon: HeartHandshake, label: "Community Driven" },
  { icon: Eye, label: "Evidence Informed" },
];

const glass =
  "rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-card to-brand-blue/5 backdrop-blur shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5";

const DigiHub = () => {
  const [score, setScore] = useState<PrivacyScoreResult | null>(null);

  useEffect(() => {
    document.title = "DigiHub — Digital Rights & Safety Centre | The Ameliorate Project";
    setScore(getScore());
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ================= HERO ================= */}
      <section
        className="relative pt-28 md:pt-36 pb-14 md:pb-20 bg-[#070b1c] overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 22%, hsl(218 85% 32% / 0.65), transparent 55%), radial-gradient(circle at 82% 65%, hsl(275 72% 34% / 0.6), transparent 55%)",
        }}
      >
        <div className="container mx-auto px-4 md:px-8 max-w-6xl grid lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <img src={digihubLogo} alt="DigiHub logo" className="h-16 w-16 object-contain mb-5" loading="eager" />
            <h1 className="font-sans font-bold tracking-tight text-5xl md:text-6xl text-white mb-3">
              Digi<span className="text-[#8B5CF6]">Hub</span>
            </h1>
            <p className="text-[#F5A524] font-semibold text-lg mb-4">Learn. Protect. Thrive.</p>
            <p className="text-slate-300 leading-relaxed max-w-xl mb-7">
              DigiHub is The Ameliorate Project's Digital Rights &amp; Safety Centre, helping LGBTQI+ communities,
              key populations and other marginalized populations build practical digital safety skills, understand
              their rights and confidently navigate today's digital world.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg">
              {pillars.map((p) => (
                <div key={p.label} className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-center">
                  <p.icon className="text-[#3B82F6] mx-auto mb-1.5" size={18} />
                  <p className="text-[11px] text-slate-300 leading-tight">{p.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Imposing security shield, rotating on its base */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative mx-auto w-full max-w-md"
            style={{ perspective: "1400px" }}
          >
            <div className="absolute inset-x-8 bottom-6 top-10 rounded-full bg-[#8B5CF6]/30 blur-3xl" />
            <motion.img
              src={digihubShield}
              alt="DigiHub security shield"
              width={1024}
              height={1280}
              loading="eager"
              decoding="async"
              animate={{ rotateY: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="relative w-full object-contain drop-shadow-[0_35px_60px_rgba(59,130,246,0.35)]"
              style={{ transformOrigin: "50% 100%", transformStyle: "preserve-3d" }}
            />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-6 w-2/3 rounded-[100%] bg-black/60 blur-xl" />
            {heroLabels.map((l, i) => (
              <motion.div
                key={l.label}
                animate={{ y: [0, i % 2 === 0 ? -8 : 8, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute ${l.pos} flex flex-col items-center gap-1`}
              >
                <span className="grid place-items-center h-11 w-11 rounded-xl border border-white/15 bg-white/10 backdrop-blur">
                  <l.icon className="text-[#F5A524]" size={20} />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-200">{l.label}</span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ============ START YOUR DIGITAL SAFETY JOURNEY ============ */}
      <section className="relative -mt-8 md:-mt-12 pb-4 z-10">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="rounded-3xl border border-border bg-card/90 backdrop-blur shadow-xl p-5 md:p-7">
            <h2 className="text-xl md:text-2xl font-semibold text-card-foreground mb-5">
              Start Your Digital Safety Journey
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {journey.map((j) => {
                const inner = (
                  <>
                    <span className="grid place-items-center h-10 w-10 rounded-xl bg-primary/10 text-primary shrink-0">
                      <j.icon size={19} />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-card-foreground">{j.title}</span>
                      <span className="block text-xs text-muted-foreground">{j.sub}</span>
                    </span>
                  </>
                );
                const cls = `flex items-center gap-3 rounded-2xl border border-border bg-secondary/50 p-4 hover:border-primary hover:bg-secondary transition-all duration-300 hover:-translate-y-0.5`;
                return j.to.startsWith("#") ? (
                  <a key={j.title} href={j.to} className={cls}>{inner}</a>
                ) : (
                  <Link key={j.title} to={j.to} className={cls}>{inner}</Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHAT YOU CAN DO + THREAT MAP ============ */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl grid lg:grid-cols-2 gap-6">
          <AnimatedSection>
            <div className="rounded-3xl border border-border bg-card p-5 md:p-7 shadow-sm h-full">
              <h2 className="text-xl md:text-2xl font-semibold text-card-foreground mb-5">
                What You Can Do in DigiHub
              </h2>
              <motion.div
                className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={staggerContainer}
              >
                {capabilities.map((c) => (
                  <motion.div key={c.title} variants={fadeUp}>
                    <Link to={c.to} className={`${glass} block p-4 h-full`}>
                      <span className={`grid place-items-center h-9 w-9 rounded-lg mb-3 ${c.tone}`}>
                        <c.icon size={17} />
                      </span>
                      <p className="text-sm font-semibold text-card-foreground leading-snug">{c.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{c.blurb}</p>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
              <Button variant="outline" className="rounded-full mt-5" asChild>
                <Link to="/digihub/toolkits">Explore all resources <ArrowRight size={15} /></Link>
              </Button>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <ThreatMap />
          </AnimatedSection>
        </div>
      </section>

      {/* ============ CLINICS + ASK ORENTA ============ */}
      <section className="pb-14 md:pb-20 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl grid lg:grid-cols-2 gap-6">
          <AnimatedSection>
            <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-brand-magenta/10 p-5 md:p-7 shadow-lg h-full">
              <h2 className="text-xl md:text-2xl font-semibold text-card-foreground">
                Digital Rights &amp; Safety Clinics
              </h2>
              <p className="text-sm text-primary font-medium mt-1 mb-4">
                Learning experiences, workshops and community cohorts.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {clinicFeatures.map((f) => (
                  <div
                    key={f.label}
                    className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-brand-blue/10 p-3 text-center"
                  >
                    <f.icon className="text-primary mx-auto mb-2" size={18} />
                    <p className="text-xs font-semibold text-card-foreground leading-tight">{f.label}</p>
                    <p className="text-[11px] text-muted-foreground mt-1">{f.sub}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-xl bg-primary/10 border border-primary/25 p-4">
                <p className="text-sm font-semibold text-foreground">Clinic Coming Soon</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Dates and locations are being finalised with community partners. Join the list and we
                  will email you the moment registration opens.
                </p>
              </div>
              <Button className="rounded-full mt-5 px-6" asChild>
                <Link to="/digihub/clinics">Join the waiting list <ArrowRight size={15} /></Link>
              </Button>
            </div>
          </AnimatedSection>


          <AnimatedSection>
            <div id="ask-orenta" className="scroll-mt-24 h-full">
              <AskOrenta />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============ APPS / VIDEOS / ALERTS / PLAN ============ */}
      <section className="pb-14 md:pb-20 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {/* Secure apps */}
          <AnimatedSection>
            <div className={`${glass} p-5 h-full`}>
              <h3 className="font-semibold text-card-foreground">Secure Apps You Can Trust</h3>
              <p className="text-xs text-muted-foreground mb-4">Curated privacy-friendly tools for daily life.</p>
              <ul className="space-y-3">
                {secureApps.slice(0, 4).map((a) => (
                  <li key={a.name} className="flex items-start gap-3">
                    <span className="grid place-items-center h-8 w-8 rounded-lg bg-primary/10 text-primary text-xs font-bold shrink-0">
                      {a.name[0]}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-card-foreground">{a.name}</span>
                      <span className="block text-[11px] text-muted-foreground">{a.category}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <Link to="/digihub/apps" className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">
                Explore all apps <ArrowRight size={13} />
              </Link>
            </div>
          </AnimatedSection>

          {/* Videos */}
          <AnimatedSection>
            <div className={`${glass} p-5 h-full`}>
              <h3 className="font-semibold text-card-foreground">Video Library &amp; Tutorials</h3>
              <p className="text-xs text-muted-foreground mb-4">Learn through short, practical videos.</p>
              <ul className="space-y-3">
                {videos.slice(0, 4).map((v) => (
                  <li key={v.id} className="flex items-center gap-3">
                    <img
                      src={`https://i.ytimg.com/vi/${v.id}/default.jpg`}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      className="h-10 w-16 rounded-md object-cover shrink-0"
                    />
                    <span className="text-xs text-card-foreground leading-snug line-clamp-2">{v.title}</span>
                  </li>
                ))}
              </ul>
              <Link to="/digihub/videos" className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">
                Browse all videos <ArrowRight size={13} />
              </Link>
            </div>
          </AnimatedSection>

          {/* Alerts */}
          <AnimatedSection>
            <div className={`${glass} p-5 h-full`}>
              <h3 className="font-semibold text-card-foreground">Scam Alerts</h3>
              <p className="text-xs text-muted-foreground mb-4">Stay informed. Stay protected.</p>
              <ul className="space-y-3">
                {alerts.slice(0, 3).map((a) => (
                  <li key={a.slug} className="flex items-start gap-2.5">
                    <AlertTriangle className="text-destructive shrink-0 mt-0.5" size={15} />
                    <span>
                      <span className="block text-xs font-medium text-card-foreground leading-snug">{a.title}</span>
                      <span className="block text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{a.summary}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <Link to="/digihub/alerts" className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">
                View all scam alerts <ArrowRight size={13} />
              </Link>
            </div>
          </AnimatedSection>

          {/* Plan */}
          <AnimatedSection>
            <div className={`${glass} p-5 h-full`}>
              <h3 className="font-semibold text-card-foreground">My Digital Safety Plan</h3>
              <p className="text-xs text-muted-foreground mb-4">Create your personalised plan in minutes.</p>
              <ul className="space-y-2 text-xs text-muted-foreground">
                {["Answer 10 quick questions", "Get your Privacy Score", "See personalised recommendations", "Download your action plan"].map((s) => (
                  <li key={s} className="flex items-start gap-2">
                    <CheckCircle2 size={13} className="text-primary mt-0.5 shrink-0" /> {s}
                  </li>
                ))}
              </ul>
              <Button className="rounded-full mt-4 w-full" asChild>
                <Link to={score ? "/digihub/action-plan" : "/digihub/privacy-score"}>
                  {score ? "Open My Plan" : "Create My Plan"}
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============ LOWER DASHBOARD ============ */}
      <section className="pb-14 md:pb-20 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl grid md:grid-cols-2 xl:grid-cols-5 gap-5">
          {/* Privacy score */}
          <AnimatedSection>
            <div className={`${glass} p-5 h-full`}>
              <h3 className="font-semibold text-card-foreground">Privacy Score</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Take the 10-question assessment and know your digital safety level.
              </p>
              <div className="text-center py-2">
                <p className="text-4xl font-bold text-primary">{score ? `${score.score}%` : "--"}</p>
                <p className="text-xs text-muted-foreground mt-1">{score ? score.band : "Not taken yet"}</p>
                <Progress value={score?.score ?? 0} className="h-2 mt-3" />
              </div>
              <Button className="rounded-full mt-4 w-full" asChild>
                <Link to="/digihub/privacy-score">{score ? "Retake assessment" : "Take Privacy Score"}</Link>
              </Button>
            </div>
          </AnimatedSection>

          {/* Challenge */}
          <AnimatedSection>
            <div className={`${glass} p-5 h-full`}>
              <h3 className="font-semibold text-card-foreground">Community Challenge</h3>
              <p className="text-xs text-muted-foreground mb-4">Monthly challenges. Real impact.</p>
              <div className="rounded-xl border border-border bg-secondary/50 p-3">
                <p className="text-[11px] text-muted-foreground">{challenge.month} Challenge</p>
                <p className="text-sm font-semibold text-card-foreground">{challenge.title}</p>
                <p className="text-[11px] text-muted-foreground mt-1">{challenge.blurb}</p>
                <Progress value={(challenge.participants / challenge.target) * 100} className="h-1.5 mt-3" />
                <p className="text-[10px] text-muted-foreground mt-1.5">
                  {challenge.participants} / {challenge.target} participants
                </p>
              </div>
              <Link to="/digihub/challenge" className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">
                Join the challenge <ArrowRight size={13} />
              </Link>
            </div>
          </AnimatedSection>

          {/* Badges */}
          <AnimatedSection>
            <div className={`${glass} p-5 h-full`}>
              <h3 className="font-semibold text-card-foreground">Digital Safety Badges</h3>
              <p className="text-xs text-muted-foreground mb-4">Learn. Practice. Earn badges.</p>
              <div className="grid grid-cols-2 gap-3">
                {badges.map((b) => (
                  <div key={b.name} className="text-center">
                    <Award className={`mx-auto ${b.tone}`} size={26} />
                    <p className="text-[11px] text-card-foreground mt-1 leading-tight">{b.name}</p>
                  </div>
                ))}
              </div>
              <Link to="/digihub/badges" className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">
                View all badges <ArrowRight size={13} />
              </Link>
            </div>
          </AnimatedSection>

          {/* Events */}
          <AnimatedSection>
            <div className={`${glass} p-5 h-full flex flex-col`}>
              <h3 className="font-semibold text-card-foreground">Events</h3>
              <p className="text-xs text-muted-foreground mb-4">Workshops, webinars and community sessions.</p>
              <div className="flex-1 rounded-xl border border-brand-gold/30 bg-brand-gold/10 p-4 text-center grid place-items-center">
                <div>
                  <CalendarDays className="text-brand-gold mx-auto mb-2" size={22} />
                  <p className="text-sm font-semibold text-card-foreground">Coming Soon</p>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    Our calendar opens with the first clinic.
                  </p>
                </div>
              </div>
              <Button variant="secondary" className="rounded-full mt-4 w-full" asChild>
                <Link to="/digihub/events">View events <ArrowRight size={13} /></Link>
              </Button>
            </div>

          </AnimatedSection>

          {/* News */}
          <AnimatedSection>
            <div className={`${glass} p-5 h-full`}>
              <h3 className="font-semibold text-card-foreground">News &amp; Explainers</h3>
              <p className="text-xs text-muted-foreground mb-4">Latest updates on digital rights and online safety.</p>
              <ul className="space-y-3">
                {news.map((n) => (
                  <li key={n.slug} className="flex items-start gap-2.5">
                    <BookOpen className="text-brand-blue shrink-0 mt-0.5" size={14} />
                    <span>
                      <span className="block text-xs font-medium text-card-foreground leading-snug">{n.title}</span>
                      <span className="block text-[11px] text-muted-foreground">{n.date}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <Link to="/digihub/news" className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">
                Read more <ArrowRight size={13} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ============ NEWSLETTER (shared, existing system) ============ */}
      <section className="py-14 md:py-20 bg-secondary">
        <div className="container mx-auto px-4 md:px-8 max-w-2xl text-center">
          <AnimatedSection>
            <Badge variant="secondary" className="mb-3">Amelio Newsletter</Badge>
            <h2 className="text-3xl md:text-4xl text-secondary-foreground mb-4">Stay ahead of the threats</h2>
            <p className="text-muted-foreground text-lg mb-6">
              New guides, clinic dates, toolkits and current scam alerts, delivered with the rest of our updates.
            </p>
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm text-left">
              <NewsletterForm source="digihub" buttonLabel="Subscribe" />
              <p className="text-xs text-muted-foreground mt-4">
                We send a confirmation email first, store your email address only, and every message carries a
                one-click unsubscribe link.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DigiHub;
