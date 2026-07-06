import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Unsubscribed = () => {
  const [params] = useSearchParams();
  const status = params.get("status");
  const ok = status === "ok";

  useEffect(() => {
    document.title = ok
      ? "Unsubscribed — The Ameliorate Project"
      : "Unsubscribe link invalid — The Ameliorate Project";
  }, [ok]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="container mx-auto px-4 md:px-8 max-w-2xl text-center">
          <h1 className="text-3xl md:text-4xl font-serif mb-4" style={{ color: "#3C14A0" }}>
            {ok ? "You have been unsubscribed" : "This unsubscribe link is invalid"}
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-8">
            {ok
              ? "You will no longer receive newsletter emails from The Ameliorate Project. We are sorry to see you go — you are always welcome back."
              : "The link may have expired or been altered. If you would still like to unsubscribe, reply to any newsletter email with the word ‘unsubscribe’ or contact info@ameliorateproject.org."}
          </p>
          <Link to="/" className="text-[#F0A028] hover:underline">
            ← Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Unsubscribed;
