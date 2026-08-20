// DigiHub content library. Future content will be manageable from the
// Intelligence Dashboard; these arrays are the current source of truth.

export type Category =
  | "Privacy"
  | "Cybersecurity"
  | "Digital Rights"
  | "Scam Awareness"
  | "Social Media Safety";

export interface SecureApp {
  name: string;
  category: string;
  description: string;
  platforms: string;
  link: string;
  rating: number; // out of 5
  openSource: boolean;
}

export const appCategories = [
  "Secure Messaging",
  "VPNs",
  "Password Managers",
  "Secure Browsers",
  "Secure Email",
  "Authentication Apps",
  "Encrypted Cloud Storage",
];

export const secureApps: SecureApp[] = [
  { name: "Signal", category: "Secure Messaging", description: "End-to-end encrypted messaging and calls with disappearing messages and no message metadata retention.", platforms: "Android, iOS, Desktop", link: "https://signal.org", rating: 5, openSource: true },
  { name: "Molly", category: "Secure Messaging", description: "A hardened Signal client for Android with database encryption at rest.", platforms: "Android", link: "https://molly.im", rating: 4.5, openSource: true },
  { name: "Session", category: "Secure Messaging", description: "Messaging without a phone number or email, routed over a decentralised network.", platforms: "Android, iOS, Desktop", link: "https://getsession.org", rating: 4, openSource: true },
  { name: "Mullvad VPN", category: "VPNs", description: "No-account VPN that accepts anonymous payment and keeps no activity logs.", platforms: "Android, iOS, Desktop", link: "https://mullvad.net", rating: 5, openSource: true },
  { name: "Proton VPN", category: "VPNs", description: "Audited VPN with a genuinely usable free tier and Secure Core routing.", platforms: "Android, iOS, Desktop", link: "https://protonvpn.com", rating: 4.5, openSource: true },
  { name: "Bitwarden", category: "Password Managers", description: "Free, audited password manager with passkey support and encrypted sharing.", platforms: "Android, iOS, Desktop, Web", link: "https://bitwarden.com", rating: 5, openSource: true },
  { name: "KeePassDXC", category: "Password Managers", description: "Fully offline password vault, useful where you do not want any cloud copy.", platforms: "Android, Desktop", link: "https://www.keepassdx.com", rating: 4, openSource: true },
  { name: "Brave", category: "Secure Browsers", description: "Blocks trackers and ads by default, with a private window that routes over Tor.", platforms: "Android, iOS, Desktop", link: "https://brave.com", rating: 4.5, openSource: true },
  { name: "Tor Browser", category: "Secure Browsers", description: "The strongest available protection against network surveillance and traffic analysis.", platforms: "Android, Desktop", link: "https://www.torproject.org", rating: 5, openSource: true },
  { name: "Proton Mail", category: "Secure Email", description: "End-to-end encrypted mailbox that can be opened without personal details.", platforms: "Android, iOS, Web", link: "https://proton.me/mail", rating: 4.5, openSource: true },
  { name: "Tuta", category: "Secure Email", description: "Encrypted email with encrypted subject lines and calendar.", platforms: "Android, iOS, Desktop, Web", link: "https://tuta.com", rating: 4.5, openSource: true },
  { name: "Aegis Authenticator", category: "Authentication Apps", description: "Encrypted two-factor code vault with offline encrypted backups.", platforms: "Android", link: "https://getaegis.app", rating: 5, openSource: true },
  { name: "Ente Auth", category: "Authentication Apps", description: "Two-factor codes with end-to-end encrypted sync across devices.", platforms: "Android, iOS, Desktop", link: "https://ente.io/auth", rating: 4.5, openSource: true },
  { name: "Cryptomator", category: "Encrypted Cloud Storage", description: "Encrypts files before they reach any cloud drive you already use.", platforms: "Android, iOS, Desktop", link: "https://cryptomator.org", rating: 4.5, openSource: true },
  { name: "Proton Drive", category: "Encrypted Cloud Storage", description: "End-to-end encrypted cloud storage with encrypted file sharing links.", platforms: "Android, iOS, Web", link: "https://proton.me/drive", rating: 4, openSource: true },
];

export interface Video {
  id: string; // YouTube ID
  title: string;
  duration: string;
  category: Category;
  blurb: string;
}

export const videos: Video[] = [
  { id: "JO55V34EnK8", title: "How to protect your privacy online", duration: "5:47", category: "Privacy", blurb: "Kaspersky walks through the settings that matter most, in plain language." },
  { id: "sGbixee041A", title: "How to reduce your online footprint", duration: "10:17", category: "Privacy", blurb: "Proton on shrinking the trail you leave behind on everyday services." },
  { id: "dMWEym0KPcA", title: "The complete Android privacy and security guide", duration: "21:46", category: "Privacy", blurb: "Techlore's full walkthrough for hardening an Android phone." },
  { id: "hH7hmlEIijQ", title: "Every Android privacy setting to change now", duration: "16:30", category: "Privacy", blurb: "A setting-by-setting tour you can follow on your own device." },
  { id: "Tw1wX9sbstw", title: "Turn off phone tracking and listening", duration: "4:53", category: "Privacy", blurb: "The location and microphone permissions worth revoking today." },
  { id: "3rxTrhSjNPE", title: "End-to-end encryption in three minutes", duration: "2:49", category: "Privacy", blurb: "The simplest explanation of what encryption does and does not hide." },
  { id: "jkV1KEJGKRA", title: "End-to-end encryption explained", duration: "8:12", category: "Privacy", blurb: "Computerphile goes a level deeper for anyone who wants the detail." },
  { id: "c2OkOckSD20", title: "What is end-to-end encryption?", duration: "5:25", category: "Privacy", blurb: "BBC News on why encryption matters and why governments contest it." },
  { id: "xUp5S0nBnfc", title: "How to make passwords more secure", duration: "2:56", category: "Cybersecurity", blurb: "IBM on passphrases, reuse and what attackers do with a leaked password." },
  { id: "wcDtLMraTkQ", title: "What is a password manager?", duration: "4:53", category: "Cybersecurity", blurb: "A simple explainer plus a first-time setup walkthrough." },
  { id: "ugeLoJNjfPk", title: "How to use a password manager, beginners guide", duration: "7:10", category: "Cybersecurity", blurb: "Step-by-step from install to importing your existing passwords." },
  { id: "0mvCeNsTa1g", title: "What is two-factor authentication?", duration: "1:59", category: "Cybersecurity", blurb: "The short version: why one password is never enough." },
  { id: "ZXFYT-BG2So", title: "Two-factor authentication, in depth", duration: "12:34", category: "Cybersecurity", blurb: "Why SMS codes are the weakest option, and what to use instead." },
  { id: "Uy60wy20ADE", title: "Seven cybersecurity habits that are easy to keep", duration: "13:49", category: "Cybersecurity", blurb: "Practical habits that survive a lost phone or a leaked password." },
  { id: "mqZzXUzxUYM", title: "How attackers use public Wi-Fi against you", duration: "3:31", category: "Cybersecurity", blurb: "What actually happens on an untrusted network." },
  { id: "bdVkkRmJEeM", title: "Is public Wi-Fi safe?", duration: "2:54", category: "Cybersecurity", blurb: "Real risks, exaggerated risks and the practical fix." },
  { id: "uCjP0fGglYI", title: "Practical cybersecurity for activists and organisers", duration: "1:00:55", category: "Cybersecurity", blurb: "A full training session aimed at people organising under pressure." },
  { id: "iHetr8xTWIU", title: "How to spot a phishing email", duration: "2:07", category: "Scam Awareness", blurb: "The patterns behind fake links, urgent requests and cloned pages." },
  { id: "e3f8mldBTKE", title: "Spot a phishing email in seconds", duration: "3:16", category: "Scam Awareness", blurb: "A fast checklist you can run before clicking anything." },
  { id: "ykP-9gFkIcs", title: "Text message scams, smishing explained", duration: "3:19", category: "Scam Awareness", blurb: "How fake delivery, bank and payment texts are built." },
  { id: "npDZ4ILnvyI", title: "How to instantly spot a romance scam", duration: "4:11", category: "Scam Awareness", blurb: "Early signals in the conversation, before any money is asked for." },
  { id: "DrPk0G8NXec", title: "Protecting yourself from romance and sextortion scams", duration: "2:40", category: "Scam Awareness", blurb: "What to do first if someone threatens to expose your images." },
  { id: "C55T8KkDgSU", title: "What are digital rights?", duration: "0:57", category: "Digital Rights", blurb: "A one-minute definition from the African Digital Rights Network." },
  { id: "bZzKmZFHA1w", title: "Your clicks, your rights", duration: "5:34", category: "Digital Rights", blurb: "Privacy, expression and access as human rights in the digital space." },
  { id: "WvVM61Nn1Xs", title: "You need to know your digital rights", duration: "6:55", category: "Digital Rights", blurb: "What your rights mean in everyday online situations." },
  { id: "w_QdpSryyUE", title: "Master your social media privacy settings", duration: "5:36", category: "Social Media Safety", blurb: "Locking down who can find, tag and message you." },
  { id: "VrcZCe62Kd8", title: "Keep your personal information safe on social media", duration: "6:10", category: "Social Media Safety", blurb: "What a stranger can learn from a single public profile." },
];


export interface Alert {
  slug: string;
  severity: "High" | "Medium" | "Low";
  title: string;
  date: string;
  summary: string;
  detail: string[];
  actions: string[];
}

export const alerts: Alert[] = [
  {
    slug: "momo-cashback-sms",
    severity: "High",
    title: "Fake Mobile Money cashback SMS",
    date: "August 2026",
    summary: "Messages claim a reversed payment and ask you to confirm your PIN or approve a prompt.",
    detail: [
      "Victims receive an SMS or WhatsApp message that looks like a Mobile Money notification, followed by a call from someone claiming to be an agent.",
      "The caller creates urgency, saying money was sent to you by mistake and must be reversed immediately.",
      "Approving the prompt or sharing the PIN authorises a withdrawal from your own wallet.",
    ],
    actions: [
      "No operator or agent will ever ask for your PIN.",
      "End the call and dial the operator's official short code yourself.",
      "Check your balance before acting on any reversal claim.",
    ],
  },
  {
    slug: "dating-profile-extortion",
    severity: "High",
    title: "Fake dating profiles harvesting images for extortion",
    date: "August 2026",
    summary: "Accounts request explicit images early in the conversation, then threaten exposure.",
    detail: [
      "Profiles are newly created, use borrowed photos and push very quickly toward private images or an in-person meeting in an unfamiliar location.",
      "Once images are shared, the account threatens to send them to family, employers or community pages unless money is paid.",
      "Payment almost always leads to further demands.",
    ],
    actions: [
      "Never share identifiable images, including recognisable rooms, tattoos or documents.",
      "Reverse-image-search profile photos before meeting anyone.",
      "Capture screenshots, stop paying, and reach the clinic intake for support.",
    ],
  },
  {
    slug: "sim-swap-organisers",
    severity: "High",
    title: "SIM-swap attempts targeting community organisers",
    date: "July 2026",
    summary: "Attackers port a number to a new SIM to intercept account recovery codes.",
    detail: [
      "The first sign is a sudden loss of network on your own SIM.",
      "Once the number is ported, SMS recovery codes for email, social media and Mobile Money go to the attacker.",
    ],
    actions: [
      "Set a SIM PIN with your operator.",
      "Move account recovery from SMS to an authenticator app.",
      "If your line goes dead unexpectedly, contact your operator immediately.",
    ],
  },
  {
    slug: "malicious-health-apk",
    severity: "Medium",
    title: "Malicious 'health support' APK circulating on WhatsApp",
    date: "July 2026",
    summary: "An installer file requests contacts, storage and SMS permissions.",
    detail: [
      "The file is shared in group chats with a message about free HIV support or free data.",
      "Once installed it reads SMS codes and uploads the contact list.",
    ],
    actions: [
      "Install apps only from official stores or verified Amelio links.",
      "Review app permissions and remove anything unfamiliar.",
    ],
  },
  {
    slug: "donor-phishing",
    severity: "Medium",
    title: "Phishing emails impersonating donor organisations",
    date: "June 2026",
    summary: "Grant-themed emails link to cloned sign-in pages.",
    detail: [
      "Sender domains are close copies of real organisations, with one changed letter.",
      "The link opens a convincing login page that captures the password and code.",
    ],
    actions: [
      "Check the sender domain character by character.",
      "Never sign in from a link in an unexpected message.",
    ],
  },
];

export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  body: string[];
}

export const news: NewsItem[] = [
  {
    slug: "ghana-data-protection-review",
    title: "What Ghana's Data Protection Act means for you",
    date: "August 2026",
    category: "Digital Rights",
    summary: "Your rights over the personal data organisations hold, in plain language.",
    body: [
      "The Data Protection Act, 2012 (Act 843) gives you the right to know what personal data an organisation holds about you, to correct it, and to object to processing that causes you harm.",
      "In practice, this means a service must tell you why it is collecting your data, must not use it for an unrelated purpose, and must keep it secure.",
      "If a body refuses a request, you can complain to the Data Protection Commission.",
    ],
  },
  {
    slug: "whatsapp-privacy-features",
    title: "New WhatsApp privacy features worth turning on",
    date: "July 2026",
    category: "Privacy",
    summary: "Chat lock, disappearing messages and silencing unknown callers.",
    body: [
      "Chat lock moves selected conversations into a separate, locked folder that does not show previews.",
      "Disappearing messages set on by default reduces what a seized phone can reveal.",
      "Silencing unknown callers cuts most extortion cold-calls before they reach you.",
    ],
  },
  {
    slug: "surveillance-and-community-safety",
    title: "Surveillance, stigma and why digital safety is health work",
    date: "June 2026",
    category: "Explainer",
    summary: "The same fear that keeps people out of clinics keeps them silent online.",
    body: [
      "Digital exposure is not an abstract risk for LGBTQI+ people and key populations. It changes where someone can live, work and seek care.",
      "That is why DigiHub sits alongside Synapse: protecting a person's data is part of protecting their access to treatment.",
    ],
  },
];

export interface ClinicEvent {
  slug: string;
  title: string;
  type: "In-person Workshop" | "Virtual Session" | "Multi-week Cohort";
  date: string;
  location: string;
  seats: string;
  blurb: string;
  status: "Open" | "Waiting list";
}

export const clinicEvents: ClinicEvent[] = [
  { slug: "accra-workshop-aug", title: "Digital Rights Workshop, Accra", type: "In-person Workshop", date: "16 August 2026", location: "Accra", seats: "30 seats", blurb: "A full-day hands-on session covering device hardening, account recovery and safer social media.", status: "Open" },
  { slug: "privacy-security-webinar", title: "Privacy & Security Webinar", type: "Virtual Session", date: "22 August 2026", location: "Online", seats: "Unlimited", blurb: "A 90-minute live session with Q&A on passwords, two-factor authentication and phishing.", status: "Open" },
  { slug: "kumasi-workshop-aug", title: "Digital Rights Workshop, Kumasi", type: "In-person Workshop", date: "30 August 2026", location: "Kumasi", seats: "25 seats", blurb: "Practical exercises for community organisers and peer navigators.", status: "Open" },
  { slug: "three-month-cohort", title: "3-Month Digital Rights & Safety Cohort", type: "Multi-week Cohort", date: "Starts 5 September 2026", location: "Hybrid", seats: "20 places", blurb: "Three in-person workshops, two virtual sessions each month, practical exercises, a personal Digital Safety Plan and a certificate of completion.", status: "Waiting list" },
];

export interface Toolkit {
  title: string;
  format: string;
  size: string;
  blurb: string;
}

export const toolkits: Toolkit[] = [
  { title: "Digital Safety Plan Template", format: "PDF", size: "420 KB", blurb: "The printable version of the plan DigiHub generates for you." },
  { title: "Personal Threat Model Worksheet", format: "PDF", size: "310 KB", blurb: "Four questions that turn a vague worry into a concrete plan." },
  { title: "Safer Dating & Meet-Up Checklist", format: "PDF", size: "275 KB", blurb: "What to verify, what to share, and who should know where you are." },
  { title: "Device Seizure Response Card", format: "PDF", size: "180 KB", blurb: "A wallet-sized card for the first ten minutes after a device is taken." },
  { title: "Secure Tools We Recommend", format: "PDF", size: "512 KB", blurb: "The curated app list, formatted for offline sharing." },
  { title: "Community Facilitator Guide", format: "PDF", size: "1.1 MB", blurb: "Run a clinic module yourself, with timings and exercises." },
];

export interface Guide {
  slug: string;
  title: string;
  minutes: number;
  summary: string;
  steps: string[];
}

export const privacyGuides: Guide[] = [
  { slug: "lock-down-your-phone", title: "Lock down your phone in 15 minutes", minutes: 15, summary: "The highest-value settings on any Android or iPhone.", steps: ["Set a six-digit PIN or longer passphrase, not a pattern.", "Turn off lock-screen message previews.", "Review app permissions and revoke location, microphone and contacts where they are not needed.", "Turn on encrypted backup and store the recovery key offline.", "Set a SIM PIN with your operator."] },
  { slug: "safer-social-media", title: "Make your social media harder to trace", minutes: 20, summary: "Reduce what a stranger can learn from a single profile.", steps: ["Remove your phone number from discoverability settings.", "Set posts, followers and tagged photos to friends-only.", "Strip location data by disabling location tagging in the camera app.", "Audit old posts for identifiable places, workplaces and faces.", "Use a separate email address for community accounts."] },
  { slug: "safer-browsing", title: "Browse without leaving a trail", minutes: 12, summary: "Practical browsing hygiene on a low-end phone.", steps: ["Use a tracker-blocking browser.", "Clear site data automatically on close.", "Avoid signing in to personal accounts on shared devices.", "Use a VPN on networks you do not control."] },
];

export const digitalRightsArticles: Guide[] = [
  { slug: "your-rights-online-ghana", title: "Your digital rights in Ghana", minutes: 8, summary: "Privacy, expression, association and access, and where they are protected.", steps: ["The 1992 Constitution protects privacy of correspondence and communication.", "The Data Protection Act, 2012 governs how organisations may collect and use your data.", "The Cybersecurity Act, 2020 creates reporting routes for online harm, including a 24-hour Cybersecurity Incident Reporting Point of Contact.", "Rights are only useful when documented, so keep records of violations."] },
  { slug: "documenting-violations", title: "Documenting a digital rights violation", minutes: 10, summary: "How to record what happened without exposing yourself further.", steps: ["Capture screenshots with visible dates, URLs and account handles.", "Record the time, platform and what you did in response.", "Store evidence in an encrypted folder, not the camera roll.", "Share only with a trusted organisation or legal support."] },
  { slug: "when-a-device-is-seized", title: "If your device is seized", minutes: 7, summary: "What to do in the first hour, and what not to say.", steps: ["Stay calm and do not unlock the device voluntarily.", "Note who took it, when and under what authority.", "From another device, sign out all sessions and change key passwords.", "Contact legal support and the clinic intake."] },
];

export const cybersecurityArticles: Guide[] = [
  { slug: "passwords-that-hold", title: "Passwords that actually hold", minutes: 9, summary: "Passphrases, managers and why reuse is the real problem.", steps: ["Use a password manager and let it generate everything.", "Make the master passphrase four to five unrelated words.", "Never reuse a password across accounts.", "Check your email against known breaches."] },
  { slug: "two-factor-done-right", title: "Two-factor authentication done right", minutes: 6, summary: "Choose the method that survives a SIM swap.", steps: ["Prefer an authenticator app or a hardware key over SMS.", "Store recovery codes offline.", "Enable two-factor on email first, since it unlocks everything else."] },
  { slug: "recognising-social-engineering", title: "Recognising social engineering", minutes: 11, summary: "Urgency, authority and secrecy are the three tells.", steps: ["Slow down: urgency is manufactured.", "Verify through a channel you chose, not one they gave you.", "Assume any request for a code is an attack."] },
];

export interface Challenge {
  month: string;
  title: string;
  blurb: string;
  participants: number;
  target: number;
  tasks: string[];
}

export const challenge: Challenge = {
  month: "August 2026",
  title: "Secure Your Accounts",
  blurb: "Enable two-factor authentication on every account that matters, starting with email.",
  participants: 350,
  target: 1000,
  tasks: [
    "Turn on two-factor authentication for your primary email.",
    "Move any SMS-based codes to an authenticator app.",
    "Store your recovery codes somewhere offline.",
    "Check your email address against known breaches.",
  ],
};

export interface Badge {
  name: string;
  requirement: string;
  tone: string;
}

export const badges: Badge[] = [
  { name: "Privacy Champion", requirement: "Complete the Privacy Score assessment.", tone: "text-brand-gold" },
  { name: "Digital Defender", requirement: "Finish every item in your Digital Safety Plan.", tone: "text-brand-blue" },
  { name: "Cyber Ally", requirement: "Attend a Digital Rights & Safety Clinic.", tone: "text-brand-magenta" },
  { name: "Community Trainer", requirement: "Facilitate a clinic module in your community.", tone: "text-primary" },
];

// ---------------- Threat map ----------------

export type ThreatType = "Internet Shutdowns" | "Scams" | "Data Breaches" | "Surveillance Laws";

export interface ThreatEntry {
  country: string;
  lat: number;
  lon: number;
  type: ThreatType;
  risk: "High" | "Medium" | "Low";
  date: string;
  summary: string;
  sources: { label: string; url: string }[];
}

export const threats: ThreatEntry[] = [
  { country: "Ghana", lat: 7.9, lon: -1.0, type: "Scams", risk: "High", date: "30 July 2026", summary: "A sharp rise in Mobile Money cashback scams and dating-profile extortion targeting LGBTQI+ people in Accra and Kumasi.", sources: [{ label: "Cyber Security Authority, Ghana", url: "https://www.csa.gov.gh" }, { label: "Amelio community reports", url: "/digihub/alerts" }] },
  { country: "Nigeria", lat: 9.1, lon: 8.7, type: "Data Breaches", risk: "High", date: "29 July 2026", summary: "Large-scale exposure of subscriber records from a service disruption, with data circulating on closed channels.", sources: [{ label: "Access Now", url: "https://www.accessnow.org" }] },
  { country: "Ethiopia", lat: 9.1, lon: 40.5, type: "Internet Shutdowns", risk: "High", date: "28 July 2026", summary: "Regional internet shutdown restricting access to messaging and health information services.", sources: [{ label: "NetBlocks", url: "https://netblocks.org" }] },
  { country: "India", lat: 21.0, lon: 78.0, type: "Data Breaches", risk: "Medium", date: "27 July 2026", summary: "Health-sector data breach reported, affecting patient records held by a third-party processor.", sources: [{ label: "Privacy International", url: "https://privacyinternational.org" }] },
  { country: "Uganda", lat: 1.4, lon: 32.3, type: "Surveillance Laws", risk: "High", date: "22 July 2026", summary: "Expanded interception powers with limited judicial oversight, raising exposure risk for community organisations.", sources: [{ label: "Access Now", url: "https://www.accessnow.org" }] },
  { country: "Kenya", lat: -0.02, lon: 37.9, type: "Scams", risk: "Medium", date: "18 July 2026", summary: "Job and scholarship scams requesting upfront payments spreading through WhatsApp groups.", sources: [{ label: "Local community reports", url: "/digihub/alerts" }] },
  { country: "Egypt", lat: 26.8, lon: 30.8, type: "Surveillance Laws", risk: "High", date: "12 July 2026", summary: "Continued use of dating-app monitoring in enforcement actions against LGBTQI+ people.", sources: [{ label: "Privacy International", url: "https://privacyinternational.org" }] },
  { country: "United Kingdom", lat: 54.0, lon: -2.0, type: "Surveillance Laws", risk: "Medium", date: "9 July 2026", summary: "Debate over client-side scanning obligations that would weaken end-to-end encryption.", sources: [{ label: "Open Rights Group", url: "https://www.openrightsgroup.org" }] },
  { country: "United States", lat: 39.0, lon: -98.0, type: "Data Breaches", risk: "Medium", date: "5 July 2026", summary: "Health data broker breach exposing sensitive inferences drawn from app usage.", sources: [{ label: "Electronic Frontier Foundation", url: "https://www.eff.org" }] },
  { country: "Iran", lat: 32.4, lon: 53.7, type: "Internet Shutdowns", risk: "High", date: "3 July 2026", summary: "Sustained throttling and platform blocking limiting access to secure messaging.", sources: [{ label: "NetBlocks", url: "https://netblocks.org" }] },
  { country: "Brazil", lat: -14.2, lon: -51.9, type: "Scams", risk: "Low", date: "1 July 2026", summary: "Phishing campaigns impersonating public health services.", sources: [{ label: "Local reports", url: "/digihub/alerts" }] },
  { country: "Indonesia", lat: -2.5, lon: 118.0, type: "Surveillance Laws", risk: "Medium", date: "28 June 2026", summary: "New registration requirements for platforms, with content takedown obligations.", sources: [{ label: "Access Now", url: "https://www.accessnow.org" }] },
];

export const threatTypes: ThreatType[] = ["Internet Shutdowns", "Scams", "Data Breaches", "Surveillance Laws"];
