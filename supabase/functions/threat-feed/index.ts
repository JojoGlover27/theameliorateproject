// Live digital threat feed.
// Real, unmodified article data from the GDELT Project (global news monitoring).
// Nothing is invented: every entry corresponds to real articles from real outlets,
// with the country reported by GDELT and a link back to the source.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const CACHE_HOURS = 3;

const QUERIES: { type: string; query: string; must: string[] }[] = [
  {
    type: "Internet Shutdowns",
    query: '("internet shutdown" OR "internet blackout" OR "internet restrictions" OR "social media ban") sourcelang:english',
    must: ["shutdown", "blackout", "restrict", "ban", "blocked", "outage"],
  },
  {
    type: "Data Breaches",
    query: '("data breach" OR "data leak" OR "hacked database" OR "ransomware attack") sourcelang:english',
    must: ["breach", "leak", "hack", "ransomware", "stolen", "exposed"],
  },
  {
    type: "Scams",
    query: '("online scam" OR "phishing scam" OR "romance scam" OR "mobile money fraud" OR "sextortion") sourcelang:english',
    must: ["scam", "phishing", "fraud", "sextortion", "extortion", "fake"],
  },
  {
    type: "Surveillance Laws",
    query: '("surveillance law" OR "spyware" OR "mass surveillance" OR "encryption backdoor" OR "digital rights") sourcelang:english',
    must: ["surveillance", "spyware", "encryption", "privacy law", "digital rights", "monitor"],
  },
];

// Country centroids (geographic fact table, used only to place a real country on the map).
const CENTROIDS: Record<string, [number, number]> = {
  "Ghana": [7.9, -1.0], "Nigeria": [9.1, 8.7], "Kenya": [-0.02, 37.9], "Uganda": [1.4, 32.3],
  "Tanzania": [-6.4, 34.9], "South Africa": [-30.6, 22.9], "Ethiopia": [9.1, 40.5], "Egypt": [26.8, 30.8],
  "Morocco": [31.8, -7.1], "Senegal": [14.5, -14.5], "Cameroon": [7.4, 12.4], "Zimbabwe": [-19.0, 29.2],
  "Zambia": [-13.1, 27.8], "Rwanda": [-1.9, 29.9], "Sudan": [12.9, 30.2], "Somalia": [5.2, 46.2],
  "Ivory Coast": [7.5, -5.5], "Cote dIvoire": [7.5, -5.5], "Liberia": [6.4, -9.4], "Sierra Leone": [8.5, -11.8],
  "Togo": [8.6, 0.8], "Benin": [9.3, 2.3], "Burkina Faso": [12.2, -1.6], "Mali": [17.6, -4.0],
  "Niger": [17.6, 8.1], "Chad": [15.5, 18.7], "Malawi": [-13.3, 34.3], "Mozambique": [-18.7, 35.5],
  "Botswana": [-22.3, 24.7], "Namibia": [-22.9, 18.5], "Angola": [-11.2, 17.9], "Congo": [-0.2, 15.8],
  "United States": [39.0, -98.0], "Canada": [56.1, -106.3], "Mexico": [23.6, -102.5], "Brazil": [-14.2, -51.9],
  "Argentina": [-38.4, -63.6], "Chile": [-35.7, -71.5], "Colombia": [4.6, -74.3], "Peru": [-9.2, -75.0],
  "Venezuela": [6.4, -66.6], "Jamaica": [18.1, -77.3], "Trinidad And Tobago": [10.7, -61.2],
  "United Kingdom": [54.0, -2.0], "Ireland": [53.1, -8.2], "France": [46.2, 2.2], "Germany": [51.2, 10.5],
  "Spain": [40.5, -3.7], "Portugal": [39.4, -8.2], "Italy": [41.9, 12.6], "Netherlands": [52.1, 5.3],
  "Belgium": [50.5, 4.5], "Switzerland": [46.8, 8.2], "Austria": [47.5, 14.6], "Sweden": [60.1, 18.6],
  "Norway": [60.5, 8.5], "Denmark": [56.3, 9.5], "Finland": [61.9, 25.7], "Poland": [51.9, 19.1],
  "Ukraine": [48.4, 31.2], "Russia": [61.5, 105.3], "Turkey": [38.9, 35.2], "Greece": [39.1, 21.8],
  "Romania": [45.9, 25.0], "Hungary": [47.2, 19.5], "Czech Republic": [49.8, 15.5], "Serbia": [44.0, 21.0],
  "Israel": [31.0, 34.9], "Palestine": [31.9, 35.2], "Saudi Arabia": [23.9, 45.1], "Iran": [32.4, 53.7],
  "Iraq": [33.2, 43.7], "United Arab Emirates": [23.4, 53.8], "Qatar": [25.4, 51.2], "Jordan": [30.6, 36.2],
  "Lebanon": [33.9, 35.9], "Pakistan": [30.4, 69.3], "India": [21.0, 78.0], "Bangladesh": [23.7, 90.4],
  "Sri Lanka": [7.9, 80.8], "Nepal": [28.4, 84.1], "Afghanistan": [33.9, 67.7], "China": [35.9, 104.2],
  "Japan": [36.2, 138.3], "South Korea": [35.9, 127.8], "North Korea": [40.3, 127.5], "Taiwan": [23.7, 121.0],
  "Hong Kong": [22.3, 114.2], "Vietnam": [14.1, 108.3], "Thailand": [15.9, 101.0], "Cambodia": [12.6, 105.0],
  "Myanmar": [21.9, 95.96], "Malaysia": [4.2, 101.98], "Singapore": [1.35, 103.8], "Indonesia": [-2.5, 118.0],
  "Philippines": [12.9, 121.8], "Australia": [-25.3, 133.8], "New Zealand": [-40.9, 174.9],
  "Kazakhstan": [48.0, 66.9], "Uzbekistan": [41.4, 64.6], "Azerbaijan": [40.1, 47.6], "Belarus": [53.7, 27.95],
};

interface Article {
  url: string;
  title: string;
  seendate: string;
  domain: string;
  sourcecountry: string;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const parseDate = (s: string) => {
  // GDELT format: 20260817T193000Z
  const m = /^(\d{4})(\d{2})(\d{2})/.exec(s);
  return m ? `${m[1]}-${m[2]}-${m[3]}` : "";
};

async function fetchType(q: { type: string; query: string; must: string[] }) {
  const url =
    "https://api.gdeltproject.org/api/v2/doc/doc?" +
    new URLSearchParams({
      query: q.query,
      mode: "artlist",
      maxrecords: "75",
      format: "json",
      timespan: "7d",
      sort: "datedesc",
    }).toString();

  const res = await fetch(url, { headers: { "User-Agent": "AmelioDigiHub/1.0" } });
  const text = await res.text();
  let data: { articles?: Article[] };
  try {
    data = JSON.parse(text);
  } catch {
    return [];
  }
  const articles = (data.articles ?? []).filter((a) => {
    const t = (a.title ?? "").toLowerCase();
    return a.sourcecountry && CENTROIDS[a.sourcecountry] && q.must.some((k) => t.includes(k));
  });

  const byCountry = new Map<string, Article[]>();
  for (const a of articles) {
    const list = byCountry.get(a.sourcecountry) ?? [];
    // de-duplicate syndicated copies of the same headline
    if (!list.some((x) => x.title === a.title)) list.push(a);
    byCountry.set(a.sourcecountry, list);
  }

  return [...byCountry.entries()].map(([country, list]) => {
    const [lat, lon] = CENTROIDS[country];
    const count = list.length;
    return {
      country,
      lat,
      lon,
      type: q.type,
      risk: count >= 5 ? "High" : count >= 2 ? "Medium" : "Low",
      reports: count,
      date: parseDate(list[0].seendate),
      summary: list[0].title,
      sources: list.slice(0, 3).map((a) => ({ label: a.domain, url: a.url })),
    };
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const force = new URL(req.url).searchParams.get("force") === "1";

    const { data: cached } = await supabase
      .from("threat_snapshots")
      .select("payload, created_at")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!force && cached) {
      const ageH = (Date.now() - new Date(cached.created_at).getTime()) / 3_600_000;
      if (ageH < CACHE_HOURS) return json({ ...(cached.payload as object), cached: true });
    }

    const threats: unknown[] = [];
    for (let i = 0; i < QUERIES.length; i++) {
      if (i > 0) await sleep(6000); // GDELT asks for one request every 5 seconds
      try {
        threats.push(...(await fetchType(QUERIES[i])));
      } catch (_e) {
        // keep whatever succeeded
      }
    }

    if (!threats.length) {
      if (cached) return json({ ...(cached.payload as object), cached: true, stale: true });
      return json({ threats: [], updatedAt: new Date().toISOString(), empty: true });
    }

    threats.sort((a: any, b: any) => (b.date > a.date ? 1 : b.date < a.date ? -1 : b.reports - a.reports));

    const payload = {
      threats,
      updatedAt: new Date().toISOString(),
      source: "GDELT Project global news monitoring",
    };

    await supabase.from("threat_snapshots").insert({ payload });
    // keep the table small
    const { data: old } = await supabase
      .from("threat_snapshots")
      .select("id")
      .order("created_at", { ascending: false })
      .range(20, 200);
    if (old?.length) {
      await supabase.from("threat_snapshots").delete().in("id", old.map((o) => o.id));
    }

    return json(payload);
  } catch (e) {
    return json({ threats: [], error: String(e) }, 200);
  }
});
