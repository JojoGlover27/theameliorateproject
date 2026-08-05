import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import DigiHubShell from "@/components/digihub/DigiHubShell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { challenge } from "@/data/digihub";

const Challenge = () => (
  <DigiHubShell
    title="Community Challenge"
    description="One practical safety habit each month, built together as a community."
  >
    <div className="container mx-auto px-4 md:px-8 max-w-2xl py-12 md:py-16">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <p className="text-xs text-primary font-semibold uppercase tracking-wider">{challenge.month}</p>
        <h2 className="text-2xl font-semibold text-card-foreground mt-1">{challenge.title}</h2>
        <p className="text-sm text-muted-foreground mt-2">{challenge.blurb}</p>
        <Progress value={(challenge.participants / challenge.target) * 100} className="h-2 mt-5" />
        <p className="text-xs text-muted-foreground mt-2">
          {challenge.participants} of {challenge.target} participants
        </p>
        <ul className="mt-6 space-y-2.5">
          {challenge.tasks.map((t) => (
            <li key={t} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <CheckCircle2 size={15} className="text-primary mt-0.5 shrink-0" /> {t}
            </li>
          ))}
        </ul>
        <Button className="rounded-full mt-6" asChild>
          <Link to="/digihub/action-plan">Track this in my safety plan</Link>
        </Button>
      </div>
    </div>
  </DigiHubShell>
);

export default Challenge;
