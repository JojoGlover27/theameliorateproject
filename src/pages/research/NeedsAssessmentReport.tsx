import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResearchLayout from "@/components/research/ResearchLayout";
import CitationForm from "@/components/research/CitationForm";
import { Button } from "@/components/ui/button";

const COVER =
  "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=1600&q=70";

const StatCard = ({ stat, title, children }: { stat: string; title: string; children: React.ReactNode }) => (
  <div className="rounded-2xl border border-border p-6 md:p-8 bg-card">
    <div className="text-4xl md:text-5xl font-bold" style={{ color: "var(--r-purple)" }}>{stat}</div>
    <h3 className="mt-2 font-serif text-xl" style={{ color: "var(--r-purple)" }}>{title}</h3>
    <div className="mt-3 text-muted-foreground leading-relaxed">{children}</div>
  </div>
);

const PullQuote = ({ children }: { children: React.ReactNode }) => (
  <blockquote
    className="my-4 pl-4 py-2 italic text-muted-foreground"
    style={{ borderLeft: "4px solid var(--r-gold)" }}
  >
    {children}
  </blockquote>
);

const NeedsAssessmentReport = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <ResearchLayout>
      <Helmet>
        <title>Access, Safety, and Anonymity in HIV & Sexual Health Services for Queer People in Ghana — The Ameliorate Project</title>
        <meta name="description" content="A nationwide community needs assessment of 253 respondents documenting barriers to HIV and sexual health services for LGBTQI+ people in Ghana." />
        <link rel="canonical" href="https://theameliorateproject.lovable.app/research/access-safety-anonymity-ghana" />
      </Helmet>
      <Navbar />
      <main className="pt-24 md:pt-28 pb-20">
        <article className="container mx-auto px-4 md:px-8 max-w-3xl">
          <p className="text-xs font-bold tracking-widest mb-3" style={{ color: "var(--r-gold)" }}>RESEARCH REPORT</p>
          <h1 className="text-3xl md:text-5xl font-serif mb-4" style={{ color: "var(--r-purple)" }}>
            Access, Safety, and Anonymity in HIV &amp; Sexual Health Services for Queer People in Ghana
          </h1>
          <p className="text-base text-muted-foreground">The Ameliorate Project (Amelio) · Kumasi, Ghana · 2025–2026</p>
          <p className="text-sm text-muted-foreground mt-1">n = 253 Respondents (Nationwide) · Data collection: October 2025 – January 2026</p>

          <img src={COVER} alt="Community research conversation" loading="lazy" decoding="async" className="my-8 w-full rounded-2xl aspect-video object-cover" />

          <section className="prose prose-neutral max-w-none">
            <h2 className="font-serif" style={{ color: "var(--r-purple)" }}>Executive Summary</h2>
            <p>
              The Ameliorate Project conducted a nationwide community needs assessment to document barriers to HIV and sexual health service access among LGBTQI+ individuals and other key and marginalised populations in Ghana. Conducted between October 2025 and January 2026 across urban, peri-urban, and rural contexts nationwide, the assessment reached 253 respondents through secure, anonymous digital channels. The findings confirm that fear, stigma, and systemic distrust are the primary drivers of HIV service avoidance among these populations. Anonymity emerged not as a preference but as a survival strategy and clinical necessity. The overwhelming community endorsement of a privacy-first digital health platform demonstrates strong, unmet demand for alternative care pathways. These findings have directly informed the design of Synapse and Amelio&rsquo;s broader programme strategy.
            </p>

            <h2 className="font-serif" style={{ color: "var(--r-purple)" }}>Section 1 — Background and Context</h2>
            <p>Ghana&rsquo;s legislative environment creates significant and documented barriers to healthcare access for key and marginalised populations. LGBTQI+ individuals, people living with HIV, and sex workers face intersecting risks of stigma, discrimination, and legal vulnerability when seeking care through conventional health systems. However, the conditions driving withdrawal from HIV and health services predate formal legislation by more than a decade, and are rooted in a documented pattern of institutional hostility, media-driven stigma, and state action against the community.</p>
            <p>In May 2011, The Daily Graphic, one of Ghana&rsquo;s most widely read newspapers, published an article titled &ldquo;8,000 Gays in Two Regions; Majority Infected with HIV/AIDS,&rdquo; following a government-sponsored HIV surveillance study. The article made unsubstantiated claims linking homosexuality to HIV transmission and caused a major public backlash and moral panic that entrenched the association between LGBTQI+ identity and HIV stigma in public discourse. That same month, the Western Region Minister publicly ordered all gay people in the region to be rounded up and arrested, and called on landlords and tenants to inform on people suspected of being gay.</p>
            <p>In January 2021, Ghana&rsquo;s first LGBTQI+ community centre, opened by LGBT+ Rights Ghana in Accra to provide safe space and healthcare access support, was raided and shut down by National Security within weeks of opening, following calls from politicians and religious leaders for its closure. Later that year, in May 2021, 21 people were arrested by security forces while attending an LGBTQI+ paralegal training session and held in detention for three weeks, causing many to go into hiding. The cumulative effect of these events was a documented increase in fear of engagement with any formal or semi-formal institution, including health services.</p>
            <p>An HIV case manager publicly appearing on national television to attribute the prevalence of HIV to LGBTQI+ communities added another layer to this institutional hostility, reinforcing the message that health systems were not safe spaces for the community and causing further disengagement from services.</p>
            <p>The introduction of the Human Sexual Rights and Family Values Act formalised and intensified this pre-existing climate. The bill itself misused HIV surveillance data, citing a 2017 integrated biobehavioural study to wrongly claim that &ldquo;18.1 percent of people living with AIDS are gays,&rdquo; when the study actually reported HIV prevalence among MSM at 18.1 percent, a deliberate distortion that used health data as a tool of criminalisation. Program implementers serving LGBTQI+ communities reported that the legislative environment created a hostile environment for HIV prevention and outreach, with some organisations having to close offices due to safety concerns. The passage of the Act has since created a legal architecture in which visibility in clinical settings is experienced not as a path to care but as a source of danger, completing a trajectory that had been building for over a decade.</p>
            <p>Against this backdrop, The Ameliorate Project was founded to develop privacy-first health solutions that meet people where they are, without requiring them to be identified. Before designing any platform or programme, Amelio conducted a nationwide needs assessment to ensure that its approach was grounded in the lived realities and expressed preferences of the communities it aims to serve.</p>
            <p>This report presents the findings of that assessment, documents the barriers to HIV and sexual health service access among key populations in Ghana, and outlines the implications for digital health design, policy, and resource allocation.</p>

            <h2 className="font-serif" style={{ color: "var(--r-purple)" }}>Section 2 — Methodology and Study Design</h2>
            <h3>2.1 Study Instrument</h3>
            <p>The assessment was conducted using a structured, web-based survey instrument designed to capture both quantitative data and qualitative community perspectives. The survey covered five core domains: current healthcare-seeking behaviours and barriers to physical facilities; lived experiences of stigma and discrimination in health settings; attitudes toward telemedicine and digital health tools; preferences regarding anonymity and remote access; and community willingness to engage with the Synapse platform concept.</p>
            <h3>2.2 Sampling and Recruitment</h3>
            <p>Given the sensitive nature of the subject matter and the restrictive domestic legal environment, a non-probability purposive and snowball sampling approach was used. Respondents were recruited through community networks and peer referral via secure digital channels. This approach was chosen to prioritise safe access to a highly stigmatised population over broad statistical generalisability.</p>
            <h3>2.3 Ethical Considerations</h3>
            <p>Participation was entirely voluntary and strictly anonymous. No names, IP addresses, locations, or personally identifiable information were collected at any stage. The survey was conducted entirely remotely with zero in-person involvement, ensuring that participation carried no physical risk for respondents. The design of the assessment itself was intended to model the principles of safety and dignity that underpin Amelio&rsquo;s broader approach.</p>
            <h3>2.4 Sample</h3>
            <p>A total of 253 valid responses were received from respondents across urban, peri-urban, and rural contexts nationwide. The sample included representation from Greater Accra (38.2%), Ashanti (27.1%), Upper East (12.4%), and additional regions. All 253 respondents identified as LGBTQI+, with a significant proportion also disclosing HIV-positive status.</p>

            <h2 className="font-serif" style={{ color: "var(--r-purple)" }}>Section 3 — Respondent Demographics</h2>
            <p>The age distribution of respondents reflects the predominantly young profile of Amelio&rsquo;s target population, with over 90% of respondents aged between 18 and 34.</p>
          </section>

          <div className="my-6 overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "var(--r-purple)", color: "white" }}>
                  <th className="text-left px-4 py-3">Age Group</th>
                  <th className="text-left px-4 py-3">Share of Respondents</th>
                </tr>
              </thead>
              <tbody>
                {[["18 – 24", "36.5%"], ["25 – 34", "55.2%"], ["35 – 44", "7.5%"], ["45+", "0.8%"]].map(([a, b], i) => (
                  <tr key={a} style={{ background: i % 2 === 0 ? "var(--r-purple-soft)" : "white" }}>
                    <td className="px-4 py-3 text-foreground">{a}</td>
                    <td className="px-4 py-3 text-foreground">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground italic">Table 1: Age distribution of needs assessment respondents (n=253)</p>

          <section className="prose prose-neutral max-w-none mt-10">
            <h2 className="font-serif" style={{ color: "var(--r-purple)" }}>Section 4 — Key Findings</h2>
          </section>

          <div className="grid gap-5 mt-6">
            <StatCard stat="85.4%" title="Anonymity as a Determinant of Healthcare Access">
              <p>The single most significant finding was the near-universal relationship between guaranteed anonymity and willingness to seek care. When asked whether guaranteed anonymity would increase their likelihood of accessing healthcare and remaining on treatment, 85.4% of respondents answered affirmatively. This finding held uniformly across all age groups and geographic locations, confirming that the demand for identity protection is a structural condition of the healthcare access environment in Ghana, not an individual preference.</p>
              <p>This data point reframes anonymity from a privacy feature to a clinical precondition. A health system that cannot guarantee anonymity is, for this population, a health system that most people will not use.</p>
              <PullQuote>&ldquo;Thanks for making me feel safe, even online.&rdquo; — Survey respondent</PullQuote>
            </StatCard>

            <StatCard stat="76.8%" title="Preference for Remote Access">
              <p>More than three quarters of respondents indicated a clear preference for remote healthcare delivery over attending a physical facility. When read alongside the anonymity finding, this preference is not about convenience. It is about safety. Physical health facilities require presence, and presence means visibility. For individuals whose identities or health status expose them to discrimination or legal risk, the act of walking into a clinic carries structural risks that most patients never have to consider.</p>
              <PullQuote>&ldquo;I think this would be much better than sitting and waiting in queues to be tested to know your status.&rdquo; — Survey respondent</PullQuote>
              <PullQuote>&ldquo;Telemedicine is very good. It&rsquo;s the use of a phone, there&rsquo;s no stress, unlike going to the hospital.&rdquo; — Survey respondent</PullQuote>
              <PullQuote>&ldquo;Telecare is a great option that all queer people, regardless of status, should explore. It will improve every aspect of health for our community.&rdquo; — Survey respondent</PullQuote>
            </StatCard>

            <StatCard stat="88.3% / 75.8%" title="Platform Endorsement">
              <p>The community response to the Synapse platform concept was strongly affirmative. 88.3% of respondents said they would recommend the platform to peers in their community, and 75.8% believed it would improve their personal access to care. For an unlaunched concept, these figures signal both the depth of unmet need and the degree to which a privacy-first approach resonates with this population.</p>
              <PullQuote>&ldquo;An excellent initiative for queer people. I really like this.&rdquo; — Survey respondent</PullQuote>
              <PullQuote>&ldquo;It is very discreet. I would recommend it to my queer people and to anyone who would like to use this platform and medication.&rdquo; — Survey respondent</PullQuote>
              <PullQuote>&ldquo;This will encourage queer people to know their status.&rdquo; — Survey respondent</PullQuote>
            </StatCard>

            <StatCard stat="54.4%" title="Discreet Medication Delivery">
              <p>Over half of respondents expressed a preference for discreet last-mile delivery of HIV medications rather than collecting them from a facility. This finding has direct implications for ART and PrEP distribution models and informed the design of Synapse&rsquo;s anonymous token-based delivery system, which severs the link between a patient&rsquo;s legal identity and the receipt of medication.</p>
              <PullQuote>&ldquo;I was looking for PEP for days just to be safe. The only place I could find it was in Kumasi, and I couldn&rsquo;t make the trip. Let&rsquo;s do better and make it available for all.&rdquo; — Survey respondent</PullQuote>
              <PullQuote>&ldquo;HIV medications are hard to come by. We should do better and make them readily available to all.&rdquo; — Survey respondent</PullQuote>
              <PullQuote>&ldquo;For a queer person living with HIV, I feel the availability of ARVs are low.&rdquo; — Survey respondent</PullQuote>
            </StatCard>

            <StatCard stat="53.2%" title="Distrust of Existing Health Systems">
              <p>More than half of respondents expressed active distrust of the ability of existing health systems to maintain confidentiality around HIV status. This is not a perception gap, it reflects documented systemic failures in clinical confidentiality, including the disclosure of patient information to non-treating staff and the social consequences that follow.</p>
              <PullQuote>&ldquo;The stigma by health workers especially with people living with HIV is unbearable. With all the advances in treatment they still stigmatise people and inform other health workers who don&rsquo;t attend those people.&rdquo; — Survey respondent</PullQuote>
              <p>This finding has direct implications for any digital health intervention. A platform that stores identifiable data within systems accessible to health workers who may breach confidentiality does not solve the problem. It replicates it in a more technologically sophisticated form. Synapse&rsquo;s architecture, which structurally separates clinical data from patient identity, is a direct design response to this finding.</p>
            </StatCard>
          </div>

          <section className="prose prose-neutral max-w-none mt-10">
            <h2 className="font-serif" style={{ color: "var(--r-purple)" }}>Section 5 — Discussion</h2>
            <p>Taken together, these findings describe a population that is not disengaged from healthcare out of ignorance or indifference. They are disengaged because the current design of health systems makes engagement unsafe. The barriers are structural, not individual, and they are reinforced by the legislative environment, institutional culture, and the design of digital health infrastructure.</p>
            <p>The 85.4% anonymity finding is particularly significant because it reveals the gap between the design assumptions of conventional health systems and the lived realities of the populations those systems are mandated to serve. Mainstream digital health expansion in Ghana and across Sub-Saharan Africa typically increases the granularity of patient data, the integration of health records across institutions, and the linkage between health data and identity. For the population documented in this assessment, each of these developments increases risk rather than improving care.</p>
            <p>The qualitative responses reinforce this picture with specificity. Medication access is a concrete, documented problem, not just a perception. PEP and ARVs are genuinely hard to access in certain regions. Health worker stigma and confidentiality breaches are reported as lived experiences, not hypothetical concerns. And the appetite for a privacy-first alternative is not conditional: it is strong, consistent, and community-endorsed.</p>
            <p>These findings do not argue against digital health innovation in Ghana. They argue for intentional, privacy-preserving digital health innovation that treats anonymity as a design requirement rather than an afterthought.</p>

            <h2 className="font-serif" style={{ color: "var(--r-purple)" }}>Section 6 — Conclusion and Recommendations</h2>
            <p>The findings of this assessment confirm that anonymity is not a privacy preference among LGBTQI+ individuals and key populations in Ghana. It is a survival strategy, and in clinical terms, it is the minimum condition under which HIV testing, prevention, and treatment can safely occur for this population.</p>
            <p>Any digital health framework that ignores this finding will reproduce exclusion in a more technologically sophisticated form. Any funding stream that does not explicitly reach these populations will fail to close the epidemiological gaps that global HIV targets require.</p>
            <ul className="list-none pl-0 space-y-2">
              {[
                "Digital health platforms serving key populations in Ghana must adopt privacy-preserving architecture as a baseline requirement, not an optional feature.",
                "HIV medication supply chains, including ART, PrEP, and PEP, must be expanded to reach underserved regions, with discreet last-mile delivery options for populations who cannot safely collect medications from public facilities.",
                "Health worker training on confidentiality, stigma, and the rights of LGBTQI+ patients and people living with HIV must be strengthened and enforced.",
                "Funding streams targeting HIV elimination must explicitly include community-led, privacy-first digital health interventions as eligible programme types.",
                "Community voices and lived experience must be centred in the design, governance, and evaluation of all health programmes targeting key populations.",
              ].map((r) => (
                <li key={r} className="flex gap-2">
                  <span className="mt-1.5 h-2 w-2 rounded-full shrink-0" style={{ background: "var(--r-gold)" }} />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-14">
            <h2 className="text-2xl font-serif mb-3" style={{ color: "var(--r-purple)" }}>Cite This Publication</h2>
            <p className="text-muted-foreground text-sm">You are welcome to cite this publication in academic, policy, media, and educational work using the recommended citation below. Prior permission is not required. We simply appreciate being notified where possible.</p>
            <div className="mt-4 p-5 rounded-xl bg-muted text-sm italic">
              Kodie R. Access, Safety, and Anonymity in HIV &amp; Sexual Health Services for Queer People in Ghana. Kumasi: The Ameliorate Project; 2026. Available at: ameliorateproject.org/research/access-safety-anonymity-ghana
            </div>
            <p className="mt-6 font-semibold" style={{ color: "var(--r-purple)" }}>Cited or Referenced This Publication? Tell Us →</p>
            <CitationForm publicationTitle="Access, Safety, and Anonymity in HIV & Sexual Health Services for Queer People in Ghana" />
          </section>

          <section className="mt-14">
            <h2 className="text-2xl font-serif mb-3" style={{ color: "var(--r-purple)" }}>Sharing &amp; Reproduction</h2>
            <p className="text-muted-foreground text-sm">We encourage free sharing of this publication in its original form with attribution to The Ameliorate Project. If you intend to translate, adapt, reproduce substantial portions, or use this work for commercial purposes, please contact us for permission.</p>
            <Button asChild className="mt-4" style={{ background: "var(--r-purple)" }}>
              <a href="mailto:info@ameliorateproject.org">Contact Us</a>
            </Button>
            <p className="mt-4 text-xs text-muted-foreground">© The Ameliorate Project 2026. This work is licensed for non-commercial use with attribution. All other rights reserved.</p>
          </section>

          <section className="mt-14 border-t border-border pt-8">
            <h2 className="text-lg font-serif mb-3" style={{ color: "var(--r-purple)" }}>Related Publications</h2>
            <Link to="/research/anonymity-clinical-necessity" className="text-sm hover:underline" style={{ color: "var(--r-blue)" }}>
              → Why Anonymity is a Clinical Necessity: Evidence from a Nationwide Community Health Needs Assessment in Ghana (2026)
            </Link>
          </section>
        </article>
      </main>
      <Footer />
    </ResearchLayout>
  );
};

export default NeedsAssessmentReport;
