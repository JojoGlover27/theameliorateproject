import { useEffect } from "react";
import { Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterForm from "@/components/NewsletterForm";
import { AnimatedSection } from "@/components/AnimatedSection";

const bullets = [
  "Monthly community health insights and blog posts",
  "Research and publication updates",
  "Synapse development milestones",
  "Advocacy news and sector updates",
  "Partnership and funding announcements",
];

const Newsletter = () => {
  useEffect(() => {
    document.title = "Subscribe to Our Newsletter — The Ameliorate Project";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <AnimatedSection>
            <p className="text-xs uppercase tracking-[0.25em] mb-3 font-semibold" style={{ color: "#F0A028" }}>
              Newsletter
            </p>
            <h1 className="text-4xl md:text-5xl font-serif mb-5 leading-tight" style={{ color: "#3C14A0" }}>
              Subscribe to Our Newsletter
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              The Ameliorate Project publishes monthly updates on HIV access, LGBTQI+ health rights, digital health innovation, and the development of Synapse. Our newsletter brings our latest research, blog posts, advocacy updates, and partnership news directly to your inbox. Join our growing community of readers across Ghana and beyond.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 mb-10">
              <h2 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: "#3C14A0" }}>What you will receive</h2>
              <ul className="space-y-3">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <Check size={20} style={{ color: "#F0A028" }} className="mt-0.5 shrink-0" aria-hidden="true" />
                    <span className="text-muted-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="rounded-2xl p-6 md:p-8" style={{ background: "#3C14A0" }}>
              <h2 className="text-2xl font-serif text-white mb-4">Join the list</h2>
              <NewsletterForm source="newsletter-page" variant="inline" buttonLabel="Subscribe Now" />
              <p className="mt-4 text-xs text-white/70">
                We respect your privacy. Your email address is never shared with third parties. You can unsubscribe at any time by clicking the unsubscribe link in any email we send.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Newsletter;
