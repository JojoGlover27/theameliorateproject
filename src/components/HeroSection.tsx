import heroImage from "@/assets/hero-image.jpg";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 overflow-hidden" style={{ background: "var(--hero-gradient)" }}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground mb-6">
              Safe, Anonymous Access to HIV Care — Right Where You Are
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              The Ameliorate Project empowers hidden LGBTQI+ communities in Ghana with confidential telemedicine for PrEP, PEP, ART, and support. No judgment. No exposure. Just care.
            </p>
            <Button variant="default" size="lg" className="rounded-md text-base px-8">
              Learn More
            </Button>
          </div>
          <div className="flex justify-center">
            <img
              src={heroImage}
              alt="Diverse hands holding a padlock symbolizing privacy and care"
              width={1280}
              height={960}
              className="w-full max-w-lg rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
