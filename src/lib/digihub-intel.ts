import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type LiveThreatType = "Scam" | "Surveillance" | "Data Breach" | "Censorship" | "Harassment";

export interface LiveThreat {
  country: string;
  lat: number;
  lon: number;
  type: LiveThreatType;
  risk: "High" | "Medium" | "Low";
  headline: string;
  source: string;
  url: string;
  date: string;
}

export interface LiveAlert {
  id: string;
  title: string;
  source: string;
  url: string;
  date: string;
  severity: "High" | "Medium" | "Low";
}

export interface Intel {
  updatedAt: string;
  threats: LiveThreat[];
  alerts: LiveAlert[];
}

export const liveThreatTypes: LiveThreatType[] = [
  "Scam",
  "Data Breach",
  "Surveillance",
  "Censorship",
  "Harassment",
];

const REFRESH_MS = 15 * 60 * 1000;

export const useIntel = () => {
  const [data, setData] = useState<Intel | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      const { data: res, error: err } = await supabase.functions.invoke<Intel>("digihub-intel");
      if (!active) return;
      if (err || !res) {
        setError("Live feed unavailable right now.");
      } else {
        setData(res);
        setError(null);
      }
      setLoading(false);
    };

    load();
    const t = window.setInterval(load, REFRESH_MS);
    return () => {
      active = false;
      window.clearInterval(t);
    };
  }, []);

  return { data, error, loading };
};

export const formatWhen = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const diff = Date.now() - d.getTime();
  const hours = Math.round(diff / 3_600_000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
};
