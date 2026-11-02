import { useEffect, useRef, useState } from "react";
import { ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { TransformWorkshop } from "@/data/transform";

export default function WorkshopRecap({ event }: { event: TransformWorkshop }) {
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
  const selected = enlarged === null ? undefined : recap.slides[enlarged];
  return <div className="mb-10">
    <p className="flex flex-wrap items-center gap-2.5 text-sm font-semibold text-primary mb-3"><span>OUR FIRST WORKSHOP</span><span className="rounded-full bg-gradient-to-r from-primary via-brand-magenta to-brand-blue px-3.5 py-1 text-[0.7rem] font-extrabold uppercase tracking-[0.08em] text-primary-foreground shadow-sm">Completed</span></p>
    <h3 className="text-3xl md:text-4xl max-w-4xl leading-snug mb-4">{event.description || event.title}</h3>
    {event.date && <p className="font-medium mb-5"><time dateTime={event.date}>{new Intl.DateTimeFormat("en-GH", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${event.date}T00:00:00Z`))}</time></p>}
    <p className="text-muted-foreground leading-relaxed max-w-3xl">{recap.summary}</p>
    <div className="mt-8 border-t border-brand-blue/30 pt-7"><h4 className="text-2xl mb-4">Workshop recap</h4>
      {recap.slides.length ? <Carousel setApi={setApi} opts={{ loop: false }} aria-label="Healthcare workshop recap slides" className="max-w-2xl mx-auto">
        <CarouselContent>{recap.slides.map((slide, index) => <CarouselItem key={slide.url} aria-label={`Slide ${index + 1} of ${recap.slides.length}`} aria-hidden={index !== active}>
          <figure><img src={slide.url} alt={slide.alt} className="w-full aspect-[4/5] max-h-[70vh] object-contain" loading="lazy" /><figcaption className="flex items-center justify-between gap-3 py-3"><span className="text-sm text-muted-foreground">{index + 1} / {recap.slides.length}</span><Button variant="outline" size="icon" tabIndex={index === active ? 0 : -1} title={`Enlarge slide ${index + 1}`} aria-label={`Enlarge slide ${index + 1}`} onClick={event => { enlargeTrigger.current = event.currentTarget; setEnlarged(index); }}><ZoomIn aria-hidden="true" /></Button></figcaption></figure>
        </CarouselItem>)}</CarouselContent>
        <div className="flex items-center justify-between gap-3 mt-2"><p aria-live="polite" className="text-sm text-muted-foreground">Slide {active + 1} of {recap.slides.length}</p><div className="flex gap-3"><CarouselPrevious className="static translate-x-0 translate-y-0 h-11 w-11" /><CarouselNext className="static translate-x-0 translate-y-0 h-11 w-11" /></div></div>
      </Carousel> : <p className="text-sm text-muted-foreground leading-relaxed">The workshop recap slides will be shared here soon.</p>}
    </div>
    <Dialog open={!!selected} onOpenChange={open => { if (!open) setEnlarged(null); }}><DialogContent onCloseAutoFocus={event => { event.preventDefault(); enlargeTrigger.current?.focus(); }} className="max-w-5xl w-[calc(100%-2rem)] max-h-[90vh] overflow-auto motion-reduce:animate-none">
      <DialogTitle>Workshop recap · Slide {enlarged === null ? "" : enlarged + 1}</DialogTitle><DialogDescription className="sr-only">Enlarged healthcare workshop recap slide.</DialogDescription>
      {selected && <img src={selected.url} alt={selected.alt} className="w-full max-h-[72vh] object-contain" />}
    </DialogContent></Dialog>
  </div>;
}
