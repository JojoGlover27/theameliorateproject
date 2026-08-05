// Local, device-only storage for DigiHub progress. Nothing is sent to a server,
// which keeps the assessment anonymous by design.

export interface PrivacyScoreResult {
  score: number;
  band: "Poor" | "Fair" | "Good" | "Excellent";
  weakAreas: string[];
  recommendations: string[];
  takenAt: string;
}

const SCORE_KEY = "digihub.privacyScore";
const PLAN_KEY = "digihub.planProgress";
const CLINIC_KEY = "digihub.clinics";

const read = <T,>(key: string): T | null => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
};

const write = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("digihub-store"));
  } catch {
    /* storage unavailable */
  }
};

export const getScore = () => read<PrivacyScoreResult>(SCORE_KEY);
export const saveScore = (result: PrivacyScoreResult) => write(SCORE_KEY, result);

export const getPlanProgress = () => read<Record<string, boolean>>(PLAN_KEY) ?? {};
export const savePlanProgress = (progress: Record<string, boolean>) => write(PLAN_KEY, progress);

export const getClinics = () => read<string[]>(CLINIC_KEY) ?? [];
export const addClinic = (slug: string) => {
  const list = getClinics();
  if (!list.includes(slug)) write(CLINIC_KEY, [...list, slug]);
};

export const band = (score: number): PrivacyScoreResult["band"] =>
  score >= 85 ? "Excellent" : score >= 65 ? "Good" : score >= 40 ? "Fair" : "Poor";
