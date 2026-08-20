import { useMemo, useState } from "react";
import { ExternalLink, Radio, RefreshCw, AlertCircle } from "lucide-react";
import worldMap from "@/assets/world-map-dark.jpg";
import {
  LiveThreat,
  LiveThreatType,
  formatWhen,
  liveThreatTypes,
  useIntel,
} from "@/lib/digihub-intel";

const riskColor: Record<LiveThreat["risk"], string> = {
  High: "#ef4444",
  Medium: "#f97316",
  Low: "#facc15",
};

const project = (lat: number, lon: number) => ({
  left: `${((lon + 180) / 360) * 100}%`,
  top: `${((90 - lat) / 180) * 100}%`,
});

const ThreatMap = () => {
  const { data, loading, error } = useIntel();
  const [filter, setFilter] = useState<LiveThreatType | "All">("All");
  const [selected, setSelected] = useState<LiveThreat | null>(null);

  const threats = data?.threats ?? [];

  const shown = useMemo(
    () => (filter === "All" ? threats : threats.filter((t) => t.type === filter)),
    [filter, threats],
  );

  const recent = useMemo(() => threats.slice(0, 6), [threats]);

  return (
    <div className="relative rounded-3xl border border-white/10 bg-[#070b1c]/95 p-5 md:p-7 shadow-2xl backdrop-blur overflow-hidden h-full">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 8%, hsl(275 72% 40% / 0.35), transparent 55%), radial-gradient(circle at 90% 90%, hsl(200 85% 40% / 0.3), transparent 55%)",
        }}
      />
      <div className="relative">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-white">Digital Threat Map</h3>
            <p className="text-sm text-slate-400 flex items-center gap-2 mt-1">
              {loading ? (
                <RefreshCw size={13} className="text-slate-400 animate-spin" />
              ) : (
                <Radio size={13} className="text-emerald-400 animate-pulse" />
              )}
              Live signals from public news feeds, refreshed automatically.
            </p>
          </div>
          {data && (
            <span className="text-[11px] text-slate-400 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Updated {formatWhen(data.updatedAt)}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {(["All", ...liveThreatTypes] as const).map((t) => (
            <button
              key={t}
              onClick={() => {
                setFilter(t);
                setSelected(null);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                filter === t
                  ? "bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white border-transparent shadow-lg shadow-[#8B5CF6]/25"
                  : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_260px] gap-5">
          <div className="relative rounded-2xl overflow-hidden border border-white/10">
            <img src={worldMap} alt="World map" width={1600} height={800} loading="lazy" className="w-full block" />
            <div className="absolute inset-0">
              {shown.map((t) => {
                const pos = project(t.lat, t.lon);
                const active = selected?.url === t.url;
                return (
                  <button
                    key={`${t.country}-${t.type}`}
                    onClick={() => setSelected(t)}
                    style={{ left: pos.left, top: pos.top }}
                    aria-label={`${t.country}: ${t.type}`}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  >
                    <span
                      className={`block rounded-full transition-transform group-hover:scale-150 ${active ? "scale-150" : ""}`}
                      style={{
                        width: 12,
                        height: 12,
                        backgroundColor: riskColor[t.risk],
                        boxShadow: `0 0 0 4px ${riskColor[t.risk]}33`,
                      }}
                    />
                    <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-4 whitespace-nowrap text-[10px] text-white bg-black/70 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {t.country}
                    </span>
                  </button>
                );
              })}
            </div>

            {(loading || error || (!loading && threats.length === 0)) && (
              <div className="absolute inset-0 grid place-items-center bg-[#070b1c]/70 backdrop-blur-sm px-6 text-center">
                {loading ? (
                  <p className="text-sm text-slate-300 flex items-center gap-2">
                    <RefreshCw size={14} className="animate-spin" /> Pulling live threat signals...
                  </p>
                ) : (
                  <p className="text-sm text-slate-300 flex items-center gap-2">
                    <AlertCircle size={14} className="text-amber-400" />
                    {error ?? "No live signals returned right now. The map updates automatically."}
                  </p>
                )}
              </div>
            )}

            <div className="absolute bottom-3 left-3 flex gap-3 text-[10px] text-slate-300 bg-black/50 rounded-lg px-3 py-2">
              {(["High", "Medium", "Low"] as const).map((r) => (
                <span key={r} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: riskColor[r] }} /> {r} risk
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-wider text-slate-400 mb-3">Latest signals</p>
            {recent.length === 0 ? (
              <p className="text-xs text-slate-500">Waiting for the next feed refresh.</p>
            ) : (
              <ul className="space-y-3">
                {recent.map((t) => (
                  <li key={`${t.country}-${t.type}-${t.url}`}>
                    <button onClick={() => setSelected(t)} className="text-left w-full group">
                      <span className="flex items-center gap-2 text-sm text-white group-hover:text-[#F5A524] transition-colors">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: riskColor[t.risk] }} />
                        {t.country}
                      </span>
                      <span className="block text-[11px] text-slate-400 pl-4">
                        {t.type} · {formatWhen(t.date)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {selected && (
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h4 className="text-lg font-semibold text-white">{selected.country}</h4>
              <span
                className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${riskColor[selected.risk]}22`, color: riskColor[selected.risk] }}
              >
                {selected.risk} risk · {selected.type}
              </span>
              <span className="text-xs text-slate-400">{formatWhen(selected.date)}</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{selected.headline}</p>
            <a
              href={selected.url}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#3B82F6] px-4 py-2 text-xs font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Read the report on {selected.source} <ExternalLink size={11} />
            </a>
          </div>
        )}

        <p className="mt-4 text-[11px] text-slate-500 leading-relaxed">
          Every pin comes from a published news report and links straight to its source. Nothing on this
          map is simulated.
        </p>
      </div>
    </div>
  );
};

export default ThreatMap;
