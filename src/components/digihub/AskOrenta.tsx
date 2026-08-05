import { useState } from "react";
import { Send, Sparkles, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import orentaLogo from "@/assets/orenta-logo.png";

const ORENTA_URL = "https://orenta-ai-prototype.lovable.app";

const suggestions = [
  "Is this message a scam?",
  "How do I protect my phone?",
  "What are my digital rights?",
  "Is this website safe?",
];

const openOrenta = (question?: string) => {
  const url = question
    ? `${ORENTA_URL}/?mode=digital-rights-safety&q=${encodeURIComponent(question)}`
    : `${ORENTA_URL}/?mode=digital-rights-safety`;
  window.open(url, "_blank", "noopener,noreferrer");
};

const AskOrenta = ({ compact = false }: { compact?: boolean }) => {
  const [value, setValue] = useState("");

  return (
    <div className="rounded-3xl border border-border bg-card p-5 md:p-7 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <img src={orentaLogo} alt="Orenta" className="h-10 w-10 rounded-xl object-cover" />
        <div>
          <h3 className="text-xl font-semibold text-card-foreground">Ask Orenta</h3>
          <p className="text-xs text-muted-foreground">Digital Rights & Safety mode</p>
        </div>
        <Sparkles className="ml-auto text-brand-gold" size={18} />
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Get instant, evidence-aware answers about digital rights, privacy and safety.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          openOrenta(value.trim() || undefined);
        }}
        className="flex gap-2"
      >
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask anything..."
          aria-label="Ask Orenta a question"
          className="rounded-full"
        />
        <Button type="submit" size="icon" className="rounded-full shrink-0" aria-label="Send question to Orenta">
          <Send size={16} />
        </Button>
      </form>
      {!compact && (
        <div className="flex flex-wrap gap-2 mt-4">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => openOrenta(s)}
              className="text-xs px-3 py-1.5 rounded-full border border-border bg-secondary text-secondary-foreground hover:border-primary hover:text-primary transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => openOrenta()}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
      >
        Open Orenta for the full experience <ExternalLink size={13} />
      </button>
    </div>
  );
};

export default AskOrenta;
