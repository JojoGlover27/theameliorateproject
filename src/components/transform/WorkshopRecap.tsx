import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { TransformWorkshop } from "@/data/transform";

export default function WorkshopRecap({ event, children }: { event: TransformWorkshop; children?: ReactNode }) {
  const [enlarged, setEnlarged] = useState<number | null>(null);
  const enlargeTrigger = useRef<HTMLButtonElement | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!api) return;
    const update = () => setActive(api.selectedScrollSnap());
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => { api.off("select", update); api.off("reInit", update); };
  }, [api]);
  const recap = event.recap;
  if (!recap) return null;
  const slides = recap.slides ?? [];
  const selected = enlarged === null ? undefined : slides[enlarged];
  return <div className="mb-10">
    <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-[0.06em] text-primary mb-5">Events / Workshops</h2>
    <details className="group rounded-xl border border-brand-blue/30 bg-card/60 p-5 md:p-6">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
        <span><span className="text-2xl md:text-3xl leading-snug">{event.description || event.title}</span> <span className="ml-2 inline-block align-middle rounded-full bg-gradient-to-r from-primary via-brand-magenta to-brand-blue px-3.5 py-1 text-[0.7rem] font-extrabold uppercase tracking-[0.08em] text-primary-foreground shadow-sm">Completed</span>
        {event.date && <span className="block mt-2 text-base font-medium"><time dateTime={event.date}>{new Intl.DateTimeFormat("en-GH", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${event.date}T00:00:00Z`))}</time></span>}</span>
        <ChevronDown className="h-7 w-7 shrink-0 text-primary transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="mt-6">
    <p className="text-muted-foreground leading-relaxed max-w-3xl">{recap.summary}</p>
    <div className="mt-8 border-t border-brand-blue/30 pt-7"><h4 className="text-2xl mb-4">Workshop recap</h4>
      {slides.length ? <Carousel setApi={setApi} opts={{ loop: false }} aria-label="Healthcare workshop recap slides" className="max-w-2xl mx-auto">
        <CarouselContent>{slides.map((slide, index) => <CarouselItem key={slide.url} aria-label={`Slide ${index + 1} of ${slides.length}`} aria-hidden={index !== active}>
          <figure><img src={slide.url} alt={slide.alt} className="w-full aspect-[4/5] max-h-[70vh] object-contain" loading="lazy" /><figcaption className="flex items-center justify-between gap-3 py-3"><span className="text-sm text-muted-foreground">{index + 1} / {slides.length}</span><Button variant="outline" size="icon" tabIndex={index === active ? 0 : -1} title={`Enlarge slide ${index + 1}`} aria-label={`Enlarge slide ${index + 1}`} onClick={event => { enlargeTrigger.current = event.currentTarget; setEnlarged(index); }}><ZoomIn aria-hidden="true" /></Button></figcaption></figure>
        </CarouselItem>)}</CarouselContent>
        <div className="flex items-center justify-between gap-3 mt-2"><p aria-live="polite" className="text-sm text-muted-foreground">Slide {active + 1} of {slides.length}</p><div className="flex gap-3"><CarouselPrevious className="static translate-x-0 translate-y-0 h-11 w-11" /><CarouselNext className="static translate-x-0 translate-y-0 h-11 w-11" /></div></div>
      </Carousel> : <p className="text-sm text-muted-foreground leading-relaxed">The workshop recap slides will be shared here soon.</p>}
    </div>
    {children && <div className="mt-8 border-t border-brand-blue/30 pt-7">{children}</div>}
      </div>
    </details>
    <Dialog open={!!selected} onOpenChange={open => { if (!open) setEnlarged(null); }}><DialogContent onCloseAutoFocus={event => { event.preventDefault(); enlargeTrigger.current?.focus(); }} className="max-w-5xl w-[calc(100%-2rem)] max-h-[90vh] overflow-auto motion-reduce:animate-none tint-pink">
      <DialogTitle>Workshop recap · Slide {enlarged === null ? "" : enlarged + 1}</DialogTitle><DialogDescription className="sr-only">Enlarged healthcare workshop recap slide.</DialogDescription>
      {selected && <img src={selected.url} alt={selected.alt} className="w-full max-h-[72vh] object-contain" />}
    </DialogContent></Dialog>
  </div>;
}
