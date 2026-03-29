import TrustBadge from "../components/TrustBadge";
import FounderNote from "../components/FounderNote";

export default function About() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 py-14">
        <TrustBadge />
        <h1 className="mt-4 text-3xl font-black text-white md:text-5xl">About MAS TECH Solution</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-mas-muted">
          We are an <strong className="text-white">automation engineering</strong> practice — not a generic IT agency. Our stack
          preference: pragmatic backends (including Google Workspace where it fits), strict security boundaries, and UIs that field
          staff can run without a manual.
        </p>
      </div>

      <FounderNote />

      <div className="mx-auto max-w-6xl px-4 pb-14">
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div className="glass-panel p-8">
          <h2 className="text-xl font-bold text-white">Principles</h2>
          <ul className="mt-4 space-y-3 text-sm text-mas-muted">
            <li>
              <strong className="text-mas-primary">Isolation:</strong> marketing properties never ship client secrets.
            </li>
            <li>
              <strong className="text-mas-primary">Laxman Rekha:</strong> documented guardrails between public site and ops repos.
            </li>
            <li>
              <strong className="text-mas-primary">Proof:</strong> we benchmark on time saved and error rate — not slide count.
            </li>
          </ul>
        </div>
        <div className="glass-panel p-8">
          <h2 className="text-xl font-bold text-white">Who we serve</h2>
          <p className="mt-4 text-sm leading-relaxed text-mas-muted">
            Distributors, factory-linked sales orgs, delivery-heavy teams, and owner-led businesses that have outgrown WhatsApp +
            Excel but are not ready for a bloated ERP science project.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
