import { Link } from "react-router-dom";
import { CalendarDays, MapPin } from "lucide-react";
import DigiHubShell from "@/components/digihub/DigiHubShell";
import { Button } from "@/components/ui/button";
import { clinicEvents } from "@/data/digihub";

const Events = () => (
  <DigiHubShell
    title="Events"
    description="Upcoming workshops, webinars and community sessions across our programmes."
  >
    <div className="container mx-auto px-4 md:px-8 max-w-3xl py-12 md:py-16 space-y-4">
      {clinicEvents.map((e) => (
        <div key={e.slug} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <p className="text-xs text-primary font-semibold">{e.type}</p>
          <h2 className="font-semibold text-card-foreground mt-1">{e.title}</h2>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mt-2">
            <span className="flex items-center gap-1.5"><CalendarDays size={13} /> {e.date}</span>
            <span className="flex items-center gap-1.5"><MapPin size={13} /> {e.location}</span>
          </div>
        </div>
      ))}
      <Button className="rounded-full" asChild>
        <Link to="/digihub/clinics">Register for a session</Link>
      </Button>
    </div>
  </DigiHubShell>
);

export default Events;
