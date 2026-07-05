import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type Row = {
  id: string;
  email: string;
  source: string | null;
  tags: string[] | null;
  status: string;
  subscribed_at: string;
};

export default function AdminSubscribers() {
  const [rows, setRows] = useState<Row[]>([]);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "unsubscribed">("all");

  async function load() {
    const { data, error } = await supabase
      .from("subscribers")
      .select("id,email,source,tags,status,subscribed_at")
      .order("subscribed_at", { ascending: false });
    if (error) toast.error(error.message);
    else setRows(data ?? []);
  }
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => rows.filter((r) => {
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    if (q && !r.email.toLowerCase().includes(q.toLowerCase()) && !(r.source ?? "").toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [rows, q, statusFilter]);

  function exportCsv() {
    const header = ["email", "source", "tags", "status", "subscribed_at"];
    const lines = [header.join(",")];
    for (const r of filtered) {
      const tags = (r.tags ?? []).join("|");
      const cells = [r.email, r.source ?? "", tags, r.status, r.subscribed_at].map((v) => `"${String(v).replace(/"/g, '""')}"`);
      lines.push(cells.join(","));
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function removeRow(id: string) {
    if (!confirm("Remove this subscriber? This does not delete them from Resend.")) return;
    const { error } = await supabase.from("subscribers").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    setRows((rs) => rs.filter((r) => r.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-semibold">Subscribers ({filtered.length})</h1>
        <Button variant="outline" onClick={exportCsv}>Export CSV</Button>
      </div>
      <div className="flex gap-3 flex-wrap">
        <Input placeholder="Search email or source…" value={q} onChange={(e) => setQ(e.target.value)} className="max-w-sm" />
        <select
          className="border rounded-md px-3 text-sm bg-background"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="unsubscribed">Unsubscribed</option>
        </select>
      </div>
      <div className="border rounded-xl bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground border-b">
            <tr>
              <th className="px-4 py-2 font-medium">Email</th>
              <th className="px-4 py-2 font-medium">Source</th>
              <th className="px-4 py-2 font-medium">Status</th>
              <th className="px-4 py-2 font-medium">Subscribed</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-b last:border-0">
                <td className="px-4 py-2">{r.email}</td>
                <td className="px-4 py-2 text-muted-foreground">{r.source ?? "—"}</td>
                <td className="px-4 py-2">{r.status}</td>
                <td className="px-4 py-2 text-muted-foreground">{new Date(r.subscribed_at).toLocaleDateString()}</td>
                <td className="px-4 py-2 text-right">
                  <Button size="sm" variant="ghost" onClick={() => removeRow(r.id)}>Remove</Button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No subscribers yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
