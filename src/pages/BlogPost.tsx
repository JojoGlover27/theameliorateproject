import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
import coverNavigating from "@/assets/blog-navigating-survival.jpg";
import coverClinic from "@/assets/blog-clinic-was-never-problem.jpg";

type Block = { type: "p" | "h2"; text: string };

type Post = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  coverImage?: string;
  blocks: Block[];
};


const posts: Post[] = [
  {
    slug: "navigating-survival-guide",
    title: "Navigating Survival: A Guide for LGBTQI+ People Living with HIV in Ghana Right Now",
    category: "Community Health",
    date: "June 2026",
    readTime: "8 min read",
    blocks: [
      { type: "p", text: "The bill has passed. We know. And we know what that means for you, not in abstract policy terms, but in the very real, very personal calculation you are making right now about whether it is safe to leave the house, whether it is safe to call your doctor, whether it is safe to pick up your medication." },
      { type: "p", text: "This is written for you. Not about you. For you." },
      { type: "h2", text: "First, you are not alone, and you are not forgotten." },
      { type: "p", text: "Before anything else, we need to say this clearly: The Ameliorate Project sees you. We were built for this moment, for you, for this community, for exactly the intersection of criminalisation and healthcare access that the passage of the Human Sexual Rights and Family Values Act has made so much more dangerous." },
      { type: "p", text: "We know that many of you were already navigating this before the bill passed. The fear of being identified at a clinic. The decision to miss a dose rather than risk being seen at a pharmacy. The calculation, made in silence, made alone, of whether your health was worth the exposure. That calculation just got harder. But you have not been abandoned." },
      { type: "h2", text: "If you have stopped going to your healthcare facility, you are not alone" },
      { type: "p", text: "There is a term in the health system for people like you: \"lost to follow-up.\" It is a clinical phrase that describes someone who started HIV treatment and then disappeared from the records. What it does not capture is why people disappear." },
      { type: "p", text: "People disappear because the health system made them feel unsafe. Because a nurse looked at them a certain way. Because a receptionist asked too many questions. Because their name was called out in a waiting room. Because they could not risk being seen walking into that building by the wrong person." },
      { type: "p", text: "You did not fail the health system. The health system failed to be safe enough for you." },
      { type: "p", text: "If you have stopped taking your ARVs, stopped collecting your PrEP, stopped attending your appointments, please know this: it is not too late to restart. Interrupting HIV treatment is serious but it is recoverable. Your viral load can be brought back under control. Your regimen can be adjusted. What matters most right now is getting back into care, on your terms, in a way that feels safe." },
      { type: "h2", text: "The real risk of staying away" },
      { type: "p", text: "We will be honest with you because you deserve honesty, not comfort." },
      { type: "p", text: "When people living with HIV stop treatment, viral load increases. When viral load increases, transmission risk increases, to you, to partners, to the people you love. Untreated HIV progresses to AIDS. Untreated opportunistic infections become life-threatening." },
      { type: "p", text: "The law criminalises who you are. But staying away from care punishes your body for a law that was never just. Do not let legislation that was designed to harm you cause you to harm yourself further." },
      { type: "p", text: "You deserve care. You deserve treatment. You deserve to be alive and healthy. Those things are true regardless of what any parliament says." },
      { type: "h2", text: "Practical steps you can take right now" },
      { type: "p", text: "If you are on ARVs and have missed doses:" },
      { type: "p", text: "Do not panic. Restart as soon as possible. If you have missed more than a few days, contact a trusted health provider or community health worker before restarting, they can advise on the safest way to re-engage with your regimen without judgment." },
      { type: "p", text: "If you need PrEP or PEP:" },
      { type: "p", text: "PEP must be started within 72 hours of potential exposure to be effective. Do not wait. If you cannot access a facility safely, contact community organisations who can help you navigate discreet access." },
      { type: "p", text: "If you need to collect medication but are afraid of being seen:" },
      { type: "p", text: "Ask someone you trust to collect on your behalf if your facility allows proxy collection. Some facilities do, it is worth asking through a trusted channel first." },
      { type: "p", text: "If you have been avoiding testing because you are afraid of what you will find:" },
      { type: "p", text: "Knowing your status, whatever it is, gives you options. Not knowing takes them away. There are community-based testing options that do not require you to enter a government facility. Reach out to trusted community organisations for guidance on where these are available." },
      { type: "p", text: "If you are experiencing a mental health crisis as a result of the legislation:" },
      { type: "p", text: "This is real and it is valid. Legislation that criminalises your existence causes genuine psychological harm, anxiety, depression, hypervigilance, and grief are all normal responses to an abnormal situation. You are not broken. The situation is. Please reach out to someone, a trusted friend, a community member, a mental health ally. You do not have to carry this alone." },
      { type: "h2", text: "On hidden populations, and why hiding has a cost" },
      { type: "p", text: "We understand why communities go underground when laws like this pass. It is a survival instinct. It is rational. And it is exactly what those who drafted this legislation want, for you to become invisible, unreachable, and uncounted." },
      { type: "p", text: "But invisibility has a cost. When communities go underground, HIV transmission increases. When people stop accessing care, viral loads rise. When hidden populations disappear from health data, the health system uses that absence to argue there is no need, that the community either does not exist or does not need services." },
      { type: "p", text: "Your visibility, even partial, even strategic, is an act of resistance. Your continued survival is an act of resistance. Staying in care, staying connected, staying alive, these are political acts in the current moment." },
      { type: "p", text: "We are not asking you to be visible in ways that put you at risk. We are asking you to find the pathways to care that keep you safe and alive, because your life matters, not as a statistic, not as a case study, but as a person." },
      { type: "h2", text: "What is coming, and why it gives us hope" },
      { type: "p", text: "The Ameliorate Project is building Synapse." },
      { type: "p", text: "Synapse is an anonymous digital health platform being developed specifically for communities like yours, for people who cannot safely identify themselves to access care. When it launches, it will allow you to consult with an affirming, GHS-authorised clinician through an encrypted connection, receive your medications and health commodities delivered discreetly to your door, and access the care you need without ever providing your name, your phone number, or any identifying information to a platform or an organisation." },
      { type: "p", text: "No paper trail. No waiting room. No risk of being seen." },
      { type: "p", text: "We are not there yet. Synapse is in development, and we will not pretend otherwise. But we are building it urgently, because the community's need is urgent. Because the bill has made it more urgent. Because you deserve a health system that was designed with your safety in mind from the very first line of code." },
      { type: "p", text: "When Synapse launches, it will be free. It will be yours." },
      { type: "p", text: "Until then, we are here. The Ameliorate Project is here, not just building technology, but holding space for this community and advocating loudly for your right to exist, to be healthy, and to be free." },
      { type: "h2", text: "Resources and support" },
      { type: "p", text: "If you need support navigating healthcare access right now, reach out to Amelio anonymously through our website:" },
      { type: "p", text: "www.ameliorateproject.org" },
      { type: "p", text: "You can contact us using any nickname, no real names required, no identity stored or tracked." },
      { type: "p", text: "We also encourage you to connect with trusted community organisations operating in Ghana who provide confidential support. If you are in crisis or need urgent assistance, please reach out, to us, to community, to anyone you trust." },
      { type: "h2", text: "A final word" },
      { type: "p", text: "To every LGBTQI+ person living with HIV in Ghana reading this right now:" },
      { type: "p", text: "The law does not define your worth. It does not determine your right to health. It does not get to decide whether you live or die." },
      { type: "p", text: "You matter. Your health matters. Your life matters." },
      { type: "p", text: "We are building the infrastructure to prove it." },
      { type: "p", text: "Better, Without Barriers." },
    ],
  },
  {
    slug: "the-clinic-was-never-the-problem",
    title: "The Clinic Was Never the Problem. Being Seen Was.",
    category: "Community Health",
    date: "May 2026",
    readTime: "4 min read",
    blocks: [
      { type: "p", text: "There is a particular kind of courage that nobody talks about." },
      { type: "p", text: "It is not the courage of marching in the streets or standing at a podium. It is quieter and far more private. It is the courage of deciding, on a Tuesday afternoon, to walk into a health facility and ask for help, knowing that someone you know might see you there, and that being seen could cost you everything." },
      { type: "p", text: "Your job. Your family. In some cases, your freedom." },
      { type: "p", text: "This is the reality for hundreds of LGBTQI+ individuals in Ghana living with HIV or at risk of it. They know treatment exists. They know PrEP could protect them. They know that being on ART and achieving an undetectable viral load means they cannot transmit the virus to anyone else. They know all of this. And they still do not go." },
      { type: "p", text: "Not because they don't care about their health. Because caring about their health requires a visibility that is simply too dangerous." },
      { type: "h2", text: "What Our Community Told Us" },
      { type: "p", text: "In 2025, The Ameliorate Project asked 253 community members across Ghana about their experiences with HIV services. We asked anonymously, because that was the only way to get honest answers." },
      { type: "p", text: "What came back was not surprising to us. But it was important to document, because data has a way of making the invisible legible to people who have never had to hide." },
      { type: "p", text: "85.4% of respondents said that anonymity would make them more likely to access and stay on treatment. Not convenience. Not cost. Anonymity. The simple assurance that no one would know." },
      { type: "p", text: "53.2% said they do not trust existing health systems to keep their HIV status confidential. More than half. In a country with a national HIV response, more than half of the people most at risk do not believe that system will protect them." },
      { type: "p", text: "And 76.8% said they would prefer to access HIV services remotely, by phone or app, rather than attending a facility in person." },
      { type: "p", text: "This is not a healthcare access problem. This is a safety problem masquerading as a healthcare problem." },
      { type: "h2", text: "What We Are Doing About It" },
      { type: "p", text: "The Ameliorate Project exists because the standard solutions, more clinics, more outreach workers, more awareness campaigns, were not built for people who cannot be seen." },
      { type: "p", text: "Synapse is being built for them." },
      { type: "p", text: "It is an anonymous digital health platform. Users connect through generated anonymous IDs, consult with an affirming clinician via telemedicine, and receive ART, PrEP, PEP, and HIV self-testing kits delivered discreetly to a location of their choosing." },
      { type: "p", text: "The technology is not the point. The technology is just what makes the safety possible." },
      { type: "h2", text: "What We Need You to Understand" },
      { type: "p", text: "Ghana has over 330,000 people living with HIV. The national response is real, funded, and staffed. And yet the populations most at risk, MSM with a prevalence of 18.1%, transgender women with a prevalence of up to 28.1%, remain the least served." },
      { type: "p", text: "This is not a gap that more funding to the same systems will close. It requires a different approach. One that starts not with the clinic, but with the question: what would make you feel safe enough to seek care?" },
      { type: "p", text: "We asked. Our community answered. And we are building accordingly." },
      { type: "p", text: "If you believe healthcare is a right, not a risk, we invite you to support this work. Visit ameliorateproject.org to learn more, donate, or get in touch." },
      { type: "p", text: "Anonymously, of course." },
    ],
  },
];

const BlogPost = () => {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug) ?? posts[0];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-28 md:pt-36 pb-16 md:pb-24">
        <article className="container mx-auto px-4 md:px-8 max-w-3xl">
          <AnimatedSection>
            <Link to="/blog" className="text-sm text-primary hover:underline mb-6 inline-block">← Back to Blog</Link>
            <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground mb-4">
              <span className="text-primary font-semibold">{post.category}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className="text-3xl md:text-5xl text-foreground mb-10 leading-tight">
              {post.title}
            </h1>
          </AnimatedSection>

          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
            {post.blocks.map((b, i) =>
              b.type === "h2" ? (
                <AnimatedSection key={i}>
                  <h2 className="text-2xl md:text-3xl text-foreground mt-10 mb-2">{b.text}</h2>
                </AnimatedSection>
              ) : (
                <AnimatedSection key={i}>
                  <p>{b.text}</p>
                </AnimatedSection>
              )
            )}
            <AnimatedSection>
              <p className="italic border-l-4 border-primary/60 pl-4 mt-8 text-base">
                The Ameliorate Project is a Ghana-based NGO dedicated to improving HIV healthcare access for LGBTQI+ individuals and key populations through community evidence, digital innovation, and radical empathy.
              </p>
            </AnimatedSection>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
