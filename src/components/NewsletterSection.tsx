import NewsletterForm from "@/components/NewsletterForm";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

const NewsletterSection = () => (
  <section id="newsletter" className="py-20 md:py-24" style={{ background: "#3C14A0" }}>
    <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
      <AnimatedSection>
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-5" style={{ background: "rgba(240,160,40,0.15)" }}>
          <Mail size={26} style={{ color: "#F0A028" }} aria-hidden="true" />
        </div>
        <p className="text-xs uppercase tracking-[0.25em] mb-3 font-semibold" style={{ color: "#F0A028" }}>
          Newsletter
        </p>
        <h2 className="text-3xl md:text-5xl font-serif mb-4 text-white leading-tight">
          Stay Connected
        </h2>
        <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
          Monthly updates on HIV access, digital health, LGBTQI+ rights, and the development of Synapse, delivered directly to your inbox.
        </p>
        <div className="max-w-md mx-auto">
          <NewsletterForm source="homepage" variant="inline" />
          <p className="mt-3 text-sm">
            <Link to="/newsletter" className="text-[#F0A028] hover:text-white underline underline-offset-4 transition-colors">
              Learn more about our newsletter →
            </Link>
          </p>
        </div>
        <p className="mt-5 text-xs text-white/60">
          We respect your privacy. Your information is never shared. Unsubscribe at any time.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default NewsletterSection;
