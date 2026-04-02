import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is Synapse?",
    a: "Synapse is a privacy-first app that allows anonymous access to essential HIV services without any personal information or in-person contact. It's built for those who face barriers like stigma or fear of disclosure.",
  },
  {
    q: "How do I get started?",
    a: "Download Synapse from the Google Play Store or Apple App Store (coming soon). Create a unique ID during registration — no name, phone, or email required. Start exploring services immediately.",
  },
  {
    q: "Is Synapse truly anonymous?",
    a: "Yes. We use generated unique IDs only, with end-to-end encryption and no data storage. Your interactions are private, and deliveries use third-party couriers with no branding or traceable details.",
  },
  {
    q: "What services does Synapse offer?",
    a: "Anonymous telemedicine consultations, HIV/Hepatitis self-test kits, PrEP/PEP initiation, ART adherence support and refills, discreet delivery of condoms, lubricants, and nutritional packages for better health outcomes.",
  },
  {
    q: "How do deliveries work?",
    a: "Orders are fulfilled via secure, anonymous third-party couriers. You choose a safe drop-off location (e.g., locker or neutral spot). Packaging is plain and tamper-evident.",
  },
  {
    q: "Is there any cost?",
    a: "All core services are free during the pilot phase. Future phases may include optional small contributions for sustainability, but access remains barrier-free.",
  },
  {
    q: "Who can use Synapse?",
    a: "Anyone 18+ in Ghana seeking confidential HIV-related support, especially LGBTQI+ individuals facing stigma or access challenges.",
  },
  {
    q: "What if I have technical issues?",
    a: "Use the in-app anonymous feedback form or contact our support line (0244 677 743) — we'll guide you without collecting personal info.",
  },
  {
    q: "How does Synapse ensure safety and quality?",
    a: "All clinicians are trained in affirming, non-judgmental care. The platform complies with global privacy standards, and we regularly audit for security.",
  },
  {
    q: "Can I get nutritional support?",
    a: "Yes — targeted packages (fortified supplements, high-protein foods) are available for HIV-positive users to improve adherence and viral suppression.",
  },
];

const FaqSection = () => (
  <section id="faq" className="py-16 md:py-24 bg-secondary">
    <div className="container mx-auto px-4 md:px-8 max-w-3xl">
      <h2 className="text-3xl md:text-4xl text-secondary-foreground mb-8">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border-border">
            <AccordionTrigger className="text-left text-base font-medium text-secondary-foreground hover:text-primary">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FaqSection;
