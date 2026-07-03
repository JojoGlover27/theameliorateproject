import NewsletterForm from "@/components/NewsletterForm";

const BlogNewsletterCTA = ({ source = "blog" }: { source?: string }) => (
  <div className="mt-14 rounded-2xl p-6 md:p-8 border border-border" style={{ background: "linear-gradient(135deg, rgba(60,20,160,0.06), rgba(240,160,40,0.08))" }}>
    <h3 className="text-xl md:text-2xl font-serif mb-2" style={{ color: "#3C14A0" }}>
      Found this useful?
    </h3>
    <p className="text-muted-foreground mb-5 leading-relaxed">
      Subscribe to receive our monthly updates on HIV access, digital health, and LGBTQI+ rights in Ghana.
    </p>
    <NewsletterForm source={source} />
  </div>
);

export default BlogNewsletterCTA;
