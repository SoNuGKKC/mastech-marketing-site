/**
 * Single hero clip — no poster (avoids a static photo flash before the first frame),
 * no carousel UI.
 */
const HERO_VIDEO_FILE = "Mas_Tech _Solution_01.mp4";
const HERO_VIDEO_SRC = `/branding/${encodeURIComponent(HERO_VIDEO_FILE)}`;

export default function HeroVideoPlayer() {
  return (
    <div className="mx-auto mt-12 w-full max-w-5xl">
      <div
        className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-mas"
        style={{ aspectRatio: "16 / 9" }}
      >
        <video
          className="h-full w-full object-contain"
          controls
          playsInline
          preload="auto"
          autoPlay
          muted
          loop
          src={HERO_VIDEO_SRC}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
