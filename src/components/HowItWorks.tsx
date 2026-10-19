"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { EyeOff, Fingerprint, Lock } from "lucide-react";
import { Section } from "./Section";
import { StoreBadges } from "./ui/StoreBadges";
import { ClosingCTA } from "./ClosingCTA";
import { DemoVideo } from "./DemoVideo";
import { Eyebrow, Pill } from "./ui/Pill";
import { useMeshCanvas } from "../hooks/useMeshCanvas";
import { cn } from "../lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;


type Step = {
  num: string;
  title: string;
  desc: string;
  detail: string;
  img: string;
};

/**
 * Every claim here is lifted from the Flutter app rather than invented:
 * identity setup, the BLE transport doc, the Noise protocol name, the TTL
 * constants and the broadcast freshness window.
 */
const STEPS: Step[] = [
  {
    num: "01",
    title: "Install",
    desc: "Download Hopper, pick a username and an avatar. That pair is all people nearby ever see — no phone number, no social account, nothing tied to your real name.",
    detail: "Identity keys generated on-device",
    img: "/mockups/step-01-install.webp",
  },
  {
    num: "02",
    title: "Discover",
    desc: "Your phone advertises and scans at the same time over Bluetooth LE, Wi-Fi Direct on Android and Multipeer on iOS. Peers introduce themselves the moment they are in range.",
    detail: "BLE service 8E9A2B00 · iOS ↔ Android",
    img: "/mockups/step-02-discover.webp",
  },
  {
    num: "03",
    title: "Handshake",
    desc: "Each pair runs a Noise XX handshake — X25519 key exchange, AES-256-GCM, SHA-256 — then exchanges Ed25519 signing keys. Scan a peer’s QR to verify the key out of band.",
    detail: "Noise_XX_25519_AESGCM_SHA256",
    img: "/mockups/step-03-handshake.webp",
  },
  {
    num: "04",
    title: "Relay",
    desc: "No direct link? The message is flooded through neighbours with a hop budget of 7 (16 in Large Venue Mode). Each node drops duplicates it has already seen and forwards the rest.",
    detail: "TTL 7 / 16 · 3-minute duplicate window",
    img: "/mockups/step-04-relay.webp",
  },
  {
    num: "05",
    title: "Deliver",
    desc: "Relays only ever carry ciphertext, and every broadcast is Ed25519-signed so no node can forge or tamper with it in flight.",
    detail: "Signed envelope · 24-hour freshness window",
    img: "/mockups/step-05-deliver.webp",
  },
];

const GUARANTEES = [
  {
    icon: Lock,
    title: "Sealed at the source",
    body: "Every message is sealed inside a Noise session before it leaves your phone, so the peers relaying it only ever move ciphertext.",
  },
  {
    icon: EyeOff,
    title: "Nothing kept",
    body: "A relay remembers only a message id, for three minutes, so it can drop duplicates. There is no server and no log.",
  },
  {
    icon: Fingerprint,
    title: "No identity on the mesh",
    body: "No phone number and no sign-up to join the mesh. Your X25519 and Ed25519 keys are generated on the device and stay in its secure storage. A paid plan takes your name and email for billing only — the mesh never sees them.",
  },
];

const Hero = () => {
  const canvasRef = useMeshCanvas();

  return (
    <section className="relative overflow-hidden px-4 pt-[132px] pb-[100px] sm:px-6 md:pt-[150px]">
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 block h-full w-full" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 42% at 50% 26%, color-mix(in oklab, var(--color-background) 94%, transparent) 0%, transparent 78%)",
        }}
      />

      <div className="relative mx-auto flex max-w-[980px] flex-col items-center gap-7 px-1 text-center">
        <span className="animate-[hopFade_900ms_ease_160ms_both]">
          <Eyebrow>How it works</Eyebrow>
        </span>

        <h1 className="m-0 font-display text-[clamp(42px,7.4vw,112px)] font-semibold leading-[1.02] tracking-[-0.05em]">
          <span className="block overflow-hidden pb-[0.1em]">
            <span className="block animate-[hopReveal_1100ms_cubic-bezier(0.16,1,0.3,1)_240ms_both]">No towers.</span>
          </span>
          <span className="mt-[0.06em] inline-block animate-[hopRise_1100ms_cubic-bezier(0.16,1,0.3,1)_400ms_both]">
            <Pill>Just physics.</Pill>
          </span>
        </h1>

        <p className="m-0 max-w-[500px] animate-[hopRise_1000ms_cubic-bezier(0.16,1,0.3,1)_560ms_both] text-[17px] leading-[1.6] text-[var(--color-muted)] sm:text-lg">
          Hopper builds a live encrypted mesh from the radio chips already inside your phone. Here&rsquo;s how
          a message travels from you to anyone nearby.
        </p>

        <div className="flex animate-[hopRise_1000ms_cubic-bezier(0.16,1,0.3,1)_680ms_both] flex-wrap justify-center gap-3">
          <StoreBadges height={48} />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: EASE }}
        className="relative mx-auto mt-14 max-w-[1080px]"
      >
        <DemoVideo />
      </motion.div>
    </section>
  );
};

/**
 * Step cards beside a sticky panel: hovering or tapping a step highlights it
 * and cross-fades its image in. Every layer stays mounted, so the swap is a
 * pure opacity change.
 */
const StepsPanel = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
      <div className="flex flex-col gap-3">
        {STEPS.map((step, i) => {
          const on = active === i;
          return (
            <button
              key={step.num}
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-pressed={on}
              className={cn(
                "grid w-full grid-cols-[28px_1fr] gap-3 rounded-[22px] border p-6 text-left transition-colors duration-300 sm:grid-cols-[40px_1fr] sm:gap-4 sm:p-7",
                on
                  ? "border-[var(--color-surface-border)] bg-[var(--color-surface-1)]"
                  : "border-transparent bg-transparent hover:bg-[var(--color-ghost)]",
              )}
            >
              <span
                className={cn(
                  "pt-[7px] text-[11px] font-semibold tracking-[0.2em] transition-colors",
                  on ? "text-[var(--color-brand-blue)]" : "text-[var(--color-faint)]",
                )}
              >
                {step.num}
              </span>
              <span className="block">
                <span className="mb-2 block font-display text-[22px] font-semibold tracking-[-0.025em]">
                  {step.title}
                </span>
                <span className="mb-3.5 block max-w-[460px] text-[15px] leading-[1.6] text-[var(--color-muted)]">
                  {step.desc}
                </span>
                <span className="block text-[10.5px] uppercase tracking-[0.2em] text-[var(--color-faint)]">
                  {step.detail}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Full phone screenshots, no card, stacked so the swap is a pure
          crossfade; their corners are transparent, so the shadow follows the
          phone. Sticky beside the steps on desktop; above them on phone/iPad. */}
      <div className="relative order-first h-[420px] sm:h-[540px] lg:sticky lg:top-[120px] lg:order-none lg:h-[min(720px,calc(100vh-150px))]">
        {STEPS.map((step, i) => (
          <img
            key={step.num}
            src={step.img}
            alt=""
            aria-hidden
            width={804}
            height={1748}
            className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.18)] transition-opacity duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)] [:root.dark_&]:drop-shadow-[0_0_1px_rgba(255,255,255,0.45)]"
            style={{ opacity: active === i ? 1 : 0 }}
          />
        ))}
      </div>
    </div>
  );
};

export const HowItWorks = () => (
  <>
    <Hero />

    <Section className="px-5 pb-[100px] sm:px-8 md:pb-[140px]">
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto mb-14 max-w-[640px] text-center md:mb-[72px]">
          <Eyebrow className="mb-[22px]">Five steps</Eyebrow>
          <h2 className="m-0 mb-[18px] font-display text-[clamp(32px,4.6vw,62px)] font-semibold leading-[1.04] tracking-[-0.04em]">
            From install to delivered.
          </h2>
          <p className="m-0 text-[17px] leading-[1.6] text-[var(--color-muted)]">
            Exactly how the app does it.
          </p>
        </div>
        <StepsPanel />
      </div>
    </Section>

    <Section className="px-5 pb-[140px] sm:px-8">
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto mb-14 max-w-[640px] text-center">
          <Eyebrow className="mb-[22px]">Privacy</Eyebrow>
          <h2 className="m-0 font-display text-[clamp(32px,4.6vw,62px)] font-semibold leading-[1.04] tracking-[-0.04em]">
            Private by design.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
          {GUARANTEES.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-5 rounded-[28px] border border-[var(--color-surface-border)] bg-[var(--color-surface-1)] p-8 md:p-7 lg:p-10"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[color-mix(in_oklab,var(--color-brand-blue)_14%,transparent)] text-[var(--color-brand-blue)]">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="m-0 font-display text-[22px] font-semibold tracking-[-0.025em]">{item.title}</h3>
              <p className="m-0 text-[15px] leading-[1.65] text-[var(--color-muted)]">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>

    <ClosingCTA id="get" />
  </>
);
