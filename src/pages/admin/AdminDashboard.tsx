import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ active: 0, total: 0, newsletters: 0, sent: 0 });

  useEffect(() => {
    (async () => {
      const [a, t, nl, s] = await Promise.all([
        supabase.from("subscribers").select("*", { count: "exact", head: true }).eq("status", "active"),
        supabase.from("subscribers").select("*", { count: "exact", head: true }),
        supabase.from("newsletters").select("*", { count: "exact", head: true }),
        supabase.from("newsletters").select("*", { count: "exact", head: true }).eq("status", "sent"),
      ]);
      setStats({
        active: a.count ?? 0,
        total: t.count ?? 0,
        newsletters: nl.count ?? 0,
        sent: s.count ?? 0,
      });
    })();
  }, []);

  const cards = [
    { label: "Active subscribers", value: stats.active },
    { label: "Total subscribers", value: stats.total },
    { label: "Newsletters", value: stats.newsletters },
    { label: "Sent", value: stats.sent },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Overview</h1>
        <Button asChild><Link to="/admin/newsletters/new">New newsletter</Link></Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">{c.label}</p>
            <p className="text-3xl font-semibold mt-1">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
