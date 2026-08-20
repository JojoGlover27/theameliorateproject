import { Link } from "react-router-dom";
import { CalendarDays, ArrowRight } from "lucide-react";
import DigiHubShell from "@/components/digihub/DigiHubShell";
import { Button } from "@/components/ui/button";

const Events = () => (
  <DigiHubShell
    title="Events"
    description="Workshops, webinars and community sessions across our programmes."
  >
    <div className="container mx-auto px-4 md:px-8 max-w-3xl py-14 md:py-20">
      <div className="rounded-3xl border border-brand-gold/30 bg-gradient-to-br from-brand-gold/10 via-accent/10 to-primary/10 p-8 md:p-12 text-center shadow-lg">
        <span className="inline-grid place-items-center h-14 w-14 rounded-2xl bg-brand-gold text-black mx-auto mb-5">
          <CalendarDays size={26} />
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Coming Soon</h2>
        <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
          No events are scheduled yet. Our calendar opens with the first Digital Rights &amp; Safety
          Clinic, and every session will be listed here with dates, locations and registration.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button className="rounded-full px-6" asChild>
            <Link to="/digihub/clinics">Join the clinic waiting list <ArrowRight size={15} /></Link>
          </Button>
          <Button variant="secondary" className="rounded-full px-6" asChild>
            <Link to="/digihub">Back to DigiHub</Link>
          </Button>
        </div>
      </div>
    </div>
  </DigiHubShell>
);

export default Events;
