import { useEffect, useState } from "react";

/** Hero carousel — first item uses bundled overview; others are reliable CDN samples. */
export const HERO_PLAYLIST = [
  {
    id: "Video1",
    title: "Video1",
    src: "/branding/mas-tech-overview-hero.mp4",
  },
  {
    id: "Video2",
    title: "Video2",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: "Video3",
    title: "Video3",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
] as const;

export default function HeroVideoPlayer() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const len = HERO_PLAYLIST.length;

  const go = (delta: number) => {
    setFading(true);
    setHeroIndex((i) => (i + delta + len) % len);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const tag = t?.tagName?.toLowerCase() ?? "";
      if (tag === "input" || tag === "textarea" || t?.isContentEditable) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setFading(true);
        setHeroIndex((i) => (i - 1 + len) % len);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setFading(true);
        setHeroIndex((i) => (i + 1) % len);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [len]);

  const item = HERO_PLAYLIST[heroIndex];

  return (
    <div className="mt-12 w-full max-w-5xl">
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition hover:border-sky-400/35 hover:bg-sky-500/10 sm:h-12 sm:w-12"
          aria-label="Previous video"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div
          className={`min-w-0 flex-1 overflow-hidden rounded-2xl border border-white/10 bg-black shadow-mas transition-opacity duration-300 ${
            fading ? "opacity-40" : "opacity-100"
          }`}
          style={{ aspectRatio: "16 / 9" }}
        >
          <video
            key={heroIndex}
            className="h-full w-full object-contain"
            controls
            playsInline
            preload="metadata"
            poster="/branding/gurjar-sonu.jpeg"
            src={item.src}
            onLoadedData={(e) => {
              setFading(false);
              void e.currentTarget.play().catch(() => {});
            }}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition hover:border-sky-400/35 hover:bg-sky-500/10 sm:h-12 sm:w-12"
          aria-label="Next video"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <p className="mt-3 text-center text-sm text-mas-muted" aria-live="polite">
        <span className="font-semibold text-white">{item.title}</span>
        <span className="text-mas-muted">
          {" "}
          · {heroIndex + 1} / {len}
        </span>
        <span className="mt-1 block text-xs text-mas-muted/80">Arrow keys ← → to switch</span>
      </p>
    </div>
  );
}
