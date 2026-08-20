// DigiHub live threat intelligence.
// Aggregates public news feeds (Google News RSS) into country-tagged threat
// signals and current scam alerts. No data is invented: every item returned
// carries the headline, publisher and source URL it came from.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type ThreatType = "Scam" | "Surveillance" | "Data Breach" | "Censorship" | "Harassment";

const COUNTRIES: Record<string, [number, number]> = {
  Ghana: [7.95, -1.03], Nigeria: [9.08, 8.68], Kenya: [-0.02, 37.9], "South Africa": [-30.56, 22.94],
  Uganda: [1.37, 32.29], Tanzania: [-6.37, 34.89], Ethiopia: [9.15, 40.49], Egypt: [26.82, 30.8],
  Morocco: [31.79, -7.09], Senegal: [14.5, -14.45], Zimbabwe: [-19.02, 29.15], Zambia: [-13.13, 27.85],
  Cameroon: [7.37, 12.35], "Ivory Coast": [7.54, -5.55], Rwanda: [-1.94, 29.87], Malawi: [-13.25, 34.3],
  "United States": [39.83, -98.58], Canada: [56.13, -106.35], Mexico: [23.63, -102.55],
  Brazil: [-14.24, -51.93], Argentina: [-38.42, -63.62], Colombia: [4.57, -74.3], Chile: [-35.68, -71.54],
  "United Kingdom": [55.38, -3.44], Ireland: [53.14, -7.69], France: [46.23, 2.21], Germany: [51.17, 10.45],
  Spain: [40.46, -3.75], Italy: [41.87, 12.57], Netherlands: [52.13, 5.29], Belgium: [50.5, 4.47],
  Sweden: [60.13, 18.64], Norway: [60.47, 8.47], Denmark: [56.26, 9.5], Finland: [61.92, 25.75],
  Poland: [51.92, 19.15], Ukraine: [48.38, 31.17], Russia: [61.52, 105.32], Turkey: [38.96, 35.24],
  Greece: [39.07, 21.82], Portugal: [39.4, -8.22], Switzerland: [46.82, 8.23], Austria: [47.52, 14.55],
  Hungary: [47.16, 19.5], Romania: [45.94, 24.97], Serbia: [44.02, 21.01],
  India: [20.59, 78.96], Pakistan: [30.38, 69.35], Bangladesh: [23.68, 90.36], China: [35.86, 104.2],
  Japan: [36.2, 138.25], "South Korea": [35.91, 127.77], Indonesia: [-0.79, 113.92],
  Philippines: [12.88, 121.77], Vietnam: [14.06, 108.28], Thailand: [15.87, 100.99],
  Malaysia: [4.21, 101.98], Singapore: [1.35, 103.82], Israel: [31.05, 34.85], Iran: [32.43, 53.69],
  Iraq: [33.22, 43.68], "Saudi Arabia": [23.89, 45.08], "United Arab Emirates": [23.42, 53.85],
  Qatar: [25.35, 51.18], Jordan: [30.59, 36.24], Lebanon: [33.85, 35.86], Afghanistan: [33.94, 67.71],
  Australia: [-25.27, 133.78], "New Zealand": [-40.9, 174.89], Jamaica: [18.11, -77.3],
  "Trinidad and Tobago": [10.69, -61.22], Uruguay: [-32.52, -55.77], Peru: [-9.19, -75.02],
};

const ALIASES: Record<string, string> = {
  US: "United States", USA: "United States", "U.S.": "United States", America: "United States",
  UK: "United Kingdom", Britain: "United Kingdom", England: "United Kingdom", Scotland: "United Kingdom",
  "Côte d'Ivoire": "Ivory Coast", UAE: "United Arab Emirates", Dubai: "United Arab Emirates",
  Nairobi: "Kenya", Accra: "Ghana", Lagos: "Nigeria", Abuja: "Nigeria", Kampala: "Uganda",
  Johannesburg: "South Africa", "Cape Town": "South Africa", London: "United Kingdom",
  "New York": "United States", California: "United States", Texas: "United States",
  Delhi: "India", Mumbai: "India", Manila: "Philippines", Seoul: "South Korea", Tokyo: "Japan",
};

// Public RSS feeds from established security, consumer-protection and digital
// rights publishers. Items are classified by keyword; nothing is invented.
const FEEDS: { url: string; source: string }[] = [
  { url: "https://www.bleepingcomputer.com/feed/", source: "BleepingComputer" },
  { url: "https://feeds.feedburner.com/TheHackersNews", source: "The Hacker News" },
  { url: "https://krebsonsecurity.com/feed/", source: "Krebs on Security" },
  { url: "https://www.cisa.gov/cybersecurity-advisories/all.xml", source: "CISA" },
  { url: "https://www.accessnow.org/feed/", source: "Access Now" },
  { url: "https://www.eff.org/rss/updates.xml", source: "EFF" },
  { url: "https://consumer.ftc.gov/blog/rss", source: "FTC Consumer Alerts" },
  { url: "https://www.ncsc.gov.uk/api/1/services/v1/news-rss-feed.xml", source: "UK NCSC" },
];

const TYPE_RULES: { type: ThreatType; re: RegExp }[] = [
  { type: "Scam", re: /(scam|phish|fraud|sextortion|impersonat|smishing|romance sca|sim swap|fake app)/i },
  { type: "Data Breach", re: /(breach|leaked|exposed data|stolen data|ransomware|hacked|infostealer)/i },
  { type: "Surveillance", re: /(spyware|surveillance|pegasus|stalkerware|facial recognition|wiretap)/i },
  { type: "Censorship", re: /(censor|internet shutdown|blocked|ban on|throttl|firewall)/i },
  { type: "Harassment", re: /(harassment|doxx|abuse|lgbt|queer|outing|hate speech|extort)/i },
];


const RISK_BY_TYPE: Record<ThreatType, "High" | "Medium" | "Low"> = {
  Scam: "High", "Data Breach": "High", Surveillance: "High", Censorship: "Medium", Harassment: "Medium",
};

interface Item {
  title: string;
  link: string;
  source: string;
  date: string;
  type: ThreatType;
  body: string;
}

const decode = (s: string) =>
  s
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/<[^>]+>/g, "")
    .trim();

const pick = (block: string, tag: string) => {
  const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return m ? decode(m[1]) : "";
};

const classify = (text: string): ThreatType | null => {
  for (const r of TYPE_RULES) if (r.re.test(text)) return r.type;
  return null;
};

async function fetchFeed(url: string, source: string): Promise<Item[]> {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; DigiHubIntel/1.0; +https://theameliorateproject.lovable.app)",
      Accept: "application/rss+xml, application/xml, text/xml, */*",
    },
  });
  if (!res.ok) throw new Error(`feed ${res.status}`);
  const xml = await res.text();
  const blocks = xml.split(/<item[\s>]|<entry[\s>]/).slice(1);
  const items: Item[] = [];
  for (const b of blocks.slice(0, 25)) {
    const title = pick(b, "title");
    let link = pick(b, "link");
    if (!link) {
      const m = b.match(/<link[^>]*href="([^"]+)"/);
      link = m ? m[1] : "";
    }
    const date = pick(b, "pubDate") || pick(b, "updated") || pick(b, "published");
    const body = `${title} ${pick(b, "description") || pick(b, "summary")}`;
    const type = classify(body);
    if (!title || !link || !type) continue;
    items.push({ title, link, source, date, type, body });
  }
  return items;
}

const matchCountry = (text: string): string | null => {
  for (const [alias, target] of Object.entries(ALIASES)) {
    if (new RegExp(`\\b${alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(text)) return target;
  }
  for (const name of Object.keys(COUNTRIES)) {
    if (new RegExp(`\\b${name}\\b`, "i").test(text)) return name;
  }
  return null;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const diag: string[] = [];
    const results = await Promise.all(
      FEEDS.map((f) =>
        fetchFeed(f.url, f.source).catch((e) => {
          diag.push(`${f.source}: ${e}`);
          return [] as Item[];
        }),
      ),
    );
    const items = results.flat().filter((i) => i.title && i.link);

    const seen = new Set<string>();
    const threats: unknown[] = [];
    const alerts: unknown[] = [];

    for (const i of items) {
      const iso = i.date ? new Date(i.date).toISOString() : new Date().toISOString();
      const country = matchCountry(i.body || i.title);
      if (country && !seen.has(`${country}-${i.type}`)) {
        seen.add(`${country}-${i.type}`);
        const [lat, lon] = COUNTRIES[country];
        threats.push({
          country,
          lat,
          lon,
          type: i.type,
          risk: RISK_BY_TYPE[i.type],
          headline: i.title,
          source: i.source,
          url: i.link,
          date: iso,
        });
      }
      if ((i.type === "Scam" || i.type === "Harassment") && alerts.length < 14) {
        alerts.push({
          id: i.link,
          title: i.title,
          source: i.source,
          url: i.link,
          date: iso,
          severity: RISK_BY_TYPE[i.type],
        });
      }
    }

    threats.sort((a, b) => ((b as { date: string }).date > (a as { date: string }).date ? 1 : -1));
    alerts.sort((a, b) => ((b as { date: string }).date > (a as { date: string }).date ? 1 : -1));

    return new Response(
      JSON.stringify({ updatedAt: new Date().toISOString(), threats, alerts, diag, fetched: items.length }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=900",
        },
      },
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
