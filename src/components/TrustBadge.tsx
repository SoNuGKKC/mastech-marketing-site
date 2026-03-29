export default function TrustBadge() {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-mas-primary/35 bg-mas-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-mas-primary"
      role="status"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" aria-hidden />
      Secure by MAS TECH Automation Engine
    </div>
  );
}
