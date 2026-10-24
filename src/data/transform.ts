import healthcareFlyer from "@/assets/transform-healthcare-workshop-flyer.png.asset.json";

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
}

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
  registrationDeadline: "2026-10-28",
  registrationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSevOrulfkz6VGzJpBJCHrsn5op1w8Ozb5LH-tNK9e179uCTrA/viewform",
  flyers: [
    { url: healthcareFlyer.url, alt: "Online TRANSformation Workshop: Navigating Healthcare Spaces as a Trans, Non-binary and Gender-Diverse Person. Friday, 30 October 2026, 3:00 pm–4:30 pm GMT." },
  ],
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