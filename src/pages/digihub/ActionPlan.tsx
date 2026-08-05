import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Download, Lock, CheckCircle2 } from "lucide-react";
import DigiHubShell from "@/components/digihub/DigiHubShell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getPlanProgress, getScore, savePlanProgress, PrivacyScoreResult } from "@/lib/digihub-store";

const baseline = [
  "Turn on two-factor authentication for your primary email.",
  "Set a six-digit PIN or passphrase on your phone.",
  "Turn off lock-screen message previews.",
  "Turn on encrypted backup and store the recovery key offline.",
  "Set a SIM PIN with your mobile operator.",
];

const ActionPlan = () => {
  const [score, setScore] = useState<PrivacyScoreResult | null>(null);
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setScore(getScore());
    setProgress(getPlanProgress());
  }, []);

  const items = score ? [...score.recommendations, ...baseline] : [];
  const unique = Array.from(new Set(items));
  const done = unique.filter((i) => progress[i]).length;
  const pct = unique.length ? Math.round((done / unique.length) * 100) : 0;

  const toggle = (item: string) => {
    const next = { ...progress, [item]: !progress[item] };
    setProgress(next);
    savePlanProgress(next);
  };

  const download = () => {
    const lines = [
      "MY DIGITAL SAFETY PLAN — DigiHub, The Ameliorate Project",
      "",
      `Privacy Score: ${score?.score}% (${score?.band})`,
      `Assessed: ${score ? new Date(score.takenAt).toLocaleDateString() : ""}`,
      "",
      "ACTIONS",
      ...unique.map((i) => `[${progress[i] ? "x" : " "}] ${i}`),
      "",
      "Review this plan every three months.",
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-digital-safety-plan.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DigiHubShell
      title="My Digital Safety Plan"
      description="A personal checklist built from your Privacy Score. Work through it at your own pace, come back and update your progress at any time."
    >
      <div className="container mx-auto px-4 md:px-8 max-w-3xl py-12 md:py-16">
        {!score ? (
          <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-sm">
            <Lock className="mx-auto text-muted-foreground mb-4" size={34} />
            <h2 className="text-xl font-semibold text-card-foreground mb-2">Take your Privacy Score first</h2>
            <p className="text-muted-foreground mb-6">
              Your plan is generated from your assessment, so we know which actions matter most for you.
            </p>
            <Button className="rounded-full" asChild>
              <Link to="/digihub/privacy-score">Take the 10-question assessment</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="rounded-2xl border border-border bg-card p-5 text-center shadow-sm">
                <p className="text-3xl font-bold text-primary">{score.score}%</p>
                <p className="text-xs text-muted-foreground mt-1">Latest Privacy Score ({score.band})</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5 text-center shadow-sm">
                <p className="text-3xl font-bold text-brand-blue">{done}</p>
                <p className="text-xs text-muted-foreground mt-1">Completed actions</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5 text-center shadow-sm">
                <p className="text-3xl font-bold text-accent">{unique.length - done}</p>
                <p className="text-xs text-muted-foreground mt-1">Remaining actions</p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-card-foreground">Progress checklist</h2>
                <span className="text-sm text-muted-foreground">{pct}%</span>
              </div>
              <Progress value={pct} className="h-2 mb-5" />
              <ul className="space-y-2">
                {unique.map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => toggle(item)}
                      className={`w-full flex items-start gap-3 text-left rounded-xl border px-4 py-3 text-sm transition-colors ${
                        progress[item]
                          ? "border-primary/40 bg-primary/5 text-muted-foreground line-through"
                          : "border-border bg-secondary/40 text-foreground hover:border-primary/50"
                      }`}
                    >
                      <CheckCircle2
                        size={16}
                        className={`mt-0.5 shrink-0 ${progress[item] ? "text-primary" : "text-muted-foreground/40"}`}
                      />
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 mt-6">
                <Button variant="outline" className="rounded-full" onClick={download}>
                  <Download size={15} /> Download my plan
                </Button>
                <Button variant="ghost" className="rounded-full" asChild>
                  <Link to="/digihub/privacy-score">Retake assessment</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </DigiHubShell>
  );
};

export default ActionPlan;
