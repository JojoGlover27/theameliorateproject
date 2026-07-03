import { Link } from "react-router-dom";
import NewsletterForm from "@/components/NewsletterForm";

const FooterNewsletter = () => (
  <div className="border-b border-background/10 pb-8 mb-8">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="text-background/85">
        <p className="font-semibold text-background">Get monthly updates from Amelio</p>
        <p className="text-xs text-background/60 mt-1">
          <Link to="/newsletter" className="underline hover:text-background">Learn more about our newsletter →</Link>
        </p>
      </div>
      <div className="w-full md:max-w-sm">
        <NewsletterForm source="footer" variant="inline" />
      </div>
    </div>
  </div>
);

export default FooterNewsletter;
