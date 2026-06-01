import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";

const Media = () => (
  <div className="min-h-screen">
    <Navbar />
    <main className="pt-28 md:pt-36 pb-16 md:pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <AnimatedSection>
          <p className="text-sm uppercase tracking-widest text-primary mb-3 font-semibold">Media</p>
          <h1 className="text-3xl md:text-5xl text-foreground mb-6 leading-tight">
            Press, interviews, and public conversations.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            Selected coverage and appearances featuring The Ameliorate Project will be archived here as they become available. For press enquiries, please reach out through our anonymous contact form.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="bg-card border border-border rounded-xl p-8 text-center shadow-sm">
            <p className="text-muted-foreground italic">
              Media features and interviews are coming soon. Check back as our work and conversations continue to grow.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </main>
    <Footer />
  </div>
);

export default Media;
