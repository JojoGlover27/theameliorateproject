import { useEffect, useRef, useState } from "react";
import { CalendarCheck, Users, ClipboardList, MessagesSquare } from "lucide-react";
import { transformImpact } from "@/data/transform";

const icons = [CalendarCheck, Users, ClipboardList, MessagesSquare];
const styles = ["tint-pink border-t-brand-magenta", "tint-blue border-t-brand-blue", "tint-gold border-t-brand-gold", "tint-teal border-t-brand-teal"];

export default function TransformImpact() {
  const section = useRef<HTMLElement>(null);
  const started = useRef(false);
  const [progress, setProgress] = useState(1);
  useEffect(() => {
    const node = section.current;
    if (!node || typeof IntersectionObserver === "undefined" || typeof requestAnimationFrame === "undefined") return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting) || started.current) return;
      started.current = true;
      observer.disconnect();
      const start = performance.now();
      setProgress(0);
      const tick = (now: number) => {
        const elapsed = Math.min((now - start) / 1400, 1);
        setProgress(1 - Math.pow(1 - elapsed, 3));
        if (elapsed < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.2 });
    const onMotion = () => { if (motion.matches) { cancelAnimationFrame(frame); observer.disconnect(); setProgress(1); } };
    motion.addEventListener("change", onMotion);
    observer.observe(node);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); motion.removeEventListener("change", onMotion); };
  }, []);
  return <section ref={section} aria-labelledby="transform-impact-title" className="py-14 md:py-20 border-y border-border bg-brand-teal/10">
    <div className="container mx-auto max-w-6xl px-4 md:px-8">
      <h2 id="transform-impact-title" className="text-3xl md:text-4xl mb-4">TRANSform Impact at a Glance</h2>
      <p className="text-muted-foreground mb-8 leading-relaxed">Every number represents a step towards connection, knowledge and empowerment.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">{transformImpact.map((stat, index) => {
        const Icon = icons[index] ?? Users;
        return <article key={stat.id} className={`bg-card border border-t-4 rounded-lg p-6 ${styles[index]}`}>
          <Icon aria-hidden="true" className="h-6 w-6 mb-5 text-foreground" />
          <p className="text-5xl font-bold tabular-nums min-h-14 mb-3"><span aria-hidden="true" data-impact-value={stat.id}>{Math.round(stat.value * progress)}</span><span className="sr-only">{stat.value}</span></p>
          <h3 className="text-xl mb-3">{stat.label}</h3><p className="text-sm text-muted-foreground leading-relaxed">{stat.description}</p>
        </article>;
      })}</div>
    </div>
  </section>;
}
