import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Compass } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Page not found — The Ameliorate Project";
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-24 md:pt-28 pb-16" style={{ background: "var(--hero-gradient)" }}>
        <div className="container mx-auto px-4 md:px-8 max-w-2xl text-center">
          <Compass className="text-primary mx-auto mb-6" size={48} aria-hidden="true" />
          <p className="text-sm uppercase tracking-widest text-primary mb-3 font-semibold">404</p>
          <h1 className="text-4xl md:text-5xl text-foreground mb-4 leading-tight">
            This page is off the map.
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg mx-auto">
            The link you followed may be broken, or the page may have been moved. You haven't been tracked, and nothing went wrong on your end.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
              <Link to="/">Return home</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/resources">Browse resources</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
