import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";

const posts = [
  {
    slug: "the-clinic-was-never-the-problem",
    title: "The Clinic Was Never the Problem. Being Seen Was.",
    category: "Community Health",
    date: "May 2026",
    readTime: "4 min read",
    excerpt:
      "There is a particular kind of courage that nobody talks about. The quiet courage of deciding to walk into a health facility and ask for help, knowing that being seen could cost you everything.",
  },
];

const Blog = () => (
  <div className="min-h-screen">
    <Navbar />
    <main className="pt-28 md:pt-36 pb-16 md:pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <AnimatedSection>
          <p className="text-sm uppercase tracking-widest text-primary mb-3 font-semibold">Blog &amp; Updates</p>
          <h1 className="text-3xl md:text-5xl text-foreground mb-4 leading-tight">
            Notes from the work, the community, and the road ahead.
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            Reflections, evidence, and updates from The Ameliorate Project.
          </p>
        </AnimatedSection>

        <div className="space-y-6">
          {posts.map((p) => (
            <AnimatedSection key={p.slug}>
              <Link
                to={`/blog/${p.slug}`}
                className="block bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground mb-3">
                  <span className="text-primary font-semibold">{p.category}</span>
                  <span>•</span>
                  <span>{p.date}</span>
                  <span>•</span>
                  <span>{p.readTime}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3 leading-snug">{p.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{p.excerpt}</p>
                <span className="inline-block mt-4 text-primary font-medium text-sm">Read more →</span>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Blog;
