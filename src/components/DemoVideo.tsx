import { Play } from "lucide-react";

/**
 * The product demo, served from `public/`. The poster is a still from the
 * opening second; with `src` unset the frame shows a placeholder.
 */
const VIDEO: { src: string | null; poster?: string } = {
  src: "/how-it-works.mp4",
  poster: "/how-it-works-poster.jpg",
};

/** Rounded 16:9 frame holding the demo video (or its placeholder). */
export const DemoVideo = () => (
  <div className="relative aspect-video overflow-hidden rounded-[22px] border border-[var(--color-surface-border)] bg-[var(--color-surface-1)] sm:rounded-[40px]">
    {VIDEO.src ? (
      <video
        src={VIDEO.src}
        poster={VIDEO.poster}
        controls
        playsInline
        // The poster covers the frame, so nothing downloads until play.
        preload={VIDEO.poster ? "none" : "metadata"}
        className="block h-full w-full object-cover"
      />
    ) : (
      <div
        className="grid h-full w-full place-items-center"
        style={{
          background:
            "repeating-linear-gradient(135deg, color-mix(in oklab, var(--color-brand-blue) 10%, transparent) 0 10px, transparent 10px 20px)",
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-[var(--color-brand-blue)] text-white sm:h-20 sm:w-20">
            <Play className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8" aria-hidden="true" />
          </span>
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.28em] text-[var(--color-faint)]">
            Demo video · coming soon
          </span>
        </div>
      </div>
    )}
  </div>
);
