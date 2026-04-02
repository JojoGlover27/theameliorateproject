const stats = [
  { value: "330,000", label: "People living with HIV in Ghana", color: "text-destructive" },
  { value: "18.1–26.1%", label: "HIV prevalence among MSM in Ghana", color: "text-accent" },
  { value: "5.3–28.1%", label: "HIV prevalence transgender women in Ghana", color: "text-primary" },
  { value: "30–40%", label: "MSM HIV testing uptake in Ghana", color: "text-accent" },
];

const insights = [
  { pct: "54.4%", text: "prefer discreet delivery of HIV medications" },
  { pct: "53.2%", text: "do NOT trust current systems to keep HIV status confidential" },
  { pct: "76.8%", text: "prefer remote/phone/app access to HIV services over facilities" },
  { pct: "85.4%", text: "say anonymity would make them more likely to access and stay on treatment" },
  { pct: "75.8%", text: "believe a platform like Synapse would improve access to care" },
  { pct: "88.3%", text: "would recommend Synapse to other queer people" },
];

const WhyWeExistSection = () => (
  <section className="py-16 md:py-24 bg-secondary">
    <div className="container mx-auto px-4 md:px-8 max-w-4xl">
      <h2 className="text-3xl md:text-4xl text-secondary-foreground mb-4 text-center">Why We Exist</h2>
      <p className="text-center text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
        In Ghana, HIV disproportionately affects LGBTQI+ communities, yet stigma, confidentiality concerns, and limited inclusive services prevent many from accessing care.
      </p>

      <h3 className="text-xl font-semibold text-secondary-foreground text-center mb-6 font-sans uppercase tracking-wider">
        Key HIV & LGBTQI+ Statistics in Ghana
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.value} className="bg-card rounded-xl p-5 text-center shadow-sm border border-border">
            <p className={`text-2xl md:text-3xl font-bold ${s.color} mb-2`}>{s.value}</p>
            <p className="text-muted-foreground text-sm">{s.label}</p>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground mb-12">
        UNAIDS, Ghana AIDS Commission, NACP 2023–2024 reports
      </p>

      <h3 className="text-xl font-semibold text-secondary-foreground text-center mb-6 font-sans uppercase tracking-wider">
        Insights From Our Needs Assessment
      </h3>
      <div className="space-y-3 max-w-2xl mx-auto">
        {insights.map((i) => (
          <div key={i.pct} className="flex items-start gap-4 bg-card rounded-xl p-4 shadow-sm border border-border">
            <span className="text-xl md:text-2xl font-bold text-primary shrink-0 w-20 text-right">{i.pct}</span>
            <p className="text-card-foreground text-sm md:text-base">{i.text}</p>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-6">
        Sources: UNAIDS, 2024 Country Data; Ghana AIDS Commission 2023–2024 reports; NACP 2024 Reports; Ameliorate Project 2025 Needs Assessment (n=253)
      </p>
    </div>
  </section>
);

export default WhyWeExistSection;
