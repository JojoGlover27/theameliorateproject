import communityBrief from "@/assets/downloads/community-brief.pdf.asset.json";
import pressKit from "@/assets/downloads/press-kit.pdf.asset.json";
import carePathways from "@/assets/downloads/care-pathways-guide.pdf.asset.json";

export type DownloadResource = {
  id: string;
  title: string;
  description: string;
  url: string;
  filename: string;
};

export const downloads: DownloadResource[] = [
  {
    id: "community-brief",
    title: "Community Brief",
    description:
      "A two-page overview of who we are, the problem we are solving, and what our 2025 needs assessment of 253 community members revealed.",
    url: communityBrief.url,
    filename: "ameliorate-community-brief.pdf",
  },
  {
    id: "care-pathways",
    title: "Know Your Care Pathways",
    description:
      "A plain-language guide to HIV prevention and treatment options in Ghana, PEP, PrEP, testing, ART, and how to restart after an interruption.",
    url: carePathways.url,
    filename: "ameliorate-care-pathways-guide.pdf",
  },
  {
    id: "press-kit",
    title: "Press & Media Kit",
    description:
      "Fact sheet with key statistics, editorial guidance, and how to reach us. Free to share and reproduce with attribution.",
    url: pressKit.url,
    filename: "ameliorate-press-kit.pdf",
  },
];
