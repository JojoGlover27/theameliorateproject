import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function AdminLayout() {
  const nav = useNavigate();
  const { user } = useAdminAuth();

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm ${isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`;

  async function signOut() {
    await supabase.auth.signOut();
    nav("/admin/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-6">
          <Link to="/admin" className="font-semibold">Amelio Admin</Link>
          <nav className="flex gap-1 flex-1">
            <NavLink to="/admin" end className={navClass}>Overview</NavLink>
            <NavLink to="/admin/subscribers" className={navClass}>Subscribers</NavLink>
            <NavLink to="/admin/newsletters" className={navClass}>Newsletters</NavLink>
          </nav>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:inline">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={signOut}>Sign out</Button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
