import { Heart, Sprout, Shield, BookOpen } from "lucide-react";

export const funds = [
  {
    id: "synapse",
    emoji: "❤️",
    icon: Heart,
    name: "Synapse Fund",
    accentVar: "--destructive",
    description:
      "Support anonymous HIV prevention, HIV care, telemedicine, PrEP, PEP, ART access and discreet healthcare delivery.",
  },
  {
    id: "orenta",
    emoji: "💜",
    icon: BookOpen,
    name: "Orenta Fund",
    accentVar: "--primary",
    description:
      "Support evidence-aware AI, trusted health knowledge, research intelligence, human rights education and digital guidance.",
  },
  {
    id: "digihub",
    emoji: "💙",
    icon: Shield,
    name: "DigiHub Fund",
    accentVar: "--brand-blue",
    description:
      "Support cybersecurity education, digital rights, privacy resources, Digital Rights & Safety Clinics and digital safety tools.",
  },
  {
    id: "innovation",
    emoji: "🌿",
    icon: Sprout,
    name: "Innovation Fund",
    accentVar: "--brand-gold",
    description:
      "Support whichever innovation needs it most as our ecosystem continues to grow.",
  },
] as const;

export const payment = {
  reference: "Give2Amelio",
  mobileMoney: [
    { label: "MTN MoMo", value: "+233 24 688 8486" },
    { label: "Telecel Cash", value: "+233 20 000 0000" },
  ],
  bank: {
    accountName: "The Ameliorate Project",
    bank: "Contact Finance Department",
    email: "finance@ameliorateproject.org",
  },
};

export const givingNote =
  "Every contribution helps us build privacy-first innovations that expand healthcare access, trusted knowledge and digital safety for marginalized communities in Ghana.";
