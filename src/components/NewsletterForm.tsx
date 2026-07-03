import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type Variant = "hero" | "compact" | "inline";

export interface NewsletterFormProps {
  source: string;
  variant?: Variant;
  buttonLabel?: string;
  className?: string;
}

const NewsletterForm = ({ source, variant = "hero", buttonLabel = "Subscribe", className = "" }: NewsletterFormProps) => {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading"); setMessage("");
    try {
      const { data, error } = await supabase.functions.invoke("newsletter-subscribe", {
        body: { email, source, website },
      });
      if (error || (data as any)?.error) throw new Error((data as any)?.error ?? error?.message ?? "error");
      setStatus("success");
      setMessage("Thank you for subscribing. Please check your inbox for a confirmation email from info@ameliorateproject.org.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage("Something went wrong. Please try again in a moment.");
    }
  };

  const isCompact = variant === "compact";
  const isInline = variant === "inline";

  return (
    <form onSubmit={onSubmit} className={`w-full ${className}`} noValidate>
      <div className={`flex ${isCompact ? "flex-col sm:flex-row" : "flex-col sm:flex-row"} gap-2`}>
        {/* honeypot */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
          aria-hidden="true"
        />
        <label className="sr-only" htmlFor={`nl-${source}`}>Email address</label>
        <Input
          id={`nl-${source}`}
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={
            isInline
              ? "bg-white/95 text-foreground border-white/40 flex-1"
              : "flex-1"
          }
          maxLength={254}
        />
        <Button
          type="submit"
          disabled={status === "loading"}
          className={isInline ? "bg-[#F0A028] hover:bg-[#d98d1e] text-[#1a1030] font-semibold" : ""}
        >
          {status === "loading" ? <Loader2 className="animate-spin" size={16} /> : buttonLabel}
        </Button>
      </div>
      {message && (
        <p
          role="status"
          aria-live="polite"
          className={`mt-3 text-sm ${status === "success" ? (isInline ? "text-[#F0A028]" : "text-primary") : "text-destructive"}`}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default NewsletterForm;
