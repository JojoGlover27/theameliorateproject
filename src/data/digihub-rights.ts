// Ghana Digital Rights Knowledge Library.
//
// CONTENT GOVERNANCE
// - `sourceText` holds ONLY verified official wording. Until a provision has been
//   verified against an authoritative source it stays `null` and the UI shows a
//   clearly labelled placeholder.
// - `sourceUrl` is ONLY set when the authoritative URL has been verified. Never
//   guess a URL. `sourceOrgUrl` points to the responsible authority's website.
// - Everything under `explains`, `whyItMatters`, `protects` and `actions` is
//   DigiHub's educational explanation, not the law itself.

export type RightsTopic =
  | "Privacy & Data Protection"
  | "Cybersecurity"
  | "Communications & Internet"
  | "Expression & Information"
  | "Rights & Remedies"
  | "Digital Identity"
  | "Emerging Technology"
  | "AI & Digital Governance";

export type DocumentType = "Constitution" | "Law" | "Policy" | "Regulation" | "Strategy" | "Guidance";

export interface TopicMeta {
  slug: string;
  name: RightsTopic;
  blurb: string;
  tone: string; // tailwind classes for icon chip
}

export const rightsTopics: TopicMeta[] = [
  { slug: "privacy-data-protection", name: "Privacy & Data Protection", blurb: "Your personal information and private life.", tone: "text-primary bg-primary/10" },
  { slug: "cybersecurity", name: "Cybersecurity", blurb: "Protection from hacking, fraud and online harm.", tone: "text-brand-blue bg-brand-blue/10" },
  { slug: "communications-internet", name: "Communications & Internet", blurb: "Phones, networks, SIM cards and connectivity.", tone: "text-emerald-600 bg-emerald-500/10" },
  { slug: "expression-information", name: "Expression & Information", blurb: "Speaking, publishing and accessing information.", tone: "text-brand-magenta bg-brand-magenta/10" },
  { slug: "rights-remedies", name: "Rights & Remedies", blurb: "What to do when a right is violated.", tone: "text-brand-gold bg-brand-gold/10" },
  { slug: "digital-identity", name: "Digital Identity", blurb: "IDs, SIM registration and identity data.", tone: "text-brand-teal bg-brand-teal/10" },
  { slug: "emerging-technology", name: "Emerging Technology", blurb: "New tools, new risks, new questions.", tone: "text-accent bg-accent/10" },
  { slug: "ai-digital-governance", name: "AI & Digital Governance", blurb: "How AI and digital systems are governed.", tone: "text-primary bg-primary/10" },
];

export interface Provision {
  slug: string;
  label: string; // e.g. "Article 18"
  title: string; // e.g. "Privacy of home, property, correspondence and communication"
  topics: RightsTopic[];
  keywords: string[];
  /** Verified official wording only. `null` until verified. */
  sourceText: string | null;
  explains: string; // "In simple terms"
  whyItMatters: string;
  protects: string[];
  actions: string[];
  related: string[]; // resource slugs
}

export interface LegalResource {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  documentType: DocumentType;
  country: "Ghana";
  topics: RightsTopic[];
  topicLine: string; // "Privacy · Expression · ..."
  sourceOrg: string;
  sourceOrgUrl: string | null;
  /** Verified authoritative URL to the document itself. `null` until verified. */
  sourceUrl: string | null;
  version: string | null;
  lastVerified: string | null; // ISO date once verified
  overview: string; // DigiHub's educational overview
  provisions: Provision[];
}

const PLACEHOLDER_NOTE = "Official source text will be added after verification.";
export const SOURCE_PLACEHOLDER = PLACEHOLDER_NOTE;

export const legalResources: LegalResource[] = [
  {
    slug: "constitution-of-ghana",
    title: "Constitution of the Republic of Ghana, 1992",
    shortTitle: "Constitution of Ghana",
    description: "Digital rights and fundamental rights protected under Ghana's Constitution.",
    documentType: "Constitution",
    country: "Ghana",
    topics: ["Privacy & Data Protection", "Expression & Information", "Rights & Remedies"],
    topicLine: "Privacy · Expression · Information · Equality · Dignity",
    sourceOrg: "Republic of Ghana",
    sourceOrgUrl: null,
    sourceUrl: null,
    version: "1992 Constitution (as amended)",
    lastVerified: null,
    overview:
      "The Constitution is Ghana's highest law. Chapter 5 sets out fundamental human rights and freedoms. Although it was written before smartphones and social media, several of its protections, such as privacy, dignity, equality and freedom of expression, apply to how you live online today.",
    provisions: [
      {
        slug: "article-15-dignity",
        label: "Article 15",
        title: "Respect for human dignity",
        topics: ["Rights & Remedies"],
        keywords: ["dignity", "degrading treatment", "humiliation", "harassment"],
        sourceText: null,
        explains:
          "Article 15 is generally understood as protecting the dignity of every person. Treating someone in a degrading or humiliating way is not acceptable, and that principle does not disappear because the treatment happens on a phone or online.",
        whyItMatters:
          "Online harassment, doxxing and the sharing of intimate images without consent are often experienced as attacks on a person's dignity. Understanding that dignity is a constitutional value helps you name what happened and seek support.",
        protects: ["Your dignity as a person", "Freedom from degrading treatment"],
        actions: [
          "Preserve evidence of degrading or harassing content before reporting it.",
          "Use the existing Scam Alerts and Cybersecurity resources to secure your accounts.",
          "Seek support from a trusted organisation or legal professional.",
        ],
        related: ["cybersecurity-act-2020"],
      },
      {
        slug: "article-17-equality",
        label: "Article 17",
        title: "Equality and freedom from discrimination",
        topics: ["Rights & Remedies", "Expression & Information"],
        keywords: ["equality", "discrimination", "equal treatment"],
        sourceText: null,
        explains:
          "Article 17 is generally understood as guaranteeing equality before the law and protecting people from discrimination on listed grounds. In simple terms, the law should treat people equally.",
        whyItMatters:
          "Marginalised communities are often targeted online precisely because of who they are. Knowing that equality is a constitutional principle can inform how you describe what happened when you seek help or report an incident.",
        protects: ["Equal treatment under the law", "Protection from discrimination on the grounds listed in the Constitution"],
        actions: [
          "Document incidents where you were singled out or targeted.",
          "Explore the Rights & Remedies topic to understand possible pathways.",
          "Speak to a human-rights organisation or legal professional about your options.",
        ],
        related: ["data-protection-act-2012"],
      },
      {
        slug: "article-18-privacy",
        label: "Article 18",
        title: "Property rights and privacy of home, correspondence and communication",
        topics: ["Privacy & Data Protection", "Communications & Internet"],
        keywords: ["privacy", "correspondence", "communication", "home", "surveillance", "interference"],
        sourceText: null,
        explains:
          "Article 18 is widely understood as protecting your privacy, including the privacy of your home, property, correspondence and communication, from interference that is not in accordance with law. For an ordinary person, this means your private messages and calls are not open to anyone who wants to look, unless the law specifically allows it.",
        whyItMatters:
          "Almost everything you do on a phone, from chats to banking, is a form of correspondence or communication. This provision is the constitutional foundation for the more detailed rules found in the Data Protection Act and the Electronic Communications Act.",
        protects: ["Privacy of your home and property", "Privacy of your correspondence", "Privacy of your communications", "Protection from interference that is not in accordance with law"],
        actions: [
          "Take the Privacy Score to see how exposed you are today.",
          "Follow the Privacy Guides to lock down your messaging and devices.",
          "If you believe your communications were accessed unlawfully, preserve evidence and seek advice.",
        ],
        related: ["data-protection-act-2012", "electronic-communications-act-2008", "cybersecurity-act-2020"],
      },
      {
        slug: "article-21-freedoms",
        label: "Article 21",
        title: "General fundamental freedoms, including speech, expression and information",
        topics: ["Expression & Information"],
        keywords: ["expression", "speech", "press", "information", "assembly", "association", "freedom"],
        sourceText: null,
        explains:
          "Article 21 is generally understood as protecting a set of fundamental freedoms, including freedom of speech and expression, freedom of thought, freedom of information, and freedoms of assembly and association. Posting, publishing, organising and seeking information online sit within these freedoms, subject to limits set by law.",
        whyItMatters:
          "When a post is taken down, an account is restricted or someone is pressured to stay silent, this is the provision people usually point to. It also underpins your ability to look for information about health, rights and services.",
        protects: ["Freedom of speech and expression", "Freedom of thought and conscience", "Freedom of information", "Freedom of assembly and association"],
        actions: [
          "Keep screenshots and dates if your expression is restricted.",
          "Learn how to protect your accounts so restriction is not mistaken for a hack.",
          "Contact a digital-rights or press-freedom organisation for guidance.",
        ],
        related: ["electronic-communications-act-2008", "cybersecurity-act-2020"],
      },
      {
        slug: "article-33-enforcement",
        label: "Article 33",
        title: "Protection of rights by the courts",
        topics: ["Rights & Remedies"],
        keywords: ["enforcement", "court", "remedy", "high court", "redress"],
        sourceText: null,
        explains:
          "Article 33 is generally understood as giving a person whose fundamental rights have been, are being, or are likely to be violated a route to seek redress in the courts. In simple terms, rights in the Constitution are meant to be enforceable, not decorative.",
        whyItMatters:
          "Knowing that a formal remedy exists changes how you approach a violation. It makes preserving evidence and getting proper advice worthwhile, even if you never go to court.",
        protects: ["Access to a court remedy for violations of fundamental rights"],
        actions: [
          "Preserve evidence carefully and securely.",
          "Explore the I Have a Problem navigator for practical first steps.",
          "Seek professional legal assistance before taking formal action.",
        ],
        related: ["data-protection-act-2012", "cybersecurity-act-2020"],
      },
    ],
  },
  {
    slug: "data-protection-act-2012",
    title: "Data Protection Act, 2012 (Act 843)",
    shortTitle: "Data Protection Act, 2012",
    description: "Your personal data. Your privacy. Your rights.",
    documentType: "Law",
    country: "Ghana",
    topics: ["Privacy & Data Protection", "Rights & Remedies", "Digital Identity"],
    topicLine: "Personal data · Sensitive data · Consent · Data subject rights · Complaints",
    sourceOrg: "Data Protection Commission, Ghana",
    sourceOrgUrl: "https://www.dataprotection.org.gh",
    sourceUrl: null,
    version: "Act 843 of 2012",
    lastVerified: null,
    overview:
      "The Data Protection Act sets rules for how organisations collect, store, use and share personal information about you, and establishes the Data Protection Commission to oversee compliance. It is the main law you rely on when a company, clinic, employer or app mishandles your information.",
    provisions: [
      {
        slug: "what-is-personal-data",
        label: "Topic",
        title: "What counts as personal data",
        topics: ["Privacy & Data Protection", "Digital Identity"],
        keywords: ["personal data", "identifiable", "name", "phone number", "ID number", "location"],
        sourceText: null,
        explains:
          "Personal data is generally understood as information about a living person who can be identified from it, directly or indirectly. Your name, phone number, Ghana Card number, photo, location and account details are common examples.",
        whyItMatters:
          "Every form you fill, app you install and SIM you register generates personal data. If you know what counts, you can ask better questions about who holds it and why.",
        protects: ["Information that identifies you", "Information that can be combined to identify you"],
        actions: [
          "Take stock of the apps and services that hold your personal data.",
          "Use the Secure Apps list to choose tools that collect less.",
          "Read the Privacy Guides to reduce what you share by default.",
        ],
        related: ["constitution-of-ghana"],
      },
      {
        slug: "sensitive-personal-data",
        label: "Topic",
        title: "Sensitive personal data",
        topics: ["Privacy & Data Protection"],
        keywords: ["sensitive data", "health", "HIV status", "sexual life", "religion", "ethnicity", "special personal data"],
        sourceText: null,
        explains:
          "Some categories of information are treated as especially sensitive because misuse can cause serious harm. Health information and information about a person's sexual life are commonly treated as sensitive categories under data-protection frameworks.",
        whyItMatters:
          "For many people in our community, health status or sexual orientation being exposed is not a minor inconvenience; it can affect safety, family, work and housing. Stronger rules for sensitive data exist for exactly this reason.",
        protects: ["Health-related information", "Other especially sensitive categories of personal information"],
        actions: [
          "Only share sensitive information with services that explain how it will be protected.",
          "Concerned about confidentiality when accessing HIV services? Explore Synapse, Amelio's privacy-first health app.",
          "Preserve evidence if sensitive information about you is exposed.",
        ],
        related: ["constitution-of-ghana", "cybersecurity-act-2020"],
      },
      {
        slug: "consent-and-purpose",
        label: "Topic",
        title: "Consent, purpose and fair processing",
        topics: ["Privacy & Data Protection"],
        keywords: ["consent", "purpose", "lawful processing", "fair", "data controller", "data processor"],
        sourceText: null,
        explains:
          "Data-protection law is generally built on principles such as processing information fairly, for a specific purpose, and with a lawful basis such as consent. In simple terms, an organisation should not collect your information for one reason and quietly use it for another.",
        whyItMatters:
          "This is the principle behind why a clinic should not share your record with your employer, and why an app should not sell your contacts. If you never agreed to a use, you have grounds to ask questions.",
        protects: ["Control over what you agree to", "Use of your information for the stated purpose"],
        actions: [
          "Read privacy notices for the purpose and sharing sections first.",
          "Withdraw consent from services you no longer use.",
          "Keep copies of what you agreed to when signing up.",
        ],
        related: ["electronic-transactions-act-2008"],
      },
      {
        slug: "data-subject-rights",
        label: "Topic",
        title: "Your rights as a data subject",
        topics: ["Privacy & Data Protection", "Rights & Remedies"],
        keywords: ["access", "correction", "deletion", "object", "data subject", "rights"],
        sourceText: null,
        explains:
          "As the person the data is about (the data subject), data-protection frameworks generally give you rights such as knowing what is held about you, asking for corrections, and objecting to certain uses. The exact rights and procedures are set out in the Act itself.",
        whyItMatters:
          "Rights you do not know about cannot protect you. Being able to ask an organisation what it holds about you is often the first step to fixing a problem.",
        protects: ["Your ability to find out what is held about you", "Your ability to seek correction of inaccurate information"],
        actions: [
          "Write to the organisation in writing and keep a copy.",
          "Note dates and responses in case you need to escalate.",
          "Explore the Rights & Remedies topic for next steps.",
        ],
        related: ["constitution-of-ghana"],
      },
      {
        slug: "data-protection-commission",
        label: "Topic",
        title: "The Data Protection Commission and complaints",
        topics: ["Rights & Remedies"],
        keywords: ["Data Protection Commission", "complaint", "regulator", "registration", "DPC"],
        sourceText: null,
        explains:
          "The Act establishes the Data Protection Commission, the independent body responsible for overseeing data protection in Ghana. It is generally the place people turn to when an organisation will not respond to a data-protection concern.",
        whyItMatters:
          "Having a regulator means you are not alone against a large company or institution. Understanding that the Commission exists is the first step to using it.",
        protects: ["An oversight and complaints route for data-protection concerns"],
        actions: [
          "Raise the issue with the organisation first and keep records.",
          "Visit the Data Protection Commission website for current complaint procedures.",
          "Seek legal assistance for serious or ongoing harm.",
        ],
        related: ["constitution-of-ghana", "cybersecurity-act-2020"],
      },
    ],
  },
  {
    slug: "cybersecurity-act-2020",
    title: "Cybersecurity Act, 2020 (Act 1038)",
    shortTitle: "Cybersecurity Act, 2020",
    description: "Understanding cybersecurity rights, responsibilities and protections in Ghana.",
    documentType: "Law",
    country: "Ghana",
    topics: ["Cybersecurity", "Rights & Remedies", "Expression & Information"],
    topicLine: "Cybersecurity · Cyber incidents · Online harms · Reporting",
    sourceOrg: "Cyber Security Authority, Ghana",
    sourceOrgUrl: "https://www.csa.gov.gh",
    sourceUrl: null,
    version: "Act 1038 of 2020",
    lastVerified: null,
    overview:
      "The Cybersecurity Act establishes the Cyber Security Authority and creates a national framework for preventing, reporting and responding to cybersecurity incidents. It is relevant when you are hacked, scammed, or harmed through digital means.",
    provisions: [
      {
        slug: "cyber-security-authority",
        label: "Topic",
        title: "The Cyber Security Authority",
        topics: ["Cybersecurity"],
        keywords: ["Cyber Security Authority", "CSA", "regulator", "national cybersecurity"],
        sourceText: null,
        explains:
          "The Act establishes the Cyber Security Authority as Ghana's lead body for cybersecurity. In simple terms, it is the national institution responsible for coordinating how the country prevents and responds to cyber threats.",
        whyItMatters:
          "When something goes wrong online, it helps to know there is a national authority whose job includes public awareness and incident response, rather than assuming nothing can be done.",
        protects: ["A national institution responsible for cybersecurity coordination"],
        actions: [
          "Visit the Cyber Security Authority website for current public guidance and reporting channels.",
          "Follow DigiHub's Scam Alerts for live threat updates.",
        ],
        related: ["electronic-communications-act-2008"],
      },
      {
        slug: "reporting-cyber-incidents",
        label: "Topic",
        title: "Reporting cybersecurity incidents",
        topics: ["Cybersecurity", "Rights & Remedies"],
        keywords: ["report", "incident", "hacked", "scam", "fraud", "point of contact"],
        sourceText: null,
        explains:
          "The Act provides for structures through which cybersecurity incidents can be reported and handled. In simple terms, there are official routes for reporting when you have been hacked or targeted, and the details are published by the Cyber Security Authority.",
        whyItMatters:
          "Reporting quickly can limit harm, help others and create a record. Many people never report because they do not know where to go or fear being blamed.",
        protects: ["Access to official incident-reporting pathways"],
        actions: [
          "Secure your accounts first: change passwords and enable two-factor authentication.",
          "Preserve screenshots, messages, phone numbers and transaction references.",
          "Check the Cyber Security Authority website for the current reporting channels before contacting them.",
        ],
        related: ["data-protection-act-2012"],
      },
      {
        slug: "online-harms-and-children",
        label: "Topic",
        title: "Online harms, intimate images and protection of vulnerable people",
        topics: ["Cybersecurity", "Rights & Remedies"],
        keywords: ["sextortion", "intimate images", "revenge porn", "children", "online harm", "blackmail"],
        sourceText: null,
        explains:
          "The Act addresses certain online harms, and public guidance from the Cyber Security Authority covers issues such as the non-consensual sharing of intimate images and sextortion. The precise offences and their wording should be read from the official text.",
        whyItMatters:
          "Threats to share private images are one of the most common and frightening digital harms reported by young people and LGBTQI+ communities. Knowing this is treated as a serious matter can help you act rather than pay or panic.",
        protects: ["Recognition of intimate-image abuse and related harms as serious matters"],
        actions: [
          "Do not pay or negotiate with someone threatening you; it rarely stops.",
          "Preserve evidence, then block and report the account on the platform.",
          "Reach out to a trusted organisation and check the official reporting channels.",
        ],
        related: ["constitution-of-ghana", "data-protection-act-2012"],
      },
      {
        slug: "critical-information-infrastructure",
        label: "Topic",
        title: "Critical information infrastructure and lawful powers",
        topics: ["Cybersecurity", "Expression & Information"],
        keywords: ["critical infrastructure", "interception", "lawful", "powers", "oversight"],
        sourceText: null,
        explains:
          "The Act also deals with the protection of critical information infrastructure and sets out powers that authorities may exercise in certain circumstances. Any power to access data or systems is meant to operate within limits set by law.",
        whyItMatters:
          "Understanding that state powers exist, and that they are meant to be bounded by law, matters for journalists, human-rights defenders and anyone concerned about surveillance.",
        protects: ["A legal framework within which cybersecurity powers are meant to operate"],
        actions: [
          "Read the official text before drawing conclusions about specific powers.",
          "Use the Privacy Guides to reduce unnecessary data exposure.",
          "Consult a digital-rights organisation if you believe you are being monitored.",
        ],
        related: ["constitution-of-ghana", "electronic-communications-act-2008"],
      },
    ],
  },
  {
    slug: "electronic-communications-act-2008",
    title: "Electronic Communications Act, 2008 (Act 775)",
    shortTitle: "Electronic Communications Act",
    description: "Understanding rights and protections relating to electronic communications.",
    documentType: "Law",
    country: "Ghana",
    topics: ["Communications & Internet", "Privacy & Data Protection", "Digital Identity"],
    topicLine: "Networks · Telecoms · Consumers · SIM registration",
    sourceOrg: "National Communications Authority, Ghana",
    sourceOrgUrl: "https://nca.org.gh",
    sourceUrl: null,
    version: "Act 775 of 2008",
    lastVerified: null,
    overview:
      "The Electronic Communications Act regulates electronic communications services and networks in Ghana, including the telecom operators you rely on for calls, SMS and mobile data. It is the framework behind how networks are licensed and how consumers are treated.",
    provisions: [
      {
        slug: "regulation-of-networks",
        label: "Topic",
        title: "Regulation of communications networks and services",
        topics: ["Communications & Internet"],
        keywords: ["telecom", "network", "licence", "operator", "NCA", "mobile"],
        sourceText: null,
        explains:
          "The Act provides the legal framework under which communications networks and services are licensed and regulated, with the National Communications Authority as the regulator. In simple terms, your mobile network operates under rules, not just its own terms.",
        whyItMatters:
          "If you have a dispute with your network about service, billing or your SIM, knowing that a regulator exists gives you somewhere to turn when customer care fails.",
        protects: ["A regulated environment for the networks you depend on"],
        actions: [
          "Keep records of complaints made to your network operator.",
          "Visit the National Communications Authority website for consumer information.",
        ],
        related: ["electronic-transactions-act-2008"],
      },
      {
        slug: "consumer-and-subscriber-protections",
        label: "Topic",
        title: "Consumers, subscribers and SIM registration",
        topics: ["Communications & Internet", "Digital Identity"],
        keywords: ["SIM registration", "subscriber", "consumer", "Ghana Card", "identity"],
        sourceText: null,
        explains:
          "Rules made under the communications framework govern matters such as subscriber registration. SIM registration links a phone number to a verified identity, which has both safety and privacy implications.",
        whyItMatters:
          "Because your number is tied to your identity, a SIM swap or a leaked subscriber database can expose you. Understanding this helps you protect your number like an account.",
        protects: ["A rules-based framework for subscriber registration and consumer treatment"],
        actions: [
          "Set a SIM PIN and ask your operator about SIM-swap protections.",
          "Do not use SMS as your only two-factor method where an authenticator app is available.",
          "Explore the Cybersecurity resources for account-security steps.",
        ],
        related: ["data-protection-act-2012"],
      },
      {
        slug: "communications-privacy-and-interception",
        label: "Topic",
        title: "Communications privacy and lawful interception",
        topics: ["Privacy & Data Protection", "Communications & Internet"],
        keywords: ["interception", "privacy", "wiretap", "confidentiality", "communication"],
        sourceText: null,
        explains:
          "Communications frameworks generally address the confidentiality of communications and the narrow, lawful circumstances in which interception may occur. The specific rules should be read from the official text alongside Article 18 of the Constitution.",
        whyItMatters:
          "This is the layer that sits between your constitutional right to private communication and the everyday reality of networks carrying your calls and messages.",
        protects: ["Confidentiality of communications within the limits set by law"],
        actions: [
          "Use end-to-end encrypted messaging apps from the Secure Apps list.",
          "Take the Privacy Score to check your communications habits.",
          "Seek advice if you suspect unlawful interception.",
        ],
        related: ["constitution-of-ghana", "cybersecurity-act-2020"],
      },
    ],
  },
  {
    slug: "electronic-transactions-act-2008",
    title: "Electronic Transactions Act, 2008 (Act 772)",
    shortTitle: "Electronic Transactions Act",
    description: "Understanding Ghana's legal framework for electronic transactions and digital activity.",
    documentType: "Law",
    country: "Ghana",
    topics: ["Communications & Internet", "Cybersecurity", "Emerging Technology"],
    topicLine: "Electronic records · Online transactions · Digital evidence · Cyber offences",
    sourceOrg: "Republic of Ghana",
    sourceOrgUrl: null,
    sourceUrl: null,
    version: "Act 772 of 2008",
    lastVerified: null,
    overview:
      "The Electronic Transactions Act gives legal recognition to electronic records, signatures and transactions, and historically contained provisions on computer-related offences. It matters whenever you buy, sign, pay or agree to something electronically.",
    provisions: [
      {
        slug: "legal-recognition-of-electronic-records",
        label: "Topic",
        title: "Legal recognition of electronic records and signatures",
        topics: ["Communications & Internet", "Emerging Technology"],
        keywords: ["electronic record", "electronic signature", "contract", "evidence", "mobile money"],
        sourceText: null,
        explains:
          "The Act is generally understood as giving electronic records and signatures legal standing, so that an agreement is not invalid simply because it was made electronically. In simple terms, your digital receipts, messages and confirmations can matter legally.",
        whyItMatters:
          "Mobile-money receipts, WhatsApp agreements and email confirmations are everyday evidence. Knowing they can carry weight encourages you to keep them.",
        protects: ["Legal standing for electronic records and transactions"],
        actions: [
          "Save transaction confirmations and screenshots in a secure, backed-up folder.",
          "Use the Digital Safety Toolkit templates to organise evidence.",
        ],
        related: ["data-protection-act-2012"],
      },
      {
        slug: "consumer-protection-online",
        label: "Topic",
        title: "Consumer protection in electronic transactions",
        topics: ["Communications & Internet", "Rights & Remedies"],
        keywords: ["online shopping", "consumer", "refund", "scam", "vendor", "e-commerce"],
        sourceText: null,
        explains:
          "Electronic-transactions frameworks typically include protections for people transacting online, such as expectations about information a seller should provide. The exact protections should be read from the official text.",
        whyItMatters:
          "Online scams often rely on you believing you have no rights once money has left your wallet. Understanding the framework helps you decide what to do next.",
        protects: ["A framework for fair dealing in electronic transactions"],
        actions: [
          "Check DigiHub's Scam Alerts before paying unfamiliar vendors.",
          "Keep all messages, adverts and payment references if something goes wrong.",
          "Report suspected fraud through the official channels published by the Cyber Security Authority.",
        ],
        related: ["cybersecurity-act-2020"],
      },
      {
        slug: "cyber-offences",
        label: "Topic",
        title: "Computer-related offences",
        topics: ["Cybersecurity"],
        keywords: ["unauthorised access", "hacking", "offence", "computer misuse", "identity theft"],
        sourceText: null,
        explains:
          "The Act has historically addressed computer-related offences such as unauthorised access to systems and data. Some of this ground is now also covered by the Cybersecurity Act, 2020, so both should be read together and from official sources.",
        whyItMatters:
          "If someone breaks into your account or device, it is useful to know that unauthorised access is treated as a legal matter and not just a personal misfortune.",
        protects: ["Recognition of unauthorised access and related conduct as offences"],
        actions: [
          "Secure the affected account and every account that shares its password.",
          "Preserve login alerts, emails and screenshots as evidence.",
          "Explore the I Have a Problem navigator for step-by-step guidance.",
        ],
        related: ["cybersecurity-act-2020"],
      },
    ],
  },
];

export const getResource = (slug: string) => legalResources.find((r) => r.slug === slug);

export const getTopicMeta = (name: RightsTopic) => rightsTopics.find((t) => t.name === name)!;

export interface SearchHit {
  kind: "resource" | "provision" | "topic";
  title: string;
  subtitle: string;
  to: string;
}

export const searchLibrary = (query: string): SearchHit[] => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const hits: SearchHit[] = [];
  rightsTopics.forEach((t) => {
    if (t.name.toLowerCase().includes(q) || t.blurb.toLowerCase().includes(q))
      hits.push({ kind: "topic", title: t.name, subtitle: "Topic", to: `/digihub/your-rights?topic=${t.slug}` });
  });
  legalResources.forEach((r) => {
    const hay = [r.title, r.shortTitle, r.description, r.topicLine, r.overview, r.documentType].join(" ").toLowerCase();
    if (hay.includes(q)) hits.push({ kind: "resource", title: r.shortTitle, subtitle: r.documentType, to: `/digihub/your-rights/${r.slug}` });
    r.provisions.forEach((p) => {
      const ph = [p.label, p.title, p.explains, p.whyItMatters, ...p.keywords, ...p.protects].join(" ").toLowerCase();
      if (ph.includes(q))
        hits.push({ kind: "provision", title: `${p.label} — ${p.title}`, subtitle: r.shortTitle, to: `/digihub/your-rights/${r.slug}/${p.slug}` });
    });
  });
  return hits.slice(0, 12);
};

// ------------------------------------------------------------------
// I HAVE A PROBLEM — problem navigator content (educational only)
// ------------------------------------------------------------------

export interface ProblemGuide {
  slug: string;
  emoji: string;
  title: string;
  mayInvolve: string;
  rights: string[];
  resources: { label: string; to: string }[];
  safetySteps: string[];
  evidence: string[];
  pathways: string[];
  digihub: { label: string; to: string }[];
}

export const problems: ProblemGuide[] = [
  {
    slug: "personal-info-accessed",
    emoji: "🔐",
    title: "Someone accessed my personal information",
    mayInvolve: "Unauthorised access to your data, a leak by an organisation, or someone close to you going through your device.",
    rights: ["Privacy of correspondence and communication", "Data-protection rights over your personal information"],
    resources: [
      { label: "Constitution — Article 18 (Privacy)", to: "/digihub/your-rights/constitution-of-ghana/article-18-privacy" },
      { label: "Data Protection Act — Your rights as a data subject", to: "/digihub/your-rights/data-protection-act-2012/data-subject-rights" },
    ],
    safetySteps: ["Change passwords on the affected accounts and any that share them.", "Turn on two-factor authentication.", "Review logged-in devices and sign out unknown sessions."],
    evidence: ["Screenshots of unfamiliar activity or login alerts", "Dates and times you noticed the access", "Any messages from the person who accessed it"],
    pathways: ["Raise the issue with the organisation that held your data, in writing.", "Check the Data Protection Commission website for complaint procedures.", "Seek legal or human-rights support for serious harm."],
    digihub: [{ label: "Privacy Score", to: "/digihub/privacy-score" }, { label: "Privacy Guides", to: "/digihub/privacy-guides" }, { label: "Secure Apps", to: "/digihub/apps" }],
  },
  {
    slug: "hacked",
    emoji: "📱",
    title: "My phone or account was hacked",
    mayInvolve: "Unauthorised access to a device or account, often through phishing, SIM swap, malware or a reused password.",
    rights: ["Protection from unauthorised access to your systems and data", "Access to official incident-reporting pathways"],
    resources: [
      { label: "Cybersecurity Act — Reporting cybersecurity incidents", to: "/digihub/your-rights/cybersecurity-act-2020/reporting-cyber-incidents" },
      { label: "Electronic Transactions Act — Computer-related offences", to: "/digihub/your-rights/electronic-transactions-act-2008/cyber-offences" },
    ],
    safetySteps: ["From a clean device, reset passwords starting with email.", "Enable two-factor authentication using an authenticator app.", "Warn contacts if the account was used to message them.", "Run a security check-up and remove unknown apps."],
    evidence: ["Login alerts and security emails", "Screenshots of messages sent without your knowledge", "Transaction references if money moved"],
    pathways: ["Report through the platform's account-recovery and abuse tools.", "Check the Cyber Security Authority website for current incident-reporting channels.", "Report financial loss to your bank or mobile-money provider immediately."],
    digihub: [{ label: "Cybersecurity resources", to: "/digihub/cybersecurity" }, { label: "Digital Safety Plan", to: "/digihub/action-plan" }, { label: "Scam Alerts", to: "/digihub/alerts" }],
  },
  {
    slug: "intimate-images",
    emoji: "📸",
    title: "Someone is threatening to share my private images",
    mayInvolve: "Sextortion or intimate-image abuse, where someone uses private images to pressure, shame or extort you.",
    rights: ["Dignity and privacy", "Recognition of intimate-image abuse as a serious harm"],
    resources: [
      { label: "Cybersecurity Act — Online harms and intimate images", to: "/digihub/your-rights/cybersecurity-act-2020/online-harms-and-children" },
      { label: "Constitution — Article 15 (Dignity)", to: "/digihub/your-rights/constitution-of-ghana/article-15-dignity" },
    ],
    safetySteps: ["Do not pay; payment rarely ends the threats.", "Stop responding, but do not delete the conversation.", "Tighten privacy settings and warn a trusted person.", "Use platform tools designed for intimate-image reports."],
    evidence: ["Screenshots of threats including usernames, dates and times", "Payment demands and any account numbers given", "Profile links of the person threatening you"],
    pathways: ["Report the account on the platform.", "Check the Cyber Security Authority website for official reporting channels.", "Contact a trusted community or legal organisation for support."],
    digihub: [{ label: "Privacy Guides", to: "/digihub/privacy-guides" }, { label: "Scam Alerts", to: "/digihub/alerts" }, { label: "Ask Orenta", to: "/digihub#ask-orenta" }],
  },
  {
    slug: "scammed",
    emoji: "💳",
    title: "I think I've been scammed",
    mayInvolve: "Fraud through fake vendors, job offers, investment schemes, romance scams or impersonation.",
    rights: ["Fair dealing in electronic transactions", "Access to official incident-reporting pathways"],
    resources: [
      { label: "Electronic Transactions Act — Consumer protection online", to: "/digihub/your-rights/electronic-transactions-act-2008/consumer-protection-online" },
      { label: "Cybersecurity Act — Reporting cybersecurity incidents", to: "/digihub/your-rights/cybersecurity-act-2020/reporting-cyber-incidents" },
    ],
    safetySteps: ["Stop all further payments.", "Contact your bank or mobile-money provider immediately.", "Change passwords if you shared any login details."],
    evidence: ["Payment references and receipts", "Adverts, messages and phone numbers used by the scammer", "Screenshots of profiles and websites"],
    pathways: ["Report to your financial provider first.", "Check the Cyber Security Authority website for fraud-reporting channels.", "Report the account to the platform where it happened."],
    digihub: [{ label: "Scam Alerts", to: "/digihub/alerts" }, { label: "Digital Safety Toolkit", to: "/digihub/toolkits" }],
  },
  {
    slug: "org-misused-data",
    emoji: "👤",
    title: "An organisation misused my information",
    mayInvolve: "A company, clinic, school, employer or app using or sharing your data in a way you did not agree to.",
    rights: ["Fair processing for a stated purpose", "Data-subject rights and access to a regulator"],
    resources: [
      { label: "Data Protection Act — Consent and purpose", to: "/digihub/your-rights/data-protection-act-2012/consent-and-purpose" },
      { label: "Data Protection Act — The Data Protection Commission", to: "/digihub/your-rights/data-protection-act-2012/data-protection-commission" },
    ],
    safetySteps: ["Withdraw consent and close accounts you no longer need.", "Check what other organisations received the data."],
    evidence: ["The privacy notice or terms you agreed to", "Written communication with the organisation", "Proof of the misuse, such as unexpected messages or exposure"],
    pathways: ["Complain to the organisation in writing and keep a copy.", "Check the Data Protection Commission website for how to escalate.", "Seek legal assistance for serious harm."],
    digihub: [{ label: "Privacy Guides", to: "/digihub/privacy-guides" }, { label: "Digital Rights articles", to: "/digihub/digital-rights" }],
  },
  {
    slug: "expression-restricted",
    emoji: "📢",
    title: "My online expression was restricted",
    mayInvolve: "A post removed, an account suspended, pressure to delete content, or threats for speaking out.",
    rights: ["Freedom of speech, expression and information", "Equality and freedom from discrimination"],
    resources: [
      { label: "Constitution — Article 21 (Fundamental freedoms)", to: "/digihub/your-rights/constitution-of-ghana/article-21-freedoms" },
      { label: "Constitution — Article 17 (Equality)", to: "/digihub/your-rights/constitution-of-ghana/article-17-equality" },
    ],
    safetySteps: ["Confirm the account was not hacked.", "Back up your content.", "Review who can see and comment on your posts."],
    evidence: ["Screenshots of the removal or suspension notice", "Copies of the content and its dates", "Any threats or demands received"],
    pathways: ["Use the platform's appeal process.", "Contact a digital-rights or press-freedom organisation.", "Seek legal advice if a state actor is involved."],
    digihub: [{ label: "Digital Rights articles", to: "/digihub/digital-rights" }, { label: "News & Explainers", to: "/digihub/news" }],
  },
  {
    slug: "being-monitored",
    emoji: "🕵🏾",
    title: "I think I am being monitored",
    mayInvolve: "Stalkerware, a shared account, a compromised device, or surveillance by someone with access to your phone or network.",
    rights: ["Privacy of correspondence and communication", "Confidentiality of communications within the limits of law"],
    resources: [
      { label: "Constitution — Article 18 (Privacy)", to: "/digihub/your-rights/constitution-of-ghana/article-18-privacy" },
      { label: "Electronic Communications Act — Communications privacy", to: "/digihub/your-rights/electronic-communications-act-2008/communications-privacy-and-interception" },
    ],
    safetySteps: ["Check for unknown apps, profiles and device administrators.", "Review account sessions and linked devices.", "Consider a factory reset from a safe location.", "Use end-to-end encrypted apps for sensitive conversations."],
    evidence: ["Names of suspicious apps and when they appeared", "Screenshots of unfamiliar sessions or logins", "A timeline of incidents that suggested monitoring"],
    pathways: ["Speak to a trusted digital-safety helper or clinic.", "Contact a digital-rights organisation for a device check.", "Seek legal advice if you believe interception is unlawful."],
    digihub: [{ label: "Privacy Score", to: "/digihub/privacy-score" }, { label: "Secure Apps", to: "/digihub/apps" }, { label: "Cybersecurity resources", to: "/digihub/cybersecurity" }],
  },
  {
    slug: "harassment",
    emoji: "⚠️",
    title: "I experienced online harassment",
    mayInvolve: "Repeated abusive messages, threats, doxxing, impersonation or coordinated attacks.",
    rights: ["Dignity", "Equality and freedom from discrimination", "Privacy"],
    resources: [
      { label: "Constitution — Article 15 (Dignity)", to: "/digihub/your-rights/constitution-of-ghana/article-15-dignity" },
      { label: "Cybersecurity Act — Online harms", to: "/digihub/your-rights/cybersecurity-act-2020/online-harms-and-children" },
    ],
    safetySteps: ["Block and mute, but preserve evidence first.", "Lock down who can message and tag you.", "Tell someone you trust and take breaks from the platform."],
    evidence: ["Screenshots with usernames, dates and times", "Links to the profiles and posts", "A log of incidents and how they affected you"],
    pathways: ["Report to the platform.", "Check the Cyber Security Authority website for reporting channels.", "Seek support from a community or legal organisation."],
    digihub: [{ label: "Privacy Guides", to: "/digihub/privacy-guides" }, { label: "Digital Rights articles", to: "/digihub/digital-rights" }, { label: "Clinics", to: "/digihub/clinics" }],
  },
  {
    slug: "understand-rights",
    emoji: "🧑🏾‍⚖️",
    title: "I want to understand my rights",
    mayInvolve: "You are not in a crisis but want to know where you stand before something happens.",
    rights: ["Privacy", "Expression and information", "Equality and dignity", "Access to remedies"],
    resources: [
      { label: "Constitution of Ghana", to: "/digihub/your-rights/constitution-of-ghana" },
      { label: "Data Protection Act, 2012", to: "/digihub/your-rights/data-protection-act-2012" },
      { label: "Cybersecurity Act, 2020", to: "/digihub/your-rights/cybersecurity-act-2020" },
    ],
    safetySteps: ["Start with the Privacy Score to see where you stand.", "Build a Digital Safety Plan you can actually follow."],
    evidence: ["Nothing to preserve yet, but get into the habit of keeping receipts and screenshots."],
    pathways: ["Explore the library at your own pace.", "Ask Orenta when something is unclear."],
    digihub: [{ label: "Privacy Score", to: "/digihub/privacy-score" }, { label: "Digital Safety Plan", to: "/digihub/action-plan" }, { label: "Video Library", to: "/digihub/videos" }],
  },
];

export const getProblem = (slug: string) => problems.find((p) => p.slug === slug);
