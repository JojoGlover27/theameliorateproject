import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import NewsletterEditor from "@/components/admin/NewsletterEditor";

type NL = {
  id?: string;
  subject: string;
  preview_text: string;
  cover_image_url: string;
  html: string;
  status?: string;
  blog_slug?: string | null;
};

const empty: NL = { subject: "", preview_text: "", cover_image_url: "", html: "" };

export default function AdminNewsletterEdit() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const nav = useNavigate();
  const [nl, setNl] = useState<NL>(empty);
  const [busy, setBusy] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (id && id !== "new") {
      supabase.from("newsletters").select("*").eq("id", id).single().then(({ data, error }) => {
        if (error) toast.error(error.message);
        else if (data) setNl({
          id: data.id,
          subject: data.subject,
          preview_text: data.preview_text ?? "",
          cover_image_url: data.cover_image_url ?? "",
          html: data.html,
          status: data.status,
          blog_slug: data.blog_slug,
        });
      });
    } else {
      const fromBlog = params.get("fromBlog");
      if (fromBlog) prefillFromBlog(fromBlog);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function prefillFromBlog(slug: string) {
    // Read the blog post metadata from the static array via dynamic import
    try {
      const mod: any = await import("@/pages/Blog");
      const post = (mod.posts as any[])?.find((p) => p.slug === slug);
      if (!post) return;
      const url = `${window.location.origin}/blog/${post.slug}`;
      setNl({
        subject: post.title,
        preview_text: post.excerpt,
        cover_image_url: post.coverImage ?? post.image ?? "",
        html: `<h2>${post.title}</h2><p>${post.excerpt}</p><p style="text-align:center;margin:24px 0;"><a href="${url}" style="display:inline-block;background:#3C14A0;color:#fff;padding:12px 22px;border-radius:8px;text-decoration:none;font-weight:600;">Read the full post</a></p>`,
        blog_slug: slug,
      });
    } catch (e) {
      console.error(e);
    }
  }

  async function save(): Promise<string | null> {
    if (!nl.subject.trim()) { toast.error("Subject is required"); return null; }
    if (!nl.html.trim()) { toast.error("Content is required"); return null; }
    setBusy(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (nl.id) {
        const { error } = await supabase.from("newsletters").update({
          subject: nl.subject,
          preview_text: nl.preview_text,
          cover_image_url: nl.cover_image_url || null,
          html: nl.html,
          blog_slug: nl.blog_slug ?? null,
        }).eq("id", nl.id);
        if (error) throw error;
        toast.success("Saved");
        return nl.id;
      } else {
        const { data, error } = await supabase.from("newsletters").insert({
          subject: nl.subject,
          preview_text: nl.preview_text,
          cover_image_url: nl.cover_image_url || null,
          html: nl.html,
          blog_slug: nl.blog_slug ?? null,
          status: "draft",
          created_by: userData.user?.id,
        }).select("id").single();
        if (error) throw error;
        setNl((s) => ({ ...s, id: data.id }));
        toast.success("Draft saved");
        nav(`/admin/newsletters/${data.id}`, { replace: true });
        return data.id;
      }
    } catch (e: any) {
      toast.error(e.message);
      return null;
    } finally {
      setBusy(false);
    }
  }

  async function sendTest() {
    const savedId = await save();
    if (!savedId) return;
    const to = prompt("Send test to which email?");
    if (!to) return;
    setBusy(true);
    const { error } = await supabase.functions.invoke("send-newsletter", { body: { newsletterId: savedId, testEmail: to } });
    setBusy(false);
    if (error) toast.error(error.message); else toast.success(`Test sent to ${to}`);
  }

  async function sendNow() {
    if (nl.status === "sent") { toast.error("Already sent"); return; }
    const savedId = await save();
    if (!savedId) return;
    if (!confirm("Send this newsletter to all active subscribers now?")) return;
    setBusy(true);
    const { data, error } = await supabase.functions.invoke("send-newsletter", { body: { newsletterId: savedId } });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success(`Sent to ${data?.sent ?? 0} subscribers (${data?.failed ?? 0} failed)`);
    nav("/admin/newsletters");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-semibold">{nl.id ? "Edit newsletter" : "New newsletter"}</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowPreview((s) => !s)}>{showPreview ? "Hide preview" : "Preview"}</Button>
          <Button variant="outline" onClick={sendTest} disabled={busy}>Send test</Button>
          <Button variant="outline" onClick={() => save()} disabled={busy}>Save draft</Button>
          <Button onClick={sendNow} disabled={busy || nl.status === "sent"}>Send now</Button>
        </div>
      </div>

      {nl.status === "sent" && (
        <div className="rounded-md border border-amber-300 bg-amber-50 text-amber-900 px-4 py-2 text-sm">
          This newsletter has already been sent. Further edits will not resend it.
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" value={nl.subject} onChange={(e) => setNl({ ...nl, subject: e.target.value })} maxLength={200} />
          </div>
          <div>
            <Label htmlFor="preview">Preview text</Label>
            <Textarea id="preview" value={nl.preview_text} onChange={(e) => setNl({ ...nl, preview_text: e.target.value })} rows={2} maxLength={200} />
            <p className="text-xs text-muted-foreground mt-1">Shown next to the subject in most inboxes.</p>
          </div>
          <div>
            <Label htmlFor="cover">Cover image URL</Label>
            <Input id="cover" value={nl.cover_image_url} onChange={(e) => setNl({ ...nl, cover_image_url: e.target.value })} placeholder="https://images.unsplash.com/…" />
          </div>
          <div>
            <Label>Content</Label>
            <NewsletterEditor value={nl.html} onChange={(html) => setNl({ ...nl, html })} />
          </div>
        </div>

        {showPreview && (
          <div className="lg:sticky lg:top-6 lg:self-start">
            <div className="text-sm text-muted-foreground mb-2">Preview</div>
            <div className="rounded-xl border overflow-hidden bg-[#f6f4fb] p-4">
              <div className="max-w-[600px] mx-auto">
                <div className="bg-[#3C14A0] p-5 text-center rounded-t-xl">
                  <div className="text-white font-semibold">The Ameliorate Project</div>
                  <div className="text-[#F0A028] text-xs tracking-widest uppercase mt-1">Newsletter</div>
                </div>
                <div className="bg-white p-6 rounded-b-xl">
                  {nl.cover_image_url && <img src={nl.cover_image_url} alt="" className="w-full rounded-md mb-4" />}
                  <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: nl.html }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
