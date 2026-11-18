"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";

/**
 * The product demo, served from `public/`. The poster is a still from the
 * opening second; with `src` unset the frame shows a placeholder.
 */
const VIDEO: { src: string | null; poster?: string } = {
  src: "/how-it-works.mp4",
  poster: "/how-it-works-poster.jpg",
};

/**
 * Rounded 16:9 frame holding the demo video (or its placeholder).
 *
 * The video plays on its own, looping, but only while it's on screen: it
 * starts muted (browsers block autoplay with sound) and nothing downloads
 * until it first scrolls into view. A corner button turns the sound on/off.
 * While it's trying to play but has no frames yet (first load, or a stall on
 * a slow connection) a spinner sits over the poster so it doesn't look stuck.
 */
export const DemoVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [buffering, setBuffering] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Spin until frames arrive; `playing` clears it.
          if (video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) setBuffering(true);
          video.play().catch(() => setBuffering(false));
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    // Unmuting is a user gesture, so a play the browser blocked can go now.
    if (video.paused) video.play().catch(() => {});
  };

  return (
    <div className="relative aspect-video overflow-hidden rounded-[22px] border border-[var(--color-surface-border)] bg-[var(--color-surface-1)] sm:rounded-[40px]">
      {VIDEO.src ? (
        <>
          <video
            ref={videoRef}
            src={VIDEO.src}
            poster={VIDEO.poster}
            muted
            loop
            playsInline
            preload="none"
            onWaiting={() => setBuffering(true)}
            onPlaying={() => setBuffering(false)}
            onPause={() => setBuffering(false)}
            onError={() => setBuffering(false)}
            className="block h-full w-full object-cover"
          />
          {/* Loading spinner, fading in only if the wait is noticeable. */}
          <div
            aria-hidden={!buffering}
            className={`pointer-events-none absolute inset-0 grid place-items-center transition-opacity duration-300 ${
              buffering ? "opacity-100 delay-200" : "opacity-0"
            }`}
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-black/45 backdrop-blur-md sm:h-16 sm:w-16">
              <span
                role={buffering ? "status" : undefined}
                aria-label={buffering ? "Loading video" : undefined}
                className="block h-7 w-7 animate-spin rounded-full border-[3px] border-white/25 border-t-white sm:h-8 sm:w-8"
              />
            </span>
          </div>

          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute video" : "Mute video"}
            aria-pressed={!muted}
            className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-black/55 text-white backdrop-blur-md transition-[background-color,transform] hover:bg-black/70 active:scale-90 sm:bottom-5 sm:right-5 sm:h-11 sm:w-11"
          >
            {muted ? (
              <VolumeX className="h-[18px] w-[18px]" aria-hidden="true" />
            ) : (
              <Volume2 className="h-[18px] w-[18px]" aria-hidden="true" />
            )}
          </button>
        </>
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
};
