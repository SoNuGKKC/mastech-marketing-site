import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Hero playlist — add files under public/branding/ as:
 * mas-tech-solution-01.mp4 … mas-tech-solution-06.mp4
 * No poster (avoids static image flash before decode).
 */
export const HERO_VIDEO_SRCS = [
  "/branding/mas-tech-solution-01.mp4",
  "/branding/mas-tech-solution-02.mp4",
  "/branding/mas-tech-solution-03.mp4",
  "/branding/mas-tech-solution-04.mp4",
  "/branding/mas-tech-solution-05.mp4",
  "/branding/mas-tech-solution-06.mp4",
] as const;

export default function HeroVideoPlayer() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const errorStreak = useRef(0);
  const len = HERO_VIDEO_SRCS.length;

  const go = useCallback(
    (delta: number) => {
      errorStreak.current = 0;
      setFading(true);
      setIndex((i) => (i + delta + len) % len);
    },
    [len]
  );

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.load();
    const p = v.play();
    if (p) void p.catch(() => {});
  }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const tag = t?.tagName?.toLowerCase() ?? "";
      if (tag === "input" || tag === "textarea" || t?.isContentEditable) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const onEnded = () => {
    go(1);
  };

  const onLoadedData = () => {
    errorStreak.current = 0;
    setFading(false);
  };

  const onError = () => {
    errorStreak.current += 1;
    if (errorStreak.current >= len) {
      setFading(false);
      return;
    }
    setIndex((i) => (i + 1) % len);
  };

  const src = HERO_VIDEO_SRCS[index];

  return (
    <div className="mx-auto mt-12 w-full max-w-5xl">
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
            ref={videoRef}
            key={index}
            className="h-full w-full object-contain"
            src={src}
            controls
            playsInline
            preload="auto"
            autoPlay
            onEnded={onEnded}
            onLoadedData={onLoadedData}
            onError={onError}
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
    </div>
  );
}
