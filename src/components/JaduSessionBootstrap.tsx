import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { readJaduProfile, resolveJaduTargetUrl } from "../lib/jaduGateway";
import { getSupabaseBrowser } from "../lib/supabaseBrowser";
import { isAdminMfaFresh, isFieldGatewayFresh } from "../lib/sessionFlags";

/**
 * Logged-in Paradise users on `/` → Jadu targets when enterprise gates satisfied (unless `?stay=1`).
 * Field: PIN + device verify this session. Admin: WebAuthn MFA this session. Admins skip field binding.
 */
export default function JaduSessionBootstrap() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (pathname !== "/") return;
    const q = new URLSearchParams(search);
    if (q.get("stay") === "1") return;

    const sb = getSupabaseBrowser();
    if (!sb) return;

    let cancelled = false;
    void sb.auth.getSession().then(({ data: { session } }) => {
      if (cancelled || !session?.user) return;
      const profile = readJaduProfile(session.user);
      const target = resolveJaduTargetUrl(profile);
      if (!target) return;

      if (profile.role === "field") {
        if (!isFieldGatewayFresh()) {
          window.location.replace("/login/field?resume=1");
          return;
        }
      }
      if (profile.role === "admin") {
        if (!isAdminMfaFresh()) {
          window.location.replace("/login/admin?resume=1");
          return;
        }
      }

      window.location.replace(target);
    });
    return () => {
      cancelled = true;
    };
  }, [pathname, search]);

  return null;
}
