import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, AlertTriangle, RefreshCw, ArrowRight } from "lucide-react";
import DigiHubShell from "@/components/digihub/DigiHubShell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { band, saveScore } from "@/lib/digihub-store";

interface Q {
  area: string;
  question: string;
  options: { label: string; points: number }[];
  weakTip: string;
}

const questions: Q[] = [
  {
    area: "Passwords",
    question: "How do you manage the passwords for your most important accounts?",
    options: [
      { label: "A password manager generates a unique password for every account", points: 10 },
      { label: "Different passwords, but I remember them myself", points: 6 },
      { label: "A few passwords reused across accounts", points: 2 },
      { label: "The same password nearly everywhere", points: 0 },
    ],
    weakTip: "Install a password manager and let it generate a unique password for every account, starting with your email.",
  },
  {
    area: "Device security",
    question: "How is your phone locked?",
    options: [
      { label: "A six-digit PIN or longer passphrase, with encryption on", points: 10 },
      { label: "A fingerprint or face unlock with a short PIN", points: 7 },
      { label: "A swipe pattern", points: 3 },
      { label: "No lock at all", points: 0 },
    ],
    weakTip: "Set a six-digit PIN or a passphrase rather than a pattern, and turn off lock-screen message previews.",
  },
  {
    area: "App permissions",
    question: "When did you last review which apps can use your location, camera, microphone and contacts?",
    options: [
      { label: "In the last month", points: 10 },
      { label: "In the last six months", points: 6 },
      { label: "Over a year ago", points: 2 },
      { label: "Never", points: 0 },
    ],
    weakTip: "Open your phone's privacy settings and revoke location, microphone and contacts access from any app that does not need it.",
  },
  {
    area: "Social media privacy",
    question: "Who can see your posts, photos and follower list?",
    options: [
      { label: "Only people I have approved", points: 10 },
      { label: "Mostly restricted, some things public", points: 6 },
      { label: "Public, but I am careful what I post", points: 3 },
      { label: "Everything is public", points: 0 },
    ],
    weakTip: "Set posts, tagged photos and follower lists to approved contacts only, and remove your phone number from discoverability settings.",
  },
  {
    area: "Phishing awareness",
    question: "A message says your account will be closed unless you confirm your details through a link. What do you do?",
    options: [
      { label: "Ignore the link and open the service myself to check", points: 10 },
      { label: "Check the sender address, then decide", points: 7 },
      { label: "Open the link but do not enter anything", points: 3 },
      { label: "Follow the link and sign in", points: 0 },
    ],
    weakTip: "Never sign in through a link you did not request. Verify through a channel you chose, not one you were given.",
  },
  {
    area: "Safe browsing",
    question: "What browser setup do you use day to day?",
    options: [
      { label: "A tracker-blocking browser that clears data on close", points: 10 },
      { label: "A mainstream browser with private windows", points: 6 },
      { label: "Whatever came with the phone", points: 3 },
      { label: "I am not sure", points: 1 },
    ],
    weakTip: "Switch to a tracker-blocking browser and set site data to clear automatically when you close it.",
  },
  {
    area: "Public Wi-Fi",
    question: "How do you use public or shared Wi-Fi?",
    options: [
      { label: "Only with a trusted VPN turned on", points: 10 },
      { label: "I avoid it entirely", points: 8 },
      { label: "I use it but avoid sensitive accounts", points: 5 },
      { label: "I use it for everything", points: 0 },
    ],
    weakTip: "Use a trusted VPN on any network you do not control, or use mobile data for anything sensitive.",
  },
  {
    area: "Backup practices",
    question: "If your phone were lost or seized today, what would happen to your data?",
    options: [
      { label: "I have an encrypted backup and could wipe the device remotely", points: 10 },
      { label: "I have a backup but no remote wipe", points: 6 },
      { label: "Some photos are in the cloud", points: 3 },
      { label: "I would lose everything", points: 0 },
    ],
    weakTip: "Turn on encrypted backup, store the recovery key offline, and enable remote wipe.",
  },
  {
    area: "Authentication",
    question: "How is two-factor authentication set up on your email?",
    options: [
      { label: "An authenticator app or hardware key", points: 10 },
      { label: "SMS codes", points: 5 },
      { label: "I started but never finished", points: 2 },
      { label: "Not set up", points: 0 },
    ],
    weakTip: "Move two-factor authentication off SMS and into an authenticator app, then store the recovery codes offline.",
  },
  {
    area: "Data sharing",
    question: "How much identifiable information do you share with new online contacts?",
    options: [
      { label: "Nothing identifiable until I trust the person", points: 10 },
      { label: "Only a first name or nickname", points: 7 },
      { label: "Photos and general location", points: 3 },
      { label: "Photos, workplace and location details", points: 0 },
    ],
    weakTip: "Hold back identifiable details, recognisable backgrounds and documents until trust is established, and reverse-image-search new profiles.",
  },
];

const MAX = questions.length * 10;

const PrivacyScore = () => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const answeredCount = Object.keys(answers).length;
  const total = useMemo(() => Object.values(answers).reduce((a, b) => a + b, 0), [answers]);
  const score = Math.round((total / MAX) * 100);
  const weak = questions.filter((q, i) => (answers[i] ?? 0) < 7);

  const submit = () => {
    const result = {
      score,
      band: band(score),
      weakAreas: weak.map((q) => q.area),
      recommendations: weak.map((q) => q.weakTip),
      takenAt: new Date().toISOString(),
    };
    saveScore(result);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <DigiHubShell
      title="Privacy Score"
      description="A 10-question assessment of your digital privacy. Answers stay on your device, nothing is uploaded and no account is needed."
    >
      <div className="container mx-auto px-4 md:px-8 max-w-3xl py-12 md:py-16">
        {!submitted ? (
          <>
            <div className="sticky top-16 z-10 bg-background/90 backdrop-blur py-3 mb-6 rounded-xl">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>{answeredCount} of {questions.length} answered</span>
                <span>{Math.round((answeredCount / questions.length) * 100)}%</span>
              </div>
              <Progress value={(answeredCount / questions.length) * 100} className="h-2" />
            </div>

            <div className="space-y-5">
              {questions.map((q, i) => (
                <div key={q.question} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">{q.area}</p>
                  <p className="font-medium text-card-foreground mb-4">{i + 1}. {q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((o) => {
                      const active = answers[i] === o.points;
                      return (
                        <button
                          key={o.label}
                          onClick={() => setAnswers((a) => ({ ...a, [i]: o.points }))}
                          className={`w-full text-left text-sm rounded-xl border px-4 py-3 transition-colors ${
                            active
                              ? "border-primary bg-primary/10 text-foreground"
                              : "border-border bg-secondary/40 text-muted-foreground hover:border-primary/50"
                          }`}
                        >
                          {o.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <Button
              className="rounded-full mt-8 w-full"
              size="lg"
              disabled={answeredCount < questions.length}
              onClick={submit}
            >
              {answeredCount < questions.length
                ? `Answer ${questions.length - answeredCount} more to see your score`
                : "See my Privacy Score"}
            </Button>
          </>
        ) : (
          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
              <p className="text-6xl font-bold text-primary">{score}%</p>
              <p className="text-lg font-semibold text-card-foreground mt-2">{band(score)}</p>
              <Progress value={score} className="h-2.5 mt-4" />
              <p className="text-sm text-muted-foreground mt-4">
                {band(score) === "Excellent" && "Your habits are strong. Keep them current and help someone else get there."}
                {band(score) === "Good" && "A solid base with a few gaps worth closing this week."}
                {band(score) === "Fair" && "Some good habits, but several openings an attacker could use."}
                {band(score) === "Poor" && "There is real risk here. Start with the first two recommendations today."}
              </p>
            </div>

            {weak.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h2 className="font-semibold text-card-foreground flex items-center gap-2 mb-4">
                  <AlertTriangle className="text-accent" size={18} /> Areas to strengthen
                </h2>
                <div className="flex flex-wrap gap-2 mb-5">
                  {weak.map((q) => (
                    <span key={q.area} className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/30">
                      {q.area}
                    </span>
                  ))}
                </div>
                <h3 className="text-sm font-semibold text-card-foreground mb-3">Your recommendations</h3>
                <ul className="space-y-3">
                  {weak.map((q) => (
                    <li key={q.weakTip} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 size={15} className="text-primary mt-0.5 shrink-0" /> {q.weakTip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
              <p className="font-semibold text-foreground mb-1">Create My Digital Safety Plan is now unlocked</p>
              <p className="text-sm text-muted-foreground mb-4">
                Your plan turns these recommendations into a checklist you can work through and download.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="rounded-full" onClick={() => navigate("/digihub/action-plan")}>
                  Open my plan <ArrowRight size={15} />
                </Button>
                <Button variant="outline" className="rounded-full" onClick={() => { setAnswers({}); setSubmitted(false); }}>
                  <RefreshCw size={15} /> Retake
                </Button>
                <Button variant="ghost" className="rounded-full" asChild>
                  <Link to="/digihub">Back to DigiHub</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DigiHubShell>
  );
};

export default PrivacyScore;
