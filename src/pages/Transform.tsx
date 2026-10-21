import { useEffect } from "react";
import { Users, HeartPulse, HeartHandshake, ShieldCheck, Sprout, MessagesSquare, MessageCircle, Check, ArrowDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import RotatingKeywordsBar from "@/components/RotatingKeywordsBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { WorkshopListing, ResourceListing } from "@/components/transform/TransformListings";
import { TRANSFORM_WHATSAPP_INVITE_URL, isValidExternalUrl, transformAreas, transformCommitments, transformPrivacyGuidance } from "@/data/transform";
import wordmark from "@/assets/transform-wordmark.png.asset.json";

const icons = [Users, HeartPulse, HeartHandshake, ShieldCheck, Sprout, MessagesSquare];
const tints = ["tint-blue", "tint-pink", "tint-purple", "tint-teal", "tint-gold", "tint-blue"];
const wrap = "container mx-auto max-w-6xl px-4 md:px-8";

function JoinCommunity() {
  const valid = isValidExternalUrl(TRANSFORM_WHATSAPP_INVITE_URL);
  if (!valid) return <Button disabled className="h-auto whitespace-normal py-3">Community invitation unavailable</Button>;
  return <Button asChild size="lg" className="h-auto min-h-11 whitespace-normal px-5 py-3 text-center"><a href={TRANSFORM_WHATSAPP_INVITE_URL} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" />JOIN THE TRANSform COMMUNITY ON WHATSAPP</a></Button>;
}

export default function Transform() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "TRANSform — Build. Connect. Empower. | The Ameliorate Project";
    const icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    const previousIcon = icon?.getAttribute("href");
    icon?.setAttribute("href", "/transform-favicon.png");
    const description = "TRANSform is Amelio’s community initiative for transgender, non-binary and gender-diverse people in Ghana. Build. Connect. Empower.";
    const selectors = ['meta[name="description"]', 'meta[property="og:title"]', 'meta[property="og:description"]', 'meta[name="twitter:title"]', 'meta[name="twitter:description"]'];
    const previous = selectors.map(selector => {
      const element = document.querySelector<HTMLMetaElement>(selector);
      const value = element?.content;
      if (element) element.content = selector.includes("title") ? document.title : description;
      return { element, value };
    });
    window.scrollTo(0, 0);
    return () => { document.title = previousTitle; if (icon && previousIcon) icon.setAttribute("href", previousIcon); previous.forEach(({ element, value }) => { if (element && value !== undefined) element.content = value; }); };
  }, []);

  return <div className="min-h-screen">
    <Navbar /><RotatingKeywordsBar />
    <main id="transform-main">
      <section className="pt-32 md:pt-36 pb-10 border-b border-border">
        <div className={`${wrap} text-center`}>
          <p className="text-xs font-semibold text-primary mb-4">AN AMELIO COMMUNITY INITIATIVE</p>
          <h1 className="sr-only">TRANSform</h1>
          <img src={wordmark.url} alt="TRANSform — Build. Connect. Empower." width={1152} height={768} className="w-full max-w-lg mx-auto aspect-[3/2] object-contain" />
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-5">A community for transgender, non-binary and gender-diverse people in Ghana.</p>
          <div className="max-w-3xl mx-auto text-muted-foreground leading-relaxed space-y-4 mb-7">
            <p>TRANSform is an initiative of The Ameliorate Project (Amelio), created to strengthen community connection, improve access to relevant health information and education, promote affirming health and wellbeing, support people navigating abuse and safety concerns, and advance economic empowerment.</p>
            <p>Through community engagement, educational resources and shared learning, TRANSform aims to help gender-diverse people connect, make informed decisions, explore opportunities and build safer, healthier and more empowered lives.</p>
            <p className="text-foreground font-medium">You deserve dignity, community, relevant information and the freedom to participate at your own pace.</p>
          </div>
          <JoinCommunity />
          <p className="text-sm text-muted-foreground mt-3">WhatsApp may show your phone number and profile to other members.</p>
          <Button asChild variant="link" className="mt-3"><a href="#transform-work">Explore our areas of work <ArrowDown aria-hidden="true" /></a></Button>
        </div>
      </section>

      <section id="transform-work" className="py-14 md:py-20 scroll-mt-28">
        <div className={wrap}><p className="text-sm text-primary font-semibold mb-3">OUR AREAS OF WORK</p><h2 className="text-3xl md:text-4xl mb-5 max-w-3xl">Supporting healthier, safer and more empowered lives</h2><p className="text-muted-foreground leading-relaxed max-w-3xl mb-8">TRANSform brings together community connection, relevant information, education and practical support to respond to issues that affect transgender, non-binary and gender-diverse people in Ghana.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{transformAreas.map((area, index) => { const Icon = icons[index] ?? Users; return <article key={area.title} className={`bg-card ${tints[index]} border rounded-lg p-6`}><Icon className="text-primary h-7 w-7 mb-5" aria-hidden="true" /><h3 className="text-2xl leading-snug mb-4">{area.title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{area.description}</p>{area.detail && <p className="text-sm text-muted-foreground leading-relaxed mt-3">{area.detail}</p>}</article>; })}</div>
          <div className="mt-8 border-l-2 border-primary pl-5 text-sm text-muted-foreground leading-relaxed space-y-3">
            <p>These are areas of work, not a guarantee that every service is currently available. Health information is educational, not individualized medical advice. TRANSform does not offer clinical testing, diagnosis, prescriptions, hormone therapy or treatment through this page.</p>
            <p>Safety and relocation navigation means information and support options, not guaranteed accommodation, funded relocation, legal representation, an emergency shelter or 24-hour crisis response. Economic empowerment does not promise grants, jobs, cash transfers, loans or guaranteed employment.</p>
          </div>
        </div>
      </section>

      <section id="transform-workshops" className="py-14 md:py-20 bg-secondary/40 border-y border-border scroll-mt-28"><div className={wrap}><p className="text-sm text-primary font-semibold mb-3">Learn. Share. Connect. Grow.</p><h2 className="text-3xl md:text-4xl mb-5">TRANSformation Workshops</h2><div className="max-w-3xl space-y-4 text-muted-foreground leading-relaxed"><p>TRANSformation Workshops are a space for learning, meaningful conversations, community exchange and skills development. They are intended to bring transgender, non-binary and gender-diverse people together to explore issues affecting their health, wellbeing, safety, opportunities and everyday lives.</p><p>Workshop announcements, topics and participation information will be shared here as activities are confirmed.</p></div><WorkshopListing /></div></section>

      <section className="py-14 md:py-20"><div className={`${wrap} grid md:grid-cols-[1fr_1.4fr] gap-8 md:gap-16`}><div><p className="text-sm text-primary font-semibold mb-3">WHO CAN JOIN?</p><h2 className="text-3xl md:text-4xl">A community where you belong</h2></div><div className="space-y-5 text-muted-foreground leading-relaxed"><p className="text-foreground font-medium">TRANSform is exclusively for transgender, non-binary and gender-diverse people in Ghana who self-identify as part of these communities.</p><p>You do not need to prove your identity or share your personal story to demonstrate that you belong. We respect that every person’s journey is different, and you decide what you feel comfortable sharing.</p><p>Whether you are looking for community connection, relevant health information, educational resources, wellbeing information or opportunities to learn and grow, TRANSform aims to create a respectful space where you can explore available information and participate at your own pace.</p><p className="text-sm">Joining the WhatsApp community does not automatically provide access to confidential health services, relocation assistance or financial support. Joining is not a prerequisite for emergency support or clinical services.</p></div></div></section>

      <section className="py-14 md:py-20 bg-secondary/40 border-y border-border"><div className={wrap}><ShieldCheck className="text-primary h-8 w-8 mb-4" aria-hidden="true" /><h2 className="text-3xl md:text-4xl mb-6">Your privacy matters</h2><div className="max-w-3xl text-muted-foreground leading-relaxed space-y-4"><p>Your identity, personal experiences and safety deserve respect.</p><p>Amelio encourages every member to protect their own privacy and respect the privacy of others. This is particularly important when discussing health, HIV, gender identity, experiences of abuse, personal safety or financial circumstances.</p><p className="text-foreground font-medium">WhatsApp is a third-party platform. Depending on your settings and the group configuration, other members may be able to see your phone number, profile name or profile photo. Group administrators cannot guarantee that every member will keep shared information confidential.</p></div><ul className="grid md:grid-cols-2 gap-x-10 gap-y-5 mt-8">{transformPrivacyGuidance.map(item => <li key={item} className="flex gap-3 text-sm leading-relaxed"><Check aria-hidden="true" className="h-5 w-5 text-primary shrink-0 mt-0.5" /><span>{item}</span></li>)}</ul><p className="mt-8 border-l-2 border-primary pl-5 text-sm text-muted-foreground leading-relaxed">If you are experiencing abuse or an immediate safety concern, prioritize your immediate safety and seek appropriate local emergency or professional support where available. Do not assume that this website or the WhatsApp community provides emergency monitoring or an immediate response service.</p></div></section>

      <section className="py-14 md:py-20"><div className={`${wrap} grid md:grid-cols-2 gap-10`}><div><p className="text-sm text-primary font-semibold mb-3">OUR COMMUNITY COMMITMENTS</p><h2 className="text-3xl md:text-4xl mb-5">Respect, dignity and mutual care</h2><p className="text-muted-foreground leading-relaxed">We ask every member to help maintain a respectful, inclusive and supportive environment where people can learn, connect and participate without fear of humiliation or discrimination.</p><p className="text-sm text-muted-foreground mt-5">Administrators may take appropriate action when members violate community guidelines.</p></div><ol className="space-y-4 list-decimal pl-5 marker:text-primary">{transformCommitments.map(item => <li key={item} className="pl-2 leading-relaxed">{item}</li>)}</ol></div></section>

      <section className="py-14 md:py-20 border-y border-border bg-secondary/40"><div className={wrap}><h2 className="text-3xl md:text-4xl mb-5">Explore resources and opportunities</h2><p className="text-muted-foreground leading-relaxed max-w-3xl">Access to relevant information can help people make informed decisions about their health, wellbeing, safety and future. TRANSform aims to connect community members with useful educational resources and opportunities as they become available.</p><ResourceListing /></div></section>

      <section className="py-14 md:py-20"><div className={`${wrap} text-center`}><h2 className="text-3xl md:text-4xl mb-6">Connect. Learn. Grow with TRANSform.</h2><div className="max-w-3xl mx-auto text-muted-foreground leading-relaxed space-y-4 mb-8"><p>Whether you are seeking community connection, reliable health information, affirming wellbeing resources, opportunities to develop new skills or a place to learn alongside others, TRANSform is building a community grounded in dignity and mutual support.</p><p>If you are transgender, non-binary or gender-diverse and would like to connect with the TRANSform community, you are welcome to join us on WhatsApp.</p></div><JoinCommunity /><p className="mt-5 text-sm text-muted-foreground">Your participation is your choice. You deserve respect, dignity and the freedom to engage at your own pace.</p><p className="mt-8 font-semibold">TRANSform — Build. Connect. Empower.</p><p className="text-sm text-muted-foreground mt-2">An initiative of The Ameliorate Project (Amelio).</p><p className="text-sm text-primary mt-2">Better, Without Barriers.</p></div></section>
    </main><Footer />
  </div>;
}