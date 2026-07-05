import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Row = {
  id: string;
  subject: string;
  status: string;
  sent_at: string | null;
  recipient_count: number;
  created_at: string;
};

export default function AdminNewsletters() {
  const [rows, setRows] = useState<Row[]>([]);

  async function load() {
    const { data, error } = await supabase
      .from("newsletters")
      .select("id,subject,status,sent_at,recipient_count,created_at")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setRows(data ?? []);
  }
  useEffect(() => { load(); }, []);

  async function remove(id: string) {
    if (!confirm("Delete this newsletter draft?")) return;
    const { error } = await supabase.from("newsletters").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    setRows((rs) => rs.filter((r) => r.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Newsletters</h1>
        <Button asChild><Link to="/admin/newsletters/new">New newsletter</Link></Button>
      </div>
      <div className="border rounded-xl bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground border-b">
            <tr>
              <th className="px-4 py-2 font-medium">Subject</th>
              <th className="px-4 py-2 font-medium">Status</th>
              <th className="px-4 py-2 font-medium">Recipients</th>
              <th className="px-4 py-2 font-medium">Sent</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b last:border-0">
                <td className="px-4 py-2">
                  <Link to={`/admin/newsletters/${r.id}`} className="hover:underline">{r.subject}</Link>
                </td>
                <td className="px-4 py-2">{r.status}</td>
                <td className="px-4 py-2">{r.recipient_count}</td>
                <td className="px-4 py-2 text-muted-foreground">{r.sent_at ? new Date(r.sent_at).toLocaleString() : "—"}</td>
                <td className="px-4 py-2 text-right">
                  {r.status !== "sent" && <Button size="sm" variant="ghost" onClick={() => remove(r.id)}>Delete</Button>}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No newsletters yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
