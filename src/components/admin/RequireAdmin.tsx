import { Navigate } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { loading, user, isAdmin } = useAdminAuth();
  if (loading) return <div className="min-h-screen grid place-items-center text-sm text-muted-foreground">Loading…</div>;
  if (!user) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen grid place-items-center px-6 text-center">
        <div>
          <h1 className="text-xl font-semibold mb-2">Access denied</h1>
          <p className="text-sm text-muted-foreground">Your account does not have admin access.</p>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}
