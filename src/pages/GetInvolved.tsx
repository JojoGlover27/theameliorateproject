import { Link } from "react-router-dom";
import { HandHeart, Handshake, Megaphone, Heart, ArrowRight, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/get-involved-hero.jpg";
import { downloads } from "@/lib/downloads";
import { useEffect } from "react";

const ways = [
  {
    icon: Heart,
    title: "Donate",
    body: "Fund the Synapse platform's development, security, and access devices for community members who need them. Every cedi goes directly to keeping people in care.",
    cta: "Support our work",
    href: "/#donate",
  },
  {
    icon: HandHeart,
    title: "Volunteer your skills",
    body: "We need affirming clinicians, developers, designers, translators, peer supporters, researchers, and community organisers. If you have a skill and a conscience, we have a use for both.",
    cta: "Reach out anonymously",
    href: "/#contact",
  },
  {
    icon: Handshake,
    title: "Partner with us",
    body: "Health institutions, NGOs, foundations, faith communities, and corporations: we partner with organisations that share our commitment to dignity, privacy, and evidence-based care.",
    cta: "Start a conversation",
    href: "/#contact",
  },
  {
    icon: Megaphone,
    title: "Spread the word",
    body: "Share our work. Quote our research. Hand someone our community brief. Visibility for the mission, not the people, is one of the most powerful things you can give us.",
    cta: "Download our brief",
    href: downloads[0].url,
    external: true,
  },
];

const GetInvolved = () => {
  useEffect(() => {
    document.title = "Get Involved — The Ameliorate Project";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 md:pt-28">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <AnimatedSection>
                <p className="text-sm uppercase tracking-widest text-primary mb-3 font-semibold">Get Involved</p>
                <h1 className="text-4xl md:text-5xl text-foreground mb-5 leading-tight">
                  There are many ways to build this with us.
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  We are building safe, anonymous HIV care for LGBTQI+ communities, key populations, and other marginalised populations in Ghana. It takes more than money. It takes skill, trust, partnerships, and people willing to put their voice behind the mission.
                </p>
              </AnimatedSection>
              <AnimatedSection>
                <img
                  src={heroImg}
                  alt="Abstract illustration evoking community and care"
                  width={1600}
                  height={900}
                  loading="lazy"
                  className="w-full rounded-xl shadow-md"
                />
              </AnimatedSection>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-secondary">
          <div className="container mx-auto px-4 md:px-8 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-5">
              {ways.map((w) => (
                <AnimatedSection key={w.title}>
                  <div className="h-full bg-card border border-border rounded-xl p-6 md:p-7 shadow-sm flex flex-col">
                    <w.icon className="text-primary mb-3" size={26} aria-hidden="true" />
                    <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">{w.title}</h2>
                    <p className="text-muted-foreground leading-relaxed flex-1">{w.body}</p>
                    <Button asChild variant="outline" className="mt-5 self-start">
                      {w.external ? (
                        <a href={w.href} target="_blank" rel="noopener noreferrer" download>
                          <Download className="mr-1" /> {w.cta}
                        </a>
                      ) : w.href.startsWith("/#") ? (
                        <a href={w.href}>{w.cta} <ArrowRight className="ml-1" /></a>
                      ) : (
                        <Link to={w.href}>{w.cta} <ArrowRight className="ml-1" /></Link>
                      )}
                    </Button>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20" style={{ background: "var(--hero-gradient)" }}>
          <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
            <AnimatedSection>
              <h2 className="text-2xl md:text-3xl text-foreground mb-4">
                Not sure where you fit? Reach out anonymously.
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Use any nickname. Tell us what you can offer or what you'd like to learn. We'll respond through a secure channel.
              </p>
              <Button asChild size="lg">
                <a href="/#contact">Get in touch</a>
              </Button>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GetInvolved;
