import { useEffect, useCallback, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { testimonials } from "@/data/testimonials";

const AUTOPLAY_MS = 6500;

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
};

const TestimonialsSection = () => {
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const [direction, setDirection] = useState(1);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const total = testimonials.length;

  const go = useCallback(
    (dir: 1 | -1) => {
      setDirection(dir);
      setIndex((i) => (i + dir + total) % total);
    },
    [total]
  );

  const goTo = useCallback(
    (i: number) => {
      const target = ((i % total) + total) % total;
      setDirection(target > index ? 1 : -1);
      setIndex(target);
    },
    [total, index]
  );

  // autoplay
  useEffect(() => {
    if (hover || prefersReducedMotion) return;
    const t = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [hover, prefersReducedMotion, go]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const visible = useMemo(() => {
    const range = isMobile ? 1 : 2;
    const out: { i: number; offset: number }[] = [];
    for (let offset = -range; offset <= range; offset++) {
      out.push({ i: (index + offset + total * 2) % total, offset });
    }
    return out;
  }, [index, total, isMobile]);

  const spread = isMobile ? 42 : 58;

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const swipe = info.offset.x + info.velocity.x * 0.2;
    if (swipe < -60) go(1);
    else if (swipe > 60) go(-1);
  };

  return (
    <section
      id="voices"
      aria-label="Community Voices"
      className="relative py-24 md:py-32 overflow-hidden bg-foreground"
    >
      {/* flowing gradient wash */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(ellipse at 20% 15%, hsl(var(--primary) / 0.28), transparent 60%), radial-gradient(ellipse at 80% 85%, hsl(var(--brand-magenta) / 0.20), transparent 55%), radial-gradient(ellipse at 50% 50%, hsl(var(--brand-gold) / 0.06), transparent 70%)",
        }}
      />

      {/* technical grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--background)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--background)) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* horizon scan line */}
      <div
        aria-hidden
        className="absolute left-0 right-0 top-1/2 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.45), hsl(var(--brand-magenta) / 0.35), transparent)",
        }}
      />

      <div className="relative container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="text-center mb-14 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs md:text-sm uppercase tracking-[0.3em] text-[hsl(var(--primary))] mb-4 font-semibold"
          >
            Community Voices
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg text-background/80 max-w-3xl mx-auto leading-relaxed"
          >
            These anonymous voices come from participants in The Ameliorate Project&rsquo;s nationwide needs assessment. Every quote represents a lived experience that informs our research, strengthens our advocacy, and inspires our commitment to equitable healthcare access.
          </motion.p>
        </div>

        {/* Carousel stage */}
        <div
          className="relative h-[440px] sm:h-[500px] md:h-[580px] mx-auto max-w-6xl select-none overflow-hidden px-2"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          role="region"
          aria-roledescription="carousel"
          aria-label="Community testimonial carousel"
        >
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={handleDragEnd}
          >
            <AnimatePresence initial={false} mode="popLayout">
              {visible.map(({ i, offset }) => {
                const isCenter = offset === 0;
                const abs = Math.abs(offset);
                const isEdge = abs === 2;

                return (
                  <motion.div
                    key={testimonials[i].id}
                    initial={{ opacity: 0, x: `${direction * 18}%` }}
                    animate={{
                      opacity: isEdge ? 0.18 : isCenter ? 1 : 0.45,
                      x: `${offset * spread}%`,
                      zIndex: isCenter ? 30 : 20 - abs * 5,
                      filter: isCenter ? "blur(0px)" : `blur(${abs * 1.4}px)`,
                    }}
                    exit={{ opacity: 0, x: `${-direction * 20}%` }}
                    transition={{ type: "spring", stiffness: 120, damping: 22, mass: 1.1 }}
                    className="absolute inset-0 flex items-center justify-center will-change-transform pointer-events-none"
                  >
                  <motion.div
                    animate={{ scale: isCenter ? 1 : 0.84 - abs * 0.06 }}
                    transition={{ type: "spring", stiffness: 120, damping: 22, mass: 1.1 }}
                    className={[
                      "relative rounded-full aspect-square flex items-center justify-center text-center",
                      isCenter
                        ? "w-[min(72vw,400px)] md:w-[460px]"
                        : "w-[min(44vw,260px)] md:w-[330px]",
                    ].join(" ")}
                  >

                    {/* orbiting technical rings on the active node */}
                    {isCenter && (
                      <>
                        <motion.div
                          aria-hidden
                          className="absolute -inset-4 rounded-full border border-dashed border-[hsl(var(--primary))]/35"
                          animate={prefersReducedMotion ? {} : { rotate: 360 }}
                          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                          aria-hidden
                          className="absolute -inset-10 rounded-full border border-background/10"
                          animate={prefersReducedMotion ? {} : { rotate: -360 }}
                          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        >
                          <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--brand-gold))]" />
                          <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--brand-magenta))]" />
                        </motion.div>
                        <motion.div
                          aria-hidden
                          className="absolute inset-0 rounded-full"
                          animate={{
                            boxShadow: [
                              "0 0 40px -10px hsl(var(--primary) / 0.5)",
                              "0 0 70px -5px hsl(var(--brand-magenta) / 0.45)",
                              "0 0 40px -10px hsl(var(--primary) / 0.5)",
                            ],
                          }}
                          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </>
                    )}

                    <div
                      className={[
                        "relative w-full h-full rounded-full flex items-center justify-center overflow-hidden",
                        isCenter
                          ? "bg-gradient-to-br from-primary/25 via-background/10 to-[hsl(var(--brand-magenta))]/15 border border-[hsl(var(--primary))]/50 backdrop-blur-md"
                          : "bg-gradient-to-br from-background/8 to-background/3 border border-background/15 backdrop-blur-sm",
                      ].join(" ")}
                    >
                      {/* inner shimmer sweep */}
                      <motion.div
                        aria-hidden
                        className="absolute inset-0 rounded-full opacity-30"
                        style={{
                          background:
                            "conic-gradient(from 0deg, transparent 0%, hsl(var(--primary) / 0.25) 35%, hsl(var(--brand-magenta) / 0.15) 55%, transparent 100%)",
                        }}
                        animate={prefersReducedMotion ? {} : { rotate: 360 }}
                        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                      />

                      {/* fine circuit grid inside the node */}
                      <div
                        aria-hidden
                        className="absolute inset-0 rounded-full opacity-[0.07]"
                        style={{
                          backgroundImage:
                            "linear-gradient(hsl(var(--background)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--background)) 1px, transparent 1px)",
                          backgroundSize: "22px 22px",
                        }}
                      />

                      <div
                        className={[
                          "relative z-10 flex flex-col items-center justify-center",
                          isCenter ? "px-7 md:px-14 py-8 max-w-[84%]" : "px-5 md:px-8 max-w-[80%]",
                        ].join(" ")}
                      >
                        <motion.div
                          animate={isCenter && !prefersReducedMotion ? { y: [0, -6, 0] } : {}}
                          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <Quote
                            className={isCenter ? "mx-auto mb-4 text-[hsl(var(--primary))]" : "mx-auto mb-3 text-background/30"}
                            size={isCenter ? 36 : 20}
                            aria-hidden
                          />
                        </motion.div>
                        <p
                          className={[
                            "leading-snug text-background",
                            isCenter ? "text-base sm:text-lg md:text-2xl font-medium" : "text-xs sm:text-sm md:text-base font-normal",
                          ].join(" ")}
                        >
                          &ldquo;{testimonials[i].quote}&rdquo;
                        </p>
                        {isCenter && (
                          <span className="mt-5 text-[10px] md:text-xs uppercase tracking-[0.28em] text-background/45">
                            Voice {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="relative mt-6 flex items-center justify-center gap-4 md:gap-5">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="p-3 rounded-full border border-background/20 text-background/80 hover:bg-background/10 hover:text-background transition-colors"
          >
            <ChevronLeft size={20} />
          </motion.button>

          <div className="flex items-center gap-2 flex-wrap justify-center max-w-[55vw]" role="tablist" aria-label="Testimonial pagination">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => goTo(i)}
                role="tab"
                aria-selected={i === index}
                aria-label={`Show testimonial ${i + 1}`}
                className={[
                  "h-2 rounded-full transition-all duration-300",
                  i === index ? "w-8 bg-[hsl(var(--primary))]" : "w-2 bg-background/30 hover:bg-background/55",
                ].join(" ")}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="p-3 rounded-full border border-background/20 text-background/80 hover:bg-background/10 hover:text-background transition-colors"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>

        {/* Footer */}
        <div className="relative mt-16 md:mt-24 text-center max-w-3xl mx-auto">
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
