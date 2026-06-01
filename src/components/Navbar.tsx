import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import ameliorateLogo from "@/assets/ameliorate-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const primaryLinks = [
  { label: "About Us", href: "/#about" },
  { label: "Our Services", href: "/#services" },
  { label: "Get Involved", href: "/#donate" },
  { label: "Contact", href: "/#contact" },
];

const moreLinks = [
  { label: "Our Story", href: "/our-story" },
  { label: "Blog / Updates", href: "/blog" },
  { label: "Resources & Information", href: "/resources" },
  { label: "Media", href: "/media" },
  { label: "Privacy Policy", href: "/privacy" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-3 px-4 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={ameliorateLogo} alt="The Ameliorate Project" className="h-10 md:h-12 rounded-full ring-2 ring-primary/20 object-cover" />
          <span className="font-serif text-lg md:text-xl font-bold text-foreground leading-tight hidden sm:block">
            The Ameliorate<br />Project
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {primaryLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors outline-none">
                More <ChevronDown size={14} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background border-border">
                {moreLinks.map((l) => (
                  <DropdownMenuItem key={l.href} asChild>
                    <Link to={l.href} className="cursor-pointer">{l.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-foreground" aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-b border-border px-6 pb-6">
          <ul className="flex flex-col gap-4">
            {primaryLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-2 mt-2 border-t border-border">
              <p className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-2">More</p>
              <ul className="flex flex-col gap-3 pl-2">
                {moreLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      onClick={() => setOpen(false)}
                      className="text-base font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
