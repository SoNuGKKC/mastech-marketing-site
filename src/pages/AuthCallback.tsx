import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { User } from "@supabase/supabase-js";
import { readJaduProfile } from "../lib/jaduGateway";
import { getSupabaseBrowser } from "../lib/supabaseBrowser";

/**
 * OAuth / magic-link return URL. Add this path to Supabase Auth → Redirect URLs.
 * Enterprise gateway: field → complete PIN/device; admin → complete WebAuthn MFA.
 */
export default function AuthCallback() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("Signing you in…");

  useEffect(() => {
    const sb = getSupabaseBrowser();
    if (!sb) {
      setMsg("Gateway not configured (missing Supabase env).");
      return;
    }

    const { data: sub } = sb.auth.onAuthStateChange((_evt, session) => {
      routeAfterSession(session?.user ?? null);
    });

    void sb.auth.getSession().then(({ data: { session } }) => {
      routeAfterSession(session?.user ?? null);
    });

    function routeAfterSession(user: User | null) {
      if (!user) {
        setMsg("No session from callback. Try logging in again.");
        return;
      }
      const p = readJaduProfile(user);
      if (p.org === "paradise" && p.role === "field") {
        navigate("/login/field?oauth=1", { replace: true });
        return;
      }
      if (p.org === "paradise" && p.role === "admin") {
        navigate("/login/admin?oauth=1", { replace: true });
        return;
      }
      setMsg("Your account has no Jadu route. Set app_metadata org=paradise and role=field|admin.");
    }

    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <p className="text-lg text-white/90">{msg}</p>
      <Link to="/login" className="text-sm font-semibold text-mas-primary hover:underline">
        Gateway home
      </Link>
    </div>
  );
}
