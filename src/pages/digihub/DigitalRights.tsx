import { Link } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";
import GuideList from "@/components/digihub/GuideList";
import { Button } from "@/components/ui/button";
import { digitalRightsArticles } from "@/data/digihub";

const DigitalRights = () => (
  <GuideList
    title="Digital Rights"
    description="Understand your rights online and offline, how they are protected in Ghana, and what to do when they are violated."
    items={digitalRightsArticles}
    intro={
      <div className="rounded-3xl border bg-card p-5 md:p-6 shadow-sm tint-gold flex flex-col sm:flex-row sm:items-center gap-4 mb-2">
        <span className="grid place-items-center h-11 w-11 rounded-xl bg-brand-gold/15 text-brand-gold shrink-0">
          <BookOpen size={20} />
        </span>
        <div className="flex-1">
          <p className="font-semibold text-card-foreground">New: Your Rights in Ghana</p>
          <p className="text-sm text-muted-foreground mt-0.5">
            Explore the Constitution, Data Protection Act, Cybersecurity Act and more, explained in plain language, plus a step-by-step guide for when something goes wrong.
          </p>
        </div>
        <Button className="rounded-full shrink-0" asChild>
          <Link to="/digihub/your-rights">Open the library <ArrowRight size={15} /></Link>
        </Button>
      </div>
    }
  />
);

export default DigitalRights;
