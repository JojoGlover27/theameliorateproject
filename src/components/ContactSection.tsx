import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck } from "lucide-react";

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ nickname: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nickname.trim() || !form.message.trim()) return;
    setSending(true);
    // Simulate send
    setTimeout(() => {
      toast({ title: "Message sent", description: "We'll get back to you through a secure channel." });
      setForm({ nickname: "", message: "" });
      setSending(false);
    }, 800);
  };

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 max-w-lg">
        <h2 className="text-3xl md:text-4xl text-foreground mb-2 text-center">
          Get in Touch — Anonymously
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          No real names required. Use any nickname you feel comfortable with.
        </p>

        <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground mb-6">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>Your identity is never stored or tracked.</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="space-y-2">
            <Label htmlFor="nickname">Nickname</Label>
            <Input
              id="nickname"
              placeholder="e.g. SunflowerGh, Agent007"
              maxLength={50}
              value={form.nickname}
              onChange={(e) => setForm({ ...form, nickname: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Your Message</Label>
            <Textarea
              id="message"
              placeholder="Ask us anything — questions about services, support, or how to get involved…"
              maxLength={1000}
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={sending}>
            {sending ? "Sending…" : "Send Message"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
