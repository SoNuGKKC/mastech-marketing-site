import { useState, useMemo } from "react";

/** Sonu portrait — `public/branding/sonu_manthan.jpg` (replace with duo shot when ready). */
const SRC_SONU = "/branding/sonu_manthan.jpg";
const FALLBACK_SONU = "/branding/gurjar-sonu.jpeg";
const SRC_MANTHAN = "/branding/manthan-gurjar.jpeg";

function buildSonuCandidates(): string[] {
  const out: string[] = [SRC_SONU];
  const fromEnv = import.meta.env.VITE_FOUNDER_PHOTO_URL;
  if (typeof fromEnv === "string") {
    const t = fromEnv.trim();
    if (t.length > 4 && /^https?:\/\//i.test(t)) out.unshift(t);
  }
  if (!out.includes(FALLBACK_SONU)) out.push(FALLBACK_SONU);
  return out;
}

/**
 * Founder’s Note — corporate site only (`MAS_TECH_SOLUTION/`).
 * Portraits: Sonu (`sonu_manthan.jpg` + fallbacks) + Manthan (`manthan-gurjar.jpeg`).
 */
export default function FounderNote() {
  const sonuCandidates = useMemo(() => buildSonuCandidates(), []);
  const [sonuIdx, setSonuIdx] = useState(0);
  const [sonuExhausted, setSonuExhausted] = useState(false);
  const [manthanExhausted, setManthanExhausted] = useState(false);

  const sonuSrc = sonuCandidates[sonuIdx] || FALLBACK_SONU;
  const onSonuErr = () => {
    if (sonuIdx + 1 < sonuCandidates.length) setSonuIdx((i) => i + 1);
    else setSonuExhausted(true);
  };

  const goldFrame =
    "relative rounded-2xl p-[1px] shadow-[0_0_0_1px_rgba(255,215,0,0.25),0_0_32px_rgba(255,215,0,0.18),0_24px_60px_rgba(0,0,0,0.55)]";
  const inner =
    "relative aspect-[3/4] overflow-hidden rounded-2xl border border-[#ffd700]/40 bg-mas-bg shadow-[inset_0_0_0_1px_rgba(255,215,0,0.12)]";

  return (
    <section
      id="founders-note"
      className="border-y border-[#ffd700]/25 bg-gradient-to-b from-black/60 to-mas-card/50 py-16 md:py-20"
      aria-labelledby="founders-note-heading"
    >
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-center text-xs font-bold uppercase tracking-[0.35em] text-[#ffd700] drop-shadow-[0_0_12px_rgba(255,215,0,0.35)]">
          Founder&apos;s Note
        </p>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="mx-auto w-full max-w-lg lg:col-span-5 lg:mx-0 lg:max-w-none">
            <div
              className={`${goldFrame}`}
              style={{
                filter:
                  "drop-shadow(0 0 10px rgba(255,215,0,0.5)) drop-shadow(0 0 24px rgba(255,200,60,0.28)) drop-shadow(0 0 40px rgba(201,162,39,0.15))",
              }}
            >
              <div className="relative flex flex-col gap-4 rounded-2xl bg-black/20 p-3 sm:flex-row sm:gap-3">
                {/* Subtle Trishul watermark — Gurjar heritage seal */}
                <img
                  src="/branding/mas-trishul-seal.svg"
                  alt=""
                  className="pointer-events-none absolute bottom-2 right-2 z-10 h-16 w-auto opacity-[0.14] sm:h-20"
                  aria-hidden
                />
                <div className={`${inner} flex-1`}>
                  {!sonuExhausted ? (
                    <img
                      key={sonuSrc}
                      src={sonuSrc}
                      alt="Gurjar Sonu, Founder & Architect, MAS TECH Automation"
                      className="h-full w-full object-cover object-center"
                      onError={onSonuErr}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-mas-card px-2 text-center text-xs text-mas-muted">
                      Add <code className="text-[#ffd700]">public/branding/sonu_manthan.jpg</code>
                    </div>
                  )}
                  <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent px-2 py-2 text-center text-[10px] font-bold uppercase tracking-wider text-[#ffd700]/95">
                    Sonu Gurjar
                  </p>
                </div>
                <div className={`${inner} flex-1`}>
                  {!manthanExhausted ? (
                    <img
                      src={SRC_MANTHAN}
                      alt="Manthan Gurjar, MAS TECH"
                      className="h-full w-full object-cover object-center"
                      onError={() => setManthanExhausted(true)}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-mas-card px-2 text-center text-xs text-mas-muted">
                      Add <code className="text-[#ffd700]">public/branding/manthan-gurjar.jpeg</code>
                    </div>
                  )}
                  <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent px-2 py-2 text-center text-[10px] font-bold uppercase tracking-wider text-[#ffd700]/95">
                    Manthan Gurjar
                  </p>
                </div>
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-[#ffd700]/25"
                  aria-hidden
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2
              id="founders-note-heading"
              className="text-3xl font-black tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-tight"
            >
              <span
                className="bg-gradient-to-b from-[#fffef0] via-[#ffd700] to-[#b8860b] bg-clip-text font-black text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
                style={{
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 14px rgba(255,215,0,0.45)) drop-shadow(0 0 28px rgba(255,200,80,0.25))",
                }}
              >
                Sonu{" "}
              </span>
              <span
                className="font-playfair bg-gradient-to-b from-[#fffef0] via-[#ffd700] to-[#b8860b] bg-clip-text font-black tracking-[0.04em] text-transparent"
                style={{
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 16px rgba(255,215,0,0.5)) drop-shadow(0 0 32px rgba(255,200,80,0.28))",
                }}
              >
                GURJAR
              </span>
            </h2>
            <p className="mt-2 text-sm font-bold text-mas-muted md:text-base">Founder, MAS TECH Automation</p>

            <blockquote className="mt-8 border-l-2 border-[#ffd700]/60 pl-6 md:pl-8">
              <p className="font-playfair text-xl italic leading-relaxed text-white/90 md:text-2xl md:leading-snug">
                &ldquo;Building a legacy of automation rooted in the strength and trust of the Gurjar heritage.&rdquo;
              </p>
            </blockquote>

            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-mas-muted md:text-base">
              This company is built on the same principles we bring to every deployment:{" "}
              <strong className="text-white/90">discipline, transparency, and long-term trust</strong> — not quick hacks. When you
              work with MAS TECH, you work with a team that treats your operations as seriously as family honour treats its word.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
