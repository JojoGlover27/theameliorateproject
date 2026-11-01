import { useState } from "react";
import { Quote, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { TransformWorkshop } from "@/data/transform";

export default function WorkshopRecap({ event }: { event: TransformWorkshop }) {
  const [enlarged, setEnlarged] = useState<number | null>(null);
  const recap = event.recap;
  if (!recap) return null;
  const selected = enlarged === null ? undefined : recap.slides[enlarged];
  return <div className="mb-10">
    <p className="text-sm font-semibold text-primary mb-3">OUR FIRST WORKSHOP · COMPLETED</p>
    <h3 className="text-3xl md:text-4xl max-w-4xl leading-snug mb-4">{event.description || event.title}</h3>
    {event.date && <p className="font-medium mb-5"><time dateTime={event.date}>{new Intl.DateTimeFormat("en-GH", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${event.date}T00:00:00Z`))}</time></p>}
    <p className="text-muted-foreground leading-relaxed max-w-3xl">{recap.summary}</p>
    <div className="mt-8 border-t border-brand-blue/30 pt-7"><h4 className="text-2xl mb-4">Workshop recap</h4>
      {recap.slides.length ? <Carousel opts={{ loop: false }} aria-label="Healthcare workshop recap slides" className="max-w-4xl">
        <CarouselContent>{recap.slides.map((slide, index) => <CarouselItem key={slide.url} aria-label={`Slide ${index + 1} of ${recap.slides.length}`}>
          <figure><img src={slide.url} alt={slide.alt} className="w-full aspect-[4/3] object-contain bg-background" loading="lazy" /><figcaption className="flex items-center justify-between gap-3 py-3"><span className="text-sm text-muted-foreground">{index + 1} / {recap.slides.length}</span><Button variant="outline" size="icon" title={`Enlarge slide ${index + 1}`} aria-label={`Enlarge slide ${index + 1}`} onClick={() => setEnlarged(index)}><ZoomIn aria-hidden="true" /></Button></figcaption></figure>
        </CarouselItem>)}</CarouselContent>
        <div className="flex gap-3 mt-2"><CarouselPrevious className="static translate-x-0 translate-y-0 h-11 w-11" /><CarouselNext className="static translate-x-0 translate-y-0 h-11 w-11" /></div>
      </Carousel> : <p className="text-sm text-muted-foreground leading-relaxed">The workshop recap slides will be shared here soon.</p>}
    </div>
    <div className="mt-8 border-t border-brand-magenta/30 pt-7"><h4 className="text-2xl md:text-3xl mb-4">Your Voices. Our Why.</h4>
      {recap.feedback.length ? <div className="grid md:grid-cols-2 gap-5">{recap.feedback.map((comment, index) => <blockquote key={index} className="bg-card tint-pink border rounded-lg p-6"><Quote aria-hidden="true" className="h-7 w-7 text-primary mb-4" /><p className="leading-relaxed whitespace-pre-line">{comment}</p></blockquote>)}</div> : <p className="text-sm text-muted-foreground leading-relaxed">Participant feedback will be shared here with respect for privacy.</p>}
    </div>
    <Dialog open={!!selected} onOpenChange={open => { if (!open) setEnlarged(null); }}><DialogContent className="max-w-5xl w-[calc(100%-2rem)] max-h-[90vh] overflow-auto motion-reduce:animate-none">
      <DialogTitle>Workshop recap · Slide {enlarged === null ? "" : enlarged + 1}</DialogTitle><DialogDescription className="sr-only">Enlarged healthcare workshop recap slide.</DialogDescription>
      {selected && <img src={selected.url} alt={selected.alt} className="w-full max-h-[72vh] object-contain" />}
    </DialogContent></Dialog>
  </div>;
}
