import { Award } from "lucide-react";
import DigiHubShell from "@/components/digihub/DigiHubShell";
import { badges } from "@/data/digihub";

const Badges = () => (
  <DigiHubShell
    title="Digital Safety Badges"
    description="Learn, practise and earn recognition for the safety habits you build and share with your community."
  >
    <div className="container mx-auto px-4 md:px-8 max-w-4xl py-12 md:py-16 grid sm:grid-cols-2 gap-5">
      {badges.map((b) => (
        <div key={b.name} className="rounded-2xl border border-border bg-card p-6 shadow-sm text-center">
          <Award className={`mx-auto mb-3 ${b.tone}`} size={38} />
          <h2 className="font-semibold text-card-foreground">{b.name}</h2>
          <p className="text-sm text-muted-foreground mt-1.5">{b.requirement}</p>
        </div>
      ))}
    </div>
  </DigiHubShell>
);

export default Badges;
