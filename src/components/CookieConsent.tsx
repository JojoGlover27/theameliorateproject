import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { X, Check, Lock, BarChart3, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export const CONSENT_KEY = "amelio-cookie-consent";

export type CookieConsent = { essential: true; analytics: boolean; ts: string };

export const getConsent = (): CookieConsent | null => {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? (JSON.parse(raw) as CookieConsent) : null;
  } catch {
    return null;
  }
};

const applyConsent = (consent: CookieConsent) => {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch {
    /* storage unavailable */
  }
  // Immediately act on the choice: clear analytics storage when declined.
  if (!consent.analytics) {
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("_ga") || k.startsWith("amelio-analytics"))
        .forEach((k) => localStorage.removeItem(k));
    } catch {
      /* ignore */
    }
  }
  window.dispatchEvent(new CustomEvent("amelio:cookie-consent", { detail: consent }));
};

const CookieConsentBanner = () => {
  const [open, setOpen] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const existing = getConsent();
    if (!existing) setOpen(true);
    else setAnalytics(existing.analytics);
  }, []);

  const decide = (allowAnalytics: boolean) => {
    applyConsent({ essential: true, analytics: allowAnalytics, ts: new Date().toISOString() });
    setPrefsOpen(false);
    setOpen(false);
  };

  const policyLink = (
    <Link to="/privacy" className="text-brand-gold font-semibold hover:underline">
      Cookies Policy
    </Link>
  );

  return (
    <>
      <AnimatePresence>
        {open && !prefsOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            role="dialog"
            aria-label="Cookies Policy"
            className="fixed inset-x-3 bottom-3 z-[60] md:inset-x-6 md:bottom-6"
          >
            <div className="relative mx-auto max-w-5xl rounded-2xl bg-consent text-consent-foreground shadow-2xl p-6 md:p-8">
              <button
                onClick={() => decide(false)}
                aria-label="Close and accept essential cookies only"
                className="absolute right-4 top-4 text-consent-foreground/70 hover:text-consent-foreground transition-colors"
              >
                <X size={20} />
              </button>

              <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
                <div className="pr-6">
                  <h2 className="text-2xl md:text-3xl mb-3">Cookies Policy</h2>
                  <p className="text-sm md:text-base text-consent-foreground/85 leading-relaxed mb-3">
                    We use only essential cookies to keep our website secure and functioning properly.
                  </p>
                  <p className="text-sm md:text-base text-consent-foreground/85 leading-relaxed mb-3">
                    We do not use advertising cookies, profiling cookies, or third-party trackers. Your visit
                    remains private.
                  </p>
                  <p className="text-sm md:text-base text-consent-foreground/85">Learn more in our {policyLink}.</p>
                </div>

                <div className="flex flex-col gap-3 md:w-64">
                  <button
                    onClick={() => decide(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-gold px-5 py-3 font-semibold text-consent hover:brightness-105 transition"
                  >
                    <Check size={18} /> Accept Essential
                  </button>
                  <button
                    onClick={() => decide(false)}
                    className="inline-flex items-center justify-center rounded-lg border border-consent-foreground/40 px-5 py-3 font-semibold text-consent-foreground hover:bg-consent-foreground/10 transition"
                  >
                    Essential Only
                  </button>
                  <button
                    onClick={() => setPrefsOpen(true)}
                    className="mx-auto text-sm text-consent-foreground underline decoration-dotted decoration-brand-gold underline-offset-4 hover:text-brand-gold transition-colors"
                  >
                    Manage Preferences
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {prefsOpen && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-end md:items-center justify-center bg-foreground/50 p-3 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Cookie preferences"
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-lg rounded-2xl bg-card border border-border tint-purple p-6 md:p-8 shadow-2xl"
            >
              <button
                onClick={() => setPrefsOpen(false)}
                aria-label="Close preferences"
                className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>

              <h2 className="text-2xl text-card-foreground mb-3">Cookies Policy</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                You can choose which types of cookies we use. Your preferences help us provide a better and more
                accessible experience. You can change your preferences at any time.
              </p>

              <div className="border-t border-border py-5 flex items-start gap-4">
                <span className="shrink-0 grid place-items-center h-11 w-11 rounded-full bg-primary text-primary-foreground">
                  <Lock size={18} />
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-card-foreground">Essential Cookies</h3>
                    <span className="rounded-full bg-secondary text-secondary-foreground text-[11px] px-2 py-0.5">
                      Always Active
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Required for website security, accessibility, navigation, and basic functionality. These cookies
                    cannot be disabled.
                  </p>
                </div>
                <Switch checked disabled aria-label="Essential cookies always active" />
              </div>

              <div className="border-t border-border py-5 flex items-start gap-4">
                <span className="shrink-0 grid place-items-center h-11 w-11 rounded-full bg-primary text-primary-foreground">
                  <BarChart3 size={18} />
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-card-foreground">Analytics Cookies</h3>
                    <span className="rounded-full bg-muted text-muted-foreground text-[11px] px-2 py-0.5">Optional</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Help us understand anonymous website usage so we can improve our services and user experience.
                  </p>
                </div>
                <Switch checked={analytics} onCheckedChange={setAnalytics} aria-label="Analytics cookies" />
              </div>

              <button
                onClick={() => decide(analytics)}
                className="mt-2 w-full rounded-lg bg-brand-gold px-5 py-3 font-semibold text-consent hover:brightness-105 transition"
              >
                Save Preferences
              </button>
              <p className="mt-4 text-center text-sm text-muted-foreground">Learn more in our {policyLink}.</p>

              <div className="mt-5 flex items-start gap-3 rounded-xl border border-border bg-background/60 p-4">
                <Shield className="text-primary shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-semibold text-foreground text-sm">Your privacy matters</p>
                  <p className="text-sm text-muted-foreground">
                    We are committed to protecting your anonymity, privacy, and security.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieConsentBanner;
