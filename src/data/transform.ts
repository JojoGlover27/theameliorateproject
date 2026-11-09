// Bundled with the site (like the page photos) so the slides never depend on a separate image host.
import healthcareFlyerUrl from "@/assets/transform-workshop-healthcare.jpg";
import recap1 from "@/assets/transform-healthcare-recap-1.webp";
import recap2 from "@/assets/transform-healthcare-recap-2.webp";
import recap3 from "@/assets/transform-healthcare-recap-3.webp";
import recap4 from "@/assets/transform-healthcare-recap-4.webp";
import recap5 from "@/assets/transform-healthcare-recap-5.webp";
import recap6 from "@/assets/transform-healthcare-recap-6.webp";
import recap7 from "@/assets/transform-healthcare-recap-7.webp";
import recap8 from "@/assets/transform-healthcare-recap-8.webp";
import recap9 from "@/assets/transform-healthcare-recap-9.webp";
const healthcareFlyer = { url: healthcareFlyerUrl };

export const TRANSFORM_WHATSAPP_INVITE_URL = "https://chat.whatsapp.com/JOLQZ4dGxmUE2sCNvYUvNb";

export interface TransformWorkshop {
  id: string;
  title: string;
  status: "draft" | "approved";
  description?: string;
  category?: string;
  date?: string; // ISO calendar date, YYYY-MM-DD
  startTime?: string;
  endTime?: string;
  timeZone?: string;
  format?: "online" | "in-person" | "hybrid";
  venue?: string;
  participation?: string;
  registrationUrl?: string;
  registrationDeadline?: string;
  flyers?: { url: string; alt: string }[];
  imageUrl?: string;
  accessibilityNotes?: string;
  narrative?: { about: string; participate: string; privacy: string; closing: string };
  recap?: { summary: string; slides: { url: string; alt: string }[] };
}

export const transformImpact = [
  { id: "workshops", value: 1, label: "Workshop Hosted", description: "Our first TRANSformation Workshop." },
  { id: "participants", value: 27, label: "Workshop Participants", description: "People who attended our first workshop." },
  { id: "registrations", value: 71, label: "Registrations", description: "People who registered their interest in participating." },
  { id: "feedback", value: 21, label: "Feedback Responses", description: "Responses received following the workshop." },
] as const;

export interface TransformResource {
  id: string;
  title: string;
  description: string;
  category: string;
  source: string;
  url: string;
  status: "draft" | "approved";
  verified: boolean;
  publicationDate?: string;
}

// Add owner-approved announcements and destination-verified resources here.
export const transformWorkshops: TransformWorkshop[] = [{
  id: "healthcare-spaces-2026-10-30",
  title: "Online TRANSformation Workshop",
  status: "approved",
  description: "Navigating Healthcare Spaces as a Trans, Non-binary and Gender-Diverse Person",
  date: "2026-10-30",
  startTime: "3:00 pm",
  endTime: "4:30 pm",
  timeZone: "GMT",
  format: "online",
  recap: {
    summary: "In our first TRANSformation Workshop, participants explored safer healthcare navigation, privacy, disclosure, patient dignity, safety and healthcare system responsibilities.",
    // Add only owner-supplied slides in original order and genuine participant wording.
    slides: [
      { url: healthcareFlyer.url, alt: "Workshop flyer: Online TRANSformation Workshop, Navigating Healthcare Spaces as a Trans, Non-binary and Gender-Diverse Person. Friday, 30 October 2026, 3:00 pm–4:30 pm GMT." },
      { url: recap1, alt: "Our first TRANSformation Workshop: Navigating Healthcare Spaces as a Trans, Non-binary and Gender-Diverse Person. A space for learning, sharing, connection and conversations about safer and more affirming healthcare experiences." },
      { url: recap2, alt: "Our first gathering by the numbers: 71 registrations, 27 participants attended and 21 feedback responses. Thank you for showing up and being part of this beginning." },
      { url: recap3, alt: "Why this conversation matters: navigating healthcare can come with difficult questions. Stigma, discrimination, privacy, safety and dignity can influence how and where people seek healthcare. The workshop offered space to exchange knowledge and explore safer healthcare navigation." },
      { url: recap4, alt: "What we explored together: informed healthcare decisions, personal disclosure, preparing for consultations, communicating boundaries, protecting privacy, responding to discrimination while prioritising safety, patient dignity and healthcare system responsibilities." },
      { url: recap5, alt: "Your Voices. Our Why. Participant comments: Everything about today’s program has been an eye opener for me. The topics were very interesting and needed. Everything was on point and it was lively. I gained valuable knowledge and insights that will help me in my personal and professional development. Thank you for the workshop! ❤️" },
      { url: recap6, alt: "Participant comments: I think today’s workshop is fruitful and looking forward to the next workshop. So far I think TRANSform is on the right path. I think you are doing a great job. It was perfect and extremely exciting. I would like to appreciate the TRANSform team for organizing such an informative and impactful workshop." },
      { url: recap7, alt: "We heard you, and we’re listening. Participants suggested reviewing the day and time to enable more people to join, face-to-face sessions, more practical hands-on activities, interactive group discussions and more time for questions and shared experiences." },
      { url: recap8, alt: "More than a workshop: an opportunity to connect, share experiences, learn and strengthen community. TRANSform works toward community connection, health information and education, affirming wellbeing, safety navigation and economic empowerment." },
      { url: recap9, alt: "And we’re just getting started! Thank you to everyone who registered, participated, shared experiences and provided feedback. Your voices are helping shape what comes next. Follow @amelioproject for updates." },
    ],
  },
  registrationDeadline: "2026-10-28",
  registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSevOrulfkz6VGzJpBJCHrsn5op1w8Ozb5LH-tNK9e179uCTrA/viewform",
  flyers: [
    { url: healthcareFlyer.url, alt: "Online TRANSformation Workshop: Navigating Healthcare Spaces as a Trans, Non-binary and Gender-Diverse Person. Friday, 30 October 2026, 3:00 pm–4:30 pm GMT." },
  ],
  narrative: {
    about: "This interactive workshop will create a supportive space for sharing experiences, discussing challenges in accessing healthcare, and exploring practical ways to navigate healthcare spaces with greater confidence, dignity and respect.\nWhether you have had positive or difficult experiences with healthcare services, your perspective matters. We hope to learn from one another and encourage more inclusive, respectful and affirming healthcare experiences.",
    participate: "Please complete this short registration form. The Google Meet joining link will be sent to the email address or WhatsApp contact you provide after registration.",
    privacy: "We will use your email address or WhatsApp to communicate workshop access details and relevant information about this session. Please provide only the information requested. We ask all participants to respect one another’s privacy and not share other participants’ personal stories or identifying information outside the workshop.",
    closing: "We look forward to connecting with you!",
  },
}];
export const transformResources: TransformResource[] = [];

export function isValidExternalUrl(value?: string): boolean {
  if (!value) return false;
  try { return new URL(value).protocol === "https:"; } catch { return false; }
}

export function isCalendarDate(value?: string): value is string {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

export function getPublishedWorkshops(records: TransformWorkshop[], today = new Date().toISOString().slice(0, 10)) {
  return records.filter(event => event.status === "approved" && event.title.trim()).sort((a, b) => {
    const aDate = isCalendarDate(a.date) ? a.date : undefined;
    const bDate = isCalendarDate(b.date) ? b.date : undefined;
    const rank = (date?: string) => !date ? 1 : date >= today ? 0 : 2;
    return rank(aDate) - rank(bDate) || (aDate && bDate ? aDate.localeCompare(bDate) : 0);
  });
}

export function getPublishedResources(records: TransformResource[]) {
  return records.filter(resource => resource.status === "approved" && resource.verified && resource.title.trim() && resource.source.trim() && isValidExternalUrl(resource.url));
}

export const transformAreas = [
  { title: "Community and Peer Connection", description: "Build relationships, connect with other transgender, non-binary and gender-diverse people, share experiences where comfortable, and participate in a community grounded in dignity, respect and mutual care." },
  { title: "HIV Health Information and Education", description: "Promote access to reliable, accessible and non-stigmatizing information about HIV prevention, testing, treatment, sexual health and wellbeing. Support informed conversations and help community members navigate relevant health information and services." },
  { title: "Gender-Affirming Health and Wellbeing", description: "Provide educational information that helps transgender, non-binary and gender-diverse people understand affirming health, navigate healthcare environments, make informed decisions about wellbeing and identify respectful sources of support.", detail: "Topics may include navigating healthcare, respectful treatment, mental and emotional wellbeing, self-advocacy and finding appropriate health information." },
  { title: "Safety, Abuse Support and Relocation Navigation", description: "Recognize that some transgender, non-binary and gender-diverse people experience abuse, discrimination, rejection or unsafe living conditions. TRANSform aims to help people navigate information and support options when facing these challenges, including exploring relocation pathways where appropriate and available." },
  { title: "Economic Empowerment and Opportunities", description: "Promote access to information, learning opportunities, skills development and economic empowerment resources that can help transgender, non-binary and gender-diverse people explore pathways toward greater economic participation and independence." },
  { title: "TRANSformation Workshops", description: "TRANSformation Workshops are intended to create opportunities for learning, discussion, community dialogue and skills development around issues affecting transgender, non-binary and gender-diverse people.", detail: "Workshops may address health and wellbeing, HIV education, healthcare navigation, safety, personal development, economic empowerment and other relevant community priorities." },
];

export const transformPrivacyGuidance = [
  "Share only information you feel comfortable sharing.",
  "Never disclose another member’s identity or personal information without permission.",
  "Do not share screenshots, photographs or messages from the community outside the group without consent.",
  "Do not pressure anyone to disclose their HIV status, medical history, gender history, experiences of abuse, financial circumstances or other personal details.",
  "Avoid posting precise home addresses, real-time locations or information that could place someone at risk.",
  "Seek consent before sharing another person’s story, photograph or personal experience.",
  "Use appropriate private channels for sensitive matters rather than posting them in a group discussion.",
];

export const transformCommitments = [
  "Treat every member with dignity and respect.",
  "Do not tolerate discrimination, harassment, bullying or stigma.",
  "Respect privacy, consent and personal boundaries.",
  "Share health information responsibly and avoid spreading unverified claims.",
  "Do not pressure others to disclose personal experiences or sensitive information.",
  "Respect different experiences, identities and personal circumstances.",
  "Support constructive discussion, learning and mutual care.",
];