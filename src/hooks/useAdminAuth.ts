import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export type AdminAuthState = {
  loading: boolean;
  user: User | null;
  isAdmin: boolean;
};

export function useAdminAuth(): AdminAuthState {
  const [state, setState] = useState<AdminAuthState>({ loading: true, user: null, isAdmin: false });

  useEffect(() => {
    let mounted = true;

    async function checkRole(user: User | null) {
      if (!user) {
        if (mounted) setState({ loading: false, user: null, isAdmin: false });
        return;
      }
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (mounted) setState({ loading: false, user, isAdmin: !!data });
    }

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      // Defer role lookup to avoid deadlocks inside the auth callback
      setTimeout(() => checkRole(session?.user ?? null), 0);
    });

    supabase.auth.getSession().then(({ data }) => checkRole(data.session?.user ?? null));

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
}
