import { Instagram, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import ameliorateLogo from "@/assets/ameliorate-logo.png";

const socials = [
  {
    label: "Instagram @amelioproject",
    href: "https://instagram.com/amelioproject",
    icon: (
      <Instagram className="w-5 h-5" />
    ),
  },
  {
    label: "TikTok @amelioproject",
    href: "https://www.tiktok.com/@amelioproject",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.9 2.9 0 0 1-2.86 3 2.92 2.92 0 0 1-2.94-2.9 2.92 2.92 0 0 1 2.94-2.9 2.85 2.85 0 0 1 .88.13V9.4a6.36 6.36 0 0 0-.88-.05A6.34 6.34 0 0 0 3 15.69a6.34 6.34 0 0 0 6.36 6.35 6.34 6.34 0 0 0 6.36-6.35V8.87a8.16 8.16 0 0 0 4.77 1.52V6.94a4.85 4.85 0 0 1-.9-.25z" />
      </svg>
    ),
  },
  {
    label: "Facebook @amelioproject",
    href: "https://www.facebook.com/share/1EHfmvmVx/",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "X (Twitter) @amelioproject",
    href: "https://x.com/amelioproject",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/amelioproject",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const Footer = () => (
  <footer className="bg-foreground py-14">
    <div className="container mx-auto px-4 md:px-8 max-w-6xl">
      <div className="grid md:grid-cols-4 gap-10 text-background/80">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={ameliorateLogo}
              alt="The Ameliorate Project"
              width={40}
              height={40}
              loading="lazy"
              decoding="async"
              className="h-10 w-10 rounded-full ring-2 ring-background/30 object-cover"
            />
            <h3 className="font-serif text-xl text-background">The Ameliorate Project</h3>
          </div>
          <p className="text-sm leading-relaxed max-w-md">
            Safe, anonymous, digital-first HIV care for LGBTQI+ communities, key populations, and other marginalised populations in Ghana.
          </p>

          <ul className="mt-5 space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <span>PLT 12 BLK D, Apatrapa, Kumasi, Ghana</span>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="w-4 h-4 mt-0.5 shrink-0" />
              <a href="mailto:info@ameliorateproject.org" className="hover:text-background transition-colors">info@ameliorateproject.org</a>
            </li>
            <li className="text-background/60 text-xs pt-1">
              NGO Registration ID: <span className="text-background/80">CG004780126</span>
            </li>
          </ul>

          <div className="mt-6 flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center text-background/80 hover:text-background hover:bg-background/10 transition"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-background mb-3 text-sm uppercase tracking-wider">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/#about" className="hover:text-background transition-colors">About Us</a></li>
            <li><a href="/#services" className="hover:text-background transition-colors">Our Services</a></li>
            <li><Link to="/get-involved" className="hover:text-background transition-colors">Get Involved</Link></li>
            <li><Link to="/research" className="hover:text-background transition-colors">Research &amp; Publications</Link></li>
            <li><Link to="/resources" className="hover:text-background transition-colors">Resources &amp; Downloads</Link></li>
            <li><Link to="/blog" className="hover:text-background transition-colors">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-background mb-3 text-sm uppercase tracking-wider">More</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/our-story" className="hover:text-background transition-colors">Our Story</Link></li>
            <li><Link to="/media" className="hover:text-background transition-colors">Media</Link></li>
            <li><a href="/#faq" className="hover:text-background transition-colors">FAQ</a></li>
            <li><a href="/#donate" className="hover:text-background transition-colors">Donate</a></li>
            <li><Link to="/privacy" className="hover:text-background transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-background/20 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-background/50 text-xs">
        <p>© {new Date().getFullYear()} The Ameliorate Project. All rights reserved.</p>
        <p>Kumasi, Ghana · info@ameliorateproject.org</p>
      </div>
    </div>
  </footer>
);

export default Footer;
