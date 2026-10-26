import { useEffect } from "react";
import { Users, HeartPulse, HeartHandshake, ShieldCheck, Sprout, MessagesSquare, MessageCircle, Check, ArrowDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import RotatingKeywordsBar from "@/components/RotatingKeywordsBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { WorkshopListing } from "@/components/transform/TransformListings";
import { TRANSFORM_WHATSAPP_INVITE_URL, isValidExternalUrl, transformAreas, transformCommitments, transformPrivacyGuidance } from "@/data/transform";
import wordmark from "@/assets/transform-wordmark-transparent.png";
import heroImg from "@/assets/transform-hero.jpg";
import workshopImg from "@/assets/transform-workshop.jpg";
import portraitImg from "@/assets/transform-portrait.jpg";
import communityImg from "@/assets/transform-community.jpg";
import areaCommunityImg from "@/assets/transform-area-community.jpg";
import areaHivImg from "@/assets/transform-area-hiv.jpg";
import areaHealthImg from "@/assets/transform-area-health.jpg";
import areaSafetyImg from "@/assets/transform-area-safety.jpg";
import areaEconomyImg from "@/assets/transform-area-economy.jpg";
import areaWorkshopsImg from "@/assets/transform-area-workshops.jpg";

const icons = [Users, HeartPulse, HeartHandshake, ShieldCheck, Sprout, MessagesSquare];
const tints = ["tint-blue", "tint-pink", "tint-purple", "tint-teal", "tint-gold", "tint-blue"];
const commitmentStyles = [
  ["tint-pink", "bg-brand-magenta/20", "text-brand-magenta"],
  ["tint-gold", "bg-brand-gold/25", "text-brand-gold"],
  ["tint-blue", "bg-brand-blue/20", "text-brand-blue"],
  ["tint-teal", "bg-brand-teal/20", "text-brand-teal"],
  ["tint-purple", "bg-primary/15", "text-primary"],
  ["tint-orange", "bg-accent/20", "text-accent"],
] as const;
const wrap = "container mx-auto max-w-6xl px-4 md:px-8";

function JoinCommunity() {
  const valid = isValidExternalUrl(TRANSFORM_WHATSAPP_INVITE_URL);
  if (!valid) return <Button disabled className="h-auto whitespace-normal py-3">Community invitation unavailable</Button>;
  return <Button asChild size="lg" className="h-auto min-h-11 whitespace-normal px-5 py-3 text-center"><a href={TRANSFORM_WHATSAPP_INVITE_URL} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" />JOIN THE TRANSform COMMUNITY NETWORK</a></Button>;
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

  return <div className="transform-page min-h-screen">
    <Navbar /><RotatingKeywordsBar />
    <main id="transform-main">
      <div className="relative pt-28 md:pt-32">
        <img src={heroImg} alt="A proud group of transgender, non-binary and gender-diverse friends together at sunset" width={1920} height={1088} className="w-full h-[45vh] md:h-[65vh] object-cover object-[center_30%]" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
      </div>
      <section className="pt-4 pb-10 border-b border-border">
        <div className={`${wrap} text-center`}>
          <p className="text-xs font-semibold text-primary mb-4">AN AMELIO COMMUNITY INITIATIVE</p>
          <h1 className="sr-only">TRANSform</h1>
          <img src={wordmark} alt="TRANSform — Build. Connect. Empower." className="w-full max-w-lg mx-auto object-contain my-8" />
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

      <section id="transform-workshops" className="relative overflow-hidden py-14 md:py-20 scroll-mt-28 bg-gradient-to-br from-brand-magenta/25 via-brand-gold/20 to-brand-blue/25 border-y border-border">
        <div aria-hidden="true" className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand-magenta/30 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-brand-blue/30 blur-3xl" />
        <div className={`${wrap} relative`}>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="inline-block rounded-full bg-brand-magenta text-primary-foreground px-4 py-1 text-sm font-semibold mb-4">Learn. Share. Connect. Grow.</p>
              <h2 className="text-4xl md:text-5xl mb-5 bg-gradient-to-r from-brand-magenta via-brand-gold to-brand-blue bg-clip-text text-transparent font-bold">TRANSformation Workshops</h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed"><p>TRANSformation Workshops are a space for learning, meaningful conversations, community exchange and skills development. They are intended to bring transgender, non-binary and gender-diverse people together to explore issues affecting their health, wellbeing, safety, opportunities and everyday lives.</p><p>Workshop announcements, topics and participation information will be shared here as activities are confirmed.</p></div>
              <div className="flex flex-wrap gap-2 mt-6">{["Health & wellbeing","HIV education","Safety","Skills","Community dialogue"].map((t,i)=><span key={t} className={`rounded-full px-3 py-1 text-sm font-medium text-primary-foreground ${["bg-brand-magenta","bg-brand-blue","bg-brand-teal","bg-brand-gold","bg-primary"][i]}`}>{t}</span>)}</div>
            </div>
            <div className="grid grid-cols-5 gap-4">
              <img src={workshopImg} alt="Gender-diverse community members talking together in a workshop circle" width={1280} height={864} loading="lazy" className="col-span-3 h-full w-full object-cover rounded-2xl shadow-xl ring-4 ring-brand-gold/60" />
              <img src={portraitImg} alt="Smiling gender-diverse person in colourful kente clothing" width={896} height={1120} loading="lazy" className="col-span-2 h-full w-full object-cover rounded-2xl shadow-xl ring-4 ring-brand-magenta/60" />
            </div>
          </div>
          <WorkshopListing />
        </div>
      </section>

      <section className="py-14 md:py-20"><div className={`${wrap} grid md:grid-cols-[1fr_1.4fr] gap-8 md:gap-16`}><div><p className="text-sm text-primary font-semibold mb-3">WHO CAN JOIN?</p><h2 className="text-3xl md:text-4xl mb-6">A community where you belong</h2><img src={communityImg} alt="Two friends from the gender-diverse community embracing and smiling" width={1280} height={864} loading="lazy" className="w-full rounded-2xl object-cover aspect-[4/3] shadow-xl ring-4 ring-brand-teal/50" /></div><div className="space-y-5 text-muted-foreground leading-relaxed"><p className="text-foreground font-medium">TRANSform is exclusively for transgender, non-binary and gender-diverse people in Ghana who self-identify as part of these communities.</p><p>You do not need to prove your identity or share your personal story to demonstrate that you belong. We respect that every person’s journey is different, and you decide what you feel comfortable sharing.</p><p>Whether you are looking for community connection, relevant health information, educational resources, wellbeing information or opportunities to learn and grow, TRANSform aims to create a respectful space where you can explore available information and participate at your own pace.</p><p className="text-sm">Joining the WhatsApp community does not automatically provide access to confidential health services, relocation assistance or financial support. Joining is not a prerequisite for emergency support or clinical services.</p></div></div></section>

      <section aria-labelledby="transform-privacy-title" className="transform-privacy py-14 md:py-20 border-y border-brand-teal/25">
        <div className={wrap}>
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16">
            <div>
              <ShieldCheck className="text-brand-teal h-14 w-14 mb-6" strokeWidth={1.5} aria-hidden="true" />
              <h2 id="transform-privacy-title" className="text-3xl md:text-4xl mb-5">Your privacy matters</h2>
              <p className="text-xl text-foreground leading-relaxed mb-5">Your identity, personal experiences and safety deserve respect.</p>
              <p className="text-muted-foreground leading-relaxed">Amelio encourages every member to protect their own privacy and respect the privacy of others. This is particularly important when discussing health, HIV, gender identity, experiences of abuse, personal safety or financial circumstances.</p>
            </div>
            <ul className="divide-y divide-brand-teal/25 border-t border-brand-teal/25">{transformPrivacyGuidance.map(item => <li key={item} className="flex gap-4 py-5 text-sm leading-relaxed"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-teal/15"><Check aria-hidden="true" className="h-4 w-4 text-foreground" /></span><span>{item}</span></li>)}</ul>
          </div>
          <div className="mt-10 border-l-4 border-brand-gold bg-brand-gold/15 p-5 md:p-6">
            <p className="text-foreground font-medium leading-relaxed">WhatsApp is a third-party platform. Depending on your settings and the group configuration, other members may be able to see your phone number, profile name or profile photo. Group administrators cannot guarantee that every member will keep shared information confidential.</p>
          </div>
          <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-4xl">If you are experiencing abuse or an immediate safety concern, prioritize your immediate safety and seek appropriate local emergency or professional support where available. Do not assume that this website or the WhatsApp community provides emergency monitoring or an immediate response service.</p>
        </div>
      </section>

      <section aria-labelledby="transform-commitments-title" className="py-14 md:py-20 border-t border-border"><div className={wrap}><div className="max-w-3xl mb-10"><p className="text-sm font-bold mb-3 bg-gradient-to-r from-brand-magenta via-brand-gold to-brand-blue bg-clip-text text-transparent">OUR COMMUNITY COMMITMENTS</p><h2 id="transform-commitments-title" className="text-3xl md:text-4xl mb-5">Respect, dignity and mutual care</h2><p className="text-muted-foreground leading-relaxed">We ask every member to help maintain a respectful, inclusive and supportive environment where people can learn, connect and participate without fear of humiliation or discrimination.</p></div><ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">{transformCommitments.map((item, index) => { const [tint, chip, chipText] = commitmentStyles[index % commitmentStyles.length]; return <li key={item} className={`bg-card ${tint} border rounded-2xl p-6 flex gap-4`}><span aria-hidden="true" className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-bold ${chip} ${chipText}`}>{String(index + 1).padStart(2, "0")}</span><p className="leading-relaxed pt-1.5">{item}</p></li>; })}</ol><p className="text-sm text-muted-foreground mt-7 max-w-3xl">Administrators may take appropriate action when members violate community guidelines.</p></div></section>

      <section aria-labelledby="transform-connect-title" className="relative overflow-hidden py-16 md:py-24 border-t border-border bg-gradient-to-br from-brand-magenta/20 via-brand-gold/15 to-brand-blue/20">
        <div aria-hidden="true" className="absolute -top-32 left-1/4 h-80 w-80 rounded-full bg-brand-magenta/25 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-32 right-1/4 h-80 w-80 rounded-full bg-brand-gold/25 blur-3xl" />
        <div aria-hidden="true" className="absolute top-1/3 -left-16 h-64 w-64 rounded-full bg-brand-blue/20 blur-3xl" />
        <div className={`${wrap} relative text-center`}>
          <div className="flex flex-wrap justify-center gap-2 mb-6">{["Connect", "Learn", "Grow"].map((word, i) => <span key={word} className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold ${["bg-brand-magenta text-primary-foreground", "bg-brand-gold text-primary-foreground", "bg-brand-blue text-primary-foreground"][i]}`}><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />{word}</span>)}</div>
          <h2 id="transform-connect-title" className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-magenta via-brand-gold to-brand-blue bg-clip-text text-transparent">Connect. Learn. Grow with TRANSform.</h2>
          <div className="max-w-3xl mx-auto text-foreground/85 leading-relaxed space-y-4 mb-9"><p>Whether you are seeking community connection, reliable health information, affirming wellbeing resources, opportunities to develop new skills or a place to learn alongside others, TRANSform is building a community grounded in dignity and mutual support.</p><p>If you are transgender, non-binary or gender-diverse and would like to connect with the TRANSform community, you are welcome to join us on WhatsApp.</p></div>
          <div className="flex flex-col items-center gap-4"><JoinCommunity /><p className="text-sm text-foreground/70">Your participation is your choice. You deserve respect, dignity and the freedom to engage at your own pace.</p></div>
          <div className="mt-10 pt-8 border-t border-foreground/15"><p className="text-xl font-semibold">TRANSform — Build. Connect. Empower.</p><p className="text-sm text-foreground/70 mt-2">An initiative of The Ameliorate Project (Amelio).</p><p className="text-sm text-primary font-medium mt-2">Better, Without Barriers.</p></div>
        </div>
      </section>
    </main><Footer />
  </div>;
}