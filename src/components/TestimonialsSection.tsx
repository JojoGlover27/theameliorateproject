import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/data/testimonials";

const AUTOPLAY_MS = 8000;

const TestimonialsSection = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const touchX = useRef<number | null>(null);
  const prefersReducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const total = testimonials.length;
  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + total) % total), [total]);
  const goTo = useCallback((i: number) => setIndex(((i % total) + total) % total), [total]);

  // autoplay
  useEffect(() => {
    if (paused || hover || prefersReducedMotion) return;
    const t = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [paused, hover, prefersReducedMotion, go]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const prev = (index - 1 + total) % total;
  const next = (index + 1) % total;

  const Card = ({ position, quote }: { position: "left" | "center" | "right"; quote: string }) => {
    const isCenter = position === "center";
    return (
      <div
        aria-hidden={!isCenter}
        className={[
          "absolute top-1/2 left-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-center transition-all duration-700 ease-out",
          "aspect-square",
          isCenter
            ? "w-[min(85vw,460px)] md:w-[460px] -translate-x-1/2 z-20 opacity-100 scale-100"
            : "w-[min(60vw,340px)] md:w-[340px] z-10 opacity-40 blur-[1px]",
          position === "left" ? "-translate-x-[125%] md:-translate-x-[135%]" : "",
          position === "right" ? "translate-x-[25%] md:translate-x-[35%]" : "",
          isCenter
            ? "bg-gradient-to-br from-primary/25 via-background/40 to-background/10 border border-[hsl(var(--primary))]/60 shadow-[0_0_60px_-10px_hsl(var(--primary)/0.6)]"
            : "bg-background/5 border border-background/10",
        ].join(" ")}
      >
        <div className={isCenter ? "px-8 md:px-12 py-8 max-w-[86%]" : "px-6 max-w-[80%]"}>
          <Quote
            className={isCenter ? "mx-auto mb-4 text-[hsl(var(--primary))]" : "mx-auto mb-3 text-background/40"}
            size={isCenter ? 36 : 24}
            aria-hidden
          />
          <p
            className={[
              "font-serif leading-snug text-background",
              isCenter ? "text-lg md:text-2xl" : "text-sm md:text-base",
            ].join(" ")}
          >
            &ldquo;{quote}&rdquo;
          </p>
        </div>
      </div>
    );
  };

  return (
    <section
      id="voices"
      aria-label="Community Voices"
      className="relative py-20 md:py-28 overflow-hidden bg-foreground"
    >
      {/* subtle brand gradient wash */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at 20% 10%, hsl(var(--primary) / 0.25), transparent 55%), radial-gradient(ellipse at 85% 90%, hsl(var(--accent) / 0.18), transparent 55%)",
        }}
      />

      <div className="relative container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="text-center mb-14 md:mb-20">
          <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-[hsl(var(--primary))] mb-4 font-semibold">
            Community Voices
          </p>
          <p className="text-base md:text-lg text-background/80 max-w-3xl mx-auto leading-relaxed">
            These anonymous voices come from participants in The Ameliorate Project&rsquo;s nationwide needs assessment. Every quote represents a lived experience that informs our research, strengthens our advocacy, and inspires our commitment to equitable healthcare access.
          </p>
        </div>

        {/* Carousel stage */}
        <div
          className="relative h-[520px] md:h-[560px] mx-auto max-w-5xl"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
            setHover(true);
          }}
          onTouchEnd={(e) => {
            if (touchX.current == null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            touchX.current = null;
            setHover(false);
          }}
          role="region"
          aria-roledescription="carousel"
          aria-label="Community testimonial carousel"
        >
          <Card key={`l-${prev}`} position="left" quote={testimonials[prev].quote} />
          <Card key={`c-${index}`} position="center" quote={testimonials[index].quote} />
          <Card key={`r-${next}`} position="right" quote={testimonials[next].quote} />
        </div>

        {/* Controls */}
        <div className="relative mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="p-3 rounded-full border border-background/20 text-background hover:bg-background/10 transition"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial pagination">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => goTo(i)}
                role="tab"
                aria-selected={i === index}
                aria-label={`Show testimonial ${i + 1}`}
                className={[
                  "h-2 rounded-full transition-all",
                  i === index ? "w-8 bg-[hsl(var(--primary))]" : "w-2 bg-background/30 hover:bg-background/50",
                ].join(" ")}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="p-3 rounded-full border border-background/20 text-background hover:bg-background/10 transition"
          >
            <ChevronRight size={20} />
          </button>

          <button
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Resume autoplay" : "Pause autoplay"}
            className="ml-2 p-3 rounded-full border border-background/20 text-background hover:bg-background/10 transition"
          >
            {paused ? <Play size={16} /> : <Pause size={16} />}
          </button>
        </div>

        {/* Footer */}
        <div className="relative mt-16 md:mt-20 text-center max-w-3xl mx-auto">
          <p className="text-background/80 text-base md:text-lg leading-relaxed">
            Every statistic represents a person. Every voice represents a lived experience.
          </p>
          <p className="text-background/60 text-sm md:text-base mt-2">
            These anonymous responses shape our research, advocacy, programmes, and digital innovations.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link to="/research/access-safety-anonymity-ghana">Read the Full Needs Assessment</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
