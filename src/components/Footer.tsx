const Footer = () => (
  <footer id="contact" className="bg-foreground py-12">
    <div className="container mx-auto px-4 md:px-8 max-w-5xl">
      <div className="grid md:grid-cols-3 gap-8 text-background/80">
        <div>
          <h3 className="font-serif text-xl text-background mb-3">The Ameliorate Project</h3>
          <p className="text-sm leading-relaxed">
            Safe, anonymous, digital-first HIV care for LGBTQI+ communities in Ghana.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-background mb-3 text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#about" className="hover:text-background transition-colors">About Us</a></li>
            <li><a href="#services" className="hover:text-background transition-colors">Our Services</a></li>
            <li><a href="#resources" className="hover:text-background transition-colors">Resources</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-background mb-3 text-sm uppercase tracking-wider">Get in Touch</h4>
          <p className="text-sm leading-relaxed">
            All communication is encrypted and anonymous. Reach us through the Synapse platform.
          </p>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-background/20 text-center text-background/50 text-sm">
        © {new Date().getFullYear()} The Ameliorate Project. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
