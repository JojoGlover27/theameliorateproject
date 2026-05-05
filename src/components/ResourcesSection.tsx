import { AnimatedSection } from "@/components/AnimatedSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Article = { title: string; summary: string; source: string; url: string };
type Topic = { title: string; intro: string; articles: Article[] };

const topics: Topic[] = [
  {
    title: "HIV & Prevention Basics",
    intro:
      "Evidence-based foundations on how HIV is transmitted, prevented, and treated, drawn from WHO, CDC, and peer-reviewed research.",
    articles: [
      {
        title: "What is PrEP and how does it work?",
        summary:
          "Daily oral PrEP (tenofovir/emtricitabine) reduces the risk of sexually acquired HIV by about 99% when taken as prescribed (CDC, 2022).",
        source: "CDC, Pre-Exposure Prophylaxis",
        url: "https://www.cdc.gov/hiv/risk/prep/index.html",
      },
      {
        title: "PEP: What to do after potential exposure",
        summary:
          "Post-exposure prophylaxis must be started within 72 hours of a possible HIV exposure and taken for 28 days to be effective (WHO Guidelines).",
        source: "WHO, Post-Exposure Prophylaxis",
        url: "https://www.who.int/news-room/questions-and-answers/item/hiv-post-exposure-prophylaxis",
      },
      {
        title: "Understanding ART and viral suppression (U=U)",
        summary:
          "People living with HIV who achieve and maintain an undetectable viral load on ART cannot sexually transmit the virus, Undetectable = Untransmittable (PARTNER & HPTN 052 studies).",
        source: "The Lancet, PARTNER Study",
        url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(19)30418-0/fulltext",
      },
      {
        title: "Common myths about HIV in our community",
        summary:
          "HIV is not transmitted by casual contact, saliva, sweat, or shared utensils. Stigma, not the virus, drives many of the harms LGBTQI+ people face.",
        source: "UNAIDS, Fact Sheet",
        url: "https://www.unaids.org/en/resources/fact-sheet",
      },
    ],
  },
  {
    title: "Testing & Results Guidance",
    intro:
      "Step-by-step support for self-testing, interpreting results, and confident next steps.",
    articles: [
      {
        title: "How to use an HIV self-test correctly",
        summary:
          "WHO recommends HIV self-testing as a safe and accurate option that increases testing uptake among key populations, including men who have sex with men.",
        source: "WHO, HIV Self-Testing",
        url: "https://www.who.int/publications/i/item/9789240026025",
      },
      {
        title: "Reading your result: reactive, non-reactive, or invalid",
        summary:
          "A reactive (positive) self-test result must always be confirmed with a clinical test. Synapse clinicians can guide you through confirmation anonymously.",
        source: "CDC, HIV Testing",
        url: "https://www.cdc.gov/hiv/testing/index.html",
      },
      {
        title: "Window periods explained",
        summary:
          "Most antibody tests detect HIV 23–90 days after exposure. Knowing the window period helps you test at the right time and re-test when needed.",
        source: "CDC, Testing Window Periods",
        url: "https://www.cdc.gov/hiv/basics/hiv-testing/test-types.html",
      },
    ],
  },
  {
    title: "Mental Health & Wellbeing",
    intro:
      "LGBTQI+ people face disproportionate rates of depression, anxiety, and minority stress. Support is part of HIV care.",
    articles: [
      {
        title: "Coping with stigma and disclosure fears",
        summary:
          "Meta-analyses link HIV-related stigma to poorer ART adherence and worse mental health outcomes; peer support and affirming care significantly reduce harm.",
        source: "Journal of the International AIDS Society",
        url: "https://onlinelibrary.wiley.com/doi/10.1002/jia2.25557",
      },
      {
        title: "Minority stress and LGBTQI+ mental health",
        summary:
          "Meyer's minority stress model explains how chronic stigma, prejudice, and concealment elevate mental health risks, and why affirming spaces matter.",
        source: "APA, Minority Stress",
        url: "https://www.apa.org/pi/lgbt/resources/policy/minority-stress",
      },
      {
        title: "Self-care and resilience practices that work",
        summary:
          "Evidence supports cognitive-behavioural strategies, mindfulness, peer connection, and consistent sleep as protective factors for people living with HIV.",
        source: "WHO, Mental Health & HIV",
        url: "https://www.who.int/teams/mental-health-and-substance-use",
      },
    ],
  },
  {
    title: "Know Your Options in Ghana",
    intro:
      "Local context, national guidelines, and safety strategies tailored to LGBTQI+ realities in Ghana.",
    articles: [
      {
        title: "Ghana National HIV Guidelines (simplified)",
        summary:
          "Ghana's National AIDS/STI Control Programme (NACP) endorses test-and-treat: anyone testing positive should start ART immediately, regardless of CD4 count.",
        source: "Ghana NACP",
        url: "https://www.ghanahealthservice.org/nacp/",
      },
      {
        title: "Safe digital navigation in challenging environments",
        summary:
          "Use end-to-end encrypted apps, disable location sharing, and create separate accounts for health-related communication to protect privacy.",
        source: "EFF, Surveillance Self-Defense",
        url: "https://ssd.eff.org/",
      },
      {
        title: "Sub-Saharan Africa: HIV among MSM",
        summary:
          "MSM in sub-Saharan Africa carry a disproportionate HIV burden and face unique barriers to care, anonymous, community-led models improve engagement.",
        source: "The Lancet HIV",
        url: "https://www.thelancet.com/journals/lanhiv/home",
      },
    ],
  },
  {
    title: "Nutrition & Healthy Living on Medication",
    intro:
      "Good nutrition supports immune function, ART tolerability, and viral suppression.",
    articles: [
      {
        title: "Nutrition for people living with HIV",
        summary:
          "WHO recommends balanced macronutrient intake, micronutrient sufficiency, and food safety as integral to HIV care, especially during ART initiation.",
        source: "WHO, Nutrition & HIV",
        url: "https://www.who.int/publications/i/item/9789241591966",
      },
      {
        title: "Adherence reminders and routines that stick",
        summary:
          "Pairing ART with a daily anchor (a meal, alarm, or routine) improves adherence, the strongest predictor of viral suppression.",
        source: "AIDS & Behavior, Adherence Research",
        url: "https://link.springer.com/journal/10461",
      },
    ],
  },
];

const ResourcesSection = () => (
  <section id="resources" className="py-16 md:py-24 bg-secondary">
    <div className="container mx-auto px-4 md:px-8 max-w-3xl">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl text-secondary-foreground mb-4">
          Resources & Information
        </h2>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Clear, affirming, and evidence-based reading, tap any topic to expand the articles.
        </p>
      </AnimatedSection>

      <AnimatedSection>
        <Accordion type="single" collapsible className="w-full space-y-3">
          {topics.map((t, i) => (
            <AccordionItem
              key={i}
              value={`topic-${i}`}
              className="border border-border rounded-lg bg-card px-4 md:px-5"
            >
              <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-secondary-foreground hover:text-primary py-4">
                {t.title}
              </AccordionTrigger>
              <AccordionContent className="pt-0 pb-5">
                <p className="text-muted-foreground mb-4 italic">{t.intro}</p>
                <ul className="space-y-4">
                  {t.articles.map((a, j) => (
                    <li
                      key={j}
                      className="border-l-2 border-primary/40 pl-4"
                    >
                      <a
                        href={a.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-secondary-foreground hover:text-primary transition-colors block mb-1"
                      >
                        {a.title}
                      </a>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-1">
                        {a.summary}
                      </p>
                      <span className="text-xs uppercase tracking-wider text-muted-foreground/80">
                        Source: {a.source}
                      </span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </AnimatedSection>

      <AnimatedSection>
        <p className="mt-8 text-muted-foreground italic text-center">
          All summaries cite WHO, CDC, UNAIDS, or peer-reviewed research and are reviewed by community clinicians.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default ResourcesSection;
