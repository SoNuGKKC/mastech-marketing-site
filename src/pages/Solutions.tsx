import { Link } from "react-router-dom";
import TrustBadge from "../components/TrustBadge";

export default function Solutions() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <TrustBadge />
      <h1 className="mt-4 text-3xl font-black text-white md:text-5xl">Solutions</h1>
      <p className="mt-4 max-w-2xl text-lg text-mas-muted">
        Modular building blocks — deploy what you need first, expand without ripping out the foundation.
      </p>

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        <article className="glass-panel p-8">
          <div className="text-sm font-black uppercase tracking-wider text-mas-accent">Field intelligence</div>
          <h2 className="mt-2 text-2xl font-black text-white">Field tracking &amp; attendance</h2>
          <p className="mt-4 text-mas-muted">
            GPS-aware workflows, role policies, device binding, and audit-friendly logs — so leadership trusts the data on the
            screen.
          </p>
          <ul className="mt-6 list-inside list-disc space-y-2 text-sm text-mas-muted">
            <li>Mobile-first flows for reps and supervisors</li>
            <li>Exception &amp; fraud signal patterns (configurable)</li>
            <li>Exports and dashboards for ops review</li>
          </ul>
        </article>

        <article className="glass-panel p-8">
          <div className="text-sm font-black uppercase tracking-wider text-mas-accent">Supply chain signals</div>
          <h2 className="mt-2 text-2xl font-black text-white">Inventory automation</h2>
          <p className="mt-4 text-mas-muted">
            Stock visibility, route-aware alerts, and reconciliation hooks — reduce stock-outs before they hit revenue.
          </p>
          <ul className="mt-6 list-inside list-disc space-y-2 text-sm text-mas-muted">
            <li>Outlet-level views with optional daily snapshots</li>
            <li>Integration-friendly APIs (your ERP phase-2)</li>
            <li>Alerting tuned to your thresholds</li>
          </ul>
        </article>
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/contact?intent=audit"
          className="inline-flex rounded-xl bg-mas-primary px-8 py-4 font-black text-mas-bg shadow-lg shadow-mas-primary/25 hover:brightness-110"
        >
          Get Free Audit
        </Link>
      </div>
    </div>
  );
}
