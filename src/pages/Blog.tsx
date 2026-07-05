import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimatedSection } from "@/components/AnimatedSection";
const coverNavigating = "https://images.unsplash.com/photo-1561612217-e5147162fd31?auto=format&fit=crop&w=1600&q=70";
const coverClinic = "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1600&q=70";
const coverNutrition = "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1600&q=70";

export const posts = [
  {
    slug: "nutrition-is-hiv-care",
    title: "Nutrition Is HIV Care: Why Food Security Belongs in Ghana's HIV Response",
    category: "Community Health",
    date: "July 2026",
    readTime: "6 min read",
    coverImage: coverNutrition,
    excerpt:
      "For many people living with HIV, the conversation about healthcare begins and ends with medication. But what happens when someone has medication, but not enough food?",
  },
  {
    slug: "navigating-survival-guide",
    title: "Navigating Survival: A Guide for LGBTQI+ People Living with HIV in Ghana Right Now",
    category: "Community Health",
    date: "June 2026",
    readTime: "8 min read",
    coverImage: coverNavigating,
    excerpt:
      "The bill has passed. We know what that means for you, not in abstract policy terms, but in the very real, very personal calculation you are making right now. This is written for you. Not about you. For you.",
  },
  {
    slug: "the-clinic-was-never-the-problem",
    title: "The Clinic Was Never the Problem. Being Seen Was.",
    category: "Community Health",
    date: "May 2026",
    readTime: "4 min read",
    coverImage: coverClinic,
    excerpt:
      "There is a particular kind of courage that nobody talks about. The quiet courage of deciding to walk into a health facility and ask for help, knowing that being seen could cost you everything.",
  },
];

const Blog = () => {
  useEffect(() => {
    document.title = "Blog & Updates — The Ameliorate Project";
  }, []);

  return (
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
                className="block bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {p.coverImage && (
                  <img
                    src={p.coverImage}
                    alt={p.title}
                    width={1600}
                    height={900}
                    loading="lazy"
                    className="w-full aspect-[16/9] object-cover"
                  />
                )}
                <div className="p-6 md:p-8">
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
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </main>
    <Footer />
  </div>
  );
};

export default Blog;
