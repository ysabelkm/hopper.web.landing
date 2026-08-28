"use client";

import { Section } from "./Section";
import { MeshHero, HeroHeadline, HeroParagraph } from "./MeshHero";
import { ClosingCTA } from "./ClosingCTA";
import { StickyPanelList, PanelRow } from "./StickyPanelList";

/**
 * Every claim here is lifted from the Flutter app rather than invented:
 * identity setup, the BLE transport doc, the Noise protocol name, the TTL
 * constants and the broadcast freshness window.
 */
const STEPS: PanelRow[] = [
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
    desc: "Each pair runs a Noise XX handshake then exchanges signing keys. Scan a peer’s QR to verify the key out of band.",
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
    title: "Sealed at the source",
    body: "Every message is sealed inside a Noise session before it leaves your phone, so the peers relaying it only ever move ciphertext.",
  },
  {
    title: "Nothing kept",
    body: "A relay remembers only a message id, for three minutes, so it can drop duplicates. There is no server and no log.",
  },
  {
    title: "No identity on the mesh",
    body: "No phone number and no sign-up to message. Your X25519 and Ed25519 keys are generated on the device and stay in its secure storage. A paid plan takes your name and email for billing only — the mesh never sees them.",
  },
];

export const HowItWorks = () => (
  <>
    <MeshHero
      eyebrow="How it works"
      footnotes={[
        "Phone to phone · up to 1,024 peers",
        "End-to-end encrypted · 0 bytes stored",
      ]}
    >
      <HeroParagraph>
        Hopper builds a live encrypted mesh from the radio chips already inside
        your phone. Here&rsquo;s how a message travels from you to anyone
        nearby.
      </HeroParagraph>
      <HeroHeadline lines={["No towers.", "Just physics."]} />
    </MeshHero>

    <Section className="px-5 py-[150px] sm:px-8">
      <div className="mx-auto max-w-[1080px]">
        <span className="mb-[22px] block text-[10.5px] font-semibold uppercase tracking-[0.34em] text-[var(--color-brand-blue)]">
          Five steps
        </span>
        <h2 className="m-0 mb-14 font-display text-[clamp(30px,4.2vw,52px)] font-semibold leading-[1.06] tracking-[-0.035em]">
          From install to delivered.{" "}
          <span className="text-[var(--color-faint)]">
            Exactly how the app does it.
          </span>
        </h2>
        <StickyPanelList rows={STEPS} variant="steps" fit="cover" />
      </div>
    </Section>

    <Section className="px-5 pb-[170px] sm:px-8">
      <div className="mx-auto grid max-w-[1080px] grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-14 border-t border-[var(--color-surface-border)] pt-[110px]">
        {GUARANTEES.map((item) => (
          <div key={item.title}>
            <h5 className="m-0 mb-5 font-display text-[11px] font-semibold uppercase tracking-[0.34em]">
              {item.title}
            </h5>
            <p className="m-0 text-[16.5px] leading-[1.65] text-[var(--color-muted)]">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </Section>

    <ClosingCTA id="get" />
  </>
);
