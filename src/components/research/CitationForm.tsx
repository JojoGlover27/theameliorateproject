import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = { publicationTitle: string };

const CitationForm = ({ publicationTitle }: Props) => {
  const [form, setForm] = useState({
    name: "",
    organisation: "",
    email: "",
    citationTitle: "",
    usage: "",
    link: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.citationTitle || !form.usage) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const subject = encodeURIComponent(`Citation notification: ${publicationTitle}`);
    const body = encodeURIComponent(
      `Publication cited: ${publicationTitle}\n\n` +
        `Name: ${form.name}\n` +
        `Organisation: ${form.organisation}\n` +
        `Email: ${form.email}\n` +
        `Title of publication / project: ${form.citationTitle}\n\n` +
        `How the work is being used:\n${form.usage}\n\n` +
        `Link: ${form.link}\n`
    );
    window.location.href = `mailto:info@ameliorateproject.org?subject=${subject}&body=${body}`;
    toast.success("Opening your email client…");
  };

  return (
    <form onSubmit={submit} className="space-y-4 mt-6 bg-background border border-border rounded-xl p-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="cf-name">Name *</Label>
          <Input id="cf-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cf-org">Organisation (if applicable)</Label>
          <Input id="cf-org" value={form.organisation} onChange={(e) => setForm({ ...form, organisation: e.target.value })} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="cf-email">Email *</Label>
        <Input id="cf-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cf-title">Title of publication or project where cited *</Label>
        <Input id="cf-title" required value={form.citationTitle} onChange={(e) => setForm({ ...form, citationTitle: e.target.value })} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cf-usage">How the work is being used *</Label>
        <Textarea id="cf-usage" required rows={4} value={form.usage} onChange={(e) => setForm({ ...form, usage: e.target.value })} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cf-link">Link to publication or project (if available)</Label>
        <Input id="cf-link" type="url" value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
      </div>
      <Button type="submit" style={{ background: "var(--r-purple)" }} className="text-white hover:opacity-90">
        Send Notification
      </Button>
      <p className="text-xs text-muted-foreground">
        Submissions open your email client with the message pre-filled, addressed to info@ameliorateproject.org.
      </p>
    </form>
  );
};

export default CitationForm;
