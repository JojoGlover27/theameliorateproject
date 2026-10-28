import { BookOpen, CalendarDays, ClipboardList, ExternalLink, HandHeart, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPublishedResources, getPublishedWorkshops, isCalendarDate, isValidExternalUrl, transformResources, transformWorkshops } from "@/data/transform";

function displayDate(value: string) {
  return new Intl.DateTimeFormat("en-GH", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
}

export function WorkshopListing() {
  const workshops = getPublishedWorkshops(transformWorkshops);
  if (!workshops.length) return <div className="border-y border-border py-10 mt-8 flex flex-col sm:flex-row items-start gap-5"><CalendarDays className="h-10 w-10 text-primary shrink-0" aria-hidden="true" /><div><h3 className="text-2xl mb-3">No workshop announcements yet</h3><p className="text-muted-foreground leading-relaxed">We’re preparing future TRANSformation Workshops. Check back here for announcements, learning opportunities and details of upcoming community activities.</p></div></div>;
  const today = new Date().toISOString().slice(0, 10);
  return <div className="space-y-10 mt-10">{workshops.map(event => {
    const single = !!event.flyers && event.flyers.length === 1;
    return <article key={event.id} className="border-t border-brand-teal/40 pt-8">
    {event.flyers && <div className="mb-8"><div className={`${single ? "mx-auto max-w-lg" : ""} overflow-hidden rounded-xl shadow-xl`}><div className="flex items-center justify-center gap-3 bg-gradient-to-r from-primary via-brand-magenta to-brand-blue px-5 py-4 text-center"><CalendarDays className="h-6 w-6 shrink-0 text-primary-foreground" aria-hidden="true" /><p className="text-xl md:text-2xl font-extrabold uppercase tracking-[0.06em] text-primary-foreground">Upcoming Events / Workshops</p></div><div className={single ? "" : "grid sm:grid-cols-2 gap-5"}>{event.flyers.map(flyer => isValidExternalUrl(event.registrationUrl) ? <a key={flyer.url} href={event.registrationUrl} target="_blank" rel="noopener noreferrer" aria-label={`${flyer.alt} Register for the Workshop (opens in a new tab)`} className={`block overflow-hidden focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-teal hover:ring-2 hover:ring-brand-teal transition-shadow${single ? "" : " rounded-lg"}`}><img src={flyer.url} alt={flyer.alt} width={768} height={1152} loading="eager" fetchPriority="high" className="w-full h-auto object-contain" /></a> : <img key={flyer.url} src={flyer.url} alt={flyer.alt} width={768} height={1152} loading="eager" fetchPriority="high" className={`w-full h-auto object-contain${single ? "" : " rounded-lg"}`} />)}</div></div></div>}
    {isValidExternalUrl(event.imageUrl) && <img src={event.imageUrl} alt="" className="w-full h-auto object-contain mb-5 rounded-lg" loading="lazy" />}
    {event.category && <p className={`text-sm text-primary mb-2${single ? " text-center" : ""}`}>{event.category}</p>}
    <h3 className={`text-2xl mb-3${single ? " text-center" : ""}`}>{event.title}</h3>
    {event.description && <p className={`text-muted-foreground mb-4${single ? " text-center" : ""}`}>{event.description}</p>}
    <dl className={`grid sm:grid-cols-3 gap-4 text-sm${single ? " text-center" : ""}`}>
      {isCalendarDate(event.date) && <div><dt className="font-semibold">{event.date < today ? "Past workshop" : "Date"}</dt><dd><time dateTime={event.date}>{new Intl.DateTimeFormat("en-GH", { weekday: "long", timeZone: "UTC" }).format(new Date(`${event.date}T00:00:00Z`))}, {displayDate(event.date)}</time></dd></div>}
      {(event.startTime || event.endTime) && <div><dt className="font-semibold">Time</dt><dd>{[event.startTime, event.endTime].filter(Boolean).join(" – ")}{event.timeZone ? ` (${event.timeZone})` : ""}</dd></div>}
      {event.format && <div><dt className="font-semibold">Format</dt><dd className="capitalize">{event.format}</dd></div>}
      {event.venue && <div><dt className="font-semibold">Participation location</dt><dd>{event.venue}</dd></div>}
      {event.participation && <div><dt className="font-semibold">Participation</dt><dd>{event.participation}</dd></div>}
      {event.accessibilityNotes && <div><dt className="font-semibold">Accessibility</dt><dd>{event.accessibilityNotes}</dd></div>}
    </dl>
    {isValidExternalUrl(event.registrationUrl) && <div className={`mt-6${single ? " text-center" : ""}`}><Button asChild size="lg" className="h-auto min-h-11 py-3 whitespace-normal bg-brand-teal text-primary-foreground hover:bg-brand-teal/90 focus-visible:ring-brand-teal"><a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">Register for the Workshop <ExternalLink aria-hidden="true" /></a></Button>{isCalendarDate(event.registrationDeadline) && <p className="mt-3 font-semibold text-sm">Registration closes on <time dateTime={event.registrationDeadline}>{displayDate(event.registrationDeadline)}</time>.</p>}</div>}
    {event.narrative && <div className="mt-8 rounded-xl border border-border bg-gradient-to-br from-brand-magenta/10 via-brand-gold/10 to-brand-blue/10 p-6 md:p-8">
      <h4 className="text-xl md:text-2xl mb-5">About this workshop</h4>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div className="flex gap-3"><HandHeart className="h-5 w-5 text-brand-magenta shrink-0 mt-0.5" aria-hidden="true" /><p className="text-sm text-muted-foreground leading-relaxed">{event.narrative.about.split("\n").map((line, i) => <span key={i} className="block mb-3 last:mb-0">{line}</span>)}</p></div>
          <div className="flex gap-3"><ClipboardList className="h-5 w-5 text-brand-teal shrink-0 mt-0.5" aria-hidden="true" /><div><p className="text-sm font-semibold mb-1">How to participate</p><p className="text-sm text-muted-foreground leading-relaxed">{event.narrative.participate}</p></div></div>
        </div>
        <div className="space-y-5">
          <div className="flex gap-3"><Lock className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" aria-hidden="true" /><div><p className="text-sm font-semibold mb-1">Privacy and confidentiality</p><p className="text-sm text-muted-foreground leading-relaxed">{event.narrative.privacy}</p></div></div>
          <div className="flex gap-3"><Mail className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" aria-hidden="true" /><div><p className="text-sm font-semibold mb-1">Questions?</p><p className="text-sm text-muted-foreground leading-relaxed">Contact <a href="mailto:info@ameliorateproject.org" className="text-primary underline underline-offset-2 hover:text-primary/80">info@ameliorateproject.org</a> — or if you prefer not to use the form.</p></div></div>
        </div>
      </div>
      <p className="mt-6 text-sm text-muted-foreground border-t border-border pt-4">{event.narrative.closing} <span className="font-semibold text-foreground">TRANSform Community Network</span> · <span className="text-primary">Build. Connect. Empower.</span></p>
    </div>}
    </article>;
  })}</div>;
}

export function ResourceListing() {
  const resources = getPublishedResources(transformResources);
  if (!resources.length) return <div className="border-y border-border py-8 mt-8 flex items-start gap-5"><BookOpen className="h-8 w-8 text-primary shrink-0" aria-hidden="true" /><p className="text-muted-foreground leading-relaxed">No resources have been published here yet. Check back for educational materials and verified opportunities.</p></div>;
  return <div className="grid md:grid-cols-2 gap-6 mt-8">{resources.map(resource => <article key={resource.id} className="bg-card tint-blue border rounded-lg p-6"><p className="text-sm text-primary mb-2">{resource.category}</p><h3 className="text-2xl mb-3">{resource.title}</h3><p className="text-muted-foreground mb-4">{resource.description}</p><p className="text-sm">Source: {resource.source}</p>{isCalendarDate(resource.publicationDate) && <p className="text-sm text-muted-foreground mt-2"><time dateTime={resource.publicationDate}>{displayDate(resource.publicationDate)}</time></p>}<Button asChild variant="outline" className="mt-5"><a href={resource.url} target="_blank" rel="noopener noreferrer">View resource <ExternalLink aria-hidden="true" /></a></Button></article>)}</div>;
}